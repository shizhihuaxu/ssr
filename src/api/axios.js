import qs from 'qs'
import axios from 'axios'
import baseURL from './baseUrl.config.js'

// axios 基本配置
const CONFIG = {
  baseURL: baseURL,       // 基础 url 前缀
  method: 'post',         // 请求方式
  headers: {              // 请求头信息
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 2000,          // 设置过期时间
  withCredentials: true,  // 携带凭证，此处设置允许携带 cookie
  responseType: 'json',   // 返回数据类型
  validateStatus: function(status) {  // 定义 resolve 响应状态码
    return (status >= 200 && status < 300) || (status >= 400 && status < 500);
  }
};

// @desc 对 axios 的配置信息、请求拦截器、响应拦截器进行二次封装及处理
// @param {Object} options axios 请求接口的配置
// @param {String} options.method 请求的方式，例如 get, put, post
// @param {String} options.url 请求的接口路径，例如 /login/
// @param {Object} options.params 向接口传送的数据

let $axios = function(options) {
  return new Promise((resolve, reject) => {
    // 创建 axios 实例
    const instance = axios.create(CONFIG);
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        // 根据请求方法，序列化传来的参数
        if (
          config.method.toLocaleLowerCase() === "post" ||
          config.method.toLocaleLowerCase() === "put" ||
          config.method.toLocaleLowerCase() === "patch"
        ) {
          config.data = qs.parse(config.data);
        }
        if (config.method === "get") {
          config.data = qs.stringify(config.data);
          config.data ? (config.url = `${config.url}?${config.data}`) : "";
        }
        return config;
      },
      error => {
        return Promise.reject(error); 
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let result;
        // IE9 response.data 为 undefined
        result = {
          status: response.status,
          data: response.data
        };

        return result;
      },
      err => {
        switch (true) {
          case err.response && err.response.status == 400:
            err.message = "请求错误";
            break;
          case err.response && err.response.status == 401:
            err.message = "未授权";
            break;
          case err.response && err.response.status == 403:
            err.message = "拒绝访问";
            break;
          case err.response && err.response.status == 404:
            err.message = `请求地址出错：${err.response.config.url}`;
            break;
          case err.response && err.response.status == 408:
            err.message = "请求超时";
            break;
          case err.response && err.response.status == 500:
            err.message = "服务器内部错误";
            break;
          case err.response && err.response.status == 501:
            err.message = "服务器未实现";
            break;
          case err.response && err.response.status == 502:
            err.message = "网关错误";
            break;
          case err.response && err.response.status == 503:
            err.message = "服务不可用";
            break;
          case err.response && err.response.status == 504:
            err.message = "网关超时";
            break;
          case err.response && err.response.status == 505:
            err.message = "HTTP版本不受支持";
            break;
          default:
            err.message = err;
            break;
        }

        return err;
      }
    );

    // 请求处理
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default $axios;
