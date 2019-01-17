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
				{{ item.create_time | timeAgo }} ago
			</span>
		</span>
	</li>
</template>

<script>
import { timeAgo } from '@/scripts/filters'

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
	.meta{
		font-size: .85em;
		color: #828282;
		a {
			color: #828282;
			text-decoration: underline;
			&:hover {
				color: #ff6600;
			}
		}
	}
}
</style>
