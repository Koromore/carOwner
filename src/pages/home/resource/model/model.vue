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
        </el-select> -->
        <!-- 城市 -->
        <!-- <el-select v-model="value2" filterable clearable placeholder="城市" size="small">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select> -->
        <div class="add_task">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addModel">添加模特</el-button>
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
                <div class="el-imageBox">
                  <div class="sex">
                    <i class="el-icon-female"></i>
                  </div>
                  <div class="el-image">
                    <img :src="item.image" alt="" srcset="">
                    <div class="zhezhao">
                      解雨臣
                    </div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div>
                  <p><svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="18" height="18" style="fill: rgb(106, 145, 232);"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path></svg>&nbsp;湖北省武汉市</p>
                  <p><svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="18" height="18" style="fill: rgb(106, 145, 232);"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"></path></svg>&nbsp;不会开车</p>
                  <p><svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="17" height="17" style="fill: rgb(106, 145, 232);"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path></svg>&nbsp;可爱萝莉</p>
                  <p><svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="64 64 896 896" width="15" height="15" style="fill: rgb(106, 145, 232);"><path d="M864 260H728l-32.4-90.8a32.07 32.07 0 0 0-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 1 0 192 0 96 96 0 1 0-192 0z"></path></svg>&nbsp;合作拍摄5次</p>
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
    <!-- 内容列表 end -->
  </div>
</template>
<script>
import cityList from '@/common/city.js' // 引入城市数据

export default {
  name: 'model',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 超级管理员
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
        }
      ],
      value1: '',
      // 城市列表
      cityList: cityList, // 城市筛列表
      value2: '',
      // 内容列表
      listLoading: false,
      modelList: [],
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
    this.getlistOwnerByCity()
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

    ///////// 跳转新增模特界面 start /////////
    addModel(){
      this.$router.push({ path: '/home/resource/addModel' })
    },
    ///////// 跳转新增模特界面 end /////////

    ///////// 获取车主列表 start /////////
    getlistOwnerByCity() {
      this.listLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // place: {
        //   city: '武汉',
        // },
        // typeId: '',
      }
      this.$axios
        .post('/ocarplay/api/model/listAjax', data)
        .then((res) => {
          // console.log(res)
          this.listLoading = false
          // this.drawerAdd = false
          if (res.status == 200) {
            let data = res.data
            // data.items.forEach((element) => {
            //   if (element.image) {
            //     element.image = '/ocarplay/' + element.image
            //   } else {
            //     element.image = 'static/images/carow/handerimg.png'
            //   }
            // })
            this.modelList = data.items
            // console.log(this.modelList)
            this.total = data.totalRows
          }
        })
    },
    ///////// 获取车主列表 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    // changeSize(pageSize) {
    //   console.log(pageSize)
    // },
    // 页码变换时触发事件
    changePage(pageNum) {
      this.pageNum = pageNum
      this.getlistOwnerByCity()
    }
    ///////// 分页 end /////////
  },
}
</script>
<style lang="scss" scoped>
$icoColor: #6a91e8;
#model {
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
      .add_task {
        button {
          width: 136px;
          background: $icoColor;
        }
      }
    }
  }
}
</style>
