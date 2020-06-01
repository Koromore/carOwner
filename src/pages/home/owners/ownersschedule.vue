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
      <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template slot="dateCell" slot-scope="{date, data}">
          <p
            :class="data.isSelected ? 'is-selected' : ''"
          >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
        </template>
      </el-calendar>
    </el-row>
    <!-- 内容列表 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <el-drawer title="日程预约" :visible.sync="scheduleRecord" size="572px">
      <el-row class="scheduleRecord">
        <el-col :span="4">任务名称:</el-col>
        <el-col :span="20">日常超精拍摄邀约</el-col>
        <el-col :span="4">开始时间:</el-col>
        <el-col :span="20">2020-05-01 15:00</el-col>
        <el-col :span="4">时长:</el-col>
        <el-col :span="20">5小时</el-col>
        <el-col :span="4">类型:</el-col>
        <el-col :span="20">日常邀约拍摄</el-col>
        <el-col :span="4">路线:</el-col>
        <el-col :span="20">xxxxxxxx</el-col>
        <el-col :span="4">地点:</el-col>
        <el-col :span="20">湖北省武汉市洪山区</el-col>
        <el-col :span="4">备注:</el-col>
        <el-col :span="20">xxxxxxxx</el-col>
        <el-col :span="4">预约车主:</el-col>
        <el-col :span="20">xxxxxxxx</el-col>

        <el-col :span="24" class="btn">
          <el-col :span="8" :offset="3">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-button type="primary">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗提交任务 end -->

    <!-- 抽屉弹窗提交任务 start -->
    <el-drawer title="新建日程" :visible.sync="addSchedule" size="572px">
      <el-row class="addSchedule">
        <el-col :span="4">日程主题:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </el-col>
        <el-col :span="4">开始时间:</el-col>
        <el-col :span="18">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="4">时长:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-select v-model="select" slot="append" placeholder="选择">
              <el-option label="时" value="1"></el-option>
              <el-option label="天" value="2"></el-option>
              <el-option label="月" value="3"></el-option>
            </el-select>
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
          </el-input>
        </el-col>
        <el-col :span="4">类型:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </el-col>
        <el-col :span="4">路线:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </el-col>
        <el-col :span="4">地点:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </el-col>
        <el-col :span="4">备注:</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
        </el-col>

        <el-col :span="24" class="btn">
          <el-col :span="8" :offset="3">
            <el-button type="info">取消</el-button>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-button type="primary">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉弹窗提交任务 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'ownersschedule',
  components: {},
  data() {
    return {
      // 日程记录
      scheduleRecord: false,
      input: '',
      value1: '',
      addSchedule: true,
      prepend: '1',
      select: ''
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    this.foreach()
  },
  // 方法
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.push({
        path: '/home/owners'
      })
    },
    ///////// 返回上一页 end /////////

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
    }
    ///////// 分页 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#ownersschedule {
  height: 100%;
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
    height: calc(100% - 88px);
    background: #fff;
    .is-selected {
      color: #1989fa;
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
    .el-col {
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
  }

  // 新建日程样式
  .addSchedule {
    box-sizing: border-box;
    padding: 20px;
    padding-top: 0;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    .el-col {
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
    .input-with-select{
      .el-select {
        width: 81px;
      }
    }
  }
}
</style>
