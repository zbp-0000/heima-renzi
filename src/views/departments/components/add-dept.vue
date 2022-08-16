<template>
  <div>
    <!-- 显示表单 :visible="showDialog" -->
    <!-- 点击 x 和 阴影触发 @close事件 -->
    <el-dialog :visible="showDialog" v-bind="$attrs" :title="form.id?'编辑部门':'新增部门'" v-on="$listeners" @open="onOpen" @close="close">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">

        <!-- 部门名称 -->
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入部门名称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>

        <!-- 部门编码 -->
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入部门编码" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>

        <!-- 部门负责人 -->
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="form.manager" placeholder="请选择部门负责人" clearable :style="{width: '100%'}">
            <!-- 负责人下拉，要调用接口，获取数据过来，再给managerOptions -->
            <el-option
              v-for="(item, index) in managerOptions"
              :key="index"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 部门介绍 -->
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="form.introduce"
            type="textarea"
            placeholder="请输入部门介绍"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 取消/确定 按钮 -->
      <div slot="footer" type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addDepartment, getDepartments, updateDepartment } from '@/api/departments'
import { getEmplyeeSimiple } from '@/api/user'
export default {
  components: {},
  inheritAttrs: false,
  props: {
    // 接受 父组件传过来的数据，显示[新增部门]表单
    showDialog: {
      type: Boolean,
      required: true
    },
    node: {
      type: Object,
      required: true
    }
  },
  data() {
    // 新增部门
    const validateName = async(rule, value, callback) => {
      // 统计不萌中禁止出现重复部门
      // 分析这里的包含哪些数据
      // 当前要添加的部门名称-this.form.name
      const name = this.form.name
      const { depts } = await getDepartments()
      let brothers
      if (this.form.id) {
        // 编辑
        // 去所有部门当前找兄弟部门
        brothers = depts.filter(t => t.id === this.node.pid && t.id !== this.node.id)
      } else {
        // 父部门，根据夫部门去找兄弟部门
        const parent = this.node
        // 同级部门-要添加的部门兄弟部门
        // brothers = parent.children
        brothers = depts.filter(t => t.pid === parent.id) // 解决bug：添加部门时，名称没有校验重复
      }

      // 数据如果判断？
      // 统计部门当中是否存在重复名称的部门，如果有报错，如若没有允许添加
      const f = brothers ? brothers.find(t => t.name === name) : false
      f ? callback(new Error('存在重复的名称')) : callback()
    }

    // 部门编码
    const validateCode = async(rule, value, callback) => {
      // 部门编码在整个模块中不允许重复
      // 分析这里包含哪些数据
      // 部门编码-当前要添加的编码
      const code = this.form.code
      // 整个模块-所有部门，发请求
      const { depts } = await getDepartments()
      // 所有部门中是否存在重复编码 部门，如果有报错，如若没有允许添加
      // const f = depts.find(t => t.code === code) // 判断是否有一样的 code（部门编码）
      let f
      if (this.form.id) {
        // 编辑，排查当前部门，允许自己修改自己
        f = depts.filter(t => t.id !== this.form.id).find(t => t.code === code)
      } else {
        // 新增
        f = depts.find(t => t.code === code)
      }
      f ? callback(new Error('存在重复的编码')) : callback()
    }
    return {
      form: {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      },
      rules: {
        //  部门名称（name）：必填 1-50个字符  / 同级部门中禁止出现重复部门
        name: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          },
          {
            min: 1, max: 50, message: '长度在 1- 50 个字符', trigger: 'blur'
          },
          {
            validator: validateName, trigger: 'blur'
          }
        ],
        // 部门编码（code）：必填 1-50个字符  / 部门编码在整个模块中都不允许重复
        code: [
          {
            required: true,
            message: '请输入部门编码',
            trigger: 'blur'
          },
          {
            min: 1, max: 50, message: '长度在 1- 50 个字符', trigger: 'blur'
          },
          {
            validator: validateCode, trigger: 'blur'
          }
        ],
        // 部门负责人（manager）：必填
        manager: [
          {
            required: true,
            message: '请选择部门负责人',
            trigger: 'change'
          }
        ],
        // 部门介绍 ( introduce)：必填 1-300个字符
        introduce: [
          {
            required: true,
            message: '请输入部门介绍',
            trigger: 'blur'
          },
          {
            min: 1, max: 300, message: '长度在 1- 300 个字符', trigger: 'blur'
          }
        ]
      },
      // 员工列表
      managerOptions: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }]
    }
  },
  computed: {},
  watch: {},
  async created() {
    this.managerOptions = await getEmplyeeSimiple()
    // const res = await getEmplyeeSimiple()
    // console.log(res)
  },
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      // 清空了表单的校验效果，情况表单部分自动
      this.$refs['formRef'].resetFields()
      // 清空所有字段
      this.form = {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      }

      // 方式一传参：
      // this.$emit('update-show-dialog', false)
      // 方式二传参：
      this.$emit('update:show-dialog', false)
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        // 发请求
        if (this.form.id) {
          // 编辑
          await updateDepartment(this.form)
        } else {
          // 新增
          await addDepartment({
            ...this.form,
            pid: this.node.id
          })
        }

        // 提示成功
        this.$message.success('添加成功')
        // 刷新列表
        this.$emit('success')
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
