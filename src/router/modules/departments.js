import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  children: [{
    // path: '' 默认路由
    // 当访问/departments默认访问到页面
    path: '',
    name: 'departments',
    component: () => import('@/views/departments/index.vue'),
    meta: { title: '组织架构', icon: 'tree' }
  }]
}
