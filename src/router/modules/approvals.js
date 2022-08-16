import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [{
    // path: '' 默认路由
    // 当访问/approvals默认访问到页面
    path: '',
    name: 'approvals',
    component: () => import('@/views/approvals/index.vue'),
    meta: { title: '审批', icon: 'tree-table' }
  }]
}
