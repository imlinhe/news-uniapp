<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab__box">
				<view :class="['follow-tab__item', activeIndex === 0 ? 'active' : '']" @click="handleTabClick(0)">文章</view>
				<view :class="['follow-tab__item', activeIndex === 1 ? 'active' : '']" @click="handleTabClick(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list__swiper" :current="activeIndex" @change="handleChange">
				<swiper-item class="swiper-item">
					<list-scroll>
						<uni-load-more status="loading" v-if="list.length === 0 && !articleShow"></uni-load-more>
						<list-card v-for="item in list" :key="item._id" types="follow" :item="item"></list-card>
						<view class="no-data" v-if="articleShow">没有数据</view>
					</list-scroll>
				</swiper-item>
				<swiper-item class="swiper-item">
					<list-scroll>
						<list-author v-for="item in authorLists" :key="item.id" :item="item"></list-author>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list: [],
				articleShow: false,
				authorLists: []
			}
		},
		onLoad() {
			this.getAuthor()
			this.getFollow()
			uni.$on('update_article', () => {
				this.getFollow()
			})
			uni.$on('update_author', () => {
				this.getAuthor()
			})
		},
		methods: {
			handleChange(e) {
				this.activeIndex = e.detail.current
			},
			handleTabClick(index) {
				this.activeIndex = index
			},
			getFollow() {
				this.$api.get_follow().then(res => {
					console.log(res)
					this.list = res.data
					this.articleShow = this.list.length === 0
				})
			},
			// 有 bug
			getAuthor() {
				this.$api.get_author().then(res => {
					console.log(res)
					this.authorLists = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
	display: flex;
	.follow {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px solid #f5f5f5;
			.follow-tab__box {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px $mk-base-color solid;
				.follow-tab__item {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666;
					font-size: 14px;
					width: 100%;
					&:first-child {
						border-right: 1px solid $mk-base-color;
					}
					&.active {
						color: $mk-base-color;
					}
				}
			}
		}
		.follow-list {
			flex: 1;
			.follow-list__swiper {
				height: 100%;
				.swiper-item {
					height: 100%;
				}
			}
		}
	}
	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
}
</style>
