<template>
  <div>
    <!-- 组件 -->
    <UploadExcel :on-success="onSuccess"></UploadExcel>
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { importEmployee } from '@/api/user'
export default {
  name: 'Import',
  components: { UploadExcel },
  data() {
    return {}
  },
  methods: {
    async onSuccess({ header, results }) {
      console.log(header, results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const data = []
      // 导入
      results.forEach(t => {
        const item = {}
        for (const key in t) {
          const newKey = userRelations[key]
          item[newKey] = t[key]
        }
        data.push(item)
      })
      await importEmployee(data)
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
