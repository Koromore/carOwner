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
        <div class="left">
          <div class="title">咨询列表</div>
          <div class="table">
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
                show-overflow-tooltip
                prop="consultName"
                label="咨询内容"
                min-width="130"
              >
              </el-table-column>
              <el-table-column prop="answerUserName" label="采购跟进人" min-width="70">
                <template slot-scope="scope">
                  <span v-if="scope.row.answerUserId">
                    {{ scope.row.answerUserName }}
                  </span>
                  <span v-else style="color: red"> 待跟进 </span>
                </template>
              </el-table-column>
              <el-table-column prop="answerName" label="处理反馈" min-width="130" show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              background
              layout="total, prev, pager, next, sizes"
              :current-page="pageNum"
              :total="total"
              @current-change="changePage"
              @size-change="changeSize"
            >
            </el-pagination>
          </div>
        </div>
        <div class="right">
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
        </div>
      </el-col>
    </el-row>
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
      // 咨询列表
      MovieConsultList: [],
      // 咨询内容
      consultName: null,
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
      this.pageNum = page
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
      }
      if (!data.consultName) {
        this.$message.error('咨询内容不能为空')
        return
      }
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
        })
        .catch((res) => {
          console.log(res)
          this.submitLoading = false
        })
    },
    ///////// 新增咨询 end /////////
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
      .title {
        font-size: 28px;
        font-weight: bold;
      }
      .left {
        width: 72%;
        height: 100%;
        .table {
          height: calc(100% - 108px);
          margin-top: 9px;
        }
        .page {
          text-align: center;
          margin-top: 9px;
        }
      }
      .right {
        width: 25%;
        height: 100%;
        .text {
          height: calc(100% - 108px);
          margin-top: 9px;
          .el-textarea {
            height: 100%;
            & >>> textarea {
              height: 100%;
            }
          }
        }
        .btn {
          margin-top: 9px;
          text-align: center;
          .el-button {
            width: 180px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
#advisory {
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
}
</style>
