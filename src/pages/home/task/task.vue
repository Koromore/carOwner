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
          <el-button type="success" size="medium" @click="statusChange(0)">执行中</el-button>
          <el-button type="danger" size="medium" @click="statusChange(3)">延期</el-button>
          <el-button type="warning" size="medium" @click="statusChange(1)">结算中</el-button>
          <el-button type="info" size="medium" @click="statusChange(2)">已完成</el-button>
        </el-button-group>
        <div class="add_task" @click="addTask(0)">
          <i class="el-icon-circle-plus-outline"></i>
          <br />新建任务
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <!-- 内容列表1 -->
    <el-row class="content content1" v-show="status==0">
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
                @click="toDetail(scope.row.taskId)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="ownerName" label="邀约对象" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ownerItemList" label="邀约事项" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="typeList" label="邀约车型" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">进行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor4">人工延期</div>
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
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑任务" placement="top">
                <i class="el-icon-edit" @click="addTask(1, scope.row.taskId)"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="延期任务" placement="top">
                <i class="el-icon-timer" @click="delay(scope.row)"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="提交任务" placement="top">
                <i class="el-icon-circle-check" @click="putTask(scope.row)"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除任务" placement="top">
                <i class="el-icon-circle-close" @click="delContent(scope.row.taskId)"></i>
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

    <!-- 内容列表2 -->
    <el-row class="content 内容列表2" v-show="status==3">
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
                @click="toDetail(scope.row.taskId)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="ownerName" label="邀约对象" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ownerItemList" label="邀约事项" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="typeList" label="邀约车型" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">进行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor4">人工延期</div>
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
          <el-table-column prop="delayReason" label="延期原因" min-width="100"></el-table-column>
          <el-table-column prop="address" label="操作" width="200">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑任务" placement="top">
                <i class="el-icon-edit" @click="addTask(1, scope.row.taskId)"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="延期任务" placement="top">
                <i class="el-icon-timer" @click="delay(scope.row)"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="提交任务" placement="top">
                <i class="el-icon-circle-check" @click="putTask"></i>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除任务" placement="top">
                <i class="el-icon-circle-close" @click="delContent(scope.row.taskId)"></i>
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

    <!-- 内容列表3 -->
    <el-row class="content content3" v-show="status==1">
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
                @click="toDetail(scope.row.taskId)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="ownerName" label="邀约对象" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ownerItemList" label="邀约事项" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="typeList" label="邀约车型" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">进行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor4">人工延期</div>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="任务量" min-width="80"></el-table-column>

          <el-table-column prop="listInvite" label="结算进度" min-width="80">
            <!-- <template slot-scope="scope"> -->
            <i class="el-icon-view"></i>
            <!-- </template> -->
          </el-table-column>
          <el-table-column prop="address" label="结算清单" width="200">
            <!-- <template slot-scope="scope"> -->
            <img src="static/images/document/excle.png" width="16" alt srcset />
            <!-- </template> -->
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

    <!-- 内容列表4 -->
    <el-row class="content content4" v-show="status==2">
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
                @click="toDetail(scope.row.taskId)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="ownerName" label="邀约对象" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ownerItemList" label="邀约事项" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="typeList" label="邀约车型" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">进行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor4">人工延期</div>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="任务量" min-width="80"></el-table-column>
          <!-- <el-table-column prop="listInvite" label="车主数量" min-width="80">
            <template slot-scope="scope">
              {{scope.row.listInvite.length}}
            </template>
          </el-table-column>-->
          <el-table-column prop="endTime" label="完成时间" min-width="100" sortable>
            <template slot-scope="scope">{{$date(scope.row.endTime)}}</template>
          </el-table-column>
          <el-table-column prop="invMoney" label="总费用" min-width="100"></el-table-column>
          <el-table-column prop="address" label="结算清单" width="200">
            <!-- <template slot-scope="scope"> -->
            <img src="static/images/document/excle.png" width="16" alt srcset />
            <!-- </template> -->
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

    <!-- 抽屉弹窗延期原因 start -->
    <el-drawer title="延期任务" :visible.sync="drawerDelay" size="566px">
      <el-row class="drawerDelay" v-loading="drawerLoading">
        <el-col :span="4">任务名称:</el-col>
        <el-col :span="20">{{taskName}}</el-col>
        <el-col :span="4">预计时间:</el-col>
        <el-col :span="20">
          <el-date-picker
            v-model="delayTime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
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
            <el-button type="primary" @click="putDelay">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗延期原因 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <el-drawer title="提交任务" :visible.sync="drawerPuttask" size="720px">
      <el-row class="drawerPuttask" v-loading="drawerLoading">
        <el-col :span="4">任务名称:</el-col>
        <el-col :span="20">{{taskName}}</el-col>
        <el-col :span="4" class="keycontent">结算明细:</el-col>
        <el-col :span="20">
          <el-col :span="20">
            <el-input placeholder="搜索车主" suffix-icon="el-icon-search" v-model="input"></el-input>
          </el-col>
          <el-col
            :span="24"
            class="detailList"
            v-for="(item, index) in listInviteList"
            :key="index"
          >
            <el-col :span="5">
              <!-- <el-input placeholder="车主姓名" v-model="item.ownersName" clearable></el-input> -->
              <el-cascader
                :options="options2"
                v-model="item.inviteData"
                clearable
                filterable
                :show-all-levels="false"
              ></el-cascader>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="链接" v-model="item.url" clearable></el-input>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="金额" v-model="item.money" clearable></el-input>
            </el-col>
            <el-col :span="6">
              <el-switch
                style="display: block"
                v-model="item.isCard"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="现金"
                inactive-text="油卡"
              ></el-switch>
            </el-col>
            <!-- {{item}}-{{index}} -->
            <el-col :span="2">
              <!-- <template v-if="index == listInviteList.length-1"> -->
              <i class="el-icon-delete" @click="delDetailList(index)"></i>
              <i class="el-icon-circle-plus-outline" @click="addDetailList"></i>
              <!-- </template> -->
            </el-col>
          </el-col>
          <!-- <el-col :span="24"></el-col>
          <el-col :span="24"></el-col>-->
        </el-col>

        <!-- 底部按钮 -->
        <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary" @click="submitBtn">提交</el-button>
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
      taskId: '', // 任务ID
      taskName: '', // 任务ID
      drawerLoading: false,
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
      loading: false,
      status: 0,
      taskListData: [],
      // 分页信息
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 抽屉弹窗延期因
      drawerDelay: false,
      delayReason: '', // 延期原因
      delayTime: '', // 延期预计时间时间

      // 抽屉弹窗提交任务
      drawerPuttask: false,

      input: '',
      value2: '',
      // 禁止选择当前时间之前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      // 提交任务车主列表
      listInviteList: [],
      // 车主选择器列表
      options2: [],
      listInviteData: []
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
    ///////// 获取车主列表 start /////////
    this.getOwnerList()
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

    ///////// 获取任务列表状态筛选 start /////////
    statusChange(id) {
      this.status = id
      this.getTaskListAjax()
    },
    ///////// 获取任务列表状态筛选 end /////////

    ///////// 获取任务列表 start /////////
    getTaskListAjax() {
      // let data = {
      //   // ids: 0,
      //   // pageNum: 1,
      //   // pageSize: 30
      // }
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        task: {
          deleteFlag: false,
          status: this.status
        }

        // task: {
        //   initUserId: 266
        // }
      }
      this.$axios.post('/ocarplay/task/listAjax', data).then(res => {
        // console.log(res)
        if (res.status == 200 && data) {
          let data = res.data.data
          data.items.forEach(element => {
            element.typeList = []
            element.ownerItemList = []
            element.ownerName = []
            element.listInvite.forEach(element1 => {
              // console.log(element1)
              if (element1.listOwnerType) {
                element.typeList.push(element1.listOwnerType[0].typeName)
                element.ownerItemList.push(element1.listOwnerItem[0].itemName)
                element.ownerName.push(element1.realName)
              }
            })
            element.typeList = element.typeList.join(',')
            element.ownerItemList = element.ownerItemList.join(',')
            element.ownerName = element.ownerName.join(',')
          })
          this.taskListData = data.items
          this.total = data.totalRows
          // console.log(data.items)
        }
      })
    },

    ///////// 获取任务列表 end /////////

    ///////// 添加任务 start /////////
    addTask(type, id) {
      this.$router.push({
        path: '/home/addtask',
        query: { type: type, id: id }
      })
    },
    ///////// 添加任务 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      // console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      this.pageNum = pageNum
      ///////// 获取任务列表 start /////////
      this.getTaskListAjax()
      // console.log(pageNum)
    },
    ///////// 分页 end /////////

    ///////// 延期原因 start /////////
    delay(prm) {
      this.drawerDelay = true
      this.taskId = prm.taskId
      this.taskName = prm.taskName
      console.log(prm)
    },
    putDelay() {
      this.drawerLoading = true
      let endTime = this.$date0(this.delayTime)
      let data = {
        taskId: this.taskId,
        status: 4,
        delayReason: this.delayReason,
        endTime: endTime
      }
      // console.log(data)
      let list = [data.delayReason, data.endTime]
      let falg = true
      list.forEach(element => {
        if (!element) {
          falg = false
        }
      })
      if (falg) {
        this.$axios.post('/ocarplay/task/save', data).then(res => {
          // console.log(res)
          if (res.status == 200 && res.data == 1) {
            this.$message.success('任务延期成功！')
            this.drawerDelay = false
            ///////// 获取任务列表 start /////////
            this.getTaskListAjax()
          } else {
            this.$message.error('任务延期失败！')
          }
          this.drawerLoading = false
        })
      } else {
        this.$message.error('请检查信息是否完整！')
        this.drawerLoading = false
      }
    },
    ///////// 延期原因 end /////////

    ///////// 获取车主列表 start /////////
    getOwnerList() {
      // this.listLoading = true
      let data = {}
      this.$axios
        .post('/ocarplay/api/vehicleOwner/ownerTypeCoopItemOwners', data)
        .then(res => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            console.log(data)
            let list = []
            data.forEach((element, i) => {
              list.push({
                value: element.typeId,
                label: element.typeName,
                children: []
              })
              element.ownerItems.forEach((element1, j) => {
                list[i].children.push({
                  value: element1.itemId,
                  label: element1.itemName,
                  children: []
                })
                element1.vehicleOwners.forEach(element2 => {
                  list[i].children[j].children.push({
                    value: element2.vehicleOwnerId,
                    label: element2.name
                  })
                  // console.log(list[i].children[j])
                })
              })
            })

            this.options2 = list
            // console.log(list)
          }
        })
    },
    ///////// 获取车主列表 end /////////

    ///////// 提交任务 start /////////
    putTask(prm) {
      console.log(prm)
      this.drawerPuttask = true
      this.taskId = prm.taskId
      this.taskName = prm.taskName
      let listInviteList = []

      prm.listInvite.forEach(element => {
        listInviteList.push({
          inviteData: [element.typeId, element.itemId, element.ownerId],
          typeId: element.typeId,
          itemId: element.itemId,
          ownerId: element.ownerId,
          url: '',
          money: '',
          isCard: true
        })
      })
      this.listInviteList = listInviteList
      console.log(this.listInviteList)
    },
    // 添加明细
    addDetailList() {
      this.listInviteList.push({
        inviteData: [],
        typeId: '',
        itemId: '',
        ownerId: '',
        url: '',
        money: '',
        isCard: true
      })
    },
    // 删除明细
    delDetailList(index) {
      let listInviteList = this.listInviteList
      if (listInviteList.length > 1) {
        this.listInviteList.splice(index, 1)
      }
    },
    // 提交按钮
    submitBtn() {
      this.drawerLoading = true
      let listInviteList = this.listInviteList
      listInviteList.forEach(element => {
        element.taskId = this.taskId
        element.typeId = element.inviteData[0]
        element.itemId = element.inviteData[1]
        element.ownerId = element.inviteData[2]
      })
      let data = {
        taskId: this.taskId,
        status: 1,
        listInvite: listInviteList
      }
      data.listInvite.forEach(element => {
        if (element.isCard) {
          element.isCard=1
        }else{
          element.isCard=0
        }
      });
      console.log(data)
      this.$axios
        .post('/ocarplay/task/save', data)
        .then(res => {
          console.log(res)
          if (res.status == 200 && res.data == 1) {
            this.$message.success('任务提交成功！')
            this.drawerLoading = false
            this.drawerPuttask = false
            this.getTaskListAjax()
          } else {
            this.$message.error('任务提交失败！')
            this.drawerLoading = false
          }
        })
        .catch(res => {
          console.log(res)
          // this.putLoading = false
        })
    },
    ///////// 提交任务 end /////////

    ///////// 跳转任务详情页 start /////////
    toDetail(id) {
      this.$router.push({
        name: 'taskDetail',
        // query: { id: id }
        params: {
          id: id
        }
      })
    },
    ///////// 跳转任务详情页 end /////////

    ///////// 删除任务 start /////////
    delContent(id) {
      this.$confirm('确认要删除该任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delTask(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delTask(id) {
      let data = { taskId: id, deleteFlag: 1 }
      this.$axios.post('/ocarplay/task/delTask', data).then(res => {
        console.log(res)
        if (res.status == 200 && res.data == 1) {
          this.$message.success('删除任务成功！')
          ///////// 获取任务列表 start /////////
          this.getTaskListAjax()
        } else {
          this.$message.error('删除任务失败！')
        }
      })
      // .chath(res => {
      //   // if (res.status != 200) {
      //     this.$message.error('网络错误！')
      //   // }
      // })
    }
    ///////// 删除任务 end /////////
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
$statusColor4: #ea8a85;

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
        font-weight: bold;
      }
      .statusColor4 {
        color: $statusColor4;
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
