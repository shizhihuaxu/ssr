<template>
	<div id="app">
		<header class="header">
			<nav class="inner">
				<router-link to="/" exact>
				  <img class="logo" src="~public/logo-48.png" alt="logo">
				</router-link>
				<router-link to="/top">Top</router-link>
				<router-link to="/new">New</router-link>
				<router-link to="/show">Show</router-link>
				<router-link to="/ask">Ask</router-link>
				<router-link to="/job">Jobs</router-link>
			</nav>
	    </header>
	    <transition name="fade" mode="out-in">
	      	<router-view class="view"></router-view>
	    </transition>
	</div>
</template>

<style lang='scss'>
@import '@/style/base.scss';
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
	font-size: 15px;
	background-color: lighten(#eceef1, 30%);
	margin: 0;
	padding-top: 55px;
	color: #34495e;
	overflow-y: scroll;
}	
.header {
	background-color: #ff6600;
	position: fixed;
	z-index: 999;
	height: 55px;
	top: 0;
	left: 0;
	right: 0;

  	.inner {
		max-width: 800px;
		box-sizing: border-box;
		margin: 0px auto;
		padding: 15px 5px;
  	}
  	a {
		color: rgba(255, 255, 255, .8);
		line-height: 24px;
		transition: color .15s ease;
		display: inline-block;
		vertical-align: middle;
		font-weight: 300;
		letter-spacing: .075em;
		margin-right: 1.8em;

		&:hover{
		  	color: #fff;
		}
		&.router-link-active {
		  	color: #fff;
		  	font-weight: 400;
		}
		&:nth-child(6) {
		  	margin-right: 0;
		}
	}
	.view {
		max-width: 800px;
		margin: 0 auto;
		position: relative;
	}

	.fade-enter-active, .fade-leave-active {
	  	transition: all .2s ease;
	}

	.fade-enter, .fade-leave-active {
	  	opacity: 0;
	}
}
</style>