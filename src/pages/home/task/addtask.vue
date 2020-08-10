<template>
  <div id="addTask">
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
          <el-col :span="12">{{title}}</el-col>
        </el-col>
        <el-col :span="12" class="left">
          <el-col :span="24" class="list">
            <div class="key">任务类型</div>
            <div class="val">
              <el-radio-group v-model="taskType">
                <el-radio :label="1">借车</el-radio>
                <el-radio :label="2">素材</el-radio>
                <el-radio :label="3">邀约</el-radio>
                <el-radio :label="4">拍摄</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">任务名称</div>
            <div class="val">
              <el-input
                placeholder="请输入内容"
                v-model="taskName"
                clearable
                :disabled="!disabledCaigou"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">品牌车型</div>
            <div class="val">
              <el-cascader
                v-model="carSeriesId"
                :props="props"
                :options="carSeriesList"
                clearable
                filterable
                collapse-tags
                @change="carSeriesChange"
                :disabled="!disabledCaigou"
              ></el-cascader>
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
                collapse-tags
                :disabled="!disabledCaigou"
              ></el-cascader>
            </div>
          </el-col>
          <!-- 摄影填写 start -->
          <el-col :span="24" v-show="taskType==4">
            <el-col :span="24" class="list">
              <div class="key">摄影师</div>
              <div class="val">
                <el-select v-model="personId" placeholder="请选择" :disabled="disabledCaigou">
                  <el-option
                    v-for="item in cameraList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">模特</div>
              <div class="val">
                <!-- <el-cascader
                  :options="modelList"
                  v-model="modelId"
                  clearable
                  filterable
                  collapse-tags
                  :disabled="disabledCaigou"
                ></el-cascader> -->
                <el-select v-model="modelId" placeholder="请选择" :disabled="disabledCaigou">
                  <el-option
                    v-for="item in modelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">场地</div>
              <div class="val">
                <!-- <el-cascader
                  :options="placeList"
                  v-model="placeId"
                  clearable
                  filterable
                  collapse-tags
                  :disabled="disabledCaigou"
                ></el-cascader> -->
                <el-select v-model="placeId" placeholder="请选择" :disabled="disabledCaigou">
                  <el-option
                    v-for="item in placeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
          </el-col>
          <!-- 摄影填写 end -->
          <el-col :span="24" class="list">
            <div class="key">计划周期</div>
            <div class="val">
              <el-date-picker
                v-model="periodTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="!disabledCaigou"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">计划邀约量</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="taskNum" clearable :disabled="!disabledCaigou"></el-input>
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
                :file-list="fileList"
                :disabled="!disabledCaigou"
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
              <el-input
                type="textarea"
                :rows="7"
                placeholder="请输入内容"
                v-model="taskDesc"
                :disabled="!disabledCaigou"
              ></el-input>
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
              <el-input placeholder="请输入内容" v-model="remark" clearable :disabled="!disabledCaigou"></el-input>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24" class="put">
          <el-button type="primary" @click="saveTask">提交</el-button>
        </el-col>
      </el-scrollbar>
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
      deptId: this.$store.state.user.deptId, // 90
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
      // 摄影师  模特  场地
      options3: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      cameraList: [], // 摄影师列表
      modelList: [], // 模特列表
      placeList: [], // 场地列表
      personId: null,
      modelId: null,
      placeId: null,
      disabledCaigou: false,
      // 品牌车型
      input3: '',
      options: [],
      // 计划周期
      input4: '',
      // 计划邀约量
      input5: '',
      // 文件上传
      fileList: [],
      // 任务新增信息
      taskType: '',
      taskName: '',
      listInviteList: [],
      carSeriesList: [],
      carSeriesId: [],
      seriesId: [],
      periodTime: [],
      taskNum: '',
      listTaskFile: [],
      taskDesc: '',
      remark: '',
      taskFileList: [],
      fileList: [],
      // 按钮开关
      submitFlag: true,
      putLoading: false,
    }
  },
  // 侦听器
  watch: {
    carSeriesList: function (newData, oldData) {
      if (newData.length != 0) {
        this.getCarSeriesId()
      }
    },
    seriesId: function (newData, oldData) {
      if (newData != '') {
        this.getCarSeriesId()
      }
    },
    carSeriesId: function (newData, oldData) {
      if (newData != '') {
        // console.log(res)
        let data = []
        newData.forEach((element) => {
          data.push(element[1])
        })
        ///////// 获取车主列表 start /////////
        this.getOwnerList(data)
      }
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 接受页面传参 start /////////
    this.getQuery()
    ///////// 获取车型列表 start /////////
    this.getCarSeriesLists()
    ///////// 判断部门 start /////////
    this.isDeptId()
    ///////// 获取摄影师列表 start /////////
    this.getlistPhotoPerson()
    ///////// 获取模特列表 start /////////
    this.getlistModel()
    ///////// 获取场地列表 start /////////
    this.getPlaceList()
  },
  // 方法事件
  methods: {
    ///////// 接受页面传参 start /////////
    isDeptId() {
      if (this.deptId == 90) {
        this.disabledCaigou = false
      } else {
        this.disabledCaigou = true
      }
    },
    ///////// 接受页面传参 end /////////

    ///////// 接受页面传参 start /////////
    getQuery() {
      let type = this.$route.query.type
      let id = this.$route.query.id
      this.type = type
      if (type == 0) {
        this.title = '新增任务'
        this.taskId = ''
      } else if (type == 1) {
        this.title = '编辑任务'
        this.taskId = id
        ///////// 获取任务详情 start /////////
        this.getTaskDetail(id)
      } else if (type == 2) {
        this.title = '新增任务'
        // this.taskId = id
        ///////// 获取任务详情 start /////////
        this.getTaskDetail(id)
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 车型选择改变 end /////////
    carSeriesChange(res) {
      // console.log(res)
      let data = []
      res.forEach((element) => {
        data.push(element[1])
      })
      ///////// 获取车主列表 start /////////
      this.getOwnerList(data)
    },
    ///////// 接受页面传参 end /////////

    ///////// 循环查找品牌车型 start /////////
    getCarSeriesId() {
      // console.log(this.seriesId)
      let carSeriesId = []

      this.carSeriesList.forEach((element0) => {
        element0.children.forEach((element1) => {
          this.seriesId.forEach((element2) => {
            if (element1.value == element2) {
              carSeriesId.push([element0.value, element1.value])
            }
          })
        })
      })
      this.carSeriesId = carSeriesId
      // console.log(carSeriesId)
    },
    ///////// 循环查找品牌车型 start /////////

    ///////// 获取摄影师列表 start /////////
    getlistPhotoPerson() {
      let data = {
        pageNum: 1,
        pageSize: 1000,
      }
      this.$axios
        .post('/ocarplay/api/photoPerson/listAjax', data)
        .then((res) => {
          // console.log(res)
          this.listLoading = false
          if (res.status == 200) {
            let data = res.data.items
            let cameraList = []
            data.forEach((element) => {
              cameraList.push({
                value: element.personId,
                label: element.name,
              })
            })
            this.cameraList = cameraList
            // this.total = data.totalRows
          }
        })
    },
    ///////// 获取摄影师列表 end /////////

    ///////// 获取模特列表 start /////////
    getlistModel() {
      let data = {
        pageNum: 1,
        pageSize: 1000,
      }
      this.$axios.post('/ocarplay/api/model/listAjax', data).then((res) => {
        // console.log(res)
        this.listLoading = false
        if (res.status == 200) {
          let data = res.data.items
          let modelList = []
          data.forEach((element) => {
            modelList.push({
              value: element.modelId,
              label: element.name,
            })
          })
          this.modelList = modelList
          // this.total = data.totalRows
        }
      })
    },
    ///////// 获取模特列表 end /////////

    ///////// 获取场地列表 start /////////
    getPlaceList() {
      this.listLoading = true
      let data = {
        pageNum: 1,
        pageSize: 1000,
      }
      this.$axios.post('/ocarplay/api/place/listAjax', data).then((res) => {
        // console.log(res)
        this.listLoading = false
        // this.drawerAdd = false
        if (res.status == 200) {
          let data = res.data.items
          let placeList = []
          data.forEach((element) => {
            placeList.push({
              value: element.placeId,
              label: element.placeName,
            })
          })
          this.placeList = placeList
        }
      })
    },
    ///////// 获取场地列表 end /////////

    ///////// 获取任务详情 start /////////
    getTaskDetail(id) {
      let data = {
        taskId: id,
      }
      this.$axios.post('/ocarplay/task/edit', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data.data
          this.taskName = data.taskName
          this.taskType = data.taskType
          let listInviteList = []
          data.listInvite.forEach((element) => {
            listInviteList.push([
              element.listOwnerType[0].typeId,
              element.listOwnerItem[0].itemId,
              element.ownerId,
            ])
          })

          this.listInviteList = listInviteList
          // this.carSeriesId = [null,null,data.carSeriesId]
          data.listTaskOfCartype.forEach((element) => {
            this.seriesId.push(element.cartypeId)
          })

          this.periodTime = [
            new Date(data.startTime.replace(/-/g, '/')),
            new Date(data.endTime.replace(/-/g, '/')),
          ]
          this.taskNum = data.num
          this.taskDesc = data.taskDesc
          this.remark = data.remark
          let fileList = []
          let taskFileList = []

          data.listTaskFile.forEach((element) => {
            fileList.push({
              name: element.fileName,
              url: element.localPath,
            })
            taskFileList.push({
              fileName: element.fileName,
              localPath: element.localPath,
              suffix: element.suffix,
            })
          })
          this.fileList = fileList
          this.taskFileList = taskFileList
        }
      })
    },
    ///////// 获取任务详情 end /////////

    ///////// 获取车主列表 start /////////
    getOwnerList(data) {
      // this.listLoading = true
      // let data = []
      this.$axios
        .post('/ocarplay/api/vehicleOwner/ownerTypeCoopItemOwners', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            let list = []
            data.forEach((element, i) => {
              list.push({
                value: element.typeId,
                label: element.typeName,
                children: [],
              })
              element.ownerItems.forEach((element1, j) => {
                list[i].children.push({
                  value: element1.itemId,
                  label: element1.itemName,
                  children: [],
                })
                element1.vehicleOwners.forEach((element2) => {
                  if (
                    element2.coopNum &&
                    element2.alreadyCooperateNum &&
                    element2.coopNum - element2.alreadyCooperateNum <= 0
                  ) {
                    // cosnole.log()
                    list[i].children[j].children.push({
                      value: element2.vehicleOwnerId,
                      label: element2.name,
                      disabled: true,
                    })
                  } else {
                    list[i].children[j].children.push({
                      value: element2.vehicleOwnerId,
                      label: element2.name,
                    })
                  }
                  // console.log(element2)
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
                label: '吉利',
                children: [],
              },
              {
                value: 153,
                label: '长城',
                children: [],
              },
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
        path: '/home/task',
      })
    },
    ///////// 返回上一页 end /////////

    ///////// 文件上传 start /////////
    // 上传成功回调
    taskFileSuccess(res, file, fileList) {
      // this.taskFileList = res
      let list = []
      fileList.forEach((element) => {
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
      fileList.forEach((element) => {
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
      let carSeriesId = this.carSeriesId
      let listTaskOfCartype = []
      carSeriesId.forEach((element) => {
        listTaskOfCartype.push({ cartypeId: element[1] })
      })
      let data = {
        initUserId: this.userId,
        deptId: this.deptId,
        createTime: this.$time0(new Date()),
        taskType: this.taskType,
        taskId: this.taskId,
        taskName: this.taskName,
        status: 0,
        startTime: startTime,
        endTime: endTime,
        num: this.taskNum,

        personId: this.personId,
        modelId: this.modelId,
        placeId: this.placeId,
        // typeId: this.carSeriesId[0],
        // carTypeId: this.carSeriesId[1],
        // carSeriesId: this.carSeriesId[2],
        listTaskOfCartype: listTaskOfCartype,
        taskDesc: this.taskDesc,
        remark: this.remark,
        listInvite: [],
        listTaskFile: this.taskFileList,
      }

      listInviteList.forEach((element) => {
        data.listInvite.push({
          typeId: element[0],
          itemId: element[1],
          ownerId: element[2],
        })
      })
      let flag = true
      let list = [
        data.taskName,
        data.startTime,
        data.num,
        data.listTaskOfCartype.length,
        data.listInvite.length,
      ]

      list.forEach((element) => {
        if (!element) {
          flag = false
        }
      })

      // console.log(data)
      if (flag) {
        this.putLoading = true
        this.$axios
          .post('/ocarplay/task/save', data)
          .then((res) => {
            // console.log(res)
            if (res.status == 200 && res.data == 1) {
              if (this.taskId) {
                this.$message.success('任务更新成功！')
              } else {
                this.$message.success('任务新建成功！')
              }
              setTimeout(() => {
                this.$router.push({
                  name: 'task',
                })
              }, 1000)
            } else {
              this.$message.error('任务新建失败！')
              this.putLoading = false
            }
          })
          .catch((res) => {
            // console.log(res)
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
#addTask {
  height: 100%;
  background: white;
  border-radius: 8px 8px 0 0;
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
      margin-bottom: 36px;
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
      background: white;
      position: absolute;
      bottom: 0;
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
