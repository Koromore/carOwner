<template>
  <div id="ownersrecord">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="8" class="left cont">
        <div @click="previous">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </el-col>
      <el-col :span="8" class="center cont">车主解雨臣-预约记录</el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-table
          :data="ownerScheduleListData"
          style="width: 100%"
          :header-row-style="{'height': '54px'}"
          :header-cell-style="{'color': '#000'}"
          height="100%"
        >
          <el-table-column prop label="序号" width="81" align="center">
            <template slot-scope="scope">0{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="addressee" label="预约时间" min-width="130">
            <template slot-scope="scope">{{$date(scope.row.startTime)}}</template>
          </el-table-column>
          <el-table-column prop="schName" label="日程主题" min-width="100"></el-table-column>
          <el-table-column prop="during" label="时长" min-width="81"></el-table-column>
          <el-table-column prop="dayTypeName" label="类型" min-width="100"></el-table-column>
          <el-table-column prop="schLine" label="路线" min-width="180"></el-table-column>
          <el-table-column prop label="地点" min-width="180">
            <template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}</template>
          </el-table-column>
          <el-table-column prop="deptName" label="预约组别" min-width="100" align="center"></el-table-column>
          <el-table-column prop="carTypeName" label="预约车辆" min-width="100" align="center"></el-table-column>
          <el-table-column prop="schNum" label="计划预约量" width="100" align="center"></el-table-column>
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
  name: 'ownersrecord',
  components: {},
  data() {
    return {
      // 表格数据
      ownerScheduleListData: [],
      input: '',
      // 场地预览
      urlImg: '',
      srcList: [],
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
    this.getOwnerScheduleList()
  },
  // 方法
  methods: {
    ///////// 循环 start /////////
    // foreach() {
    //   for (let i = 0; i < 30; i++) {
    //     // const element = array[i];
    //     this.tableData.push({
    //       time: '20-05-04',
    //       addressee: '解雨臣',
    //       matter: '文案约稿',
    //       title: 1,
    //       link: '',
    //       tele: '15996325468',
    //       site: '湖北省武汉市洪山区武大园路武大航宇一期',
    //       type: '1',
    //       trackNum: '7894561234561',
    //       evidence: '7894561234561',
    //       budget: 500
    //     })
    //   }
    // },
    ///////// 循环 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 获取预约日程列表 start /////////
    getOwnerScheduleList() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        vehicleOwnerId: this.$route.query.id*1,
        // isDo: true
      }
      this.$axios
        .post('/ocarplay/api/vehicleOwner/ownerScheduleListAjax', data)
        .then(res => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            this.ownerScheduleListData = data.items
            this.total = data.totalRows
          }
        })
    },
    ///////// 获取预约日程列表 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      ///////// 获取预约日程列表 start /////////
      this.getOwnerScheduleList()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      ///////// 获取预约日程列表 start /////////
      this.getOwnerScheduleList()
    }
    ///////// 分页 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#ownersrecord {
  height: 100%;
  .top {
    height: 54px;
    margin-bottom: 9px;
    border: 1px solid #e7e7e7;
    border-radius: 6px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .cont {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .left {
      justify-content: flex-start;
      font-size: 22px;
      padding-left: 36px;
      div {
        cursor: pointer;
      }
      i {
        font-weight: bold;
      }
    }
    .center {
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }
    .right {
      justify-content: flex-end;
      padding-right: 36px;
      color: $icoColor;
      font-size: 13px;
      div {
        text-align: center;
        cursor: pointer;
      }
      i {
        font-size: 28px;
      }
    }
  }
  .content {
    height: calc(100% - 63px);
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
    // background: #fff;
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
      img {
        cursor: pointer;
      }
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
