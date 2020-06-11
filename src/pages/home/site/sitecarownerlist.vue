<template>
  <div id="sitecarownerlist">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <!-- <el-row class="top"> -->
      <el-col :span="8" class="left cont">
        <div @click="previous">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </el-col>
      <el-col :span="8" class="center cont">车主信息</el-col>
      <el-col :span="8" class="right cont">
        <el-select v-model="memuValue" clearable placeholder="项目组" size="small" @change="memuValueChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- </el-row> -->
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content" v-loading="listLoading">
      <el-col :span="24" class="table_list">
        <div class="items" v-for="(item,index) in ownerList" :key="index" @click="toDetail(item)">
          <div class="left">
            <!-- <el-image :src="'/ocarplay/'+item.image" fit="cover"></el-image> -->
            <el-image src="/ocarplay/uploadtemp//doc/1591854750967.jpg" fit="cover"></el-image>
          </div>
          <div class="right">
            <p>车主姓名：{{item.name}}</p>
            <p>
              车主类型：
              <template v-if="item.typeId == 1">支持型</template>
              <template v-else-if="item.typeId == 2">拍摄型</template>
              <template v-else-if="item.typeId == 3">资源型</template>
            </p>
            <p>车主来源：{{item.sourceName}}</p>
          </div>
          <div class="bottom">{{item.carSeriesName}}</div>
        </div>
      </el-col>
      <el-col :span="24" class="paging">
        <el-pagination
          @current-change="changePage"
          :current-page="1"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
import cities from '@/common/cities.js' // 引入城市数据
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'sitecarownerlist',
  components: {},
  data() {
    return {
      options: [
        {
          value: "",
          label: '全部车主'
        },
        {
          value: 1,
          label: '支持型车主'
        },
        {
          value: 2,
          label: '拍摄型车主'
        },
        {
          value: 3,
          label: '资源型车主'
        }
      ],
      memuValue: "",
      // 表格数据
      ownerList: [],
      listLoading: false,
      // 分页
      total: 0,
      pageNum: '',
      pageSize: 12
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取车主列表 start /////////
    this.getlistOwnerByCity()
  },
  // 方法
  methods: {
    memuValueChange(res){
      this.getlistOwnerByCity()
    },
    ///////// 获取车主列表 start /////////
    getlistOwnerByCity() {
      this.listLoading = true
      let data = {
        pageNum: 1,
        pageSize: 12,
        place: {
          city: this.$route.params.city
        },
        typeId: this.memuValue
      }
      this.$axios
        .post('/ocarplay/api/place/listOwnerByCity', data)
        .then(res => {
          // console.log(res)
          this.listLoading = false
          // this.drawerAdd = false
          if (res.status == 200) {
            let data = res.data
            this.ownerList = data.items
            console.log(this.ownerList)
            this.total = data.totalRows
          }
        })
    },
    ///////// 获取车主列表 end /////////

    ///////// 跳转车主详情页 end /////////
    toDetail(res){
      // console.log(res)
      this.$router.push({
        name: 'ownersdetail',
        params: {
          typeId: res.typeId,
          vehicleOwnerId: res.vehicleOwnerId
        }
      })
    },
    ///////// 跳转车主详情页 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    // changeSize(pageSize) {
    //   console.log(pageSize)
    // },
    // 页码变换时触发事件
    changePage(pageNum) {
      this.pageNum = pageNum
    }
    ///////// 分页 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#sitecarownerlist {
  height: 100%;
  .top {
    height: 88px;
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
    height: calc(100% - 88px);
    background: #fff;
    .table_list {
      height: calc(100% - 64px);
      padding: 0 36px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      .items {
        width: 420px;
        height: 200px;
        box-sizing: border-box;
        padding: 18px;
        border: 1px solid rgb(187, 187, 187);
        border-radius: 9px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        align-items: flex-start;
        .left {
          width: 174px;
          height: 123px;
          .el-image {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          width: 190px;
          height: 123px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          .el-image {
            width: 100%;
            height: 100%;
          }
        }
        .bottom {
          width: 100%;
          text-align: center;
          color: $icoColor;
        }
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
