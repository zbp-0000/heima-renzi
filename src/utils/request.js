import axios from 'axios'
const request = axios.create({
  baseURL: ''
})

// 写请求和响应拦截器
// 方式一：去官方文档复制
// 方式二：代码片段 拦截器的代码片段：简写 airu
request.interceptors.request.use(config => {
// Do something before request is sent
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
// Do something before response is sent
  return response
}, error => {
// Do something with response error
  return Promise.reject(error)
})

export default request
