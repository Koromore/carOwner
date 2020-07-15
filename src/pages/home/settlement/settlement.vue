<template>
  <div id="settlement">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="12" class="left">
        <!-- <div class="butBox">
          <div :class="[tab1act==1?'but act':'but']" @click="tab1(1)">采购结算</div>
          <div :class="[tab1act==2?'but act':'but']" @click="tab1(2)">采购统计</div>
        </div>-->
      </el-col>

      <el-col :span="12" class="right">
        <div class="memu">
          <el-select
            v-model="memuValue"
            clearable
            placeholder="项目组"
            size="small"
            @change="memuChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="butBox">
          <div :class="[tabact==1?'but act':'but']" @click="tab(1)">未结算</div>
          <div :class="[tabact==2?'but act':'but']" @click="tab(2)">已结算</div>
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <!-- 未结算 -->
    <el-row class="content content1" v-show="tabact==1">
      <div class="table_list">
        <el-table
          :data="inviteListData"
          style="width: 100%"
          :header-row-style="{'height': '59px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="serNum" label="采购编号" min-width="180"></el-table-column> -->
          <el-table-column prop="deptName" label="项目组" min-width="130"></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="360"></el-table-column>
          <el-table-column prop="updateTime" label="提交时间" min-width="160">
            <template slot-scope="scope">{{$date(scope.row.updateTime)}}</template>
          </el-table-column>
          <el-table-column prop="account" label="结算清单" width="130" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="清单" placement="top">
                <i class="el-icon-edit" @click="toDetail(scope.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="130" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="驳回" placement="top">
                <img
                  src="static/images/ico/reject.png"
                  width="24"
                  alt
                  srcset
                  @click="reject(scope.row.taskId)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 已结算 -->
    <el-row class="content conten2" v-show="tabact==2">
      <div class="table_list">
        <el-table
          :data="inviteListData1"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)'}"
          height="100%"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="serNum" label="采购编号" min-width="180"></el-table-column> -->
          <el-table-column prop="deptName" label="项目组" min-width="130"></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="360"></el-table-column>
          <el-table-column prop="updateTime" label="提交时间" min-width="160">
            <template slot-scope="scope">{{$date(scope.row.updateTime)}}</template>
          </el-table-column>
          <el-table-column prop="invMoney" label="实际支出" width="130" align="center"></el-table-column>
          <el-table-column label="结算清单" width="130" align="center">
            <template slot-scope="scope">
              <el-tooltip effect="dark" content="查看清单" placement="top">
                <i class="el-icon-view" @click="toDetail(scope.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'settlement',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId,
      // // top left 选项卡
      // tab1act: 1,
      // top right 选项卡
      tabact: 1,
      // 表格数据
      options: [
        {
          value: 105,
          label: '沃尔沃项目组'
        },
        {
          value: 110,
          label: '吉利项目组'
        },
        {
          value: 153,
          label: '长城项目组'
        }
      ],
      memuValue: '',
      // 未结算数据列表
      inviteListData: [],
      // 已结算数据列表
      inviteListData1: [],
      // 分页数据
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取结算列表 start /////////
    this.getInviteList(this.memuValue)
  },
  // 方法
  methods: {
    // tab1(e) {
    //   console.log(e)
    //   this.tab1act = e
    // },
    tab(e) {
      console.log(e)
      this.tabact = e
      this.getInviteList(this.memuValue)
    },

    ///////// 选择项目组 start /////////
    memuChange(res) {
      ///////// 获取结算列表 start /////////
      this.getInviteList(res)
    },
    ///////// 选择项目组 end /////////

    ///////// 获取结算列表 start /////////
    getInviteList(id) {
      let data = {
        task: {
          deleteFlag: false,
          status: 0,
          deptId: this.memuValue
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let tabact = this.tabact
      if (tabact == 1) {
        data.task.status = 1
        this.$axios.post('/ocarplay/api/invite/getTaskOfInviteList', data).then(res => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            this.inviteListData = data.items
            this.total = data.totalRows
          }
        })
      } else if (tabact == 2) {
        data.task.status = 2
        this.$axios
          .post('/ocarplay/api/invite/getTaskOfInviteList', data)
          .then(res => {
            // console.log(res)
            if (res.status == 200) {
              let data = res.data
              this.inviteListData1 = data.items
              this.total = data.totalRows
            }
          })
      }
    },
    ///////// 获取结算列表 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
      this.pageNum = 1
      this.pageSize = pageSize
      let id = this.memuValue
      this.getInviteList(id)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      // this.pageSize = pageSize
      let id = this.memuValue
      this.getInviteList(id)
    },
    ///////// 分页 end /////////

    ///////// 驳回操作 start /////////
    reject(id) {
      this.$confirm('确认要驳回该任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.repulseInvite(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          })
        })
    },
    // 驳回任务请求
    repulseInvite(id) {
      let data = {
        taskId: id,
        status: 0
      }
      this.$axios.post('/ocarplay/api/invite/repulseInvite', data).then(res => {
        console.log(res)
        if (res.status == 200 && res.data.errcode == 0) {
          this.$message.success(res.data.msg)
          // this.drawerLoading = false
          // this.drawerPuttask = false
          // this.getTaskListAjax()
          ///////// 获取结算列表 start /////////
          this.getInviteList(this.memuValue)
        } else {
          // this.$message.error("任务提交失败！")
          // this.drawerLoading = false
        }
      })
    },
    ///////// 驳回操作 end /////////

    ///////// 结算清单 start /////////
    toDetail(prm) {
      this.$router.push({
        // name: 'settlementDetail',
        
        // params: {
        //   id: prm.taskId,
        //   name: prm.taskName
        // },
        path: '/home/settlementDetail',
        query: {
          id: prm.taskId,
          name: prm.taskName
        }
      })
    }
    ///////// 结算清单 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#settlement {
  height: 100%;
  .top {
    height: 72px;
    margin-bottom: 9px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      padding-right: 24px;
      .memu {
        margin-right: 36px;
      }
      .butBox {
        $tabBg: rgb(126, 189, 81);
        // width: 220px;
        // height: 46px;
        overflow: hidden;
        background: rgb(160, 160, 160);
        color: white;
        border-radius: 6px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .but {
          width: 81px;
          height: 34px;
          line-height: 34px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
        }
        .but.act,
        .but:hover {
          background: $tabBg;
          color: white;
        }
        .but:hover {
          background: $tabBg;
        }
      }
    }
  }
  .content {
    height: calc(100% - 97px);
    background: #fff;
    .table_list {
      height: calc(100% - 64px);
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
      img {
        cursor: pointer;
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
