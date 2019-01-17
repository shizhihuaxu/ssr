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
					name: 'vendors',
					// 有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
					chunks: 'initial',
					test: /node_modules/,
					minChunks: 1,  // 表示被引用的次数 默认1
					priority: -10 // 缓存优先级 相对较高
		        },
		        styles: {            
		          name: 'styles',
		          test: /\.scss|css$/,
		          chunks: 'all',    // merge all the css chunk to one file
		          enforce: true
		        },
			},
		},
		runtimeChunk: {
	        name: 'manifest'
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