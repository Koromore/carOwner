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
        <el-select v-model="memuValue" clearable placeholder="项目组" size="small">
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
    <el-row class="content">
      <el-col :span="24" class="table_list">
        <div class="items" v-for="{item,index} in tableData" :key="index">
          <div class="left">
            <el-image src="static/images/carow/list1.png" fit="cover"></el-image>
          </div>
          <div class="right">
            <p>车主姓名：解雨臣</p>
            <p>车主类型：资源型</p>
            <p>车主来源：一点</p>
          </div>
          <div class="bottom">XC60 2017款 T5 AWD 个性运动升级版</div>
        </div>
      </el-col>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next ,sizes"
          :total="100"
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
          value: 0,
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
      memuValue: 0,
      // 表格数据
      tableData: [
        {
          siteName: '张家古楼',
          type: '热门网红场地',
          city: '东北三省',
          add: '东北三省'
        }
      ],
      // 抽屉弹窗添加场地
      drawerAdd: false,
      drawerAddTitle: '添加场地',
      delayReason: '', // 详细地址
      delayTime: '', // 延期预计时间时间
      // 城市选择器数据
      optionsCity: cities,
      district_code: '', // 区域代码
      district: '', // 区域名称
      dialogVisible: false,

      // 抽屉弹窗提交任务
      drawerPuttask: false,

      // 场地图片上传
      dialogImageUrl: '',
      dialogVisible: false,
      // 场地预览
      urlImg:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],

      input: '',
      input1: '',
      value2: ''
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    this.foreach()
  },
  // 方法
  methods: {
    ///////// 循环 start /////////
    foreach() {
      for (let i = 1; i < 12; i++) {
        // const element = array[i];
        this.tableData.push({
          siteName: '张家古楼',
          type: '热门网红场地',
          city: '东北三省',
          add: '东北三省'
        })
      }
      console.log(this.tableData)
    },
    ///////// 循环 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.push({
        path: '/home/site'
      })
    },
    ///////// 返回上一页 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
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
      align-items: center;
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
