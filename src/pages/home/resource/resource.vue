<template>
  <div id="resource">
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
        <el-select v-model="value1" clearable placeholder="是否会开车" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 城市 -->
        <el-select v-model="value2" filterable clearable placeholder="城市" size="small">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="add_task">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small">添加摄影师</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content" v-loading="listLoading">
      <el-col :span="24" class="table_list">
        <el-col class="items" :span="7" v-for="(item,index) in ownerList" :key="index">
          <div class="left">
            <el-image :src="item.image" fit="cover"></el-image>
          </div>
          <div class="right">
            <div>
              <p><i class="el-icon-location"></i>&nbsp;湖北省武汉市</p>
              <p><i class="el-icon-location"></i>&nbsp;不会开车</p>
              <p><i class="el-icon-location"></i>&nbsp;可爱萝莉</p>
              <p><i class="el-icon-location"></i>&nbsp;合作拍摄5次</p>
              <p><i class="el-icon-location"></i>&nbsp;总体评分<span>97分</span></p>
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
              <i class="el-icon-camera"></i>
            </el-col>
            <el-col :span="4">
              <i class="el-icon-delete"></i>
            </el-col>
          </div>
        </el-col>
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
import cityList from '@/common/city.js' // 引入城市数据

export default {
  name: 'resource',
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
        }
      ],
      value1: '',
      // 城市列表
      cityList: cityList, // 城市筛列表
      value2: '',
      // 内容列表
      listLoading: false,
      ownerList: [],
      // 分页
      total: 0,
      pageNum: 1,
      pageSize: 9,
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
    },
    ///////// 获取车主列表 start /////////
    getlistOwnerByCity() {
      this.listLoading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        place: {
          city: '武汉',
        },
        typeId: '',
      }
      this.$axios
        .post('/ocarplay/api/place/listOwnerByCity', data)
        .then((res) => {
          // console.log(res)
          this.listLoading = false
          // this.drawerAdd = false
          if (res.status == 200) {
            let data = res.data
            data.items.forEach((element) => {
              if (element.image) {
                element.image = '/ocarplay/' + element.image
              } else {
                element.image = 'static/images/carow/handerimg.png'
              }
            })
            this.ownerList = data.items
            // console.log(this.ownerList)
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
#resource {
  height: 100%;
  .top {
    height: 45px;
    margin-bottom: 9px;
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
  .content {
    height: calc(100% - 104px);
    // background: #fff;
    .table_list {
      height: 97%;
      // padding: 0 36px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;
      .items {
        // width: 400px;
        height: 31%;
        min-height: 160px;
        margin-bottom: 1%;
        margin-left: 6.25%;
        box-sizing: border-box;
        // padding: 9px;
        overflow: hidden;
        padding-top: 13px;
        border: 1px solid rgb(187, 187, 187);
        border-radius: 9px;
        background: white;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-between;
        align-items: flex-start;
        &:nth-of-type(3n+1){
          margin-left: 0;
        }
        .left {
          width: 49%;
          height: 72%;
          .el-image {
            margin: 0 auto;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            padding: 6px;
            background: #E9E9E9;
            & >>> img{
              border-radius: 50%;
            }
          }
        }
        .right {
          width: 49%;
          height: 72%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          > div{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          }
          p {
            width: 100%;
            font-size: 14px;
            i{
              color: $icoColor;
            }
            span{
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
          i{
            font-size: 24px;
            color: white;
            line-height: 32px;
            cursor: pointer;
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
