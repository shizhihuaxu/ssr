<template>
	<li class="news-item">
		<span class="title">
			<router-link :to="'/detail/' + item.id">{{ item.title }}</router-link>
		</span>
		<br>
		<span class="meta">
			<span class="by">
				by {{ item.author }}
			</span>
			<span class="time">
				{{ item.create_time | formatTime }}
			</span>
		</span>
	</li>
</template>

<script>

export default {
	name: 'news-item',
	props: {
		item: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
}
</script>

<style lang="scss">
.news-item {
	background-color: #fff;
	padding: 20px 30px 20px 80px;
	border-bottom: 1px solid #eee;
	position: relative;
	line-height: 20px;
	a { color: #079087; }
	.meta{
		font-size: .85em;
		color: #828282;
	}
}
</style>
