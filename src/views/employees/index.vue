<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组件 -->
      <PageTools>
        <!-- 一个标签推荐用 slot -->
        <span slot="before">共计x条</span>

        <!-- 多个标签推荐用 v-slot:插槽名 或 #插槽名 -->
        <template #after>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="success" size="small">excel导入</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </PageTools>
      
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" label="聘用形式" sortable="" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="" />
          <el-table-column prop="enableState" label="账户状态" sortable="" />
          <el-table-column prop="" label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination 
            layout="prev, pager, next"
            :page-size="page.size"
            :total="page.total"
            @current-change="onCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
export default {
  name: 'EmployeesIndex',
  data() {
    return {
      list: [],
      page: {
        page:1,
        size: 2,
        total: 0
      }
    }
  },
  created () {
    this.getEmployeeList()
  },
  methods: {
    onCurrentChange(val) {
      thisjpage.page = val
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const res = await getEmployeeList(this.page)
      this.list = res.rows
      this.page.total = res.total
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
