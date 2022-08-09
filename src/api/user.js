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

export function getInfo(token) {

}

// 退出
export function logout() {

}
