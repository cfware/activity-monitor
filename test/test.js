import test from 'ava';

import pSeries from 'p-series';

import ActivityMonitor from '..';
import activityEvents from '../activity-events';
import {emptyEvents, window} from './helpers/init-fake-window';

function sleepFor(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

test('ActivityMonitor is a function', t => {
	t.is(typeof ActivityMonitor, 'function');
});

test.serial('does not require a callback function', async t => {
	const activityMonitor = new ActivityMonitor();
	t.is(typeof activityMonitor, 'object');
	t.false(activityMonitor.activity);

	activityMonitor.enable(5);
	t.true(activityMonitor.activity);

	await sleepFor(20);

	t.false(activityMonitor.activity);
	activityMonitor.disable();
});

test.serial('with callback function', async t => {
	let callbackCount = 0;
	const activityMonitor = new ActivityMonitor(() => {
		callbackCount++;
	});
	t.is(typeof activityMonitor, 'object');
	t.deepEqual(window.events, emptyEvents());

	activityMonitor.enable(100);
	activityMonitor.enable();

	activityEvents.forEach(e => {
		t.is(window.events[e].length, 1);
		t.is(typeof window.events[e][0], 'function');
	});
	t.true(activityMonitor.activity);
	t.is(callbackCount, 0);

	await sleepFor(150);
	t.is(callbackCount, 1);
	t.true(activityMonitor.activity);

	await sleepFor(100);
	t.is(callbackCount, 2);
	t.false(activityMonitor.activity);

	await pSeries(activityEvents.map(e => {
		return async () => {
			window.events[e][0]();
			t.true(activityMonitor.activity);

			await sleepFor(250);

			t.false(activityMonitor.activity);
		};
	}));

	activityMonitor.disable();
});
