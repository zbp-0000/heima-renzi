<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 路由传参-方式一： -->
      <!-- 员工详情 -- {{ $route.params.id }} -->

      <!-- 路由传参-方式二： -->
      <!-- 员工详情 -- {{ $route.query.id }} -->

      <!-- 员工详情 -- {{ id }} -->

      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input v-model="form.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="form.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 用户信息 组件 -->
            <user-info></user-info>
          </el-tab-pane>

          <el-tab-pane label="岗位信息">
            <JobInfo></JobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import { getEmplyeeBaseInfo } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
export default {
  name: 'EmployeeDetail',
  components: { UserInfo, JobInfo },
  props: {
    id: { // 路由传参-方式三：在路由模块上设置 peops，然后通过方式一，一样的传参方式
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      form: {}
    }
  },
  async mounted() {
    // 获取用户信息：名称、密码
    this.form = await getEmplyeeBaseInfo(this.id)
    this.form.password = ''
  },
  methods: {
    async onSubmit() {
      // 提交更改
      // 提交操作：调接口上传改的密码
      await saveUserDetailById(this.form)
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
