<template>
  <!-- 作用域插槽 接收参数：slot-scope="{data}" -->
  <el-row type="flex" style="width:100%">
    <el-col>{{ data.name }}</el-col>
    <el-col>
      <el-row type="flex" justify="end">
        <!-- 负责人 -->
        <span style="margin-right: 10px">{{ data.manager }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <slot></slot>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTools',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
