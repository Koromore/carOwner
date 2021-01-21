<template>
  <div id="addadvisory">
    <el-row class="content">
      <el-col :span="24" class="top">
        <el-col :span="4" class="previousBox">
          <div @click="previous">
            <i class="el-icon-arrow-left"></i>
            返回
          </div>
        </el-col>
      </el-col>
      <el-col :span="24" class="center">
        <!-- <div class="left"> -->
        <!-- <div class="title">咨询列表</div> -->
        <el-col :span="24" class="add">
          <el-button
            type="primary"
            size="mini"
            @click="addConsultDialogFormVisible = true"
          >
            新增采购咨询
          </el-button>
        </el-col>
        <el-col :span="24" class="table">
          <el-table
            :data="movieConsultList"
            style="width: 100%"
            height="100%"
            v-loading="tableLoading"
          >
            <el-table-column prop="createTime" label="日期" min-width="100">
            </el-table-column>
            <el-table-column prop="initUserName" label="咨询人" min-width="70">
            </el-table-column>
            <el-table-column
              prop="consultName"
              label="咨询内容"
              min-width="130"
            >
            </el-table-column>
            <el-table-column
              prop="answerUserName"
              label="采购跟进人"
              min-width="70"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.answerUserId">
                  {{ scope.row.answerUserName }}
                </span>
                <span v-else style="color: red"> 待跟进 </span>
              </template>
            </el-table-column>
            <el-table-column prop="answerName" label="处理反馈" min-width="130">
            </el-table-column>
            <el-table-column prop="answerName" label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addConsult(scope.row)"
                >
                  追问
                </el-button>
                <el-badge :value="scope.row.noReply" :hidden="!scope.row.noReply">
                  <el-button
                    type="primary"
                    plain
                    size="mini"
                    @click="getConsultList(scope.row)"
                  >
                    追问列表
                  </el-button>
                </el-badge>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="page">
          <el-pagination
            background
            layout="total, prev, pager, next, sizes"
            :current-page="pageNum"
            :total="total"
            @current-change="changePage"
            @size-change="changeSize"
          >
          </el-pagination>
        </el-col>
        <!-- </div> -->
        <!-- <div class="right">
          <div class="title">采购咨询</div>
          <div class="text" v-loading="submitLoading">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="consultName"
            >
            </el-input>
          </div>
          <div class="btn">
            <el-button type="primary" @click="saveMovieConsult">
              提交
            </el-button>
          </div>
        </div> -->
      </el-col>
    </el-row>
    <el-dialog
      title="采购咨询"
      :visible.sync="addConsultDialogFormVisible"
      v-loading="submitLoading"
    >
      <el-input
        type="textarea"
        :rows="16"
        placeholder="请输入内容"
        v-model="consultName"
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addConsultDialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="saveMovieConsult"> 确 定 </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="追问列表"
      :visible.sync="consultListDialog"
      v-loading="consultListLoading"
    >
      <el-scrollbar style="height: 360px">
        <div class="consultList">
          <div class="item" v-for="(item, index) in consultList" :key="index">
            <div class="userName">
              {{ item.initUserName }} {{ item.createTime }}
            </div>
            <div class="question">问: {{ item.consultName }}</div>
            <div class="userName">
              {{ item.answerUserName }} {{ item.updateTime }}
            </div>
            <div class="answer">答: {{ item.answerName }}</div>
          </div>
        </div>
      </el-scrollbar>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="addConsultDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMovieConsult"> 确 定 </el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'addadvisory',
  props: {}, // 接受参数
  components: {}, // 注册组件
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId, // 90
      tableLoading: false,
      submitLoading: false,
      addConsultDialogFormVisible: false,
      consultListDialog: false,
      consultListLoading: false,
      // 咨询列表
      movieConsultList: [],
      // 追问列表
      consultList: [],
      // 咨询内容
      consultName: null,
      prentConsultId: 0, // 父咨询ID
      answerUserId: 0, // 跟进人ID
      // 分页
      pageNum: 1,
      pagesize: 10,
      total: 1000,
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取咨询列表 /////////
    this.getMovieConsultListAjax()
  },
  // 方法
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 每页条数改变 start /////////
    changeSize(size) {
      this.pageSize = size
      this.pageNum = 1
      this.getMovieConsultListAjax()
    },
    ///////// 每页条数改变 end /////////
    ///////// 翻页 start /////////
    changePage(page) {
      this.pageNum = page
      this.getMovieConsultListAjax()
    },
    ///////// 翻页 end /////////

    ///////// 获取咨询列表 start /////////
    getMovieConsultListAjax() {
      this.tableLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        movieConsult: {
          prentConsultId: 0,
        },
      }
      this.$axios
        .post('/ocarplay/api/movieConsult/listAjax', data)
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            let data = res.data
            this.movieConsultList = data.items
            this.total = data.totalRows
          }
          this.tableLoading = false
        })
        .catch((res) => {
          console.log(res)
          this.tableLoading = false
        })
    },
    ///////// 获取咨询列表 end /////////

    ///////// 新增咨询 start /////////
    saveMovieConsult() {
      let data = {
        consultName: this.consultName,
        initUserId: this.userId,
        prentConsultId: 0,
      }
      if (!data.consultName) {
        this.$message.error('咨询内容不能为空')
        return
      }
      if (this.prentConsultId) {
        data.prentConsultId = this.prentConsultId
      }
      if (this.answerUserId) {
        data.answerUserId = this.answerUserId
      }
      // answerUserId
      this.submitLoading = true
      // return
      this.$axios
        .post('/ocarplay/api/movieConsult/save', data)
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            let data = res.data
            // this.MovieConsultList = data.items
            // this.total = data.totalRows
            this.$message.success(data.msg)
            this.consultName = null
            this.getMovieConsultListAjax()
          }
          this.submitLoading = false
          this.addConsultDialogFormVisible = false
        })
        .catch((res) => {
          console.log(res)
          this.submitLoading = false
        })
    },
    ///////// 新增咨询 end /////////

    ///////// 追问咨询 end /////////
    addConsult(obj) {
      if (!obj.answerName) {
        this.$message.error('请先处理反馈！')
        return
      }
      this.addConsultDialogFormVisible = true
      this.prentConsultId = obj.consultId
      this.answerUserId = obj.answerUserId
    },
    getConsultList(obj) {
      if (!obj.answerName) {
        this.$message.error('请先处理反馈！')
        return
      }
      this.consultListDialog = true
      let data = {
        prentConsultId: obj.consultId,
      }
      this.consultListLoading = true
      this.$axios
        .post('/ocarplay/api/movieConsult/list', data)
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            let data = res.data
            this.consultList = data
            // // this.total = data.totalRows
            // this.$message.success(data.msg)
            // this.consultName = null
            // this.getMovieConsultListAjax()
          }
          this.consultListLoading = false
          this.addConsultDialogFormVisible = false
        })
        .catch((res) => {
          console.log(res)
          this.consultListLoading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
#addadvisory {
  height: 100%;
  .content {
    position: relative;
    height: calc(100% - 16px);
    background: white;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    border: 1px solid #e7e7e7;
    padding: 36px;
    .top {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 24px;
      .previousBox {
        font-size: 22px;
        text-align: left;
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
    }
    .center {
      height: calc(100% - 58px);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .table {
        width: 100%;
        height: calc(100% - 108px);
        margin-top: 9px;
      }
      .page {
        text-align: center;
        margin-top: 9px;
      }
    }
  }
}
.consultList {
  .item {
    margin-bottom: 9px;
    .question {
      margin-bottom: 9px;
      font-size: 16px;
      color: black;
    }
    .answer {
      font-size: 16px;
      color: black;
    }
  }
}
</style>
<style lang="scss">
#addadvisory {
  .el-table {
    background: none;
    .el-table__header-wrapper {
      margin-bottom: 0;
      border-radius: 0;
      // background: #fff;
    }
    .el-table__body-wrapper {
      background: #fff;
    }
    .el-table__header {
      th {
        background: none;
      }
    }
  }
  .el-table{
    .cell{
      overflow: inherit;
    }
  }
}
</style>
