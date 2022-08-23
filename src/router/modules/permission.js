import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  children: [{
    // path: '' 默认路由
    // 当访问/permission默认访问到页面
    path: '',
    name: 'permissions',
    component: () => import('@/views/permission/index.vue'),
    meta: { title: '权限管理', icon: 'lock' }
  }]
}
