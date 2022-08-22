<template>
  <div class="ImageUpload">
    <el-upload
      action=""
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :http-request="handleReqest"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
      :class="{disabled: fileList.length > 0}"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 进度条 ⬇ -->
    <el-progress v-if="state" :percentage="percent" style="width:200px"></el-progress>
    <!-- 文件上传 ⬇ -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKID3vWrvkQqzrRoujIabLo0vZw2tTmoZ3GC',
  SecretKey: 'g5D3cuvf9NL2SaS3NREkzxd2AernSpvq'
})
export default {
  name: 'ImageUpload',
  data() {
    return {

      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
      percent: 0, // 进度条数据
      state: false, // 进度条-是否开始
      finished: false // 进度条-是否结束
    }
  },
  methods: {
    // 在选择文件后执行 on-change
    handleChange(file) {
      this.fileList.push({ url: file.url }) // 解决上传图片时，页面闪烁的问题
    },

    // 覆盖默认的上传行为-http-request
    handleReqest(options) {
      const file = options.file // 得到文件对象

      // 进度条开始
      this.state = true
      this.finished = false

      // options.file 是文件对象
      // 上传文件
      cos.putObject({
        Bucket: 'rzzt-1313400495', /* 必须 */
        Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + file.name, /* 文件名 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
          // 进度条的数值
          this.percent = progressData.percent * 100
        }
      }, (err, data) => {
        console.log(err || data)
        // 进度条开始
        this.finished = false // 进度条-是否结束
        this.state = true // 进度条-是否开始

        // this.fileList.push({ url: 'http://' + data.Location })
        this.fileList[0].url = 'http://' + data.Location
      })
    },
    handleRemove(file) {
      const index = this.fileList.findIndex(t => t.id === file.id)
      this.fileList.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 判断图片格式、大小
    handleBeforeUpload({ type, size }) {
      if (!['image/jpeg', 'image/gif', 'image/bmp', 'image/png'].includes(type)) {
        this.$message.error('图片格式不对')
        return false
      }
      if (size > 5 * 1024 * 1024) {
        this.$message.error('图片太大')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .disabled .el-upload--picture-card {
  display: none;
}
</style>
