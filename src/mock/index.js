/**
 * mock 数据
 */
import Mock from 'mockjs'
import listData from './data/list'
import itemData from './data/item'
import userData from './data/user'

// 定义请求链接，类型，还有返回数据
Mock.mock('/list', 'get', listData)
Mock.mock('/item', 'get', itemData)
Mock.mock('/user', 'get', userData)