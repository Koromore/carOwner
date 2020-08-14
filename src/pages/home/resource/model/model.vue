<template>
  <div id="model">
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
        <!-- <el-select v-model="value1" clearable placeholder="是否会开车" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
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
        <div class="addModel">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="addModel"
          >添加模特</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content" v-loading="listLoading">
      <el-scrollbar>
        <el-col :span="24" class="table_list">
          <el-col class="itemsBox" :span="6" v-for="(item,index) in modelList" :key="index">
            <div class="items">
              <div class="left">
                <div class="el-imageBox" @click="toModelDetail(item.modelId)">
                  <div class="sex">
                    <template v-if="item.sex">
                      <i class="el-icon-female"></i>
                    </template>
                    <template v-else>
                      <i class="el-icon-male"></i>
                    </template>
                  </div>
                  <div class="el-image">
                    <img :src="'/ocarplay/'+item.localPath" alt srcset />
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
                        d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
                      />
                    </svg>
                    &nbsp;<span class="carType">{{item.carTypeName}}</span>
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
                        d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"
                      />
                    </svg>
                    <span class="tag" v-if="item.tag">&nbsp;{{item.tag}}</span>
                    <span class="tag" v-else>&nbsp;暂无标签</span>
                  </p>
                  <p @click="toCameraList(item.modelId)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-icon"
                      viewBox="64 64 896 896"
                      width="18"
                      height="18"
                      style="fill: rgb(106, 145, 232);"
                    >
                      <path
                        d="M864 260H728l-32.4-90.8a32.07 32.07 0 0 0-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 1 0 192 0 96 96 0 1 0-192 0z"
                      />
                    </svg>
                    &nbsp;合作拍摄{{item.cameraNum}}次
                  </p>
                </div>
              </div>
              <div class="bottom">
                <el-col :span="6" :offset="3">
                  <i class="el-icon-edit-outline" @click="toModel(item.modelId)"></i>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-camera" @click="addCamera(item.placeId)"></i>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-delete" @click="deleteModelBtn(item.modelId)"></i>
                </el-col>
              </div>
            </div>
          </el-col>
        </el-col>
        <noDataList :noDatastyle="noDatastyle" v-if="modelList.length==0"></noDataList>
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
import noDataList from '@/components/noDataList' // 无数据页面

export default {
  name: 'model',
  components: {
    camera,
    cameraList,
    noDataList
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员
      modelId: null,
      type: 1,
      noDatastyle: 'margin-top: 108px;',
      // tab选项卡
      tabact: 2,
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
      // 城市列表
      cityList: cityList, // 城市筛列表
      city: '',
      // 内容列表
      listLoading: false,
      modelList: [],
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
    this.getlistModel()
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

    ///////// 跳转新增模特界面 start /////////
    addModel() {
      this.$router.push({
        path: '/home/resource/addModel',
        query: { type: 0 },
      })
    },
    ///////// 跳转新增模特界面 end /////////

    ///////// 筛选模特列表 start /////////
    cityChange() {
      this.getlistModel()
    },
    ///////// 筛选模特列表 end /////////

    ///////// 获取模特列表 start /////////
    getlistModel() {
      this.listLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        model: {
          city: this.city,
        },
        // typeId: '',
      }
      this.$axios.post('/ocarplay/api/model/listAjax', data).then((res) => {
        // console.log(res)
        this.listLoading = false
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
          this.total = data.totalRows
        }
      })
    },
    ///////// 获取模特列表 end /////////

    ///////// 跳转模特详情 start /////////
    toModelDetail(id) {
      this.$router.push({
        path: '/home/resource/modelDetail',
        query: { id: id },
      })
    },
    ///////// 跳转模特详情 end /////////

    ///////// 跳转模特编辑 start /////////
    toModel(id) {
      this.$router.push({
        path: '/home/resource/addmodel',
        query: { id: id, type: 1 },
      })
    },
    ///////// 跳转模特编辑 end /////////

    ///////// 打开拍摄记录 start /////////
    toCameraList(id, type) {
      this.modelId = id
      this.cameraListShow += 1
    },
    ///////// 打开拍摄记录 start /////////

    ///////// 新增拍摄 start /////////
    addCamera() {
      this.cameraShow += 1
    },
    ///////// 新增拍摄 end /////////

    ///////// 删除模特 start /////////
    deleteModelBtn(id) {
      this.$confirm('是否删除该模特?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteModel(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    deleteModel(id) {
      let data = { modelId: id }
      this.$axios.post('/ocarplay/api/model/delete', data).then((res) => {
        console.log(res)
        let data = res.data
        // this.listLoading = false
        // // this.drawerAdd = false
        if (res.status == 200 && res.data.errcode == 0) {
          this.$message.success(res.data.msg)
          // 获取模特列表
          this.getlistModel()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    ///////// 删除模特 end /////////

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
  },
}
</script>
<style lang="scss" scoped>
$icoColor: #6a91e8;
#model {
  height: 100%;
}
</style>
