<template>
	<!-- 新闻列表页 -->
	<div class="news-list">
		 <news-item v-for="item in newsList" :key="item.id" 
		 			:item="item"></news-item>
	</div>
</template>

<script>
import NewsItem from '@/components/NewsItem'

export default {
	name: 'news-list',
	components: {
		NewsItem
	},
  	data () {
		return {
			newsList: this.$store.getters.getList
		}
  	},
}
</script>

<style lang="scss">

</style>
