<template>
  <!-- <div> -->

  <el-header style="height: 70px" class="homeHeader">
    <el-row>
      <el-col :span="14" class="header_left">
        <!-- logo start -->
        <el-col :span="4">
          <img src="static/images/hander/logo.png" class="logo" alt srcset />
        </el-col>
        <!-- logo start -->

        <!-- 导航 start -->
        <el-col :span="20" class="navList">
          <div>任务管理</div>
          <div>结算管理</div>
          <div>车主管理</div>
          <div>场地管理</div>
          <div>数据分析</div>
          <div>元数据管理</div>
          <div>合作文档</div>
        </el-col>
        <!-- 导航 end -->
      </el-col>

      <el-col :span="10" class="header_right">
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
            <el-option label="项目" value="1"></el-option>
            <el-option label="任务" value="2"></el-option>
            <el-option label="文档" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchStart"></el-button>
        </el-input>
        <!-- 搜索框 end -->

        <!-- 用户信息 start -->
        <div class="admin">
          <i class="el-icon-bell"></i>
          <div class="name">超级管理员</div>
          <i class="el-icon-switch-button"></i>
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
  props: {},
  data() {
    return {
      // 搜索内容
      searchWord: '',
      // 搜索维度
      select: '项目'
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
    ///////// 搜索事件 start /////////
    searchStart() {
      let searchWord = this.searchWord
      let select = this.select
      console.log(searchWord, select)
    }
    ///////// 搜索事件 end /////////
  }
}
</script>

<style lang="scss" scoped>
// .homeHeader {
//   width: 100%;
//   height: 70px;
//   box-sizing: border-box;
//   background-color: rgb(197, 197, 197);
//   position: fixed;
//   top: 0;
  .el-header {
    background-color: rgb(197, 197, 197);
    padding: 0 18px 0 54px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .el-row{
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
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
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
      }
      .admin {
        width: 210px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        i {
          font-size: 32px;
          font-weight: bold;
        }
      }
    }
  }
// }
</style>
