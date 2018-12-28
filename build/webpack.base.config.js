const path = require('path')
const webpack = require('webpack')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
// css样式提取单独文件 webpack4 不使用 extra-text-webpack... 了
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	mode: isProd ? 'production' : 'development',
	devtool: isProd
		? false
		: '#cheap-module-source-map',
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',  // 公共路径 静态资源位置的起始路径
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
	      	'public': path.resolve(__dirname, '../public')
	    }
	},
	module: {
		noParse: '/es6-promise\.js$/',
		rules: [
			{
		        test: /\.vue$/,
		        loader: 'vue-loader',
		        options: {
		          	compilerOptions: {
		            	preserveWhitespace: false  // 不保留空白
		          	}
		        }
		    },
	      	{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
	      	},
		    {
		        test: /\.(png|jpg|gif|svg)$/,
		        loader: 'url-loader',
		        options: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
		        }
		    },
		    {
		        test: /\.scss?$/,
		        use: isProd 
		          ? [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
		          : ['vue-style-loader', 'css-loader', 'sass-loader']
		    },
		],
	},
	// 如何展示性能提示
	performance: {
		// 根据入口起点的最大体积，控制 webpack 何时生成性能提示
		maxEntrypointSize: 300000, // bytes
		hints: isProd ? 'warning' : false
	},
	optimization: {
	    minimizer: [
	      	new UglifyjsPlugin({
                uglifyOptions: {
                	sourceMap: true,
                    compress: { warnings: false }
                }
            }),
	      	new OptimizeCSSAssetsPlugin({})
	    ]
  	},
	plugins: isProd
	    ? [
	        new VueLoaderPlugin(),
	        new webpack.optimize.ModuleConcatenationPlugin(),
	        new MiniCssExtractPlugin({
				filename: 'common.[chunkhash].css'
			}),
	      ]
	    : [
	        new VueLoaderPlugin(),
	        new FriendlyErrorsPlugin()
	      ]
}