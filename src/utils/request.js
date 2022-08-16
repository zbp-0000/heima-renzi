import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  /*
  baseURL: 'http://ihrm-java.itheima.net/api'
  // 用环境变量文件中数据
  如果当前是开发环境，会去.env.development文件中取数据
  如果当前是生产环境，会去.env.produceiont文件中取数据
  */
  baseURL: process.env.VUE_APP_BASE_API
})

// 写请求和响应拦截器
// 方式一：去官方文档复制
// 方式二：代码片段 拦截器的代码片段：简写 airu

request.interceptors.request.use(config => {
// Do something before request is sent
  if (store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
// 错误处理-方式2-在响应拦截器统一处理错误
request.interceptors.response.use(response => {
  // 状态码为200，success为false的错误
  const { data: { success, message, data }} = response
  // 如果成功则保存token
  if (success) {
    // 简化数据返回，直接返回数据
    console.log(data)
    return data
  } else {
    Message.error(message)
    // 产生一个错误，组织代码执行
    return new Error(message)
  }
}, error => {
  // 状态码为400、500的错误
  // Do something with response error

  // 模拟 token 失效
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
  }

  Message.error('请求失败')
  return Promise.reject(error)
})

export default request
