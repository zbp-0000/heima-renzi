import { asyncRouter, constantRoutes } from '@/router/index.js'

export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    setRoutes(state, filterRoutes) {
      state.routes = [...constantRoutes, ...filterRoutes]
    },

    semoveRoutes(state) {
      state.routes = [...constantRoutes]
    }

  },
  actions: {
    generateRoutes(context, menus) {
      // const filterRoutes = asyncRouter // 放开菜单权限，记得取消（不然就是上线事故）
      const filterRoutes = asyncRouter.filter(t => menus.includes(t.children[0].name))
      context.commit('setRoutes', filterRoutes)
      return filterRoutes
    }
  }

}
