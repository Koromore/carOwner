<template>
  <div id="requestpayout">
    <!-- 内容列表 start -->
    <el-row class="content">
      <el-scrollbar style="height: 100%">
        <el-col :span="24" class="title">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-col>
        <el-col :span="18" class="top">
          <div class="case">申请人</div>
          <div class="case">{{ userName }}</div>
          <div class="case">申请日期</div>
          <div class="case"></div>

          <div class="case">供应商</div>
          <div class="case">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="case">付款方</div>
          <div class="case">
            <el-radio-group v-model="radio1">
              <el-radio :label="1">武汉财务</el-radio>
              <el-radio :label="2">上海财务</el-radio>
              <el-radio :label="3">卓越财务</el-radio>
              <el-radio :label="4">泉州财务</el-radio>
              <el-radio :label="5">个人财务</el-radio>
              <el-radio :label="6">灵析财务</el-radio>
            </el-radio-group>
          </div>

          <div class="case">联系人</div>
          <div class="case"></div>
          <div class="case">联系方式</div>
          <div class="case"></div>

          <div class="case">银行卡号</div>
          <div class="case"></div>
          <div class="case">开户行</div>
          <div class="case"></div>

          <div class="case">支付宝账号</div>
          <div class="case"></div>
          <div class="case">链接</div>
          <div class="case"></div>

          <div class="case">付款种类</div>
          <div class="case">
            <el-radio-group v-model="radio2">
              <el-radio :label="1">对公付款</el-radio>
              <el-radio :label="2">对私付款</el-radio>
            </el-radio-group>
          </div>
          <div class="case">有无发票</div>
          <div class="case">
            <el-radio-group v-model="radio3">
              <el-radio :label="1">有发票</el-radio>
              <el-radio :label="2">无发票</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col class="bottom">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-row-style="{
              height: '54px',
              background: 'rgb(242, 242, 242)',
            }"
            :header-cell-style="{
              color: '#000',
              background: 'rgb(242, 242, 242)',
            }"
            border
          >
            <el-table-column prop="name" label="项目编号"> </el-table-column>
            <el-table-column prop="name" label="项目名称"> </el-table-column>
            <el-table-column prop="name" label="科目"> </el-table-column>
            <el-table-column prop="name" label="细分项"> </el-table-column>
            <el-table-column prop="name" label="预计费用"> </el-table-column>
            <el-table-column prop="name" label="采购数量"></el-table-column>
            <el-table-column prop="name" label="单价"> </el-table-column>
            <el-table-column prop="name" label="费用"> </el-table-column>
            <el-table-column prop="name" label="支付方式">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.input1"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="付款日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.input2"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="请款金额">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入内容"
                  v-model="scope.row.input3"
                  clearable
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="服务费">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入内容"
                  v-model="scope.row.input4"
                  clearable
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="付款金额">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入内容"
                  v-model="scope.row.input5"
                  clearable
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="备注">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入内容"
                  v-model="scope.row.input6"
                  clearable
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-link type="primary" @click="del(scope.row.$index)">
                  删除
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="putPlaceholder"></el-col>
        <el-col :span="24" class="put">
          <el-button type="primary" class="SlideOpen" data-text="提交">
            <span>提交</span>
          </el-button>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'requestpayout',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId,
      userName: this.$store.state.user.userName,
      // 供应商选择
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
      radio1: null,
      radio2: null,
      radio3: null,

      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          input1: null,
          input2: null,
          input3: null,
          input4: null,
          input5: null,
          input6: null,
        },
      ],
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 接受页面传参 start /////////
    this.getQuery()
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 接受页面传参 start /////////
    isDeptId() {
      if (this.deptId == 90) {
        this.disabledCaigou = false
      } else {
        this.disabledCaigou = true
      }
    },
    ///////// 接受页面传参 end /////////

    ///////// 接受页面传参 start /////////
    getQuery() {
      let type = this.$route.query.type
      let id = this.$route.query.id
    },
    ///////// 接受页面传参 end /////////

    ///////// 删除 end /////////
    del(index) {},
    ///////// 删除 end /////////
  },
}
</script>
<style lang="scss" scoped>
#requestpayout {
  height: 100%;
  background: white;
  border-radius: 8px 8px 0 0;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
    padding: 36px;

    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 13px;
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
    }
    $borderColor: #cccccc;
    .top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      box-sizing: border-box;
      border-top: 1px solid $borderColor;
      border-left: 1px solid $borderColor;
      .case {
        // min-width: 160px;
        height: 49px;
        border-bottom: 1px solid $borderColor;
        border-right: 1px solid $borderColor;
        box-sizing: border-box;
        line-height: 49px;
        &:nth-of-type(2n-1) {
          width: 15%;
          background: #f2f2f2;
          text-align: center;
        }
        &:nth-of-type(2n) {
          width: 35%;
          // background: #ccc;
        }
      }
    }
    .bottom {
      margin-top: 32px;
    }
    .put {
      background: white;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      button {
        width: 136px;
      }
    }
  }
  & >>> .el-table__body tr.current-row > td {
    background: #d8d8c8;
  }
}
</style>
<style lang="scss">
.right {
  .list {
    .valList {
      .el-input {
        .el-input__inner {
          border: none;
        }
      }
    }
  }
}
#requestpayout {
  .el-table {
    .el-table__header-wrapper {
      border-radius: 0;
      margin: 0;
    }
  }
}
</style>
