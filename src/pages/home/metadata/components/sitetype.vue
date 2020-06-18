<template>
  <div id="sitetype">
    <div class="table_list">
      <el-table
        :data="placeTypeListData"
        style="width: 100%"
        :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
        :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
        height="100%"
      >
        <el-table-column prop="name" label="序号" width="81" align="center">
          <template slot-scope="scope">0{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="placeTypeName" label="场地类型" min-width="240"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="redact(scope.row)"></i>
            <i class="el-icon-delete" @click="delContent(scope.row.placeTypeId)"></i>
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

    <!-- 抽屉弹窗新增/编辑数据 start -->
    <el-drawer :title="drawerTietle" :visible.sync="drawerData" size="566px" @close="drawerDataClose">
      <el-row class="drawerData">
        <el-col :span="4">场地类型:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="placeTypeName" clearable></el-input>
        </el-col>
        
      </el-row>
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
  name: 'sitetype',
  props: {
    openDrawer: Number
  },
  components: {},
  data() {
    return {
      placeTypeId: '', // 场地类型Id
      placeTypeName: '', // 输入框内容占位
      // 表格数据
      placeTypeListData: [
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
      // 分页数据
      total: 0,
      pageNum: 1,
      pageSize: 10
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
    this.getPlaceTypeList()
  },
  // 方法
  methods: {
    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      ///////// 获取场地类型列表 start /////////
      this.getPlaceTypeList()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      ///////// 获取场地类型列表 start /////////
      this.getPlaceTypeList()
    },
    ///////// 分页 end /////////

    ///////// 编辑数据 start /////////
    redact(data) {
      this.drawerData = true
      this.drawerTietle = '编辑数据'
      this.placeTypeId = data.placeTypeId
      this.placeTypeName = data.placeTypeName
    },
    ///////// 编辑数据 start /////////

    ///////// 点击取消按钮 end /////////
    cancel() {
      this.drawerData = false
    },
    ///////// 点击取消按钮 end /////////

    ///////// 弹窗关闭回调 start /////////
    drawerDataClose() {
      this.placeTypeId = ''
      this.placeTypeName = ''
    },
    ///////// 弹窗关闭回调 end /////////

    ///////// 获取场地类型列表 start /////////
    getPlaceTypeList() {
      this.loading = true
      let data = {
        ids: 0,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$axios
        .post('/ocarplay/api/placeType/listAjax', data)
        .then(res => {
          // console.log(res)
          this.loading = false
          if (res.status == 200) {
            let data = res.data
            this.placeTypeListData = data.items
            this.total = data.totalRows
          }
        })
    },
    ///////// 获取场地类型列表 end /////////

    ///////// 新增/修改车型数据 start /////////
    saveSubmit() {
      let data = {
        placeTypeId: this.placeTypeId,
        placeTypeName: this.placeTypeName
      }
      this.savePlaceType(data)
    },
    savePlaceType(data) {
      this.drawerData = false
      this.$axios.post('/ocarplay/api/placeType/saveOrUpdate', data).then(res => {
        if (res.status == 200) {
          this.messageWin(res.data.msg)
          this.getPlaceTypeList()
        } else {
          this.messageWin(res.data.msg)
        }
      })
    
    },
    ///////// 新增/修改车型数据 end /////////

    ///////// 删除车型数据 start /////////
    deleteDayType(id) {
      let data = {
        placeTypeId: id
      }
      this.$axios
        .post('/ocarplay/api/placeType/delete', data)
        .then(res => {
          if (res.status == 200 && res.data.errcode == 0) {
            this.messageWin(res.data.msg)
            this.getPlaceTypeList()
          } else {
            this.messageError(res.data.msg)
          }
        })
    },
    ///////// 删除车型数据 end /////////

    ///////// 删除数据 start /////////
    delContent(id) {
      this.$confirm('确认要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确认执行删除事件
          this.deleteDayType(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
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
#home{
  background: black;
}
#sitetype {
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
