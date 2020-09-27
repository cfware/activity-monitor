import {promisify} from 'util';

import t from 'libtap';
import pSeries from 'p-series';

import ActivityMonitor from '@cfware/activity-monitor';
import activityEvents from './activity-events.js';

function emptyEvents() {
	const empty = {};

	for (const event of activityEvents) {
		empty[event] = [];
	}

	return empty;
}

const global = new Function('return this')(); // eslint-disable-line no-new-func
global.window = {
	events: emptyEvents(),
	addEventListener(type, fn) {
		this.events[type].push(fn);
	},
	removeEventListener(type, fn) {
		this.events[type] = this.events[type].filter(a => a !== fn);
	}
};

const delay = promisify(setTimeout);

t.type(ActivityMonitor, 'function');

t.test('does not require a callback function', async t => {
	const activityMonitor = new ActivityMonitor();
	t.type(activityMonitor, ActivityMonitor);
	t.equal(activityMonitor.activity, false);

	activityMonitor.enable(50);
	t.equal(activityMonitor.activity, true);

	await delay(200);

	t.equal(activityMonitor.activity, false);
	activityMonitor.disable();
});

t.test('with callback function', async t => {
	let callbackCount = 0;
	const activityMonitor = new ActivityMonitor(() => {
		callbackCount++;
	});
	t.type(activityMonitor, ActivityMonitor);
	t.same(window.events, emptyEvents());

	activityMonitor.enable(100);
	activityMonitor.enable();

	for (const event of activityEvents) {
		t.equal(window.events[event].length, 1);
		t.type(window.events[event][0], 'function');
	}

	t.equal(activityMonitor.activity, true);
	t.equal(callbackCount, 0);

	await delay(150);
	t.equal(callbackCount, 1);
	t.equal(activityMonitor.activity, true);

	await delay(100);
	t.equal(callbackCount, 2);
	t.equal(activityMonitor.activity, false);

	await pSeries(activityEvents.map(event => {
		return async () => {
			window.events[event][0]();
			t.equal(activityMonitor.activity, true);

			await delay(250);

			t.equal(activityMonitor.activity, false);
		};
	}));

	activityMonitor.disable();
});
