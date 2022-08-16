<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs>
        <el-tab-pane label="角色管理">
          <el-row>
            <el-button size="small" type="primary" @click="showDialog = true">新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table
            :data="list"
            style="width: 100%;margin-top: 40px;"
            border
            stripe
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="描述"
              prop="description"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <!-- 插槽 -->
              <!-- v-slot="{row}" 获取这一行数据 -->
              <template v-slot="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="onUpdate(row.id)">编辑</el-button>
                <!-- @click="onDel(row.id)" 传入id -->
                <el-button size="small" type="danger" @click="onDel(row.id)">删除</el-button>
              </template>

            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <el-row type="flex" justify="end">
            <el-pagination
              :page-size="page.pagesize"
              layout="prev, pager, next"
              :total="page.total"
              @current-change="onCurrentChange"
            >
            </el-pagination>
          </el-row>

        </el-tab-pane>

        <!-- 公司信息 -->
        <el-tab-pane label="公司信息">
          <!-- 提示信息 -->
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>

          <!-- 表单 -->
          <el-form ref="form" :model="form" label-width="80px" style="width:500px;margin:40px 0 0 20px">
            <el-form-item label="企业名称">
              <el-input v-model="info.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="info.companyAddress" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="info.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="info.remarks" disabled></el-input>
            </el-form-item>

          </el-form>
        </el-tab-pane>
      </el-tabs>

      <!-- 弹框-新增角色 -->
      <el-dialog :visible="showDialog" v-bind="$attrs" :title="form.id?'编辑角色':'新增角色'" v-on="$listeners" @open="onOpen" @close="close">
        <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入角色描述" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="handelConfirm">确定</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCompanyInfo } from '@/api/user'
import { getRoleList, addRole, delRole, getRoleById, updateRole } from '@/api/setting.js'
export default {
  name: 'Setting',
  components: {},
  props: {},
  data() {
    return {
      showDialog: false, // 弹窗的显隐
      info: {},
      list: [],
      page: {
        page: 1,
        pagesize: 2, // 显示几条数据
        total: 0 // 第几个分页
      },
      form: {
        name: undefined,
        description: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }],
        description: []
      }
    }
  },
  async created() {
    // 调接口，把公司id传过去，获取到公司信息
    this.info = await getCompanyInfo(this.$store.state.user.userInfo.companyId)
    // console.log(this.info)

    this.getRoleList()
  },
  mounted() {
    // console.log('$options', this.$options)
  },
  methods: {
    async onUpdate(id) {
      this.showDialog = true // 显示编辑弹窗
      this.form = await getRoleById(id) // 或取数据，
    },

    // 删除角色
    onDel(id) {
      // 确认，代码块：elmecon
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(async action => {
        // 发请求
        await delRole(id)
        // 提示成功
        this.$message.success('操作成功')

        // 刷新列表
        this.getRoleList()
      }).catch(() => {

      })
    },
    // 分页数据处理函数
    onCurrentChange(val) {
      this.page.page = val
      this.getRoleList()
    },
    async getRoleList() {
      // 获取数据，把分页传给后端
      const res = await getRoleList(this.page)
      // console.log(res)
      // 保存分页数据，第几页
      this.page.total = res.total
      this.list = res.rows
    },

    onOpen() {},
    close() {
      this.$refs['formRef'].resetFields()
      this.showDialog = false // 关闭弹框
      // 清空表单数据-方式1-cv，显示替换
      /*
      this.form = {
        name: undefined,
        description: undefined
      }
      */
      // 清空表单数据-方式2-获取原生配置
      this.form = this.$options.data().form
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return

        if (this.form.id) {
          // 修改数据
          await updateRole(this.form)
        } else {
          // 发送请求
          await addRole(this.form)
        }

        // 提示成功
        this.$message.success('操作成功')

        // 刷新列表
        this.getRoleList()
        this.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
