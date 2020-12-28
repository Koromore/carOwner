<template>
  <div id="supplieradmin">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="24" class="box">
        <div>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-plus-outline"
            @click="supplierLoginSave"
          >
            新增活动
          </el-button>
        </div>
        <div class="searchBox"></div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!------------------ 内容列表 start ------------------>
    <el-row class="content">
      <div class="table_list">
        <el-table
          :data="supplierLoginList"
          style="width: 100%"
          :header-row-style="{ height: '54px' }"
          :header-cell-style="{ color: '#000' }"
          height="100%"
          v-loading="loading"
          ref="table"
        >
          <el-table-column
            prop
            label
            type="index"
            width="36"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="supplierName"
            label="供应商"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="合作内容"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="frequency"
            label="合作频率"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="个人/企业"
            min-width="140"
            show-overflow-tooltip
          >
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">个人</span>
            <span v-else-if="scope.row.type==2">企业</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="loginNum"
            label="小程序账号"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="操作"
            min-width="140"
            show-overflow-tooltip
          >
          <template>
            <!-- <el-button type="primary">确认</el-button> -->
            <el-button size="mini">编辑</el-button>
            <el-button size="mini">删除</el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="pageNum"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!------------------ 内容列表 end ------------------>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法
export default {
  name: 'supplieradmin',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      deptName: this.$store.state.user.deptName, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员

      supplierLoginList: [1, 2, 3, 4],
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 100,

      supplierList: [], // 供应商列表
    }
  },
  // 过滤器
  filters: {},
  // 侦听器
  watch: {
    '$store.state.searchValue': function (newData, oldData) {
      ///////// 获取任务列表 start /////////
      this.getMovieListAjax()
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 供应商账号列表 /////////
    this.getSupplierLoginAjax()
    ///////// 获取供应商 /////////
    this.getPmsSupplierToOcarplay()
    // 任务状态页码数据
  },
  // 方法
  methods: {
    ///////// 供应商账号列表 start /////////
    getSupplierLoginAjax() {
      this.loading = true
      let data = {
        // pageNum: this.pageNum,
        // pageSize: this.pageSize,
      }
      this.$axios
        .post('/ocarplay/api/supplierLogin/listAjax', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && data) {
            let data = res.data
            this.supplierLoginList = data.items
            this.total = data.totalRows
            this.loading = false
            // console.log(this.movieListData)
          }
        })
        .catch((res) => {
          this.loading = false
          console.log(res)
        })
    },

    ///////// 供应商账号列表 end /////////

    ///////// 获取供应商 start /////////
    getPmsSupplierToOcarplay(val) {
      // if (!val) {
      //   return
      // }
      let data = {
        subjectId: 8,
        supplierName: val,
      }
      this.$axios
        .post('/ocarplay/api/movie/getPmsSupplierToOcarplay', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            // this.supplier = res.data.data
            let data = res.data.data
            let supplierList = []
            data.forEach((element) => {
              supplierList.push({
                value: element.supplierName,
              })
            })
            this.supplierList = supplierList
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 获取供应商 end /////////

    ///////// 新增供应商账号 start /////////
    supplierLoginSave() {
      this.loading = true
      let data = {
        frequency: '按需合作', // 合作频率
        loginNum: 15963265487, // 登录账号
        password: 123456789, // 登录密码
        supplierId: 61, // 供应商ID
        supplierName: '冯萌', // 供应商名字
        type: 1, // 1-个人 2-企业
      }
      this.$axios
        .post('/ocarplay/api/supplierLogin/save', data)
        .then((res) => {
          console.log(res)
          if (res.status == 200 && res.data.errcode==0) {
            // let data = res.data
            // this.movieListData = data.items
            // this.total = data.totalRows
            this.$message.success(res.data.msg)
            // console.log(this.movieListData)
            this.getSupplierLoginAjax()
          }else{
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch((res) => {
          this.loading = false
          console.log(res)
        })
    },
    ///////// 新增供应商账号 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      ///////// 获取任务列表 start /////////
      this.getMovieListAjax()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      this.pageNum = pageNum
      ///////// 获取任务列表 start /////////
      this.getMovieListAjax()
      // console.log(pageNum)
    },
    ///////// 分页 end /////////
  },
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: #6a91e8;
#supplieradmin {
  height: 100%;
  .el-dialog__wrapper {
    & >>> .el-dialog__header {
      text-align: center;
      font-weight: bold;
    }
    .feedbackText {
      text-align: center;
      .el-button {
        margin-top: 18px;
        width: 180px;
      }
    }
  }

  .top {
    height: 45px;
    margin-bottom: 9px;
    // background: #fff;
    .box {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .searchBox {
        width: 281px;
      }
      .el-date-editor {
        width: 210px;
      }
      .el-select {
        width: 100px;
      }
      .searchType {
        width: 81px;
      }
      .el-button-group {
        margin-right: 39px;
        button {
          width: 81px;
        }
      }
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      .el-select {
        width: 136px;
        margin-right: 9px;
      }
      .add_task {
        button {
          width: 136px;
          background: $icoColor;
        }
      }
    }
  }
  .content {
    height: calc(100% - 54px);
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
    // background: #fff;
    .table_list {
      height: calc(100% - 64px);
      .el-tag {
        cursor: pointer;
      }

      // .el-table {
      //   background: none;
      //   & >>> .el-table__header-wrapper{
      //     margin-bottom: 10px;
      //     border-radius: 8px 8px 0 0;
      //   }
      //   & >>> .el-table__body-wrapper{
      //     background: #fff;
      //   }
      //   .el-table__header {
      //     th {
      //       background: none;
      //     }
      //   }
      // }
      i {
        // font-size: 20px;
        // color: $icoColor;
        cursor: pointer;
        margin-right: 9px;
      }
      .feedbackIcon {
        font-size: 20px;
        // color: $icoColor;
        cursor: pointer;
        // margin-right: 9px;
      }
    }
  }
}
</style>
<style lang="scss">
.taskDialog {
  .el-dialog__header {
    text-align: center;
    padding-top: 36px;
  }
  .el-dialog__title {
    color: #000;
    font-size: 24px;
    font-weight: 700;
  }
  .el-dialog {
    height: 80vh;
    margin: 10vh auto !important;
  }
  .el-dialog__body {
    height: calc(100% - 114px);
    padding: 10px 20px;
  }
}
</style>
