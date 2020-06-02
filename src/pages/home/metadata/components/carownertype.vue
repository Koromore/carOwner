<template>
  <div id="carownertype">
    <div class="table_list">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
        :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
        height="100%"
      >
        <el-table-column prop="name" label="序号" width="81" align="center">
          <template slot-scope="scope">0{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="siteName" label="车主类型" width="240"></el-table-column>
        <el-table-column prop="type" label="合作事项" min-width="240"></el-table-column>
        <el-table-column prop="type" label="结算金额" min-width="240"></el-table-column>
        <el-table-column prop="address" label="操作" width="100">
          <template>
            <i class="el-icon-edit" @click="redact"></i>
            <i class="el-icon-delete" @click="delContent"></i>
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
    <el-drawer :title="drawerTietle" :visible.sync="drawerData" size="720px">
      <el-row class="drawerData">
        <el-col :span="4">车主类型:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </el-col>
        <el-col :span="4">合作事项:</el-col>
        <el-col :span="18">
          <el-col :span="24">
            <el-col :span="13">
              <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-switch
                style="display: block"
                v-model="input2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="油卡"
                inactive-text="现金"
              ></el-switch>
            </el-col>
            <el-col :span="2" :offset="1">
              <i class="el-icon-plus"></i>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary">提交</el-button>
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
  name: 'carownertype',
  props: {
    openDrawer: Number
  },
  components: {},
  data() {
    return {
      input: '', // 输入框内容占位
      input2: '', // 输入框内容占位
      // 表格数据
      tableData: [
        {
          siteName: '张家古楼',
          type: '热门网红场地',
          city: '东北三省',
          add: '东北三省'
        }
      ],
      // 弹窗开关
      drawerData: false,
      drawerTietle: '新增数据'
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
    this.foreach()
  },
  // 方法
  methods: {
    ///////// 循环 start /////////
    foreach() {
      for (let i = 0; i < 30; i++) {
        // const element = array[i];
        this.tableData.push({
          siteName: '张家古楼',
          type: '热门网红场地',
          city: '东北三省',
          add: '东北三省'
        })
      }
    },
    ///////// 循环 end /////////

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
    }
    ///////// 编辑数据 start /////////
  }
}
</script>
<style lang="scss" scoped>
$icoColor: rgb(106, 145, 232);
#carownertype {
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
  .drawerData{
    i{
      cursor:pointer
    }
  }
}
</style>
