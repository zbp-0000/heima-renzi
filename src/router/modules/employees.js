import Layout from '@/layout'

// 模块化路由写法；把员工的路由单独放到一个文件当中
export default {

  path: '/employees',
  component: Layout,
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees'),
    meta: { title: '员工', icon: 'people' }
  }]

}
