'use strict';

module.exports = {
	plugins: [
		'istanbul',
		'@babel/plugin-transform-modules-commonjs',
		['@babel/plugin-proposal-class-properties', {loose: true}]
	]
};
