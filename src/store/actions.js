import {
	getIdsByType,
	getItem,
	getUser,
} from '../api/api'

export default {
	FETCH_LIST_DATA: ({ commit, dispatch, state}, { type }) => {
		commit('SET_ACTIVE_TYPE', { type })
		return getIdsByType(type)
			.then(ids => commit('SET_LIST', { type, ids }))  // 返回的activeIds
			.then(() => dispatch('ENSURE_ACTIVES_ITEMS'))
	},
	ENSURE_ACTIVES_ITEMS: ({ dispatch, getters}) => {
		return dispatch('FETCH_ITEMS', {
			ids: getters.activeIds
		})
	},
	FETCH_ITEMS: ({ commit, state}, { ids }) => {
		// on the client, the store itself serves as a cache.
    	// only fetch items that we do not already have, or has expired (3 minutes)
    	const now = Date.now()
    	ids = ids.filter(id => {
    		let item = state.items[id]

    		if(!item) {
    			return true
    		}
    		if(now - item._lastUpdated > 1000 * 60 * 3) {
    			return true
    		}
    		return false
    	})
    	if(ids.length) {
    		return getItems(ids).then(items => commit('SET_ITEMS', { items }))
    	} else {
    		return Promise.resolve()  // 创建一个promise 对象返回
    	}
	},
	FETCH_USER: ({ commit, state}, { id }) => {
		return state.users[id]
			? Promise.resolve(state.users[id])
			: getUser(id).then(user => commit('SET_USER', { id, user}))
	}
}