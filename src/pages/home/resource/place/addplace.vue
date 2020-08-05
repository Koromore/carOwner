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
              <el-radio-group v-model="car">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">是否可拍车</div>
            <div class="val valList">
              <el-radio-group v-model="park">
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
      /////////////////////////////////////
      // 页面类型
      taskId: '',
      type: 0,
      title: '新增场地',
      textarea: '',
      placeTypeList: [],
      // 文件上传
      fileList: [],

      listInviteList: [],
      addplace: [],
      seriesId: [],
      periodTime: [],
      taskNum: '',
      listTaskFile: [],
      remark: '',
      taskFileList: [],
      fileList: [],
      // 按钮开关
      submitFlag: true,
      putLoading: false,
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
        this.title = '新增任务'
        this.taskId = ''
      } else if (type == 1) {
        this.title = '编辑任务'
        this.taskId = id
        ///////// 获取任务详情 start /////////
        this.getTaskDetail(id)
      } else if (type == 2) {
        this.title = '新增任务'
        // this.taskId = id
        ///////// 获取任务详情 start /////////
        this.getTaskDetail(id)
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 获取任务详情 start /////////
    getTaskDetail(id) {
      let data = {
        taskId: id,
      }
      this.$axios.post('/ocarplay/task/edit', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data.data
          this.taskName = data.taskName
          let listInviteList = []
          data.listInvite.forEach((element) => {
            listInviteList.push([
              element.listOwnerType[0].typeId,
              element.listOwnerItem[0].itemId,
              element.ownerId,
            ])
          })

          this.listInviteList = listInviteList
          // this.carSeriesId = [null,null,data.carSeriesId]
          data.listTaskOfCartype.forEach((element) => {
            this.seriesId.push(element.cartypeId)
          })

          this.periodTime = [
            new Date(data.startTime.replace(/-/g, '/')),
            new Date(data.endTime.replace(/-/g, '/')),
          ]
          this.taskNum = data.num
          this.remark = data.remark
          let fileList = []
          let taskFileList = []

          data.listTaskFile.forEach((element) => {
            fileList.push({
              name: element.fileName,
              url: element.localPath,
            })
            taskFileList.push({
              fileName: '端午大礼包',
              localPath: 'uploadtemp//doc/1592452790041.jpg',
              suffix: 'jpg',
            })
          })
          this.fileList = fileList
          this.taskFileList = taskFileList
        }
      })
    },
    ///////// 获取任务详情 end /////////

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
          photoList.push({
            doUserId: this.userId,
            fileName: element.response.data.fileName,
            localPath: element.response.data.localPath,
            suffix: element.response.data.suffix,
          })
        })
        this.photoList = photoList
        console.log(this.photoList)
      }
    },
    // 预览事件
    photoListPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除提示
    photoListbeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 删除成功回调
    photoListRemove(file, fileList) {
      let photoList = []
      fileList.forEach((element) => {
        photoList.push({
          doUserId: this.userId,
          fileName: element.response.data.fileName,
          localPath: element.response.data.localPath,
          suffix: element.response.data.suffix,
        })
      })
      this.photoList = photoList
      console.log(this.photoList)
    },
    ///////// 场地图片上传 end /////////

    ///////// 新增任务 start /////////
    // （0-进行中，1-结算中，2-完成，3-延期，4-人工延期
    savePlace() {
      // let periodTime = this.periodTime
      // let startTime = ''
      // let endTime = ''
      // if (periodTime.length != 0) {
      //   startTime = this.$date0(periodTime[0])
      //   endTime = this.$date0(periodTime[1])
      // }
      // let listInviteList = this.listInviteList
      // let carSeriesId = this.carSeriesId
      // let listTaskOfCartype = []
      // carSeriesId.forEach((element) => {
      //   listTaskOfCartype.push({ cartypeId: element[1] })
      // })
      let placeId = this.placeId || ''
      let placeName = this.placeName || ''
      let placeTypeId = this.placeTypeId || ''
      let province = this.district[0] || ''
      let city = this.district[1] || ''
      let area = this.district[2] || ''
      let address = this.address || ''
      let car = this.car
      let park = this.park
      let money = this.money || ''
      let remark = this.remark || ''
      let photoList = this.photoList
      let createTime = this.$time0(new Date())
      let data = {
        placeId, // 场地ID
        placeName, // 场地名称
        placeTypeId, // 场地类型
        province, // 省
        city, // 市
        area, // 区
        address, // 详细地址
        car, // 是否可停车
        park, // 是否可拍车
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
        province == '' ||
        address == '' ||
        car === null ||
        park === null ||
        money == '' ||
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
              this.$message.error('任务新建失败！')
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
