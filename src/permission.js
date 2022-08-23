import router from '@/router/index.js'
import store from '@/store/index.js'

// 通过路由首位控制页面跳转
// 跳转之前按-前置守卫
router.beforeEach(async(to, from, next) => {
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
    /* 简单版----------

    // 方式2-获取用户菜单标识-从返回值中获取
    const { roles: { menus }} = await store.dispatch('user/getUserInfo')

    // 方式1-获取用户菜单标识-从xuex中获取
    // console.log('munus', store.state.user.userInfo.roles.menus)
    // console.log('menys', menus)
    // 筛选动态路由

    // const filterRoutes = asyncRoutes // 放开所有权限

    const filterRoutes = asyncRouter.filter(t => menus.includes(t.children[0].name))
    // console.log('filterRoutes', filterRoutes)

    // 解决，菜单不显示
    // 注意，通过router
    router.options.routes = [...constantRoutes, ...filterRoutes]

    router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
    // 注意，房主404，添加动态路由之后，没有立即生效
    // 1-需要再跳转依次
    // 2-把404的路由配置，放到最后面
    return next(to.Path)
    */

    // 获取菜单标识-方法2-从返回值里取（推荐）
    const { roles: { menus }} = await store.dispatch('user/getUserInfo')
    const filterRoutes = await store.dispatch('permission/generateRoutes', menus)

    // 添加动态路由
    router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
    // 重新做跳转
    return next(to.path)
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
