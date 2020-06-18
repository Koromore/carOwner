<template>
  <!-- <div> -->

  <el-header style="height: 70px" id="homeHeader">
    <el-row>
      <el-col :span="14" class="header_left">
        <!-- logo start -->
        <img src="static/images/hander/logo.png" class="logo" alt srcset />
        <!-- logo start -->

        <!-- 导航 start -->
        <div class="navList">
          <div @click="navTo(1)" :class="[routeName=='task'?'act':'']">任务管理</div>
          <div @click="navTo(2)" :class="[routeName=='settlement'?'act':'']">结算管理</div>
          <div @click="navTo(3)" :class="[routeName=='owners'?'act':'']">车主管理</div>
          <div @click="navTo(4)" :class="[routeName=='site'?'act':'']">场地管理</div>
          <div @click="navTo(5)" :class="[routeName=='analysis'?'act':'']">数据分析</div>
          <div @click="navTo(6)" :class="[routeName=='metadata'?'act':'']">元数据管理</div>
          <div @click="navTo(7)" :class="[routeName=='document'?'act':'']">合作文档</div>
        </div>
        <!-- 导航 end -->
      </el-col>

      <el-col :span="10" class="header_right">
        <!-- 搜索框 start -->
        <!-- <el-input
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
            <el-option label="结算" value="2"></el-option>
            <el-option label="车主" value="3"></el-option>
            <el-option label="场地" value="4"></el-option>
            <el-option label="文档" value="5"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchStart"></el-button>
        </el-input> -->
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
    routeName: String
  },
  data() {
    return {
      // 搜索内容
      searchWord: '',
      // 搜索维度
      select: '1'
    }
  },
  // 侦听器
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    // unread: function(newQuestion, oldQuestion) {
    // }
  },
  // 钩子函数
  mounted() {
    // this.countIsRead()
  },
  methods: {
    logout() {
      //退出登录
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
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
      let searchWord = this.searchWord
      let select = this.select
      console.log(searchWord, select)
    },
    ///////// 搜索事件 end /////////

    ///////// 导航页面跳转 start /////////
    navTo(index) {
      this.$store.commit('taskStatus', 0)
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
      }
      this.$router.push({ path: url })
    }
    ///////// 导航页面跳转 end /////////
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
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
      width: calc(100% - 128px);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      .act {
        font-weight: 700;
        color: rgba(106, 145, 232, 1);
      }
      div {
        cursor: pointer;
      }
    }
  }
  .header_right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    .search {
      width: 320px;
      margin-right: 13px;
      .el-select {
        width: 81px;
      }
    }
    .admin {
      width: 210px;
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
// }
</style>
