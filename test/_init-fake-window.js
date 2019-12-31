import activityEvents from '../activity-events.js';

export function emptyEvents() {
	const empty = {};

	for (const e of activityEvents) {
		empty[e] = [];
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

export const {window} = global;
