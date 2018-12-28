import ItemList from './ItemList.vue'

export default function createListView (type) {
	return {
		name: `${type}-stores-view`,
		asyncData({store}) {
			return store.dispatch('FETCH_LIST_DATA', { type })
		},
		title: type,
		render () {
			return h(ItemList, {props: { type }})
		}
	}
}