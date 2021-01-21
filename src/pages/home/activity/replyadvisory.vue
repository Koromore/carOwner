<template>
  <div id="replyadvisory">
    <el-row class="content">
      <el-col :span="24" class="top">
        <el-col :span="6" class="previousBox">
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
              <el-table-column
                prop="createTime"
                label="日期"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="initUserName"
                label="咨询人"
                min-width="50"
              >
              </el-table-column>
              <el-table-column
                prop="consultName"
                label="咨询内容"
                min-width="100"
              >
              </el-table-column>
              <el-table-column
                prop="answerName"
                label="采购跟进人"
                min-width="100"
              >
                <template slot-scope="scope">
                  <div v-show="showIndex == scope.$index">
                    <el-select
                      v-model="scope.row.answerUserId"
                      placeholder="请选择"
                      class="followUserSelect"
                      size="mini"
                      @change="changeAnswerUser"
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
                    <!-- <p v-if="scope.row.answerUserId">
                      {{ scope.row.answerUserName }}
                    </p> -->
                    <el-link
                      v-if="scope.row.answerUserId"
                      @click="designate(scope.$index)"
                      >{{ scope.row.answerUserName }}</el-link
                    >
                    <el-link
                      type="primary"
                      v-else
                      @click="designate(scope.$index)"
                      >指派跟进人</el-link
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="answerName"
                label="处理反馈"
                min-width="200"
              >
                <template slot-scope="scope">
                  <template v-if="scope.row.answerName">
                    {{ scope.row.answerName }}
                  </template>
                  <template v-else>
                    <div v-show="answerNameShowIndex == scope.$index">
                      <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入内容"
                        v-model="answerNameText"
                        clearable
                      >
                      </el-input>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="
                          saveMovieConsult(
                            scope.row.consultId,
                            scope.row.answerUserId,
                            1
                          )
                        "
                      >
                        提交
                      </el-button>
                    </div>
                    <!-- <el-link
                      @click="answerNameShow(scope.$index, scope.row.answerUserId)"
                      v-show="answerNameShowIndex != scope.$index"
                      type="primary"
                    >
                      去反馈
                    </el-link> -->
                  </template>
                </template>
              </el-table-column>
              <el-table-column prop="consultName" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="
                      answerNameShow(scope.$index, scope.row.answerUserId)
                    "
                    v-if="!scope.row.answerName"
                  >
                    反馈
                  </el-button>
                  <el-badge :value="scope.row.noReply" :hidden="!scope.row.noReply">
                    <el-button
                      type="primary"
                      plain
                      size="mini"
                      @click="getConsultList(scope.row.consultId)"
                    >
                      追问列表
                    </el-button>
                  </el-badge>
                </template>
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
      </el-col>
    </el-row>

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
            <div class="answer">
              <template v-if="item.answerName">
                答: {{ item.answerName }}
              </template>
              <template v-else>
                答:
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="answerNameText"
                  clearable
                ></el-input>
                <el-button
                  type="primary"
                  size="mini"
                  @click="
                    saveMovieConsult(
                      item.consultId,
                      item.answerUserId,
                      1
                    )
                  "
                >
                  提交
                </el-button>
              </template>
            </div>
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
  name: 'replyadvisory',
  props: {}, // 接受参数
  components: {}, // 注册组件
  data() {
    return {
      tableLoading: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
      // 咨询列表
      showIndex: null,
      answerNameShowIndex: null,
      movieConsultList: [],
      consultListDialog: false,
      consultListLoading: false,
      // 追问列表
      prentConsultId: 0,
      consultList: [],
      // advisoryContent
      answerNameText: null,
      answerNameTextZhui: null,
      answerUserLst: [],
      // 分页
      pageNum: 1,
      pagesize: 10,
      total: 10,
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
    ///////// 获取采购人员列表 /////////
    this.getDeptAllUserByDeptId()
  },
  // 方法
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 指拍跟进人 start /////////
    designate(index, obj) {
      this.showIndex = index
      if (index == null) {
        this.saveMovieConsult(obj.consultId, obj.answerUserId, 0)
      }

      // let tableData = this.tableData
      // tableData[index].show = show
      // this.tableData = tableData
    },
    ///////// 指拍跟进人 end /////////

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
    changeAnswerUser(val) {
      // this.saveMovieConsult(val,null,0)
    },
    ///////// 指拍跟进人 end /////////

    ///////// 去回复 start /////////
    answerNameShow(index, answerUserId) {
      if (!answerUserId) {
        this.$message.error('请先指定跟进人！')
        return
      }
      this.answerNameShowIndex = index
    },
    ///////// 去回复 start /////////

    ///////// 回复咨询 start /////////
    saveMovieConsult(consultId, answerUserId, type) {
      // console.log(answerName)
      // return
      let data = {
        consultId: consultId, // 咨询ID
        answerUserId: answerUserId, // 答复人
        answerName: this.answerNameText, // 答复内容
      }

      if (!data.answerUserId && !type) {
        return
      }
      if (!data.answerName && type) {
        this.$message.error('咨询内容不能为空')
        return
      }
      // this.submitLoading = true
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
            this.answerNameText = null
            this.consultName = null
            this.getMovieConsultListAjax()
            this.getConsultList(this.prentConsultId)
            this.answerNameShowIndex = null
          }
          // this.submitLoading = false
        })
        .catch((res) => {
          console.log(res)
          this.submitLoading = false
        })
    },
    ///////// 回复咨询 end /////////

    ///////// 追问咨询 end /////////
    // addConsult(obj){
    //   this.addConsultDialogFormVisible = true
    //   this.prentConsultId = obj.consultId
    // },
    getConsultList(id) {
      this.consultListDialog = true
      this.prentConsultId = id
      let data = {
        prentConsultId: id,
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
#replyadvisory {
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
        width: 100%;
        height: 100%;
        .table {
          height: calc(100% - 108px);
          margin-top: 9px;
          .followUserSelect {
            width: 100px;
          }
          .el-textarea {
            width: calc(100% - 100px);
          }
        }
        .page {
          text-align: center;
          margin-top: 9px;
        }
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
#replyadvisory {
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
