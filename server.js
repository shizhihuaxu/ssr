// 创建一个服务器
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')


const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const app = express()

function createRenderer (bundle, options) {
	return createBundleRenderer(bundle, Object.assign(options, {
		// 组件缓存
		cache: LRU({
	      	max: 1000,
	      	maxAge: 1000 * 60 * 15
	    }),
		basedir: resolve('./dist'),
		runInNewContext: false
	}))
}

let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')

if(isProd) {
	const template = fs.readFileSync(templatePath, 'utf-8')
	const bundle = require('./dist/vue-ssr-server-bundle.json')

	renderer = createRenderer (bundle, {
		template
	})
}else {
	readyPromise = require('./build/setup-dev-server')(
		app,
		templatePath,
		(bundle, options) => {
			renderer = createRenderer(bundle, options)
		}
	)
}

// express.static提供静态资源文件
const serve = (path, cache) => express.static(resolve(path), {  
  	maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use('./dist', serve('./dist', true))

function render (req, res) {
	res.setHeader("Content-Type", "text/html")  // 为什么一定是双引号呢

	const handleError = err => {
		if(err.url) {
			res.redirect(err.url)
		}else if(err.code === 404) {
			res.status(404).send('404 | page not found')
		}else{
			res.status(500).send('500 | internal server error')
		}
	}
}

app.get('*', isProd ? render : (req, res) => {
  	readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  	console.log(`server started at localhost:${port}`)
})