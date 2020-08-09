<template>
  <div id="ownersschedule">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="8" class="left cont">
        <div @click="previous">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>
      </el-col>
      <el-col :span="8" class="center cont">日程管理</el-col>
      <el-col :span="8" class="right cont">
        <!-- <div @click="submit">
          <i class="el-icon-circle-check"></i>
          <br />提交并完成
        </div>-->
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content">
      <el-col :sapn="24" class="openAddBox">
        <div class="openAdd" @click="openAddSchedule">新建日程</div>
      </el-col>
      <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template slot="dateCell" slot-scope="{date, data}">
          <div :class="data.isSelected ? 'is-selected box' : 'box'">
            <div
              class="time"
            >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</div>

            <!-- <div
              
              v-if="$date0(date) == $date0(new Date)"
            >云图系统</div>-->

            <!-- {{date}} -->
            <div
              class="schedule"
              @click="scheduleDetail(item.schId)"
              v-for="(item, index) in ownerScheduleListData"
              :key="index"
              v-if="item.startGetTime<=date.getTime()&&item.endGetTime>=date.getTime()"
            >
              {{item.schName}}
              <!-- {{item.startGetTime}} -->
              <!-- {{item.endGetTime}} -->
            </div>

            <!-- {{date.getTime()}} -->
          </div>
        </template>
      </el-calendar>
    </el-row>
    <!-- 内容列表 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <el-drawer title="日程预约" :visible.sync="scheduleRecord" size="572px">
      <el-row class="scheduleRecord" v-loading="drawerLoading">
        <el-col :span="4" class="key">任务名称</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="19">{{preEditSchedule.schName}}</el-col>
        <el-col :span="4" class="key">开始时间</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="19">{{preEditSchedule.startTime}}</el-col>
        <el-col :span="4" class="key">时长</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="19">
          {{preEditSchedule.during}}
          <template
            v-if="preEditSchedule.duringType == false||preEditSchedule.duringType == 0"
          >小时</template>
          <template v-if="preEditSchedule.duringType == true||preEditSchedule.duringType == 1">天</template>
          <template v-if="preEditSchedule.duringType == 2">月</template>
        </el-col>
        <el-col :span="4" class="key">类型</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="19">{{preEditSchedule.dayTypeName}}</el-col>
        <el-col :span="4" class="key">路线</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="19">{{preEditSchedule.schLine}}</el-col>
        <el-col :span="4" class="key">地点</el-col>
        <el-col :span="1">:</el-col>
        <el-col
          :span="19"
        >{{preEditSchedule.province}}{{preEditSchedule.city}}{{preEditSchedule.area}}</el-col>
        <el-col :span="4" class="key">备注</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="19">{{preEditSchedule.remark}}</el-col>
        <el-col :span="4" class="key">预约车主</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="19" class="appoin">
          <el-col :span="14">
            <!-- <el-select v-model="deptId" clearable placeholder="预约组别">
              <el-option
                v-for="item in deptIdList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <el-cascader
              v-model="carSeriesId"
              :options="carSeriesList"
              clearable
              filterable
              collapse-tags
            ></el-cascader>
          <!-- </el-col>
          <el-col :span="7"> -->
            <!-- <el-select v-model="carTypeId" clearable placeholder="预约车型">
              <el-option
                v-for="item in carTypeIdList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <!-- <el-cascader v-model="carTypeId" :options="carTypeIdList" filterable></el-cascader> -->
          </el-col>
          <el-col :span="8">
            <el-input placeholder="计划预约量" v-model="schNum" clearable></el-input>
          </el-col>
        </el-col>

        <el-col :span="24" class="btn">
          <el-col :span="8" :offset="3">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-button type="primary" @click="schedulePlaceOrder">下单预约</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗提交任务 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <el-drawer title="新建日程" :visible.sync="addSchedule" size="572px">
      <el-row class="addSchedule" v-loading="drawerLoading">
        <el-col :span="4" class="key">日程主题</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="schName" clearable></el-input>
        </el-col>
        <el-col :span="4" class="key">开始时间</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="18">
          <!-- <el-date-picker v-model="startTime" type="date" placeholder="选择日期"></el-date-picker> -->
          <el-date-picker
            v-model="tiemQuan"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="4" class="key">时长</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="during" class="input-with-select">
            <el-select v-model="duringType" slot="append" placeholder="选择" disabled>
              <el-option label="时" :value="0"></el-option>
              <el-option label="天" :value="1"></el-option>
              <el-option label="月" :value="2"></el-option>
            </el-select>
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
          </el-input>
        </el-col>
        <el-col :span="4" class="key">类型</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="18">
          <el-select v-model="dayTypeId" clearable placeholder="请选择">
            <el-option
              v-for="item in dayTypeListData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="key">路线</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="schLine" clearable></el-input>
        </el-col>
        <el-col :span="4" class="key">地点</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="18">
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
        <el-col :span="4" class="key">备注</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="remark" clearable></el-input>
        </el-col>

        <el-col :span="24" class="btn">
          <el-col :span="8" :offset="3">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-button type="primary" @click="saveOwnerSchedule">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗提交任务 end -->
  </div>
</template>
<script>
import cities from '@/common/cities.js' // 引入城市数据
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'ownersschedule',
  props:['carSeriesList'],
  components: {},
  data() {
    return {
      num: [1],
      // 日程记录
      ownerId: this.$route.query.id,
      newDate: new Date(),
      scheduleRecord: false,
      // 日程列表
      ownerScheduleListData: [],
      input: '',
      value1: '',
      input3: '',
      addSchedule: false,
      prepend: '1',
      select: '',
      options: [],
      value: '',
      // 日程类型列表
      dayTypeListData: [],
      // 城市选择器数据
      optionsCity: cities,
      district: '', // 区域名称
      district_code: '', // 区域代码
      drawerLoading: false,
      // 日程添加数据
      schName: '',
      tiemQuan: '',
      startTime: '',
      endTime: '',
      during: '',
      duringType: 1,
      dayTypeId: '',
      schLine: '',
      carTypeId: '',
      // province: 'string',
      // city: 'string',
      // area: 'string',
      remark: '',
      deptId: '',
      schNum: '',
      // 日程详情
      preEditSchedule: '',
      // 组别列表
      deptIdList: [
        {
          value: 105,
          label: '沃尔沃'
        },
        {
          value: 110,
          label: '吉利'
        },
        {
          value: 153,
          label: '长城'
        }
      ],
      carTypeIdList: [],
      // carSeriesList: [],
      carSeriesId: []
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // console.log(this.$route.params.id)
    ///////// 获取预约日程列表 start /////////
    this.getOwnerScheduleList()
    ///////// 获取日程类型列表 start /////////
    this.getDayTypeList()
    ///////// 获取车型列表 start /////////
    this.getCarSeriesLists()
    // this.carSeriesList = this.$parent.carSeriesList
    // console.log(this.carSeriesList)
  },
  // 方法
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 获取城市名称 end /////////
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
    ///////// 获取城市名称 end /////////

    ///////// 获取预约日程列表 start /////////
    getOwnerScheduleList() {
      let data = {
        vehicleOwnerId: this.ownerId
      }
      this.$axios
        .post('/ocarplay/api/vehicleOwner/ownerScheduleListAjax', data)
        .then(res => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            data.items.forEach(element => {
              element.startGetTime = new Date(
                element.startTime.replace(/-/g, '/')
              ).getTime()
              element.endGetTime =
                new Date(element.endTime.replace(/-/g, '/')).getTime() +
                2 * 8 * 60 * 60 * 1000
            })

            this.ownerScheduleListData = data.items
            // console.log(this.ownerScheduleListData)
          }
        })
    },
    ///////// 获取预约日程列表 end /////////

    ///////// 获取日程类型列表 start /////////
    getDayTypeList() {
      // this.loading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 100
      }
      this.$axios
        .post('/ocarplay/api/dayType/listAjaxUnPage', data)
        .then(res => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            let data = res.data
            let dayTypeListData = []
            data.forEach(element => {
              dayTypeListData.push({
                value: element.dayTypeId,
                label: element.dayTypeName
              })
            })
            this.dayTypeListData = dayTypeListData
          }
        })
    },
    ///////// 获取日程类型列表 end /////////

    ///////// 获取车型列表 start /////////
    getCarSeriesLists() {
      // this.listLoading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 30
      }
      this.$axios.post('/ocarplay/api/carType/getCarTypes', data).then(res => {
        // console.log(res)
        // this.listLoading = false
        if (res.status == 200) {
          let data = res.data.data
          let carTypeIdList = []
          data.forEach(element => {
            carTypeIdList.push({
              value: element.carTypeId,
              label: element.carTypeName
            })
          })

          this.carTypeIdList = carTypeIdList
          // console.log(carSeriesListData)
        }
      })
    },
    ///////// 获取车型列表 end /////////

    ///////// 新建日程 start /////////
    saveOwnerSchedule() {
      this.drawerLoading = true
      let district = this.district
      let data = {
        ownerId: this.ownerId,
        schName: this.schName,
        startTime: this.$date0(this.tiemQuan[0]),
        endTime: this.$date0(this.tiemQuan[1]),
        during: this.during,
        duringType: this.duringType,
        dayTypeId: this.dayTypeId,
        schLine: this.schLine,
        // province: this.district[],
        // city: 'string',
        // area: 'string',
        remark: this.remark

        // placeTypeId: 0,
        // address: 'string',
        // carTypeId: 0,
        // carTypeName: 'string',
        // createTime: {},
        // dayTypeName: 'string',
        // deleteFlag: true,
        // deptId: 0,
        // deptName: 'string',
        // doUserId: 0,
        // endTime: {},
        // isDo: true,
        // schId: 0,
        // schNum: 0,
      }
      if (district.length == 2) {
        data.province = ''
        data.city = this.district[0]
        data.area = this.district[1]
      } else {
        data.province = this.district[0]
        data.city = this.district[1]
        data.area = this.district[2]
      }
      this.$axios
        .post('/ocarplay/api/schedule/saveOrUpdate', data)
        .then(res => {
          console.log(res)
          if (res.status == 200 && res.data.errcode == 0) {
            this.$message.success(res.data.msg)
            this.drawerLoading = false
            this.addSchedule = false
            ///////// 获取日程列表 start /////////
            this.getOwnerScheduleList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    ///////// 新建日程 end /////////

    ///////// 下单预约 start /////////
    schedulePlaceOrder() {
      this.drawerLoading = true
      let district = this.district
      let data = {
        // ownerId: this.ownerId,
        schId: this.preEditSchedule.schId,
        deptId: this.carSeriesId[0],
        carTypeId: this.carSeriesId[1],
        schNum: this.schNum
      }

      this.$axios.post('/ocarplay/api/schedule/placeOrder', data).then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.$message.success(res.data.msg)
          this.drawerLoading = false
          this.scheduleRecord = false
          ///////// 获取日程列表 start /////////
          this.getOwnerScheduleList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    ///////// 下单预约 end /////////

    ///////// 确认 start /////////
    submit() {
      this.$confirm('确认提交任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
    },
    ///////// 确认 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
    },
    ///////// 分页 end /////////

    ///////// 打开新建日程 start /////////
    openAddSchedule() {
      this.addSchedule = true
    },
    ///////// 打开新建日程 end /////////

    ///////// 打开日程详情 start /////////
    scheduleDetail(id) {
      this.scheduleRecord = true
      let data = {
        schId: id
      }
      this.$axios
        .post('/ocarplay/api/schedule/preEditSchedule', data)
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            let data = res.data
            this.preEditSchedule = data
            // console.log(this.ownerScheduleListData)
          }
        })
    }
    ///////// 打开日程详情 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#ownersschedule {
  height: 100%;
  .el-select,
  .el-cascader {
    width: 100%;
  }
  .top {
    height: 88px;
    // margin-bottom: 9px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .cont {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .left {
      justify-content: flex-start;
      font-size: 22px;
      padding-left: 36px;
      div {
        cursor: pointer;
      }
      i {
        font-weight: bold;
      }
    }
    .center {
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }
    .right {
      justify-content: flex-end;
      padding-right: 36px;
      color: $icoColor;
      font-size: 13px;
      div {
        text-align: center;
        cursor: pointer;
      }
      i {
        font-size: 28px;
      }
    }
  }
  .content {
    $isColor: #1989fa;
    height: calc(100% - 88px);
    background: #fff;
    overflow: hidden;
    .openAddBox {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      .openAdd {
        width: 150px;
        height: 36px;
        line-height: 36px;
        background: #eee;
        text-align: center;
        cursor: pointer;
        margin-right: 36px;
      }
    }
    .is-selected {
      color: $isColor;
    }
    .box {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      align-content: space-between;
      .time {
        width: 100%;
      }

      .schedule {
        margin: 0 auto;
        width: 90%;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        text-align: center;
        background: $isColor;
        color: #fff;
      }
    }
  }

  // 日程预约样式
  .scheduleRecord {
    box-sizing: border-box;
    padding: 20px;
    padding-top: 0;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    > .el-col {
      margin-bottom: 24px;
      font-size: 18px;
    }
    .appoin {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    .keycontent {
      align-self: flex-start;
    }
    .el-input,
    button {
      width: 100%;
    }
  }

  // 新建日程样式
  .addSchedule {
    box-sizing: border-box;
    padding: 20px;
    padding-top: 0;
    height: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    > .el-col {
      margin-bottom: 24px;
      font-size: 18px;
    }
    .keycontent {
      align-self: flex-start;
    }
    .el-input,
    button {
      width: 100%;
    }
    .input-with-select {
      .el-select {
        width: 81px;
      }
    }
  }
  .key {
    // width: 96px;
    height: 40px;
    line-height: 40px;
    // margin-right: 13px;
    text-align: justify;
    box-sizing: border-box;
  }
  .key:after {
    display: inline-block;
    content: '';
    padding-left: 100%;
  }
  .btn {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
