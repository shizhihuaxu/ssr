const fs = require('fs')
const path = require('path')
const MFS  = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')  // 监控文件变化
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
	try {
		return fs.readFileSync(path.join(clientConfig.output.path, file),'utf-8')
	}catch(e){}
}

module.exports = function setupDevserver(app, templatePath, cb){
	let bundle
	let template
	let clientManifiest

	let ready 
	const readyPromise = new Promise(r => {ready = r})
	const update = () => {
		if(bundle && clientManifiest) {
			ready()
			cb(bundle, {
				template,
				clientManifiest
			})
		}
	}

	// 文件变化重新读取模板并渲染
	template = fs.readFileSync(templatePath, 'utf-8')
	chokidar.watch(templatePath).on('change', () => {
		template = fs.readFileSync(templatePath, 'utf-8')
		update()
	})

	// 更改clientConfig中的配置使其支持热更新
	clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
	clientConfig.output.filename = '[name].js'
	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)

	// dev middleware
	const clientCompiler = webpack(clientConfig)
	const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		noInfo: true
	})
	app.use(devMiddleware)
	clientCompiler.plugin('done', stats => {
		stats = stats.toJson()
		stats.errors.forEach(err => console.error(err))
		stats.warnings.forEach(err => console.warn(err))
		if(stats.errors.length) return
		clientManifiest = JSON.parse(readFile(
			devMiddleware.fileSystem,
			'vue-ssr-client-manifest.json'
		))
		update()
	})

	// hot middleware
	app.use(require('webpack-hot-middleware')(clientCompiler, { hearbeat: 5000 }))

	// update server render
	const serverCompiler = webpack(serverConfig)
	const mfs = new MFS()
	serverCompiler.outputFileSystem = mfs
	serverCompiler.watch({}, (err, stats) => {
		if(err) throw err
		stats = stats.toJson()
		if(stats.errors.length) return

		bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
		update()
	})

	return readyPromise
}