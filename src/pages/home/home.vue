<template>
  <div id="home">
    <Home-Header :routeName="routeName"></Home-Header>
    <el-main id="content">
      <router-view></router-view>
    </el-main>
  </div>
</template>
<script>
import HomeHeader from '@/pages/header'
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'home',
  components: {
    HomeHeader
  },
  data() {
    return {
      routeName: 'task'
    }
  },
  // 侦听器
  watch: {
    $route(to, from) {
      // console.log(to)
      this.routeName = this.$route.matched[1].name
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // 路由获取
    this.getRoute()
  },
  // 方法
  methods: {
    // 路由获取
    getRoute() {
      // console.log(this.$route)
      this.routeName = this.$route.matched[1].name
    }
  }
}
</script>
<style lang="scss" scoped>
#home {
  background: rgb(228, 230, 236);
  #content {
    box-sizing: border-box;
    height: calc(100vh - 70px);
    padding-top: 13px;
    padding-bottom: 0;
  }
}
</style>
