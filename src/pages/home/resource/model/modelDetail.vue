<template>
  <div id="modelDetail">
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
          <el-col :span="12">模特详情</el-col>
        </el-col>
        <!-- <el-col :span="12" class="left"> -->
          <el-col :span="12" class="list">
            <div class="key">姓名</div>
            <div class="colon">:</div>
            <div class="val">{{name}}</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">身份证</div>
            <div class="colon">:</div>
            <div class="val" v-if="identity">{{identity}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">年龄</div>
            <div class="colon">:</div>
            <div class="val" v-if="age">{{age}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">微信QQ</div>
            <div class="colon">:</div>
            <div class="val" v-if="qq">{{qq}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">客户-车型</div>
            <div class="colon">:</div>
            <div class="val" v-if="carTypeId">{{carTypeName}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">是否合作</div>
            <div class="colon">:</div>
            <div class="val">
              <span v-if="isCoop">是</span>
              <span v-else>否</span>
            </div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">手机号</div>
            <div class="colon">:</div>
            <div class="val" v-if="phone">{{phone}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">标签</div>
            <div class="colon">:</div>
            <div class="val" v-if="tag">{{tag}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">费用</div>
            <div class="colon">:</div>
            <div class="val">{{money}}</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">所在区域</div>
            <div class="colon">:</div>
            <div class="val">{{district}}</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">经纪人</div>
            <div class="colon">:</div>
            <!-- <div class="val" v-if="agent">{{agent}}</div> -->
            <div class="val" v-if="agentName">{{agentName}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">身高</div>
            <div class="colon">:</div>
            <div class="val" v-if="height">{{height}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">性别</div>
            <div class="colon">:</div>
            <div class="val">
              <span v-if="sex">女</span>
              <span v-else>男</span>
            </div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">体重</div>
            <div class="colon">:</div>
            <div class="val" v-if="weight">{{weight}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">特长</div>
            <div class="colon">:</div>
            <div class="val" v-if="speciality">{{speciality}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="12" class="list">
            <div class="key">三围</div>
            <div class="colon">:</div>
            <div class="val" v-if="bwh">{{bwh}}</div>
            <div class="val" v-else>暂无数据</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">模卡/资质/简介</div>
            <div class="colon">:</div>
            <div class="val">
                <img
                  :src="item.url"
                  alt
                  srcset
                  v-for="(item,index) in synopsisFileList"
                  :key="index"
                  @click="previewImg(item.url)"
                  style="width:auto;height:169px;margin-top: 9px;"
                />
            </div>
            <!-- {{synopsisFileList}} -->
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">素颜照</div>
            <div class="colon">:</div>
            <div class="val">
              <!-- {{photoFileList}} -->
              <!-- <el-image style="width: 169px; height: 169px" :src="item.url" fit="cover" lazy v-for="(item,index) in photoFileList" :key="index" :preview-src-list="[item.url]"></el-image> -->
              <img
                v-for="(item,index) in photoFileList"
                :key="index"
                :src="item.url"
                alt
                srcset
                @click="previewImg(item.url)"
              />
              <el-dialog :visible.sync="dialogVisibleImg" width="49%">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">自我介绍</div>
            <!-- <div class="val">{{introduceFileList}}</div> -->
            <div class="colon">:</div>
            <div class="val">
              <!-- {{introduceFileList}} -->
              <img
                style="width:200px;
                height:150px"
                v-for="(item,index) in introduceFileList"
                :key="index"
                :src="[item.suffix == 'mp4' ? 'static/images/carow/video.png' : '/ocarplay/'+item.localPath]"
                alt
                srcset
                @click="previewVideo(item.localPath, item.suffix)"
              />
              <el-dialog
                title="视频"
                :visible.sync="dialogVisibleVideo"
                width="50%"
                @close="dialogVideo"
              >
                <div v-html="dialogVidoeUrl"></div>
                <!-- <video id="v2" x-webkit-airplay="true" webkit-playsinline="true" playsinline="tvc&quot;true&quot;"
                    type="video/mp4" preload="" :src="dialogVidoeUrl" x5-video-player-type="h5"
                x5-video-player-fullscreen="true" controls="controls"></video>-->
              </el-dialog>
            </div>
          </el-col>
        <!-- </el-col> -->
        <!-- <el-col :span="12" class="right"> -->
          
          
          
          
          
          
          
          
        <!-- </el-col> -->
        <el-col :span="24" class="center"></el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import cities from '@/common/cities.js' // 引入城市数据

export default {
  name: 'modelDetail',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId, // 90
      // 页面类型
      type: 0,
      putLoading: false,
      // 城市选择器数据
      district_code: [], // 区域代码
      district: [], // 区域名称
      // 信息
      title: '新增模特',
      modelId: null,
      name: null, // 名字
      age: null, // 年龄
      carTypeId: null, // 客户车型
      phone: null, // 电话
      money: null, // 费用
      // agent: null, // 经纪人
      agentName: null, // 经纪人
      sex: null, // 性别
      identity: null, // 身份证好
      qq: null,
      isCoop: null, // 是否合作
      tag: null, // 标签
      province: null,
      city: null,
      height: null, // 身高
      weight: null, // 体重
      bwh: null, // 三围
      speciality: null, // 特长
      introduce: null, // 模特介绍
      modelIntroList: [], // 模特附件
      synopsisFileList: [], // 简介文件列表
      synopsisAttachmentList: [],
      photoFileList: [], // 照片文件列表
      photoAttachmentList: [],
      introduceFileList: [], // 自我介绍文件列表
      introduceAttachmentList: [],
      carSeriesIdList: [],
      dialogVisibleImg: false,
      dialogImageUrl: '',
      dialogVisibleVideo: false,
      dialogVidoeUrl: '',
      // 摄影师  模特  场地
      // 品牌车型
      // 文件上传
      // fileList: [],
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
    ///////// 获取车系列表 start /////////
    this.getCarSeriesLists()
    ///////// 城市数据处理 start /////////
    this.getModelDetail(this.$route.query.id)
  },
  // 方法事件
  methods: {
    ///////// 获取模特详情 start /////////
    getModelDetail(id) {
      this.putLoading = true
      let data = {
        modelId: id,
      }
      this.$axios.post('/ocarplay/api/model/show', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data
          if (data.errcode != -1) {
            this.modelId = data.modelId
            this.name = data.name // 名字
            this.age = data.age // 年龄
            this.carTypeId = data.carTypeId * 1 // 客户车型
            this.carTypeName = data.carTypeName // 客户车型
            this.phone = data.phone // 电话
            this.money = data.money // 费用
            this.agent = data.agent // 经纪人
            this.agentName = data.agentName // 经纪人
            this.sex = data.sex // 性别
            this.identity = data.identity // 身份证号
            this.qq = data.qq
            this.isCoop = data.isCoop // 是否合作
            this.tag = data.tag // 标签
            this.province = data.province
            this.city = data.city
            this.district = data.province + data.city
            this.height = data.height // 身高
            this.weight = data.weight // 体重
            this.bwh = data.bwh // 三围
            this.speciality = data.speciality // 特长
            this.introduce = data.introduce // 模特介绍
            let synopsisFileList = []
            let photoFileList = []
            let introduceFileList = []

            data.modelIntroList.forEach((element) => {
              let pushData = {
                fileName: element.fileName,
                localPath: element.localPath,
                suffix: element.suffix,
                type: element.type,
                modelId: element.modelId,
                introId: element.introId,
              }
              if (element.type == 0) {
                pushData.url = '/ocarplay/' + element.localPath
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

    ///////// 预览素颜照 start /////////
    previewImg(img) {
      this.dialogImageUrl = img
      this.dialogVisibleImg = true
    },
    ///////// 预览素颜照 end /////////

    ///////// 预览自我介绍 start /////////
    previewVideo(url, suffix) {
      let dialogVidoeUrl = ''
      if (this.$matchType(suffix) == 'video') {
        this.dialogVidoeUrl = `
        <video style="width:100%;height:100%" controls autoplay="true">
          <source src="/ocarplay/${url}" type="video/mp4" />
          <embed style="width:100%;height:100%" src="/ocarplay/${url}" autoplay="true" hidden="no" />
        </video>
        `
      }else if (this.$matchType(suffix) == 'image') {
        this.dialogVidoeUrl = `
        <img src="/ocarplay/${url}" width="100%">
        `
      }
      // this.dialogVidoeUrl = `
      // <video style="width:100%;height:100%" controls autoplay="true">
      //   <source src="/ocarplay/${url}" type="video/mp4" />
      //   <embed style="width:100%;height:100%" src="/ocarplay/${url}" autoplay="true" hidden="no" />
      // </video>
      // `
      this.dialogVisibleVideo = true
    },
    ///////// 预览自我介绍 end /////////

    ///////// 视频弹窗关闭回调 end /////////
    dialogVideo() {
      this.dialogVidoeUrl = ''
    },
    ///////// 视频弹窗关闭回调 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

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
#modelDetail {
  height: 100%;
  background: white;
  border-radius: 8px 8px 0 0;
  border: 1px solid #e7e7e7;
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
      padding-left: 49px;
      .key {
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: justify;
        box-sizing: border-box;
      }
      .key:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
      }
      .colon {
        // height: 40px;
        margin-right: 9px;
        line-height: 40px;
      }
      .val {
        width: calc(100% - 124px);
        // height: 40px;
        line-height: 40px;
        .icon {
          height: 40px;
          display: flex;
          align-items: center;
        }
        > img {
          width: 169px;
          height: 169px;
          object-fit: cover;
          margin-right: 3px;
          cursor: pointer;
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
      margin-bottom: 9px;
      height: 45px;
      line-height: 45px;
      > div {
        height: 45px;
        line-height: 45px;
      }
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
    // .put {
    //   background: white;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   text-align: center;
    //   button {
    //     width: 136px;
    //   }
    // }
  }
}
</style>
<style lang="scss">
</style>
