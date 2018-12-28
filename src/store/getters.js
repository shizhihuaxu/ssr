export default {
	activeIds (state) {
		const { activeType, itemsPerPage, lists} = state

		if(!activeType) return []

		const page = Number(state.route.params.page)  // 为什么可以从state 上获取到route
		const start = (page - 1) * itemsPerPage
		const end = page * itemsPerPage

		return lists[activeType].slice(start, end)
	}
}