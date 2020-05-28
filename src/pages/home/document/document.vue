<template>
  <div id="document">
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
          <el-table-column label="序号" width="100" align="center">
            <template slot-scope="scope">0{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="type" label="车主类型" min-width="130"></el-table-column>
          <el-table-column prop="matter" label="合作事项" min-width="240"></el-table-column>
          <el-table-column prop="carName" label="车主姓名" min-width="240"></el-table-column>
          <el-table-column prop="contractTime" label="签约时间" min-width="130"></el-table-column>
          <el-table-column prop="file" label="合同文件" min-width="360">
            <template slot-scope="scope">
              <img src="static/images/document/ppt.png" width="16" alt="" srcset="">
              {{scope.row.file}}
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
  name: 'document',
  components: {},
  data() {
    return {
      tableData: [
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        },
        {
          type: '拍摄型',
          matter: '文案约稿',
          carName: '解雨臣',
          contractTime: '2020-05-08',
          file: '《拍摄规范》'
        }
      ]
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
#document {
  height: 100%;
  .content {
    height: 100%;
    background: #fff;
    .table_list {
      height: calc(100% - 64px);
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
