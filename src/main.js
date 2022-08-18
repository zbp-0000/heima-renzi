import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/directives' // 图片加载; Bavbar.vue 可以引入

import '@/icons' // icon
import '@/permission' // permission control
import '@/directives'

// 注册全局组件-方式1-通过：component
// import '@/components'

// 注册全局组件-方式2-通过：Vue.use
import Ui from '@/components/index.js'
Vue.use(Ui)

// -------------过滤器-----------

// 注册全局过滤器：时间过滤器
// import '@/filters/index'

// 注册全局过滤器，方式2-单个注册
// import { formatDate } from '@/filters/index'
// Vue.filter('formatDate', formatDate)

// 注册过滤器-方式2-批量注册
import * as filters from '@/filters/index'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// -------------过滤器-----------

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// 模拟的数据
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
