<template>
  <div id="settlementDetail">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="8" class="left cont">
        <div @click="previous">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </el-col>
      <el-col :span="8" class="center cont">《{{taskName}}》</el-col>
      <el-col :span="8" class="right cont">
        <!-- <div @click="submitList">
          <el-button type="primary" icon="el-icon-circle-check" size="small">提交并完成</el-button>
        </div>-->
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-table
          v-loading="listLoading"
          :data="inviteList"
          style="width: 100%"
          :header-row-style="{'height': '54px'}"
          :header-cell-style="{'color': '#000'}"
          height="100%"
        >
          <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="时间" width="81">
            <template slot-scope="scope">{{$date(scope.row.createTime)}}</template>
          </el-table-column>
          <el-table-column prop="realName" label="收件人" min-width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="任务类型" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="scope.row.taskType==1">借车</template>
              <template v-else-if="scope.row.taskType==2">素材</template>
              <template v-else-if="scope.row.taskType==3">邀约</template>
              <template v-else-if="scope.row.taskType==4">拍摄</template>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="内容标题" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="link" label="链接" width="60">
            <template slot-scope="scope">
              <el-link :href="'http://'+scope.row.url" target="_blank">【原】</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="电话" min-width="110"></el-table-column>
          <el-table-column prop="homeAddress" label="地址" min-width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bankCard" label="银行卡号" min-width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isCard" label="油卡或现金" min-width="130" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.isOver">
                <span v-if="scope.row.isCard">现金</span>
                <span v-else>油卡</span>
              </template>
              <template v-else>
                <el-switch
                  style="display: block"
                  v-model="scope.row.isCard"
                  active-color="#13ce66"
                  inactive-color="#409eff"
                  active-text="现金"
                  inactive-text="油卡"
                  size="mini"
                ></el-switch>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="prove" label="结算凭证" width="200" align="center">
            <template slot-scope="scope">
              <template v-if="!scope.row.isCard&&!scope.row.prove">
                <el-input placeholder="请输入单号" v-model="scope.row.prove0" clearable size="mini"></el-input>
              </template>
              <template v-else-if="!scope.row.isCard&&scope.row.prove">{{scope.row.prove}}</template>
              <template v-else-if="scope.row.isCard&&!scope.row.prove">
                <el-upload
                  class="upload-demo"
                  action="/ocarplay/file/upload"
                  :on-preview="handlePreview"
                  :on-success="filesuccess"
                  :limit="1"
                  :show-file-list="false"
                >
                  <el-button size="mini" type="primary" @click="uploadClick(scope.$index)">上传凭证</el-button>
                </el-upload>
              </template>
              <template v-else-if="scope.row.isCard&&scope.row.prove">
                <!-- <el-button size="mini" type="success">查看凭证</el-button> -->
                <el-image
                  src="static/images/ico/btn.jpg"
                  :preview-src-list="['/ocarplay/'+scope.row.prove]"
                ></el-image>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="预算" min-width="90" align="center">
            <template slot-scope="scope">
              <!-- <div> -->
                <template  v-if="!scope.row.isOver">
                    <el-input placeholder="预算" v-model="scope.row.money" clearable size="mini"></el-input>
                </template>
                <template v-else>
                  {{scope.row.money}}
                </template>
                
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="64" align="center">
            <template slot-scope="scope" v-if="!scope.row.isOver">
              <i class="el-icon-circle-check" @click="submit(scope.row)"></i>
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
  name: 'settlementDetail',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId,
      // 任务ID
      taskId: this.$route.query.id,
      taskName: this.$route.query.name,
      // 表格数据
      listLoading: false,
      uploadIndex: '',
      total: 0,
      pageSize: 30,
      pageNum: 1,
      tableData: [],
      prove: '',
      inviteList: [],
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取结算清单 start /////////
    this.getInvite()
  },
  // 方法
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    // /api/invite/getInvitePageListByTaskId
    ///////// 获取结算清单 start /////////
    getInvite() {
      let data = {
        invite: {
          taskId: this.taskId,
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.$axios
        .post('/ocarplay/api/invite/getInvitePageListByTaskId', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            res.data.items.forEach((element) => {
              element.prove0 = ''
            })
            this.inviteList = res.data.items
            // console.log(this.inviteList)
            this.total = data.totalRows
            //       total: 0,
            // pageSize: 10,
            // pageNum: 1,
          }
        })
    },
    ///////// 获取结算清单 end /////////
    uploadClick(index) {
      this.uploadIndex = index
      // console.log(this.uploadIndex)
    },
    handlePreview() {},
    filesuccess(res, file, fileList) {
      // console.log(res)
      // console.log(res2)
      // console.log(res3)
      // console.log(res4)
      this.inviteList[this.uploadIndex].prove = res.data.localPath
    },

    ///////// 确认提交任务 start /////////
    submit(prm) {
      // console.log(prm)
      this.$confirm('确认提交任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '提交成功!'
          // })
          this.inviteSave(prm)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交',
          })
        })
    },
    // 单条凭证上传
    inviteSave(prm) {
      // console.log(prm)
      this.listLoading = true
      let data = {
        inviteId: prm.inviteId,
        isCard: prm.isCard,
        money: prm.money,
        prove: prm.prove,
        isOver: 1,
        userId: this.userId,
      }
      if (prm.isCard) {
        data.prove = prm.prove
      } else {
        data.prove = prm.prove0
      }
      if (data.prove) {
        this.$axios.post('/ocarplay/api/invite/save', data).then((res) => {
          // console.log(res)
          this.listLoading = false
          if (res.status == 200 && res.data.errcode == 0) {
            this.$message.success(res.data.msg)
            ///////// 获取结算清单 start /////////
            this.getInvite()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.$message.error('请先上传或填写结算凭证！')
        this.listLoading = false
      }
    },

    submitList() {
      this.$confirm('确认提交任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '提交成功!'
          // })
          this.inviteUpdate()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交',
          })
        })
    },
    // 任务提交完成
    inviteUpdate() {
      this.listLoading = true
      let data = {
        taskId: this.taskId,
      }
      this.$axios.post('/ocarplay/api/invite/updateBatch', data).then((res) => {
        // console.log(res)
        this.listLoading = true
        if (res.status == 200 && res.data.errcode == 0) {
          this.$message.success(res.data.msg)
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    ///////// 确认提交任务 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      // console.log(pageNum)
      ///////// 获取结算清单 start /////////
      this.getInvite()
    },
    ///////// 分页 end /////////
  },
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#settlementDetail {
  height: 100%;
  .top {
    height: 45px;
    margin-bottom: 9px;
    // background: #fff;
    // border-radius: 6px;
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
      color: $icoColor;
      font-size: 13px;
      button {
        width: 136px;
        background: $icoColor;
      }
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
    height: calc(100% - 54px);
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
    .table_list {
      height: calc(100% - 64px);
      .el-image {
        width: 80px;
        height: 28px;
        cursor: pointer;
        font-size: 0;
        margin: 0 auto;
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
