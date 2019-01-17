import {
	getNewsList,
	getNewsDetail
} from '@/api/api'

export default {
	FETCH_LIST_DATA: ({ commit, dispatch, state}) => { 
		//  这样使用请求的接口
		return getNewsList().then(res => {
	      commit('SET_LIST', {list: res.data.results})
	    })
	},
	FETCH_ITEM: ({ commit, state}, { id }) => {
		
    	if(id) {
    		return getNewsItems(id).then(item => commit('SET_ITEM', { item }))
    	} else {
    		return Promise.resolve()  // 创建一个promise 对象返回
    	}
	},
}