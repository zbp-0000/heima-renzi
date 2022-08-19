<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>

    <qrcode-vue :value="value"></qrcode-vue>
    <!-- 引入组件 -->
    <UploadExcel></UploadExcel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Dashboard',
  components: {
    QrcodeVue
  },
  data: function() {
    return {
      value: 'https://example.com'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
