<template>
  <div id="place">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="9" class="left">
        <div class="butBox">
          <div :class="[tabact==1?'but act':'but']" @click="tab(1)">摄影师</div>
          <div :class="[tabact==2?'but act':'but']" @click="tab(2)">模特</div>
          <div :class="[tabact==3?'but act':'but']" @click="tab(3)">场地</div>
        </div>
      </el-col>
      <el-col :span="15" class="right">
        <!-- 是否会开车 -->
        <el-select v-model="isCar" clearable placeholder="是否能停车" size="small" @change="isCarChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 城市 -->
        <el-select
          v-model="city"
          filterable
          clearable
          placeholder="城市"
          size="small"
          @change="cityChange"
        >
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="add_place">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="add_place"
          >添加场地</el-button>
        </div>
      </el-col>
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
              <div class="bottom">
                <el-col :span="6" :offset="3">
                  <i class="el-icon-user" @click="toPlaceMan(item.city)"></i>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-camera" @click="addCamera()"></i>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-delete" @click="deletePlaceBtn(item.placeId)"></i>
                </el-col>
              </div>
            </div>
          </el-col>
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

    <!-- 新增场地拍摄 -->
    <camera :cameraShow="cameraShow"></camera>
    <!-- 新增场地拍摄 -->

    <!-- 新增场地拍摄 -->
    <cameraList :cameraListShow="cameraListShow"></cameraList>
    <!-- 新增场地拍摄 -->
  </div>
</template>
<script>
import cityList from '@/common/city.js' // 引入城市数据
import camera from '@/components/camera'
import cameraList from '@/components/cameraList'

export default {
  name: 'place',
  components: {
    camera,
    cameraList,
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员
      placeId: null,
      type: 2,
      // tab选项卡
      tabact: 3,
      options: [
        {
          value: 1,
          label: '是',
        },
        {
          value: 0,
          label: '否',
        },
      ],
      isCar: '',
      // 城市列表
      cityList: cityList, // 城市筛列表
      city: '',
      // 内容列表
      listLoading: false,
      placeList: [{ localPath: '' }],
      // 拍摄记录
      cameraShow: 0,
      cameraListShow: 0,
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
    ///////// 获取车主列表 start /////////
    this.getPlaceList()
  },
  // 方法
  methods: {
    // tab选项卡
    tab(prm) {
      this.tabact = prm
      let url = ''
      if (prm == 1) {
        url = '/home/resource/camera'
      } else if (prm == 2) {
        url = '/home/resource/model'
      } else if (prm == 3) {
        url = '/home/resource/place'
      }
      this.$router.push({ path: url })
    },

    ///////// 跳转场地添加页面 start /////////
    add_place() {
      this.$router.push({ path: '/home/resource/addplace' })
    },
    ///////// 跳转场地添加页面 end /////////

    ///////// 筛选能否停车 start /////////
    isCarChange(e) {
      // console.log(e)
      ///////// 获取场地列表 start /////////
      this.getPlaceList()
    },
    ///////// 筛选能否停车 end /////////

    ///////// 筛选城市 start /////////
    cityChange(e) {
      // console.log(e)
      ///////// 获取场地列表 start /////////
      this.getPlaceList()
    },
    ///////// 筛选城市 end /////////

    ///////// 获取场地列表 start /////////
    getPlaceList() {
      this.listLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        place: {
          isCar: this.isCar,
          city: this.city,
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

    ///////// 打开拍摄记录 start /////////
    toCameraList(id,type) {
      this.placeId = id
      this.cameraListShow += 1
    },
    ///////// 打开拍摄记录 start /////////

    ///////// 跳转场地摄影师和模特 start /////////
    toPlaceMan(city) {
      this.$router.push({
        path: '/home/resource/placeman',
        query: { city: city },
      })
    },
    ///////// 跳转场地详情 end /////////

    ///////// 新增拍摄 start /////////
    addCamera() {
      this.cameraShow += 1
    },
    ///////// 新增拍摄 end /////////

    ///////// 删除场地 start /////////
    deletePlaceBtn(id) {
      this.$confirm('是否删除该场地?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deletePlace(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    deletePlace(id) {
      let data = { placeId: id }
      this.$axios.post('/ocarplay/api/place/delete', data).then((res) => {
        console.log(res)
        let data = res.data
        // this.listLoading = false
        // // this.drawerAdd = false
        if (res.status == 200 && res.data.errcode == 0) {
          this.$message.success(res.data.msg)
          // 获取场地列表
          this.getPlaceList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    ///////// 删除场地 end /////////

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
  },
}
</script>
<style lang="scss" scoped>
$icoColor: #6a91e8;
#place {
  height: 100%;
  .top {
    height: 45px;
    margin-bottom: 9px;
    display: flex;
    align-items: center;
    .left {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      .butBox {
        // width: 220px;
        // height: 46px;
        overflow: hidden;
        background: white;
        color: #a0a0a0;
        border-radius: 3px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .but {
          width: 81px;
          height: 32px;
          line-height: 32px;
          font-size: 12px;
          text-align: center;
          cursor: pointer;
          &:nth-of-type(1),
          &:nth-of-type(2) {
            box-sizing: border-box;
            border-right: 1px solid #f0f0f0;
          }
        }
        .but.act,
        .but:hover {
          background: $icoColor;
          color: white;
        }
        .but:hover {
          background: $icoColor;
        }
      }
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      .el-select {
        width: 136px;
        margin-right: 9px;
      }
      .add_place {
        button {
          width: 136px;
          background: $icoColor;
        }
      }
    }
  }
  .content {
    .table_list {
      // height: 97%;
      // padding: 0 36px;
      .itemsBox {
        padding: 13px;
        height: 390px;
        .items {
          // width: 400px;
          height: 100%;
          min-height: 160px;
          margin-bottom: 1%;
          // margin-left: 6.25%;
          box-sizing: border-box;
          // padding: 9px;
          overflow: hidden;
          padding: 0;
          border: 1px solid #e7e7e7;
          border-radius: 6px;
          background: white;
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: space-around;
          // align-content: space-between;
          // align-items: flex-start;
          // &:nth-of-type(3n + 1) {
          //   margin-left: 0;
          // }
          .img {
            width: 100%;
            height: 49%;
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
