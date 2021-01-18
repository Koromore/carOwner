<template>
  <div id="activitydetail">
    <!-- 内容列表 start -->
    <el-row class="content" v-loading="loading">
      <el-scrollbar style="height: 100%">
        <!-- <el-col :span="2" class="title">返回</el-col> -->
        <el-col :span="24" class="title">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
          <el-col :span="12">活动任务详情</el-col>
          <el-col :span="6" class="redact">
            <i class="el-icon-edit" @click="addactivity"></i>
          </el-col>
        </el-col>
        <el-col :span="12" class="left">
          <el-col :span="24" class="list">
            <div class="key">任务细分</div>
            <div>:</div>
            <!-- <div class="val">{{movieDetails.movieName}}</div> -->
            <div class="val">
              <span v-if="movieDetails.movieType == 1">有车拍摄</span>
              <span v-else-if="movieDetails.movieType == 2">非车拍摄</span>
              <span v-else-if="movieDetails.movieType == 3">其他</span>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">项目名称</div>
            <div>:</div>
            <div class="val">
              {{ $timeformat(movieDetails.photoTime, 'M.dd') }}
                <template v-if="movieDetails.movieType == 1">
                  {{ movieDetails.city }}- {{ movieDetails.deptName }}-
                  {{ movieDetails.carTypeName }}-
                  {{ movieDetails.photoTypeName }}
                </template>
                <template v-else-if="movieDetails.movieType == 2">
                  {{ movieDetails.city }}- {{ movieDetails.deptName }}-
                  {{ movieDetails.movieName }}
                </template>
                <template v-else-if="movieDetails.movieType == 3">
                  {{ movieDetails.movieName }}
                </template>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">预算明细</div>
            <div>:</div>
            <div class="val">{{ movieDetails.subItemsName }}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">任务名称</div>
            <div>:</div>
            <div class="val">{{ movieDetails.movieName }}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">任务状态</div>
            <div>:</div>
            <div class="val">
              <span v-if="movieDetails.status == 0">执行中</span>
              <!-- <span v-else-if="movieDetails.status==1">审核中</span> -->
              <span v-else-if="movieDetails.status == 2">已完成</span>
              <span v-else-if="movieDetails.status == 3">延期</span>
              <!-- <span v-else-if="movieDetails.status==4">人工延期</span> -->
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">模特</div>
            <div>:</div>
            <div class="val">
              <div v-if="movieDetails.isModel">
                <template v-if="movieDetails.movieToSupplierList1.length">
                  <span
                    v-for="(item, index) in movieDetails.movieToSupplierList1"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <template v-else>
                  <span style="color: #f56c6c">待完善</span>
                </template>
              </div>
              <span v-else>/</span>
            </div>
            <!-- <div class="val" v-else style="color: #f56c6c">未完善</div> -->
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">摄影师</div>
            <div>:</div>
             <div class="val">
              <div v-if="movieDetails.isPerson">
                <template v-if="movieDetails.movieToSupplierList2.length">
                  <span
                    v-for="(item, index) in movieDetails.movieToSupplierList2"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <template v-else>
                  <span style="color: #f56c6c">待完善</span>
                </template>
              </div>
              <span v-else>/</span>
            </div>
          </el-col>

          <!-- </template> -->
          <el-col :span="24" class="list">
            <div class="key">车辆来源</div>
            <div>:</div>
            <div class="val">
              <div v-if="movieDetails.movieType == 1">
                <template v-if="movieDetails.movieToSupplierList3.length">
                  <span
                    v-for="(item, index) in movieDetails.movieToSupplierList3"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <template v-else>
                  <span style="color: #f56c6c">待完善</span>
                </template>
              </div>
              <span v-else>/</span>
            </div>
          </el-col>

          <el-col :span="24" class="list">
            <div class="key">其他资源</div>
            <div>:</div>
             <div class="val">
              <div v-if="movieDetails.isOther">
                <template v-if="movieDetails.movieToSupplierList4.length">
                  <span
                    v-for="(item, index) in movieDetails.movieToSupplierList4"
                    :key="index"
                  >
                    {{ item.supplierName }}
                  </span>
                </template>
                <template>
                  <span style="color: #f56c6c">待完善</span>
                </template>
              </div>
              <span v-else>/</span>
            </div>
          </el-col>

          <el-col :span="24" class="list">
            <div class="key">场地</div>
            <div>:</div>
            <div class="val" v-if="movieDetails.placeName">
              {{ movieDetails.placeName }}
            </div>
            <div class="val" v-else>/</div>
          </el-col>

          <el-col :span="24" class="list">
            <div class="key">创建人</div>
            <div>:</div>
            <div class="val">
              {{ movieDetails.initUserName }}
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">计划周期</div>
            <div>:</div>
            <div class="val">
              {{ movieDetails.startTime }} 至 {{ movieDetails.endTime }}
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">完成时间</div>
            <div>:</div>
            <div class="val">
              <span v-if="movieDetails.overTime">
                {{ movieDetails.overTime }}
              </span>
              <span v-else>暂无</span>
            </div>
          </el-col>
        </el-col>
        <el-col :span="12" class="right">
          <el-col :span="24" class="list">
            <div class="key">发布数</div>
            <div>:</div>
            <div class="val">{{ movieDetails.num }}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">拍摄时间</div>
            <div>:</div>
            <div class="val">{{ movieDetails.photoTime }}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">任务描述</div>
            <div>:</div>
            <div class="val">
              <div
                v-for="(item, index) in movieDetails.movieDescList"
                :key="index"
              >
                <div>主题: {{ item.descName }}</div>
                <div>时间: {{ item.descTime }}</div>
                <div>集合地点: {{ item.place }}</div>
                <div>成片要求: {{ item.photoDesc }}</div>
                <div>其他要求: {{ item.otherDesc }}</div>
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">预估费用</div>
            <div>:</div>
            <div class="val">
              <div>总费用: {{ movieDetails.money }}</div>
              <div>费用明细: {{ movieDetails.moneyRemark }}</div>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">任务文件</div>
            <div>:</div>
            <div class="val">
              <template v-if="movieDetails.movieFileList.length != 0">
                <img
                  v-if="
                    movieDetails.movieFileList[0].suffix == 'doc' ||
                    movieDetails.movieFileList[0].suffix == 'docx'
                  "
                  src="static/images/document/word.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="
                    movieDetails.movieFileList[0].suffix == 'xls' ||
                    movieDetails.movieFileList[0].suffix == 'xlsx'
                  "
                  src="static/images/document/excle.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="
                    movieDetails.movieFileList[0].suffix == 'ppt' ||
                    movieDetails.movieFileList[0].suffix == 'pptx'
                  "
                  src="static/images/document/ppt.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else
                  src="static/images/document/other.png"
                  width="16"
                  alt
                  srcset
                />
                <el-link @click="$download(movieDetails.movieFileList[0])">{{
                  movieDetails.movieFileList[0].fileName
                }}</el-link>
              </template>
              <template v-else>暂无</template>
            </div>
          </el-col>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-table
            :data="movieDetails.movieUrlList"
            style="width: 100%; margin-bottom: 72px"
            :header-row-style="{
              height: '54px',
              background: 'rgb(242, 242, 242)',
            }"
            :header-cell-style="{
              color: '#000',
              background: 'rgb(242, 242, 242)',
            }"
            v-loading="loading"
            @header-click="exportmovieDetails"
          >
            <el-table-column
              prop
              label
              width="24"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="authorName"
              label="ID"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="realName"
              label="车主"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="url"
              label="链接"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope" v-if="scope.row.url">
                <el-link :href="scope.row.url" target="_blank">【原】</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              min-width="130"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="effectName"
              label="成果"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="publishedTime"
              label="发布时间"
              min-width="80"
            ></el-table-column>
            <el-table-column prop width="64">
              <!-- <template slot="header">
                <i class="el-icon-download dow"></i>
              </template> -->
            </el-table-column>
          </el-table>
          <el-col :span="2" style="text-align: right; line-height: 48px">
            共{{ paymentList.length + offlineDataList.length }}笔
            <!-- 合计3000元 -->
          </el-col>
          <el-col :span="16">
            <el-table
              :data="paymentList"
              style="width: 100%"
              v-if="paymentList.length"
            >
              <el-table-column type="index" label="序号"> </el-table-column>
              <el-table-column prop="name" label="金额类别">
                <template>请款</template>
              </el-table-column>
              <el-table-column prop="createTime" label="时间">
                <template slot-scope="scope1">
                  <span>{{ $date0(scope1.row.createTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="groupName" label="部门">
                <template>采购部</template>
              </el-table-column>
              <el-table-column prop="userName" label="请款人/报销人">
              </el-table-column>
              <el-table-column
                prop="supplierName"
                label="供应商请款"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="payMoney" label="金额(元)">
              </el-table-column>
              <el-table-column prop="name" label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.payState">已完成</span>
                  <span v-else>未完成</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="offlineDataList"
              style="width: 100%"
              :show-header="!paymentList.length"
              v-if="offlineDataList.length"
            >
              <el-table-column type="index" label="序号">
                <template slot-scope="scope2">
                  {{ paymentList.length + scope2.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="金额类别">
                <template>报销</template>
              </el-table-column>
              <el-table-column prop="createTime" label="时间">
                <template slot-scope="scope">
                  <span>{{ $date0(scope.row.createTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="groupName" label="部门">
                <template>项目部</template>
              </el-table-column>
              <el-table-column prop="costPerson" label="请款人/报销人">
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
              <el-table-column prop="name" label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.auditStatus == 0">未审核</span>
                  <span v-else-if="scope.row.auditStatus == 1">已通过</span>
                  <span v-else-if="scope.row.auditStatus == 2">未通过</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-col>
        <el-col style="height: 40px"></el-col>
        <el-col :span="24" class="btn">
          <el-button type="primary" @click="sendInvitation"
            >发送邀请函</el-button
          >
          <el-button type="primary" @click="toAddactivity">复制任务</el-button>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法
import { saveAs } from 'file-saver'
export default {
  name: 'activitydetail',
  components: {},
  data() {
    return {
      // 任务ID
      movieId: 0,
      movieDetails: {
        movieDescList: [],
        movieFileList: [],
        movieToSupplierList1: [],
        movieToSupplierList2: [],
        movieToSupplierList3: [],
        movieToSupplierList4: [],
        movieUrlList: [],
      },
      paymentList: [],
      offlineDataList: [],
      loading: false,
      activeNames: [],
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // 任务ID
    this.movieId = this.$route.query.id
    ///////// 获取任务详情 start /////////
    this.getMovieDetails()
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////
    ///////// 获取任务详情 start /////////
    getMovieDetails() {
      this.loading = true
      let data = {
        movieId: this.$route.query.id,
      }
      this.$axios.post('/ocarplay/api/movie/show', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data
          this.getReimbur(data.proRequireId)
          let ownersList = []
          data.movieToSupplierList1 = []
          data.movieToSupplierList2 = []
          data.movieToSupplierList3 = []
          data.movieToSupplierList4 = []
          data.movieToSupplierList.forEach((element) => {
            if (element.supplierType == 1) {
              data.movieToSupplierList1.push(element)
            } else if (element.supplierType == 2) {
              data.movieToSupplierList2.push(element)
            } else if (element.supplierType == 3) {
              data.movieToSupplierList3.push(element)
            } else if (element.supplierType == 4) {
              data.movieToSupplierList4.push(element)
            }
          })
          this.movieDetails = data
          console.log(this.movieDetails)
          this.loading = false
        }
      })
    },
    ///////// 获取任务详情 end /////////

    ///////// 获取报销和请款数据 start /////////
    getReimbur(id) {
      // this.loading = true
      let data = {
        proRequireId: id,
      }
      this.$axios
        .post('/ocarplay/api/movie/getReimburAndPaymentOfPrequire', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data.data[0]
            this.paymentList = data.listPayment
            this.offlineDataList = data.listOfflineData
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 获取报销和请款数据 end /////////

    ///////// 跳转新增任务页面 end /////////
    toAddactivity() {
      let id = this.movieId
      console.log(id)
      return
      this.$router.push({
        path: '/home/addactivity',
        query: { type: 2, id: id },
      })
    },
    ///////// 跳转新增任务页面 end /////////

    ///////// 发送邀请函 start /////////
    sendInvitation() {
      let data = {
        taskId: this.taskId,
      }
      this.$axios.post('/ocarplay/task/sendInvitation', data).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.errcode == 0) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        }
      })
    },
    ///////// 发送邀请函 end /////////

    ///////// 文档下载 start /////////
    download(row) {
      let localPath = row.localPath
      let a = document.createElement('a')
      a.download = `${row.fileName}.${row.suffix}`
      // a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.setAttribute('href', 'http://176.10.10.233:8082/ocarplay/' + localPath)
      a.click()
    },
    ///////// 文档下载 end /////////

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
            saveAs(blob, prm.movieName + '.xls')
          } else {
            this.$message.error('删除任务失败！')
          }
        })
    },
    ///////// 导出结算清单 end /////////
    ///////// 完成详情列表下载 start /////////
    exportmovieDetails(column, event) {
      // console.log(column.label)
      let movieDetails = this.movieDetails
      let data = {
        taskId: this.taskId * 1,
      }
      this.$axios
        .post('/ocarplay/task/exportmovieDetails', data, {
          responseType: 'blob', //--设置请求数据格式
        })
        .then((res) => {
          if (res.status == 200) {
            var blob = new Blob([res.data], {
              type: 'text/plain;charset=utf-8',
            })
            saveAs(blob, movieDetails.movieName + '结算进度.xls')
          } else {
            this.$message.error('导出失败！')
          }
        })
    },
    ///////// 完成详情列表下载 end /////////

    ///////// 修改任务 start /////////
    addactivity() {
      // this.$store.commit('taskStatus', this.status)
      this.$router.push({
        path: '/home/addactivity',
        query: { type: 1, id: this.movieId },
      })
    },
    ///////// 修改任务 end /////////
  },
}
</script>
<style lang="scss" scoped>
#activitydetail {
  height: 100%;

  .content {
    position: relative;
    height: calc(100% - 16px);
    background: white;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    border: 1px solid #e7e7e7;
    padding: 36px;
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 0;
      > div {
        height: 40px;
        line-height: 40px;
      }
      .key {
        width: 96px;
        text-align: justify;
        box-sizing: border-box;
      }
      .key:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
      }
      .val {
        width: 420px;
        height: auto;
        margin-left: 13px;
        pre {
          font-family: '微软雅黑';
          // line-height: 24px;
          font-size: 16px;
          margin: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .text {
          height: 32px;
          line-height: 32px;
        }
      }
    }
    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 24px;
      .previousBox {
        font-size: 22px;
        text-align: left;
        // padding-left: 36px;
        div {
          cursor: pointer;
          text-align: left;
          font-weight: 100;
          height: 37px;
          line-height: 37px;
        }
        i {
          font-weight: bold;
        }
      }
      .redact {
        text-align: right;
        padding-right: 18px;
        i {
          line-height: 54px;
          cursor: pointer;
          color: #6a92e8;
          font-size: 28px;
        }
      }
    }
    $pad: 49px;
    .left {
      padding-right: $pad;
      .list {
        justify-content: flex-end;
        .el-form {
          width: 80%;
        }
      }
    }
    .right {
      padding-left: $pad;
      .list {
        justify-content: flex-start;
        .val {
          .text {
            line-height: 40px;
          }
        }
      }
    }
    .btn {
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      background: white;
      z-index: 9;
      button {
        width: 136px;
        margin-left: 49px;
        &:nth-of-type(1) {
          margin: 0;
        }
      }
    }
  }
}
.dow {
  cursor: pointer;
  font-size: 24px;
  &:hover {
    color: #6a91e8;
  }
}
</style>
<style lang="scss">
.el-collapse {
  border: 0;
  .el-collapse-item__header {
    height: 40px;
    box-sizing: border-box;
    border: 0;
    font-size: 16px;
    color: black;
  }
  .el-collapse-item__content {
    // height: 40px;
    box-sizing: border-box;
    border: 0;
    font-size: 16px;
    color: black;
  }
}
</style>
