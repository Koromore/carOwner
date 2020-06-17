<template>
  <div id="certifications">
    <div class="table_list">
      <el-table
        v-loading="listLoading"
        :data="carSeriesListData"
        style="width: 100%"
        :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
        :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
        height="100%"
      >
        <el-table-column prop="name" label="序号" width="81" align="center">
          <template slot-scope="scope">0{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="deptName" label="品牌名称" width="240"></el-table-column>
        <el-table-column prop="carSeriesName" label="车型列表" min-width="240">
          <template slot-scope="scope">
            <el-table :data="scope.row.carType" style="width: 100%" :show-header="false" border>
              <el-table-column prop="carTypeName" label="车型" width="240"></el-table-column>
              <el-table-column prop="carSeriesName" label="小车型"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="100">
          <template>
            <i class="el-icon-edit" @click="redact"></i>
            <!-- <i class="el-icon-delete" @click="delContent"></i> -->
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
          <el-select v-model="deptId" clearable placeholder="请选择" @change="deptChange">
            <el-option
              v-for="item in deptIdList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">车型名称:</el-col>
        <el-col :span="18">
          <el-select v-model="carType" clearable placeholder="请选择">
            <el-option
              v-for="item in carTypesList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">车型细分:</el-col>
        <el-col :span="18">
          <el-col class="carSeriesList" :span="24" v-for="(item, index) in subCarType" :key="index">
            <!-- <el-col :span="6">
              <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
            </el-col>-->
            <el-col :span="19">
              <el-input placeholder="请输入内容" v-model="item.name" clearable></el-input>
            </el-col>
            <el-col :span="4" :offset="1" class="opera">
              <i class="el-icon-delete" @click="delSubCarType(index)"></i>
              <i class="el-icon-plus" @click="addSubCarType"></i>
            </el-col>
          </el-col>
        </el-col>

        <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info" @click="cancel">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary" @click="saveSubmit">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗新增/编辑数据 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'certifications',
  props: {
    openDrawer: Number
  },
  components: {},
  data() {
    return {
      listLoading: false,
      input: '', // 输入框内容占位
      // 表格数据
      carSeriesListData: [
        {
          siteName: '张家古楼',
          type: '热门网红场地',
          city: '东北三省',
          add: '东北三省'
        }
      ],
      // 二级表格数据
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      // 弹窗开关
      drawerData: false,
      drawerTietle: '新增数据',
      // 品牌名称
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
      deptId: '',
      // 车型名称
      carTypesList: [],
      carType: '',
      subCarType: [
        {
          name: ''
        }
      ]
    }
  },
  // 侦听器
  watch: {
    openDrawer: function(newData, oldData) {
      this.drawerData = true
      this.drawerTietle = '新增数据'
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // 获取数据列表
    this.getCarSeriesLists()
    // this.getCarTypes()
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

    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0 || columnIndex === 1) {
    //     if (rowIndex % 2 === 0) {
    //       return {
    //         rowspan: 2,
    //         colspan: 1
    //       }
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       }
    //     }
    //   }
    // },
    deptChange(id) {
      this.getCarTypes(id)
    },
    ///////// 获取车型列表 start /////////
    getCarTypes(id) {
      // this.loading = true
      let data = {
        deptId: id
      }
      this.$axios
        .post('/ocarplay/api/carType/getCarTypeList', data)
        .then(res => {
          // console.log(res)

          if (res.status == 200) {
            let data = res.data
            let carTypesList = []
            data.forEach(element => {
              let carTypesListData = {
                value: element.carTypeId,
                label: element.carTypeName
              }
              carTypesList.push(carTypesListData)
            })
            this.carTypesList = carTypesList
          }
        })
    },
    ///////// 获取车型列表 end /////////

    ///////// 添加车型细分 start /////////
    addSubCarType() {
      this.subCarType.push({
        name: ''
      })
    },
    ///////// 添加车型细分 end /////////

    ///////// 删除车型细分 start /////////
    delSubCarType(index) {
      let subCarType = this.subCarType
      if (subCarType.length > 1) {
        this.subCarType.splice(index, 1)
      }
    },
    ///////// 添加车型细分 end /////////

    ///////// 删除任务 start /////////
    delContent() {
      this.$confirm('确认要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    ///////// 删除任务 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
    },
    ///////// 分页 end /////////

    ///////// 编辑数据 start /////////
    redact() {
      this.drawerData = true
      this.drawerTietle = '编辑数据'
    },
    ///////// 编辑数据 start /////////

    ///////// 点击取消按钮 end /////////
    cancel() {
      this.drawerData = false
    },
    ///////// 点击取消按钮 end /////////

    ///////// 弹窗关闭回调 start /////////
    drawerDataClose() {
      this.carType = ''
      this.deptId = ''
      this.subCarType = [
        {
          name: ''
        }
      ]
      // this.carTypeName = ''
      // this.carTypeAct = ''
    },
    ///////// 弹窗关闭回调 end /////////

    ///////// 获取车型列表 start /////////
    getCarSeriesLists() {
      this.listLoading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 30
      }
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', data)
        .then(res => {
          console.log(res)
          this.listLoading = false
          if (res.status == 200) {
            let data = res.data.items

            let carSeriesListData = [
              {
                deptId: 105,
                deptName: '沃尔沃',
                carType: []
              },
              {
                deptId: 110,
                deptName: '吉利舆情',
                carType: []
              },
              {
                deptId: 153,
                deptName: '长城',
                carType: []
              }
            ]
            data.forEach(element => {
              if (element.deptId == 105) {
                carSeriesListData[0].carType.push({
                  carTypeId: element.carTypeId,
                  carTypeName: element.carTypeName,
                  carSeriesIds: element.carSeriesIds,
                  carSeriesName: element.carSeriesName
                })
              } else if (element.deptId == 110) {
                carSeriesListData[1].carType.push({
                  carTypeId: element.carTypeId,
                  carTypeName: element.carTypeName,
                  carSeriesIds: element.carSeriesIds,
                  carSeriesName: element.carSeriesName
                })
              } else if (element.deptId == 153) {
                carSeriesListData[2].carType.push({
                  carTypeId: element.carTypeId,
                  carTypeName: element.carTypeName,
                  carSeriesIds: element.carSeriesIds,
                  carSeriesName: element.carSeriesName
                })
              }
            })
            this.carSeriesListData = carSeriesListData
            console.log(carSeriesListData)
          }
        })
    },
    ///////// 获取车型列表 end /////////

    ///////// 新增/修改车型数据 start /////////
    saveSubmit() {
      let data = []
      let subCarType = this.subCarType
      subCarType.forEach(element => {
        data.push({
          carTypeId: this.carType,
          carSeriesName: element.name,
          deleteFlag: false
        })
      })
      console.log(data)
      this.$axios
        .post('/ocarplay/api/carSeries/saveCarSeriess', data)
        .then(res => {
          if (res.status == 200 && res.data.errcode == 0) {
            this.messageWin(res.data.msg)
            this.getCarSeriesLists()
            this.drawerData = false
          } else {
            this.messageWin(res.data.msg)
          }
        })
    },
    ///////// 新增/修改车型数据 end /////////

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
#certifications {
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

  // 抽屉弹窗新增/编辑数据
  .drawerData {
    .carSeriesList {
      margin-bottom: 9px;
      .opera {
        height: 40px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        i {
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
