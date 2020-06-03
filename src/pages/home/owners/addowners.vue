<template>
  <div id="addOwners">
    <!-- 内容列表 start -->
    <el-row class="content">
      <el-scrollbar style="height:100%">
        <!-- 标题 -->
        <el-col :span="24" class="title">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
          <el-col :span="12">车主基础信息</el-col>
        </el-col>
        <!-- 上传照片 -->
        <el-col :span="24" class="upladImgBox">
          <el-upload
            class="upladImg"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>
        <!-- 类型选择 -->
        <el-col :span="24" class="tab">
          <div class="butBox1">
            <div :class="[tabact==1?'but act':'but']" @click="tab(1)">支持型</div>
            <div :class="[tabact==2?'but act':'but']" @click="tab(2)">拍摄型</div>
            <div :class="[tabact==3?'but act':'but']" @click="tab(3)">资源型</div>
          </div>
        </el-col>
        <!-- 车主信息 start -->
        <el-col :span="24" class="information information1">
          <el-col :span="12" class="left">
            <el-col :span="24" class="list">
              <div class="key imp">合作事项</div>
              <div class="val">
                <el-select
                  v-model="event"
                  multiple
                  clearable
                  placeholder="请选择"
                  @change="changeEvent"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key imp">车主性别</div>
              <div class="val">
                <el-radio v-model="sex" label="1">
                  <i class="el-icon-male"></i>
                </el-radio>
                <el-radio v-model="sex" label="2">
                  <i class="el-icon-female"></i>
                </el-radio>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主职业</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="occup" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">出生日期</div>
              <div class="val">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key imp">所在区域</div>
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
              <div class="key">特长</div>
              <div class="val">
                <el-cascader :options="options" v-model="speciality" clearable></el-cascader>
              </div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list">
              <div class="key imp">车主姓名</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="ownersName"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key imp">用车生活</div>
              <div class="val">
                <el-col :span="18">
                  <el-checkbox-group v-model="livelihood" class="livelihood">
                    <el-checkbox label="通勤"></el-checkbox>
                    <el-checkbox label="自驾游"></el-checkbox>
                    <el-checkbox label="越野"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col :span="6">
                  <el-input placeholder="请输入内容" v-model="livelihood0"></el-input>
                </el-col>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key imp">车主来源</div>
              <div class="val">
                <el-select v-model="source" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key imp">认证车型</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="carType"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key imp">车主邮箱</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="mail"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">项目组</div>
              <div class="val">
                <el-select v-model="team" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
          </el-col>
        </el-col>
        <!-- 车主信息 end -->

        <!-- 车主详细信息 start -->
        <!-- 标题 -->
        <el-col :span="24" class="title">
          <el-col :span="24">车主详细信息</el-col>
        </el-col>
        <el-col :span="24" class="information information2">
          <el-col :span="12" class="left">
            <el-col :span="24" class="list">
              <div class="key">手机号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="tel" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">微信号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="wx" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">QQ号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="qq" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">汽车之家ID</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="carId" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">汽车之家主页</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="carHome" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">微博ID</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="microblog" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">抖音ID</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="tikTokId" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">其他社交ID</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="socialId" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车牌号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="carNum" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车架号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="vin" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">购车网点</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="branch" clearable></el-input>
              </div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list">
              <div class="key">家庭住址</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="address"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">收货地址</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="deliAddress"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key relation">家属信息</div>
              <div class="val">
                <el-col
                  :spam="24"
                  class="relationList"
                  v-for="(item,index) in relationList"
                  :key="index"
                >
                  <el-col :span="5">
                    <el-input placeholder="请输入内容" v-model="item.name"></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input placeholder="请输入内容" v-model="item.relation"></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input placeholder="请输入内容" v-model="item.birthDate"></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input placeholder="请输入内容" v-model="item.profession"></el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-col :span="24" v-if="index == relationList.length-1">
                      <i class="el-icon-delete" @click="delRelationList"></i>
                      <i class="el-icon-circle-plus-outline" @click="addRelationList"></i>
                    </el-col>
                  </el-col>
                </el-col>
                <!-- {{relationList}} -->
              </div>
            </el-col>
          </el-col>
        </el-col>
        <!-- 车主详细信息 end -->

        <!-- 签约合作信息 start -->
        <!-- 标题 -->
        <el-col :span="24" class="title">
          <el-col :span="24">签约合作信息</el-col>
        </el-col>

        <el-col :span="24" class="information information3">
          <el-col :span="12" class="left">
            <el-col :span="24" class="list">
              <div class="key imp">签约合同</div>
              <div class="val">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleChange"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key imp">合作期限</div>
              <div class="val">
                <el-date-picker
                  v-model="timeLimit"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeTimeLimit"
                ></el-date-picker>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key imp">合作时长</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="duration" clearable :disabled="true"></el-input>
              </div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list" v-if="tabact == 1">
              <div class="key">合作概况</div>
              <div class="val situation">
                <el-col :span="21" class="list" v-for="(item, index) in eventList" :key="index">
                  <el-col :span="6">
                    <el-input placeholder="请输入" v-model="item.name" clearable :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input placeholder="固定合作总量" v-model="input1" clearable></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input placeholder="固定合作总价" v-model="input1" clearable></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-select v-model="value" clearable placeholder="结算周期">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-col>
              </div>
            </el-col>
            <el-col :span="24" class="list" v-else-if="tabact != 1">
              <div class="key">IP孵化打造</div>
              <div class="val hatch">
                <el-col :span="21" class="list" v-for="(item, index) in hatchList" :key="index">
                  <el-col :span="5">
                    <el-input placeholder="请输入" v-model="item.name" clearable></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input placeholder="人设" v-model="item.character" clearable></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input placeholder="账号昵称" v-model="item.nickname" clearable></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input placeholder="主页链接" v-model="item.link" clearable></el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-col :span="24" v-if="index == hatchList.length-1">
                      <i class="el-icon-delete" @click="delHatchList"></i>
                      <i class="el-icon-circle-plus-outline" @click="addHatchList"></i>
                    </el-col>
                  </el-col>
                </el-col>
              </div>
            </el-col>
          </el-col>
        </el-col>
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
      checked: false,
      radio: '',
      input1: '',
      value1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      tabact: '1',
      dialogVisible: false,
      options: [
        {
          value: '黄金糕',
          label: '黄金糕'
        },
        {
          value: '双皮奶',
          label: '双皮奶'
        },
        {
          value: '蚵仔煎',
          label: '蚵仔煎'
        },
        {
          value: '龙须面',
          label: '龙须面'
        },
        {
          value: '北京烤鸭',
          label: '北京烤鸭'
        }
      ],
      value: '',

      // 车主基础信息
      event: [], // 合作事项
      sex: '', // 车主性别
      occup: '', // 车主职业
      birthDate: '', // 出生日期
      // 城市选择器数据  所在区域
      optionsCity: cities,
      district_code: '', // 区域代码
      district: '', // 区域名称
      speciality: '', // 特长
      ownersName: '', // 车主姓名
      livelihood: [], // 用车生活
      livelihood0: '',
      source: '', // 车主来源
      carType: '', // 认证车型
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
      // 家属信息
      relationList: [
        {
          name: '',
          relation: '',
          birthDate: '',
          profession: ''
        }
      ],

      // 签约合作信息
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      timeLimit: '',
      duration: '',
      // 合作概况列表
      eventList: [
        {
          name: '',
          character: '',
          nickname: '',
          link: ''
        }
      ],
      // IP孵化打造列表
      hatchList: [
        {
          name: '',
          character: '',
          nickname: '',
          link: ''
        }
      ]
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // this.test()
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1);//返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 合作事项 start /////////
    changeEvent(data) {
      console.log(data)
      // console.log(1)
      let eventList = []
      data.forEach(element => {
        eventList.push({
          name: element,
          character: '',
          nickname: '',
          link: ''
        })
      })
      this.eventList = eventList
    },
    ///////// 合作事项 end /////////

    tab(e) {
      this.tabact = e
    },

    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

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

    ///////// 添加家属信息 start /////////
    addRelationList() {
      this.relationList.push({
        name: '',
        relation: '',
        birthDate: '',
        profession: ''
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
        name: '',
        character: '',
        nickname: '',
        link: ''
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
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3)
    },
    ///////// 签约合同上传 end /////////

    ///////// 合作期限变化 start /////////
    changeTimeLimit(data) {
      let duration = (data[1] - data[0]) / 1000 / 60 / 60 / 24
      this.duration = duration
    },
    ///////// 合作期限变化 end /////////

    ///////// 提交按钮 start /////////
    submit() {}
    ///////// 提交按钮 end /////////
  }
}
</script>
<style lang="scss" scoped>
#addOwners {
  height: 100%;
  background: white;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 36px;
    i {
      cursor: pointer;
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
    .upladImgBox {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tab {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      .butBox1 {
        width: 243px;
        height: 36px;
        // margin-left: 36px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-radius: 6px;
        border: 1px solid rgb(205, 205, 205);
        .but {
          width: 81px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-size: 14px;
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
    $pad: 49px;
    .information {
      .list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 16px 0;
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
          width: 125px;
          height: 40px;
          line-height: 40px;
          margin-right: 13px;
          text-align: justify;
          box-sizing: border-box;
          padding: 0 9px;
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
    }
    .put {
      // position: absolute;
      // bottom: 24px;
      // left: 0;
      margin-top: 36px;
      text-align: center;
      button {
        width: 136px;
      }
    }
  }
}
</style>
<style lang="scss">
.upladImg {
  width: 420px;
  height: 240px;
  overflow: hidden;
  .el-upload--picture-card {
    width: 420px;
    height: 240px;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-upload-list__item {
    width: 420px;
    height: 240px;
  }
}
</style>
