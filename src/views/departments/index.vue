<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 左右布局-栅格布局 -->
        <!-- <el-row>
          <el-col :span="12">左</el-col>
          <el-col :span="12">右</el-col>
        </el-row>
        <el-row type="flex">
          <el-col>左</el-col>
          <el-col>右</el-col>
        </el-row> -->

        <tree-tools :data="company">
          <!-- 使用插槽 子组件用 <slot /> 接受 -->
          <el-dropdown-item @click.native="onAdd(company)">新增子部门</el-dropdown-item>
        </tree-tools>

        <!-- 树形控件 -->
        <!-- default-expand-all 是否展开所有子节点 -->

        <el-tree :data="list" :props="{label: 'name'}" default-expand-all>
          <!-- 子组件：tree-tools -->
          <tree-tools slot-scope="{data}" :data="data">
            <!-- 使用插槽 子组件用 <slot /> 接受 -->
            <!-- 为什么要用插槽？后面操作更加方便，不封装在子组件，比如删除之类的，减少不必要的通信 -->
            <el-dropdown-item @click.native="onAdd(company)">新增子部门</el-dropdown-item>
            <el-dropdown-item @click.native="onUpdate(data)">编辑部门</el-dropdown-item>
            <el-dropdown-item @click.native="onDel(data.id)">删除部门</el-dropdown-item>
          </tree-tools>
        </el-tree>
      </el-card>
    </div>

    <!-- 弹框 表单 -->
    <!-- 方式一传参：@update-show-dialog="showDialog = $event" -->
    <!-- <add-dept :show-dialog="showDialog" @update-show-dialog="showDialog = $event"></add-dept> -->
    <!-- 方式二传参：show-dialog.sync="showDialog" -->
    <add-dept ref="addDeptRef" :show-dialog.sync="showDialog" :node="currentNode" @success="getDepartments"></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { tranListToTreeData } from '@/utils/index.js' // 扁平结构转换树形结构
// 映入表单弹框
import AddDept from './components/add-dept.vue'
import { getDepartments, delDepartment, getDepartmentById } from '@/api/departments'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  props: {},
  data() {
    return {
      showDialog: false, // 控制表单的显示
      currentNode: {}, // 当前操作的部门
      company: { name: '传智教育', manager: '负责人', id: '' },
      list: [{
        name: '总裁办', manager: '曹操',
        children: [{ name: '董事会', manager: '曹丕' }]
      },
      { name: '行政部', manager: '刘备' },
      { name: '人事部', manager: '孙权' }
      ]
    }
  },
  async created() {
    const res = await getDepartments()
    // console.log(res) // 获取数据
    this.company.name = res.companyName
    // res.depts 获取过来的数组列表
    // 扁平结构转换树形结构
    this.list = tranListToTreeData(res.depts, '')
    // 调用方法
    this.getDepartments()
  },
  mounted() {},
  methods: {
    // 新增子部门
    onAdd(node) {
      this.currentNode = node
      this.showDialog = true
    },
    async onUpdate(node) {
      // 保存部门详情
      this.currentNode = node
      // 获取部门详情
      const res = await getDepartmentById(node.id)
      // 如果把数据拆电脑对话框？
      // 方式1-通过peops（不推荐）
      // 方式2-通过refs直接修改子组件的数据
      this.$refs.addDeptRef.form = res
      this.showDialog = true
    },
    async getDepartments() {
      const res = await getDepartments()

      this.company.name = res.companyName
      this.list = tranListToTreeData(res.depts, '')
    },
    onDel(id) {
      // 提示
      // 通过代码片段elmecon
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        // 发请求
        await delDepartment(id)
        // 提示成功
        this.$message.success('删除成功')
        // 刷新列表
        this.getDepartments()
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
