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
            @click="saveAdmin(0)"
          >
            新增供应商账号
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
            <!-- <template slot-scope="scope">
              <div v-if="scope.row.show">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  >
                  </el-option>
                </el-select>
              </div>
            </template> -->
          </el-table-column>
          <!-- <el-table-column
            prop="createTime"
            label="合作内容"
            min-width="140"
            show-overflow-tooltip
          >
          </el-table-column> -->
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
              <span v-if="scope.row.type == 1">个人</span>
              <span v-else-if="scope.row.type == 2">企业</span>
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
            <template slot-scope="scope">
              <!-- <el-button type="primary">确认</el-button> -->
              <el-button size="mini" @click="saveAdmin(scope.row.id)"
                >编辑</el-button
              >
              <el-button size="mini" @click="delContent(scope.row.id)">删除</el-button>
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
    <el-dialog
      title="新增供应商账号"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
      width="540px"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        :label-width="formLabelWidth"
        v-loading="saveLoading"
      >
        <el-form-item label="供应商名称" prop="supplierId">
          <!-- <el-input v-model="form.name" autocomplete="off"></el-input>supplierLoginList -->
          <el-select
            v-model="formData.supplierId"
            placeholder="请选择供应商"
            filterable
          >
            <el-option
              v-for="item in supplierList"
              :key="item.supplierId"
              :label="item.supplierName"
              :value="item.supplierId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作频率" prop="frequency">
          <el-input v-model.number="formData.frequency"></el-input>
        </el-form-item>
        <el-form-item label="账号类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio :label="1">个人</el-radio>
            <el-radio :label="2">企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账号" prop="loginNum">
          <el-input v-model.number="formData.loginNum"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="formData.password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="supplierLoginSave('formData')">
          确 定
        </el-button>
      </div>
    </el-dialog>
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

      supplierLoginList: [1, 2, 3, 4],
      loading: false,
      saveLoading: false,
      pageNum: 1,
      pageSize: 10,
      total: 100,

      supplierList: [], // 供应商列表
      dialogFormVisible: false,
      formLabelWidth: '100px',
      formData: {
        supplierId: null, // 供应商ID
        frequency: null, // 合作频率
        type: null, // 1-个人 2-企业
        loginNum: null, // 登录账号
        password: null, // 登录密码
        // supplierName: '冯萌', // 供应商名字
      },
      rules: {
        supplierId: [
          { required: true, message: '请选择供应商', trigger: 'change' },
        ],
        frequency: [
          { required: true, message: '请填写合作频率', trigger: 'blur' },
        ],
        type: [
          {
            required: true,
            message: '请选择账号类型',
            trigger: 'change',
          },
        ],
        loginNum: [{ required: true, message: '填写账号', trigger: 'blur' }],
        password: [{ required: true, message: '填写密码', trigger: 'blur' }],
      },
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
        // supplierName: val,
      }
      this.$axios
        .post('/ocarplay/api/movie/getPmsSupplierToOcarplay', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            // this.supplier = res.data.data
            let data = res.data.data
            // let supplierList = []
            // data.forEach((element) => {
            //   supplierList.push({
            //     value: element.supplierName,
            //   })
            // })
            this.supplierList = data
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    ///////// 获取供应商 end /////////

    closeDialog() {
      this.formData = {
        supplierId: null, // 供应商ID
        frequency: null, // 合作频率
        type: null, // 1-个人 2-企业
        loginNum: null, // 登录账号
        password: null, // 登录密码
        // supplierName: '冯萌', // 供应商名字
      }
    },

    saveAdmin(id) {
      this.dialogFormVisible = true
      if (id) {
        let data = {
          id: id,
        }
        this.$axios
          .post('/ocarplay/api/supplierLogin/show', data)
          .then((res) => {
            // console.log(res)
            if (res.status == 200) {
              let data = res.data
              this.formData = {
                supplierId: data.supplierId, // 供应商ID
                frequency: data.frequency, // 合作频率
                type: data.type, // 1-个人 2-企业
                loginNum: data.loginNum, // 登录账号
                password: data.password, // 登录密码
                // supplierName: '冯萌', // 供应商名字
              }
            } else {
              this.$message.error(res.data.msg)
            }
            // this.saveLoading = false
          })
          .catch((res) => {
            // this.saveLoading = false
            console.log(res)
          })
      }
    },

    ///////// 新增供应商账号 start /////////
    supplierLoginSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.supplierSave()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    supplierSave() {
      // supplierName
      let supplierList = this.supplierList
      this.saveLoading = true
      let data = this.formData
      supplierList.forEach((element) => {
        if (data.supplierId == element.supplierId) {
          data.supplierName = element.supplierName
        }
      })
      // console.log(data)
      // return
      this.$axios
        .post('/ocarplay/api/supplierLogin/save', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode == 0) {
            // let data = res.data
            // this.movieListData = data.items
            // this.total = data.totalRows
            this.$message.success(res.data.msg)
            this.dialogFormVisible = false
            // console.log(this.movieListData)
            this.getSupplierLoginAjax()
          } else {
            this.$message.error(res.data.msg)
          }
          this.saveLoading = false
        })
        .catch((res) => {
          this.saveLoading = false
          console.log(res)
        })
    },
    ///////// 新增供应商账号 end /////////

    ///////// 删除供应商账号 start /////////
    delContent(id){
      this.$confirm('确认要删除该供应商账号吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteAdmin(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // POST /api/supplierLogin/deleteBatch
    deleteAdmin(id){
      let data = {
        id: id
      }
      this.$axios
        .post('/ocarplay/api/supplierLogin/delete', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode == 0) {
            // let data = res.data
            // this.movieListData = data.items
            // this.total = data.totalRows
            this.$message.success('供应商账号删除成功！')
            // this.dialogFormVisible = false
            // console.log(this.movieListData)
            this.getSupplierLoginAjax()
          } else {
            this.$message.error(res.data.msg)
          }
          // this.saveLoading = false
        })
        .catch((res) => {
          // this.saveLoading = false
          console.log(res)
        })
    },
    ///////// 删除供应商账号 end /////////

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
    .el-select{
      width: 100%;
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
