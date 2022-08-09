import Cookies from 'js-cookie'

const TokenKey = 'rzzt_token'

// 获取 token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 存 token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除 token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
