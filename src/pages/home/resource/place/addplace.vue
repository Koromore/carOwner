<template>
  <div id="addplace">
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
        </el-col>
        <el-col :span="12" class="left">
          <el-col :span="24" class="list">
            <div class="key">场地名称</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="placeName" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">场地类型</div>
            <div class="val">
              <el-select v-model="placeTypeId" placeholder="请选择场地类型" clearable filterable>
                <el-option
                  v-for="item in placeTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">所在区域</div>
            <div class="val">
              <el-cascader
                :options="optionsCity"
                v-model="district_code"
                ref="cascaderAddr"
                filterable
                clearable
                @change="handleChangeCity"
                placeholder="请选择所在区域"
              ></el-cascader>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">详细地址</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="address" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">场地照片</div>
            <div class="val">
              <el-upload
                class="upload-photo"
                action="/ocarplay/file/upload"
                list-type="picture-card"
                :on-success="photoListSuccess"
                :on-preview="photoListPreview"
                :before-remove="photoListbeforeRemove"
                :on-remove="photoListRemove"
                :file-list="fileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>
          </el-col>
        </el-col>
        <el-col :span="12" class="right">
          <el-col :span="24" class="list">
            <div class="key">是否可停车</div>
            <div class="val valList">
              <el-radio-group v-model="isCar">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">是否可拍车</div>
            <div class="val valList">
              <el-radio-group v-model="isPark">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">费用</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="money" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">备注</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="remark" clearable></el-input>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24" class="put">
          <el-button type="primary" @click="savePlace">提交</el-button>
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
  name: 'addplace',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId, // 90

      // 场地新增信息
      type: 0,
      placeId: '', // 场地ID
      placeName: '', // 场地名称
      placeTypeId: '', // 场地类型
      district_code: [], // 城市选择器代码
      district: [], // 城市选择器名称
      address: '', // 详细地址
      isCar: null, // 是否可停车
      isPark: null, // 是否可拍车
      money: '', // 费用
      remark: '', // 备注
      photoList: [], // 场地图片

      // 城市选择器数据
      optionsCity: cities,
      // 场地上传组件
      dialogVisible: false,
      dialogImageUrl: '',

      title: '新增场地',
      putLoading: false,

      placeTypeList: [], // 场地类型列表
      fileList: [], // 场地图片
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
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 接受页面传参 start /////////
    this.getQuery()
    ///////// 获取车型列表 start /////////
    this.getPlaceTypeList()
    ///////// 判断部门 start /////////
    this.isDeptId()
  },
  // 方法事件
  methods: {
    ///////// 接受页面传参 start /////////
    isDeptId() {},
    ///////// 接受页面传参 end /////////

    ///////// 城市选择器 start /////////
    // 通过代码获取选择城市名称
    getCascaderObj(val, opt) {
      return val.map(function (value, index, array) {
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
      return add.map(function (value, index, array) {
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
      // console.log(Addtest)
      // console.log(e)
      // console.log(form)
    },
    // 城市选择器切换
    handleChange(val) {},
    ///////// 城市选择器 start /////////

    ///////// 接受页面传参 start /////////
    getQuery() {
      let type = this.$route.query.type
      let id = this.$route.query.id
      this.type = type
      if (type == 0) {
        this.title = '新增场地'
        this.placeId = ''
      } else if (type == 1) {
        this.title = '编辑场地'
        this.placeId = id
        ///////// 获取场地详情 start /////////
        this.getPlaceDetail(id)
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 获取场地详情 start /////////
    getPlaceDetail(id) {
      let data = {
        placeId: id,
      }
      this.$axios.post('/ocarplay/api/place/preEditPlace', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data
          this.placeId = data.placeId // 场地ID
          this.placeName = data.placeName // 场地名称
          this.placeTypeId = data.placeTypeId // 场地类型
          // this.district_code = data.district_code // 城市选择器代码
          // this.district = [data.province, data.city, data.area] // 城市选择器名称
          if (data.province) {
            this.district = [data.province, data.city, data.area] // 城市选择器名称
          } else {
            this.district = [data.city, data.area] // 城市选择器名称
          }
          this.address = data.address // 详细地址
          this.isCar = data.isCar // 是否可停车
          this.isPark = data.isPark // 是否可拍车
          this.money = data.money // 费用
          this.remark = data.remark // 备注
          this.photoList = data.photoList // 场地图片
          //  通过名称获取城市代码回填
          this.district_code = this.getValue(this.district, this.optionsCity)

          let fileList = []
          data.photoList.forEach((element) => {
            fileList.push({
              name: element.fileName,
              url: '/ocarplay/' + element.localPath,
              suffix: element.suffix,
            })
          })
          this.fileList = fileList
        }
      })
    },
    ///////// 获取场地详情 end /////////

    ///////// 获取场地类型 start /////////
    getPlaceTypeList() {
      // this.listLoading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 30,
      }
      this.$axios.post('ocarplay/api/placeType/listAjaxUnPage').then((res) => {
        // console.log(res)
        // this.listLoading = false
        if (res.status == 200) {
          let data = res.data

          let placeTypeList = []
          data.forEach((element) => {
            let obj = {
              value: element.placeTypeId,
              label: element.placeTypeName,
            }
            placeTypeList.push(obj)
          })
          this.placeTypeList = placeTypeList
          // console.log(carSeriesList)
        }
      })
    },
    ///////// 获取场地类型 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 场地图片上传 start /////////
    // 上传成功回调
    photoListSuccess(res, file, fileList) {
      // console.log(res)
      // console.log(file)
      // console.log(fileList)
      if (res.errcode == 0) {
        let photoList = []
        fileList.forEach((element) => {
          if (element.response) {
            photoList.push({
              doUserId: this.userId,
              fileName: element.response.data.fileName,
              localPath: element.response.data.localPath,
              suffix: element.response.data.suffix,
            })
          } else {
            photoList.push({
              doUserId: this.userId,
              fileName: element.name,
              localPath: element.url.replace('/ocarplay/', ''),
              suffix: element.suffix,
            })
          }
        })
        this.photoList = photoList
        // console.log(this.photoList)
      }
    },
    // 预览事件
    photoListPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除提示
    photoListbeforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 删除成功回调
    photoListRemove(file, fileList) {
      // console.log(fileList)
      let photoList = []
      fileList.forEach((element) => {
        if (element.response) {
          photoList.push({
            doUserId: this.userId,
            fileName: element.response.data.fileName,
            localPath: element.response.data.localPath,
            suffix: element.response.data.suffix,
            type: 0,
          })
        } else {
          photoList.push({
            doUserId: this.userId,
            fileName: element.name,
            localPath: element.url.replace('/ocarplay/', ''),
            suffix: element.suffix,
            type: 0,
          })
        }
      })
      this.photoList = photoList
      // console.log(this.photoList)
    },
    ///////// 场地图片上传 end /////////

    ///////// 新增场地 start /////////
    // （0-进行中，1-结算中，2-完成，3-延期，4-人工延期
    savePlace() {
      let placeId = this.placeId || ''
      let placeName = this.placeName || ''
      let placeTypeId = this.placeTypeId || ''

      let province = ''
      let city = ''
      let area = ''

      let address = this.address || ''
      let isCar = this.isCar
      let isPark = this.isPark
      let money = this.money
      let remark = this.remark || ''
      let photoList = this.photoList
      let createTime = this.$time0(new Date())
      if (placeId) {
        createTime = ''
      } else {
        createTime = this.$time0(new Date())
      }
      // console.log(this.district)
      if (this.district.length == 3) {
        province = this.district[0]
        city = this.district[1]
        area = this.district[2]
      }else if(this.district.length == 2){
        province = ''
        city = this.district[0]
        area = this.district[1]
      }
      photoList.forEach((element) => {
        element.placeId = placeId
        delete element.photoId
        delete element.deleteFlag
      })
      let data = {
        placeId, // 场地ID
        placeName, // 场地名称
        placeTypeId, // 场地类型
        province, // 省
        city, // 市
        area, // 区
        address, // 详细地址
        isCar, // 是否可停车
        isPark, // 是否可拍车
        money, // 费用
        remark, // 备注
        photoList, // 场地图片
        createTime, // 创建时间
        doUserId: this.userId, // 创建人
      }
      // console.log(data)
      // let flagList = [placeName,]
      if (
        placeName == '' ||
        placeTypeId == '' ||
        area == '' ||
        address == '' ||
        isCar === null ||
        isPark === null ||
        money === '' ||
        remark == '' ||
        photoList.length == 0
      ) {
        this.$message.error('请填写完整信息！')
      } else {
        this.putLoading = true
        this.$axios
          .post('/ocarplay/api/place/saveOrUpdate', data)
          .then((res) => {
            console.log(res)
            if (res.status == 200 && res.data.errcode == 0) {
              if (placeId) {
                this.$message.success('场地信息更新成功！')
              } else {
                this.$message.success('场地信息新建成功！')
              }
              setTimeout(() => {
                this.$router.push({
                  name: 'place',
                })
                this.putLoading = false
              }, 1000)
            } else {
              this.$message.error(res.data.msg)
              this.putLoading = false
            }
          })
          .catch((res) => {
            console.log(res)
            this.putLoading = false
          })
      }
    },
    ///////// 新增任务 start /////////
  },
}
</script>
<style lang="scss" scoped>
#addplace {
  height: 100%;
  background: white;
  border-radius: 8px 8px 0 0;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 36px;
    border: 1px solid #e7e7e7;
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 16px 0;
      .key {
        width: 96px;
        height: 40px;
        line-height: 40px;
        margin-right: 13px;
        text-align: justify;
        box-sizing: border-box;
      }
      .key:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
      }
      .val {
        width: 420px;
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
