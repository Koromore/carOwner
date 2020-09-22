<template>
  <div id="agent">
    <div class="table_list">
      <el-table
      v-loading="loading"
        :data="sourceListData"
        style="width: 100%"
        :header-row-style="{'height': '54px'}"
        :header-cell-style="{'color': '#000'}"
        height="100%"
      >
        <el-table-column prop="name" label="序号" width="81" align="center">
          <template slot-scope="scope">0{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="agentName" label="车主来源" min-width="240"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="redact(scope.row)"></i>
            <i class="el-icon-delete" @click="delContent(scope.row.agentId)"></i>
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
    <el-drawer :title="drawerTietle" :visible.sync="drawerData" size="566px" @close="drawerDataClose">
      <el-row class="drawerData">
        <el-col :span="4">经纪人:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="agentName" clearable></el-input>
        </el-col>
        
      </el-row>
      <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info" @click="cancel" size="small">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary" @click="saveSubmit" size="small">提交</el-button>
          </el-col>
        </el-col>
    </el-drawer>
    <!-- 抽屉弹窗新增/编辑数据 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'agent',
  props: {
    openDrawer: Number
  },
  components: {},
  data() {
    return {
      loading: false,
      input: '', // 输入框内容占位
      // 表格数据
      sourceListData: [],
      // 弹窗开关
      drawerData: false,
      drawerTietle: '新增数据',
      // 新增数据
      agentId: '',
      agentName: '',
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
      this.agentId = ''
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // 获取车主来源列表
    this.getlistAjaxUnPage()
  },
  // 方法
  methods: {

    // ///////// 分页 start /////////
    // // 每页条数变化时触发事件
    // changeSize(pageSize) {
    //   console.log(pageSize)
    //   this.pageSize = pageSize
    //   ///////// 获取车主来源列表 start /////////
    //   this.getlistAjaxUnPage()
    // },
    // // 页码变换时触发事件
    // changePage(pageNum) {
    //   console.log(pageNum)
    //   this.pageNum = pageNum
    //   ///////// 获取车主来源列表 start /////////
    //   this.getlistAjaxUnPage()
    // },
    // ///////// 分页 end /////////

    ///////// 编辑数据 start /////////
    redact(data) {
      this.drawerData = true
      this.drawerTietle = '编辑数据'
      this.agentId = data.agentId
      this.agentName = data.agentName
    },
    ///////// 编辑数据 start /////////

    ///////// 点击取消按钮 end /////////
    cancel() {
      this.drawerData = false
    },
    ///////// 点击取消按钮 end /////////

    ///////// 弹窗关闭回调 start /////////
    drawerDataClose(){
      this.agentName = ''
    },
    ///////// 弹窗关闭回调 end /////////

    ///////// 获取车主来源列表 start /////////
    getlistAjaxUnPage() {
      this.loading = true
      let data = {
        pageNum: 1,
        pageSize: 1000,
      }
      this.$axios
        .post('/ocarplay/api/agent/listAjax', data)
        .then(res => {
          // console.log(res)
          this.loading = false
          if (res.status == 200) {
            let data = res.data
            this.sourceListData = data.items
            // this.total = data.totalRows
          }
        })
    },
    ///////// 获取车主来源列表 end /////////

    ///////// 新增/修改车主来源 start /////////
    saveSubmit() {
      this.saveOrUpdate()
    },
    saveOrUpdate() {
      this.drawerData = false
      // this.loading = true
      let data = {
        agentId: this.agentId,
        agentName: this.agentName
      }
      this.$axios
        .post('/ocarplay/api/agent/save', data)
        .then(res => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200 && res.data.errcode == 0) {
            this.messageWin(res.data.msg)
            this.getlistAjaxUnPage()
          } else {
            this.messageWin(res.data.msg)
          }
        })
    },
    ///////// 新增/修改车主来源 end /////////

    ///////// 删除数据 start /////////
    delContent(id) {
      this.$confirm('确认要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确认执行删除事件
          this.deleteOwnerSource(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteOwnerSource(id) {
      let data = {
        agentId: id
      }
      this.$axios
        .post('/ocarplay/api/agent/delete', data)
        .then(res => {
          if (res.status == 200) {
            this.messageWin(res.data.msg)
            this.getlistAjaxUnPage()
          } else {
            this.messageError(res.data.msg)
          }
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
#agent {
  width: 100%;
  height: 100%;
}
</style>
