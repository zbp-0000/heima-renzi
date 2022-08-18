<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组件===>全局注册的组件 -->
      <PageTools>
        <!-- 一个标签推荐用 slot -->
        <span slot="before">共计x条</span>

        <!-- 多个标签推荐用 v-slot:插槽名 或 #插槽名 -->
        <template #after>
          <el-button type="danger" size="small" @click="onExport">excel导出</el-button>
          <el-button type="success" size="small">excel导入</el-button>
          <el-button type="primary" size="small" @click="showAddDialog = true">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column label="头像">
            <img slot-scope="{row}" v-imgerror="require('@/assets/common/head.jpg')" :src="row.staffPhoto" style="border-radius: 50%; width: 100px; height: 100px; padding: 10px" @click="onShowPhoto(row)" />
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" label="聘用形式" sortable="">
            <!-- 使用插槽，过滤器来格式化状态（枚举数据），通过v-slot="{row}"获取到数据 -->
            <template v-slot="{row}">
              {{ row.formOfEmployment | formOfEmployment }}
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
            <!-- 使用插槽，过滤器来格式化时间，通过v-slot="{row}"获取到数据 -->
            <template v-slot="{row}">
              <!-- {{ row.timeOfEntry | formatDate('YYYY-MM-DD') }} -->
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column prop="enableState" label="账户状态" sortable="">
            <!-- 使用插槽，设置开关按钮，通过v-slot="{row}"获取到数据 -->
            <template v-slot="{row}">
              <!-- v-model 实现不了，就用 :value 搭配 @input -->
              <el-switch :value="row.enableState === 1" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onDel(row.id)">删除</el-button>
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

    <!-- 二维码弹框 -->
    <el-dialog title="图片预览" :visible.sync="showQrcodeDialog" type="flex" justify="center">
      <qrcode-vue :value="currentRow.staffPhoto" :size="size" />
    </el-dialog>

    <!-- 新增员工-表单 -->
    <el-dialog :visible="showAddDialog" v-bind="$attrs" title="新增员工" v-on="$listeners" @open="onOpen" @close="close">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入姓名" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="form.timeOfEntry"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{width: '100%'}"
            placeholder="请选择入职时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="form.formOfEmployment" placeholder="请选择聘用形式" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in formOfEmploymentOptions"
              :key="index"
              :label="item.value"
              :value="item.id"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="form.workNumber" placeholder="请输入工号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="form.departmentName" placeholder="请输入部门" clearable :style="{width: '100%'}" @focus="getDeptsList">
          </el-input>
          <!-- 部门树形结构列表 -->
          <el-tree v-if="showDeptsTree" :data="deptsList" default-expand-all :props="{label: 'name'}" @node-click="handleNodeClick"></el-tree>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="form.correctionTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{width: '100%'}"
            placeholder="请选择转正时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addEmployee, delEmployee, getEmployeeList } from '@/api/employees'
import EmployeesEnum from '@/api/constant/employees' // 枚举的数据
import QrcodeVue from 'qrcode.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
// import { appendFileSync } from 'fs'
export default {
  name: 'EmployeesIndex',
  components: {
    QrcodeVue
  },
  filters: {
    formOfEmployment(val) {
      const f = EmployeesEnum.hireType.find(t => t.id === val)
      return f ? f.value : '未知'
    }
  },
  data() {
    return {
      showAddDialog: false,
      size: 200,
      currentRow: {},
      showQrcodeDialog: false, // 点击头像显示二维码
      list: [],
      page: {
        page: 1,
        size: 2,
        total: 0
      },
      form: {
        username: undefined,
        mobile: undefined,
        timeOfEntry: null,
        formOfEmployment: undefined,
        workNumber: undefined,
        departmentName: undefined,
        correctionTime: null
      },
      rules: {
        username: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        {
          min: 1, max: 4, message: '请输入1-4个字符', trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'
        }],
        timeOfEntry: [{
          required: true,
          message: '请选择入职时间',
          trigger: 'change'
        }],
        formOfEmployment: [{
          required: true,
          message: '请选择聘用形式',
          trigger: 'change'
        }],
        workNumber: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur'
        }],
        departmentName: [{
          required: true,
          message: '请输入部门',
          trigger: 'change' // 把校验变成：改变时校验表单；之前是光标离开时校验表单
        }],
        correctionTime: [{
          required: true,
          message: '请选择转正时间',
          trigger: 'change'
        }]
      },
      formOfEmploymentOptions: EmployeesEnum.hireType,
      deptsList: [], // 部门树形结构列表
      showDeptsTree: false // 是否显示部门树
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async onExport() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
      console.log(rows)
      import('@/vendor/Export2Excel').then(async excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data: [['zs', '5000'], ['ls', '8000']], // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },

    // 点击表单里的删除-触发点击事件，发起请求，传用户id进去
    onDel(id) {
      // 通过 elmecon（代码片段生成代码）
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(async action => {
        // 发请求
        await delEmployee(id)
        // 提示成功
        this.$message.success('操作成功')
        // 刷新页面
        this.getEmployeeList()
      }).catch(() => {

      })
    },

    handleNodeClick(data) {
      // console.log(data)
      this.form.departmentName = data.name
      this.showDeptsTree = false
    },

    // 显示部门树形结构
    async getDeptsList() {
      /*
      const res = await getDepartments()
      this.deptsList = tranListToTreeData(res.depts, '')
      */
      //  高级方法 ⬇⬇⬇⬇⬇⬇⬇⬇
      this.deptsList = tranListToTreeData((await getDepartments()).depts, '')
      this.showDeptsTree = true
    },
    onOpen() {},
    close() {
      this.showAddDialog = false
      this.$refs['formRef'].resetFields()
      this.form = this.$options.data().form // 重置表单，关闭数据，清空数据
    },
    // 点击确认触发点击事件，发起请求
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        // 发请求
        await addEmployee(this.form)
        // 提示成功
        this.$message.success('操作成功')
        // 刷新页面
        this.getEmployeeList()
        this.close()
      })
    },
    onCurrentChange(val) {
      this.page.page = val
      this.getEmployeeList()
    },

    async getEmployeeList() {
      const res = await getEmployeeList(this.page)
      this.list = res.rows
      this.page.total = res.total
    },

    onShowPhoto(row) {
      this.currentRow = row
      this.showQrcodeDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
