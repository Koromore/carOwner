<template>
  <div id="cameraDetails">
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
              <div class="upladImg">
                <img :src="'/ocarplay/'+handerImg" alt />
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">姓名</el-col>
              <el-col :span="15" class="val">{{name}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">年龄</el-col>
              <el-col :span="15" class="val">{{age}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">车主性别</el-col>
              <el-col :span="15" class="val">
                <template v-if="sex">女</template>
                <template v-else>男</template>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">手机号</el-col>
              <el-col :span="15" class="val">{{phone}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">费用</el-col>
              <el-col :span="15" class="val">{{money}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">擅长</el-col>
              <el-col :span="15" class="val">{{goodAt}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">客户</el-col>
              <el-col :span="15" class="val">{{custom}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">合作车型</el-col>
              <el-col :span="15" class="val">{{carTypeName}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">所在区域</el-col>
              <el-col :span="15" class="val">{{district}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">标签</el-col>
              <el-col :span="15" class="val">{{tag}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">是否会开车</el-col>
              <el-col :span="15" class="val">
                <template v-if="isCar">是</template>
                <template v-else>否</template>
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
                  <el-link @click="download(pactFileList)">{{pactName}}</el-link>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="12" class="box2">
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">合作期限</el-col>
                <el-col :span="14" class="val">
                  {{$date0(allottedTime[0])}}——{{$date0(allottedTime[1])}}
                  <!-- <el-date-picker
                    v-model="allottedTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeAllottedTime"
                  ></el-date-picker> -->
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">合作时长</el-col>
                <el-col :span="14" class="val">
                  {{$duration(timeLimit)}}
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" class="title title3">个人介绍</el-col>
            <el-col :span="24" class="box3">
              <el-col :span="24" class="list">
                <el-col :span="3" class="key">摄影师履历</el-col>
                <el-col :span="19" class="val">{{introduce}}</el-col>
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
  name: 'cameraDetails',
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
      carTypeName: null, // 合作车型
      tag: null, // 标签
      isCar: null, // 会开车
      introduce: null, // 摄影师履历

      // 城市选择器数据
      optionsCity: cities,
      district_code: [], // 区域代码
      district: [], // 区域名称

      // 签约合作信息
      pactFileList: null, // 回填列表
      pactName: null, // 合同文件名称
      pactPath: null, // 合同文件地址
      pactsuffix: null, // 合同文件后缀
      allottedTime: null, // 合作期限
      timeLimit: null, // 合作时长

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
    ///////// 获取摄影师信息 start /////////
    this.getPhotoPersonDetail()

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

    ///////// 获取摄影师信息 start /////////
    getPhotoPersonDetail() {
      this.loading = true
      let id = this.$route.query.id
      let data = `?id=${id}`
      // console.log(data)
      this.$axios.post('/ocarplay/api/photoPerson/show' + data).then((res) => {
        // console.log(res)
        // this.loading = false
        if (res.status == 200) {
          let data = res.data
          if (data.errcode != -1) {
            this.personId = data.personId // 摄影师Id
            this.handerImg = data.image // 头像
            this.name = data.name // 摄影师名字
            this.age = data.age // 年龄
            this.sex = data.sex // 摄影师性别
            this.phone = data.phone // 手机号
            this.money = data.money // 费用
            this.goodAt = data.goodAt // 擅长
            this.custom = data.custom // 客户
            this.carTypeName = data.carTypeName // 合作车型
            this.tag = data.tag // 标签
            this.isCar = data.isCar // 会开车
            this.introduce = data.introduce // 摄影师履历

            this.district = data.province + data.city
            let photoCooperate = null
            if (data.photoCooperateList.length!=0) {
              photoCooperate=data.photoCooperateList[0]
              this.pactFileList = data.photoCooperateList[0]
            }
            
            this.pactName=photoCooperate.fileName
            this.pactPath=photoCooperate.localPath
            this.pactsuffix=photoCooperate.suffix
            this.allottedTime=[photoCooperate.startTime,photoCooperate.endTime]
            this.timeLimit=photoCooperate.timeLimit
          }
        }
        this.loading = false
      })
    },
    ///////// 获取摄影师信息 end /////////

    ///////// 签约合同上传 start /////////
    pactSuccess(res, file, fileList) {
      // this.fileList = fileList.slice(-3)
      // console.log(res)
      let data = res.data
      this.pactName = data.fileName
      this.pactPath = data.localPath
      this.pactsuffix = data.suffix
    },
    pactExceed() {
      this.$message.warning('合同文档允许上传一个！')
    },
    pactRemove(file, fileList) {
      this.pactName = ''
      this.pactPath = ''
      this.pactsuffix = ''
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
    },
    vitaeRemove(file, fileList) {
      this.pactName = ''
      this.pactPath = ''
      this.pactsuffix = ''
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
    },
    worksRemove(file, fileList) {
      this.pactName = ''
      this.pactPath = ''
      this.pactsuffix = ''
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
      let age = this.age * 1 // 年龄
      let sex = this.sex // 摄影师性别
      let phone = this.phone // 手机号
      let money = this.money * 1 // 费用
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
        ///////// 下载 start /////////
    download(row) {
      // console.log(row)
      let localPath = row.localPath
      let a = document.createElement('a')
      a.download = `${row.fileName}.${row.suffix}`
      a.setAttribute('href', '/ocarplay/' + localPath)
      a.click()
    },
    ///////// 下载 end /////////
  },
}
</script>
<style lang="scss" scoped>
#cameraDetails {
  height: 100%;
  // background: white;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 18px 0;
    .upladImg {
      width: 235px;
      height: 235px;
      margin: 0 auto;
      overflow: hidden;
      border-radius: 50%;
      img {
        object-fit: cover;
        width: 235px;
        height: 235px;
      }
    }
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
