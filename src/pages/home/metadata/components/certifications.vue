<template>
  <div id="certifications">
    <div class="table_list">
      <el-table
        v-loading="listLoading"
        :data="carSeriesListData"
        style="width: 100%"
        :header-row-style="{'height': '54px'}"
        :header-cell-style="{'color': '#000'}"
        height="100%"
      >
        <el-table-column prop="name" label="序号" width="81" align="center">
          <template slot-scope="scope">0{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="deptName" label="品牌名称" width="130"></el-table-column>
        <el-table-column prop="carSeriesName" label="车型列表" min-width="240">
          <template slot-scope="scope">
            <el-table :data="scope.row.carType" style="width: 100%" :show-header="false" border>
              <el-table-column prop="carTypeName" label="车型" width="240"></el-table-column>
              <el-table-column prop="carSeriesName" label="小车型"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'certifications',
  props: {},
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
          label: '吉利'
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
      ],
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
    // 获取数据列表
    this.getCarSeriesLists()
    // this.getCarTypes()
  },
  // 方法
  methods: {
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

    ///////// 获取车型列表 start /////////
    getCarSeriesLists() {
      this.listLoading = true
      let data = {
        // ids: 0,
        // pageNum: this.pageNum,
        // pageSize: this.pageSize
      }
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', data)
        .then(res => {
          // console.log(res)
          this.listLoading = false
          if (res.status == 200) {
            let data = res.data.carTypes

            let carSeriesListData = [
              {
                deptId: 105,
                deptName: '沃尔沃',
                carType: []
              },
              {
                deptId: 110,
                deptName: '吉利',
                carType: []
              },
              {
                deptId: 153,
                deptName: '长城',
                carType: []
              }
            ]
            // console.log(data)
            data.forEach(element => {
              let carSeriesIds = []
              let carSeriesName = []
              element.carSeries.forEach(element_ => {
                carSeriesIds.push(element_.carSeriesId+'/')
                carSeriesName.push(element_.carSeriesName+'/')
              })
              if (element.deptId == 105) {
                carSeriesListData[0].carType.push({
                  carTypeId: element.carTypeId,
                  carTypeName: element.carTypeName,
                  carSeriesIds: carSeriesIds,
                  carSeriesName: carSeriesName
                })
              } else if (element.deptId == 110) {
                carSeriesListData[1].carType.push({
                  carTypeId: element.carTypeId,
                  carTypeName: element.carTypeName,
                  carSeriesIds: carSeriesIds,
                  carSeriesName: carSeriesName
                })
              } else if (element.deptId == 153) {
                carSeriesListData[2].carType.push({
                  carTypeId: element.carTypeId,
                  carTypeName: element.carTypeName,
                  carSeriesIds: carSeriesIds,
                  carSeriesName: carSeriesName
                })
              }
            })
            this.carSeriesListData = carSeriesListData
            // console.log(carSeriesListData)
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
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
