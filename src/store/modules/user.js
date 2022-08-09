import { login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
// import { Message } from 'element-ui'

export default {
  namespaced: true,

  // 报错数据
  state: {
    token: getToken()
  },

  // 修改数据
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = undefined
      removeToken()
    }
  },

  // 异步修改
  actions: {
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
