import NewsList from './NewsList'

export default function createListView (type) {
	return {
		name: `${type}-stores-view`,
		asyncData({store}) {
			return store.dispatch('FETCH_LIST_DATA')
		},
		title: type,
		render () {
			return h(NewsList, { props: { type }})
		}
	}
}