<template>
  <el-card>
    <el-row type="flex">
      <!-- 左边 -->
      <el-col>
        <!-- 方式一： -->
        <!-- <div v-if="hasBefore" class="before"> -->

        <!-- 方式二： -->
        <div v-if="$slots.before" class="before">
          <i class="el-icon-info"></i>
          <slot name="before"></slot>
        </div>
      </el-col>

      <!-- 右边 -->
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    hasBefore: {
      type: Boolean,
      default: () => true
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

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
.before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
</style>
