<template>
  <div id="addCamera">
    <!-- 内容列表 start -->
    <el-row class="content" v-loading="loading">
      <el-scrollbar style="height:100%">
        <!-- 标题 start -->
        <el-col :span="24" class="top">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
        </el-col>
        <!-- 标题 end -->

        <!-- 左侧 start -->
        <el-col :span="8" class="left">
          <el-col :span="24" class="title">基础信息</el-col>
          <el-col :span="24" class="content">
            <!-- 上传照片 -->
            <el-col :span="24" class="upladImgBox">
              <el-upload
                class="upladImg"
                action="/ocarplay/file/upload"
                list-type="picture-card"
                :on-preview="handerImgPreview"
                :on-remove="handerImgRemove"
                :on-success="handerImgSuccess"
                :limit="1"
                :file-list="fileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">姓名</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="name"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">年龄</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="age" type="number"></el-input>
                <!-- {{eventData}} -->
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">车主性别</el-col>
              <el-col :span="15" class="val">
                <el-radio v-model="sex" :label="0">男</el-radio>
                <el-radio v-model="sex" :label="1">女</el-radio>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">手机号</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="phone" clearable></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">费用</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="money" clearable type="number"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">擅长</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="goodAt" clearable></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">客户</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="custom" clearable></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">合作车型</el-col>
              <el-col :span="15" class="val">
                <el-select v-model="carTypeId" placeholder="请选择">
                  <el-option
                    v-for="item in carSeriesList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">所在区域</el-col>
              <el-col :span="15" class="val">
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
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">标签</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="tag" clearable></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">会开车</el-col>
              <el-col :span="15" class="val">
                <el-radio-group v-model="isCar">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- 左侧 end -->

        <!-- 右侧 start -->
        <el-col :span="16" class="right">
          <el-col :span="24" class="box">
            <el-col :span="24" class="title">合作信息</el-col>
            <el-col :span="12" class="box1">
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">签约合同</el-col>
                <el-col :span="14" class="val">
                  <el-upload
                    class="upload-demo"
                    action="/ocarplay/file/upload"
                    :on-success="pactSuccess"
                    :on-remove="pactRemove"
                    :on-exceed="pactExceed"
                    :limit="1"
                    :file-list="pactFileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">上传合作文档后选择合作期限</div>
                  </el-upload>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="12" class="box2">
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">合作期限</el-col>
                <el-col :span="14" class="val">
                  <el-date-picker
                    v-model="allottedTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeAllottedTime"
                    :disabled="disabledAllottedTime"
                  ></el-date-picker>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">合作时长</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="timeLimit" clearable :disabled="true"></el-input>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" class="title title3">个人介绍</el-col>
            <el-col :span="24" class="box3">
              <el-col :span="24" class="list">
                <el-col :span="3" class="key">摄影师履历</el-col>
                <el-col :span="19" class="val">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="introduce"
                    clearable
                  ></el-input>
                </el-col>
                <el-col :span="19" :offset="3" class="val">
                  <el-upload
                    class="upload-demo"
                    drag
                    multiple
                    action="/ocarplay/file/upload"
                    :on-success="vitaeSuccess"
                    :on-remove="vitaeRemove"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或
                      <em>点击上传</em>
                      上传履历附件
                    </div>
                  </el-upload>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="3" class="key">个人作品</el-col>
                <el-col :span="19" class="val">
                  <el-upload
                    class="upload-demo"
                    drag
                    multiple
                    action="/ocarplay/file/upload"
                    :on-success="worksSuccess"
                    :on-remove="worksRemove"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或
                      <em>点击上传</em>
                      上传个人作品
                    </div>
                  </el-upload>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- 右侧 end -->
        <!-- 签约合作信息 end -->
        <el-col :span="24" class="put">
          <el-button type="primary" @click="saveCamera">完成</el-button>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import {dateDiff} from '@/utils/dateDiff' // 引入文件格式判断方法
import cities from '@/common/cities.js' // 引入城市数据

export default {
  name: 'addCamera',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 一级部门ID

      loading: false, // 上传loading
      checked: false,
      itemDisabled: false,
      radio: '',
      input1: '',
      value1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible: false,
      options: [],
      value: '',

      periodList: [
        {
          value: 0,
          label: '按月结算',
        },
        {
          value: 1,
          label: '按年结算',
        },
        {
          value: 2,
          label: '按季度结算',
        },
      ],

      // 摄影师基础信息
      personId: null, // 摄影师Id
      handerImg: null, // 头像
      name: null, // 摄影师名字
      age: null, // 年龄
      sex: null, // 摄影师性别
      phone: null, // 手机号
      money: null, // 费用
      goodAt: null, // 擅长
      custom: null, // 客户
      carTypeId: null, // 合作车型
      tag: null, // 标签
      isCar: null, // 会开车
      introduce: null, // 摄影师履历

      // 城市选择器数据
      optionsCity: cities,
      district_code: [], // 区域代码
      district: [], // 区域名称

      // 签约合作信息
      pactFileList: [], // 回填列表
      pactName: null, // 合同文件名称
      pactPath: null, // 合同文件地址
      pactsuffix: null, // 合同文件后缀
      allottedTime: null, // 合作期限
      timeLimit: null, // 合作时长
      disabledAllottedTime: true, // 合作期限禁用

      // 提交按钮开关
      submitFlag: true,
      fileList: [],
      carSeriesList: [],
    }
  },
  // 侦听器
  watch: {
    duration: function (newData, oldData) {
      let eventList = this.eventList
      eventList.forEach((element, i) => {
        this.eventList[i].timeLimit = newData
      })
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // this.test()
    // console.log(this.$isEmail(''))
    ///////// 城市数据处理 start /////////
    this.disCities()
    ///////// 获取车主信息 start /////////
    if (this.$route.query.type == 1) {
      this.addType = 1
      this.getVehicleOwnerDetail()
    }
    ///////// 获取车型列表 start /////////
    this.getCarSeriesLists()

    if (this.$route.query.vehicleOwnerId) {
      this.itemDisabled = true
    }
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

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

    ///////// 获取车主信息 start /////////
    getVehicleOwnerDetail() {
      this.loading = true
      let query = this.$route.query
      let data = {
        typeId: query.typeId,
        vehicleOwnerId: query.vehicleOwnerId,
      }
      // console.log(data)
      this.$axios
        .post('/ocarplay/api/vehicleOwner/preEdit', data)
        .then((res) => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            // console.log(res)
            let data = res.data
            this.vehicleOwnerId = data.vehicleOwnerId
            this.ownerDetil = data
            if (data.image) {
              this.handerImg = data.image
              data.image = '/ocarplay/' + data.image
              this.fileList = [{ name: '', url: data.image }]
            }

            this.tabact = data.typeId
            if (data.typeId == 1) {
              let eventData = []
              data.ownerCoops.forEach((element) => {
                eventData.push(element.itemId)
              })
              eventData = Array.from(new Set(eventData))
              // console.log(eventData)
              this.eventData = eventData
              // console.log(this.eventData)

              let eventList = []
              data.ownerCoops.forEach((element) => {
                eventList.push({
                  coopId: element.coopId, // 合作概况ID
                  coopNum: element.coopNum, // 固定合作总量
                  coopMoney: element.coopMoney, // 固定合作总价
                  itemId: element.itemId, // 车主选择的合作事项ID
                  itemName: element.itemName, // 车主选择的合作事项Name
                  period: element.period, // 结算周期
                  timeLimit: element.timeLimit, // 合作时长
                  typeId: element.typeId,
                })
              })
              this.eventList = eventList
              // console.log(eventList)
            } else if (data.typeId == 2 || data.typeId == 3) {
              let eventData = []
              data.ipGrows.forEach((element) => {
                eventData.push(element.itemId)
              })
              eventData = Array.from(new Set(eventData))
              // console.log(eventData)
              this.eventData = eventData
              // console.log(this.eventData)

              let itemId = data.ipGrows[0].itemId
              let ipGrows = []
              data.ipGrows.forEach((element) => {
                if (element.itemId == itemId) {
                  ipGrows.push({
                    coopId: element.coopId,
                    plat: element.plat,
                    platRole: element.platRole,
                    nickname: element.nickname,
                    url: element.url,
                  })
                }
              })
              // console.log(ipGrows)
              this.hatchList = ipGrows
            }
            if (data.sex) {
              this.sex = '1'
            } else {
              this.sex = '0'
            }
            // console.log(this.sex)
            this.work = data.work
            if (data.birthday) {
              this.birthDate = new Date(data.birthday.replace(/-/g, '/'))
            }

            this.district = [data.province, data.city]
            let district = [data.province, data.city]
            let optionsCity = this.optionsCity
            // console.log(district)
            this.district_code = this.getValue(district, optionsCity)
            this.speciality = data.skillId
            this.ownersName = data.name
            this.livelihood = data.carUse.split(',')
            // console.log(this.livelihood)
            this.source = data.sourceId
            this.carSeriesId = data.ownerCarSeries
            this.mail = data.email

            this.tel = data.phone
            this.wx = data.wx
            this.qq = data.qq
            this.carId = data.bbsId
            this.carHome = data.homeUrl
            this.microblog = data.weiboId
            this.tikTokId = data.dyId
            this.socialId = data.otherId
            this.carNum = data.plateNum
            this.vin = data.vinno
            this.branch = data.buycarplace
            this.address = data.homeAddress
            // this.deliAddress = data.homeAddress
            let relationList = []
            data.relations.forEach((element) => {
              relationList.push({
                relationId: element.relationId,
                name: element.name,
                relation: element.relation,
                birthday: element.birthday,
                work: element.work,
              })
            })
            this.relationList = relationList
            if (data.cooperates.length != 0) {
              if (data.cooperates[0].localPath) {
                this.pactFileList = [
                  {
                    name: data.cooperates[0].fileName,
                    url: data.cooperates[0].localPath,
                  },
                ]
              }
              this.cooperatesId = data.cooperates[0].id
              this.pactName = data.cooperates[0].fileName
              this.pactPath = data.cooperates[0].localPath
              this.pactsuffix = data.cooperates[0].suffix
              this.timeLimit = [
                data.cooperates[0].startTime.replace(/-/g, '/'),
                data.cooperates[0].endTime.replace(/-/g, '/'),
              ]
              this.duration = data.cooperates[0].timeLimit
            }
            if (data.deliveryAddresses.length) {
              this.district0 = [
                data.deliveryAddresses[0].province,
                data.deliveryAddresses[0].city,
                data.deliveryAddresses[0].area,
              ]
              this.deliAddress = data.deliveryAddresses[0].address
            }

            this.district_code0 = this.getValue(
              this.district0,
              this.optionsCity0
            )
            this.bankCard = data.bankCard
            // console.log(this.district_code)
          }
          this.loading = false
        })
    },

    ///////// 获取车型列表 start /////////
    getCarSeriesLists() {
      // this.listLoading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 30,
      }
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', data)
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
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
            this.carSeriesList = carSeriesList
            // console.log(carSeriesList)
          }
        })
    },
    ///////// 获取车型列表 end /////////

    ///////// 头像上传 start //////////
    handerImgRemove(file, fileList) {
      // console.log(file, fileList)
      this.handerImg = ''
    },
    handerImgPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handerImgSuccess(response, file, fileList) {
      this.handerImg = response.data.localPath
    },
    ///////// 头像上传 end //////////

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
    ///////// 城市选择器 start /////////

    ///////// 签约合同上传 start /////////
    pactSuccess(res, file, fileList) {
      // this.fileList = fileList.slice(-3)
      // console.log(res)
      let data = res.data
      this.pactName = data.fileName
      this.pactPath = data.localPath
      this.pactsuffix = data.suffix
      this.disabledAllottedTime = false
    },
    pactExceed() {
      this.$message.warning('合同文档允许上传一个！')
    },
    pactRemove(file, fileList) {
      this.pactName = ''
      this.pactPath = ''
      this.pactsuffix = ''
      this.disabledAllottedTime = true
    },
    ///////// 签约合同上传 end /////////

    ///////// 合作期限变化 start /////////
    changeAllottedTime(data) {
      let timeLimit = (data[1] - data[0]) / 1000 / 60 / 60 / 24
      this.timeLimit = timeLimit
    },
    ///////// 合作期限变化 end /////////

    ///////// 个人履历上传 start /////////
    vitaeSuccess(res, file, fileList) {
      // this.fileList = fileList.slice(-3)
      // console.log(res)
      let data = res.data
      this.pactName = data.fileName
      this.pactPath = data.localPath
      this.pactsuffix = data.suffix
      this.disabledAllottedTime = false
    },
    vitaeRemove(file, fileList) {
      this.pactName = ''
      this.pactPath = ''
      this.pactsuffix = ''
      this.disabledAllottedTime = true
    },
    ///////// 个人履历上传 end /////////

    ///////// 个人作品上传 start /////////
    worksSuccess(res, file, fileList) {
      // this.fileList = fileList.slice(-3)
      // console.log(res)
      let data = res.data
      this.pactName = data.fileName
      this.pactPath = data.localPath
      this.pactsuffix = data.suffix
      this.disabledAllottedTime = false
    },
    worksRemove(file, fileList) {
      this.pactName = ''
      this.pactPath = ''
      this.pactsuffix = ''
      this.disabledAllottedTime = true
    },
    ///////// 个人作品上传 end /////////

    ///////// 提交按钮 start /////////
    saveCamera() {
      this.loading = true
      // 合同日期转换
      let startTime = ''
      let endTime = ''
      if (this.allottedTime.length) {
        startTime = this.$time0(this.allottedTime[0])
        endTime = this.$time0(this.allottedTime[1])
      }
      // 摄影师基础信息
      let district = this.district // 区域名称
      let personId = this.personId // 摄影师Id
      let image = this.handerImg // 头像
      let name = this.name // 摄影师名字
      let age = this.age*1 // 年龄
      let sex = this.sex // 摄影师性别
      let phone = this.phone // 手机号
      let money = this.money*1 // 费用
      let goodAt = this.goodAt // 擅长
      let custom = this.custom // 客户
      let carTypeId = this.carTypeId // 合作车型
      let province = district[0] || null // 省
      let city = district[1] || null // 市
      let tag = this.tag // 标签
      let isCar = this.isCar // 会开车
      let introduce = this.introduce // 摄影师履历
      let photoCooperateList = []

      let data = {
        // 摄影师基础信息
        personId, // 摄影师Id
        image, // 头像
        name, // 摄影师名字
        age, // 年龄
        sex, // 摄影师性别
        phone, // 手机号
        money, // 费用
        goodAt, // 擅长
        custom, // 客户
        carTypeId, // 合作车型
        province, // 省
        city, // 市
        tag, // 标签
        isCar, // 会开车
        introduce, // 摄影师履历
      }
      if (this.pactPath) {
        data.photoCooperateList = [
          {
            doUserId: this.userId,
            endTime: endTime,
            fileName: this.pactName,
            localPath: this.pactPath,
            startTime: startTime,
            suffix: this.pactsuffix,
            timeLimit: this.timeLimit,
          },
        ]
      }
      console.log(data)
      this.$axios
        .post('/ocarplay/api/photoPerson/save', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode == 0) {
            setTimeout(() => {
              this.$router.push({ name: 'camera' })
              this.loading = false
            }, 1000)
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
            this.loading = false
          }
        })
        .catch((res) => {
          this.loading = false
          if (res.status != 200) {
            this.$message.error('网络错误' + res.status)
          }
        })
    },
    ///////// 提交按钮 end /////////
  },
}
</script>
<style lang="scss" scoped>
#addCamera {
  height: 100%;
  // background: white;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 18px 0;
    i {
      cursor: pointer;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 13px 0;
      & >>> .el-checkbox {
        margin-right: 6px;
      }
      & >>> .el-checkbox__label {
        padding-left: 6px;
      }
      .relation {
        align-self: start;
      }
      .relationList {
        margin-bottom: 9px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }
      .key {
        // width: 125px;
        height: 40px;
        line-height: 40px;
        // margin-right: 13px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 9px;
      }
      .key:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
      }
      .val {
        // width: 420px;
        .el-cascader,
        .el-select,
        .el-date-editor,
        .el-input {
          width: 100%;
        }
      }
      .situation {
        width: 100%;
        .list {
          margin: 3px 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }
      }
      .hatch {
        width: 100%;
        .list {
          margin: 3px 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }
      }
      .livelihood {
        height: 40px;
        line-height: 40px;
      }
    }
    .top {
      height: 54px;
      background: white;
      text-align: center;
      margin-bottom: 13px;
      padding: 0 18px;
      border: 1px solid #ddd;
      border-radius: 6px;
      .previousBox {
        height: 54px;
        line-height: 54px;
        font-size: 22px;
        text-align: left;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
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
      .tab {
        height: 54px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        p {
          font-size: 18px;
          font-weight: 600;
          color: #6a91e8;
          margin-right: 16px;
        }
        .butBox1 {
          width: 162px;
          height: 36px;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          border-radius: 3px;
          border: 1px solid rgb(205, 205, 205);
          .but {
            width: 81px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-size: 13px;
            cursor: pointer;
            box-sizing: border-box;
            border-left: 1px solid rgb(205, 205, 205);
          }
          .but:nth-of-type(1) {
            border: none;
          }
          .but.act,
          .but:hover {
            font-weight: bold;
            color: white;
            background: rgb(106, 145, 232);
          }
        }
      }
    }
    $conth: 1100px;
    .left {
      height: $conth;
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 0 36px;
      .title {
        // padding-left: 18px;
        height: 54px;
        line-height: 54px;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px dashed #aaa;
      }
      .content {
        padding-bottom: 0;
        .upladImgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 16px 0;
        }
      }
    }
    .right {
      height: $conth;
      padding-left: 24px;
      .box {
        height: 100%;
        background: white;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 0 36px;
        .title {
          //levelProp
          // padding-left: 18px;
          height: 54px;
          line-height: 54px;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px dashed #aaa;
          margin-bottom: 13px;
        }
        .title3 {
          margin-top: 24px;
        }
        .box1 {
          padding-right: 18px;
        }
        .box2 {
          padding-left: 18px;
        }
        // .box3 {
        //   // padding-left: 18px;
        // }
      }
    }

    $pad: 49px;
    .put {
      margin-top: 24px;
      text-align: center;
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 3px 0;
      button {
        width: 272px;
        font-size: 18px;
      }
    }
  }
}
</style>
<style lang="scss">
.upladImg {
  width: 235px;
  height: 235px;
  overflow: hidden;
  .el-upload--picture-card {
    width: 235px;
    height: 235px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-upload-list__item {
    width: 235px;
    height: 235px;
    margin: 0 auto;
    border-radius: 50%;
  }
}
</style>
