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
          <el-col :span="12">车主信息</el-col>
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
              <div class="key">合作事项</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主性别</div>
              <div class="val">
                <el-radio v-model="radio" label="1">
                  <i class="el-icon-male"></i>
                </el-radio>
                <el-radio v-model="radio" label="2">
                  <i class="el-icon-female"></i>
                </el-radio>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主职业</div>
              <div class="val">
                <el-cascader :options="options2" :props="props" v-model="input1" clearable></el-cascader>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">出生日期</div>
              <div class="val">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
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
              <div class="key">特长</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list">
              <div class="key">车主姓名</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">用车生活</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主来源</div>
              <div class="val">
                <el-select v-model="value" clearable placeholder="请选择">
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
              <div class="key">认证车主</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主邮箱</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">项目组</div>
              <div class="val">
                <el-select v-model="value" clearable placeholder="请选择">
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
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">微信号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">QQ号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">汽车之家ID</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">汽车之家主页</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">微博ID</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">抖音ID</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">其他社交ID</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车牌号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车架号</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">购车网店</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list">
              <div class="key">家庭住址</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">收货地址</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>
            <!-- <el-col :span="24" class="list">
              <div class="key">车主来源</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>-->
            <el-col :span="24" class="list">
              <div class="key">家属信息</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>
          </el-col>
        </el-col>
        <!-- 车主详细信息 end -->

        <!-- 签约合作信息 start -->
        <!-- 标题 -->
        <el-col :span="24" class="title">
          <el-col :span="24">车主详细信息</el-col>
        </el-col>

        <el-col :span="24" class="information information3">
          <el-col :span="12" class="left">
            <el-col :span="24" class="list">
              <div class="key">签约合同</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">合作期限</div>
              <div class="val">
                <el-date-picker
                  v-model="input1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">合作时长</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
              </div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list">
              <div class="key">合作概况</div>
              <div class="val">
                <el-input placeholder="请输入内容" v-model="input1"></el-input>
              </div>
            </el-col>
          </el-col>
        </el-col>
        <!-- 签约合作信息 end -->
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法
import cities from '@/common/cities.js' // 引入城市数据

export default {
  name: 'addOwners',
  components: {},
  data() {
    return {
      radio: '',
      input1: '',
      value1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      tabact: '1',
      // 城市选择器数据
      optionsCity: cities,
      district_code: '', // 区域代码
      district: '', // 区域名称
      dialogVisible: false,

      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // this.getQuery()
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.push({
        path: '/home/task'
      })
    },
    ///////// 返回上一页 end /////////

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
    handleChange(val) {}
    ///////// 城市选择器 start /////////
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
        margin-left: 36px;
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
