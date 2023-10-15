import addEventListener from '@cfware/add-event-listener';
import runCallbacks from '@cfware/callback-array-once';
import cleanableInterval from '@cfware/cleanable-interval';
import activityEvents from './activity-events.js';

class ActivityMonitor {
    _eventWatchers = [];
    _activity = [false, false];

    constructor(callback = () => {}) {
        this._callback = callback;
    }

    get activity() {
        return this._activity[0];
    }

    enable(interval = 10000) {
        if (this._eventWatchers.length > 0) {
            return;
        }

        const onactivity = () => {
            this._activity = [true, true];
        };

        onactivity();
        this._eventWatchers.push(
            ...activityEvents.map(event => addEventListener(window, event, onactivity)),
            cleanableInterval(() => {
                this._activity = [this._activity[1], false];
                this._callback();
            }, interval)
        );
    }

    disable() {
        runCallbacks(this._eventWatchers);
        this._activity = [false, false];
    }
}

export default ActivityMonitor;
