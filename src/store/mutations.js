import * as types from './types'

export default {
	[types.SET_LIST]: (state, { list }) => {
		state.list = list
	},

	[types.SET_ITEM]: (state, { item }) => {
		state.item = item
	},
}