<template>
  <div id="tasksettlement">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <!-- <el-row class="top"> -->
      <el-col :span="8" class="left cont">
        <div @click="previous">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </el-col>
      <el-col :span="8" class="center cont">车主结算进度</el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content" v-loading="listLoading">
      <el-col :span="5">
        <div class="butBox">
          <div :class="[tabact==1?'but act':'but']" @click="tab(1)">已结算</div>
          <div :class="[tabact==0?'but act':'but']" @click="tab(0)">未结算</div>
        </div>
      </el-col>
      <el-col :span="18">
        <div style="height: 36px;line-height: 36px;">已结算{{isOverNum}}个车主</div>
      </el-col>
      <el-col :span="24" class="table_list">
        <div class="items" v-for="(item,index) in tasksettlementList" :key="index">
          <div class="left">
            <el-image :src="'/ocarplay/'+item.image" fit="cover"></el-image>
            <!-- <el-image src="/ocarplay/uploadtemp//doc/1591854750967.jpg" fit="cover"></el-image> -->
          </div>
          <div class="right">
            <p>车主姓名：{{item.name}}</p>
            <p>
              车主类型：{{item.typeName}}
            </p>
            <p>车主来源：{{item.sourceName}}</p>
          </div>
          <div class="bottom">
            结算费用{{item.money}}
            <template v-if="item.isCard">现金</template>
            <template v-else>油卡</template>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="paging">
        <el-pagination
          @current-change="changePage"
          :current-page="1"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
import cities from '@/common/cities.js' // 引入城市数据
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'tasksettlement',
  components: {},
  data() {
    return {
      tabact: 1,
      options: [
        {
          value: '',
          label: '全部车主'
        },
        {
          value: 1,
          label: '支持型车主'
        },
        {
          value: 2,
          label: '拍摄型车主'
        },
        {
          value: 3,
          label: '资源型车主'
        }
      ],
      memuValue: '',
      // 表格数据
      tasksettlementList: [],
      isOverNum: 0,
      listLoading: false,
      // 分页
      total: 0,
      pageNum: '',
      pageSize: 12
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取车主列表 start /////////
    this.getTasksettlementList(true)
    console.log(this.$route.params.id)
  },
  // 方法
  methods: {
    ///////// tab切换 start /////////
    tab(e) {
      this.tabact = e
      let isOver = ''
      if (e == 1) {
        isOver = true
      }else{
        isOver = null
      }
      ///////// 获取结算进度 start /////////
      this.getTasksettlementList(isOver)
    },
    ///////// tab切换 end /////////

    ///////// 获取结算进度 start /////////
    getTasksettlementList(isOver) {
      let data = {
        invite: {
          taskId: this.$route.params.id,
          isOver: isOver
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$axios
        .post('/ocarplay/api/invite/getInvitePageListByTaskId', data)
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            let data = res.data
            res.data.items.forEach(element => {
              element.prove0 = ''
            })
            this.tasksettlementList = res.data.items
            console.log(this.tasksettlementList)
            this.total = data.totalRows
            if (isOver) {
              this.isOverNum = data.totalRows
            }
            //       total: 0,
            // pageSize: 10,
            // pageNum: 1,
          }
        })
    },
    ///////// 获取结算进度 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    // changeSize(pageSize) {
    //   console.log(pageSize)
    // },
    // 页码变换时触发事件
    changePage(pageNum) {
      this.pageNum = pageNum
    }
    ///////// 分页 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#tasksettlement {
  height: 100%;
  .top {
    height: 88px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .cont {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .left {
      justify-content: flex-start;
      font-size: 22px;
      padding-left: 36px;
      div {
        cursor: pointer;
      }
      i {
        font-weight: bold;
      }
    }
    .center {
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }
    .right {
      justify-content: flex-end;
      padding-right: 36px;
      color: $icoColor;
      font-size: 13px;
      div {
        text-align: center;
        cursor: pointer;
      }
      i {
        font-size: 28px;
      }
    }
  }
  .content {
    height: calc(100% - 88px);
    background: #fff;
    .butBox {
      width: 162px;
      margin-left: 36px;
      margin-bottom: 13px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-radius: 6px;
      border: 1px solid rgb(205, 205, 205);
      .but {
        width: 81px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        box-sizing: border-box;
        border-left: 1px solid rgb(205, 205, 205);
      }
      .but:nth-of-type(1) {
        border: none;
      }
      .but.act,
      .but:hover {
        font-weight: bold;
        color: white;
        background: rgb(106, 145, 232);
      }
    }
    .table_list {
      height: calc(100% - 115px);
      padding: 0 36px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      .items {
        width: 420px;
        height: 200px;
        box-sizing: border-box;
        padding: 18px;
        border: 1px solid rgb(187, 187, 187);
        border-radius: 9px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        align-items: flex-start;
        .left {
          width: 174px;
          height: 123px;
          .el-image {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          width: 190px;
          height: 123px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          .el-image {
            width: 100%;
            height: 100%;
          }
        }
        .bottom {
          width: 100%;
          text-align: center;
          color: $icoColor;
        }
      }
    }
    .paging {
      height: 64px;
      box-sizing: border-box;
      padding: 16px;
      text-align: center;
    }
  }
}
</style>
