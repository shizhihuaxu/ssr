import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// module.default 的意思是 在import CreateListView 后调用它export default 默认导出的内容
const createListView = name => () => import('@/views/CreateListView').then(module => module.default)
const ItemView = import('@/views/ItemView')
const UserView = import('@/views/UserView')

export function createRouter() {
	return new Router({
		mode: 'history',
		scrollBehavior: () => ({ y: 0 }),
		routes: [
			{ path: '/top/:page(\\d+)?', component: createListView('top') },
			{ path: '/new/:page(\\d+)?', component: createListView('new') },
			{ path: '/show/:page(\\d+)?', component: createListView('show') },
			{ path: '/ask/:page(\\d+)?', component: createListView('ask') },
			{ path: '/job/:page(\\d+)?', component: createListView('job') },
			{ path: '/item/:id(\\d+)', component: ItemView },
			{ path: '/user/:id', component: UserView },
			{ path: '/', redirect: '/top' }
		]
	})
}