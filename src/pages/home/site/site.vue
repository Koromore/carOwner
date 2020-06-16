<template>
  <div id="site">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="16" class="left">
        <!-- 所在区域 -->
        <el-select v-model="filtrateCity" filterable clearable placeholder="所在区域" size="small">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 场地类型 -->
        <el-select v-model="filtrateType" filterable clearable placeholder="场地类型" size="small">
          <el-option
            v-for="item in placeTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 场地名称 -->
        <!-- <el-select v-model="filtrateName" clearable placeholder="场地名称" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
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
          :data="placeListData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop="name" label="序号" width="81" align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="placeName" label="场地名称" min-width="240"></el-table-column>
          <el-table-column prop="placeTypeName" label="场地类型" width="240"></el-table-column>
          <el-table-column prop="city" label="所在城市" width="160">
            <template slot-scope="scope">{{scope.row.province+scope.row.city+scope.row.area}}</template>
          </el-table-column>
          <el-table-column prop="address" label="详细地址" min-width="130"></el-table-column>
          <el-table-column prop="img" label="环境图片" width="100">
            <template slot-scope="scope">
              <el-image
                style="width: 24px; height: 24px"
                src="static/images/ico/img2.png"
                :preview-src-list="scope.row.image"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="car" label="对应车主" width="180">
            <template slot-scope="scope">
              <i class="el-icon-user" @click="toSitecarownerlist(scope.row.city)"></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="修改场地" placement="top">
                <i class="el-icon-edit" @click="addSite(1, scope.row.placeId)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除场地" placement="top">
                <i class="el-icon-delete" @click="delSite(scope.row.placeId)"></i>
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
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
    <!-- 添加场地 start -->
    <el-drawer
      :title="drawerAddTitle"
      :visible.sync="drawerAdd"
      size="600px"
      @close="drawerAddClose"
    >
      <el-row class="drawerAdd" v-loading="drawerLoading">
        <el-col :span="4">场地名称:</el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" v-model="placeName" clearable></el-input>
        </el-col>
        <el-col :span="4">场地类型:</el-col>
        <el-col :span="20">
          <el-select v-model="placeTypeId" clearable placeholder="场地类型" size="small">
            <el-option
              v-for="item in placeTypeList"
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
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="address"></el-input>
        </el-col>

        <el-col :span="4" class="key keycontent">场地照片:</el-col>
        <el-col :span="20">
          <el-upload
            action="/ocarplay/file/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="siteImgSuccess"
            :limit="1"
            :on-exceed="siteImgExceed"
            ref="imageUpload"
            :file-list="imagFileList"
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
            <el-button type="info" @click="cancel">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary" @click="addSubmit">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 添加场地 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <!-- <el-drawer title="提交任务" :visible.sync="drawerPuttask" size="720px">
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
    </el-drawer> -->
    <!-- 抽屉弹窗提交任务 end -->
  </div>
</template>
<script>
import cities from '@/common/cities.js' // 引入城市数据
import cityList from '@/common/city.js' // 引入城市数据
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'site',
  components: {},
  data() {
    return {
      // 筛选条件
      filtrateCity: '',
      filtrateType: '',
      filtrateName: '',
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
      placeListData: [],
      // 抽屉弹窗添加场地
      drawerAdd: false,
      drawerAddTitle: '添加场地',
      placeTypeList: [], // 场地类型列表
      // delayReason: '', // 详细地址
      delayTime: '', // 延期预计时间时间
      placeId: '', // 场地ID
      placeName: '', // 场地名称
      placeTypeId: '', // 场地类型ID
      district: '', // 区域名称
      province: '', // 省
      city: '', // 城市
      area: '', // 区域
      address: '', // 详细地址
      siteImgUrl: '', // 场地图片单张
      siteImgUrlFileList: [], // 场地图片多张
      cityList: cityList, // 城市筛列表
      // 城市选择器数据
      optionsCity: cities,
      district_code: '', // 区域代码
      dialogVisible: false,
      // 抽屉loading
      drawerLoading: false,
      // 列表Loading
      listLoading: false,
      // 抽屉弹窗提交任务
      drawerPuttask: false,

      // 场地图片上传
      dialogImageUrl: '',
      dialogVisible: false,
      siteImgDisabled: false,
      imagFileList: [], // 回填场地图片
      // 场地预览
      urlImg:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
      ],

      input: '',
      input1: '',
      value2: '',
      // 分页数据
      total: 0, // 总数据条数
      pageSize: 30 // 每页条数
    }
  },
  // 侦听器
  watch: {
    filtrateCity: function(newData, oldData) {
      console.log(oldData)
      console.log(newData)
      this.getPlaceList()
    },
    filtrateType: function(newData, oldData) {
      this.getPlaceList()
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // console.log(cityList)
    // let list = []
    // cityList.forEach(element => {
    //   list.push(element.name)
    // });
    // let list0 = Array.from(new Set(list))
    // let list1 = []
    // list0.forEach(element => {
    //   list1.push({
    //     value: element,
    //     label:　element
    //   })
    // });
    // console.log(JSON.stringify(list1))
    // 场地列表
    this.getPlaceList()
    // 场地类型列表
    this.getPlaceTypeList()
  },
  // 方法
  methods: {
    ///////// 获取场地列表 start /////////
    getPlaceList() {
      // this.loading = true
      let data = {
        ids: 0, // 账户ID
        pageNum: 1,
        pageSize: this.pageSize,
        // 筛选条件
        place: {
          city: this.filtrateCity,
          placeTypeId: this.filtrateType
        }
      }
      this.$axios.post('/ocarplay/api/place/listAjax', data).then(res => {
        // console.log(res)
        this.loading = false
        if (res.status == 200) {
          let data = res.data
          data.items.forEach((element, i) => {
            data.items[i].image = [
              '/ocarplay/' + element.image
            ]
          })
          this.placeListData = data.items
          this.total = data.totalRows
          // console.log(data.items)
        }
      })
    },
    ///////// 获取场地列表 end /////////

    ///////// 获取场地类型列表 start /////////
    getPlaceTypeList() {
      this.loading = true
      let data = {}
      this.$axios
        .post('/ocarplay/api/placeType/listAjaxUnPage', data)
        .then(res => {
          // console.log(res)
          this.loading = false
          if (res.status == 200) {
            let data = res.data
            let placeTypeList = []
            data.forEach(element => {
              let placeTypeListData = {
                value: element.placeTypeId,
                label: element.placeTypeName
              }
              placeTypeList.push(placeTypeListData)
            })
            this.placeTypeList = placeTypeList
            // console.log(this.placeTypeList)
          }
        })
    },
    ///////// 获取场地类型列表 end /////////

    ///////// 跳转车主列表 start /////////
    toSitecarownerlist(res) {
      // this.$router.push({ path: '/home/sitecarownerlist' })
      this.$router.push({
        name: 'sitecarownerlist',
        params: {
          city: res
        }
      })
    },
    ///////// 跳转车主列表 start /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.getPlaceList()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
    },
    ///////// 分页 end /////////

    ///////// 场地图片上传 start /////////
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      let list = []
      // fileList.forEach(element => {
      //   list.push(element.response.data)
      //   // console.log(element.response)
      // });
      // this.siteImgUrlFileList = list.
      this.siteImgUrl = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传回调
    siteImgSuccess(response, file, fileList) {
      // console.log(response)
      this.siteImgUrl = response.data.localPath
      // let list = []
      // fileList.forEach(element => {
      //   list.push(element.response.data)
      //   // console.log(element.response)
      // });
      // this.siteImgUrlFileList = list
    },
    // 限制上传文件数量
    siteImgExceed(files, fileList) {
      this.messageWarning('只能上传一个！')
    },
    ///////// 场地图片上传 end /////////

    ///////// 点击取消按钮 end /////////
    cancel() {
      this.drawerAdd = false
    },
    ///////// 点击取消按钮 end /////////

    ///////// 关闭弹窗回调 start /////////
    drawerAddClose() {
      this.placeId = ''
      this.placeName = ''
      this.placeTypeId = ''
      this.address = ''
      // console.log(this.getValue(value,optionsCity))
      this.district_code = ''
      this.siteImgUrl = ''
      this.$refs['imageUpload'].clearFiles()
    },
    ///////// 关闭弹窗回调 end /////////

    ///////// 添加场地 start /////////
    addSite(type, id) {
      this.drawerAdd = true
      if (type == 0) {
        this.drawerAddTitle = '添加场地'
      } else if (type == 1) {
        this.drawerAddTitle = '修改场地'
        this.getPreEditPlace(id)
      }
    },
    getPreEditPlace(id) {
      this.drawerLoading = true
      this.placeId = id
      let data = {
        placeId: id
      }
      this.$axios.post('/ocarplay/api/place/preEditPlace', data).then(res => {
        // console.log(res)
        this.drawerLoading = false
        // this.drawerAdd = false
        if (res.status == 200) {
          let data = res.data
          // this.messageWin(res.data.msg)
          // this.getPlaceList()
          this.placeName = data.placeName
          this.placeTypeId = data.placeTypeId
          this.address = data.address
          let value = [data.province, data.city, data.area]
          let optionsCity = this.optionsCity
          // console.log(this.getValue(value,optionsCity))
          this.district_code = this.getValue(value, optionsCity)
          this.siteImgUrl = data.image
          this.imagFileList = [
            {
              name: '场景',
              url: '/ocarplay/'+data.image
            }
          ]
        }
      })
    },
    // 点击提交按钮
    addSubmit() {
      this.drawerLoading = true
      let district = this.district
      let data = {
        placeId: this.placeId, // 场地ID
        placeName: this.placeName, // 场地名称
        placeTypeId: this.placeTypeId, // 场地类型ID
        // province: district[0], // 省
        // city: district[1], // 城市
        // area: district[2] || '', // 区域
        address: this.address, // 详细地址
        image: this.siteImgUrl // 图片地址
      }
      if (district.length == 2) {
        data.province = ''
        data.city = district[0]
        data.area = district[1]
      }else if(district.length == 2){
        data.province = district[0]
        data.city = district[1]
        data.area = district[2]
      }
      this.saveOrUpdate(data)
    },
    // 添加/修改场地请求
    saveOrUpdate(data) {
      this.$axios.post('/ocarplay/api/place/saveOrUpdate', data).then(res => {
        // console.log(res)
        this.drawerLoading = false
        this.drawerAdd = false
        if (res.status == 200 && res.data.errcode == 0) {
          this.messageWin(res.data.msg)
          this.getPlaceList()
        }
      })
    },
    ///////// 添加场地 end /////////

    ///////// 提交任务 start /////////
    putTask() {
      this.drawerPuttask = true
    },
    ///////// 提交任务 end /////////

    ///////// 删除场地 start /////////
    delSite(id) {
      this.$confirm('确认要删除该场地吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(123)
          this.delPlace(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delPlace(id) {
      let data = {
        placeId: id
      }
      this.$axios.post('/ocarplay/api/place/delete', data).then(res => {
        // console.log(res)
        this.drawerLoading = false
        this.drawerAdd = false
        if (res.status == 200 && res.data.errcode == 0) {
          this.messageWin(res.data.msg)
          this.getPlaceList()
        }
      })
    },
    ///////// 删除场地 end /////////

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
    getValue(add, opt) {
      return add.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.label == value) {
            opt = itm.children
            return itm.value
          }
        }
        return null
      })
    },
    handleChangeCity(e, form) {
      // 选择区域
      let add = this.getCascaderObj(e, this.optionsCity)
      let Addtest = []
      for (let i = 0; i < add.length; i++) {
        Addtest.push(add[i].label)
      }
      this.district = Addtest
      console.log(Addtest)
      console.log(e)
      // console.log(form)
    },
    // 城市选择器切换
    handleChange(val) {},
    ///////// 城市选择器 start /////////

    // ///////// 删除场地 start /////////
    // delSite() {
    //   this.$confirm('确认要删除该场地吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // },
    // ///////// 删除场地 end /////////

    ///////// 消息提示 start /////////
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success'
      })
    },
    messageWarning(message) {
      // 警告提示
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    }
    ///////// 消息提示 end /////////
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
