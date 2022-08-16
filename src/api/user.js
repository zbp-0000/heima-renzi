// eslint-disable-next-line no-unused-vars
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    // post 或 data
    data

  })
}

// 获取用户基本资料
export function getUserBaseInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 获取员工基本信息
export function getEmplyeeBaseInfo(id) {
  return request({
    // 要通过路径传用户id
    url: '/sys/user/' + id,
    method: 'get'
  })
}

// 获取员工列表
export function getEmplyeeSimiple(id) {
  return request({
    // 要通过路径传用户id
    url: '/sys/user/simple',
    method: 'get'
  })
}

// 获取员工列表
export function getCompanyInfo(id) {
  return request({
    // 要通过路径传用户id
    url: '/company/' + id,
    method: 'get'
  })
}

// 退出
export function logout() {

}
