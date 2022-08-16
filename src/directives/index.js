import Vue from 'vue'

Vue.directive('imgerror', {
  // 钩子函数
  // el 是dom 元素,哪个标签使用了,就传的哪个标签DOM
  inserted(el, options) {
    // if(!el.src) {
    //   el.src = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
    // }
    el.onerror = function() {
      this.src = options.value
    }
  },

  // 钩子函数
  // 当前页面元素改变,执行这个钩子函数
  update(el, options) {
    if (!el.src) {
      el.src = options.value
    }
  }
})
