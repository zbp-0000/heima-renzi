<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 标签组件 -->
      <!-- 方式一： -->
      <!-- <PageTools :has-before="false"> -->

      <!-- 方式二： -->
      <PageTools>
        <el-button slot="after" type="primary" size="small" @click="onAdd({type: 1, pid: '0'})">添加权限</el-button>
      </PageTools>

      <el-table border stripe :data="list" row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" align="center" prop="code"></el-table-column>
        <el-table-column label="描述" align="center" prop="description"></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{row}">
            <!-- v-if="row.type === 1" 判断是不是一级层级，不是的话，不显示添加按钮 -->
            <el-button v-if="row.type === 1" type="text" @click="onAdd({type: 2, pid: row.id})">添加</el-button>
            <el-button type="text" @click="onUpdate(row.id)">编辑</el-button>
            <el-button type="text" @click="onDel(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- // 子通知父组件做刷新-方式2-通过$parent直接找到父组件 -->
      <add-perm v-if="showDialog" ref="addPermRef" :visible="showDialog" :title="isEdit?'编辑权限':'新增权限'" @success="getPermissionList" @close="showDialog = false"></add-perm>
    </div>
  </div>
</template>

<script>
import { delPermission, getPermissionDetail, getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
import AddPerm from './components/add-perm.vue'
export default {
  name: 'Permission',
  components: { AddPerm },
  props: {},
  data() {
    return {
      list: [],
      showDialog: false, // 弹框显示
      isEdit: false
    }
  },
  created() {},
  mounted() {
    this.getPermissionList()
  },
  methods: {

    // 编辑功能
    onUpdate(id) {
      this.isEdit = true // 控制 '编辑' 标题的显示
      this.showDialog = true
      this.$nextTick(async() => {
        this.$refs.addPermRef.form = await getPermissionDetail(id) // 把type、pid 传到子组件中
      })
    },

    // 新增功能
    onAdd(data) {
      this.isEdit = false // 控制 '编辑' 标题的显示
      this.showDialog = true
      // 对象赋值-方式2-通过Object.assign
      // 《解决异步赋值问题》使用异步代码，获取元素 ==== 不然报错：因为组件还没创建
      this.$nextTick(() => {
        Object.assign(this.$refs.addPermRef.form, data) // 把type、pid 传到子组件中
      })
    },
    async getPermissionList() {
      // 转化为树形结构
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },

    // 删除功能
    onDel(id) {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(async action => {
        // 调接口，传id
        await delPermission(id)
        // 提成成功
        this.$message.sussess('操作很成功')
        // 刷新页面
        this.getPermissionList()
      }).catch(() => {})
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
