<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>

    <qrcode-vue :value="value"></qrcode-vue>
    <!-- 引入组件 -->
    <!-- <UploadExcel></UploadExcel> -->

    <!-- 上传头像 全局组件 -->
    <ImageUpload></ImageUpload>

    <input ref="fileRef" type="file" />
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKID3vWrvkQqzrRoujIabLo0vZw2tTmoZ3GC',
  SecretKey: 'g5D3cuvf9NL2SaS3NREkzxd2AernSpvq'
})
import { mapGetters } from 'vuex'
// 二维码测试
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Dashboard',
  components: {
    // 二维码测试
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
  },
  mounted() {
    this.$refs.fileRef.onchange = function() {
      // 获取到上传到的文件
      const file = this.files[0] // 这里有个大坑，不是 this.$refs.fileRef ；而是 this.files
      console.log(file)

      cos.putObject({
        Bucket: 'rzzt-1313400495', /* 必须 */
        Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + file.name, /* 文件名 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, function(err, data) {
        console.log(err || data)
      })
    }
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
