# @cfware/activity-monitor

[![Travis CI][travis-image]][travis-url]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

Browser activity monitor.

### Install @cfware/activity-monitor

Testing this module requires node.js 12 or above, though it targets the
browser.

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

## Running tests

Tests are provided by xo and ava.

```sh
npm install
npm test
```

[npm-image]: https://img.shields.io/npm/v/@cfware/activity-monitor.svg
[npm-url]: https://npmjs.org/package/@cfware/activity-monitor
[travis-image]: https://travis-ci.org/cfware/activity-monitor.svg?branch=master
[travis-url]: https://travis-ci.org/cfware/activity-monitor
[gk-image]: https://badges.greenkeeper.io/cfware/activity-monitor.svg
[downloads-image]: https://img.shields.io/npm/dm/@cfware/activity-monitor.svg
[downloads-url]: https://npmjs.org/package/@cfware/activity-monitor
[license-image]: https://img.shields.io/npm/l/@cfware/activity-monitor.svg
