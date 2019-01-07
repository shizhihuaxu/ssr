import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import title from './scripts/title'
import * as filters from './scripts/filters'

process.env.NODE_ENV === 'development' && require('@/mock')

Vue.mixin(title)
// 注册filter
Object.keys(filters).forEach(key=>{
	Vue.filter(key, filters[key])
})
/**
 * [createApp 返回 vue 实例]
 * @author shizhihuaxu 2018-10-19
 * @return {[type]} [新的 vue 实例]
 */
export function createApp (){
	const store = createStore()
	const router = createRouter()

	sync(store, router)

	const app = new Vue({
		store,
		router,
		render: h => h(App)
	})

	return { app, router, store }
}