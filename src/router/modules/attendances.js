import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  children: [{
    // path: '' 默认路由
    // 当访问/attendances默认访问到页面
    path: '',
    name: 'attendances',
    component: () => import('@/views/attendances/index.vue'),
    meta: { title: '考勤', icon: 'skill' }
  }]
}
