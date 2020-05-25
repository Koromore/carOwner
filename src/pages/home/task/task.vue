<template>
  <div class="task">
    
    <Home-Header></Home-Header>
    <!-- Hello world! -->
    <el-main>Main</el-main>
  </div>
</template>
<script>
import HomeHeader from '@/pages/header'
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'task',
  components: {
    HomeHeader
  },
  data() {
    return {}
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
