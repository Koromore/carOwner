<template>
  <div id="home">
    <Home-Header
      :routeName="routeName"
      :adminShow="adminShow"
    ></Home-Header>
    <el-main id="content">
      <router-view
        :carSeriesList="carSeriesList"
      ></router-view>
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

      // console.log(this.$route)
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
              {
                deptId: 106,
                label: '东本',
                children: [],
              },
              {
                deptId: 117,
                label: '内容一组',
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
              } else if (element.deptId == 106) {
                carSeriesList[3].children.push(children)
              } else if (element.deptId == 117) {
                carSeriesList[4].children.push(children)
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
    gitAdmin(){
      let adminList = [704,160,152,134,3910,4001,4023,3985,521,266,10,3962]
                    // 姚菲、杜总、谭总、成总、黄天倚、石杨、张倩
      let userId = this.userId
      let adminShow = false
      adminList.forEach((element) => {
        if (userId == element) {
          adminShow = true
        }
      })
      this.$store.commit('getAdminShow', adminShow)
    },
  },
}
</script>
<style lang="scss" scoped>
#home {
  background: rgb(241, 241, 241);
  #content {
    min-width: 1300px;
    height: calc(100vh - 60px);
    padding-top: 9px;
    padding-bottom: 0;
  }
}
</style>
<style lang="scss">
#home {
  /////////// 图标按钮效果 start //////////////
  .addBtn {
    overflow: hidden;
    border: none;
    i {
      position: relative;
      top: 49px;
      right: 49px;
      transition: top 0.5s, right 0.5s, background 0.5s;
      font-size: 14px;
    }
    span {
      margin-left: -7px;
      transition: margin-left 0.5s;
    }
    &:hover {
      background: #315dbd !important;
    }
    &:hover span {
      margin-left: 5px;
    }
    &:hover i {
      top: 0;
      right: 0;
    }
  }
  /////////// 图标按钮效果 end //////////////
  .el-drawer__body {
    height: calc(100% - 87px);
  }
  .noData {
    text-align: center;
    color: #666;
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
  /////////// 按钮打开效果 start //////////////
  .SlideOpen {
    vertical-align: middle;
    position: relative;
    border: none;
    z-index: 1;
    -webkit-backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    color: #7986cb;
    background: #7e497b;
    color: white;
  }
  /*  */
  .SlideOpen::before,
  .SlideOpen::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 50%;
    left: 0;
    background: #409eff;
    color: #fff;
    overflow: hidden;
    transition: transform 0.3s;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }

  .SlideOpen::before {
    top: 0;
    // padding-top: 1em;
    line-height: 272%;
  }

  .SlideOpenM::before {
    line-height: 260%;
  }

  .SlideOpen::after {
    bottom: 0;
    line-height: 0;
  }

  .SlideOpen > span {
    display: block;
    transform: scale3d(0.2, 0.2, 1);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }

  .SlideOpen:hover::before {
    transform: translate3d(0, -100%, 0);
  }

  .SlideOpen:hover::after {
    transform: translate3d(0, 100%, 0);
  }

  .SlideOpen:hover > span {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  /////////// 按钮打开效果 end //////////////
  /////////// 选项卡移入效果 start //////////////
  .tabButHover {
    // width: 150px;
    // height: 45px;
    vertical-align: middle;
    position: relative;
    z-index: 1;
    -webkit-backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    // border: none;
    background: white;
    // transition: color 0.4s;
  }

  .tabButHover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #6a91e8;
    z-index: -1;
    opacity: 0;
    -webkit-transform: scale3d(0.7, 1, 1);
    transform: scale3d(0.7, 1, 1);
    -webkit-transition: -webkit-transform 0.4s, opacity 0.4s;
    transition: transform 0.4s, opacity 0.4s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }

  .tabButHoverAss::before{
    background: #67a9d6;
  }

  .tabButHover:hover {
    color: #fff;
    font-weight: bold;
  }

  .tabButHover:hover::before {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /////////// 选项卡移入效果 end //////////////
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
