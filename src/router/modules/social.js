import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  children: [{
    // path: '' 默认路由
    // 当访问/social默认访问到页面
    path: '',
    name: 'social',
    component: () => import('@/views/social/index.vue'),
    meta: { title: '社保', icon: 'table' }
  }]
}
