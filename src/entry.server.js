import { createApp } from './app'

// 这个导出函数由 bundleRenderer 调用
export default context => {
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp()
		const { url } = context  // 在server.js里
		const { fullPath } = router.resolve().route // 解析目标位置

		if (fullPath !== url) {  // 作用是什么
            return reject({ url: fullPath })
        }

        router.push(url)

        router.onReady(() => {
        	const matched = router.getMatchedComponents()

        	if(!matched.length) {
        		return reject({ code: 404})
        	}

        	Promise.all(matched.map(({asyncData}) => asyncData && asyncdata({
        		store,
        		route: router.currentRoute
        	}))).then(() => {
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        		context.state = store.state
        		resolve(app)
        	}).catch(reject)
        }, reject)
	})
}