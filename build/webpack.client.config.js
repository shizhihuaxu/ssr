const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
	entry: {
		app: './src/entry.client.js'
	},
	resolve: {
		alias: {
			'create-api': './create-api-client.js'
		}
	},
	plugins: [
	    new webpack.DefinePlugin({
	      	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
	      	'process.env.VUE_ENV': '"client"'
	    }),
	    new VueSSRClientPlugin()
  	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					name: 'vendor',
					priority: -10,
					test(moudle, chunks) {
						return (
				          // it's inside node_modules
				          /node_modules/.test(module.context) &&
				          // and not a CSS file (due to extract-text-webpack-plugin limitation)
				          !/\.css$/.test(module.request)
				        )
					}, 
		        },
				manifest: {
					name: 'manifest',
					priority: -20,
				}
			}
		}
	}
})

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		// 自动生成 service worker
		new SWPrecachePlugin({
			cacheId: 'ssr-sw',
			filename: 'service-worker.js',
			minify: true,
			dontCacheBustUrlsMatching: /./,
			staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
			runtimeCaching: [
				{
				  urlPattern: '/',
				  handler: 'networkFirst'
				},
				{
				  urlPattern: /\/(top|new|show|ask|jobs)/,
				  handler: 'networkFirst'
				},
				{
				  urlPattern: '/item/:id',
				  handler: 'networkFirst'
				},
				{
				  urlPattern: '/user/:id',
				  handler: 'networkFirst'
				}
			]
		})
	)
}

module.exports = config