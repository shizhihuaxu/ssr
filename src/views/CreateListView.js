import NewsList from './NewsList'

export default function createListView (type) {
	return {
		name: type,
		asyncData({store}) {
			return store.dispatch('FETCH_LIST_DATA')
		},
		title: type,
		render (h) {
			return h(NewsList, { props: { type }})
		}
	}
}