import Vue from 'vue'
import "es6-promise/auto" 
import { createApp } from './app'

// 一、在路由切换更新前获取页面数据
Vue.mixin({
	beforeRouteUpdate (to, from, next) {
		const { asyncData } = this.$options

		if(asyncData) {
			async({
				store: this.$store,
				route: to
			}).then(next).catch(next)
		} else {
			next()
		}
	}
})

// 二、创建一个应用实例
const { app, router, store } = createApp()

// 三、替换 store 中的数据
if(window._INITIAL_STATE_) {
	store.replaceState(window._INITIAL_STATE_) 
}

// 四、找到之前没有渲染过的组件
router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)

		let diffed = false
		let activated = matched.filter((component, index) => {
			return diffed || (diffed = (prevMatched[index] !== component))
		})
		// 未被渲染组件进行数据同步, filter的作用是去除数组中为空、undefined、null的元素
		const asyncDataHooks = activated.map(component => component.asyncData).filter(_ => _)
		if(!asynsDataHooks.length) {
			return next()
		}

		// 在路由当行前获取数据，可能获取数据时间比较长，所以添加加载指示器
		console.log('start fetch data...')
		Promise.all(asyncDataHooks.map(asyncData => asyncData({store, route: to})))
			.then(() => {
				console.log('finish')
				next()
			})
			.catch(next)
	})
	// 五、挂载
	app.$mount('#app')
})