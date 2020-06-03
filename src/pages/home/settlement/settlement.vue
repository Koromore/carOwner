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
          <el-select v-model="memuValue" clearable placeholder="项目组" size="small">
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
    <el-row class="content content1" v-show="tabact==1">
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <el-table-column prop="serNum" label="采购编号" width="360"></el-table-column>
          <el-table-column prop="proTeam" label="项目组" width="240"></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="240"></el-table-column>
          <el-table-column prop="subTime" label="提交时间" min-width="160"></el-table-column>
          <el-table-column prop="account" label="结算清单" width="130" align="center">
            <template>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i class="el-icon-edit" @click="toDetail"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="130" align="center">
            <template>
              <el-tooltip class="item" effect="dark" content="驳回" placement="top">
                <img src="static/images/ico/reject.png" width="24" alt srcset @click="reject" />
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
          :page-size="10"
          layout="total, prev, pager, next ,sizes"
          :total="100"
          background
        ></el-pagination>
      </el-col>
    </el-row>

    <el-row class="content conten2" v-show="tabact==2">
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <el-table-column prop="serNum" label="采购编号" width="360"></el-table-column>
          <el-table-column prop="proTeam" label="项目组" width="240"></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="240"></el-table-column>
          <el-table-column prop="subTime" label="提交时间" min-width="160"></el-table-column>
          <el-table-column prop="expenditure" label="实际支出" width="130" align="center"></el-table-column>
          <el-table-column label="结算清单" width="130" align="center">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <i class="el-icon-view" @click="toDetail"></i>
            </el-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next ,sizes"
          :total="100"
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
      // // top left 选项卡
      // tab1act: 1,
      // top right 选项卡
      tabact: 1,
      // 表格数据
      options: [
        {
          value: '1',
          label: '沃尔沃项目组'
        },
        {
          value: '2',
          label: '吉利项目组'
        },
        {
          value: '3',
          label: '长城项目组'
        }
      ],
      memuValue: '1',
      tableData: [
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29',
          expenditure: 10000
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        },
        {
          serNum: '106945851123',
          proTeam: '吉利组',
          taskName: '6-7月 长城汽车哈佛H系日常',
          subTime: '20-04-29'
        }
      ]
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {
    // tab1(e) {
    //   console.log(e)
    //   this.tab1act = e
    // },
    tab(e) {
      console.log(e)
      this.tabact = e
    },
    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
    },
    ///////// 分页 end /////////

    ///////// 驳回操作 start /////////
    reject() {
      this.$confirm('确认要驳回该任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '驳回成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          })
        })
    },
    ///////// 驳回操作 end /////////

    ///////// 结算清单 start /////////
    toDetail() {
      this.$router.push({
        path: '/home/settlementDetail'
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
    height: 88px;
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
