<template>
  <!-- <div> -->

  <el-header style="height: 60px" id="homeHeader">
    <el-row>
      <el-col :span="17" class="header_left">
        <!-- logo start -->
        <img src="static/images/hander/logo.png" class="logo" alt srcset />
        <!-- logo start -->

        <!-- 导航 start -->
        <div class="navList">
          <div @click="navTo(1)" :class="[navNum==0?'act':'']">任务管理</div>
          <div @click="navTo(2)" :class="[navNum==1?'act':'']" v-if="deptId==90||adminShow">结算管理</div>
          <!-- <div @click="navTo(2)" :class="[navNum==1?'act':'']">结算管理</div> -->
          <div @click="navTo(3)" :class="[navNum==2?'act':'']">车主管理</div>
          <div @click="navTo(8)" :class="[navNum==7?'act':'']">资源管理</div>
          <div @click="navTo(4)" :class="[navNum==3?'act':'']">场地管理</div>
          <div @click="navTo(5)" :class="[navNum==4?'act':'']" v-if="postId==231||adminShow">数据分析</div>
          <!-- <div @click="navTo(5)" :class="[navNum==4?'act':'']">数据分析</div> -->
          <div @click="navTo(6)" :class="[navNum==5?'act':'']" v-if="postId==231||adminShow">元数据管理</div>
          <!-- <div @click="navTo(6)" :class="[navNum==5?'act':'']">元数据管理</div> -->
          <div @click="navTo(7)" :class="[navNum==6?'act':'']">合作文档</div>
        </div>
        <!-- 导航 end -->
      </el-col>

      <el-col :span="7" class="header_right">
        <!-- 搜索框 start -->
        <el-input
          placeholder="请输入内容"
          v-model="searchWord"
          class="input-with-select search"
          size="small"
          clearable
          @keyup.enter.native="searchStart"
          @clear="searchStart"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="任务" value="1"></el-option>
            <el-option label="结算" value="2" :disabled="selectDisabled"></el-option>
            <el-option label="车主" value="3"></el-option>
            <el-option label="场地" value="4"></el-option>
            <el-option label="文档" value="5"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchStart"></el-button>
        </el-input>
        <!-- 搜索框 end -->

        <!-- 用户信息 start -->
        <div class="admin">
          <!-- <i class="el-icon-bell"></i> -->
          <div class="name">{{this.$store.state.user.realName}}</div>

          <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
            <i class="el-icon-switch-button" @click="logout"></i>
          </el-tooltip>
        </div>
        <!-- 用户信息 end -->
      </el-col>
    </el-row>
  </el-header>

  <!-- </div> -->
</template>
<script>
export default {
  name: 'homeHeader',
  props: {
    routeName: String,
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 管理员

      // 搜索内容
      searchWordKey: 0,
      searchWord: '',
      // 搜索维度
      selectDisabled: false,
      select: '1',
      navNum: 0,
    }
  },
  // 侦听器
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    // unread: function(newQuestion, oldQuestion) {
    // }
    routeName: function (newData, oldData) {
      let list = [
        ['task', 'addTask', 'taskDetail', 'tasksettlement'],
        ['settlement', 'settlementDetail'],
        [
          'owners',
          'ownerssite',
          'ownersrecord',
          'ownersschedule',
          'addowners',
          'ownersdetail',
        ],
        ['site', 'sitecarownerlist'],
        ['analysis'],
        ['metadata'],
        ['document'],
        ['resource'],
      ]
      let navNum = 0
      list.forEach((element, i) => {
        for (let j = 0; j < element.length; j++) {
          const element_ = element[j]
          if (newData == element_) {
            // console.log(i)
            this.navNum = i
            break
          }
        }
      })
      // console.log(this.navNum)
    },
  },
  // 钩子函数
  mounted() {
    this.selectDisabledShow()
    // console.log(this.$parent.routeName)
  },
  methods: {
    logout() {
      //退出登录
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.commit('logout')
        })
        .catch(() => {
          this.$message.info('已取消退出！')
        })
    },

    ///////// 搜索事件 start /////////
    searchStart() {
      let select = this.select
      let routeName = this.$route.name
      // let searchWord = {
      //   searchWord: this.searchWord,
      //   select: this.select,
      //   routeName = this.$route.name
      // }
      this.searchWordKey + 1
      let searchWordValue = this.searchWord.replace(/\s+/g, '')
      let searchWord = {
        key: this.searchWordKey,
        value: searchWordValue,
        type: select,
      }
      // console.log(searchWord)
      // console.log(select)
      // console.log(this.$route.name)
      if (select == 1 && routeName !== 'task') {
        this.$router.push({ path: '/home/task' })
      } else if (select == 2 && routeName !== 'settlement') {
        this.$router.push({ path: '/home/settlement' })
      } else if (select == 3 && routeName !== 'owners') {
        this.$router.push({ path: '/home/owners' })
      } else if (select == 4 && routeName !== 'site') {
        this.$router.push({ path: '/home/site' })
      } else if (select == 5 && routeName !== 'document') {
        this.$router.push({ path: '/home/document' })
      }
      this.$emit('sousuo', searchWord)
    },
    ///////// 搜索事件 end /////////

    ///////// 导航页面跳转 start /////////
    navTo(index) {
      this.$store.commit('taskStatus', 0)
      this.$store.commit('ownersType', 1)
      let url = ''
      if (index == 1) {
        url = '/home/task'
      } else if (index == 2) {
        url = '/home/settlement'
      } else if (index == 3) {
        url = '/home/owners'
      } else if (index == 4) {
        url = '/home/site'
      } else if (index == 5) {
        url = '/home/analysis'
      } else if (index == 6) {
        url = '/home/metadata'
      } else if (index == 7) {
        url = '/home/document'
      } else if (index == 8) {
        url = '/home/resource'
      }
      this.$router.push({ path: url })
    },
    ///////// 导航页面跳转 end /////////

    // deptId==90||adminShow
    selectDisabledShow() {
      if (this.deptId == 90 || this.adminShow) {
        this.selectDisabled = false
      } else {
        this.selectDisabled = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#homeHeader {
  background-color: #292929;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .el-row {
    width: 100%;
  }
  .header_left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 128px;
    }
    .navList {
      width: calc(100% - 200px);
      color: #848484;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      // margin-left: 6%;
      font-size: 16px;
      .act {
        // font-weight: 700;
        color: #ffffff;
      }
      div {
        height: 32px;
        line-height: 32px;
        // font-weight: 700;
        cursor: pointer;
        margin-right: 4%;
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
        &:hover {
          // font-weight: 700;
          color: #ffffff;
          box-sizing: border-box;
          border-bottom: 2px solid white;
        }
      }
    }
  }
  .header_right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    .search {
      width: 300px;
      margin-right: 13px;
      .el-select {
        width: 72px;
      }
    }
    .admin {
      // width: 210px;
      color: white;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      i {
        font-size: 24px;
        font-weight: bold;
        margin-left: 13px;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss">
// #homeHeader {
//   .el-input-group__append,
//   .el-input-group__prepend {
//     background: none;
//   }
// }
</style>
