// 时间格式化，过滤器 ====> 在main.js 中全局引入

// import Vue from 'vue'
// import moment from 'moment'
// Vue.filter('formatDate', (val, format = 'YYYY-MM-DD') => {
//   return moment(val).format(format)
// })

// 定义过滤器-方式2-定义工具函数 ===> 在main.js里全局引入
import moment from 'moment'
export function formatDate(val, format = 'YYYY-MM-DD') {
  return moment(val).format(format)
}
