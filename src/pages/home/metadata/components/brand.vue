<template>
  <div id="brand">
    <div class="table_list">
      <el-table
        v-loading="loading"
        :data="carTypeListData"
        style="width: 100%"
        :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
        :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
        height="100%"
      >
        <el-table-column prop="name" label="序号" width="81" align="center">
          <template slot-scope="scope">0{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="deptName" label="品牌名称" width="240"></el-table-column>
        <el-table-column prop="carTypeName" label="车型列表" min-width="240"></el-table-column>
        <el-table-column prop="address" label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="redact(scope.row)"></i>
            <!-- <i class="el-icon-delete" @click="delContent(scope.row.carTypeId)"></i> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-col :span="24" class="paging">
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
    </el-col> -->

    <!-- 抽屉弹窗新增/编辑数据 start -->
    <el-drawer
      :title="drawerTietle"
      :visible.sync="drawerData"
      size="566px"
      @close="drawerDataClose"
    >
      <el-row class="drawerData">
        <el-col :span="4">品牌名称:</el-col>
        <el-col :span="18">
          <el-select v-model="deptId" clearable placeholder="请选择">
            <el-option
              v-for="item in deptIdList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <!-- saveType -->
        <template v-if="saveType == 0">
          <el-col :span="4">车型列表:</el-col>
          <el-col :span="18">
            <el-input placeholder="请输入内容" v-model="carTypeName" clearable></el-input>
          </el-col>
          <el-col :span="18" :offset="4">
            <span>批量添加请用“/”隔开</span>
          </el-col>
        </template>

        <template v-if="saveType == 1">
          <el-col :span="4">车型列表:</el-col>
          <el-col :span="18">
            <el-select v-model="carTypeAct" clearable placeholder="请选择">
              <el-option
                v-for="item in carTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">车型名称:</el-col>
          <el-col :span="18">
            <el-input placeholder="请输入内容" v-model="carTypeName" clearable></el-input>
          </el-col>
        </template>
      </el-row>
      <!-- 底部按钮 -->
      <el-col :span="24" class="btn">
        <el-col :span="6" :offset="5">
          <el-button type="info" @click="cancel">取消</el-button>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-button type="primary" @click="saveSubmit">提交</el-button>
        </el-col>
      </el-col>
    </el-drawer>
    <!-- 抽屉弹窗新增/编辑数据 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'brand',
  props: {
    openDrawer: Number
  },
  components: {},
  data() {
    return {
      input: '', // 输入框内容占位
      // 表格数据
      carTypeListData: [
        {
          siteName: '张家古楼',
          type: '热门网红场地',
          city: '东北三省',
          add: '东北三省'
        }
      ],
      // 弹窗开关
      drawerData: false,
      drawerTietle: '新增数据',
      // 加载Loading
      loading: true,
      // 品牌名称
      deptId: '',
      deptIdList: [
        {
          value: 110,
          label: '吉利舆情'
        },
        {
          value: 105,
          label: '沃尔沃'
        },
        {
          value: 153,
          label: '长城'
        }
      ],
      // 车型列表
      carTypeName: '',
      // 当前任务ID可用作判断是新增还是修改
      carTypeId: '',
      // // 判断新增还是编辑
      saveType: 0,
      // 编辑选择修改车型
      carTypeList: [],
      carTypeAct: ''
    }
  },
  // 侦听器
  watch: {
    openDrawer: function(newData, oldData) {
      this.drawerData = true
      this.drawerTietle = '新增数据'
      this.saveType = 0
      this.carTypeId = ''
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // this.foreach()
    // console.log(this.$options.name)
    ///////// 获取车型列表 start /////////
    this.getCarTypeLists()
  },
  // 方法
  methods: {
    ///////// 循环 start /////////
    // foreach() {
    //   for (let i = 0; i < 30; i++) {
    //     // const element = array[i];
    //     this.tableData.push({
    //       siteName: '张家古楼',
    //       type: '热门网红场地',
    //       city: '东北三省',
    //       add: '东北三省'
    //     })
    //   }
    // },
    ///////// 循环 end /////////

    // ///////// 分页 start /////////
    // // 每页条数变化时触发事件
    // changeSize(pageSize) {
    //   console.log(pageSize)
    // },
    // // 页码变换时触发事件
    // changePage(pageNum) {
    //   console.log(pageNum)
    // },
    // ///////// 分页 end /////////

    ///////// 编辑数据 start /////////
    redact(data) {
      this.drawerData = true
      this.drawerTietle = '编辑数据'
      this.saveType = 1
      // 编辑回填
      this.deptId = data.deptId
      let carTypeIds = data.carTypeIds.split('/')
      let carTypeNames = data.carTypeName.split('/')
      console.log(carTypeIds)
      console.log(carTypeNames)
      let list = []
      carTypeIds.forEach((element, i) => {
        let data = {
          value: element,
          label: carTypeNames[i]
        }
        list.push(data)
      })
      this.carTypeList = list
      // console.log(list)
    },
    ///////// 编辑数据 start /////////

    ///////// 点击取消按钮 end /////////
    cancel() {
      this.drawerData = false
    },
    ///////// 点击取消按钮 end /////////

    ///////// 弹窗关闭回调 start /////////
    drawerDataClose() {
      this.carTypeId = ''
      this.deptId = ''
      this.carTypeName = ''
      this.carTypeAct = ''
    },
    ///////// 弹窗关闭回调 end /////////

    ///////// 获取车型列表 start /////////
    getCarTypeLists() {
      this.loading = true
      let data = {
        ids: 0
        // pageNum: 1,
        // pageSize: 30
      }
      this.$axios
        .post('/ocarplay/api/carType/getCarTypeLists', data)
        .then(res => {
          // console.log(res)
          this.loading = false
          if (res.status == 200) {
            let data = res.data
            this.carTypeListData = data.items
            this.total = data.totalRows
          }
        })
    },
    ///////// 获取车型列表 end /////////

    ///////// 新增/修改车型数据 start /////////
    saveSubmit() {
      let data = {
        carTypeId: this.carTypeAct,
        carTypeName: this.carTypeName,
        deptId: this.deptId
      }
      let datas = []
      // carTypeId: this.carTypeAct,
      // carTypes:
      // {
      //   carTypeName: this.carTypeName,
      //   deptId: this.deptId
      // }

      // console.log(data)
      if (this.saveType == 0) {
        // this.saveCarType(data)
        if (this.carTypeName.indexOf('/') != -1) {
          // 批量添加
          let carTypeNameList = this.carTypeName.split('/')
          console.log(carTypeNameList)
          carTypeNameList.forEach(element => {
            datas.push({
              carTypeName: element,
              deptId: this.deptId,
              deleteFlag: false,
              createTime: this.$time0(new Date()),
              updateTime: this.$time0(new Date())
            })
          })
          console.log(datas)
          this.saveCarTypes(datas)
        } else {
          this.saveCarType(data)
        }

        // this.saveCarTypes(datas)
      } else if (this.saveType == 1) {
        this.saveCarType(data)
      }
    },
    // 单个添加
    saveCarType(data) {
      this.drawerData = false
      this.$axios.post('/ocarplay/api/carType/saveCarType', data).then(res => {
        if (res.status == 200 && res.data.errcode == 0) {
          this.messageWin(res.data.msg)
          this.getCarTypeLists()
        } else {
          this.messageWin(res.data.msg)
        }
      })
    },
    // 批量添加
    saveCarTypes(datas) {
      this.drawerData = false
      this.$axios
        .post('/ocarplay/api/carType/saveCarTypes', datas)
        .then(res => {
          if (res.status == 200 && res.data.errcode == 0) {
            this.messageWin(res.data.msg)
            this.getCarTypeLists()
          } else {
            this.messageWin(res.data.msg)
          }
        })
    },
    ///////// 新增/修改车型数据 end /////////

    ///////// 删除车型数据 start /////////
    // deleteCarType(id) {
    //   let data = {
    //     carTypeId: id
    //   }
    //   this.$axios
    //     .post('/ocarplay/api/carType/deleteCarType', data)
    //     .then(res => {
    //       if (res.status == 200 && res.data.errcode == 0) {
    //         this.messageWin(res.data.msg)
    //         this.getCarTypeLists()
    //       } else {
    //         this.messageError(res.data.msg)
    //       }
    //     })
    // },
    ///////// 删除车型数据 end /////////

    ///////// 删除数据 start /////////
    // delContent(id) {
    //   this.$confirm('确认要删除该数据吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.deleteCarType(id)
    //       // this.$message({
    //       //   type: 'success',
    //       //   message: '删除成功!'
    //       // })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // },
    ///////// 删除数据 end /////////

    ///////// 消息提示 start /////////
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success'
      })
    },
    messageWarning(message) {
      // 警告提示
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    }
    ///////// 消息提示 end /////////
  }
}
</script>
<style lang="scss" scoped>
$icoColor: rgb(106, 145, 232);
#brand {
  width: 100%;
  height: 100%;
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
  }
  .paging {
    height: 64px;
    box-sizing: border-box;
    padding: 16px;
    text-align: center;
  }
}
</style>

