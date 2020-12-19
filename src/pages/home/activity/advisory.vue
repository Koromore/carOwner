<template>
  <div id="advisory">
    <el-row class="content" v-loading="loading">
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
            <el-table :data="tableData" style="width: 100%" height="100%">
              <el-table-column prop="date" label="日期"> </el-table-column>
              <el-table-column prop="name" label="咨询人"> </el-table-column>
              <el-table-column prop="content" label="咨询内容">
              </el-table-column>
              <el-table-column prop="followUser" label="采购跟进人">
                <template slot-scope="scope">
                  <span v-if="scope.row.followUser">
                    {{ scope.row.followUser }}
                  </span>
                  <span v-else style="color: red"> 待跟进 </span>
                </template>
              </el-table-column>
              <el-table-column prop="feedback" label="处理反馈">
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination background layout="total, prev, pager, next, sizes" :current-page="pageNum" :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="right">
          <div class="title">采购咨询</div>
          <div class="text">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
          </div>
          <div class="btn">
            <el-button type="primary">
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
  name: 'advisory',
  props: {}, // 接受参数
  components: {}, // 注册组件
  data() {
    return {
      loading: false,
      // 咨询列表
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          content: '内容内容内容内容内容',
          followUser: '',
          feedback: '',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          content: '内容内容内容内容内容',
          followUser: '阳开波',
          feedback: '反馈反馈',
        },
      ],
      // advisoryContent
      textarea: null,
      // 分页
      pageNum: 1,
      pagesize: 10,
      total: 1000
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////
  },
}
</script>
<style lang="scss" scoped>
#advisory {
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
        width: 59%;
        height: 100%;
        .table {
          height: calc(100% - 108px);
          margin-top: 9px;
        }
        .page{
          text-align: center;
          margin-top: 9px;
        }
      }
      .right {
        width: 39%;
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
        .btn{
          margin-top: 9px;
          text-align: center;
          .el-button{
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
