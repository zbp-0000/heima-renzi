import router from '@/router/index.js'
import store from '@/store/index.js'

// 通过路由首位控制页面跳转
// 跳转之前按-前置守卫
router.beforeEach((to, from, next) => {
  // to - 去哪里的路由信息
  // from - 从哪里来的路由信息
  // next - 是否允许访问

  // 如果登录,再过去用户信息 ====> 回顾 判断对象是否为空(!store.state.user.userInfo.userId)
  // if (store.state.user.token && !store.state.user.userInfo.userId) {
  //   store.dispatch('user/getUserInfo')
  // }
  // 简化 ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ 在 getters.js 里简化
  const { token, userId } = store.getters
  if (token && !userId) {
    store.dispatch('user/getUserInfo')
  }

  // 白名单：里面路由可以直接访问
  if (['/login', '/404'].includes(to.path)) {
    return next()
  }
  //   如果它没有token，不允许它访问，并且跳转到登录页
  if (token) {
    next()
  } else {
    next('/login')
  }
})

// 跳转之后-后置守卫
router.afterEach((to, from) => {

})
