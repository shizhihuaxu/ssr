import $axios from './axios'
import STATIC from '@/scripts/static'

/**
 * @method getNewsList
 * @desc 获取列表
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const getNewsList = () => {
	return $axios({
		url: STATIC.API.LIST,
		method: 'GET',
	})
}

/**
 * @method getNewsDetail
 * @desc 获取详情页
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const getNewsDetail = data => {
	return $axios({
		url: STATIC.API.List,
		method: 'GET',
		data
	})
}

export  {
	getNewsList,
	getNewsDetail,
}