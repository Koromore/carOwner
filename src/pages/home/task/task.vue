<template>
  <div id="task">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="12" class="left">
        <!-- 邀约对象 -->
        <el-select v-model="value" clearable placeholder="邀约对象" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 邀约事项 -->
        <el-select v-model="value" clearable placeholder="邀约事项" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 邀约车型 -->
        <el-select v-model="value" clearable placeholder="邀约车型" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="12" class="right">
        <el-button-group>
          <el-button type="success" size="medium">执行中</el-button>
          <el-button type="danger" size="medium">延期</el-button>
          <el-button type="warning" size="medium">结算中</el-button>
          <el-button type="info" size="medium">已完成</el-button>
        </el-button-group>
        <div class="add_task" @click="addTask(0)">
          <i class="el-icon-circle-plus-outline"></i>
          <br />新建任务
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-table
          :data="taskListData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="320" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link
                target="_blank"
                class="omit"
                :underline="false"
                @click="toDetail(scope.row.id)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="邀约对象" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="matter" label="邀约事项" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="carTypeName" label="邀约车型" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">进行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor3">人工延期</div>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="任务量" min-width="80"></el-table-column>
          <el-table-column prop="listInvite" label="车主数量" min-width="80">
            <template slot-scope="scope">
              <!-- <div> -->
              {{scope.row.listInvite.length}}
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column prop="endTime" label="预计时间" min-width="100" sortable>
            <template slot-scope="scope">{{$date(scope.row.endTime)}}</template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="200">
            <template>
              <el-tooltip class="item" effect="dark" content="编辑任务" placement="top">
                <i class="el-icon-edit" @click="addTask(1)"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="延期任务" placement="top">
                <i class="el-icon-timer" @click="delay"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="提交任务" placement="top">
                <i class="el-icon-circle-check" @click="putTask"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除任务" placement="top">
                <i class="el-icon-circle-close" @click="delTask"></i>
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
    <!-- 内容列表 end -->

    <!-- 抽屉弹窗延期原因 start -->
    <el-drawer title="延期任务" :visible.sync="drawerDelay" size="566px">
      <el-row class="drawerDelay">
        <el-col :span="4">任务名称:</el-col>
        <el-col :span="20">日常超精拍摄邀约</el-col>
        <el-col :span="4">所属项目:</el-col>
        <el-col :span="20">6-7月 长城汽车哈佛H系日常</el-col>
        <el-col :span="4">预计时间:</el-col>
        <el-col :span="20">
          <el-date-picker v-model="delayTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="4" class="key keycontent">延期说明:</el-col>
        <el-col :span="20">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="delayReason"></el-input>
        </el-col>
        <!-- 底部按钮 -->
        <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗延期原因 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <el-drawer title="提交任务" :visible.sync="drawerPuttask" size="720px">
      <el-row class="drawerPuttask">
        <el-col :span="4">任务名称:</el-col>
        <el-col :span="20">日常超精拍摄邀约</el-col>
        <el-col :span="4" class="keycontent">结算明细:</el-col>
        <el-col :span="20">
          <el-col :span="20">
            <el-input placeholder="搜索车主" suffix-icon="el-icon-search" v-model="input"></el-input>
          </el-col>
          <el-col :span="24" class="detailList" v-for="(item, index) in detailList" :key="index">
            <el-col :span="5">
              <el-input placeholder="车主姓名" v-model="item.ownersName" clearable></el-input>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="链接" v-model="item.link" clearable></el-input>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="金额" v-model="item.sum" clearable></el-input>
            </el-col>
            <el-col :span="6">
              <el-switch
                style="display: block"
                v-model="item.type"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="油卡"
                inactive-text="现金"
              ></el-switch>
            </el-col>
            <el-col :span="2">
              <template v-if="index == detailList.length-1">
                <i class="el-icon-delete" @click="delDetailList"></i>
                <i class="el-icon-circle-plus-outline" @click="addDetailList"></i>
              </template>
            </el-col>
          </el-col>
          <el-col :span="24"></el-col>
          <el-col :span="24"></el-col>
        </el-col>

        <!-- 底部按钮 -->
        <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗提交任务 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'task',
  components: {},
  data() {
    return {
      detailList: [
        {
          ownersName: '',
          link: '',
          sum: '',
          type: true
        },
        {
          ownersName: '',
          link: '',
          sum: '',
          type: true
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      // 表格数据
      taskListData: [],
      // 抽屉弹窗延期原因
      drawerDelay: false,
      delayReason: '', // 延期原因
      delayTime: '', // 延期预计时间时间

      // 抽屉弹窗提交任务
      drawerPuttask: false,

      input: '',
      value2: ''
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // this.foreach()
    ///////// 获取任务列表 /////////
    this.getTaskListAjax()
  },
  // 方法
  methods: {
    ///////// 循环 start /////////
    // foreach() {
    //   for (let i = 0; i < 30; i++) {
    //     // const element = array[i];
    //     this.tableData.push({
    //       id: i,
    //       name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
    //       type: '拍摄型车主',
    //       matter: '日常素材',
    //       vehicle: '长城哈佛H6',
    //       state: '执行中',
    //       taskNum: '6',
    //       carNum: '6',
    //       expertTime: '20-06-01'
    //     })
    //   }
    // },
    ///////// 循环 end /////////

    ///////// 获取任务列表 start /////////
    getTaskListAjax() {
      // let data = {
      //   // ids: 0,
      //   // pageNum: 1,
      //   // pageSize: 30
      // }
      let data = {
        taskt: {
          initUserId: 266
        }
      }
      this.$axios.post('/ocarplay/task/listAjax', data).then(res => {
        console.log(res)
        if (res.status == 200 && data) {
          let data = res.data
          this.taskListData = data.items
        }
      })
    },

    ///////// 获取任务列表 end /////////

    ///////// 添加任务 start /////////
    addTask(type) {
      this.$router.push({
        path: '/home/addtask',
        query: { type: type }
      })
    },
    ///////// 添加任务 end /////////

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

    ///////// 延期原因 start /////////
    delay() {
      this.drawerDelay = true
    },
    ///////// 延期原因 end /////////

    ///////// 提交任务 start /////////
    putTask() {
      this.drawerPuttask = true
    },
    ///////// 提交任务 end /////////

    ///////// 删除任务 start /////////
    delTask() {
      this.$confirm('确认要删除该任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    ///////// 删除任务 end /////////

    ///////// 跳转任务详情页 start /////////
    toDetail(id) {
      this.$router.push({
        path: '/home/taskdetail',
        query: { id: id }
      })
    },
    ///////// 跳转任务详情页 end /////////

    ///////// 提交任务删除结算明列表 start /////////
    delDetailList() {
      let detailList = this.detailList
      if (detailList.length > 1) {
        this.detailList.pop()
      }
    },
    ///////// 提交任务删除结算明列表 end /////////

    ///////// 提交任务删除结算明列表 start /////////
    addDetailList() {
      this.detailList.push({
        ownersName: '',
        link: '',
        sum: '',
        type: true
      })
    }
    ///////// 提交任务删除结算明列表 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
$statusColor0: #67c23a;
$statusColor1: #e6a23c;
$statusColor2: #909399;
$statusColor3: #f56c6c;
#task {
  height: 100%;
  .top {
    height: 88px;
    margin-bottom: 9px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .left {
      box-sizing: border-box;
      padding-left: 32px;
      .el-select {
        width: 160px;
      }
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      padding-right: 24px;
      .el-button-group {
        margin-right: 49px;
        button {
          width: 81px;
          border: none;
        }
      }
      .add_task {
        text-align: center;
        color: $icoColor;
        font-size: 13px;
        cursor: pointer;
        i {
          font-size: 26px;
          font-weight: bold;
        }
      }
    }
  }
  .content {
    height: calc(100% - 97px);
    background: #fff;
    .table_list {
      height: calc(100% - 64px);
      .statusColor0 {
        color: $statusColor0;
      }
      .statusColor1 {
        color: $statusColor1;
      }
      .statusColor2 {
        color: $statusColor2;
      }
      .statusColor3 {
        color: $statusColor3;
      }
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
  }
  // 抽屉弹窗延期原因样式
  .drawerDelay {
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    .el-col {
      margin-bottom: 36px;
      font-size: 18px;
    }
    .keycontent {
      align-self: flex-start;
    }
    .el-input {
      width: 100%;
    }
  }
  // 抽屉弹窗提交任务样式
  .drawerPuttask {
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    > .el-col {
      margin-bottom: 36px;
      font-size: 18px;
    }
    i {
      color: $icoColor;
      cursor: pointer;
    }
    .detailList {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      margin-top: 18px;
    }
    .keycontent {
      align-self: flex-start;
    }
    .el-input {
      width: 100%;
    }
  }
  .btn {
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
}
</style>
