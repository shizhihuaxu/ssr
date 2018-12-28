import $axios from './axios'
import STATIC from '../scripts/constant'

/**
 * @method getNewsList
 * @desc 获取列表
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const getList = data => {
	return $axios({
		url: STATIC.API.LIST,
		method: 'GET',
		data
	})
}

/**
 * @method getItem
 * @desc 获取单项
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const getItem = data => {
	return $axios({
		url: STATIC.API.ITEM,
		method: 'GET',
		data
	})
}

/**
 * @method getUser
 * @desc 获取用户
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const getUser = data => {
	return $axios({
		url: STATIC.API.USER,
		method: 'GET',
		data
	})
}

export default {
	getList,
	getItem,
	getUser
}