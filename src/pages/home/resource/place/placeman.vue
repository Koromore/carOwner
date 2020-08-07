<template>
  <div id="placeman">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="8" class="left">
        <div @click="previous">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </el-col>
      <el-col :span="8" class="center">
        <div class="butBox">
          <div :class="[tabact==1?'but act':'but']" @click="tab(1)">摄影师</div>
          <div :class="[tabact==2?'but act':'but']" @click="tab(2)">模特</div>
          <!-- <div :class="[tabact==3?'but act':'but']" @click="tab(3)">场地</div> -->
        </div>
      </el-col>
      <el-col :span="8" class="right"></el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表1 start -->
    <el-row class="content content1" v-loading="listLoading" v-show="tabact==1">
      <el-scrollbar>
        <el-col :span="24" class="table_list">
          <el-col class="itemsBox" :span="6" v-for="(item,index) in cameraList" :key="index">
            <div class="items">
              <div class="left" @click="toCameraDetails(item.personId)">
                <div class="el-imageBox">
                  <div class="sex">
                    <template v-if="item.sex">
                      <i class="el-icon-female"></i>
                    </template>
                    <template v-else>
                      <i class="el-icon-male"></i>
                    </template>
                  </div>
                  <div class="el-image">
                    <img :src="'/ocarplay/'+item.image" alt srcset />
                    <div class="zhezhao">{{item.name}}</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
                      />
                    </svg>
                    &nbsp;{{item.province+item.city}}
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
                      />
                    </svg>&nbsp;
                    <template v-if="item.isCar">会开车</template>
                    <template v-else>不会开车</template>
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"
                      />
                    </svg>
                    &nbsp;{{item.tag}}
                  </p>
                  <p @click="toCameraList(item.personId,1)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="64 64 896 896"
                      width="15"
                      height="15"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M864 260H728l-32.4-90.8a32.07 32.07 0 0 0-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 1 0 192 0 96 96 0 1 0-192 0z"
                      />
                    </svg>
                    &nbsp;合作拍摄{{item.coopNum}}次
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="64 64 896 896"
                      width="15"
                      height="15"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
                      />
                    </svg>&nbsp;总体评分
                    <span>{{item.avgScore}}</span>
                  </p>
                </div>
              </div>
              <div class="bottom">
                <el-col :span="4" :offset="2">
                  <i class="el-icon-chat-dot-round"></i>
                </el-col>
                <el-col :span="4">
                  <i class="el-icon-map-location"></i>
                </el-col>
                <el-col :span="4">
                  <i class="el-icon-date"></i>
                </el-col>
                <el-col :span="4">
                  <i class="el-icon-camera" @click="addCameraa"></i>
                </el-col>
                <el-col :span="4">
                  <i class="el-icon-delete" @click="deleteCameraBtn(item.personId)"></i>
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
    <!-- 内容列表1 end -->

    <!-- 内容列表2 start -->
    <el-row class="content content2" v-loading="listLoading" v-show="tabact==2">
      <el-scrollbar>
        <el-col :span="24" class="table_list">
          <el-col class="itemsBox" :span="6" v-for="(item,index) in modelList" :key="index">
            <div class="items">
              <div class="left">
                <div class="el-imageBox">
                  <div class="sex">
                    <i class="el-icon-female"></i>
                  </div>
                  <div class="el-image">
                    <img :src="'/ocarplay/' + item.localPath" alt srcset />
                    <div class="zhezhao">解雨臣</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
                      />
                    </svg>&nbsp;湖北省武汉市
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
                      />
                    </svg>&nbsp;不会开车
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"
                      />
                    </svg>&nbsp;可爱萝莉
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="64 64 896 896"
                      width="15"
                      height="15"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M864 260H728l-32.4-90.8a32.07 32.07 0 0 0-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 1 0 192 0 96 96 0 1 0-192 0z"
                      />
                    </svg>&nbsp;合作拍摄5次
                  </p>
                </div>
              </div>
              <div class="bottom">
                <el-col :span="6" :offset="3">
                  <i class="el-icon-edit-outline"></i>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-camera"></i>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-delete"></i>
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
    <!-- 内容列表2 end -->
  </div>
</template>
<script>
import cityList from '@/common/city.js' // 引入城市数据

export default {
  name: 'placeman',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员
      // tab选项卡
      tabact: 1,
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
      value1: '',
      // 列表数据
      modelList: [],
      // 城市列表
      cityList: cityList, // 城市筛列表
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
    ///////// 获取摄影师列表 start /////////
    this.getPhotoPersonList()
    ///////// 获取模特列表 start /////////
    this.getModelList()
  },
  // 方法
  methods: {
    // tab选项卡
    tab(prm) {
      this.tabact = prm
    },

    ///////// 跳转场地添加页面 start /////////
    add_place() {
      this.$router.push({ path: '/home/resource/addplace' })
    },
    ///////// 跳转场地添加页面 start /////////

    ///////// 获取车主列表 start /////////
    getPhotoPersonList() {
      this.listLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        photoPerson: {
          city: this.$route.query.city,
        },
      }
      this.$axios
        .post('/ocarplay/api/photoPerson/listAjax', data)
        .then((res) => {
          // console.log(res)
          this.listLoading = false
          // this.drawerAdd = false
          if (res.status == 200) {
            let data = res.data
            this.cameraList = data.items
            this.total = data.totalRows
            this.total = data.totalRows
          }
        })
    },
    ///////// 获取车主列表 end /////////

    ///////// 获取模特列表 start /////////
    getModelList() {
      this.listLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        model: {
          city: this.$route.query.city,
        },
      }
      this.$axios.post('/ocarplay/api/model/listAjax', data).then((res) => {
        // console.log(res)
        this.listLoading = false
        // this.drawerAdd = false
        if (res.status == 200) {
          let data = res.data
          data.items.forEach((element) => {
            for (let i = 0; i < element.modelIntroList.length; i++) {
              const element1 = element.modelIntroList[i]
              if (element1.type == 1) {
                element.localPath = element1.localPath
                break
              }
            }
          })
          this.modelList = data.items
          // console.log(this.ownerList)
          this.total = data.totalRows
        }
      })
    },
    ///////// 获取模特列表 end /////////

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
      this.getlistOwnerByCity()
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
#placeman {
  height: 100%;
  box-sizing: border-box;
  padding: 36px;
  padding-bottom: 0;
  background: white;
  border-radius: 6px;
  .top {
    height: 45px;
    margin-bottom: 9px;
    display: flex;
    align-items: center;
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
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      .butBox {
        // width: 220px;
        // height: 46px;
        overflow: hidden;
        background: white;
        border: 1px solid #f0f0f0;
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
    height: calc(100% - 54px);
    // background: #fff;
    .el-scrollbar {
      height: calc(100% - 64px);
    }
    .table_list {
      height: 100%;
      // padding: 0 36px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;
      .itemsBox {
        padding: 13px;
        height: 254px;
        .items {
          // width: 400px;
          height: 100%;
          min-height: 160px;
          margin-bottom: 1%;
          // margin-left: 6.25%;
          box-sizing: border-box;
          // padding: 9px;
          overflow: hidden;
          padding-top: 13px;
          border: 1px solid #e7e7e7;
          border-radius: 6px;
          background: white;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: space-between;
          align-items: flex-start;
          &:nth-of-type(3n + 1) {
            margin-left: 0;
          }
          .left {
            width: 49%;
            height: 72%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-imageBox {
              position: relative;
              .sex {
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                background: white;
                position: absolute;
                bottom: 8px;
                right: 8px;
                z-index: 9;
                box-sizing: border-box;
                border-radius: 50%;
                border: 1px solid #e9e9e9;
                i {
                  font-weight: bold;
                  font-size: 16px;
                  color: #ff94b8;
                }
              }
              $imgwidth: 120px;
              .el-image {
                margin: 0 auto;
                width: $imgwidth;
                height: $imgwidth;
                border-radius: 50%;
                padding: 6px;
                background: #e9e9e9;
                img {
                  width: $imgwidth;
                  height: $imgwidth;
                  border-radius: 50%;
                  object-fit: cover;
                }
              }
              .zhezhao {
                width: $imgwidth;
                height: 36px;
                line-height: 36px;
                color: white;
                background: rgba(0, 0, 0, 0.4);
                position: absolute;
                bottom: 0;
                text-align: center;
              }
            }
          }
          .right {
            width: 45%;
            height: 81%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            > div {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
            }
            p {
              width: 100%;
              font-size: 14px;
              i {
                color: $icoColor;
              }
              span {
                color: $icoColor;
              }
            }
            .el-image {
              width: 100%;
              height: 100%;
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
