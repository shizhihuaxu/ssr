import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// module.default 的意思是 在import CreateListView 后调用它export default 默认导出的内容
const createListView = name => () => import('@/views/CreateListView').then(m => m.default(name))
const NewsList = import('@/views/NewsList')
const NewsDetail = import('@/views/Newsdetail')

export function createRouter() {
	return new Router({
		mode: 'history',
		scrollBehavior: () => ({ y: 0 }),
		routes: [
			{ path: '/index', component: createListView(NewsList) },
			{ path: '/detail', component: NewsDetail },
			{ path: '/', redirect: '/index' }
		]
	})
}