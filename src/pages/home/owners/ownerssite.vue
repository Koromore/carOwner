<template>
  <div id="ownerssite">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="3" class="left">
        <div @click="previous">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </el-col>
      <el-col :span="8" :offset="5" class="center">场地信息</el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content" v-loading="listLoading">
      <el-scrollbar>
        <el-col :span="24" class="table_list">
          <el-col class="itemsBox" :span="6" v-for="(item,index) in placeList" :key="index">
            <div class="items">
              <div class="img" @click="toPlaceDetails(item.placeId)">
                <el-image style="width: 100%; height: 100%" :src="item.image" fit="cover"></el-image>
              </div>
              <div class="text">
                <p>
                  <span>{{item.placeName}}</span>
                  <span class="cost" v-if="item.money">￥{{item.money}}</span>
                  <span class="free" v-else>免费</span>
                </p>
                <p>{{item.province+item.city}} · {{item.area+item.address}}</p>
                <p>场地类型：{{item.placeTypeName}}</p>
                <p @click="toCameraList(item.placeId,3)">拍摄次数：{{item.cameraNum}}次</p>
              </div>
              <!-- <div class="bottom">
                <el-col :span="6" :offset="3">
                  <i class="el-icon-user" @click="toPlaceMan(item.city)"></i>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-camera" @click="addCamera()"></i>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-delete" @click="deletePlaceBtn(item.placeId)"></i>
                </el-col>
              </div>-->
            </div>
          </el-col>
          <el-col class="noData" v-if="placeList.length==0">
            <br />
            <br />
            <br />
            <br />
            <br />暂无场地信息...
          </el-col>
          <!-- <noDataList v-if="placeList.length==0"></noDataList> -->
        </el-col>
      </el-scrollbar>
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
import cityList from '@/common/city.js' // 引入城市数据
import noDataList from '@/components/noDataList' // 无数据组件

export default {
  name: 'ownerssite',
  components: { noDataList },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员
      value2: '',
      // 内容列表
      listLoading: false,
      placeList: [{ localPath: '' }],
      // 分页
      total: 0,
      pageNum: 1,
      pageSize: 12,
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取场地列表 start /////////
    this.getPlaceList()
  },
  // 方法
  methods: {
    ///////// 获取场地列表 start /////////
    getPlaceList() {
      this.listLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        place: {
          city: this.$route.query.city,
        },
      }
      this.$axios.post('/ocarplay/api/place/listAjax', data).then((res) => {
        // console.log(res)
        this.listLoading = false
        // this.drawerAdd = false
        if (res.status == 200) {
          let data = res.data
          data.items.forEach((element) => {
            if (element.photoList.length != 0) {
              element.image = '/ocarplay/' + element.photoList[0].localPath
            } else {
              element.image = 'static/images/carow/handerimg.png'
            }
          })
          this.placeList = data.items
          // console.log(this.placeList)
          this.total = data.totalRows
        }
      })
    },
    ///////// 获取场地列表 end /////////

    ///////// 跳转场地详情 start /////////
    toPlaceDetails(id) {
      this.$router.push({
        path: '/home/resource/placedetails',
        query: { id: id },
      })
    },
    ///////// 跳转场地详情 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    // changeSize(pageSize) {
    //   console.log(pageSize)
    // },
    // 页码变换时触发事件
    changePage(pageNum) {
      this.pageNum = pageNum
      this.getPlaceList()
    },
    ///////// 分页 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////
  },
}
</script>
<style lang="scss" scoped>
$icoColor: #6a91e8;
#ownerssite {
  height: 100%;
  box-sizing: border-box;
  padding: 36px;
  padding-bottom: 0;
  background: white;
  border-radius: 6px;
  border: 1px solid #e7e7e7;
  .top {
    height: 45px;
    margin-bottom: 9px;
    display: flex;
    align-items: center;
    >div{
      height: 45px;
      line-height: 45px;
    }
    .left {
      font-size: 22px;
      text-align: left;
      // padding-left: 36px;
      div {
        cursor: pointer;
        text-align: left;
        font-weight: 100;
        height: 37px;
        line-height: 37px;
      }
      i {
        font-weight: bold;
      }
    }
    .center {
      font-size: 28px;
      font-weight: bold;
      text-align: center;
    }
  }
  .content {
    height: calc(100% - 54px);
    .el-scrollbar {
      height: calc(100% - 64px);
    }
    .table_list {
      .itemsBox {
        padding: 13px;
        height: 360px;
        .items {
          height: 100%;
          min-height: 160px;
          margin-bottom: 1%;
          box-sizing: border-box;
          overflow: hidden;
          padding: 0;
          border: 1px solid #e7e7e7;
          border-radius: 6px;
          background: white;
          .img {
            width: 100%;
            height: 190px;
            cursor: pointer;
          }
          .text {
            width: 100%;
            height: calc(51% - 32px);
            box-sizing: border-box;
            padding: 16px 24px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            align-content: space-between;
            p {
              width: 100%;
              font-weight: 400;
              font-size: 13px;
              line-height: 24px;
              &:nth-of-type(1) {
                font-size: 16px;
                font-weight: 700;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;
              }
              &:nth-of-type(2) {
                overflow: hidden; // 超出隐藏
                white-space: nowrap; // 不换行
                text-overflow: ellipsis; // 显示省略号
              }
              &:nth-of-type(4) {
                cursor: pointer;
              }
              .free {
                color: #c73420;
              }
              .cost {
                color: $icoColor;
              }
            }
          }
          .bottom {
            width: 100%;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: $icoColor;
            background: rgba(0, 0, 0, 0.4);
            i {
              font-size: 24px;
              color: white;
              line-height: 32px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .paging {
      height: 64px;
      box-sizing: border-box;
      padding: 16px;
      text-align: center;
      background: none;
    }
  }
}
</style>
