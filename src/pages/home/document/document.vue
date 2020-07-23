<template>
  <div id="document">
    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-table
          :data="cooperateleListData"
          style="width: 100%"
          :header-row-style="{'height': '54px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column label="序号" width="81" align="center" type="index"></el-table-column>
          <el-table-column prop="carTypeName" label="车主类型" min-width="130"></el-table-column>
          <el-table-column prop="coopItemsStr" label="合作事项" min-width="240"></el-table-column>
          <el-table-column prop="name" label="车主姓名" min-width="240"></el-table-column>
          <el-table-column prop="startTime" label="签约时间" min-width="130"></el-table-column>
          <el-table-column label="合同文件" min-width="360">
            <template slot-scope="scope">
              <!-- <img src="static/images/document/ppt.png" width="16" alt srcset /> -->
              <img
                  v-if="scope.row.suffix == 'doc' || scope.row.suffix == 'docx'"
                  src="static/images/document/word.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="scope.row.suffix == 'xls' || scope.row.suffix == 'xlsx'"
                  src="static/images/document/excle.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="scope.row.suffix == 'ppt' || scope.row.suffix == 'pptx'"
                  src="static/images/document/ppt.png"
                  width="16"
                  alt
                  srcset
                />
                <img v-else src="static/images/document/other.png" width="16" alt srcset />
              <el-link @click="$download(scope.row)">{{scope.row.fileName}}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[20, 30, 50]"
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
  name: 'document',
  components: {},
  data() {
    return {
      cooperateleListData: [],
      // 分页数据
      total: 0,
      pageNum: 1,
      pageSize: 30
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取文档列表 /////////
    this.getCooperateListAjax()
  },
  // 方法
  methods: {
    ///////// 获取文档列表 start /////////
    getCooperateListAjax() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.$axios.post('/ocarplay/api/cooperate/listAjax', data).then(res => {
        console.log(res)
        if (res.status == 200) {
          let data = res.data
          this.cooperateleListData = data.items
          this.total = data.totalRows
          console.log(this.cooperateleListData)
        }
      })
    },

    ///////// 获取文档列表 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      ///////// 获取文档列表 start /////////
      this.getCooperateListAjax()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      ///////// 获取文档列表 start /////////
      this.getCooperateListAjax()
    },
    ///////// 分页 end /////////

    ///////// 下载 start /////////
    download(row) {
      // console.log(row)
      let localPath = row.localPath
      let a = document.createElement('a')
      a.download = `${row.fileName}.${row.suffix}`
      a.setAttribute('href', '/ocarplay/' + localPath)
      a.click()
    }
    ///////// 下载 end /////////
  }
}
</script>
<style lang="scss" scoped>
#document {
  height: 100%;
  .content {
    height: calc(100% - 16px);
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
