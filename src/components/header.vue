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
          <div @click="navTo(9)" :class="[navNum==8?'act':'']">影视活动</div>
          <div @click="navTo(1)" :class="[navNum==0?'act':'']">任务管理</div>
          <div @click="navTo(2)" :class="[navNum==1?'act':'']" v-if="deptId==90||adminShow">结算管理</div>
          <!-- <div @click="navTo(2)" :class="[navNum==1?'act':'']">结算管理</div> -->
          <div @click="navTo(3)" :class="[navNum==2?'act':'']">车主管理</div>
          <div @click="navTo(8)" :class="[navNum==7?'act':'']" v-if="deptId==90||subordinate==150||adminShow||postId==231">资源管理</div>
          <!-- <div @click="navTo(4)" :class="[navNum==3?'act':'']">场地管理</div> -->
          <div @click="navTo(5)" :class="[navNum==4?'act':'']" v-if="postId==231||adminShow">数据分析</div>
          <!-- <div @click="navTo(5)" :class="[navNum==4?'act':'']">数据分析</div> -->
          <div @click="navTo(6)" :class="[navNum==5?'act':'']" v-if="deptId==90||subordinate==150||postId==231||adminShow">元数据管理</div>
          <!-- <div @click="navTo(6)" :class="[navNum==5?'act':'']">元数据管理</div> -->
          <div @click="navTo(7)" :class="[navNum==6?'act':'']">合作文档</div>
        </div>
        <!-- 导航 end -->
      </el-col>

      <el-col :span="7" class="header_right">
        <div class="doc" @click="doc"><i class="el-icon-document-copy"></i><br><span>帮助</span>
        </div>
        
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
            <el-option label="任务" value="task"></el-option>
            <el-option label="结算" value="settlement" :disabled="selectDisabled"></el-option>
            <el-option label="车主" value="owners"></el-option>
            <!-- <el-option label="场地" value="4"></el-option> -->
            <el-option label="文档" value="document"></el-option>
            <el-option label="摄影师" value="cameraman"></el-option>
            <el-option label="模特" value="model"></el-option>
            <el-option label="场地" value="place"></el-option>
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
      select: 'task',
      navNum: 0,
    }
  },
  // 侦听器
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    // unread: function(newQuestion, oldQuestion) {
    // }
    $route(to, from) {
      let name = to.name
      this.selectChange(name)
      // let nameList = ['task','settlement','owners','document','cameraman','model','place']
      // nameList.forEach(element => {
      //   if (name == element) {
      //     this.select = name
      //   }
      // });
    },
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
        ['activity']
      ]
      let navNum = 0
      list.forEach((element, i) => {
        for (let j = 0; j < element.length; j++) {
          const element_ = element[j]
          if (newData == element_) {
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
    let name = this.$route.name
    this.selectChange(name)
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
      if (select == 'task' && routeName !== 'task') {
        this.$router.push({ path: '/home/task' })
      } else if (select == 'settlement' && routeName !== 'settlement') {
        this.$router.push({ path: '/home/settlement' })
      } else if (select == 'owners' && routeName !== 'owners') {
        this.$router.push({ path: '/home/owners' })
      } else if (select == 'document' && routeName !== 'document') {
        this.$router.push({ path: '/home/document' })
      } else if (select == 'cameraman' && routeName !== 'cameraman') {
        this.$router.push({ path: '/home/resource/cameraman' })
      } else if (select == 'model' && routeName !== 'model') {
        this.$router.push({ path: '/home/resource/model' })
      } else if (select == 'place' && routeName !== 'place') {
        this.$router.push({ path: '/home/resource/place' })
      }
      // this.$emit('sousuo', searchWord)
      this.$store.commit('getSearch', searchWordValue)
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
      } else if (index == 9) {
        url = '/home/activity'
      }
      this.$router.push({ path: url })
    },
    ///////// 导航页面跳转 end /////////

    selectDisabledShow() {
      if (this.deptId == 90 || this.adminShow) {
        this.selectDisabled = false
      } else {
        this.selectDisabled = true
      }
    },
    doc(){
    // let localPath = row.localPath
      let a = document.createElement('a')
      a.download = '车主邀约系统操作手册(项目部版).doc'
      a.setAttribute('href', 'http://223.75.59.219:8082/doc/车主邀约系统操作手册(项目部版).doc')
      a.click()
    },
    selectChange(name){
      let nameList = ['task','settlement','owners','document','cameraman','model','place']
      nameList.forEach(element => {
        if (name == element) {
          this.select = name
        }
      })
    }
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
    height: 60px;
    line-height: 60px;
    .logo {
      width: 128px;
    }
    .navList {
      width: calc(100% - 150px);
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
        margin-right: 5%;
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
    height: 60px;
    // line-height: 60px;
    .search {
      width: 224px;
      margin-right: 13px;
      & >>> .el-input-group__prepend{
        padding: 0 13px;
      }
      .el-select {
        width: 72px;
      }
    }
    .doc{
      cursor: pointer;
      text-align: center;
      color: #fff;
      font-size: 13px;
      margin-right: 6px;
      i{
        font-size: 20px;
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
