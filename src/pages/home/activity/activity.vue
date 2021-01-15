<template>
  <div id="activity">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="24" class="box">
        <div class="btn1">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
            @click="toAddactivity(0, 0)"
            v-if="deptId != 90"
          >
            新增活动
          </el-button>

          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
            @click="handleCashOut"
            v-else
          >
            批量请款
          </el-button>
          <el-badge :value="noReply" :hidden="!noReply">
            <el-button
              type="primary"
              size="small"
              plain
              icon="el-icon-chat-line-square"
              @click="toAddAdvisory"
            >
              采购咨询
            </el-button>
          </el-badge>
          <!-- <el-button
            type="primary"
            size="small"
            plain
            icon="el-icon-chat-line-square"
            @click="toAddAdvisory"
          >
            采购咨询
          </el-button> -->
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
            v-model="photoTimeScope"
            @change="photoTimeScopeChange"
            size="small"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <!-- {{photoTimeScope}} -->
          <el-select
            v-model="activityType"
            filterable
            clearable
            placeholder="活动类型"
            size="small"
            @change="activityTypeChange"
          >
            <el-option
              v-for="item in activityTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-select
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
          </el-select> -->
          <el-select
            v-model="linkState"
            filterable
            clearable
            placeholder="发布状态"
            size="small"
            @change="linkStateChange"
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
          <el-autocomplete
            placeholder="请输入内容"
            v-model="searchWord"
            class="input-with-select search"
            size="small"
            clearable
            :fetch-suggestions="querySearch"
            @keyup.enter.native="searchStart"
            @clear="searchStart"
            @input="getPmsSupplierToOcarplay"
          >
            <el-select
              class="searchType"
              v-model="selectType"
              slot="prepend"
              placeholder="选择"
              clearable
            >
              <el-option label="模特" value="1"></el-option>
              <el-option label="摄影师" value="2"></el-option>
              <el-option label="车辆" value="3"></el-option>
              <el-option label="其它" value="4"></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchStart"
            ></el-button>
          </el-autocomplete>
          <!-- 搜索框 end -->
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!------------------ 内容列表 start ------------------>
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
            prop="createTime"
            label="下达时间"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ $timeformat(scope.row.createTime, 'M.dd hh:mm') }}
            </template>
          </el-table-column>

          <el-table-column
            prop="initUserName"
            label="下达人"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="photoTime"
            label="拍摄时间"
            width="100"
            sortable="custom"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.photoTime">
                <!-- openDelayPhoto -->

                <el-link @click="openDelayPhoto(scope.row)">
                  {{ $timeformat(scope.row.photoTime, 'M.dd') }}
                </el-link>
                <!-- {{scope.row.photoDelayReason}} -->
                <!-- <template v-if="scope.row.photoTimeOld"> -->
                <el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content">{{ scope.row.photoDelayReason }}</div>
                  <span>
                    <span
                      class="statusColor3"
                      v-show="scope.row.photoDelayType == 1"
                      >推迟</span
                    >
                    <span
                      class="statusColor1"
                      v-show="scope.row.photoDelayType == 2"
                      >提前</span
                    >
                  </span>
                </el-tooltip>
                <!-- </template> -->
              </template>
              <template v-else>/</template>
            </template>
          </el-table-column>

          <el-table-column
            prop="taskName"
            label="任务名称"
            min-width="190"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-link
                target="_blank"
                class="omit"
                :underline="false"
                @click="toDetail(scope.row.movieId)"
                >{{ $timeformat(scope.row.photoTime, 'M.dd') }}
                <template v-if="scope.row.movieType == 1">
                  {{ scope.row.city }}- {{ scope.row.deptName }}-
                  {{ scope.row.carTypeName }}-
                  {{ scope.row.photoTypeName }}
                </template>
                <template v-else-if="scope.row.movieType == 2">
                  {{ scope.row.city }}- {{ scope.row.deptName }}-
                  {{ scope.row.movieName }}
                </template>
                <template v-else-if="scope.row.movieType == 3">
                  {{ scope.row.movieName }}
                </template>
              </el-link>
            </template>
          </el-table-column>
          <!-- <el-table-column
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
          </el-table-column> -->
          <!-- <el-table-column
            prop="buyUserId"
            label="采购负责人"
            min-width="90"
            show-overflow-tooltip
          >
          </el-table-column> -->

          <!-- <el-table-column prop="ownerItemList" label="邀约事项" min-width="130" show-overflow-tooltip></el-table-column> -->
          <el-table-column
            prop="personName"
            label="摄影师"
            min-width="70"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.status != 2">
                <template v-if="deptId == 90">
                  <template v-if="scope.row.isPerson">
                    <template v-if="scope.row.movieToSupplierList2.length">
                      <el-link
                        @click="toSupplier(scope.row, '摄影师', 2)"
                        v-for="(item, index) in scope.row.movieToSupplierList2"
                        :key="index"
                      >
                        {{ item.supplierName }}
                      </el-link>
                    </template>
                    <template v-else>
                      <el-link
                        type="primary"
                        @click="toSupplier(scope.row, '摄影师', 2)"
                      >
                        去完善
                      </el-link>
                    </template>
                  </template>
                  <span v-else>/</span>
                </template>
                <template v-else>
                  <template v-if="scope.row.isPerson">
                    <template v-if="scope.row.movieToSupplierList2.length">
                      <span
                        v-for="(item, index) in scope.row.movieToSupplierList2"
                        :key="index"
                      >
                        {{ item.supplierName }}
                      </span>
                    </template>
                    <span v-else>待完善</span>
                  </template>
                  <span v-else>/</span>
                </template>
              </template>
              <template v-else>
                <template v-if="scope.row.movieToSupplierList2.length">
                  <span
                    v-for="(item, index) in scope.row.movieToSupplierList2"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <span v-else>/</span>
              </template>
            </template>
          </el-table-column>

          <el-table-column
            prop="modelName"
            label="模特"
            min-width="70"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.status != 2">
                <template v-if="deptId == 90">
                  <template v-if="scope.row.isModel">
                    <template v-if="scope.row.movieToSupplierList1.length">
                      <el-link
                        @click="toSupplier(scope.row, '模特', 1)"
                        v-for="(item, index) in scope.row.movieToSupplierList1"
                        :key="index"
                      >
                        {{ item.supplierName }}
                      </el-link>
                    </template>
                    <template v-else>
                      <el-link
                        type="primary"
                        @click="toSupplier(scope.row, '模特', 1)"
                      >
                        去完善
                      </el-link>
                    </template>
                  </template>
                  <span v-else>/</span>
                </template>
                <template v-else>
                  <template v-if="scope.row.isModel">
                    <template v-if="scope.row.movieToSupplierList1.length">
                      <span
                        v-for="(item, index) in scope.row.movieToSupplierList1"
                        :key="index"
                      >
                        {{ item.supplierName }}
                      </span>
                    </template>
                    <span v-else>待完善</span>
                  </template>
                  <span v-else>/</span>
                </template>
              </template>
              <template v-else>
                <template v-if="scope.row.movieToSupplierList1.length">
                  <span
                    v-for="(item, index) in scope.row.movieToSupplierList1"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <span v-else>/</span>
              </template>
            </template>
          </el-table-column>

          <el-table-column
            prop="ownerName"
            label="车辆"
            min-width="70"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.status != 2">
                <template v-if="deptId == 90">
                  <template v-if="scope.row.movieType == 1">
                    <template v-if="scope.row.movieToSupplierList3.length">
                      <el-link
                        @click="toSupplier(scope.row, '车辆', 3)"
                        v-for="(item, index) in scope.row.movieToSupplierList3"
                        :key="index"
                      >
                        {{ item.supplierName }}
                      </el-link>
                    </template>
                    <template v-else>
                      <el-link
                        type="primary"
                        @click="toSupplier(scope.row, '车辆', 3)"
                      >
                        去完善
                      </el-link>
                    </template>
                  </template>
                  <span v-else>/</span>
                </template>
                <template v-else>
                  <template v-if="scope.row.movieType == 1">
                    <template v-if="scope.row.movieToSupplierList3.length">
                      <span
                        v-for="(item, index) in scope.row.movieToSupplierList3"
                        :key="index"
                      >
                        {{ item.supplierName }}
                      </span>
                    </template>
                    <span v-else>待完善</span>
                  </template>
                  <span v-else>/</span>
                </template>
              </template>
              <template v-else>
                <template v-if="scope.row.movieToSupplierList3.length">
                  <span
                    v-for="(item, index) in scope.row.movieToSupplierList3"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <span v-else>/</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="modelName"
            label="其他"
            min-width="70"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.status != 2">
                <template v-if="deptId == 90">
                  <template v-if="scope.row.isOther">
                    <template v-if="scope.row.movieToSupplierList4.length">
                      <el-link
                        @click="toSupplier(scope.row, '其他', 4)"
                        v-for="(item, index) in scope.row.movieToSupplierList4"
                        :key="index"
                      >
                        {{ item.supplierName }}
                      </el-link>
                    </template>
                    <template v-else>
                      <el-link
                        type="primary"
                        @click="toSupplier(scope.row, '其他', 4)"
                      >
                        去完善
                      </el-link>
                    </template>
                  </template>
                  <span v-else>/</span>
                </template>
                <template v-else>
                  <template v-if="scope.row.isOther">
                    <template v-if="scope.row.movieToSupplierList4.length">
                      <el-link
                        @click="toSupplier(scope.row, '其他', 4)"
                        v-for="(item, index) in scope.row.movieToSupplierList4"
                        :key="index"
                      >
                        {{ item.supplierName }}
                      </el-link>
                    </template>
                    <span v-else>待完善</span>
                  </template>
                  <span v-else>/</span>
                </template>
              </template>
              <template v-else>
                <template v-if="scope.row.movieToSupplierList4.length">
                  <span
                    v-for="(item, index) in scope.row.movieToSupplierList4"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <span v-else>/</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="buyUserId"
            label="跟进人"
            min-width="100"
            show-overflow-tooltip
            v-if="deptId == 90"
          >
            <template slot-scope="scope">
              <div v-show="showIndex == scope.$index">
                <el-select
                  v-model="scope.row.buyUserId"
                  placeholder="请选择"
                  class="followUserSelect"
                  size="mini"
                  clearable
                >
                  <el-option
                    v-for="item in answerUserLst"
                    :key="item.userId"
                    :label="item.realName"
                    :value="item.userId"
                  >
                  </el-option>
                </el-select>
                <el-button
                  type="primary"
                  size="mini"
                  @click="designate(null, scope.row)"
                >
                  确认
                </el-button>
              </div>
              <div v-show="showIndex != scope.$index">
                <el-link
                  v-if="scope.row.buyUserId"
                  @click="designate(scope.$index)"
                >
                  {{ scope.row.buyUserName }}
                </el-link>
                <el-link type="primary" v-else @click="designate(scope.$index)">
                  跟进人
                </el-link>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="placeName"
            label="场地"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.placeName">{{ scope.row.placeName }}</span>
              <span v-else>/</span>
            </template>
          </el-table-column> -->
          <el-table-column label="评分" width="80" v-if="deptId != 90">
            <template slot-scope="scope">
              <!-- {{scope.row.movieToSupplierList2}} -->
              <template v-if="scope.row.status != 2">
                <template v-if="scope.row.movieToSupplierList2.length">
                  <span v-if="scope.row.scoreNum">已评分</span>
                  <el-dropdown placement="bottom" v-else>
                    <el-link type="primary"> 去评价 </el-link>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(item, index) in scope.row.movieToSupplierList2"
                        :key="index"
                        v-show="!item.grade"
                      >
                        <div @click="addComment(scope.row, item)">
                          {{ item.supplierName }}
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
                <span v-else>/</span>
              </template>
              <template v-else>
                <span
                  v-if="
                    scope.row.movieToSupplierList2.length && scope.row.scoreNum
                  "
                  >已评分</span
                >
                <span v-else>/</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="发布" width="90">
            <template slot-scope="scope">
              <template v-if="deptId != 90">
                <template v-if="scope.row.movieToSupplierList2.length">
                  <template v-if="scope.row.scoreNum">
                    <el-link
                      type="primary"
                      @click="toMovieUrl(scope.row)"
                      v-if="scope.row.urlStatus == 1"
                    >
                      待填写 0/{{ scope.row.num }}
                    </el-link>
                    <el-link
                      type="warning"
                      @click="toMovieUrl(scope.row)"
                      v-else-if="scope.row.urlStatus == 2"
                    >
                      跟进 {{ scope.row.urlNum }}/{{ scope.row.num }}
                    </el-link>
                    <span v-else-if="scope.row.urlStatus == 3">
                      完成 {{ scope.row.urlNum }}/{{ scope.row.num }}
                    </span>
                  </template>
                  <span v-else>先评价</span>
                </template>
                <template v-else>
                  <el-link
                    type="primary"
                    @click="toMovieUrl(scope.row)"
                    v-if="scope.row.urlStatus == 1"
                  >
                    待填写 0/{{ scope.row.num }}
                  </el-link>
                  <el-link
                    type="warning"
                    @click="toMovieUrl(scope.row)"
                    v-else-if="scope.row.urlStatus == 2"
                  >
                    跟进 {{ scope.row.urlNum }}/{{ scope.row.num }}
                  </el-link>
                  <span v-else-if="scope.row.urlStatus == 3">
                    完成 {{ scope.row.urlNum }}/{{ scope.row.num }}
                  </span>
                </template>
              </template>
              <template v-else>
                <span v-if="scope.row.urlStatus == 1" class="statusColor3"
                  >{{ scope.row.urlNum }}/{{ scope.row.num }}</span
                >
                <span v-else-if="scope.row.urlStatus == 2" class="statusColor1"
                  >{{ scope.row.urlNum }}/{{ scope.row.num }}</span
                >
                <span v-else-if="scope.row.urlStatus == 3" class="$statusColor2"
                  >{{ scope.row.urlNum }}/{{ scope.row.num }}</span
                >
                <!-- <el-link type="primary" v-if="scope.row.urlStatus == 1">
                  待填写
                </el-link> -->
                <!-- <el-link type="warning" v-else-if="scope.row.urlStatus == 2">
                  {{ scope.row.urlNum }}/{{ scope.row.movieUrlList.length }}
                </el-link>
                <span v-else-if="scope.row.urlStatus == 3">
                  {{ scope.row.urlNum }}/{{ scope.row.movieUrlList.length }}
                </span> -->
              </template>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="createTime" label="其他验收" min-width="100">
            <template>
              <div v-if="scope.row.isOther">
                <el-link type="primary">点击上传</el-link>
              </div>
              <span v-else> / </span>
              <span> / </span>
            </template>
          </el-table-column> -->
          <el-table-column label="反馈" width="60">
            <template slot-scope="scope">
              <i
                class="el-icon-chat-dot-round feedbackIcon"
                @click="
                  getMovieFeedbackListAjax(scope.row.movieId, scope.row.status)
                "
              ></i>
            </template>
          </el-table-column>

          <el-table-column label="请款报销" width="115">
            <!--  slot-scope="props" -->
            <template slot-scope="scope">
              <span
                >共
                <span v-if="deptId == 90">
                  {{
                    scope.row.paymentList.length +
                    scope.row.offlineDataList.length
                  }}
                </span>
                <span v-else>
                  {{ scope.row.offlineDataList.length }} </span
                >笔</span
              >
              <el-tag
                @click="toReimbursement(scope.row)"
                v-if="deptId != 90 && scope.row.status != 2"
              >
                报销
              </el-tag>
              <el-tag
                @click="toRequestpayout(scope.row.movieId, scope.row)"
                v-else-if="scope.row.status != 2"
              >
                请款
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column type="expand" width="18">
            <!--  slot-scope="props" -->
            <el-col slot-scope="scope" class="expand">
              <el-col
                :span="2"
                :offset="5"
                style="text-align: right; line-height: 42px"
              >
                共
                <span v-if="deptId == 90">
                  {{
                    scope.row.paymentList.length +
                    scope.row.offlineDataList.length
                  }}
                </span>
                <span v-else>
                  {{ scope.row.offlineDataList.length }}
                </span>
                笔
                <!-- 合计3000元 -->
              </el-col>
              <el-col :span="16">
                <el-table
                  :data="scope.row.paymentList"
                  style="width: 100%"
                  v-if="scope.row.paymentList.length && deptId == 90"
                  border
                  class="nonemp"
                >
                  <el-table-column type="index" label="序号" width="55">
                  </el-table-column>
                  <el-table-column prop="name" label="金额类别">
                    <template>请款</template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="时间" width="100">
                    <template slot-scope="scope1">
                      <span>{{ $date0(scope1.row.createTime) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="groupName" label="部门">
                    <template>采购部</template>
                  </el-table-column>
                  <el-table-column
                    prop="userName"
                    label="请款人/报销人"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="supplierName"
                    label="供应商请款"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column prop="payMoney" label="金额(元)">
                  </el-table-column>

                  <el-table-column prop="name" label="请款状态">
                    <template slot-scope="scope1">
                      <span
                        v-if="scope1.row.reqauditeState == 0"
                        class="statusColor4"
                      >
                        未审核
                      </span>
                      <span
                        v-else-if="scope1.row.reqauditeState == 1"
                        class="statusColor0"
                      >
                        已通过
                      </span>
                      <span
                        v-else-if="scope1.row.reqauditeState == 2"
                        class="statusColor1"
                      >
                        未通过
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="付款状态">
                    <template slot-scope="scope1">
                      <span
                        v-if="scope1.row.rejectPayStat == 0"
                        class="statusColor1"
                      >
                        待审核
                      </span>
                      <span
                        v-else-if="scope1.row.rejectPayStat == 1"
                        class="statusColor4"
                      >
                        拒付款
                      </span>
                      <span
                        v-else-if="scope1.row.rejectPayStat == 2"
                        class="statusColor0"
                      >
                        通过
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="打款状态">
                    <template slot-scope="scope1">
                      <span v-if="scope1.row.payState" class="statusColor2"
                        >已完成</span
                      >
                      <span v-else class="statusColor4">未完成</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table
                  :data="scope.row.offlineDataList"
                  style="width: 100%"
                  :show-header="!scope.row.paymentList.length || deptId != 90"
                  v-if="scope.row.offlineDataList.length"
                  border
                  class="nonemp"
                >
                  <el-table-column type="index" label="序号" width="55">
                    <template slot-scope="scope2">
                      <span v-if="deptId == 90">
                        {{ scope.row.paymentList.length + scope2.$index + 1 }}
                      </span>
                      <span v-else>
                        {{ scope2.$index + 1 }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="金额类别">
                    <template>报销</template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="时间" width="100">
                    <template slot-scope="scope2">
                      <span>{{ $date0(scope2.row.createTime) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="groupName" label="部门">
                    <template>项目部</template>
                  </el-table-column>
                  <el-table-column
                    prop="costPerson"
                    label="请款人/报销人"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="supplierName"
                    label="供应商请款"
                    show-overflow-tooltip
                  >
                    <template>/</template>
                  </el-table-column>
                  <el-table-column prop="buyMoney" label="金额(元)">
                  </el-table-column>
                  <el-table-column prop="name" label="请款状态">
                    <template>/</template>
                  </el-table-column>
                  <el-table-column prop="name" label="付款状态">
                    <template>/</template>
                  </el-table-column>
                  <el-table-column prop="name" label="状态">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.auditStatus == 0"
                        class="statusColor1"
                        >未审核</span
                      >
                      <span
                        v-else-if="scope.row.auditStatus == 1"
                        class="statusColor2"
                        >已通过</span
                      >
                      <span
                        v-else-if="scope.row.auditStatus == 2"
                        class="statusColor3"
                        >未通过</span
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-col>
          </el-table-column>

          <el-table-column prop label="状态" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" class="statusColor0">
                进行中
              </span>
              <span v-else-if="scope.row.status == 2" class="statusColor2">
                完成
              </span>
              <template v-else-if="scope.row.status == 3">
                <el-tooltip
                  class="item"
                  effect="light"
                  :content="scope.row.delayReason"
                  placement="bottom-start"
                >
                  <div slot="content" class="delay">
                    <div class="title">人工延期</div>
                    <div class="time">延期至{{ scope.row.endTime }}</div>
                    <div class="cont">原因：{{ scope.row.delayReason }}</div>
                  </div>
                  <span class="statusColor3">
                    延期
                    <i class="el-icon-warning-outline statusColor3"></i>
                  </span>
                </el-tooltip>
              </template>
              <span v-else-if="scope.row.status == 5" class="statusColor1">
                已驳回
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="address" label="操作" width="150">
            <div slot-scope="scope">
              <template v-if="scope.row.status == 0 || scope.row.status == 3">
                <template v-if="deptId != 90">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="delay(scope.row)"
                  >
                    延期
                  </el-button>
                  <el-button
                    plain
                    type="primary"
                    size="mini"
                    @click="delContent(scope.row.movieId)"
                  >
                    删除
                  </el-button>
                </template>
                <template v-else>
                  <el-button plain size="mini" @click="reject(scope.row)">
                    <!-- @click="reject(scope.row.movieId)" -->
                    驳回
                  </el-button>
                  <el-button
                    plain
                    type="primary"
                    size="mini"
                    @click="completion(scope.row.movieId)"
                  >
                    完成
                  </el-button>
                </template>
              </template>
              <template v-else-if="scope.row.status == 5">
                <template v-if="deptId != 90">
                  <el-button
                    plain
                    type="primary"
                    size="mini"
                    @click="delContent(scope.row.movieId)"
                  >
                    删除
                  </el-button>
                </template>
              </template>
            </div>
          </el-table-column>
          <!-- <el-table-column prop="address" label="操作" min-width="80" >
            <template slot-scope="scope" v-if="scope.row.status != 2">
              
            </template>
          </el-table-column> -->
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
    <!------------------ 内容列表 end ------------------>

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
        <el-col :span="4" :offset="10">
          <el-button
            type="primary"
            @click="submitBtn"
            class="SlideOpen"
            data-text="全部提交"
          >
            <span>全部提交</span>
          </el-button>
        </el-col>
      </el-col>
    </el-dialog>
    <!-- 抽屉弹窗发布链接 end -->

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

    <!-- 抽屉弹窗延期拍摄 start -->
    <el-drawer title="延期拍摄" :visible.sync="drawerDelayPhoto" size="566px">
      <!-- @close="drawerDelayPhotoClose" -->
      <el-row class="drawerDelay" v-loading="drawerLoading">
        <el-col :span="4">任务名称:</el-col>
        <el-col :span="20">{{ linkMovieName }}</el-col>
        <el-col :span="4">拍摄时间:</el-col>
        <el-col :span="20">
          <el-date-picker
            v-model="delayPhotoTime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
        <el-col :span="4" class="key keycontent">延期原因:</el-col>
        <el-col :span="20">
          <!-- photoDelayReason -->
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="photoDelayReason"
          ></el-input>
          <!-- <el-select v-model="reasonId" filterable clearable placeholder="延期原因说明">
            <el-option
              v-for="item in reasonList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
        </el-col>
        <!-- 底部按钮 -->
        <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info" @click="cancel">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary" @click="putDelayPhoto">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗延期拍摄 end -->

    <!-- 完善供应商 -->
    <Supplierfill
      :supplierShow="supplierShow"
      :supplierData="supplierData"
    ></Supplierfill>

    <!-- 新增评论评星 -->
    <CommentSketchy :commentSketchyShow="commentSketchyShow"></CommentSketchy>
    <!-- 新增评论 -->

    <!-- 新增评论明细 -->
    <Comment :commentShow="commentShow"></Comment>
    <!-- 新增评论 -->
  </div>
</template>
<script>
import Comment from '@/components/comment' // 新增评分明细
import CommentSketchy from '@/components/commentSketchy' // 新增评分评星
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
      // reasonId: '', // 延期拍摄原因
      // reasonList: '', // 延期拍摄原因列表
      photoDelayType: '', // 1-推迟 2-提前
      photoDelayReason: '', // 延期拍摄原因
      photoTimeOld: '', // 旧的拍摄时间
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
      photoTimeScope: ['', ''],
      // photoTimeEnd
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
      linkState: null, // 发布状态
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
      ], // 发布状态
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
      // 评价
      commentShow: 0, // 详细显示
      commentSketchyShow: 0, // 评星显示
      gradeMovieId: null, // 评价任务ID
      gradeMovieName: null, // 评价任务名称
      gradeSupplierId: null, // 评价供应商ID
      gradeSupplierName: null, // 评价供应商名称
      supplierList: [], // 供应商列表

      showIndex: null,
      answerUserLst: [],
      noReply: 0, // 资讯未回复数
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
    ///////// 获取任务列表 /////////
    this.getMovieListAjax()
    // 任务状态页码数据
    let data = {
      status: 0,
      pageNum: 1,
      pageSize: 30,
    }
    // this.$store.commit('taskData', data)
    ///////// 采购人员列表 /////////
    this.getDeptAllUserByDeptId()
  },
  // 方法
  methods: {
    handleCashOut() {
      this.chooseArr = []
      let choose = this.$refs.table.selection
      if (choose.length > 0) {
        for (const s of choose) {
          this.chooseArr.push(s.movieId)
        }
        this.$store.commit('getBatchCashOut', this.chooseArr)
        this.$router.push({
          path: '/home/requestpayout',
        })
      } else {
        this.$message.error('请选择')
      }
    },

    ///////// 跳转采购咨询页面 start /////////
    toAddAdvisory() {
      let url = null
      if (this.deptId != 90) {
        url = '/home/addadvisory'
      } else {
        url = '/home/replyadvisory'
      }
      this.$router.push({
        path: url,
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
      if (this.status == id) {
        this.status = null
      } else {
        this.status = id
      }
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
          movieType: this.activityType,
          urlStatus: this.linkState,
          photoTimeStart: this.photoTimeScope[0],
          photoTimeEnd: this.photoTimeScope[1],
          supplierType: this.selectType,
          supplierName: this.searchWord,

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
          if (data.items.length) {
            this.noReply = data.items[0].noReply
          } else {
            this.noReply = 0
          }

          data.items.forEach((element) => {
            element.movieToSupplierList1 = []
            element.movieToSupplierList2 = []
            element.movieToSupplierList3 = []
            element.movieToSupplierList4 = []
            element.scoreNum = true
            element.urlNum = 0
            element.movieToSupplierList.forEach((element_) => {
              if (element_.supplierType == 1) {
                element.movieToSupplierList1.push(element_)
              } else if (element_.supplierType == 2) {
                element.movieToSupplierList2.push(element_)
                if (!element_.grade) {
                  element.scoreNum = false
                }
              } else if (element_.supplierType == 3) {
                element.movieToSupplierList3.push(element_)
              } else if (element_.supplierType == 4) {
                element.movieToSupplierList4.push(element_)
              }
            })
            element.movieUrlList.forEach((element_) => {
              if (element_.urlType == 1 || element_.urlType == 4) {
                if (element_.url) {
                  element.urlNum++
                }
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
      if (prm.movieType == 1) {
        this.linkMovieName =
          prm.city +
          '-' +
          prm.deptName +
          '-' +
          prm.carTypeName +
          '-' +
          prm.photoTypeName
      } else if (prm.movieType == 2) {
        this.linkMovieName = prm.city + '-' + prm.deptName + '-' + prm.movieName
      } else if (prm.movieType == 3) {
        this.linkMovieName = prm.movieName
      }
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
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
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
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 延期原因 end /////////

    ///////// 延期拍摄 start /////////
    openDelayPhoto(prm) {
      this.drawerDelayPhoto = true
      this.linkMovieId = prm.movieId
      this.photoTimeOld = prm.photoTime
      // this.delayPhotoTime = prm.photoTime
      if (prm.movieType == 1) {
        this.linkMovieName =
          prm.city +
          '-' +
          prm.deptName +
          '-' +
          prm.carTypeName +
          '-' +
          prm.photoTypeName
      } else if (prm.movieType == 2) {
        this.linkMovieName = prm.city + '-' + prm.deptName + '-' + prm.movieName
      } else if (prm.movieType == 3) {
        this.linkMovieName = prm.movieName
      }
      // this.taskId = id
      // this.taskName = taskName
    },
    putDelayPhoto() {
      let endTime = this.$date0(this.delayTime)
      let photoDelayType = null
      // new Date(Date.parse(customTime))
      let photoTimeOld = new Date(Date.parse(this.photoTimeOld))
      let photoTime = new Date(Date.parse(this.delayPhotoTime))
      if (photoTimeOld > photoTime) {
        photoDelayType = 2
      } else {
        photoDelayType = 1
      }
      let data = {
        movieId: this.linkMovieId,
        photoDelayReason: this.photoDelayReason,
        photoTimeOld: this.photoTimeOld,
        photoTime: this.delayPhotoTime,
        photoDelayType: photoDelayType,
      }
      // console.log(photoTimeOld)
      // console.log(photoDelayType)
      // console.log(data)
      // return
      if (!data.photoDelayReason) {
        this.$message.error('请填写延期原因！')
        return
      } else if (!data.photoTime) {
        this.$message.error('请填写延期时间！')
        return
      }
      this.drawerLoading = true
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
          if (res.status == 200 && res.data.errcode == 0) {
            this.$message.success('拍摄延期成功！')
            this.drawerDelayPhoto = false
            this.photoDelayReason = ''
            this.delayPhotoTime = ''
            ///////// 获取任务列表 start /////////
            this.getMovieListAjax()
          } else {
            this.$message.error('拍摄延期失败！')
          }
          this.drawerLoading = false
        })
        .catch((res) => {
          console.log(res)
          this.drawerLoading = false
        })
    },
    ///////// 延期拍摄 end /////////

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
      if (prm.isModel && !prm.movieToSupplierList1.length) {
        this.$message.error('请先完善模特')
        return
      }
      if (prm.isPerson && !prm.movieToSupplierList2.length) {
        this.$message.error('请先完善摄影师')
        return
      }
      if (prm.movieType == 1 && !prm.movieToSupplierList3.length) {
        this.$message.error('请先完善车辆')
        return
      }
      // if (prm.isOther&&!prm.movieToSupplierList4.length) {
      //   this.$message.error('请先完善其他资源')
      //   return
      // }
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
      if (prm.movieType == 1) {
        this.linkMovieName =
          prm.city +
          '-' +
          prm.deptName +
          '-' +
          prm.carTypeName +
          '-' +
          prm.photoTypeName
      } else if (prm.movieType == 2) {
        this.linkMovieName = prm.city + '-' + prm.deptName + '-' + prm.movieName
      } else if (prm.movieType == 3) {
        this.linkMovieName = prm.movieName
      }
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
      let urlStatus = 3
      for (let i = 0; i < movieUrlList.length; i++) {
        let element = movieUrlList[i]
        if (element.urlType == 1 || element.urlType == 4) {
          if (!element.url) {
            urlStatus = 2
          }
        }
      }
      let data = {
        movieId: this.linkMovieId,
        movieUrlList: movieUrlList,
        urlStatus: urlStatus,
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
            this.$message.success(res.data.msg)
            ///////// 获取任务列表 start /////////
            this.getMovieListAjax()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 删除任务 end /////////

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

    ///////// 新增评论 start /////////
    addComment(obj, item) {
      // console.log(obj)
      // console.log(item)
      if (item.serviceScore) {
        this.$message.warning('评价少于两星，请进行详细评分！')
        setTimeout(() => {
          this.commentShow++
        }, 200)
      } else {
        this.commentSketchyShow++
      }
      this.gradeMovieId = obj.movieId
      this.gradeMovieName = obj.movieName

      //
      this.gradeSupplierId = item.supplierId // 评价供应商ID
      this.gradeSupplierName = item.supplierName // 评价供应商名称
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

    ///////// 排序 start /////////
    sortableChange(column) {
      return
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

    // 完善供应商信息
    toSupplier(row, type, typeId) {
      // console.log(row)
      if (row.paymentList.length || row.offlineDataList.length) {
        this.$message.error('请款后禁止修改供应商！')
        return
      }
      this.supplierShow++
      let name = this.$timeformat(row.photoTime, 'M.dd')
      if (row.movieType == 1) {
        name += `${row.city}-${row.deptName}-${row.carTypeName}-${row.photoTypeName}`
      } else if (row.movieType == 2) {
        name += `${row.city}-${row.deptName}-${row.movieName}`
      } else if (row.movieType == 3) {
        name += `${row.movieName}`
      }
      let list = []
      row['movieToSupplierList' + typeId].forEach((element) => {
        list.push(element)
      })
      let supplierData = {
        id: row.movieId,
        name: name,
        type: type,
        typeId: typeId,
        list: list,
      }
      this.supplierData = supplierData
      // console.log(supplierData)
    },
    // 跳转报销页面
    toReimbursement(obj) {
      // console.log(obj)
      // return
      this.$router.push({
        path: '/home/reimbursement',
        query: {
          proRequireId: obj.proRequireId, // 任务需求ID 采购任务ID
          budgetApplyId: obj.budgetApplyId, // 预算ID
          applyDetailId: obj.applyDetailId, // 预算明细ID
          subjectId: obj.subjectId, // 科目ID
          subItemsId: obj.subItemsId, // 细分项id
        },
      })
    },
    // 跳转请款页面
    toRequestpayout(id, row) {
      if (row.isPerson && !row.movieToSupplierList2.length) {
        this.$message.error('请先完善摄影师！')
        return
      }
      if (row.isModel && !row.movieToSupplierList1.length) {
        this.$message.error('请先完善模特！')
        return
      }
      if (row.movieType == 1 && !row.movieToSupplierList3.length) {
        this.$message.error('请先完善车辆！')
        return
      }
      if (row.isOther && !row.movieToSupplierList4.length) {
        this.$message.error('请先完善其他资源！')
        return
      }
      this.chooseArr = []
      this.chooseArr.push(id)
      this.$store.commit('getBatchCashOut', this.chooseArr)

      this.$router.push({
        path: '/home/requestpayout',
      })
    },
    ///////// 获取反馈列表 start /////////
    getMovieFeedbackListAjax(id, status) {
      if (status == 2) {
        this.$message.error('任务已完成无法反馈')
        return
      }
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
      // console.log(data)
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
    getExpansionData(row, expandedRows) {
      console.log(row)
      console.log(expandedRows)
      return
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
            let list = listPayment.concat(listOfflineData)
            console.log(list)
            this.tableData = list
            console.log()
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

    ///////// 活动类型筛选 start /////////
    activityTypeChange(val) {
      this.getMovieListAjax()
    },
    ///////// 活动类型筛选 end /////////

    ///////// 发布状态筛选 start /////////
    linkStateChange(val) {
      this.getMovieListAjax()
    },
    ///////// 发布状态筛选 end /////////

    ///////// 拍摄时间范围筛选 start /////////
    photoTimeScopeChange() {
      this.getMovieListAjax()
    },
    ///////// 拍摄时间范围筛选 start /////////

    ///////// 通过供应商搜索 start /////////
    searchStart() {
      this.getMovieListAjax()
    },
    ///////// 通过供应商搜索 end /////////

    ///////// 完成任务 start /////////
    completion(id) {
      this.$confirm('确认要完成该活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.completionApi(id)
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    completionApi(id) {
      let data = {
        movieId: id,
        status: 2,
      }
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
          if (res.status == 200 && res.data.errcode == 0) {
            this.$message.success('任务已完成！')
            this.drawerDelay = false
            ///////// 获取任务列表 start /////////
            this.getMovieListAjax()
          } else {
            this.$message.error('任务完成失败！')
          }
          this.drawerLoading = false
        })
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 完成任务 end /////////

    ///////// 获取供应商 start /////////
    getPmsSupplierToOcarplay(val) {
      if (!val) {
        return
      }
      let data = {
        subjectId: 8,
        supplierName: val,
      }
      this.$axios
        .post('/ocarplay/api/movie/getPmsSupplierToOcarplay', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            // this.supplier = res.data.data
            let data = res.data.data
            let supplierList = []
            data.forEach((element) => {
              supplierList.push({
                value: element.supplierName,
              })
            })
            this.supplierList = supplierList
          }
        })
        .catch((res) => {
          console.log(res)
          this.drawerLoading = false
        })
    },
    ///////// 获取供应商 end /////////

    querySearch(queryString, cb) {
      // var restaurants = this.restaurants
      var results = this.supplierList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    ///////// 驳回 start /////////
    reject(obj) {
      this.$confirm('确认要驳回该活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.rejectMovie(obj)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回',
          })
        })
    },
    rejectMovie(obj) {
      if (
        obj.movieUrlList.length ||
        obj.paymentList.length ||
        obj.offlineDataList.length
      ) {
        this.$message.error('已请款或发布链接，无法驳回！')
        return
      }
      let data = {
        movieId: obj.movieId,
        status: 5,
      }
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode === 0) {
            // if (this.movieId) {
            this.$message.success('任务驳回成功！')
            // } else {
            //   this.$message.success('任务新建成功！')
            // }
            // return
            // setTimeout(() => {
            //   this.$router.push({
            //     name: 'activity',
            //   })
            // }, 1000)
            ///////// 获取任务列表 start /////////
            this.getMovieListAjax()
          } else {
            this.$message.error('任务驳回失败！')
            this.putLoading = false
          }
        })
        .catch((res) => {
          // console.log(res)
          this.putLoading = false
        })
    },
    ///////// 获取采购人员列表 start /////////
    getDeptAllUserByDeptId() {
      this.tableLoading = true
      this.$axios
        .post('/ocarplay/api/user/getDeptAllUserByDeptId?deptId=90')
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            this.answerUserLst = res.data.data
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 获取采购人员列表 end /////////
    ///////// 指拍跟进人 start /////////
    designate(index, obj) {
      this.showIndex = index
      if (index == null && obj.buyUserId) {
        this.saveAnswerUserId(obj)
      }
    },
    saveAnswerUserId(obj) {
      let data = {
        movieId: obj.movieId,
        buyUserId: obj.buyUserId,
      }
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode === 0) {
            this.$message.success('任务指派成功！')
          } else {
            this.$message.error('任务指派失败！')
          }
          this.getMovieListAjax()
        })
        .catch((res) => {
          // console.log(res)
          // this.putLoading = false
        })
    },
    ///////// 指拍跟进人 end /////////
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
.delay {
  & > div {
    margin-bottom: 6px;
  }
  .title {
    color: #f90303;
    font-size: 15px;
  }
  .time {
    color: rgb(170, 169, 169);
    font-size: 13px;
  }
  .cont {
    font-size: 14px;
    color: #5a5e66;
  }
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
      .btn1 {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        .el-badge {
          margin-left: 6px;
        }
      }
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
        // font-size: 20px;
        // color: $icoColor;
        cursor: pointer;
        margin-right: 9px;
      }
      .feedbackIcon {
        font-size: 20px;
        // color: $icoColor;
        cursor: pointer;
        // margin-right: 9px;
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
.followUserSelect {
  width: 100px;
}
</style>
<style lang="scss">
.expand {
  background: #fffaf0;
  .el-table th,
  .el-table tr {
    background-color: #00000000;
  }
  .el-table__body-wrapper {
    background: none !important;
  }
  // .el-table td, .el-table th.is-leaf{
  //   border-color: ;
  // }
}
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
