<template>
  <div id="home">
    <Home-Header :routeName="routeName"></Home-Header>
    <el-main id="content">
      <router-view :carSeriesList="carSeriesList"></router-view>
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
      // 0-进行中，1-结算中，2-完成，3-延期，4-人工延期
      routeName: 'task',
      carSeriesList: []
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
    // 清空缓存
    // this.$store.commit('clearToken')
    this.getCarSeriesLists()
  },
  // 方法
  methods: {
    // 路由获取
    getRoute() {
      // console.log(this.$route)
      this.routeName = this.$route.matched[1].name
    },
    ///////// 获取车型列表 start /////////
    getCarSeriesLists() {
      // this.listLoading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 30
      }
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', data)
        .then(res => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            let data = res.data.carTypes

            let carSeriesList = [
              {
                value: 105,
                label: '沃尔沃',
                children: []
              },
              {
                value: 110,
                label: '吉利',
                children: []
              },
              {
                value: 153,
                label: '长城',
                children: []
              }
            ]
            data.forEach(element => {
              let children = {
                value: element.carTypeId,
                label: element.carTypeName
              }
              if (element.deptId == 105) {
                carSeriesList[0].children.push(children)
              } else if (element.deptId == 110) {
                carSeriesList[1].children.push(children)
              } else if (element.deptId == 153) {
                carSeriesList[2].children.push(children)
              }
            })
            this.carSeriesList = carSeriesList
            // console.log(carSeriesList)
          }
        })
    }
    ///////// 获取车型列表 end /////////
  }
}
</script>
<style lang="scss" scoped>
#home {
  background: rgb(228, 230, 236);
  #content {
    min-width: 1300px;
    box-sizing: border-box;
    height: calc(100vh - 70px);
    padding-top: 9px;
    padding-bottom: 0;
  }
}
</style>
<style lang="scss">
#home {
  .el-drawer__body{
    height: calc(100% - 87px);
  }
  .omit {
    width: 100%;
    text-align: left;
    span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .imp{
    background: url('../../../static/images/ico/imp.png') left center no-repeat;
    background-size: 9px 9px;
  }
}
</style>
