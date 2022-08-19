
/*
-- 注册全局组件，方式1-通过：component
import Vue from 'vue'
import PageTools from './PageTools/index.vue'

Vue.component('PageTools', PageTools)
*/

// -----⬇⬇高级写法⬇⬇-----

import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
export default function install(Vue) {
  Vue.component('PageTools', PageTools)
  Vue.component('UploadExcel', UploadExcel)
}
