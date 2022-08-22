<template>
  <div>
    <!--  :visible="showDailog" -->
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入权限名称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="form.code" placeholder="请输入权限标识" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入权限描述" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="开启" prop="enVisible">
          <el-switch v-model="form.enVisible" active-value="1" inactive-value="0"></el-switch>
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
import { addPermission, updatePermission } from '@/api/permission'
export default {
  name: 'AddPerm',
  components: {},
  inheritAttrs: false,
  props: {
    showDailog: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {
        name: undefined,
        code: undefined,
        description: undefined,
        enVisible: '0',
        type: 1,
        pid: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入权限名称',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入权限标识',
          trigger: 'blur'
        }],
        description: []
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      // this.$refs['formRef'].resetFields()
      // this.$emit('close')
      // this.form = {
      //   name: undefined,
      //   code: undefined,
      //   description: undefined,
      //   enVisible: '0',
      //   type: 1,
      //   pid: ''
      // }

      // 关闭操作-方式2-通过 v-if 销毁组件
      this.$emit('close')
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        if (this.form.id) { // 区分编辑/新增操作
          // 编辑
          await updatePermission(this.form)
        } else {
          // 新增
          await addPermission(this.form)
        }
        // 发送请求 并且在data定义数据
        await addPermission(this.form)
        // 提示成功
        this.$message.success('操作很成功')
        // 通知父组件做刷新-方式1-发消息
        // this.$emit('success')
        // 通知父组件做刷新-方式2-通过$parent直接找到父组件
        this.$parent.getPermissionList()
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
