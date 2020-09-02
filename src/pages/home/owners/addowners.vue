<template>
  <div id="addOwners">
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
          <!-- <el-col :span="12"> -->
          <!-- 类型选择 -->
          <el-col :span="6" :offset="12" class="tab">
            <div class="butBox1">
              <div :class="[tabact==1?'but act':'but']" @click="tab(1)">支持型</div>
              <div :class="[tabact==3?'but act':'but']" @click="tab(3)">资源型</div>
              <div :class="[tabact==4?'but act':'but']" @click="tab(4)">非车主</div>
            </div>
          </el-col>
          <!-- </el-col> -->
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
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="headImgSuccess"
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
              <el-col :span="6" class="key imp">车主姓名</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="ownersName"></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">合作事项</el-col>
              <el-col :span="15" class="val">
                <el-select
                  v-model="eventData"
                  multiple
                  clearable
                  :disabled="itemDisabled"
                  placeholder="请选择"
                  @change="changeEvent"
                >
                  <el-option
                    v-for="item in eventDataList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- {{eventData}} -->
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" :class="[tabact!=4 ? 'key imp' : 'key']">车主性别</el-col>
              <el-col :span="15" class="val">
                <el-radio v-model="sex" label="0">男</el-radio>
                <el-radio v-model="sex" label="1">女</el-radio>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">车主职业</el-col>
              <el-col :span="15" class="val">
                <el-input placeholder="请输入内容" v-model="work" clearable></el-input>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">出生日期</el-col>
              <el-col :span="15" class="val">
                <el-date-picker v-model="birthDate" type="date" placeholder="选择日期"></el-date-picker>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" :class="[tabact!=4 ? 'key imp' : 'key']">车主来源</el-col>
              <el-col :span="15" class="val">
                <el-select v-model="source" clearable placeholder="请选择">
                  <el-option
                    v-for="item in sourceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">特长</el-col>
              <el-col :span="15" class="val">
                <!-- <el-cascader :options="ownerSkilList" v-model="speciality" clearable></el-cascader> -->
                <el-select v-model="speciality" clearable placeholder="请选择">
                  <el-option
                    v-for="item in ownerSkilList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" :class="[tabact!=4 ? 'key imp' : 'key']">用车生活</el-col>
              <el-col :span="15" class="val">
                <el-col :span="18">
                  <el-checkbox-group v-model="livelihood" class="livelihood">
                    <el-checkbox label="通勤"></el-checkbox>
                    <el-checkbox label="自驾游"></el-checkbox>
                    <el-checkbox label="越野"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col :span="6">
                  <el-input placeholder="请输入" v-model="livelihood0"></el-input>
                </el-col>
              </el-col>
            </el-col>

            <el-col :span="24" class="list">
              <el-col :span="6" class="key imp">认证车型</el-col>
              <el-col :span="15" class="val">
                <el-cascader
                  v-model="carSeries"
                  clearable
                  :options="carSeriesList"
                  :props="{multiple: true}"
                  filterable
                ></el-cascader>
                <!-- {{carSeries}} -->
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" :class="[tabact!=4 ? 'key imp' : 'key']">所在区域</el-col>
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
          </el-col>
        </el-col>
        <!-- 左侧 end -->

        <!-- 右侧 start -->
        <el-col :span="16" class="right">
          <el-col :span="24" class="box">
            <el-col :span="24" class="title">合作信息</el-col>
            <el-col :span="12" class="box1">
              <el-col :span="24" class="list">
                <el-col :span="7" :class="[tabact==3 ? 'key imp' : 'key']">签约合同</el-col>
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
                  </el-upload>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key imp">合作期限</el-col>
                <el-col :span="14" class="val">
                  <el-date-picker
                    v-model="timeLimit"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="changeTimeLimit"
                  ></el-date-picker>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key imp">合作时长</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="duration" clearable :disabled="true"></el-input>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="12" class="box2">
              <el-col :span="24" class="list" v-if="tabact == 1||tabact == 4">
                <el-col :span="8" class="key">合作概况</el-col>
                <el-col :span="24" class="val situation">
                  <el-col :span="24" class="list" v-for="(item, index) in eventList" :key="index">
                    <el-col :span="5">
                      <el-input
                        placeholder="请输入"
                        v-model="item.itemName"
                        clearable
                        :disabled="true"
                      ></el-input>
                      <!-- <el-select
                      v-model="item.name"
                      multiple
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="items in eventDataList"
                        :key="items.value"
                        :label="items.label"
                        :value="items.value"
                      ></el-option>
                      </el-select>-->
                    </el-col>
                    <el-col :span="6">
                      <el-input placeholder="合作总量" v-model="item.coopNum" clearable></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-input placeholder="合作总价" v-model="item.coopMoney" clearable></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-select v-model="item.period" clearable placeholder="结算周期">
                        <el-option
                          v-for="item in periodList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" class="list" v-else>
                <el-col :span="7" class="key">IP孵化打造</el-col>
                <el-col :span="24" class="val hatch">
                  <el-col :span="24" class="list" v-for="(item, index) in hatchList" :key="index">
                    <el-col :span="5">
                      <el-input placeholder="平台" v-model="item.plat" clearable></el-input>
                    </el-col>
                    <el-col :span="5">
                      <el-input placeholder="人设" v-model="item.platRole" clearable></el-input>
                    </el-col>
                    <el-col :span="5">
                      <el-input placeholder="昵称" v-model="item.nickname" clearable></el-input>
                    </el-col>
                    <el-col :span="5">
                      <el-input placeholder="链接" v-model="item.url" clearable></el-input>
                    </el-col>
                    <el-col :span="3">
                      <el-col :span="24" v-if="index == hatchList.length-1">
                        <i class="el-icon-delete" @click="delHatchList"></i>
                        <i class="el-icon-circle-plus-outline" @click="addHatchList"></i>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" class="title title3">详细信息</el-col>
            <el-col :span="12" class="box1">
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">手机号</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="tel" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">微信号</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="wx" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">QQ号</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="qq" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">汽车之家ID</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="carId" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">汽车之家主页</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="carHome" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">微博ID</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="microblog" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">抖音ID</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="tikTokId" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">其他社交ID</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="socialId" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">车牌号</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="carNum" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">车架号</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="vin" clearable></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">购车网点</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="branch" clearable></el-input>
                </el-col>
              </el-col>
            </el-col>
            <!-- 左右分割线 -->
            <el-col :span="12" class="box2">
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">家庭住址</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="address"></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">收货地址</el-col>
                <el-col :span="14" class="val">
                  <el-col :span="24">
                    <el-cascader
                      :options="optionsCity0"
                      v-model="district_code0"
                      ref="cascaderAddr"
                      filterable
                      clearable
                      @change="handleChangeCity0"
                      placeholder="请选择所在区域"
                    ></el-cascader>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key"></el-col>
                <el-col :span="14" class="val">
                  <el-col :span="24">
                    <el-input placeholder="请输入详细地址" v-model="deliAddress"></el-input>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">开户行</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="bank"></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">银行卡号</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="bankCard"></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">备注信息</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" v-model="remake" maxlength="50"></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">车主邮箱</el-col>
                <el-col :span="14" class="val">
                  <el-input placeholder="请输入内容" clearable v-model="mail"></el-input>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key relation">家属信息</el-col>
                <el-col :span="16" class="val">
                  <el-col
                    :spam="24"
                    class="relationList"
                    v-for="(item,index) in relationList"
                    :key="index"
                  >
                    <el-col :span="5">
                      <el-input placeholder="姓名" v-model="item.name"></el-input>
                    </el-col>
                    <el-col :span="5">
                      <el-input placeholder="关系" v-model="item.relation"></el-input>
                    </el-col>
                    <el-col :span="10">
                      <el-input placeholder="备注" v-model="item.work"></el-input>
                    </el-col>
                    <el-col :span="3">
                      <el-col :span="24" v-if="index == relationList.length-1">
                        <i class="el-icon-delete" @click="delRelationList"></i>
                        <i class="el-icon-circle-plus-outline" @click="addRelationList"></i>
                      </el-col>
                    </el-col>
                  </el-col>
                  <!-- {{relationList}} -->
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- 右侧 end -->
        <!-- 签约合作信息 end -->
        <el-col :span="24" class="put">
          <el-button type="primary" @click="submit">完成</el-button>
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
  name: 'addOwners',
  components: {},
  data() {
    return {
      loading: false, // 上传loading
      checked: false,
      itemDisabled: false,
      radio: '',
      input1: '',
      value1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      tabact: 1,
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

      // 车主基础信息
      vehicleOwnerId: '', // 接口请求数据
      addType: 0,
      ownerDetil: '', // 修改回填数据
      fileList: [], // 头像回填
      handerImg: '', // 头像
      eventDataList: [], // 合作事项列表
      eventData: [], // 合作事项
      sex: '', // 车主性别
      work: '', // 车主职业
      birthDate: '', // 出生日期
      // 城市选择器数据  所在区域
      optionsCity: cities,
      optionsCity0: cities,
      district_code: [], // 区域代码
      district: [], // 区域名称
      district_code0: [], // 收货区域代码
      district0: [], // 收货区域名称
      ownerSkilList: [], // 特长列表
      speciality: '', // 特长
      ownersName: '', // 车主姓名
      livelihood: [], // 用车生活
      livelihood0: '',
      sourceList: [], // 车主来源列表
      source: '', // 车主来源
      carSeriesList: [], // 认证车型列表
      carSeries: [], // 认证车型
      carSeriesId: '', // 认证车型回填
      mail: '', // 车主邮箱
      team: '', // 项目组

      // 车主详细信息
      tel: '', // 手机号
      wx: '', // 微信号
      qq: '', // QQ号
      carId: '', // 汽车之家ID
      carHome: '', // 汽车之家主页
      microblog: '', // 微博ID
      tikTokId: '', // 抖音ID
      socialId: '', // 其他社交ID
      carNum: '', // 车牌号
      vin: '', // 车架号
      branch: '', // 购车网点
      address: '', // 家庭住址
      deliAddress: '', // 收货地址
      bankCard: '',
      bank: '',
      remake: '',
      // 家属信息
      relationList: [
        {
          relationId: '',
          name: '',
          relation: '',
          birthday: '',
          work: '',
        },
      ],

      // 签约合作信息
      pactFileList: [],
      cooperatesId: '',
      pactName: '', // 合同文件名称
      pactPath: '', // 合同文件地址
      pactsuffix: '', // 合同文件后缀
      timeLimit: '', // 合作期限
      duration: '', // 合作时长
      // 合作概况列表
      eventList: [
        {
          id: '', // 合作概况ID
          itemId: '', // 车主选择的合作事项ID
          itemName: '', // 车主选择的合作事项Name
          coopNum: '', // 固定合作总量
          coopMoney: '', // 固定合作总价
          period: '', // 结算周期
          timeLimit: '', // 合作时长
          typeId: '',
        },
      ],
      // IP孵化打造列表
      hatchList: [
        {
          plat: '',
          platRole: '',
          nickname: '',
          url: '',
        },
      ],
      // 提交按钮开关
      submitFlag: true,
    }
  },
  // 侦听器
  watch: {
    tabact: function (newData, oldData) {
      // console.log(this.eventData)
      if (this.addType == 0) {
        this.eventData = []
      }
      this.geteventDataList(newData)
      let eventList = this.eventList
      eventList.forEach((element, i) => {
        this.eventList[i].typeId = newData
      })
      this.addType = 0
    },
    duration: function (newData, oldData) {
      // this.geteventDataList(newData)
      let eventList = this.eventList
      eventList.forEach((element, i) => {
        this.eventList[i].timeLimit = newData
      })
      // console.log(this.eventList)
    },
    carSeriesId: function (newData, oldData) {
      if (newData && this.carSeriesList.length != 0) {
        ///////// 获取认证车型 start /////////
        this.getCarSeries()
      }
    },
    carSeriesList: function (newData, oldData) {
      if (newData.length != 0 && this.carSeriesId) {
        ///////// 获取认证车型 start /////////
        this.getCarSeries()
      }
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
    ///////// 合作事项列表获取 start /////////
    this.geteventDataList(1)
    ///////// 车主来源列表获取 start /////////
    this.getSourceList()
    ///////// 获取特长列表 start /////////
    this.getOwnerSkillList()
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

    ///////// 获取认证车型 start /////////
    getCarSeries() {
      let carSeries = []

      this.carSeriesList.forEach((element0) => {
        element0.children.forEach((element1) => {
          this.carSeriesId.forEach((element2) => {
            if (element1.value == element2.seriesId) {
              let list = [element0.value, element1.value]
              carSeries.push(list)
            }
          })
        })
      })

      this.carSeries = carSeries
      // console.log(carSeries)
    },
    ///////// 获取认证车型 start /////////

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
        typeId: query.typeId*1,
        vehicleOwnerId: query.vehicleOwnerId*1,
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
            if (data.typeId == 1 || data.typeId == 4) {
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
            this.bankCard = data.bankCard
            this.bank = data.bank
            this.remake = data.remake
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
            // console.log(this.district_code)
          }
          this.loading = false
        })
    },

    ///////// 合作事项 start /////////
    changeEvent(data) {
      // console.log(data)
      // console.log('changeEvent')
      let eventDataList = this.eventDataList
      // console.log(eventDataList)
      let itemName = []
      data.forEach((element) => {
        eventDataList.forEach((element_) => {
          if (element_.value == element) {
            itemName.push(element_.label)
          }
        })
      })

      // console.log(itemName)
      let eventList = []
      data.forEach((element, i) => {
        eventList.push({
          name: element,
          itemId: element, // 车主选择的合作事项ID
          itemName: itemName[i], // 车主选择的合作事项Name
          coopNum: '', // 固定合作总量
          coopMoney: '', // 固定合作总价
          period: '', // 结算周期
          timeLimit: this.duration,
          typeId: this.tabact,
        })
      })
      this.eventList = eventList
      // console.log(eventList)
    },
    ///////// 合作事项 end /////////

    ///////// 合作事项列表获取 start /////////
    geteventDataList(id) {
      // console.log(data)
      // console.log(1)
      let eventList = []
      let data = {
        typeId: id,
      }
      this.$axios
        .post('/ocarplay/api/vehicleOwner/getOwnerTypeItems', data)
        .then((res) => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            // console.log(res)
            let data = res.data
            let eventDataList = []
            data.forEach((element) => {
              eventDataList.push({
                value: element.itemId,
                label: element.itemName,
              })
            })
            this.eventDataList = eventDataList
            // console.log(this.eventDataList)
          }
        })
    },
    ///////// 合作事项列表获取 end /////////

    ///////// 车主来源列表获取 start /////////
    getSourceList() {
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 100,
      }
      this.$axios
        .post('/ocarplay/api/ownerSource/listAjaxUnPage', data)
        .then((res) => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            let data = res.data
            let sourceList = []
            data.forEach((element) => {
              sourceList.push({
                value: element.sourceId,
                label: element.sourceName,
              })
            })
            this.sourceList = sourceList
          }
        })
    },
    ///////// 车主来源列表获取 end /////////

    ///////// 获取特长列表 start /////////
    getOwnerSkillList() {
      // this.loading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 30,
      }
      this.$axios
        .post('/ocarplay/api/ownerSkill/listAjaxUnPage', data)
        .then((res) => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            let data = res.data
            let ownerSkilList = []
            data.forEach((element) => {
              ownerSkilList.push({
                value: element.skillId,
                label: element.skillName,
              })
            })
            this.ownerSkilList = ownerSkilList
          }
        })
    },
    ///////// 获取特长列表 end /////////

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

            let carSeriesList = [
              {
                value: 105,
                label: '沃尔沃',
                children: [],
              },
              {
                value: 110,
                label: '吉利舆情',
                children: [],
              },
              {
                value: 153,
                label: '长城',
                children: [],
              },
              {
                deptId: 106,
                label: '东本',
                children: []
              }
            ]
            data.forEach((element) => {
              let children = {
                value: element.carTypeId,
                label: element.carTypeName,
                // children: []
              }
              // element.carSeries.forEach(element_ => {
              //   children.children.push({
              //     value: element_.carSeriesId,
              //     label: element_.carSeriesName
              //   })
              // })
              // console.log(carSeriesIds)
              if (element.deptId == 105) {
                carSeriesList[0].children.push(children)
              } else if (element.deptId == 110) {
                carSeriesList[1].children.push(children)
              } else if (element.deptId == 153) {
                carSeriesList[2].children.push(children)
              } else if (element.deptId == 106) {
                carSeriesList[3].children.push(children)
              }
            })
            this.carSeriesList = carSeriesList
            // console.log(carSeriesList)
          }
        })
    },
    ///////// 获取车型列表 end /////////

    tab(e) {
      this.tabact = e
      this.eventData = []

      if (this.$route.query.type == 1 && e == 1) {
        this.addType = 1
        this.getVehicleOwnerDetail()
      }
    },

    ///////// 头像上传 start //////////
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.handerImg = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    headImgSuccess(response, file, fileList) {
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
    handleChangeCity0(e, form) {
      // 选择区域
      let add = this.getCascaderObj(e, this.optionsCity0)
      let Addtest = []
      for (let i = 0; i < add.length; i++) {
        Addtest.push(add[i].label)
      }
      this.district0 = Addtest
      // console.log(Addtest)
      // console.log(e)
      // console.log(form)
    },
    // 城市选择器切换
    handleChange(val) {},
    ///////// 城市选择器 start /////////

    ///////// 添加家属信息 start /////////
    addRelationList() {
      this.relationList.push({
        relationId: '',
        name: '',
        relation: '',
        birthday: '',
        work: '',
      })
    },
    ///////// 添加家属信息 start /////////

    ///////// 删除家属信息 start /////////
    delRelationList() {
      let relationList = this.relationList
      if (relationList.length > 1) {
        this.relationList.pop()
      }
    },
    ///////// 删除家属信息 start /////////

    ///////// 添加IP孵化信息 start /////////
    addHatchList() {
      this.hatchList.push({
        plat: '',
        platRole: '',
        nickname: '',
        url: '',
      })
    },
    ///////// 添加IP孵化信息 start /////////

    ///////// 删除IP孵化信息 start /////////
    delHatchList() {
      let hatchList = this.hatchList
      if (hatchList.length > 1) {
        this.hatchList.pop()
      }
    },
    ///////// 删除IP孵化信息 start /////////

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
      this.messageWarning('合同文档允许上传一个！')
    },
    pactRemove(file, fileList) {
      this.pactName = ''
      this.pactPath = ''
      this.pactsuffix = ''
    },
    ///////// 签约合同上传 end /////////

    ///////// 合作期限变化 start /////////
    changeTimeLimit(data) {
      let duration = (data[1] - data[0]) / 1000 / 60 / 60 / 24
      this.duration = duration
    },
    ///////// 合作期限变化 end /////////

    ///////// 提交按钮 start /////////
    submit() {
      this.loading = true
      // 合同日期转换

      let startTime = ''
      let endTime = ''
      if (this.timeLimit.length) {
        startTime = this.$date0(this.timeLimit[0])
        endTime = this.$date0(this.timeLimit[1])
      }
      // 用车生活
      let livelihood = this.livelihood.toString()
      let livelihood0 = this.livelihood0
      let carUse = livelihood
      if (livelihood0) {
        carUse = livelihood + ',' + livelihood0
      }
      // console.log(carUse)
      let itemId = this.eventData.toString()
      // 出生日期
      let birthday = this.$date0(this.birthDate)
      // 认证车型
      let carSeries = this.carSeries
      let ownerCarSeries = []
      carSeries.forEach((element) => {
        ownerCarSeries.push({
          seriesId: element[1],
        })
      })
      let data = {
        deptId: '',
        vehicleOwnerId: this.vehicleOwnerId,
        image: this.handerImg,
        typeId: this.tabact,

        // itemId: itemId,
        name: this.ownersName,
        sex: this.sex,
        carUse: carUse,
        work: this.work,
        sourceId: this.source, // 车主来源
        birthday: birthday,
        // seriesId: this.carSeries[2],
        // ownerCarSeries: [], // 车主认证车型
        email: this.mail,
        skillId: this.speciality,
        ownerCarSeries: ownerCarSeries,
        province: this.district[0] || null,
        city: this.district[1] || null,

        phone: this.tel,
        homeAddress: this.address,
        wx: this.wx,
        qq: this.qq,
        relations: this.relationList, // 家属信息表
        bbsId: this.carId,
        homeUrl: this.carHome,
        weiboId: this.microblog,
        dyId: this.tikTokId,
        otherId: this.socialId,
        plateNum: this.carNum,
        vinno: this.vin,
        buycarplace: this.branch,
        bankCard: this.bankCard,
        deliveryAddresses: [],
        cooperates: [],
      }
      // console.log(data)
      // 合作文档
      // if (this.pactPath) {
      data.cooperates[0] = {
        fileName: this.pactName,
        localPath: this.pactPath,
        startTime: startTime,
        endTime: endTime,
        suffix: this.pactsuffix,
        timeLimit: this.duration,
      }
      if (this.cooperatesId) {
        data.cooperates[0].id = this.cooperatesId
      }
      // }
      // 收货地址
      let district0 = this.district0
      // console.log(district0)
      if (district0.length == 2) {
        // data.deliveryAddresses[0].city = district0[0]
        // data.deliveryAddresses[0].area = district0[1]
        // data.deliveryAddresses[0].address = this.deliAddress
        data.deliveryAddresses[0] = {
          city: district0[0],
          area: district0[1],
          address: this.deliAddress,
        }
      } else if (district0.length == 3) {
        // data.deliveryAddresses[0].province = district0[0]
        // data.deliveryAddresses[0].city = district0[1]
        // data.deliveryAddresses[0].area = district0[2]
        // data.deliveryAddresses[0].address = this.deliAddress
        data.deliveryAddresses[0] = {
          province: district0[0],
          city: district0[1],
          area: district0[2],
          address: this.deliAddress,
        }
      }
      let tabact = this.tabact
      let judgeList = []
      let judge = true
      // console.log(tabact)
      if (tabact == 1) {
        data.ownerCoops = this.eventList
        data.ownerCoops.forEach((element, i) => {
          element.timeLimit = this.duration
          if (i > 1) {
            element.deleteFlag = true
          }
        })
        // [
        //   {
        //     coopMoney: '固定合作总价',
        //     coopNum: '固定合作总量',
        //     itemId: '车主选择的合作事项ID',
        //     period: '结算周期（0-按月结算，1-按年结算，2-按季度结算）',
        //     timeLimit: this.duration,
        //     typeId: this.tabact
        //   }
        // ]
        // judgeList = []
        if (
          data.name  == '' ||
          !data.province ||
          !data.city ||
          itemId === '' ||
          data.sex === '' ||
          data.sourceId.length === 0 ||
          data.ownerCarSeries.length === 0 ||
          this.timeLimit.length === 0 ||
          data.carUse === ''
        ) {
          judge = false
        }
        // data.ownerCoops.forEach((element) => {
        //   judgeList.push(element.coopNum)
        //   judgeList.push(element.coopMoney)
        //   judgeList.push(element.period)
        // })
        // console.log(judgeList)
        for (let i = 0; i < judgeList.length; i++) {
          const element = judgeList[i]
          // console.log(judge)
          if (element === '' || element === null) {
            judge = false
            // console.log(judge)
            break
          }
        }
      } else if (tabact == 4) {
        data.ownerCoops = this.eventList
        data.ownerCoops.forEach((element, i) => {
          element.timeLimit = this.duration
          if (i > 1) {
            element.deleteFlag = true
          }
        })
        // [
        //   {
        //     coopMoney: '固定合作总价',
        //     coopNum: '固定合作总量',
        //     itemId: '车主选择的合作事项ID',
        //     period: '结算周期（0-按月结算，1-按年结算，2-按季度结算）',
        //     timeLimit: this.duration,
        //     typeId: this.tabact
        //   }
        // ]
        // judgeList = []
        if (
          data.name == ''||
          // !data.province ||
          // !data.city ||
          itemId === '' ||
          // data.sex === '' ||
          // data.sourceId.length === 0 ||
          data.ownerCarSeries.length === 0 ||
          this.timeLimit.length === 0
          // data.carUse === ''
        ) {
          judge = false
        }
        console.log(judge)
        data.ownerCoops.forEach((element) => {
          judgeList.push(element.coopNum)
          judgeList.push(element.coopMoney)
          judgeList.push(element.period)
        })
        // console.log(judgeList)
        // for (let i = 0; i < judgeList.length; i++) {
        //   const element = judgeList[i]
        //   // console.log(judge)
        //   if (element === '' || element === null) {
        //     judge = false
        //     // console.log(judge)
        //     break
        //   }
        // }
      } else if (tabact == 3) {
        if (
          data.name  == ''||
          !data.province ||
          !data.city ||
          itemId === '' ||
          data.sex === '' ||
          data.sourceId.length === 0 ||
          data.cooperates[0].localPath === '' ||
          this.timeLimit.length === 0 ||
          data.carUse === ''||
          data.ownerCarSeries.length === 0
        ) {
          judge = false
        }
        // data.ipGrows = [
        //   {
        //     itemId: '车主选择的合作事项ID',
        //     nickname: '账号昵称',
        //     plat: '平台名称',
        //     platRole: '人设',
        //     url: '主页链接url',
        //     typeId: this.tabact
        //   }
        // ]
        let ipGrows = []
        let eventData = this.eventData
        let hatchList = this.hatchList
        eventData.forEach((element) => {
          hatchList.forEach((element_) => {
            ipGrows.push({
              coopId: element_.coopId,
              itemId: element,
              nickname: element_.nickname,
              plat: element_.plat,
              platRole: element_.platRole,
              url: element_.url,
              typeId: this.tabact,
            })
          })
        })
        data.ipGrows = ipGrows
      }
      console.log(data)
      // console.log(judgeList)

      let isEmail = this.$isEmail(data.email)
      if (data.email != '' && !isEmail) {
        this.$message.error('正确填写邮箱！')
        judge = false
      } else {
      }
      // console.log(judgeList)
      // console.log(data)
      if (judge) {
        this.submitFlag = false
        this.$axios
          .post('/ocarplay/api/vehicleOwner/saveOrUpdate', data)
          .then((res) => {
            // console.log(res)
            if (res.status == 200 && res.data.errcode == 0) {
              this.messageWin(res.data.msg)
              setTimeout(() => {
                this.$router.push({ path: '/home/owners' })
                this.loading = false
              }, 1000)
            } else {
              this.messageError(res.data.msg)
            }
          })
          .catch((res) => {
            this.loading = false
            if (res.status != 200) {
              this.$message('网络错误' + res.status)
            }
          })
      } else {
        this.loading = false
        this.$message.error('请检查信息是否完整！')
      }
    },
    ///////// 提交按钮 end /////////

    ///////// 消息提示 start /////////
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success',
      })
    },
    messageWarning(message) {
      // 警告提示
      this.$message({
        message: message,
        type: 'warning',
      })
    },
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    },
    ///////// 消息提示 end /////////
  },
}
</script>
<style lang="scss" scoped>
#addOwners {
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
      & >>> .el-checkbox__label{
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
        .butBox1 {
          width: 243px;
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
        .box1{
          padding-right: 18px;
        }
        .box2 {
          padding-left: 18px;
        }
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
