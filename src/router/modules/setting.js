import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  children: [{
    // path: '' 默认路由
    // 当访问/setting默认访问到页面
    path: '',
    name: 'settings',
    component: () => import('@/views/setting/index.vue'),
    meta: { title: '公司设置', icon: 'setting' }
  }]
}
