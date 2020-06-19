<template>
  <div id="taskdetail">
    <!-- 内容列表 start -->
    <el-row class="content">
      <!-- <el-col :span="2" class="title">返回</el-col> -->
      <el-col :span="24" class="title">
        <el-col :span="6" class="previousBox">
          <div @click="previous">
            <i class="el-icon-arrow-left"></i>
            返回
          </div>
        </el-col>
        <el-col :span="12">任务详情</el-col>
      </el-col>
      <el-col :span="12" class="left">
        <el-col :span="24" class="list">
          <div class="key">任务名称</div>
          <div class="val">{{taskDetail.taskName}}</div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">任务状态</div>
          <div class="val">
            <template v-if="taskDetail.status==0">执行中</template>
            <template v-else-if="taskDetail.status==1">审核中</template>
            <template v-else-if="taskDetail.status==2">已完成</template>
            <template v-else-if="taskDetail.status==3">延期</template>
            <template v-else-if="taskDetail.status==4">人工延期</template>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">品牌车型</div>
          <div class="val">
            <div
              v-for="(item, index) in taskDetail.listInvite"
              :key="index"
            >{{item.listOwnerType[0].typeName}}—{{item.listOwnerItem[0].itemName}}—{{item.realName}}</div>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">计划周期</div>
          <div class="val">{{taskDetail.startTime}}---{{taskDetail.endTime}}</div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">计划邀约量</div>
          <div class="val">{{taskDetail.num}}</div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">创建人</div>
          <div class="val">解雨臣</div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">备注</div>
          <div class="val">{{taskDetail.remark}}</div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">品牌车型</div>
          <div class="val">{{taskDetail.carSeriesName}}</div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">完成时间</div>
          <div class="val">{{taskDetail.overTime}}</div>
        </el-col>
      </el-col>
      <el-col :span="12" class="right">
        <el-col :span="24" class="list">
          <div class="key">任务描述</div>
          <div class="val">
            {{taskDetail.taskDesc}}
            <!-- <div class="text">
              <span>邀约目的:活跃论坛</span>
            </div>
            <div class="text">
              <span>参与资格:xxxx</span>
            </div>
            <div class="text">
              <span>字数要求:xxxx</span>
            </div>
            <div class="text">
              <span>帖子类型:xxxxxxx</span>
            </div>
            <div class="text">
              <span>费用情况:xxxxx</span>
            </div>
            <div class="text">
              <span>其他说明:xxxxxxxxxxxxxxxxxx</span>
            </div>-->
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">任务文件</div>
          <div class="val">
            <div v-for="(item, index) in (taskDetail.listTaskFile)" :key="index">
              <img src="static/images/document/ppt.png" width="20" alt />&nbsp;
              <el-link @click="download(item)">{{item.fileName}}</el-link>
            </div>
            <!-- <div>
              <img src="static/images/document/ppt.png" width="20" alt />&nbsp;2020年6月-长城-#校服女神#创意标准文件
            </div>-->
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">结算清单</div>
          <div class="val">暂无</div>
        </el-col>
      </el-col>
      <el-col :span="24" class="btn">
        <el-button type="primary" @click="sendInvitation">发送邀请函</el-button>
        <el-button type="primary" @click="toAddtask">复制任务</el-button>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'taskdetail',
  components: {},
  data() {
    return {
      // 任务ID
      taskId: 1,
      taskDetail: {}
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // 任务ID
    this.taskId = this.$route.params.id
    ///////// 获取任务详情 start /////////
    this.getTaskDetails()
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    ///////// 获取任务详情 start /////////
    getTaskDetails() {
      let data = {
        taskId: this.$route.params.id
      }
      this.$axios.post('/ocarplay/task/edit', data).then(res => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data

          // data.typeList = []
          // data.ownerItemList = []
          // data.ownerName = []
          // data.listInvite.forEach(element => {
          //   data.typeList.push(element.listOwnerType[0].typeName)
          //   data.ownerItemList.push(element.listOwnerItem[0].itemName)
          //   data.ownerName.push(element.realName)
          // })
          // data.typeList = element.typeList.join(',')
          //   data.ownerItemList = element.ownerItemList.join(',')
          //   data.ownerName = element.ownerName.join(',')
          // console.log(data)
          this.taskDetail = data
        }
      })
    },
    ///////// 获取任务详情 end /////////

    ///////// 跳转新增任务页面 end /////////
    toAddtask() {
      let id = this.taskId
      this.$router.push({
        path: '/home/addTask',
        query: { type: 2, id: id }
      })
    },
    ///////// 跳转新增任务页面 end /////////

    ///////// 发送邀请函 start /////////
    sendInvitation() {
      let data = {
        taskId: this.taskId
      }
      this.$axios.post('/ocarplay/task/sendInvitation', data).then(res => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.errcode == 0) {
            this.$message.success(res.data.msg)
          }else{
            this.$message.error(res.data.msg)
          }
        }
      })
    },
    ///////// 发送邀请函 end /////////

    download(row) {
      let localPath = row.localPath
      let a = document.createElement('a')
      a.download = `${row.fileName}.${row.suffix}`
      // a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.setAttribute('href', 'http://176.10.10.235:8080/ocarplay/' + localPath)
      a.click()
    }
  }
}
</script>
<style lang="scss" scoped>
#taskdetail {
  height: 100%;
  background: white;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 36px;
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 0;
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
        line-height: 40px;
        .text {
          height: 32px;
          line-height: 32px;
        }
      }
    }
    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 24px;
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
        .val {
          .text {
            line-height: 40px;
          }
        }
      }
    }
    .btn {
      position: absolute;
      bottom: 24px;
      left: 0;
      text-align: center;
      button {
        width: 136px;
        margin-left: 49px;
      }
    }
  }
}
</style>
