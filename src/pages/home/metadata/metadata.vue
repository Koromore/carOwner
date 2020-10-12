<template>
  <div id="metadata">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="24" class="cont">
        <div class="butBox">
          <div
            :class="[tabact==item.name?'but act tabButHover':'but tabButHover']"
            @click="tab(item.name)"
            v-for="(item,index) in tabItems"
            :key="index"
          >{{item.title}}</div>
        </div>
        <div
          class="addContent"
          @click="addContent"
          v-show="tabact!='certifications'&&tabact!='brand'"
        >
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" class="addBtn">添加内容</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容图表 start -->
    <el-row class="content">
      <router-view :openDrawer="openDrawer"></router-view>
    </el-row>
    <!-- 内容图表 end -->
  </div>
</template>
<script>
export default {
  name: 'metadata',
  components: {},
  data() {
    return {
      tabact: 'brand',
      tabItems: [
        {
          id: 1,
          title: '品牌车型',
          name: 'brand',
        },
        {
          id: 2,
          title: '认证车型',
          name: 'certifications',
        },
        {
          id: 3,
          title: '车主类型',
          name: 'carownertype',
        },
        {
          id: 4,
          title: '车主来源',
          name: 'carownersource',
        },
        {
          id: 5,
          title: '车主特长',
          name: 'carownerspeciality',
        },
        {
          id: 6,
          title: '日程类型',
          name: 'scheduletype',
        },
        {
          id: 7,
          title: '场地类型',
          name: 'sitetype',
        },
        {
          id: 8,
          title: '经纪人',
          name: 'agent',
        },
      ],
      // 图表数据
      chartTitle: '任务完成数量',
      chartKeyData: ['执行中', '结算中', '延期', '已完成'],
      chartvalData: [520, 360, 130, 240],
      // 添加内容开关
      openDrawer: 0,
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    this.getRoute()
  },
  // 方法
  methods: {
    ///////// tab切换 start /////////
    tab(e) {
      this.tabact = e
      let url = `/home/metadata/${e}`
      this.$router.push({ path: url })
    },
    ///////// tab切换 end /////////

    ///////// 路由获取 start /////////
    getRoute() {
      // console.log(this.$route)
      this.tabact = this.$route.name
    },
    ///////// 路由获取 end /////////

    ///////// 点击添加内容 start /////////
    addContent() {
      this.openDrawer = this.openDrawer + 1
    },
    ///////// 点击添加内容 end /////////
  },
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#metadata {
  height: 100%;
  .top {
    height: 45px;
    margin-bottom: 9px;
    // background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .cont {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .butBox {
        width: auto;
        // margin-left: 32px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-radius: 3px;
        // border: 1px solid rgb(205, 205, 205);
        .but {
          width: 81px;
          height: 32px;
          line-height: 32px;
          background: white;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
          box-sizing: border-box;
          border-left: 1px solid #f0f0f0;
        }
        .but:nth-of-type(1) {
          border: none;
        }
        .but.act{
          font-weight: bold;
          color: white;
          background: rgb(106, 145, 232);
        }
      }
      .addContent {
        text-align: center;
        color: $icoColor;
        font-size: 12px;
        // margin-right: 36px;
        button {
          width: 136px;
          background: #6a91e8;
        }
        cursor: pointer;
        i {
          font-size: 24px;
        }
      }
    }
  }
  .content {
    height: calc(100% - 54px);
    border-radius: 8px 8px 0 0;
    border: 1px solid #e7e7e7;
    // background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  // 抽屉弹窗新增/编辑数据
  .drawerData {
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    > .el-col {
      margin-bottom: 49px;
      font-size: 20px;
    }
    .keycontent {
      align-self: flex-start;
    }
    .el-input {
      width: 100%;
    }
    .btn {
      // margin: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      button {
        width: 100%;
      }
    }
  }
}
</style>
<style lang="scss">
// 抽屉弹窗新增/编辑数据
$icoColor: rgb(106, 145, 232);
#metadata {
  .table_list {
    height: 100%;
    .el-table {
      .el-table__header {
        th {
          background: none;
        }
      }
    }
    i {
      font-size: 24px;
      color: $icoColor;
      cursor: pointer;
      margin-right: 13px;
    }
  }
  .paging {
    height: 64px;
    box-sizing: border-box;
    padding: 16px;
    text-align: center;
  }
  .el-drawer {
    .btn {
      height: 54px;
      background: white;
      position: absolute;
      left: 0;
      bottom: 0;
      margin-bottom: 0 !important;
      .el-col {
        margin-bottom: 0;
        button {
          width: 100%;
        }
      }
    }
    // el-scrollbar__view
    .drawerData {
      position: relative;
      box-sizing: border-box;
      padding: 20px;
      padding-bottom: 54px;
      // height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      align-content: flex-start;
      > .el-col {
        align-self: flex-start;
        height: 40px;
        line-height: 40px;
        margin-bottom: 49px;
        font-size: 18px;
      }
      .keycontent {
        align-self: flex-start;
      }
      .el-input,
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
