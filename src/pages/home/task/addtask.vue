<template>
  <div id="addTask">
    <!-- 内容列表 start -->
    <el-row class="content" v-loading="putLoading">
      <el-col :span="24" class="title">
        <el-col :span="6" class="previousBox">
          <div @click="previous">
            <i class="el-icon-arrow-left"></i>
            返回
          </div>
        </el-col>
        <el-col :span="12">{{title}}</el-col>
      </el-col>
      <el-col :span="12" class="left">
        <el-col :span="24" class="list">
          <div class="key">任务名称</div>
          <div class="val">
            <el-input placeholder="请输入内容" v-model="taskName" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">任务对象</div>
          <div class="val">
            <el-cascader
              :options="options2"
              :props="props"
              v-model="listInviteList"
              clearable
              filterable
            ></el-cascader>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">品牌车型</div>
          <div class="val">
            <el-cascader v-model="carSeriesId" :options="carSeriesList" clearable filterable></el-cascader>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">计划周期</div>
          <div class="val">
            <el-date-picker
              v-model="periodTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">计划邀约量</div>
          <div class="val">
            <el-input placeholder="请输入内容" v-model="taskNum" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">任务文件</div>
          <div class="val">
            <el-upload
              class="upload-demo"
              action="/ocarplay/file/upload"
              :on-remove="taskFileRemove"
              :on-success="taskFileSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </div>
        </el-col>
      </el-col>
      <el-col :span="12" class="right">
        <el-col :span="24" class="list">
          <div class="key">任务描述</div>
          <div class="val valList">
            <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="taskDesc"></el-input>
            <!-- <div class="miKey">邀约目的:</div>
            <el-input placeholder="请输入内容" v-model="taskDesc.input1"></el-input>
            <div class="miKey">参与资格:</div>
            <el-input placeholder="请输入内容" v-model="taskDesc.input2"></el-input>
            <div class="miKey">字数要求:</div>
            <el-input placeholder="请输入内容" v-model="taskDesc.input3"></el-input>
            <div class="miKey">帖子类型:</div>
            <el-input placeholder="请输入内容" v-model="taskDesc.input4"></el-input>
            <div class="miKey">费用情况:</div>
            <el-input placeholder="请输入内容" v-model="taskDesc.input5"></el-input>
            <div class="miKey">其他说明:</div>
            <el-input placeholder="请输入内容" v-model="taskDesc.input6"></el-input>-->
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">备注</div>
          <div class="val">
            <el-input placeholder="请输入内容" v-model="remark" clearable></el-input>
          </div>
        </el-col>
      </el-col>
      <el-col :span="24" class="put">
        <el-button type="primary" @click="saveTask">提交</el-button>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'addTask',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId,
      // 页面类型
      taskId: '',
      type: 0,
      title: '新建任务',
      // 任务名称
      options2: [],
      input: '',
      input1: '',
      // 任务对象选择数据
      input2: '',
      textarea: '',
      props: { multiple: true },
      carSeriesList: [],
      // 品牌车型
      input3: '',
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
      // 计划周期
      input4: '',
      // 计划邀约量
      input5: '',
      // 文件上传
      fileList: [],
      // 任务新增信息
      taskName: '',
      listInviteList: [],
      carSeriesList: [],
      carSeriesId: [],
      periodTime: [],
      taskNum: '',
      listTaskFile: [],
      taskDesc: '',
      remark: '',
      taskFileList: '',
      // 按钮开关
      submitFlag: true,
      putLoading: false
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 接受页面传参 start /////////
    this.getQuery()
    ///////// 获取车型列表 start /////////
    this.getCarSeriesLists()
    ///////// 获取车主列表 start /////////
    this.getOwnerList()
  },
  // 方法事件
  methods: {
    ///////// 接受页面传参 start /////////
    getQuery() {
      let type = this.$route.query.type
      let id = this.$route.query.id
      this.type = type
      if (type == 0) {
        this.title = '新建任务'
        this.taskId = ''
      } else if (type == 1) {
        this.title = '编辑任务'
        this.taskId = id
        ///////// 获取任务详情 start /////////
        this.getTaskDetail(id)
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 获取任务详情 start /////////
    getTaskDetail(id) {
      let data = {
        taskId: id
      }
      this.$axios.post('/ocarplay/task/edit', data).then(res => {
        console.log(res)
        if (res.status == 200) {
          let data = res.data
          this.taskName = data.taskName
        }
      })
    },
    ///////// 获取任务详情 end /////////

    ///////// 获取车主列表 start /////////
    getOwnerList() {
      // this.listLoading = true
      let data = {}
      this.$axios
        .post('/ocarplay/api/vehicleOwner/ownerTypeCoopItemOwners', data)
        .then(res => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            let list = []
            data.forEach((element, i) => {
              list.push({
                value: element.typeId,
                label: element.typeName,
                children: []
              })
              element.ownerItems.forEach((element1, j) => {
                list[i].children.push({
                  value: element1.itemId,
                  label: element1.itemName,
                  children: []
                })
                element1.vehicleOwners.forEach(element2 => {
                  list[i].children[j].children.push({
                    value: element2.vehicleOwnerId,
                    label: element2.name
                  })
                  // console.log(list[i].children[j])
                })
              })
            })

            this.options2 = list
            // console.log(list)
          }
        })
    },
    ///////// 获取车主列表 end /////////

    ///////// 获取车型列表 start /////////
    getCarSeriesLists() {
      // this.listLoading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 30
      }
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', data)
        .then(res => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            let data = res.data.items

            let carSeriesList = [
              {
                value: 105,
                label: '沃尔沃',
                children: []
              },
              {
                value: 110,
                label: '吉利舆情',
                children: []
              },
              {
                value: 153,
                label: '长城',
                children: []
              }
            ]
            data.forEach(element => {
              let data = {
                value: element.carTypeId,
                label: element.carTypeName,
                children: []
              }
              let carSeriesIds = element.carSeriesIds.split('/')
              let carSeriesName = element.carSeriesName.split('/')
              carSeriesIds.forEach((element, i) => {
                data.children.push({
                  value: element * 1,
                  label: carSeriesName[i]
                })
                // console.log(element)
              })
              // console.log(carSeriesIds)
              if (element.deptId == 105) {
                carSeriesList[0].children.push(data)
              } else if (element.deptId == 110) {
                carSeriesList[1].children.push(data)
              } else if (element.deptId == 153) {
                carSeriesList[2].children.push(data)
              }
            })
            this.carSeriesList = carSeriesList
            // console.log(carSeriesList)
          }
        })
    },
    ///////// 获取车型列表 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.push({
        path: '/home/task'
      })
    },
    ///////// 返回上一页 end /////////

    ///////// 文件上传 start /////////
    // 上传成功回调
    taskFileSuccess(res, file, fileList) {
      // this.taskFileList = res
      let list = []
      fileList.forEach(element => {
        list.push(element.response.data)
        // console.log(element.response)
      })
      this.taskFileList = list
      // console.log(res)
      // console.log(file)
      // console.log(fileList)
      // console.log(list)
    },
    // 删除成功回调
    taskFileRemove(file, fileList) {
      let list = []
      fileList.forEach(element => {
        list.push(element.response.data)
      })
      this.taskFileList = list
    },
    // taskExceed(files, fileList) {
    //   this.$message.warning('只允许上传一个文件')
    // },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    ///////// 文件上传 end /////////

    ///////// 新增任务 start /////////
    // （0-进行中，1-结算中，2-完成，3-延期，4-人工延期
    saveTask() {
      let periodTime = this.periodTime
      let startTime = ''
      let endTime = ''
      if (periodTime.length != 0) {
        startTime = this.$date0(periodTime[0])
        endTime = this.$date0(periodTime[1])
      }
      // let taskDesc = this.taskDesc
      // let taskDesc0 = `${taskDesc.input1}${taskDesc.input2}${taskDesc.input3}${taskDesc.input4}${taskDesc.input5}${taskDesc.input6}`
      let listInviteList = this.listInviteList
      let data = {
        initUserId: this.userId,
        deptId: this.deptId,
        createTime: this.$time0(new Date()),
        taskName: this.taskName,
        status: 0,
        startTime: startTime,
        endTime: endTime,
        num: this.taskNum,

        carSeriesId: this.carSeriesId[2],
        taskDesc: this.taskDesc,
        remark: this.remark,
        listInvite: [],
        listTaskFile: this.taskFileList
      }

      listInviteList.forEach(element => {
        data.listInvite.push({
          typeId: element[0],
          itemId: element[1],
          ownerId: element[2]
        })
      })
      let flag = true
      let list = [
        data.taskName,
        data.startTime,
        data.num,
        data.carSeriesId,
        data.taskDesc,
        data.remark,
        data.listInvite.length,
        data.listTaskFile.length
      ]

      list.forEach(element => {
        if (!element) {
          flag = false
        }
      })

      console.log(data)
      if (flag) {
        this.putLoading = true
        this.$axios
          .post('/ocarplay/task/save', data)
          .then(res => {
            // console.log(res)
            if (res.status == 200 && res.data == 1) {
              this.$message.success('任务新建成功！')
              setTimeout(() => {
                this.$router.push({
                  name: 'task'
                })
              }, 1000)
            } else {
              this.$message.error('任务新建失败！')
              this.putLoading = false
            }
          })
          .catch(res => {
            console.log(res)
            this.putLoading = false
          })
      } else {
        this.$message.error('请检查信息是否填写完整！')
      }
    },
    ///////// 新增任务 start /////////

    ///////// 消息提示 start /////////
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success'
      })
    },
    messageWarning(message) {
      // 警告提示
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    }
    ///////// 消息提示 end /////////
  }
}
</script>
<style lang="scss" scoped>
#addTask {
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
        .valList {
          box-sizing: border-box;
          // border: 1px solid #dcdfe6;
          // border-radius: 4px;
          // padding: 16px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          > div {
            margin-bottom: 9px;
          }
          .miKey {
            font-size: 14px;
            color: #aaa;
          }
          .el-input {
            width: calc(100% - 64px);
          }
        }
      }
    }
    .put {
      position: absolute;
      bottom: 24px;
      left: 0;
      text-align: center;
      button {
        width: 136px;
      }
    }
  }
}
</style>
<style lang="scss">
.right {
  .list {
    .valList {
      .el-input {
        .el-input__inner {
          border: none;
        }
      }
    }
  }
}
</style>
