import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  children: [{
    // path: '' 默认路由
    // 当访问/salarys默认访问到页面
    path: '',
    name: 'salarys',
    component: () => import('@/views/salarys/index.vue'),
    meta: { title: '工资', icon: 'money' }
  }]
}
