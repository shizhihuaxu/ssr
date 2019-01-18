import { createApp } from './app'

// 这个导出函数由 bundleRenderer 调用
export default context => {
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp()
        // 客户端请求服务器的url
		const { url } = context  
        // 通过请求的url 解析目标组件
		const { fullPath } = router.resolve(url).route 

		if (fullPath !== url) {  // 作用是什么
            return reject({ url: fullPath })
        }

        router.push(url)

        router.onReady(() => {
        	const matched = router.getMatchedComponents()

        	if(!matched.length) {
        		return reject({ code: 404})
        	}

        	Promise.all(matched.map(({asyncData}) => asyncData && asyncData({
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