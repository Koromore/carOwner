<template>
  <div id="activity">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="24" class="box">
        <div>
          <!-- <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
            @click="toAddactivity(0, 0)"
          >
            新增活动
          </el-button> -->

           <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
            @click="handleCashOut"
          >
            批量请款
          </el-button>
          <el-button
            type="primary"
            size="small"
            plain
            icon="el-icon-chat-line-square"
            @click="toAddAdvisory"
          >
            采购咨询
          </el-button>
        </div>

        <div>
          <el-button-group>
            <el-button type="success" size="small" @click="statusChange(0)">
              执行中
            </el-button>
            <el-button type="danger" size="small" @click="statusChange(3)">
              延期
            </el-button>
            <!-- <el-button type="warning" size="small" @click="statusChange(1)">结算中</el-button> -->
            <el-button
              type="info"
              size="small"
              @click="statusChange(2)"
              v-if="deptId != 90"
              >已完成</el-button
            >
          </el-button-group>
          <el-button type="info" size="small">拍摄时间</el-button>
          <el-date-picker
            v-model="filtrateShootingTime"
            size="small"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <!-- {{filtrateShootingTime}} -->
          <el-select
            v-model="activityType"
            filterable
            clearable
            placeholder="活动类型"
            size="small"
          >
            <el-option
              v-for="item in activityTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="appraise"
            filterable
            clearable
            placeholder="是否评价"
            size="small"
          >
            <el-option
              v-for="item in appraiseList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="linkState"
            filterable
            clearable
            placeholder="链接状态"
            size="small"
          >
            <el-option
              v-for="item in linkStateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="searchBox">
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
            <el-select
              class="searchType"
              v-model="selectType"
              slot="prepend"
              placeholder="选择"
            >
              <el-option label="车辆" value="1"></el-option>
              <el-option label="摄影师" value="2"></el-option>
              <el-option label="模特" value="3"></el-option>
              <!-- <el-option label="场地" value="4"></el-option> -->
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchStart"
            ></el-button>
          </el-input>
          <!-- 搜索框 end -->
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <!-- 内容列表1  -->
    <el-row class="content content1">
      <div class="table_list">
        <el-table
          :data="movieListData"
          style="width: 100%"
          :header-row-style="{ height: '54px' }"
          :header-cell-style="{ color: '#000' }"
          height="100%"
          v-loading="loading"
          ref="table"
          @sort-change="sortableChange"
          @expand-change="getExpansionData"
        >
          <el-table-column
            prop
            label
            type="selection"
            width="36"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="photoTime"
            label="拍摄时间"
            min-width="100"
            sortable="custom"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.photoTime">
                {{ $date0(scope.row.photoTime) }}
                <template v-if="scope.row.reasonId">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.row.reason"
                    placement="top"
                  >
                    <span style="color: #e6a23c">延期</span>
                  </el-tooltip>
                </template>
              </template>
              <template v-else>/</template>
            </template>
            <!-- <template slot-scope="scope">{{scope.row.photoTime | date}}</template> -->
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="下达时间-人"
            min-width="180"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime }}{{ scope.row.initUserId }}
            </template>
          </el-table-column>
          <el-table-column label="请款报销" min-width="160">
            <!--  slot-scope="props" -->
            <template slot-scope="scope">
              <span>共7笔</span>
              <el-tag @click="toReimbursement(scope.row.proRequireId)">报销</el-tag>
              <el-tag @click="toRequestpayout(scope.row.movieId)">请款</el-tag>
            </template>
          </el-table-column>
          <el-table-column type="expand" width="18">
            <!--  slot-scope="props" -->
            <template>
              <el-col :span="2" style="text-align: right;">
                共2笔 合计3000元
              </el-col>
              <el-table :data="tableData" style="width: 45%">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="金额类别">
                </el-table-column>
                <el-table-column prop="name" label="时间">
                </el-table-column>
                <el-table-column prop="name" label="部门">
                </el-table-column>
                <el-table-column prop="name" label="请款人">
                </el-table-column>
                <el-table-column prop="name" label="供应商请款">
                </el-table-column>
                <el-table-column prop="name" label="金额(元)">
                </el-table-column>
                <el-table-column prop="name" label="状态">
                </el-table-column>
                <el-table-column prop="name" label="地址">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            prop="taskName"
            label="任务名称"
            min-width="180"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link
                target="_blank"
                class="omit"
                :underline="false"
                @click="toDetail(scope.row.movieId)"
                >{{ $date0(scope.row.photoTime)
                }}{{ scope.row.movieName }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column
            prop
            label="状态"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" class="statusColor0"
                >进行中</span
              >
              <span v-else-if="scope.row.status == 2" class="statusColor2"
                >完成</span
              >
              <span v-else-if="scope.row.status == 3" class="statusColor3"
                >延期</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop
            label="类型"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.movieType == 1">有车拍摄</span>
              <span v-else-if="scope.row.movieType == 2">无车拍摄</span>
              <span v-else-if="scope.row.movieType == 3">其他</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="buyUserId"
            label="采购负责人"
            min-width="90"
            show-overflow-tooltip
          >
          </el-table-column>

          <!-- <el-table-column prop="ownerItemList" label="邀约事项" min-width="130" show-overflow-tooltip></el-table-column> -->
          <el-table-column
            prop="modelName"
            label="模特"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.isModel">
                <template v-if="scope.row.movieToSupplierList1.length">
                  <span
                    v-for="(item, index) in scope.row.movieToSupplierList1"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <template v-else>
                  <el-link
                    type="primary"
                    @click="
                      toSupplier(
                        scope.row.movieId,
                        scope.row.movieName,
                        '模特',
                        1
                      )
                    "
                  >
                    去完善
                  </el-link>
                </template>
              </template>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="personName"
            label="摄影师"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.isPerson">
                <template v-if="scope.row.movieToSupplierList2.length">
                  <span
                    v-for="(item, index) in scope.row.movieToSupplierList2"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <template v-else>
                  <el-link
                    type="primary"
                    @click="
                      toSupplier(
                        scope.row.movieId,
                        scope.row.movieName,
                        '摄影师',
                        2
                      )
                    "
                  >
                    去完善
                  </el-link>
                </template>
              </template>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ownerName"
            label="车辆"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.movieType == 1">
                <template v-if="scope.row.movieToSupplierList3.length">
                  <span
                    v-for="(item, index) in scope.row.movieToSupplierList3"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <template v-else>
                  <el-link
                    type="primary"
                    @click="
                      toSupplier(
                        scope.row.movieId,
                        scope.row.movieName,
                        '车辆',
                        3
                      )
                    "
                  >
                    去完善
                  </el-link>
                </template>
              </template>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="modelName"
            label="其他资源"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.isOther">
                <el-link
                  type="primary"
                  @click="
                    toSupplier(
                      scope.row.movieId,
                      scope.row.movieName,
                      '其他',
                      1
                    )
                  "
                >
                  去完善
                </el-link>
              </template>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="placeName"
            label="场地"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.placeName">{{ scope.row.placeName }}</span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column label="评分" min-width="70">
            <template slot-scope="scope">
              <template v-if="scope.row.movieToSupplierList2.length">
                <span v-if="scope.row.isScore">已评分</span>
                <el-link type="primary" v-else @click="addComment(scope.row)">
                  去评价
                </el-link>
              </template>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column label="发布链接" min-width="90">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="toMovieUrl(scope.row)"
                v-if="scope.row.urlStatus == 1"
              >
                填写链接
              </el-link>
              <span v-else-if="scope.row.urlStatus == 2">待跟进</span>
              <span v-else-if="scope.row.urlStatus == 3">已完成</span>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="其他验收" min-width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.isOther">
                <el-link type="primary">点击上传</el-link>
              </div>
              <span v-else> / </span>
            </template>
          </el-table-column>
          <el-table-column label="反馈" min-width="100">
            <template slot-scope="scope">
              <i
                class="el-icon-chat-dot-round"
                @click="getMovieFeedbackListAjax(scope.row.movieId)"
              ></i>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" min-width="160">
            <template slot-scope="scope">
              <!-- v-if="subordinate == 150 || deptId == 90 || adminShow" -->
              <template>
                <el-button type="primary" size="mini" @click="delay(scope.row)">
                  延期
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="delContent(scope.row.movieId)"
                >
                  删除
                </el-button>
              </template>

              <!-- <template>
                <el-button plain size="mini">完成</el-button>
              </template> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="pageNum"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 抽屉弹窗延期原因 start -->
    <el-drawer title="延期活动" :visible.sync="drawerDelay" size="566px">
      <el-row class="drawerDelay" v-loading="drawerLoading">
        <el-col :span="4">活动名称:</el-col>
        <el-col :span="20">{{ linkMovieName }}</el-col>
        <el-col :span="4">延期时间:</el-col>
        <el-col :span="20">
          <el-date-picker
            v-model="delayTime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            :unlink-panels="true"
          ></el-date-picker>
        </el-col>
        <el-col :span="4" class="key keycontent">延期原因:</el-col>
        <el-col :span="20">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="delayReason"
          ></el-input>
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

    <!-- 抽屉弹窗发布链接 start -->
    <el-dialog
      title="发布链接"
      :visible.sync="drawerMovieUrl"
      width="50%"
      class="taskDialog"
      v-loading="drawerLoading"
    >
      <!-- <span>这是一段信息</span> -->
      <el-scrollbar style="height: 100%">
        <el-row class="drawerMovieUrl">
          <el-col :span="6">任务名称:</el-col>
          <el-col :span="18">
            <el-col :span="20">{{ linkMovieName }}</el-col>
          </el-col>
          <el-col :span="6" class="keycontent">验收链接:</el-col>
          <el-col :span="18">
            <!-- <el-col :span="20">
              <el-input placeholder="搜索车主" suffix-icon="el-icon-search" v-model="input"></el-input>
            </el-col>-->
            <el-col
              :span="24"
              class="detailList"
              v-for="(item, index) in movieUrlList"
              :key="index"
            >
              <el-col :span="1" style="text-align: center">
                {{ index + 1 }}.
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="item.urlType"
                  placeholder="发布状态"
                  clearable
                  filterable
                  class="userType1"
                  size="medium"
                >
                  <el-option
                    v-for="item in linkStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="14">
                <!-- <template v-if="item.userType == 0"> -->
                <el-input
                  placeholder="请输入链接"
                  @change="urlChange"
                  size="medium"
                  v-model="item.url"
                  clearable
                ></el-input>
                <!-- </template> -->
              </el-col>
              <!-- {{item}}-{{index}} -->
            </el-col>
            <!-- {{listInviteList}} -->
          </el-col>
        </el-row>
      </el-scrollbar>
      <!-- 底部按钮 -->
      <el-col :span="24" class="btn">
        <el-col :span="4" :offset="7">
          <el-button type="info" @click="submitBtn(1)">提交</el-button>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button
            type="primary"
            @click="submitBtn(0)"
            class="SlideOpen"
            data-text="保存"
          >
            <span>保存</span>
          </el-button>
        </el-col>
      </el-col>
    </el-dialog>
    <!-- 抽屉弹窗发布链接 end -->

    <!-- 新增评论评星 -->
    <CommentSketchy :commentSketchyShow="commentSketchyShow"></CommentSketchy>
    <!-- 新增评论 -->

    <!-- 新增评论明细 -->
    <Comment :commentShow="commentShow"></Comment>
    <!-- 新增评论 -->

    <!-- 新增反馈 -->
    <el-dialog title="反馈" :visible.sync="feedbackShow" width="50%">
      <!-- <span>这是一段信息</span> -->
      <div class="table">
        <el-table
          :data="feedbackList"
          style="width: 100%"
          height="230"
          :show-header="false"
          v-loading="movieFeedbackloading"
        >
          <el-table-column prop="createTime" width="180"> </el-table-column>
          <el-table-column prop="name" width="180">
            <template slot-scope="scope">
              {{ scope.row.deptName }}-{{ scope.row.realName }}
            </template>
          </el-table-column>
          <el-table-column prop="feedbackName"></el-table-column>
        </el-table>
      </div>
      <div class="feedbackText">
        <el-input
          type="textarea"
          :rows="9"
          placeholder="请输入内容"
          v-model="feedbackText"
        >
        </el-input>
        <el-button type="primary" @click="savetMovieFeedback">提交</el-button>
      </div>
    </el-dialog>
    <!-- 新增反馈 -->

    <el-dialog title="结算清单" :visible.sync="paydetailShow" width="80%">
      <el-table :data="paydetailList" v-loading="paydetailShowLoading">
        <el-table-column property="subjectName" label="科目"></el-table-column>
        <el-table-column
          property="subitemName"
          label="细分项"
        ></el-table-column>
        <el-table-column property="payMoney" label="付款金额"></el-table-column>
        <el-table-column property="userName" label="请款人"></el-table-column>
        <el-table-column property="remark" label="备注"></el-table-column>
        <el-table-column property="payState" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.payState">已付款</span>
            <span v-else>未付款</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 完善供应商 -->
    <Supplierfill
      :supplierShow="supplierShow"
      :supplierData="supplierData"
    ></Supplierfill>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法
import FileSaver from 'file-save'
import { saveAs } from 'file-saver'
import Comment from '@/components/comment' // 新增评分评星
import CommentSketchy from '@/components/commentSketchy' // 新增评分明细
import Supplierfill from '@/components/supplierfill' // 完善供应商

export default {
  name: 'activity',
  components: {
    Comment,
    CommentSketchy,
    Supplierfill,
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      deptName: this.$store.state.user.deptName, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员
      commentShow: 0,
      commentSketchyShow: 0,
      type: 0,
      personId: 0,

      taskDeptId: '', // 任务部门ID
      // taskDetail: { taskType: 0 },
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
          label: '借车',
        },
        {
          value: 2,
          label: '素材',
        },
        {
          value: 3,
          label: '邀约',
        },
        {
          value: 4,
          label: '拍摄',
        },
      ],

      itemIdList: [],
      itemId: '',
      carSeriesIdList: [],
      carSeriesId: '',
      // 筛选end
      cammeramanList: [],
      modelList: [],
      value: '',
      // 表格数据
      loading: false,

      movieListData: [],
      orderType: this.$store.state.order.orderType, // 1-升序，2-降序
      orderField: this.$store.state.order.orderField, // 1-拍摄时间，2-下达时间
      // 分页信息
      pageNum: this.$store.state.taskPageNum,
      pageSize: this.$store.state.taskPageSize,
      total: 0,

      // 抽屉拍摄延期
      drawerDelayPhoto: false,
      reasonId: '', // 延期拍摄原因
      reasonList: '', // 延期拍摄原因列表
      delayPhotoTime: '', // 延期拍摄时间

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
      delListInviteList: [],
      // 车主选择器列表
      inviteDataList: [],
      listInviteData: [],
      // 评价
      // evaluatePersonVisible: false,
      // 结算清单
      paydetailShow: false,
      paydetailShowLoading: false,
      paydetailList: [],

      // 影视活动
      taskId: '', // 任务ID
      taskName: '', // 任务NAME
      // 筛选值
      status: null, // 任务状态
      taskType: '', // 任务类型
      filtrateShootingTime: [],
      activityType: null, // 活动类型
      activityTypeList: [
        {
          value: 1,
          label: '有车拍摄',
        },
        {
          value: 2,
          label: '无车拍摄',
        },
        {
          value: 3,
          label: '其他',
        },
      ], // 活动类型列表
      appraise: null, // 是否评价
      appraiseList: [
        {
          value: 1,
          label: '已评价',
        },
        {
          value: 0,
          label: '未评价',
        },
      ], // 是否评价列表
      linkState: null, // 链接状态
      linkStateList: [
        {
          value: 1,
          label: '待填写',
        },
        {
          value: 2,
          label: '待跟进',
        },
        {
          value: 3,
          label: '已完成',
        },
      ], // 链接状态
      selectType: null, // 搜索类型
      searchWord: null, // 搜索内容
      // 抽屉弹窗延期因
      drawerDelay: false,
      delayReason: '', // 延期原因
      delayTime: '', // 延期预计时间
      // 反馈弹窗
      feedbackShow: false,
      movieFeedbackloading: false,
      feedbackMovieId: null,
      feedbackList: [],
      feedbackText: null,
      // 完善车辆模特摄影师供应商弹框
      supplierShow: 0,
      supplierData: {
        name: null,
        type: null,
      },
      // 抽屉弹窗发布链接
      drawerMovieUrl: false,
      linkMovieName: null,
      linkMovieId: null,
      linkStatus: [
        {
          value: 1,
          label: '正常发布',
        },
        {
          value: 2,
          label: '客户否定',
        },
        {
          value: 3,
          label: '拍摄不好',
        },
        {
          value: 4,
          label: '待发布',
        },
      ],
      repeatIs: false, //
      movieUrlList: [{}], // 发布链接列表
      reimburAndPaymentOfPrequireList: [],
      tableData: [
        {
          name: '王小虎',
        },
        {
          name: '王小虎',
        },
        {
          name: '王小虎',
        },
        {
          name: '王小虎',
        },
      ],
    }
  },
  // 过滤器
  filters: {},
  // 侦听器
  watch: {
    '$store.state.searchValue': function (newData, oldData) {
      ///////// 获取任务列表 start /////////
      this.getMovieListAjax()
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // this.foreach()
    // console.log(this.$refs.table)
    ///////// 获取车系列表 start /////////
    this.getCarSeriesLists()
    ///////// 获取任务列表 /////////
    this.getMovieListAjax()
    ///////// 获取车主列表 start /////////
    this.getOwnerList()
    ///////// 获取摄影师列表 start /////////
    this.getlistPhotoPerson()
    ///////// 获取模特列表 start /////////
    this.getlistModel()

    // let list = [1,2,3,4,5,6]
    // console.log(list.splice(0,1))
    // console.log(list)
    // 任务状态页码数据
    let data = {
      status: 0,
      pageNum: 1,
      pageSize: 30,
    }
    this.$store.commit('taskData', data)
  },
  // 方法
  methods: {
    handleCashOut(){
      this.chooseArr=[];
      let choose=this.$refs.table.selection;
      if(choose.length>0){
         for (const s of choose) {
            this.chooseArr.push(s.movieId)
          }
          this.$store.commit('getBatchCashOut', this.chooseArr);
           this.$router.push({
              path: '/home/requestpayout',
            })
      }else{
        this.$message.error('请选择')
      }
     
    },
    ///////// 通过供应商搜索 start /////////
    searchStart() {},
    ///////// 通过供应商搜索 end /////////

    ///////// 跳转采购咨询页面 start /////////
    toAddAdvisory() {
      this.$router.push({
        path: '/home/addadvisory',
      })
    },
    ///////// 跳转采购咨询页面 end /////////

    ///////// 跳转采购咨询页面 start /////////
    toAddactivity(type, id) {
      this.$router.push({
        path: '/home/addactivity',
        query: {
          type: type,
          id: id,
        },
      })
    },
    ///////// 跳转采购咨询页面 end /////////

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

    ///////// 任务列表事项筛选 start /////////
    itemIdChange(id) {
      // this.status = id
      this.getMovieListAjax()
    },
    ///////// 任务列表事项筛选 end /////////

    ///////// 获取任务列表状态筛选 start /////////
    statusChange(id) {
      this.status = id
      this.pageNum = 1
      this.getMovieListAjax()
    },
    ///////// 获取任务列表状态筛选 end /////////

    ///////// 获取任务列表 start /////////
    getMovieListAjax() {
      this.loading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        movie: {
          // deleteFlag: false,
          status: this.status,
          movieType: this.taskType,
          urlStatus: this.linkState,
          // itemId: this.itemId,
          // carSeriesId: this.activityType,
          // taskName: this.$store.state.searchValue,
          // deptId: this.deptId
        },
        orderField: this.orderField, // 1-拍摄时间，2-下达时间
        orderType: this.orderType, // 1-升序，2-降序
      }
      this.$axios.post('/ocarplay/api/movie/listAjax', data).then((res) => {
        // console.log(res)
        if (res.status == 200 && data) {
          let data = res.data
          data.items.forEach((element) => {
            element.movieToSupplierList1 = []
            element.movieToSupplierList2 = []
            element.movieToSupplierList3 = []
            element.movieToSupplierList4 = []
            element.movieToSupplierList.forEach((element_) => {
              if (element_.supplierType == 1) {
                element.movieToSupplierList1.push(element_)
              } else if (element_.supplierType == 2) {
                element.movieToSupplierList2.push(element_)
              } else if (element_.supplierType == 3) {
                element.movieToSupplierList3.push(element_)
              } else if (element_.supplierType == 4) {
                element.movieToSupplierList4.push(element_)
              }
            })
          })
          this.movieListData = data.items
          this.total = data.totalRows
          this.loading = false
          // console.log(this.movieListData)
        }
      })
    },

    ///////// 获取任务列表 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      ///////// 获取任务列表 start /////////
      this.getMovieListAjax()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      this.pageNum = pageNum
      ///////// 获取任务列表 start /////////
      this.getMovieListAjax()
      // console.log(pageNum)
    },
    ///////// 分页 end /////////

    ///////// 延期原因 start /////////
    delay(prm) {
      this.drawerDelay = true
      this.linkMovieId = prm.movieId
      this.linkMovieName = prm.movieName
      // console.log(prm)
    },
    putDelay() {
      let endTime = this.$date0(this.delayTime)
      let data = {
        movieId: this.linkMovieId,
        status: 3,
        delayReason: this.delayReason,
        endTime: endTime,
      }
      // console.log(data)
      if (!data.delayReason) {
        this.$message.error('请填写延期原因！')
        return
      } else if (!data.endTime) {
        this.$message.error('请填写延期时间！')
        return
      }
      this.drawerLoading = true
      this.$axios.post('/ocarplay/api/movie/save', data).then((res) => {
        if (res.status == 200 && res.data.errcode == 0) {
          this.$message.success('任务延期成功！')
          this.drawerDelay = false
          ///////// 获取任务列表 start /////////
          this.getMovieListAjax()
        } else {
          this.$message.error('任务延期失败！')
        }
        this.drawerLoading = false
      })
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

            this.inviteDataList = list
            // console.log(list)
          }
        })
    },
    ///////// 获取车主列表 end /////////

    ///////// 获取摄影师列表 start /////////
    getlistPhotoPerson() {
      if (this.cammeramanList.length == 0) {
        this.listLoading = true
        let data = {
          pageNum: 1,
          pageSize: 1000,
          orderType: 1,
          type: 2,
        }
        this.$axios
          .post('/ocarplay/api/photoPerson/listAjax', data)
          .then((res) => {
            // console.log(res)
            this.listLoading = false
            if (res.status == 200) {
              let data = res.data.items
              let cammeramanList = []
              data.forEach((element) => {
                cammeramanList.push({
                  value: element.personId,
                  label: element.name,
                })
              })
              this.cammeramanList = cammeramanList
            }
          })
      }
    },
    ///////// 获取摄影师列表 end /////////

    ///////// 获取模特列表 start /////////
    getlistModel() {
      if (this.modelList.length == 0) {
        this.listLoading = true
        let data = {
          pageNum: 1,
          pageSize: 1000,
          orderType: 1,
          type: 2,
        }
        this.$axios.post('/ocarplay/api/model/listAjax', data).then((res) => {
          // console.log(res)
          this.listLoading = false
          if (res.status == 200) {
            let data = res.data.items
            let modelList = []
            data.forEach((element) => {
              modelList.push({
                value: element.modelId,
                label: element.name,
              })
            })
            this.modelList = modelList
          }
        })
      }
    },
    ///////// 获取模特列表 end /////////

    ///////// 提交任务 start /////////
    toMovieUrl(prm) {
      this.drawerMovieUrl = true
      this.linkMovieName = prm.movieName
      this.linkMovieId = prm.movieId
      let num = prm.num
      let movieUrlList = []
      if (prm.movieUrlList && prm.movieUrlList.length) {
        // movieUrlList = prm.movieUrlList
        prm.movieUrlList.forEach((element) => {
          movieUrlList.push({
            movieId: element.movieId,
            urlId: element.urlId,
            url: element.url,
            urlType: element.urlType,
            userId: this.userId,
          })
        })
      } else {
        for (let i = 0; i < num; i++) {
          movieUrlList.push({
            movieId: this.linkMovieId,
            url: null,
            urlType: 1,
            userId: this.userId,
          })
        }
      }
      this.movieUrlList = movieUrlList
    },
    ///////// 链接改变验证 start /////////
    urlChange(val) {
      // console.log(this.taskDetail)
      // if (this.taskDetail.taskType != 4) {
      let num = 0
      let list = []
      this.movieUrlList.forEach((element, i) => {
        // console.log(element.url)
        if (element.url == val) {
          num++
          list.push(i)
        }
      })
      // console.log(list)
      if (num > 1) {
        this.$message.error('链接重复！')
        this.repeatIs = true
      } else {
        this.repeatIs = false
      }
      // }

      // let data = this.countJson(this.listInviteList, 'url')
      // console.log(data)
    },
    ///////// 链接改变验证 end /////////
    // 提交按钮
    submitBtn(e) {
      // this.drawerLoading = true
      let movieUrlList = this.movieUrlList
      let repeatIs = this.repeatIs
      if (repeatIs) {
        this.$message.error('请检查链接不能重复！')
        return
      }
      let data = {
        movieId: this.linkMovieId,
        movieUrlList: this.movieUrlList,
      }
      // console.log(data)
      // return
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
          if (res.status == 200 && res.data.errcode === 0) {
            this.$message.success('链接提交成功！')
            this.drawerLoading = false
            this.drawerMovieUrl = false
            this.getMovieListAjax()
          } else {
            this.$message.error('任务提交失败！')
            this.drawerLoading = false
          }
        })
        .catch((res) => {
          console.log(res)
          this.drawerLoading = false
        })
      // } else {
      //   this.drawerLoading = false
      //   this.$message.error('保存请选择车主！提交需填入链接！')
      // }
    },
    ///////// 提交任务 end /////////

    ///////// 跳转任务详情页 start /////////
    toDetail(id) {
      let data = {
        status: this.status,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.$store.commit('taskData', data)
      // this.$store.commit('taskStatus', this.status)
      // cameramanPage
      this.$router.push({
        path: '/home/activitydetail',
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
      this.$confirm('确认要删除该活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.delMovie(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    delMovie(id) {
      let data = { movieId: id }
      this.$axios
        .post('/ocarplay/api/movie/delete', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode === 0) {
            this.$message.success('删除活动成功！')
            ///////// 获取任务列表 start /////////
            this.getMovieListAjax()
          } else {
            this.$message.error('删除活动失败！')
          }
        })
        .catch((res) => {
          console.log(res)
        })
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
          // console.log(res)
          if (res.status == 200) {
            // this.$message.success('删除任务成功！')
            // ///////// 获取任务列表 start /////////
            // this.getMovieListAjax()
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
      this.drawerMovieUrl = false
      this.drawerDelayPhoto = false
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
    ///////// 新增评论 start /////////
    addComment(obj) {
      // console.log(obj)
      this.personId = obj.personId
      this.taskId = obj.taskId
      // console.log(obj)
      this.commentSketchyShow += 1
      // console.log(this.commentSketchyShow)
      return
      let data = {
        personId: obj.personId,
        taskId: obj.taskId,
      }
      this.$axios
        .post('/ocarplay/api/personGrade/ifPgOver', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data == 1) {
            this.$message.warning('该任务摄影师已评价！')
          } else {
            this.commentSketchyShow += 1
          }
        })
    },
    ///////// 新增评论 end /////////

    ///////// 导出结算列表 start /////////
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    ///////// 导出结算列表 start /////////

    ///////// 导入结算列表 start /////////
    importFile(id) {
      // console.log(id)
    },
    ///////// 导入结算列表 start /////////

    ///////// 导出结算列表 start /////////
    evaluatePersonVisibleShow(obj, index) {
      // this.movieListData[index].evaluatePersonVisible = !this.movieListData[index].evaluatePersonVisible
      if (this.movieListData[index].evaluatePersonVisible) {
        this.movieListData[index].evaluatePersonVisible = false
        // console.log(this.movieListData[index].evaluatePersonVisible)
      } else {
        // console.log(this.movieListData[index].evaluatePersonVisible)
        // console.log(index)
        for (let i = 0; i < obj.length; i++) {
          const element = obj[i]
          if (element.ifPgOver == 0) {
            this.movieListData[index].evaluatePersonVisible = true
            break
          }
        }
        if (!this.movieListData[index].evaluatePersonVisible) {
          this.$message.warning('已评价完成！')
        }
      }
    },
    ///////// 导出结算列表 start /////////

    ///////// 排序 start /////////
    sortableChange(column) {
      let prop = column.prop
      let order = column.order
      if (prop == 'photoTime') {
        this.orderField = 1
      } else if (prop == 'createTime') {
        this.orderField = 2
      }
      if (order == 'descending') {
        this.orderType = 2
      } else if (order == 'ascending') {
        this.orderType = 1
      }
      let data = {
        orderField: this.orderField,
        orderType: this.orderType,
      }
      this.$store.commit('orderRecord', data)
      ///////// 获取任务列表 start /////////
      this.getMovieListAjax()
    },
    ///////// 排序 end /////////

    ///////// 打开延期拍摄弹窗 start /////////
    // openDelayPhoto(id, taskName) {
    //   this.drawerDelayPhoto = true
    //   this.taskId = id
    //   this.taskName = taskName
    // },
    ///////// 打开延期拍摄弹窗 end /////////

    // 完善供应商信息
    toSupplier(id, name, type, typeId) {
      this.supplierShow++
      let supplierData = {
        id: id,
        name: name,
        type: type,
        typeId: typeId,
      }
      this.supplierData = supplierData
      console.log(supplierData)
    },
    // 跳转报销页面
    toReimbursement(obj) {
      this.$router.push({
        path: '/home/reimbursement',
        query:{
          id:obj
        }
      })
    },
    // 跳转请款页面
    toRequestpayout(id) {
      this.chooseArr=[];
      this.chooseArr.push(id);
      this.$store.commit('getBatchCashOut', this.chooseArr);

    
      this.$router.push({
        path: '/home/requestpayout',
      })
    },
    ///////// 获取反馈列表 start /////////
    getMovieFeedbackListAjax(id) {
      this.feedbackShow = true
      // this.movieFeedbackloading = true
      this.feedbackMovieId = id
      let data = {
        movieId: id,
      }
      // console.log(id)
      // return
      this.$axios.post('/ocarplay/api/movieFeedback/list', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          // let data = res.data
          this.feedbackList = res.data
          // this.total = data.totalRows
          // this.loading = false
          this.movieFeedbackloading = false
          // console.log(data.items)
        }
      })
    },
    ///////// 获取反馈列表 end /////////

    ///////// 新增反馈 start /////////
    savetMovieFeedback() {
      this.feedbackShow = true
      // this.movieFeedbackloading = true
      let data = {
        doUserId: this.userId,
        deptName: this.deptName,
        feedbackName: this.feedbackText,
        movieId: this.feedbackMovieId,
      }
      console.log(data)
      if (!data.feedbackName) {
        this.$message.error('请填写反馈内容！')
        return
      }
      this.$axios
        .post('/ocarplay/api/movieFeedback/save', data)
        .then((res) => {
          console.log(res)
          if (res.status == 200 && res.data.errcode === 0) {
            this.feedbackText = null
            this.$message.success('添加反馈成功!')
            // let data = res.data
            // this.feedbackList = data.items
            // this.movieFeedbackloading = false
            this.getMovieFeedbackListAjax(this.feedbackMovieId)
          } else {
            this.$message.success(res.data.msg)
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 新增反馈 end /////////
    ///////// 折叠获取请款和报销数据 end /////////
    getExpansionData(row) {
      // console.log(row)
      let data = {
        // proRequireId: row.proRequireId,
        proRequireId: 50811,
      }
      this.$axios
        .post('/ocarplay/api/movie/getReimburAndPaymentOfPrequire', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data.data[0]
            let listOfflineData = data.listOfflineData
            let listPayment = data.listPayment
            // console.log(listOfflineData)
            // console.log(listPayment)
            let list = listPayment.concat(listOfflineData);
            console.log(list)
            // this.feedbackText = null
            // this.$message.success('添加反馈成功!')
            // let data = res.data
            // this.feedbackList = data.items
            // this.movieFeedbackloading = false
            // this.getMovieFeedbackListAjax(this.feedbackMovieId)
          } else {
            // this.$message.success(res.data.msg)
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 折叠获取请款和报销数据 end /////////
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
#activity {
  height: 100%;
  .el-dialog__wrapper {
    & >>> .el-dialog__header {
      text-align: center;
      font-weight: bold;
    }
    .feedbackText {
      text-align: center;
      .el-button {
        margin-top: 18px;
        width: 180px;
      }
    }
  }

  .top {
    height: 45px;
    margin-bottom: 9px;
    // background: #fff;
    .box {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .searchBox {
        width: 281px;
      }
      .el-date-editor {
        width: 210px;
      }
      .el-select {
        width: 100px;
      }
      .searchType {
        width: 81px;
      }
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
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
    // background: #fff;
    .table_list {
      height: calc(100% - 64px);
      .el-tag {
        cursor: pointer;
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
    .el-input,
    .el-select {
      width: 100%;
    }
  }
  // 抽屉弹窗提交任务样式
  .drawerMovieUrl {
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
      &:nth-of-type(2n + 1) {
        text-align: right;
        padding-right: 13px;
      }
    }
    i {
      color: $icoColor;
      cursor: pointer;
    }
    .detailList {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 18px;
    }
    .keycontent {
      align-self: flex-start;
      // text-align: justify;
      // text-align: right;
      // padding-right: 13px;
    }
    .el-input {
      width: 100%;
    }
  }
  .btn {
    height: 72px;
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
.evaluatePerson {
  height: 24px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}
</style>
<style lang="scss">
.taskDialog {
  .el-dialog__header {
    text-align: center;
    padding-top: 36px;
  }
  .el-dialog__title {
    color: #000;
    font-size: 24px;
    font-weight: 700;
  }
  .el-dialog {
    height: 80vh;
    margin: 10vh auto !important;
  }
  .el-dialog__body {
    height: calc(100% - 114px);
    padding: 10px 20px;
  }
}
// #task {
.el-popover {
  min-width: 0;
}
// }
</style>
