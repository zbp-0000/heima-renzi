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
  },
  // 路由传参方式1-通过动态参数
  {
    path: 'detail/:id',
    component: () => import('@/views/employees/detail.vue'),
    props: true, // 路由传参-方式三 === 可以通过组件props来接受参数
    hidden: true

  },
  // 路由传参方式2-通过查询字符串query
  {
    path: 'detail',
    component: () => import('@/views/employees/detail.vue'),
    hidden: true

  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/print.vue'),
    hidden: true

  }
  ]

}
