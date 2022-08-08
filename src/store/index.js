import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

// 1. 定义一个模块
const test = {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, value) {
      state.token = value
    }
  },
  actions: {
    login(constext, data) {
      setTimeout(() => {
        const item = 'login444'
        constext.commit('setToken', item)
      }, 1000)
    }
  }

}

// 2. 模块化
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // 3. 注册模块化
    test
  },

  // 保存数据
  state: {
    count: 0,
    age: 20,
    token: null
  },

  // mutations 放同步的方法
  mutations: {
    add(state) {
      state.count++
    },

    // 辅助函数方式：接收参数
    addN(state, num) {
      state.count += num
    },

    // 更改 token
    setToken(state, token) {
      state.token = token
    }
  },

  // actions 放异步的方法
  actions: {
    addSync(constext) {
      setTimeout(() => {
        console.log(constext)
        constext.commit('add')
      }, 1000)
    },

    NewAddSync(constext, num) {
      setTimeout(() => {
        console.log(constext)
        constext.commit('addN', num)
      }, 1000)
    }
  },

  // getters - 计算属性
  getters: {
    ...getters,
    showCount(state) {
      return 'count=' + state.count
    }
  }
})

export default store
