import { login, getUserBaseInfo, getEmplyeeBaseInfo } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
// import { Message } from 'element-ui'

export default {
  namespaced: true,

  // 数据
  state: {
    token: getToken(),
    // 定义用户数据: 头像/昵称
    userInfo: {}
  },

  // 修改数据
  mutations: {
    // 保存用户数据
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 清除用户数据
    removeUserInfo(state, userInfo) {
      state.userInfo = {}
    },

    // 获取 token
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    // 删除token
    removeToken(state) {
      state.token = undefined
      removeToken()
    }
  },

  // 异步修改
  actions: {
    // 退出时,清空公共(用户)数据 semoveRoutes
    logout(context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
      context.commit('permission/semoveRoutes', null, { root: true })
    },

    async getUserInfo(context) {
      const u = await getUserBaseInfo() // u 这个接口 里面有用户 id
      const e = await getEmplyeeBaseInfo(u.Id) // 这个接口需要传一个 用户id
      context.commit('setUserInfo', { ...u, ...e })
      return u
    },

    // 调用登录接口
    async login(context, data) {
      /*
      try {
        // 解构赋值：从data中获取参数
        const { data: { success, message, data: token }} = await data(data)
        // 如果成功则保存token
        if (success) {
          context.commit('setToken', token)
        } else {
          // 提示错误信息
          // 在js中不能用 this.$xxx
          // Message 错误提示：element-UI 的错误提示
          Message.error(message)
        }
      } catch (error) {
        Message.error('服务报错，请稍后重试')
      }
      */

      const token = await login(data)
      context.commit('setToken', token)

      // try {
      //   const res = await login(data)
      //   console.log('res.data.data', res.data.data) // 获取到token
      //   console.log('res.data', res.data)
      //   context.commit('setToken', res.data.data)
      // } catch (error) {
      //   console.log(error)
      // }
    }
  },

  // 计算属性
  getters: {

  },

  // 模块化
  modules: {

  }
}
