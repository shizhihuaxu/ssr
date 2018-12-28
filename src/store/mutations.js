import * as types from './types'

export default {
	[types.SET_ACTIVE_TYPE]: (state, { type }) => {
		state.activeType = type
	},

	[types.SET_LIST]: (state, { type, ids }) => {
		state.lists[type] = ids
	},

	[types.SET_ITEMS]: (state, { items }) => {
		items.forEach(item => {
			if (item) {
				Vue.set(state.items, item.id, item)
			}
		})
	},

	[types.SET_USER]: (state, { id, user }) => {
		Vue.set(state.users, id, user || false) /* false means user not found */
	}
}