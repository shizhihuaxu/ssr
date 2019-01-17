/**
 * mock 数据
 */
import Mock from 'mockjs'
import { listData } from './data/list'

// 定义请求链接，类型，还有返回数据
Mock.mock('/list', 'get', function() {
	return Mock.mock(listData)
})