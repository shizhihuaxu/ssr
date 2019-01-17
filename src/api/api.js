import $axios from './axios'
import STATIC from '@/scripts/static'

/**
 * @method getNewsList
 * @desc 获取列表
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
export const getNewsList = () => {
	return $axios({
		url: STATIC.API.List,
		method: 'get',
	})
}

/**
 * @method getNewsDetail
 * @desc 获取详情页
 * @param {Object} data 请求携带数据
 * @returns {Promise} 响应结果
 */
export const getNewsDetail = id => {
	return $axios({
		url: `${STATIC.API.List}${id}`,
		method: 'get',
	})
}
