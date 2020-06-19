<template>
  <div id="ownersdetail">
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
          <el-col :span="6" class="change">
            <i class="el-icon-edit" @click="toAddOwners()"></i>
          </el-col>
        </el-col>
        <!-- 上传照片 -->
        <el-col :span="24" class="upladImgBox">
          <el-image class="upladImg" :src="ownerDetil.image" fit="cover"></el-image>
        </el-col>
        <!-- 车主信息 start -->
        <el-col :span="24" class="information information1">
          <el-col :span="12" class="left">
            <el-col :span="24" class="list">
              <div class="key">车主类型</div>
              <div class="val">
                <template v-if="ownerDetil.typeId==1">支持型</template>
                <template v-if="ownerDetil.typeId==2">拍摄型</template>
                <template v-if="ownerDetil.typeId==3">资源型</template>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主性别</div>
              <div class="val">
                <!-- <el-radio v-model="ownerDetil.sex" label="false">
                  <i class="el-icon-male"></i>
                </el-radio>
                <el-radio v-model="ownerDetil.sex" label="true">
                  <i class="el-icon-female"></i>
                </el-radio>-->
                <template v-if="ownerDetil.sex">
                  <i class="el-icon-female sex1"></i>
                </template>
                <template v-else>
                  <i class="el-icon-male sex0"></i>
                </template>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主职业</div>
              <div class="val">{{ownerDetil.work}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">出生日期</div>
              <div class="val">{{ownerDetil.birthday}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">所在区域</div>
              <div class="val">{{ownerDetil.province}}{{ownerDetil.city}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">特长</div>
              <div class="val">{{ownerDetil.skillName}}</div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list">
              <div class="key">合作事项</div>
              <div class="val">{{this.$route.params.itemName}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主姓名</div>
              <div class="val">{{ownerDetil.name}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">用车生活</div>
              <div class="val">{{ownerDetil.carUse}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主来源</div>
              <div class="val">{{ownerDetil.sourceName}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">认证车型</div>
              <div class="val">{{ownerDetil.carSeriesName}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车主邮箱</div>
              <div class="val">{{ownerDetil.email}}</div>
            </el-col>
            <!-- <el-col :span="24" class="list">
              <div class="key">项目组</div>
              <div class="val">项目组</div>
            </el-col>-->
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
              <div class="val">{{ownerDetil.phone}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">微信号</div>
              <div class="val">{{ownerDetil.wx}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">QQ号</div>
              <div class="val">{{ownerDetil.qq}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">汽车之家ID</div>
              <div class="val">{{ownerDetil.bbsId}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">汽车之家主页</div>
              <div class="val">{{ownerDetil.homeUrl}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">微博ID</div>
              <div class="val">{{ownerDetil.weiboId}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">抖音ID</div>
              <div class="val">{{ownerDetil.dyId}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">其他社交ID</div>
              <div class="val">{{ownerDetil.otherId}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车牌号</div>
              <div class="val">{{ownerDetil.plateNum}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">车架号</div>
              <div class="val">{{ownerDetil.vinno}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">购车网点</div>
              <div class="val">{{ownerDetil.buycarplace}}</div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list">
              <div class="key">家庭住址</div>
              <div class="val">{{ownerDetil.homeAddress}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">收货地址</div>
              <div class="val">收货地址</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">家属信息</div>
              <div class="val">
                <!-- <el-input placeholder="请输入内容" v-model="input1"></el-input> -->
                <el-col :span="24" v-for="(item, index) in ownerDetil.relations" :key="index">
                  <el-col :span="5">{{item.name}}</el-col>
                  <el-col :span="5">{{item.relation}}</el-col>
                  <el-col :span="7">{{$date0(item.birthday)}}</el-col>
                  <el-col :span="7">{{item.work}}</el-col>
                </el-col>
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
              <div class="key">签约合同</div>
              <div class="val">
                <img src="static/images/document/ppt.png" width="24" alt srcset />
                &nbsp;
                <el-link
                  @click="download(ownerDetil.cooperates[0])"
                >{{ownerDetil.cooperates[0].fileName}}</el-link>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">合作期限</div>
              <div
                class="val"
                v-for="(item, index) in ownerDetil.cooperates"
                :key="index"
              >{{$date(item.startTime)}}---{{$date(item.endTime)}}</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">合作时长</div>
              <div class="val" v-for="(item, index) in ownerDetil.cooperates" :key="index">
                <template v-if="item.timeLimit>=30">{{parseInt(item.timeLimit/30)}}个月</template>
                <template v-else>{{item.timeLimit}}天</template>
              </div>
            </el-col>
          </el-col>
          <!-- 左右分割线 -->
          <el-col :span="12" class="right">
            <el-col :span="24" class="list">
              <template v-if="ownerDetil.typeId==1">
                <div class="key">合作事项要求频次</div>
                <div class="val">
                  <el-col :span="24" v-for="(item, index) in ownerDetil.ownerCoops" :key="index">
                    <el-col :span="6">{{item.itemName}}</el-col>
                    <el-col :span="6">合作总量{{item.coopNum}}</el-col>
                    <el-col :span="6">合作总价{{item.coopMoney}}</el-col>
                    <el-col :span="6">
                      <template v-if="item.period==0">
                        按月结算
                      </template>
                      <template v-if="item.period==1">
                        按年结算
                      </template>
                      <template v-if="item.period==2">
                        按季度结算
                      </template>
                    </el-col>
                  </el-col>
                </div>
              </template>

              <template v-else>
                <div class="key">IP孵化打造</div>
                <div class="val">
                  <el-col :span="24" v-for="(item, index) in ownerDetil.ipGrows" :key="index">
                    <el-col :span="6">{{item.plat}}</el-col>
                    <el-col :span="6">{{item.platRole}}</el-col>
                    <el-col :span="6">{{item.nickname}}</el-col>
                    <el-col :span="6">{{item.url}}</el-col>
                  </el-col>
                </div>
              </template>
            </el-col>
          </el-col>
        </el-col>
        <!-- 签约合作信息 end -->
        <el-col :span="22" :offset="1">
          <el-table
            :data="ownerDetil.invites"
            style="width: 100%"
            :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
            :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          >
            <el-table-column prop label="序号" width="81" align="center">
              <template slot-scope="scope">0{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="createTime" label="受邀时间" min-width="81" show-overflow-tooltip>
              <template slot-scope="scope">{{$date(scope.row.createTime)}}</template>
            </el-table-column>
            <el-table-column
              prop="task.taskName"
              label="受邀任务"
              min-width="180"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="itemName" label="受邀事项" min-width="81" show-overflow-tooltip></el-table-column>
            <el-table-column prop="title" label="内容标题" min-width="81"></el-table-column>
            <el-table-column prop="url" label="内容链接" min-width="81">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :href="'http://'+scope.row.url"
                  target="_blank"
                >{{scope.row.url}}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="addnum" label="成果" min-width="100"></el-table-column>
          </el-table>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法
import cities from '@/common/cities.js' // 引入城市数据

export default {
  name: 'ownersdetail',
  components: {},
  data() {
    return {
      // 表格数据
      tableData: [
        {
          name: '解雨臣',
          car: 'XC60 2017款 T5 AWD 个性运动升级版',
          matter: '日常素材',
          time: '6个月',
          mandnum: '1500',
          addnum: '20',
          oldnum: '16',
          surplusnum: '4',
          period: '按月结算'
        }
      ],
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      radio: '',
      input1: '',
      value1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      // tabact: '1',
      // 城市选择器数据
      optionsCity: cities,
      district_code: '', // 区域代码
      district: '', // 区域名称
      dialogVisible: false,

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
      // 车主信息
      ownerDetil: {
        image:
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        cooperates: [{}],
        invites: [],
        ipGrows: [{}]
      }
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // this.getQuery()
    // console.log(this.$route.params.typeId)
    // 获取车主详细信息
    this.getVehicleOwnerPreEdit()
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 跳转编辑 start /////////
    toAddOwners() {
      this.$router.push({
        // path: '/home/addowners'
        name: 'addowners',
        // query: { id: id }
        params: {
          type: 1
        }
      })
    },
    ///////// 跳转编辑 end /////////

    ///////// 获取车主详细信息 start /////////
    getVehicleOwnerPreEdit(id) {
      let data = {
        typeId: this.$store.state.vehicleOwnerDetailNum[0],
        vehicleOwnerId: this.$store.state.vehicleOwnerDetailNum[1]
      }
      console.log(data)
      this.$axios.post('/ocarplay/api/vehicleOwner/preEdit', data).then(res => {
        // console.log(res)
        // this.loading = false
        if (res.status == 200) {
          // console.log(res)
          let data = res.data
          data.image = '/ocarplay/' + data.image
          this.ownerDetil = data
        }
      })
    },
    ///////// 获取车主详细信息 end /////////

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
      // console.log(Addtest)
      // console.log(e)
      // console.log(form)
    },
    // 城市选择器切换
    handleChange(val) {},
    ///////// 城市选择器 start /////////

    ///////// 下载 start /////////
    download(row) {
      console.log(row)
      let localPath = row.localPath
      let a = document.createElement('a')
      a.download = `${row.fileName}.${row.suffix}`
      a.setAttribute('href', 'http://176.10.10.235:8080/ocarplay/' + localPath)
      a.click()
    }
    ///////// 下载 end /////////
  }
}
</script>
<style lang="scss" scoped>
$icoColor: rgb(106, 145, 232);
#ownersdetail {
  height: 100%;
  background: white;
  .sex0 {
    font-size: 21px;
    color: #67a9d6;
  }
  .sex1 {
    font-size: 21px;
    color: #e57470;
  }
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
      .change {
        text-align: right;
        i {
          cursor: pointer;
          color: $icoColor;
          font-size: 28px;
        }
      }
    }
    .upladImgBox {
      display: flex;
      justify-content: center;
      align-items: center;
      .upladImg {
        width: 420px;
        height: 240px;
        border-radius: 18px;
      }
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
          height: 40px;
          line-height: 40px;
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
    .information3 {
      .right {
        .key {
          width: 132px;
        }
      }
    }
  }
}
</style>
