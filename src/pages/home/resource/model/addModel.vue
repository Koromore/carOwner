<template>
  <div id="addModel">
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
            <div class="key">姓名</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="name" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">客户-车型</div>
            <div class="val">
              <el-select v-model="carTypeId" placeholder="请选择">
                <el-option
                  v-for="item in carSeriesIdList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">手机号</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="phone" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">费用</div>
            <div class="val">
              <el-input placeholder="请输入内容" type="number" v-model="money" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">经纪人</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="agent" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">性别</div>
            <div class="val">
              <el-select v-model="sex" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">模卡/资质/简介</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="introduce" clearable></el-input>
              <el-upload
                class="synopsisUpload"
                drag
                action="/ocarplay/file/upload"
                multiple
                ref="synopsis"
                :on-success="synopsisSuccess"
                :on-remove="synopsisRemove"
                :before-remove="synopsisBeforeRemove"
                :file-list="synopsisFileList"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">素颜照</div>
            <div class="val">
              <el-upload
                class="photoUpload"
                drag
                multiple
                list-type="picture-card"
                action="/ocarplay/file/upload"
                ref="photo"
                :on-success="photoSuccess"
                :on-remove="photoRemove"
                :before-remove="photoBeforeRemove"
                :file-list="photoFileList"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">自我介绍</div>
            <div class="val">
              <el-upload
                class="upload-demo"
                drag
                multiple
                action="/ocarplay/file/upload"
                ref="introduce"
                :on-success="introduceSuccess"
                :on-remove="introduceRemove"
                :before-remove="introduceBeforeRemove"
                :file-list="photoFileList"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>
            </div>
          </el-col>
        </el-col>
        <el-col :span="12" class="right">
          <el-col :span="24" class="list">
            <div class="key">身份证</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="identity" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">微信QQ</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="qq" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">是否合作</div>
            <div class="val">
              <el-select v-model="isCoop" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">标签</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="tag" clearable></el-input>
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
        </el-col>
        <el-col :span="24" class="center"></el-col>
        <el-col :span="24" class="put">
          <el-button type="primary" @click="saveBtn">提交</el-button>
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
  name: 'addModel',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId, // 90
      // 页面类型
      type: 0,
      putLoading: false,
      // 城市选择器数据
      optionsCity: cities,
      district_code: [], // 区域代码
      district: [], // 区域名称
      // 信息
      title: '新增模特',
      modelId: null,
      name: null, // 名字
      carTypeId: null, // 客户车型
      phone: null, // 电话
      money: null, // 费用
      agent: null, // 经纪人
      sex: null, // 性别
      identity: null, // 身份证好
      qq: null,
      isCoop: null, // 是否合作
      tag: null, // 标签
      province: null,
      city: null,
      introduce: null, // 模特介绍
      modelIntroList: [], // 模特附件
      synopsisFileList: [], // 简介文件列表
      synopsisAttachmentList: [],
      photoFileList: [], // 照片文件列表
      photoAttachmentList: [],
      introduceFileList: [], // 自我介绍文件列表
      introduceAttachmentList: [],
      options1: [
        {
          value: false,
          label: '男',
        },
        {
          value: true,
          label: '女',
        },
      ],

      // 任务名称
      options2: [
        {
          value: false,
          label: '否',
        },
        {
          value: true,
          label: '是',
        },
      ],
      options3: [],
      // 任务对象选择数据
      input2: '',
      textarea: '',
      props: { multiple: true },
      carSeriesIdList: [],
      // 摄影师  模特  场地
      // 品牌车型
      // 文件上传
      fileList: [],
    }
  },
  // 侦听器
  watch: {
    // carSeriesList: function (newData, oldData) {
    //   if (newData.length != 0) {
    //     this.getCarSeriesId()
    //   }
    // }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 接受页面传参 start /////////
    this.getQuery()
    ///////// 判断部门 start /////////
    this.isDeptId()
    ///////// 获取车系列表 start /////////
    this.getCarSeriesLists()
    ///////// 城市数据处理 start /////////
    this.disCities()
  },
  // 方法事件
  methods: {
    ///////// 接受页面传参 start /////////
    isDeptId() {
      // if (this.deptId == 90) {
      //   this.disabledCaigou = false
      // } else {
      //   this.disabledCaigou = true
      // }
    },
    ///////// 接受页面传参 end /////////

    ///////// 接受页面传参 start /////////
    getQuery() {
      let type = this.$route.query.type
      let id = this.$route.query.id
      this.type = type
      if (type == 0) {
        this.title = '新增模特'
        this.modelId = ''
      } else if (type == 1) {
        this.title = '编辑模特'
        this.modelId = id
        ///////// 获取模特详情 start /////////
        this.getModelDetail(id)
        // /api/model/show
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 城市数据处理 start /////////
    disCities() {
      // console.log(cities)
      let optionsCity = []
      cities.forEach((element) => {
        let data = {
          value: element.value,
          label: element.label,
          children: [],
        }
        element.children.forEach((element0) => {
          data.children.push({
            value: element0.value,
            label: element0.label,
          })
        })
        optionsCity.push(data)
      })
      this.optionsCity = optionsCity
    },
    ///////// 城市数据处理 end /////////

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
    ///////// 城市选择器 end /////////

    ///////// 获取模特详情 start /////////
    getModelDetail(id) {
      this.putLoading = true
      let data = {
        modelId: id,
      }
      this.$axios.post('/ocarplay/api/model/show', data).then((res) => {
        console.log(res)
        if (res.status == 200) {
          let data = res.data
          if (data.errcode != -1) {
            this.modelId = data.modelId
            this.name = data.name // 名字
            this.carTypeId = data.carTypeId * 1 // 客户车型
            this.phone = data.phone // 电话
            this.money = data.money // 费用
            this.agent = data.agent // 经纪人
            this.sex = data.sex // 性别
            this.identity = data.identity // 身份证号
            this.qq = data.qq
            this.isCoop = data.isCoop // 是否合作
            this.tag = data.tag // 标签
            this.province = data.province
            this.city = data.city
            this.district = [data.province, data.city]
            this.introduce = data.introduce // 模特介绍
            let synopsisFileList = []
            let photoFileList = []
            let introduceFileList = []

            this.district_code = this.getValue(this.district, this.optionsCity)

            data.modelIntroList.forEach((element) => {
              let pushData = {
                name: element.fileName,
                url: element.localPath,
                suffix: element.suffix,
                type: element.type,
                modelId: element.modelId,
                introId: element.introId,
              }
              if (element.type == 0) {
                synopsisFileList.push(pushData)
              } else if (element.type == 1) {
                pushData.url = '/ocarplay/' + element.localPath
                photoFileList.push(pushData)
              } else if (element.type == 2) {
                introduceFileList.push(pushData)
              }
            })
            this.modelIntroList = [] // 模特附件
            this.synopsisFileList = synopsisFileList // 简介文件列表
            this.synopsisAttachmentList = []
            this.photoFileList = photoFileList // 照片文件列表
            this.photoAttachmentList = []
            this.introduceFileList = introduceFileList // 自我介绍文件列表
            this.introduceAttachmentList = []
          } else {
            this.$message.error('网络错误！')
          }
          this.putLoading = false
        }
      })
    },
    ///////// 获取任务详情 end /////////

    ///////// 获取车系列表 start /////////
    getCarSeriesLists() {
      let eventList = []
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', {})
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data.carTypes
            let carSeriesList = []
            data.forEach((element, i) => {
              if (element.deptId == 110) {
                element.deptName = '吉利'
              }
              carSeriesList.push({
                value: element.carTypeId,
                label: `${element.deptName}—${element.carTypeName}`,
              })
            })
            this.carSeriesIdList = carSeriesList
          }
        })
    },
    ///////// 获取车系列表 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 文件上传 start /////////
    // 简介上传成功回调
    synopsisSuccess(res, file, fileList) {
      // console.log(res)
      // console.log(file)
      // console.log(fileList)
      let synopsisAttachmentList = []
      fileList.forEach((element) => {
        if (element.response) {
          synopsisAttachmentList.push({
            doUserId: this.userId,
            fileName: element.response.data.fileName,
            localPath: element.response.data.localPath,
            suffix: element.response.data.suffix,
            type: 0,
          })
        } else {
          synopsisAttachmentList.push({
            doUserId: this.userId,
            fileName: element.name,
            localPath: element.url,
            suffix: element.suffix,
            type: 0,
          })
        }
      })
      this.synopsisAttachmentList = synopsisAttachmentList
      // console.log(this.synopsisAttachmentList)
    },
    // 简介删除成功回调
    synopsisBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    synopsisRemove(file, fileList) {
      // console.log(fileList)
      let synopsisAttachmentList = []
      fileList.forEach((element) => {
        if (element.response) {
          synopsisAttachmentList.push({
            doUserId: this.userId,
            fileName: element.response.data.fileName,
            localPath: element.response.data.localPath,
            suffix: element.response.data.suffix,
            type: 0,
          })
        } else {
          synopsisAttachmentList.push({
            doUserId: this.userId,
            fileName: element.name,
            localPath: element.url,
            suffix: element.suffix,
            type: 0,
          })
        }
      })
      this.synopsisAttachmentList = synopsisAttachmentList
      // console.log(this.synopsisAttachmentList)
    },
    // 简介上传END

    // 照片上传成功回调
    photoSuccess(res, file, fileList) {
      // console.log(res)
      // console.log(file)
      // console.log(fileList)
      let photoAttachmentList = []
      fileList.forEach((element) => {
        if (element.response) {
          photoAttachmentList.push({
            doUserId: this.userId,
            fileName: element.response.data.fileName,
            localPath: element.response.data.localPath,
            suffix: element.response.data.suffix,
            type: 1,
          })
        } else {
          photoAttachmentList.push({
            doUserId: this.userId,
            fileName: element.name,
            localPath: element.url.replace('/ocarplay/', ''),
            suffix: element.suffix,
            type: 1,
          })
        }
      })
      this.photoAttachmentList = photoAttachmentList
      // console.log(this.photoAttachmentList)
    },
    // 照片删除成功回调
    photoBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    photoRemove(file, fileList) {
      // console.log(fileList)
      let photoAttachmentList = []
      fileList.forEach((element) => {
        if (element.response) {
          photoAttachmentList.push({
            doUserId: this.userId,
            fileName: element.response.data.fileName,
            localPath: element.response.data.localPath,
            suffix: element.response.data.suffix,
            type: 1,
          })
        } else {
          photoAttachmentList.push({
            doUserId: this.userId,
            fileName: element.name,
            localPath: element.url.replace('/ocarplay/', ''),
            suffix: element.suffix,
            type: 1,
          })
        }
      })
      this.photoAttachmentList = photoAttachmentList
      // console.log(this.photoAttachmentList)
    },
    // 照片上传END

    // 自我介绍上传成功回调
    introduceSuccess(res, file, fileList) {
      // console.log(res)
      // console.log(file)
      // console.log(fileList)
      let introduceAttachmentList = []
      fileList.forEach((element) => {
        if (element.response) {
          introduceAttachmentList.push({
            doUserId: this.userId,
            fileName: element.response.data.fileName,
            localPath: element.response.data.localPath,
            suffix: element.response.data.suffix,
            type: 2,
          })
        } else {
          introduceAttachmentList.push({
            doUserId: this.userId,
            fileName: element.name,
            localPath: element.url,
            suffix: element.suffix,
            type: 2,
          })
        }
      })
      this.introduceAttachmentList = introduceAttachmentList
      // console.log(this.introduceAttachmentList)
    },
    // 自我介绍删除成功回调
    introduceBeforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    introduceRemove(file, fileList) {
      let introduceAttachmentList = []
      fileList.forEach((element) => {
        if (element.response) {
          introduceAttachmentList.push({
            doUserId: this.userId,
            fileName: element.response.data.fileName,
            localPath: element.response.data.localPath,
            suffix: element.response.data.suffix,
            type: 0,
          })
        } else {
          introduceAttachmentList.push({
            doUserId: this.userId,
            fileName: element.name,
            localPath: element.url,
            suffix: element.suffix,
            type: 0,
          })
        }
      })
      this.introduceAttachmentList = introduceAttachmentList
      // console.log(this.introduceAttachmentList)
    },
    // 自我介绍上传END
    ///////// 文件上传 end /////////

    ///////// 新增模特 start //////////api/model/save
    saveBtn() {
      this.$confirm('是否提交模特信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.saveModel()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交',
          })
        })
    },
    saveModel() {
      this.putLoading = true
      let modelId = this.modelId // 模特Id
      let name = this.name // 名字
      let carTypeId = this.carTypeId // 客户车型
      let phone = this.phone // 电话
      let money = this.money // 费用
      let agent = this.agent // 经纪人
      let sex = this.sex // 性别
      let identity = this.identity // 身份证好
      let qq = this.qq
      let isCoop = this.isCoop // 是否合作
      let tag = this.tag // 标签
      let district = this.district
      let province = district[0]
      let city = district[1]
      let introduce = this.introduce // 模特介绍
      let modelIntroList = [] // 模特附件
      let synopsisAttachmentList = this.synopsisAttachmentList
      let photoAttachmentList = this.photoAttachmentList
      let introduceAttachmentList = this.introduceAttachmentList

      // modelIntroList.push.apply(synopsisAttachmentList,photoAttachmentList,introduceAttachmentList);
      modelIntroList = modelIntroList.concat(
        synopsisAttachmentList,
        photoAttachmentList,
        introduceAttachmentList
      )
      // console.log(modelIntroList)
      let data = {
        modelId, // 模特Id
        name, // 名字
        carTypeId, // 客户车型
        phone, // 电话
        money, // 费用
        agent, // 经纪人
        sex, // 性别
        identity, // 身份证好
        qq,
        isCoop, // 是否合作
        tag, // 标签
        province,
        city,
        introduce, // 模特介绍
        modelIntroList, // 模特附件
      }
      // console.log(this.$parent)
      // console.log(data)
      this.$axios
        .post('/ocarplay/api/model/save', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            if (data.errcode == 0) {
              if (modelId) {
                this.$message.success(res.data.msg)
              } else {
                this.$message.success(res.data.msg)
              }
              setTimeout(() => {
                this.$router.push({
                  name: 'model',
                })
                this.putLoading = false
              }, 1000)
            } else {
              this.$message.error(res.data.msg)
              this.putLoading = false
            }
          } else {
            this.$message.error('网络错误！')
            this.putLoading = false
          }
        })
        // .catch((res) => {
        //   this.$message.error('网络错误！')
        //   this.putLoading = false
        // })
    },
    ///////// 新增模特 start /////////
  },
}
</script>
<style lang="scss" scoped>
#addModel {
  height: 100%;
  background: white;
  border-radius: 8px 8px 0 0;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 36px;
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 16px 0;
      .key {
        width: 110px;
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
        .synopsisUpload {
          margin-top: 13px;
        }
        .photoUpload {
          margin-bottom: 13px;
        }
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
      .list {
        justify-content: flex-end;
      }
    }
    .right {
      padding-left: $pad;
      .list {
        justify-content: flex-start;
      }
    }
    .center {
      margin-bottom: 36px;
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
</style>
