const { resolve } = require('path');
const vueLoader = require('vue-loader');
const vueCssLoaders = require('./vue-css-loaders.js');

module.exports = {
	components: 'src/components/**/[A-Z]*.vue',
	webpackConfig: {
		resolve: {
			extensions: ['.js', '.json', '.vue', '.ts'],
			alias: {
				'~': resolve(__dirname, 'src'),
				'@': resolve(__dirname, 'src'),
			},
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					exclude: /node_modules/,
					loader: 'vue-loader',
					options: {
						loaders: vueCssLoaders(),
					}
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						"presets": [
							["env", { "modules": false }],
							"stage-2"
						],
						"plugins": ["transform-runtime"],
						"comments": false,
						"env": {
							"test": {
								"presets": ["env", "stage-2"],
								"plugins": [ "istanbul" ]
							}
						}
					}
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader'
				},
			
				{
					test: /\.json$/,
					loader: 'json-loader'
				},
			
				{
					exclude: [ /\.html$/, /\.js$/, /\.css$/, /\.vue$/, /\.json$/ ],
					loader: 'url-loader',
					query: {
						limit: 10000,
						name: 'static/media/[name].[hash:8].[ext]'
					}
				}
			],
			plugins: [new vueLoader.VueLoaderPlugin()],
		},
	},
	showUsage: true,
	vuex: './src/store/index',
};