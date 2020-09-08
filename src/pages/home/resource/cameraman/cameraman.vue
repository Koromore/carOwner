<template>
  <div id="cameraman">
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
        <!-- 评分排序 -->
        <div class="rank" @click="orderTypeChange1">
          拍摄排序
          <i :class="[orderSort1==2?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
        </div>
        <div class="rank" @click="orderTypeChange2">
          评分排序
          <i :class="[orderSort2==2?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
        </div>
        <!-- 是否会开车 -->
        <el-select v-model="isCar" clearable placeholder="是否会开车" size="small" @change="isCarChange">
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
        <div class="addCameraman" v-if="subordinate!=150||adminShow">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="addCamera"
          >添加摄影师</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content" v-loading="listLoading">
      <el-scrollbar>
        <el-col :span="24" class="table_list">
          <el-col class="itemsBox" :span="6" v-for="(item,index) in cameraList" :key="index">
            <div class="items">
              <div class="left">
                <div class="el-imageBox" @click="toCameraDetails(item.personId)">
                  <div class="sex">
                    <template v-if="item.sex">
                      <i class="el-icon-female"></i>
                    </template>
                    <template v-else>
                      <i class="el-icon-male"></i>
                    </template>
                  </div>
                  <div class="el-image">
                    <img :src="item.image" alt srcset />
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
                    <span class="city">&nbsp;{{item.province+item.city}}</span>
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
                    </svg>
                    <span>&nbsp;<template v-if="item.isCar">会开车</template><template v-else>不会开车</template>
                    </span>
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
                    <span class="tag" v-if="item.tag">&nbsp;{{item.tag}}</span>
                    <span class="tag" v-else>&nbsp;暂无标签</span>
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
                    <span>&nbsp;合作拍摄{{item.coopNum}}次</span>
                  </p>
                  <p @click="toCommentList(item.personId)">
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
                    </svg>
                    <span>
                      &nbsp;总体评分
                      <span v-if="item.avgScore" class="num">{{item.avgScore}}</span>
                      <span v-else class="num">暂无</span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="bottom">
                <template v-if="subordinate!=150||adminShow">
                  <el-col :span="5" :offset="2">
                    <i class="el-icon-map-location" @click="toCameramanPlace(item.city)"></i>
                  </el-col>
                  <el-col :span="5">
                    <i class="el-icon-date" @click="toCameramanSchedule(item.personId)"></i>
                  </el-col>
                  <el-col :span="5">
                    <i class="el-icon-camera" @click="addCameraa"></i>
                  </el-col>
                  <el-col :span="5">
                    <i class="el-icon-delete" @click="deleteCameraBtn(item.personId)"></i>
                  </el-col>
                </template>
                <template v-else>
                  <el-col :span="6" :offset="3">
                    <i class="el-icon-map-location" @click="toCameramanPlace(item.city)"></i>
                  </el-col>
                  <el-col :span="6">
                    <i class="el-icon-date" @click="toCameramanSchedule(item.personId)"></i>
                  </el-col>
                  <el-col :span="6">
                    <i class="el-icon-camera" @click="addCameraa"></i>
                  </el-col>
                </template>
              </div>
            </div>
          </el-col>
        </el-col>
        <noDataList :noDatastyle="noDatastyle" v-if="cameraList.length==0"></noDataList>
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
    <cameraa :cameraShow="cameraShow"></cameraa>
    <!-- 新增场地拍摄 -->

    <!-- 拍摄记录 -->
    <cameraList :cameraListShow="cameraListShow"></cameraList>
    <!-- 拍摄记录 -->

    <!-- 新增评论 -->
    <comment :commentShow="commentShow"></comment>
    <!-- 新增评论 -->

    <!-- 评论记录 -->
    <commentList :commentListShow="commentListShow"></commentList>
    <!-- 评论记录 -->
  </div>
</template>
<script>
import cityList from '@/common/city.js' // 引入城市数据
import cameraa from '@/components/camera' // 新增拍摄
import cameraList from '@/components/cameraList' // 拍摄记录
import comment from '@/components/comment' // 新增评分
import commentList from '@/components/commentList' // 评分记录
import noDataList from '@/components/noDataList' // 无数据页面

export default {
  name: 'cameraman',
  components: {
    cameraa,
    cameraList,
    comment,
    commentList,
    noDataList,
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员
      searchWordData: this.$parent.searchWordData, // 搜索信息
      personId: null, // 摄影师ID
      type: 0,
      pgId: null, // 评论Id
      noDatastyle: 'margin-top: 108px;',
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
      isCar: '',
      // 城市列表
      cityList: cityList, // 城市筛列表
      city: '',
      // 内容列表
      listLoading: false,
      cameraList: [],
      orderType: 1, // 排序类型（1-拍摄排序,2-评分排序）
      orderSort1: 2, // 排序类型（1-正序,2-倒序）
      orderSort2: 2, // 排序类型（1-正序,2-倒序）
      // 拍摄记录
      cameraShow: 0,
      cameraListShow: 0,
      // 评分
      commentShow: 0,
      commentListShow: 0,
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
    this.getlistPhotoPerson()
    
  },
  // 方法
  methods: {
    // tab选项卡
    tab(prm) {
      this.tabact = prm
      let url = ''
      if (prm == 1) {
        url = '/home/resource/cameraman'
      } else if (prm == 2) {
        url = '/home/resource/model'
      } else if (prm == 3) {
        url = '/home/resource/place'
      }
      this.$router.push({ path: url })
    },
    addCamera() {
      this.$router.push({
        path: '/home/resource/addCameraman',
        query: { type: 0 },
      })
    },

    ///////// 摄影师列表排序 start /////////
    orderTypeChange1() {
      this.orderType = 1
      let orderSort1 = 0
      if (this.orderSort1 == 1) {
        orderSort1 = 2
      } else {
        orderSort1 = 1
      }
      this.orderSort1 = orderSort1
      // 获取摄影师列表
      this.getlistPhotoPerson()
      // console.log(this.orderSort1)
    },
    orderTypeChange2() {
      this.orderType = 2
      let orderSort2 = 0
      if (this.orderSort2 == 1) {
        orderSort2 = 2
      } else {
        orderSort2 = 1
      }
      this.orderSort2 = orderSort2
      // 获取摄影师列表
      this.getlistPhotoPerson()
      // console.log(this.orderSort2)
    },
    ///////// 摄影师列表排序 end /////////

    ///////// 筛选摄影师列表 start /////////
    isCarChange() {
      this.getlistPhotoPerson()
    },
    cityChange() {
      this.getlistPhotoPerson()
    },
    ///////// 筛选摄影师列表 end /////////

    ///////// 获取摄影师列表 start /////////
    getlistPhotoPerson() {
      this.listLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        photoPerson: {
          isCar: this.isCar,
          city: this.city,
          name: this.$parent.searchWordData.value
        },
        orderType: this.orderType, // 排序类型（1-拍摄排序,2-评分排序）
      }
      // 排序类型（1-正序,2-倒序）
      if (data.orderType == 1) {
        data.type = this.orderSort1
      } else if (data.orderType == 2) {
        data.type = this.orderSort2
      }
      this.$axios
        .post('/ocarplay/api/photoPerson/listAjax', data)
        .then((res) => {
          // console.log(res)
          this.listLoading = false
          if (res.status == 200) {
            let data = res.data
            data.items.forEach((element) => {
              if (element.image) {
                element.image = '/ocarplay/' + element.image
              } else {
                element.image = 'static/images/carow/hander.png'
              }
            })
            this.cameraList = data.items
            this.total = data.totalRows
          }
        })
    },
    ///////// 获取摄影师列表 end /////////

    ///////// 摄影师详情页 start /////////
    toCameraDetails(id) {
      this.$router.push({
        path: '/home/resource/cameramanDetails',
        query: { id: id },
      })
    },
    ///////// 摄影师详情页 end /////////

    ///////// 打开拍摄记录 start /////////
    toCameraList(id, type) {
      this.personId = id
      this.cameraListShow += 1
    },
    ///////// 打开拍摄记录 start /////////

    ///////// 打开评论记录 start /////////
    toCommentList(id) {
      this.personId = id
      this.commentListShow += 1
    },
    ///////// 打开评论记录 start /////////

    ///////// 新增评论 start /////////
    addComment(id) {
      this.personId = id
      this.type = 0
      this.commentShow += 1
    },
    ///////// 新增评论 end /////////

    ///////// 跳场地页面 start /////////
    toCameramanPlace(city) {
      // console.log(123)
      this.$router.push({
        path: '/home/resource/cameramanPlace',
        query: {
          city: city,
        },
      })
    },
    ///////// 跳场地页面 end /////////

    ///////// 跳日程管理页面 start /////////
    toCameramanSchedule(id) {
      console.log(123)
      this.$router.push({
        path: '/home/resource/cameramanSchedule',
        query: {
          id: id,
        },
      })
    },
    ///////// 跳日程管理页面 end /////////

    ///////// 新增拍摄记录 start /////////
    addCameraa() {
      this.cameraShow += 1
    },
    ///////// 新增拍摄记录 end /////////

    ///////// 删除摄影师 start /////////
    deleteCameraBtn(id) {
      this.$confirm('是否删除该摄影师?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteCamera(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    deleteCamera(id) {
      let data = `?id=${id}`
      this.$axios
        .post('/ocarplay/api/photoPerson/delete' + data)
        .then((res) => {
          console.log(res)
          let data = res.data
          if (res.status == 200 && res.data.errcode == 0) {
            this.$message.success(res.data.msg)
            ///////// 获取摄影师列表 start /////////
            this.getlistPhotoPerson()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    ///////// 删除摄影师 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    // changeSize(pageSize) {
    //   console.log(pageSize)
    // },
    // 页码变换时触发事件
    changePage(pageNum) {
      this.pageNum = pageNum
      this.getlistPhotoPerson()
    },
    ///////// 分页 end /////////
  },
}
</script>
<style lang="scss" scoped>
$icoColor: #6a91e8;
#cameraman {
  height: 100%;
}
</style>
