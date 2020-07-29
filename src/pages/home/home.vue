<template>
  <div id="home">
    <Home-Header :routeName="routeName" :adminShow="adminShow" @sousuo="getSearchWord"></Home-Header>
    <el-main id="content">
      <router-view :carSeriesList="carSeriesList" :searchWordData="searchWordData"></router-view>
    </el-main>
  </div>
</template>
<script>
import HomeHeader from '@/components/header'
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'home',
  components: {
    HomeHeader,
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 一级部门ID

      // 0-进行中，1-结算中，2-完成，3-延期，4-人工延期
      routeName: 'task',
      carSeriesList: [],
      userList: [],
      // 搜索
      searchWordData: '',
    }
  },
  // 侦听器
  watch: {
    $route(to, from) {
      // console.log(to)
      this.routeName = this.$route.matched[1].name
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {
    // 判断超级管理员
    this.gitAdmin()
  },
  mounted() {
    // 路由获取
    this.getRoute()
    // 清空缓存
    // this.$store.commit('clearToken')
    this.getCarSeriesLists()
    this.getUserListAjax()
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
        pageSize: 100,
      }
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', data)
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            let data = res.data.carTypes

            let carSeriesList = [
              {
                value: 105,
                label: '沃尔沃',
                children: [],
              },
              {
                value: 110,
                label: '吉利',
                children: [],
              },
              {
                value: 153,
                label: '长城',
                children: [],
              },
            ]
            data.forEach((element) => {
              let children = {
                value: element.carTypeId,
                label: element.carTypeName,
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
    },
    ///////// 获取车型列表 end /////////

    ///////// 用户列表获取 start /////////
    getUserListAjax(res) {
      let userList = this.userList
      if (userList.length == 0) {
        this.$axios.post('/ocarplay/api/user/list').then((res) => {
          if (res.status == 200 && res.data.errcode == 0) {
            this.userList = res.data.data
          }
        })
      }
    },
    ///////// 用户列表获取 end /////////
    gitAdmin() {
      let adminList = [
        704,
        160,
        152,
        134,
        3910,
        4001,
        4023,
        3985,
        521,
        266,
        10,
        3962,
      ]
      // 姚菲、杜总、谭总、成总、黄天倚、石杨、张倩、朱俊、潘群、冯永强、陆彪、刘小龙
      let userId = this.userId
      let adminShow = false
      adminList.forEach((element) => {
        if (userId == element) {
          adminShow = true
        }
      })
      this.$store.commit('getAdminShow', adminShow)
    },
    // 接受搜索字段
    getSearchWord(data) {
      this.searchWordData = data
      // console.log(this.searchWordData)
    },
  },
}
</script>
<style lang="scss" scoped>
#home {
  background: rgb(241, 241, 241);
  #content {
    min-width: 1300px;
    box-sizing: border-box;
    height: calc(100vh - 60px);
    padding-top: 9px;
    padding-bottom: 0;
  }
}
</style>
<style lang="scss">
#home {
  .el-drawer__body {
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
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .imp {
    background: url('../../../static/images/ico/imp.png') left center no-repeat;
    background-size: 9px 9px;
  }
  .el-table {
    background: none;
    .el-table__header-wrapper {
      margin-bottom: 10px;
      border-radius: 8px 8px 0 0;
      // background: #fff;
    }
    .el-table__body-wrapper {
      background: #fff;
    }
    .el-table__header {
      th {
        background: none;
      }
    }
  }
  .paging {
    height: 64px;
    box-sizing: border-box;
    padding: 16px;
    text-align: center;
    background: #fff;
  }
}
#home .el-table td,
#home .el-table th {
  padding: 9px 0;
}
.el-image {
  display: block;
  .el-icon-circle-close {
    color: #fff;
  }
}
.el-table::before {
  height: 0px;
}
</style>
