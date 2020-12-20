<template>
  <div id="replyadvisory">
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
              <el-table-column
                show-overflow-tooltip
                prop="content"
                label="咨询内容"
              >
              </el-table-column>
              <el-table-column prop="followUser" label="采购跟进人">
                <template slot-scope="scope">
                  <div v-show="scope.row.show">
                    <el-select v-model="scope.row.followUser" placeholder="请选择" class="followUserSelect" size="mini">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <el-button type="primary" size="mini" @click="designate(scope.$index, false)">
                      确认
                    </el-button>
                  </div>
                  <div v-show="!scope.row.show">
                    <p v-if="scope.row.followUser">
                      {{ scope.row.followUser }}
                    </p>
                    <el-link
                      type="primary"
                      v-else
                      @click="designate(scope.$index, true)"
                      >指拍跟进人</el-link
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="feedback" label="处理反馈">
                <template slot-scope="scope">
                  <template v-if="scope.row.feedback">
                    {{ scope.row.feedback }}
                  </template>
                  <template v-else>
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                    >
                    </el-input>
                  </template>
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
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
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
      loading: false,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      // 咨询列表
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          content: '内容内容内容内容内容',
          followUser: '',
          feedback: '',
          show: false,
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          content: '内容内容内容内容内容',
          followUser: '阳开波',
          feedback: '反馈反馈',
          show: false,
        },
      ],
      // advisoryContent
      textarea: null,
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
  mounted() {},
  // 方法
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 指拍跟进人 start /////////
    designate(index, show) {
      let tableData = this.tableData
      tableData[index].show = show
      this.tableData = tableData
    },
    ///////// 指拍跟进人 end /////////
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
          .followUserSelect{
            width: 100px;
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
