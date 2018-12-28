import $axios from './axios'
import STATIC from '../scripts/constant'

/**
 * @method getIdsByType
 * @desc 获取列表
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const getIdsByType = data => {
	return $axios({
		url: STATIC.API.LIST,
		method: 'GET',
		data
	})
}

/**
 * @method getItems
 * @desc 获取单项
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
const getItems = data => {
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
	getIdsByType,
	getItems,
	getUser
}