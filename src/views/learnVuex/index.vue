<template>
  <div class="VuexIndex">
    <!-- state 数据存放 -->
    <div>
      <!-- 访问 vuex的 state - 方式1-直接访问 -->
      <div>count={{ $store.state.count }}</div>

      <!-- 访问 vuex的 state - 方式2-计算属性 -->
      <div>count={{ count }}</div>

      <!-- 访问 vuex的 state - 方式3-辅助函数 -->
      <div>age={{ age }}</div>
    </div>

    <!-- mutations 同步操作 -->
    <div>
      <!-- 可以，不推荐，不会保存数据，不方便维护 -->
      <!-- <button @click="$store.state.count++">+1</button> -->

      <!-- 访问mutations-方式，直接 -->
      <button @click="$store.commit('add')">+1</button>
      <button @click="$store.commit('addN', 3)">+N</button>
      <!-- 访问mutations方式2，辅助函数 -->
      <button @click="add">+1</button>
      <button @click="addN(3)">+N</button>
    </div>

    <!-- actions 异步操作 -->
    <div>
      <!-- 访问actions-方式，直接 -->
      <button @click="$store.dispatch('addSync')">+1sync</button>
      <!-- 访问actions-方式，辅助函数 -->
      <button @click="addSync">+1sync</button>
      <button @click="NewAddSync(10)">+10sync</button>
    </div>

    <br />

    <!-- getters 计算属性 -->
    <div>
      <p>getters原始访问：{{ $store.getters.showCount }}</p>
      <p>getters辅助函数：{{ showCount }}</p>
    </div>

    <br />

    <!-- 模块化（moduel） Vuex -->
    <div>
      <p>更新test模块的token={{ $store.state.test.token }}</p>
      <p>更新根模块的token={{ $store.state.token }}</p>
      <!-- 调用了根模块的 'setToken' -->
      <button @click="$store.commit('setToken', 222)">点击更新token-根模块</button>
      <!-- 直接调用 加了锁的模块方法：'test/setToken' -->
      <button @click="$store.commit('test/setToken', 111)">点击更新token-test模块</button>
      <!-- 映射调用的方法 加了锁的模块方法 setToken(333) -->
      <button @click="setToken(333)">点击更新token-映射方法</button><br />

      <!-- actions 加了锁的模块方法  -->
      <button @click="$store.dispatch('test/login')">login-点击更新token-test模块</button>
      <button @click="login">login-点击更新token-映射方法</button>
    </div>

    <!-- 图标的使用 -->
    <div>
      <svg-icon icon-class="eye" class-name="color-red"></svg-icon>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {}
  },
  computed: {
    // 方式3：辅助函数的方法
    ...mapState(['count', 'age']),
    // 方式2：计算属性
    // count() {
    //   return this.$store.state.count
    // }
    // 计算属性 getters
    ...mapGetters(['showCount'])
  },
  methods: {
    ...mapMutations(['add', 'addN']),
    ...mapActions(['addSync', 'NewAddSync']),
    // 模块化 映射方法 ...mapMutations('模块名称', 映射变量:数据类型是数组)
    ...mapMutations('test', ['setToken']),
    // 模块化 映射方法 ...mapMutations('模块名称', 映射变量:数据类型是数组)
    ...mapActions('test', ['login'])
  }

}
</script>

<style scoped>
.color-red {
  color: red;
}
</style>
