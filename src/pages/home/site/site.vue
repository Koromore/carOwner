<template>
  <div id="site">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="16" class="left">
        <!-- 所在区域 -->
        <el-select v-model="value" clearable placeholder="所在区域" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 场地类型 -->
        <el-select v-model="value" clearable placeholder="场地类型" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 场地名称 -->
        <el-select v-model="value" clearable placeholder="场地名称" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="8" class="right">
        <div class="add_task" @click="addSite(0)">
          <i class="el-icon-circle-plus-outline"></i>
          <br />添加场地
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop="name" label="序号" width="81" align="center">
            <template slot-scope="scope">0{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="siteName" label="场地名称" min-width="240"></el-table-column>
          <el-table-column prop="type" label="场地类型" width="240"></el-table-column>
          <el-table-column prop="city" label="所在城市" width="160"></el-table-column>
          <el-table-column prop="add" label="详细地址" min-width="130"></el-table-column>
          <el-table-column prop="img" label="环境图片" width="100">
            <template>
              <el-image
                style="width: 24px; height: 24px"
                src="static/images/ico/img2.png"
                :preview-src-list="srcList"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="car" label="对应车主" width="180">
            <template>
              <i class="el-icon-user" @click="toSitecarownerlist"></i>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="100">
            <template>
              <el-tooltip class="item" effect="dark" content="修改场地" placement="top">
                <i class="el-icon-edit" @click="addSite(1)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除场地" placement="top">
                <i class="el-icon-delete" @click="delSite"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <!-- 添加场地 start -->
    <el-drawer :title="drawerAddTitle" :visible.sync="drawerAdd" size="600px">
      <el-row class="drawerAdd">
        <el-col :span="4">场地名称:</el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </el-col>
        <el-col :span="4">场地类型:</el-col>
        <el-col :span="20">
          <el-select v-model="value" clearable placeholder="场地类型" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">所在区域:</el-col>
        <el-col :span="20">
          <el-cascader
            :options="optionsCity"
            v-model="district_code"
            ref="cascaderAddr"
            filterable
            clearable
            @change="handleChangeCity"
            placeholder="请选择所在区域"
          ></el-cascader>
        </el-col>
        <el-col :span="4" class="key keycontent">详细地址:</el-col>
        <el-col :span="20">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="delayReason"></el-input>
        </el-col>

        <el-col :span="4" class="key keycontent">场地照片:</el-col>
        <el-col :span="20">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>

        <!-- 底部按钮 -->
        <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 添加场地 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <el-drawer title="提交任务" :visible.sync="drawerPuttask" size="720px">
      <el-row class="drawerPuttask">
        <el-col :span="4">任务名称:</el-col>
        <el-col :span="20">日常超精拍摄邀约</el-col>
        <el-col :span="4" class="keycontent">结算明细:</el-col>
        <el-col :span="20">
          <el-col :span="20">
            <el-input placeholder="搜索车主" suffix-icon="el-icon-search" v-model="input1"></el-input>
          </el-col>
          <el-col :span="24">
            <el-col :span="6">
              <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
            </el-col>
            <el-col :span="6">
              <el-switch
                style="display: block"
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="油卡"
                inactive-text="现金"
              ></el-switch>
            </el-col>
          </el-col>
          <el-col :span="24"></el-col>
          <el-col :span="24"></el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗提交任务 end -->
  </div>
</template>
<script>
import cities from '@/common/cities.js' // 引入城市数据
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'site',
  components: {},
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
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
      for (let i = 0; i < 30; i++) {
        // const element = array[i];
        this.tableData.push({
          siteName: '张家古楼',
          type: '热门网红场地',
          city: '东北三省',
          add: '东北三省'
        })
      }
    },
    ///////// 循环 end /////////

    ///////// 跳转车主列表 start /////////
    toSitecarownerlist() {
      this.$router.push({ path: '/home/sitecarownerlist' })
    },
    ///////// 跳转车主列表 start /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
    },
    ///////// 分页 end /////////

    ///////// 添加场地 start /////////
    addSite(type) {
      this.drawerAdd = true
      if (type == 0) {
        this.drawerAddTitle = '添加场地'
      } else if (type == 1) {
        this.drawerAddTitle = '修改场地'
      }
    },
    ///////// 添加场地 end /////////

    ///////// 提交任务 start /////////
    putTask() {
      this.drawerPuttask = true
    },
    ///////// 提交任务 end /////////

    ///////// 删除任务 start /////////
    delTask() {
      this.$confirm('确认要删除该任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    ///////// 删除任务 end /////////

    ///////// 城市选择器 start /////////
    // 通过代码获取选择城市名称
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.value == value) {
            opt = itm.children
            return itm
          }
        }
        return null
      })
    },
    // 通过城市名获取代码
    // getValue(add, opt) {
    //   return add.map(function(value, index, array) {
    //     for (var itm of opt) {
    //       if (itm.label == value) {
    //         opt = itm.children
    //         return itm
    //       }
    //     }
    //     return null
    //   })
    // },
    handleChangeCity(e, form) {
      // 选择区域
      let add = this.getCascaderObj(e, this.optionsCity)
      let Addtest = []
      for (let i = 0; i < add.length; i++) {
        Addtest.push(add[i].label)
      }
      this.district = Addtest
      console.log(Addtest)
      // console.log(e)
      // console.log(form)
    },
    // 城市选择器切换
    handleChange(val) {},
    ///////// 城市选择器 start /////////

    ///////// 场地图片上传 start /////////
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    ///////// 场地图片上传 end /////////

    ///////// 删除场地 start /////////
    delSite() {
      this.$confirm('确认要删除该场地吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    ///////// 删除场地 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#site {
  height: 100%;
  .top {
    height: 88px;
    margin-bottom: 9px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .left {
      box-sizing: border-box;
      padding-left: 32px;
      .el-select {
        width: 160px;
      }
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      padding-right: 24px;
      .add_task {
        text-align: center;
        color: $icoColor;
        font-size: 13px;
        cursor: pointer;
        i {
          font-size: 26px;
          font-weight: bold;
        }
      }
    }
  }
  .content {
    height: calc(100% - 97px);
    background: #fff;
    .table_list {
      height: calc(100% - 64px);
      .el-table {
        .el-table__header {
          th {
            background: none;
          }
        }
      }
      i {
        font-size: 24px;
        color: $icoColor;
        cursor: pointer;
        margin-right: 13px;
      }
    }
    .paging {
      height: 64px;
      box-sizing: border-box;
      padding: 16px;
      text-align: center;
    }
  }
  // 抽屉弹窗延期原因样式
  .drawerAdd {
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    .el-col {
      margin-bottom: 24px;
      font-size: 18px;
    }
    .keycontent {
      align-self: flex-start;
    }
    .el-input,
    .el-select,
    .el-cascader {
      width: 100%;
    }
  }
  // 抽屉弹窗提交任务样式
  .drawerPuttask {
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    .el-col {
      margin-bottom: 49px;
      font-size: 20px;
    }
    .keycontent {
      align-self: flex-start;
    }
    .el-input {
      width: 100%;
    }
  }
  .btn {
    position: absolute;
    left: 0;
    bottom: 0;
    margin-bottom: 0 !important;
    .el-col {
      margin-bottom: 0;
      button {
        width: 100%;
      }
    }
  }
}
</style>
