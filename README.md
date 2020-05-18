# @cfware/activity-monitor [![NPM Version][npm-image]][npm-url]

Browser activity monitor.

## Usage

```js
import ActivityMonitor from '@cfware/activity-monitor';

const activityMonitor = new ActivityMonitor(() => {
	if (!activityMonitor.activity) {
		console.log('Inactive');
		activityMonitor.disable();
	}
});

activityMonitor.enable();
```

[npm-image]: https://img.shields.io/npm/v/@cfware/activity-monitor.svg
[npm-url]: https://npmjs.org/package/@cfware/activity-monitor
