module.exports = function (api) {
	api.cache(true);

	const presets = [ "@babel/preset-env", "@babel/preset-react" ];
	const plugins = [ 
		"@babel/plugin-proposal-class-properties", 
		"babel-plugin-css-modules-transform",
		"babel-plugin-react-css-modules"
	];

	return {
		presets,
		plugins
	};
};
