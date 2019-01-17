import {
	getNewsList,
	getNewsDetail
} from '@/api/api'

export default {
	FETCH_LIST_DATA: ({ commit, dispatch, state}) => {      
		return getNewslist()
			.then(list => commit('SET_LIST', { list }))  
	},
	FETCH_ITEM: ({ commit, state}, { id }) => {
		
    	if(id) {
    		return getNewsItems(id).then(item => commit('SET_ITEM', { item }))
    	} else {
    		return Promise.resolve()  // 创建一个promise 对象返回
    	}
	},
}