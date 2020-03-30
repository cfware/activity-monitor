# @cfware/activity-monitor

![Tests][tests-status]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

Browser activity monitor.

### Install @cfware/activity-monitor

```sh
npm i --save @cfware/activity-monitor
```

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
[tests-status]: https://github.com/cfware/activity-monitor/workflows/Tests/badge.svg
[gk-image]: https://badges.greenkeeper.io/cfware/activity-monitor.svg
[downloads-image]: https://img.shields.io/npm/dm/@cfware/activity-monitor.svg
[downloads-url]: https://npmjs.org/package/@cfware/activity-monitor
[license-image]: https://img.shields.io/npm/l/@cfware/activity-monitor.svg
