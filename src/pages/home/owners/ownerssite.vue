<template>
  <div id="ownerssite">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="8" class="left cont">
        <div @click="previous">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </el-col>
      <el-col :span="8" class="center cont">场地信息</el-col>
      <el-col :span="8" class="right cont">
        <!-- <div @click="submit">
          <i class="el-icon-circle-check"></i>
          <br />提交并完成
        </div>-->
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-table
          :data="ownerRelate"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label="序号" width="81" align="center">
            <template slot-scope="scope">0{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="placeName" label="场地名称" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="placeTypeName" label="场地类型" width="180"></el-table-column>
          <el-table-column prop="title" label="详细地址" min-width="320" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="环境图片" width="130" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 30px"
                src="static/images/ico/eye.png"
                :preview-src-list="['/ocarplay/'+scope.row.image]"
              ></el-image>
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
  name: 'ownerssite',
  components: {},
  data() {
    return {
      // 表格数据
      ownerRelate: [
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
        }
      ],
      input: '',
      // 场地预览
      urlImg: '',
      srcList: [],
      // 分页数据
      total: 0,
      pageNum: 1,
      pageSize: 10
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    console.log(this.$route.params.ownerId)
    // this.foreach()
    ///////// 获取场地信息 start /////////
    this.getOwnerRelatePlace()
  },
  // 方法
  methods: {
    ///////// 循环 start /////////
    // foreach() {
    //   for (let i = 0; i < 30; i++) {
    //     // const element = array[i];
    //     this.tableData.push({
    //       time: '20-05-04',
    //       addressee: '解雨臣',
    //       matter: '文案约稿',
    //       title: '我和我的XC60生活，此刻是美好的开端',
    //       link: '',
    //       tele: '15996325468',
    //       site: '湖北省武汉市洪山区武大园路武大航宇一期',
    //       type: '1',
    //       trackNum: '7894561234561',
    //       evidence: '7894561234561',
    //       budget: 500
    //     })
    //   }
    // },
    ///////// 循环 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.push({
        path: '/home/owners'
      })
    },
    ///////// 返回上一页 end /////////

    ///////// 获取场地信息 start /////////
    getOwnerRelatePlace() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        vehicleOwnerId: this.$route.params.ownerId
      }
      this.$axios
        .post('/ocarplay/api/vehicleOwner/getOwnerRelatePlace', data)
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            let data = res.data
            this.ownerRelate = data.items
            this.total = data.totalRows
          }
        })
    },
    ///////// 获取场地信息 end /////////

    ///////// 确认 start /////////
    submit() {
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
      this.pageSize = pageSize
      ///////// 获取场地信息 start /////////
      this.getOwnerRelatePlace()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      ///////// 获取场地信息 start /////////
      this.getOwnerRelatePlace()
    }
    ///////// 分页 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#ownerssite {
  height: 100%;
  .top {
    height: 88px;
    // margin-bottom: 9px;
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
    height: calc(100% - 88px);
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
