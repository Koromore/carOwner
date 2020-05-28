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
      <el-col :span="8" class="center cont">《哈弗4月日常邀约》</el-col>
      <el-col :span="8" class="right cont">
        <div @click="submit">
          <i class="el-icon-circle-check"></i>
          <br />提交并完成
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop="time" label="时间" width="100"></el-table-column>
          <el-table-column prop="addressee" label="收件人" width="100"></el-table-column>
          <el-table-column prop="matter" label="合作事项" width="180"></el-table-column>
          <el-table-column prop="title" label="内容标题" min-width="320"></el-table-column>
          <el-table-column prop="link" label="链接" min-width="90">
            【原】
          </el-table-column>
          <el-table-column prop="tele" label="电话" min-width="130"></el-table-column>
          <el-table-column prop="site" label="地址" min-width="360"></el-table-column>
          <el-table-column prop="type" label="油卡或现金" min-width="110" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.type == 1">油卡</template>
              <template v-else-if="scope.row.type == 2">现金</template>
            </template>
          </el-table-column>
          <el-table-column prop="evidence" label="结算凭证" min-width="200" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.type == '1'&&scope.row.trackNum == ''">
                <el-input placeholder="请输入内容" v-model="input" clearable size="mini"></el-input>
              </template>
              <template
                v-else-if="scope.row.type == '1'&&scope.row.trackNum != ''"
              >{{scope.row.trackNum}}</template>
              <template
                v-else-if="scope.row.type == '2'&&scope.row.evidence == ''"
              >上传凭证</template>
              <template
                v-else-if="scope.row.type == '2'&&scope.row.evidence != ''"
              >查看凭证</template>
            </template>
          </el-table-column>
          <el-table-column prop="budget" label="预算" min-width="80" align="center"></el-table-column>
          <el-table-column prop="address" label="操作" width="130" align="center">
            <template>
              <i class="el-icon-circle-check"></i>
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
          :page-size="10"
          layout="total, prev, pager, next ,sizes"
          :total="100"
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
      // 表格数据
      tableData: [
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '7894561234561',
          evidence: '7894561234561',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '2',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '2',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '2',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '2',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '2',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '2',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        },
        {
          time: '20-05-04',
          addressee: '解雨臣',
          matter: '文案约稿',
          title: '我和我的XC60生活，此刻是美好的开端',
          link: '',
          tele: '15996325468',
          site: '湖北省武汉市洪山区武大园路武大航宇一期',
          type: '1',
          trackNum: '7894561234561',
          evidence: '',
          budget: 500
        }
      ],
      input: ''
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
    previous(){
      this.$router.push({
        path: '/home/settlement'
      })
    },
    ///////// 返回上一页 end /////////

    ///////// 确认 start /////////
    submit(){
      this.$confirm('确认提交任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
    },
    ///////// 确认 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
    }
    ///////// 分页 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#settlementDetail {
  height: 100%;
  .top {
    height: 88px;
    margin-bottom: 9px;
    background: #fff;
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
      padding-left: 36px;
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
      padding-right: 36px;
      color: $icoColor;
      font-size: 13px;
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
    height: calc(100% - 97px);
    background: #fff;
    .table_list {
      height: calc(100% - 64px);
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
