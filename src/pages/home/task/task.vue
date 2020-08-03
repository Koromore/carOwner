<template>
  <div id="task">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="12" class="left">
        <el-button-group v-if="deptId!=90">
          <el-button type="success" size="small" @click="statusChange(0)">执行中</el-button>
          <el-button type="danger" size="small" @click="statusChange(3)">延期</el-button>
          <el-button type="warning" size="small" @click="statusChange(1)">结算中</el-button>
          <el-button type="info" size="small" @click="statusChange(2)">已完成</el-button>
        </el-button-group>
      </el-col>

      <el-col :span="12" class="right">
        <!-- 邀约对象 -->
        <el-select
          v-model="typeId"
          filterable
          clearable
          placeholder="邀约对象"
          size="small"
          @change="typeIdChange"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 邀约事项 -->
        <el-select
          v-model="itemId"
          filterable
          clearable
          placeholder="邀约事项"
          size="small"
          @change="itemIdChange"
        >
          <el-option
            v-for="item in itemIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 邀约车型 -->
        <el-select
          v-model="carSeriesId"
          filterable
          clearable
          placeholder="邀约车型"
          size="small"
          @change="carSeriesIdChange"
        >
          <el-option
            v-for="item in carSeriesIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="add_task" @click="addTask(0)" v-if="subordinate==150||adminShow">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small">新建任务</el-button>
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
          :header-row-style="{'height': '54px'}"
          :header-cell-style="{'color': '#000'}"
          height="100%"
          v-loading="loading"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link
                target="_blank"
                class="omit"
                :underline="false"
                @click="toDetail(scope.row.taskId)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop label="任务类型" min-width="90" show-overflow-tooltip>拍摄</el-table-column>
          <el-table-column prop="ownerName" label="邀约对象" min-width="130" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="ownerItemList" label="邀约事项" min-width="130" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop label="摄影师" min-width="90" show-overflow-tooltip>摄影师</el-table-column>
          <el-table-column prop label="模特" min-width="90" show-overflow-tooltip>模特</el-table-column>
          <el-table-column prop label="场地" min-width="90" show-overflow-tooltip>场地</el-table-column>
          <el-table-column prop="carSeriesName" label="邀约车型" min-width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="scope.row.carSeriesName">{{scope.row.carSeriesName}}</template>
              <template v-else>
                <span
                  v-for="(item, index) in scope.row.listTaskOfCartype"
                  :key="index"
                >{{item.carTypeName}},</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">执行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor4">人工延期</div>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="任务进度" min-width="80">
            <template slot-scope="scope">{{scope.row.inviteNumOver}}/{{scope.row.num}}</template>
          </el-table-column>
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
          <el-table-column prop="address" label="操作" min-width="140" v-if="subordinate==150||deptId==90||adminShow">
            <template slot-scope="scope">
              <template v-if="deptId!=90">
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
                  <i
                    class="el-icon-circle-close"
                    @click="delContent(scope.row.taskId)"
                    v-if="postId==231||adminShow"
                  ></i>
                </el-tooltip>
              </template>
              <template v-else>
                <el-tooltip class="item" effect="dark" content="完善任务" placement="top">
                  <i class="el-icon-document-checked" @click="addTask(1, scope.row.taskId)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑任务" placement="top">
                  <i class="el-icon-edit" @click="addTask(1, scope.row.taskId)"></i>
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 内容列表2 -->
    <el-row class="content content2" v-show="status==3">
      <div class="table_list">
        <el-table
          :data="taskListData"
          style="width: 100%"
          :header-row-style="{'height': '54px'}"
          :header-cell-style="{'color': '#000'}"
          height="100%"
          v-loading="loading"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link
                target="_blank"
                class="omit"
                :underline="false"
                @click="toDetail(scope.row.taskId)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop label="任务类型" min-width="90" show-overflow-tooltip>拍摄</el-table-column>
          <el-table-column prop="ownerName" label="邀约对象" min-width="130" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="ownerItemList" label="邀约事项" min-width="130" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop label="摄影师" min-width="90" show-overflow-tooltip>摄影师</el-table-column>
          <el-table-column prop label="模特" min-width="90" show-overflow-tooltip>模特</el-table-column>
          <el-table-column prop label="场地" min-width="90" show-overflow-tooltip>场地</el-table-column>
          <el-table-column prop="carSeriesName" label="邀约车型" min-width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="scope.row.carSeriesName">{{scope.row.carSeriesName}}</template>
              <template v-else>
                <span
                  v-for="(item, index) in scope.row.listTaskOfCartype"
                  :key="index"
                >{{item.carTypeName}},</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">执行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor4">人工延期</div>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="任务进度" min-width="80">
            <template slot-scope="scope">{{scope.row.inviteNumOver}}/{{scope.row.num}}</template>
          </el-table-column>
          <el-table-column prop="listInvite" label="车主数量" min-width="80">
            <template slot-scope="scope">{{scope.row.listInvite.length}}</template>
          </el-table-column>
          <el-table-column prop="endTime" label="预计时间" min-width="100" sortable>
            <template slot-scope="scope">{{$date(scope.row.endTime)}}</template>
          </el-table-column>
          <el-table-column prop="delayReason" label="延期原因" min-width="100"></el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            min-width="160"
            v-if="subordinate==150||adminShow"
          >
            <!-- this.$store.state -->
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
                <i
                  class="el-icon-circle-close"
                  @click="delContent(scope.row.taskId)"
                  v-if="postId==231||adminShow"
                ></i>
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
          :page-sizes="[20, 30, 50]"
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
          :header-row-style="{'height': '54px'}"
          :header-cell-style="{'color': '#000'}"
          height="100%"
          v-loading="loading"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link
                target="_blank"
                class="omit"
                :underline="false"
                @click="toDetail(scope.row.taskId)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop label="任务类型" min-width="90" show-overflow-tooltip>拍摄</el-table-column>
          <el-table-column prop="ownerName" label="邀约对象" min-width="130" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="ownerItemList" label="邀约事项" min-width="130" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop label="摄影师" min-width="90" show-overflow-tooltip>摄影师</el-table-column>
          <el-table-column prop label="模特" min-width="90" show-overflow-tooltip>模特</el-table-column>
          <el-table-column prop label="场地" min-width="90" show-overflow-tooltip>场地</el-table-column>
          <el-table-column prop="carSeriesName" label="邀约车型" min-width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="scope.row.carSeriesName">{{scope.row.carSeriesName}}</template>
              <template v-else>
                <span
                  v-for="(item, index) in scope.row.listTaskOfCartype"
                  :key="index"
                >{{item.carTypeName}},</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">执行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor4">人工延期</div>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="任务进度" min-width="80">
            <template slot-scope="scope">{{scope.row.inviteNumOver}}/{{scope.row.num}}</template>
          </el-table-column>
          <el-table-column prop="listInvite" label="结算进度" min-width="80" v-if="subordinate==150">
            <template slot-scope="scope">
              <i class="el-icon-view" @click="toSettlement(scope.row)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="结算清单" width="200">
            <template slot-scope="scope">
              <img src="static/images/document/excle.png" width="16" alt srcset />
              <el-link @click="exportInvite(scope.row)">{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[20, 30, 50]"
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
          :header-row-style="{'height': '54px'}"
          :header-cell-style="{'color': '#000'}"
          height="100%"
          v-loading="loading"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link
                target="_blank"
                class="omit"
                :underline="false"
                @click="toDetail(scope.row.taskId)"
              >{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop label="任务类型" min-width="90" show-overflow-tooltip>拍摄</el-table-column>
          <el-table-column prop="ownerName" label="邀约对象" min-width="130" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="ownerItemList" label="邀约事项" min-width="130" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop label="摄影师" min-width="90" show-overflow-tooltip>摄影师</el-table-column>
          <el-table-column prop label="模特" min-width="90" show-overflow-tooltip>模特</el-table-column>
          <el-table-column prop label="场地" min-width="90" show-overflow-tooltip>场地</el-table-column>
          <el-table-column prop="carSeriesName" label="邀约车型" min-width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="scope.row.carSeriesName">{{scope.row.carSeriesName}}</template>
              <template v-else>
                <span
                  v-for="(item, index) in scope.row.listTaskOfCartype"
                  :key="index"
                >{{item.carTypeName}},</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <!-- {{scope.row.status}} -->
              <div v-if="scope.row.status==0" class="statusColor0">执行中</div>
              <div v-if="scope.row.status==1" class="statusColor1">结算中</div>
              <div v-if="scope.row.status==2" class="statusColor2">完成</div>
              <div v-if="scope.row.status==3" class="statusColor3">延期</div>
              <div v-if="scope.row.status==4" class="statusColor4">人工延期</div>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="车主数量" min-width="80"></el-table-column>
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
            <template slot-scope="scope">
              <img src="static/images/document/excle.png" width="16" alt srcset />
              <el-link @click="exportInvite(scope.row)">{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[20, 30, 50]"
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
            <el-button type="info" @click="cancel">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary" @click="putDelay">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗延期原因 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <el-drawer title="提交任务" :visible.sync="drawerPuttask" size="720px" v-loading="drawerLoading">
      <el-scrollbar style="height:100%">
        <el-row class="drawerPuttask">
          <el-col :span="4">任务名称:</el-col>
          <el-col :span="20">{{taskName}}</el-col>
          <el-col :span="4" class="keycontent">结算明细:</el-col>
          <el-col :span="20">
            <!-- <el-col :span="20">
              <el-input placeholder="搜索车主" suffix-icon="el-icon-search" v-model="input"></el-input>
            </el-col>-->
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
                  size="medium"
                ></el-cascader>
              </el-col>
              <el-col :span="6">
                <el-input placeholder="链接" size="medium" v-model="item.url" clearable></el-input>
              </el-col>
              <el-col :span="4">
                <el-input placeholder="金额" size="medium" v-model="item.money" clearable></el-input>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" size="medium" v-if="!item.isCard">油卡</el-button>
                <el-button type="success" size="medium" v-else>现金</el-button>
              </el-col>
              <el-col :span="4">
                <i class="el-icon-document-copy" @click="copyDetailList(index)"></i>
                <i class="el-icon-delete" @click="delDetailList(index)"></i>
                <i class="el-icon-circle-plus-outline" @click="addDetailList"></i>
              </el-col>
              <!-- {{item}}-{{index}} -->
            </el-col>
            <!-- {{listInviteList}} -->
          </el-col>
        </el-row>
      </el-scrollbar>

      <!-- 底部按钮 -->
      <el-col :span="24" class="btn">
        <el-col :span="6" :offset="5">
          <el-button type="info" @click="submitBtn(1)">提交</el-button>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-button type="primary" @click="submitBtn(0)">保存</el-button>
        </el-col>
      </el-col>
    </el-drawer>
    <!-- 抽屉弹窗提交任务 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法
import FileSaver from 'file-save'
import { saveAs } from 'file-saver'

export default {
  name: 'task',
  props: ['searchWordData'],
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员

      taskId: '', // 任务ID
      taskName: '', // 任务NAME
      taskDeptId: '', // 任务部门ID
      drawerLoading: false,
      detailList: [
        {
          ownersName: '',
          link: '',
          sum: '',
          type: true,
        },
        {
          ownersName: '',
          link: '',
          sum: '',
          type: true,
        },
      ],
      // 筛选start
      typeList: [
        {
          value: 1,
          label: '支持型',
        },
        {
          value: 2,
          label: '拍摄型',
        },
        {
          value: 3,
          label: '资源型',
        },
      ],
      typeId: '',
      itemIdList: [],
      itemId: '',
      carSeriesIdList: [],
      carSeriesId: '',
      // 筛选end
      options: [],
      value: '',
      // 表格数据
      loading: false,
      status: this.$store.state.taskStatusNum,
      taskListData: [],
      // 分页信息
      pageNum: 1,
      pageSize: 30,
      total: 0,
      // 抽屉弹窗延期因
      drawerDelay: false,
      delayReason: '', // 延期原因
      delayTime: '', // 延期预计时间

      // 抽屉弹窗提交任务
      drawerPuttask: false,

      input: '',
      value2: '',
      // 禁止选择当前时间之前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        },
      },
      // 提交任务车主列表
      listInviteList: [],
      // 车主选择器列表
      options2: [],
      listInviteData: [],
    }
  },
  // 侦听器
  watch: {
    searchWordData: function (newData, oldData) {
      // console.log(newData)
      this.getTaskListAjax()
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // this.foreach()
    ///////// 获取合作事项列表 start /////////
    // this.getshowOwnerType()
    ///////// 获取车系列表 start /////////
    this.getCarSeriesLists()
    ///////// 获取任务列表 /////////
    this.getTaskListAjax()
    ///////// 获取车主列表 start /////////
    this.getOwnerList()
  },
  // 方法
  methods: {
    ///////// 获取合作事项列表 start /////////
    getshowOwnerType() {
      let data = { typeId: this.typeId }
      this.$axios
        .post('/ocarplay/api/vehicleOwner/getOwnerTypeItems', data)
        .then((res) => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            // console.log(res)
            let data = res.data
            let itemIdList = []
            data.forEach((element) => {
              // console.log(element)
              // let listId = element.itemIds.split('/')
              // let listName = element.itemName.split('/')
              // listId.forEach((element0, i) => {
              itemIdList.push({
                value: element.itemId,
                label: element.itemName,
              })
              // })
            })
            this.itemIdList = itemIdList
          }
        })
    },
    ///////// 获取合作事项列表 end /////////

    ///////// 获取车系列表 start /////////
    getCarSeriesLists() {
      let eventList = []
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', {})
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data.carTypes
            let carSeriesList = []
            data.forEach((element, i) => {
              if (element.deptId == 110) {
                element.deptName = '吉利'
              }
              carSeriesList.push({
                value: element.carTypeId,
                label: `${element.deptName}—${element.carTypeName}`,
              })
            })
            this.carSeriesIdList = carSeriesList
          }
        })
    },
    ///////// 获取车系列表 end /////////

    ///////// 任务列表对象筛选 start /////////
    typeIdChange(id) {
      // this.status = id
      this.itemId = ''
      this.getTaskListAjax()
      this.getshowOwnerType()
    },
    ///////// 任务列表对象筛选 end /////////

    ///////// 任务列表事项筛选 start /////////
    itemIdChange(id) {
      // this.status = id
      this.getTaskListAjax()
    },
    ///////// 任务列表事项筛选 end /////////

    ///////// 任务列表车型筛选 start /////////
    carSeriesIdChange(id) {
      // this.status = id
      this.getTaskListAjax()
    },
    ///////// 任务列表状态筛选 end /////////

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
      this.loading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        task: {
          deleteFlag: false,
          status: this.status,
          typeId: this.typeId,
          itemId: this.itemId,
          carSeriesId: this.carSeriesId,
          taskName: this.searchWordData.value,
        },

        // task: {
        //   initUserId: 266
        // }
      }
      this.$axios.post('/ocarplay/task/listAjax', data).then((res) => {
        // console.log(res)
        if (res.status == 200 && data) {
          let data = res.data.data
          data.items.forEach((element) => {
            element.typeList = []
            element.ownerItemList = []
            element.ownerName = []
            element.invMoney = 0
            element.inviteNumOver = 0
            element.listInvite.forEach((element1) => {
              // console.log(element1)
              if (element1.listOwnerType) {
                element.typeList.push(element1.listOwnerType[0].typeName)
                element.ownerItemList.push(element1.listOwnerItem[0].itemName)
                element.ownerName.push(element1.realName)
              }
              element.invMoney += element1.money
              if (element1.isWrite == 1) {
                element.inviteNumOver += 1
              }
            })
            // Array.form(new Set(arr))
            element.typeList = [...new Set(element.typeList)]
            element.ownerItemList = [...new Set(element.ownerItemList)]
            element.ownerName = [...new Set(element.ownerName)]
            // console.log(element.typeList)
            element.typeList = element.typeList.join(',')
            element.ownerItemList = element.ownerItemList.join(',')
            element.ownerName = element.ownerName.join(',')
          })
          this.taskListData = data.items
          this.total = data.totalRows
          this.loading = false
          // console.log(data.items)
        }
      })
    },

    ///////// 获取任务列表 end /////////

    ///////// 添加任务 start /////////
    addTask(type, id) {
      this.$store.commit('taskStatus', this.status)
      this.$router.push({
        path: '/home/addtask',
        query: { type: type, id: id },
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
        endTime: endTime,
      }
      // console.log(data)
      let list = [data.delayReason, data.endTime]
      let falg = true
      list.forEach((element) => {
        if (!element) {
          falg = false
        }
      })
      if (falg) {
        this.$axios.post('/ocarplay/task/save', data).then((res) => {
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
      let data = []
      this.$axios
        .post('/ocarplay/api/vehicleOwner/ownerTypeCoopItemOwners', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            // console.log(data)
            let list = []
            data.forEach((element, i) => {
              list.push({
                value: element.typeId,
                label: element.typeName,
                children: [],
              })
              element.ownerItems.forEach((element1, j) => {
                list[i].children.push({
                  value: element1.itemId,
                  label: element1.itemName,
                  children: [],
                })
                element1.vehicleOwners.forEach((element2) => {
                  if (
                    element2.coopNum &&
                    element2.alreadyCooperateNum &&
                    element2.coopNum - element2.alreadyCooperateNum <= 0
                  ) {
                    // cosnole.log()
                    list[i].children[j].children.push({
                      value: element2.vehicleOwnerId,
                      label: element2.name,
                      disabled: true,
                    })
                  } else {
                    list[i].children[j].children.push({
                      value: element2.vehicleOwnerId,
                      label: element2.name,
                    })
                  }
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
      // console.log(prm)
      this.drawerLoading = true
      this.drawerPuttask = true
      this.taskId = prm.taskId
      this.taskDeptId = prm.deptId
      this.taskName = prm.taskName
      let data = {
        taskId: prm.taskId,
      }
      this.$axios.post('/ocarplay/task/edit', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data.data
          let listInviteList = []
          data.listInvite.forEach((element) => {
            listInviteList.push({
              inviteData: [element.typeId, element.itemId, element.ownerId],
              typeId: element.typeId,
              itemId: element.itemId,
              ownerId: element.ownerId,
              url: element.url,
              money: element.money,
              isCard: element.isCard,
            })
          })
          this.listInviteList = listInviteList
          this.drawerLoading = false
        }
      })
    },
    putTaskif(prm) {
      // console.log(prm)
      if (prm.taskType == 3) {
        if (prm) {
        } else {
          this.$message.error('无法提交，模特摄影师信息采购尚未填写')
        }
      } else {
        this.drawerLoading = true
        this.drawerPuttask = true
        this.taskId = prm.taskId
        this.taskDeptId = prm.deptId
        this.taskName = prm.taskName
        let data = {
          taskId: prm.taskId,
        }
        this.$axios.post('/ocarplay/task/edit', data).then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data.data
            let listInviteList = []
            data.listInvite.forEach((element) => {
              listInviteList.push({
                inviteData: [element.typeId, element.itemId, element.ownerId],
                typeId: element.typeId,
                itemId: element.itemId,
                ownerId: element.ownerId,
                url: element.url,
                money: element.money,
                isCard: element.isCard,
              })
            })
            this.listInviteList = listInviteList
            this.drawerLoading = false
          }
        })
      }
    },
    // 添加明细
    copyDetailList(index) {
      let listInviteList = this.listInviteList
      let data = {
        inviteData: listInviteList[index].inviteData,
        typeId: '',
        itemId: '',
        ownerId: '',
        url: '',
        money: '',
        isCard: false,
      }
      this.listInviteList.splice(index + 1, 0, data)
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
        isCard: false,
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
    submitBtn(e) {
      this.drawerLoading = true
      let listInviteList = this.listInviteList
      listInviteList.forEach((element) => {
        element.taskId = this.taskId
        element.typeId = element.inviteData[0]
        element.itemId = element.inviteData[1]
        element.ownerId = element.inviteData[2]
        if (element.url && element.money) {
          element.isWrite = 1
        } else {
          element.isWrite = 0
        }
      })
      let data = {
        taskId: this.taskId,
        deptId: this.taskDeptId,
        status: e,
        updateTime: this.$time0(new Date()),
        listInvite: listInviteList,
        nowUserId: this.userId,
        nowUserDeptId: this.deptId,
      }
      let flag = true
      data.listInvite.forEach((element) => {
        if (!element.ownerId) {
          flag = false
        }
      })
      if (flag) {
        data.listInvite.forEach((element) => {
          if (element.isCard) {
            element.isCard = 1
          } else {
            element.isCard = 0
          }
        })
        // console.log(data)
        this.$axios
          .post('/ocarplay/task/save', data)
          .then((res) => {
            // console.log(res)
            if (res.status == 200 && res.data == 1) {
              if (e) {
                this.$message.success('任务提交成功！')
              } else {
                this.$message.success('任务保存成功！')
              }

              this.drawerLoading = false
              this.drawerPuttask = false
              this.getTaskListAjax()
            } else {
              this.$message.error('任务提交失败！')
              this.drawerLoading = false
            }
          })
          .catch((res) => {
            console.log(res)
            // this.putLoading = false
          })
      } else {
        this.drawerLoading = false
        this.$message.error('请选择车主！')
      }
    },
    ///////// 提交任务 end /////////

    ///////// 跳转任务详情页 start /////////
    toDetail(id) {
      this.$store.commit('taskStatus', this.status)
      this.$router.push({
        path: '/home/taskDetail',
        query: { id: id },
        // params: {
        //   id: id
        // }
      })
    },
    ///////// 跳转任务详情页 end /////////

    ///////// 跳转结算进度页 start /////////
    toSettlement(prm) {
      this.$store.commit('taskStatus', this.status)
      this.$router.push({
        path: '/home/tasksettlement',
        query: {
          id: prm.taskId,
        },
      })
    },
    ///////// 跳转结算进度页 end /////////

    ///////// 删除任务 start /////////
    delContent(id) {
      this.$confirm('确认要删除该任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.delTask(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    delTask(id) {
      let data = { taskId: id, deleteFlag: 1 }
      this.$axios.post('/ocarplay/task/delTask', data).then((res) => {
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
    },
    ///////// 删除任务 end /////////

    ///////// 导出结算清单 end /////////
    exportInvite(prm) {
      let data = {
        taskId: prm.taskId,
      }
      this.$axios
        .post('/ocarplay/api/invite/exportInvite', data, {
          responseType: 'blob', //--设置请求数据格式
        })
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            // this.$message.success('删除任务成功！')
            // ///////// 获取任务列表 start /////////
            // this.getTaskListAjax()
            var blob = new Blob([res.data], {
              type: 'text/plain;charset=utf-8',
            })
            saveAs(blob, prm.taskName + '.xls')
          } else {
            this.$message.error('下载失败！')
          }
        })
    },
    ///////// 导出结算清单 end /////////

    ///////// 取消按钮 start /////////
    cancel() {
      this.drawerDelay = false
      this.drawerPuttask = false
      // 延期任务数据清除
      this.delayTime = ''
      this.delayReason = ''
      // 提交任务数据清除
      this.input = ''
    },
    ///////// 取消按钮 end /////////

    /**
     * [exportBtn] 导出Excel
     */
    exportBtn() {
      // console.log(this.Cpoint)
      // console.log(this.Structure)
      var type = ''
      if (this.Cpoint && this.Structure) {
        type = 3
      } else if (this.Cpoint) {
        type = 1
      } else if (this.Structure) {
        type = 2
      } // return;
      this.exportExl = false // this.$axios.post("/nmbs_back/api/idea/exportMyExcel?type=3&ideaId=" + this.ideaId,{},{
      this.$axios
        .post(
          '/nmbs_back/api/idea/exportMyExcel?type=' +
            type +
            '&ideaId=' +
            this.ideaId,
          {},
          {
            headers: {
              'content-type': 'application/json; charset=utf-8',
            },
            responseType: 'blob', //--设置请求数据格式
          }
        )
        .then((res) => {
          // console.log(res.data)
          var blob = new Blob([res.data], { type: 'text/plain;charset=utf-8' })
          // saveAs(blob, '导出excel.xls')
        })
        .catch(() => {
          // console.log('捕获错误')
        })
    },
  },
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: #6a91e8;
$statusColor0: #67c23a;
$statusColor1: #e6a23c;
$statusColor2: #909399;
$statusColor3: #f56c6c;
$statusColor4: #ea8a85;

#task {
  height: 100%;
  .top {
    height: 45px;
    margin-bottom: 9px;
    // background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .left {
      box-sizing: border-box;
      padding-right: 36px;
      .el-button-group {
        margin-right: 39px;
        button {
          width: 81px;
        }
      }
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      .el-select {
        width: 136px;
        margin-right: 9px;
      }
      .add_task {
        button {
          width: 136px;
          background: $icoColor;
        }
      }
    }
  }
  .content {
    height: calc(100% - 54px);
    border: 1px solid #dddddd;
    border-radius: 8px 8px 0 0;
    // background: #fff;
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
      // .el-table {
      //   background: none;
      //   & >>> .el-table__header-wrapper{
      //     margin-bottom: 10px;
      //     border-radius: 8px 8px 0 0;
      //   }
      //   & >>> .el-table__body-wrapper{
      //     background: #fff;
      //   }
      //   .el-table__header {
      //     th {
      //       background: none;
      //     }
      //   }
      // }
      i {
        font-size: 20px;
        color: $icoColor;
        cursor: pointer;
        margin-right: 9px;
      }
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
    padding-bottom: 54px;
    padding-bottom: 20px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    > .el-col {
      margin-bottom: 16px;
      font-size: 18px;
      min-height: 40px;
      // line-height: 40px;
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
      margin-bottom: 18px;
    }
    .keycontent {
      align-self: flex-start;
    }
    .el-input {
      width: 100%;
    }
  }
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
}
</style>
