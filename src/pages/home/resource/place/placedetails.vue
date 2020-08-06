<template>
  <div id="placedetails">
    <!-- 内容列表 start -->
    <el-row class="content" v-loading="putLoading">
      <el-scrollbar style="height:100%">
        <el-col :span="24" class="title">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
          <el-col :span="12">{{title}}</el-col>
          <el-col :span="6" class="redact">
            <i class="el-icon-edit" @click="redact"></i>
          </el-col>
        </el-col>
        <el-col :span="24" class="banner">
          <!-- <div style="height:100px;" v-for="(item, index) in swiperList" :key="index">
             <img class="swp-img" :src="'/ocarplay/'+item.imgUrl" alt />
          </div>-->
          <!-- <section class="swiper"> -->
          <swiper :options="swiperOption" ref="goodSwiper">
            <swiper-slide
              class="swp-silde"
              v-for="(item, index) in swiperList"
              :key="index"
              data-id="item.id"
            >
              <img class="swp-img" :src="item.imgUrl" alt />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!-- </section> -->
        </el-col>
        <el-col :span="10" :offset="2" class="left">
          <el-col :span="24" class="list">
            <div class="key">场地名称</div>
            <div class="symbol">：</div>
            <div class="val">
              <!-- <el-input placeholder="请输入内容" v-model="placeName" clearable></el-input> -->
              {{placeName}}
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">场地类型</div>
            <div class="symbol">：</div>
            <div class="val">{{placeTypeId}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">所在区域</div>
            <div class="symbol">：</div>
            <div class="val">{{district}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">详细地址</div>
            <div class="symbol">：</div>
            <div class="val">{{address}}</div>
          </el-col>
        </el-col>
        <el-col :span="10" class="right">
          <el-col :span="24" class="list">
            <div class="key">是否可停车</div>
            <div class="symbol">：</div>
            <div class="val valList">
              <span v-if="car">是</span>
              <span v-else>否</span>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">是否可拍车</div>
            <div class="symbol">：</div>
            <div class="val valList">
              <span v-if="park">是</span>
              <span v-else>否</span>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">费用</div>
            <div class="symbol">：</div>
            <div class="val">{{money}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">备注</div>
            <div class="symbol">：</div>
            <div class="val">{{remark}}</div>
          </el-col>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
import cities from '@/common/cities.js' // 引入城市数据
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'placedetails',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId, // 90
      isshow: false,
      // 轮播数据
      swiperOption: {
        pagination: '.swiper-pagination',
        // autoplay: {},
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        loop: true, // 环路
        // //  pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30,
      },
      swiperList: [],

      // 场地新增信息
      placeId: '', // 场地ID
      placeName: '', // 场地名称
      placeTypeId: '', // 场地类型
      district_code: [], // 城市选择器代码
      district: [], // 城市选择器名称
      address: '', // 详细地址
      car: null, // 是否可停车
      park: null, // 是否可拍车
      money: '', // 费用
      remark: '', // 备注
      photoList: [], // 场地图片

      // 城市选择器数据
      optionsCity: cities,
      // 场地上传组件
      dialogVisible: false,
      dialogImageUrl: '',
      title: '场地详情',
      putLoading: false,
      /////////////////////////////////////
      
    }
  },
  // 侦听器
  watch: {
    seriesId: function (newData, oldData) {
      if (newData != '') {
        this.getCarSeriesId()
      }
    },
    carSeriesId: function (newData, oldData) {
      if (newData != '') {
        // console.log(res)
        let data = []
        newData.forEach((element) => {
          data.push(element[1])
        })
        ///////// 获取车主列表 start /////////
        this.getOwnerList(data)
      }
    },
  },
  // 钩子函数
  created() {
    //只有一张图片时不轮播
    this.swiperOption.autoplay =
      this.swiperList.length != 1
        ? {
            disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
            delay: 3000, // 自动切换的时间间隔（单位ms）
          }
        : false
  },
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 接受页面传参 start /////////
    this.getQuery()
    ///////// 获取车型列表 start /////////
    // this.getPlaceTypeList()
    ///////// 获取场地详情 start /////////
    this.getPlaceDetails()
  },
  // 方法事件
  methods: {
    ///////// 接受页面传参 start /////////
    isDeptId() {},
    ///////// 接受页面传参 end /////////

    ///////// 接受页面传参 start /////////
    getQuery() {
      let id = this.$route.query.id
      this.placeId = id
    },
    ///////// 接受页面传参 end /////////

    ///////// 获取场地详情 start /////////
    getPlaceDetails(id) {
      let data = {
        placeId: this.$route.query.id,
      }
      this.$axios.post('/ocarplay/api/place/preEditPlace', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data
          // 场地新增信息
          this.placeId = data.placeId // 场地ID
          this.placeName = data.placeName // 场地名称
          this.placeTypeId = data.placeTypeId // 场地类型
          this.district_code = data.district_code // 城市选择器代码
          this.district = data.province + data.city + data.area // 城市选择器名称
          this.address = data.address // 详细地址
          this.car = data.isCar // 是否可停车
          this.park = data.isPark // 是否可拍车
          this.money = data.money // 费用
          this.remark = data.remark // 备注
          this.photoList = data.photoList // 场地图片
          let swiperList = []
          if (data.photoList != 0) {
            data.photoList.forEach((element) => {
              swiperList.push({
                id: element.photoId,
                imgUrl: '/ocarplay/' + element.localPath,
              })
            })
          } else {
            swiperList = [
              {
                id: 0,
                imgUrl: 'static/images/carow/handerimg.png',
              },
            ]
          }
          // console.log(swiperList)
          this.swiperList = swiperList

          // console.log(this.swiperList)
          // console.log(this.$refs.goodSwiper.swiper)
          // this.isshow = true
          // this.$nextTick(() => {
          //   // this.$refs.goodSwiper.swiper.update()
          // })
        }
      })
    },
    ///////// 获取场地详情 end /////////

    ///////// 跳转编辑页面 end /////////
    redact(){
      this.$router.push({
        path: '/home/resource/addplace',
        query: { id: this.placeId,type: 1 },
      })
    },
    ///////// 跳转编辑页面 end /////////

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
#placedetails {
  height: 100%;
  background: white;
  border-radius: 8px 8px 0 0;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 36px;
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 16px 0;
      .key {
        width: 96px;
        height: 40px;
        line-height: 40px;
        // margin-right: 13px;
        text-align: justify;
        box-sizing: border-box;
      }
      .key:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
      }
      .symbol {
        height: 40px;
        line-height: 40px;
      }
      .val {
        width: 300px;
        height: 40px;
        line-height: 40px;
        .el-cascader,
        .el-select,
        .el-date-editor,
        .el-input {
          width: 100%;
        }
        .el-radio-group {
          height: 40px;
          display: flex;
          align-items: center;
        }
      }
    }
    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 13px;
      .previousBox {
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
      .redact {
        text-align: right;

        padding-right: 18px;
        i {
          cursor: pointer;
          color: $icoColor;
          font-size: 28px;
        }
      }
    }
    .banner {
      .swp-img {
        width: 100%;
        height: 260px;
        object-fit: cover;
      }
    }
    $pad: 49px;
    .left {
      padding-right: $pad;
      margin-bottom: 36px;
      .list {
        justify-content: flex-end;
      }
    }
    .right {
      padding-left: $pad;
      .list {
        justify-content: flex-start;
        .valList {
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          .miKey {
            font-size: 14px;
            color: #aaa;
          }
          .el-input {
            width: calc(100% - 64px);
          }
        }
      }
    }
    .put {
      background: white;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      button {
        width: 136px;
      }
    }
  }
}
</style>
<style lang="scss">
.right {
  .list {
    .valList {
      .el-input {
        .el-input__inner {
          border: none;
        }
      }
    }
  }
}
</style>
