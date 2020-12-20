<template>
  <div id="reimbursement">
    <!-- 内容列表 start -->
    <el-row class="content" v-loading="putLoading">
      <el-scrollbar style="height: 100%">
        <el-col :span="24" class="title">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
          <el-col :span="12">{{ title }}</el-col>
        </el-col>
        <el-col :span="24" class="formBox">
          <el-form
            :model="fromData"
            :rules="fromRules"
            ref="fromData"
            label-width="100px"
            class="demo-fromData"
          >
            <el-form-item label="项目组" prop="input1">
              <el-select v-model="fromData.input1" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="input2">
              <el-select v-model="fromData.input2" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="input3">
              <el-radio-group v-model="fromData.input3">
                <el-radio label="1">专项</el-radio>
                <el-radio label="2">日常</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="科目" prop="input4">
              <el-select v-model="fromData.input4" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="input5">
              <el-select v-model="fromData.input5" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="采购单价" prop="input6">
              <el-input v-model="fromData.input6"></el-input>
            </el-form-item>
            <el-form-item label="采购数量" prop="input7">
              <el-input v-model="fromData.input7"></el-input>
            </el-form-item>
            <el-form-item label="有无发票" prop="input8">
              <el-radio-group v-model="fromData.input8">
                <el-radio label="0">无发票</el-radio>
                <el-radio label="1">有发票</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="产生时间" required>
              <el-form-item prop="input9">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="fromData.input9"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="备注" prop="input10">
              <el-input type="textarea" v-model="fromData.input10"></el-input>
            </el-form-item>
            <el-form-item label="付款方" prop="input11">
              <el-radio-group v-model="fromData.input11">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('fromData')"
                >立即创建</el-button
              >
              <el-button @click="resetForm('fromData')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24" class="putPlaceholder"></el-col>
        <el-col :span="24" class="put">
          <!-- <el-button type="primary" @click="saveTask">提交</el-button> -->
          <el-button
            type="primary"
            @click="submitForm('fromData')"
            class="SlideOpen"
            data-text="提交"
            ><span>提交</span></el-button>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'reimbursement',
  components: {},
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
    }
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId, // 90
      // 页面类型
      input1: null,
      taskId: '',
      type: 0,
      title: '报销',
      // 任务名称
      taskDetail: null,
      options2: [], // 任务对象（车主）
      noOwner: null, // 非车主信息
      input: '',
      input1: '',
      // 任务对象选择数据
      input2: '',
      textarea: '',
      props: { multiple: true, expandTrigger: 'hover' },
      carSeriesList: [],
      // 日期禁止
      pickerOptions: {},
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
      budgetApplyIdList: [], // 项目名称列表
      applyDetailIdList: [], // 预算明细列表
      personId: [],
      personIdList: [],
      modelId: [],
      modelIdList: [],
      placeId: null,
      disabledCaigou: false,
      // 品牌车型
      input3: '',
      options: [],
      // 计划周期
      input4: '',
      // 禁止选择当前时间之前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        },
      },
      // 计划邀约量
      input5: '',
      // 文件上传
      fileList: [],
      // 任务新增信息
      taskType: '',
      budgetApplyId: '',
      applyDetailId: '',
      taskName: '',
      listInviteList: [],
      listInviteOwners: [],
      listInvitePerson: [],
      listInviteModel: [],
      carSeriesList: [],
      carSeriesId: [],
      seriesId: [],
      periodTime: [],
      photoTime: null,
      taskNum: '',
      cost: null,
      listTaskFile: [],
      taskDesc: '',
      remark: '',
      taskFileList: [],
      fileList: [],
      // 预算明细选择弹窗
      applyDetailName: null,
      applyDetailId: null,
      subjectId: null,
      subItemsId: null,
      subjectTempId: null,
      subItemsName: null,

      applyDetailIdBoxShow: false,
      gridData: [],
      // 按钮开关
      submitFlag: true,
      putLoading: false,

      // 影视活动
      modelIf: null,
      cameraIf: null,
      restsIf: null,
      // 任务描述列表
      taskDescList: [
        {
          input1: null,
          input2: null,
          input3: null,
          input4: null,
          input5: null,
          input6: null,
        },
      ],

      fromData: {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: '',
        input11: '',
      },
      fromRules: {
        input1: [
          { required: true, message: '请选择项目组', trigger: 'change' },
        ],
        input2: [
          { required: true, message: '请选择项目名称', trigger: 'change' },
        ],
        input3: [{ required: true, message: '请选择类型', trigger: 'change' }],
        input4: [{ required: true, message: '请选择科目', trigger: 'change' }],
        input5: [
          { required: true, message: '请选择项目名称', trigger: 'change' },
        ],
        input6: [
          { required: true, message: '请输入采购单价', trigger: 'blur' },
        ],
        input7: [
          { required: true, message: '请输入采购数量', trigger: 'blur' },
        ],
        input8: [
          { required: true, message: '请选择有无发票', trigger: 'change' },
        ],
        input9: [
          { required: true, message: '请选择产生日期', trigger: 'blur' },
        ],
        input10: [
          { required: false, message: '请输入活动名称', trigger: 'blur' },
        ],
        input11: [
          { required: true, message: '请选择付款方', trigger: 'change' },
        ],
      },
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
    ///////// 判断部门 start /////////
    this.isDeptId()
    this.getOwnerListNo()
    ///////// 获取项目名称 start /////////
    this.getBudget()
    ///////// 获取预算明细 start /////////
    // this.getBudgetDetailByApplyId()
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
        this.title = '新建影视活动'
        this.taskId = ''
      } else if (type == 1) {
        this.title = '编辑影视活动'
        this.taskId = id
        ///////// 获取任务详情 start /////////
        this.getTaskDetail(id)
      } else if (type == 2) {
        this.title = '新建影视活动'
        // this.taskId = id
        ///////// 获取任务详情 start /////////
        this.getTaskDetail(id)
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 获取项目名称 start /////////
    getBudget() {
      let data = { userId: this.userId }
      this.$axios.post('/ocarplay/task/getBudget', data).then((res) => {
        // console.log(res)
        // this.listLoading = false
        if (res.status == 200) {
          this.budgetApplyIdList = res.data.data
        }
      })
    },
    ///////// 获取项目名称 end /////////

    chageBudgetApplyId(val) {
      if (!val) {
        this.applyDetailId = null
      }
      this.getBudgetDetailByApplyId(val)
    },

    ///////// 获取预算明细 start /////////
    getBudgetDetailByApplyId(id) {
      let data = { budgetApplyId: id }
      this.$axios
        .post('/ocarplay/task/getBudgetDetailByApplyId', data)
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            this.applyDetailIdList = res.data.data
            let applyDetailIdList = []
            res.data.data.forEach((element) => {
              if (element.remainNum > 0 && element.subjectId != 10) {
                applyDetailIdList.push(element)
              }
            })
            this.applyDetailIdList = applyDetailIdList
          }
        })
    },
    handleCurrentChange(val) {
      // this.currentRow = val;
      // console.log(val)
      this.applyDetailId = val.applyDetailId
      this.subjectId = val.subjectId
      this.subItemsId = val.subItemsId
      this.subjectTempId = val.subjectTempId
      this.subItemsName = val.subItemsName
      let remark = ''
      if (val.remark) {
        remark = val.remark
      }
      this.applyDetailName = val.subItemsName + remark
      // applyDetailId:applyDetail.applyDetailId,
      //   subjectId: applyDetail.subjectId,
      //   subItemsId:applyDetail.subItemsId,
      //   subjectTempId:applyDetail.subjectTempId,
      //   jsonData: jsonData,
      //   cost:this.cost,
      //   subItemsName:applyDetail.subjectName,
    },
    ///////// 获取预算明细 end /////////

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
              {
                deptId: 106,
                label: '东本',
                children: [],
              },
              {
                deptId: 117,
                label: '内容一组',
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
              } else if (element.deptId == 106) {
                carSeriesList[3].children.push(children)
              } else if (element.deptId == 117) {
                carSeriesList[4].children.push(children)
              }
            })
            this.carSeriesList = carSeriesList
            // console.log(carSeriesList)
          }
        })
    },
    ///////// 获取车型列表 end /////////

    ///////// 获取任务详情 start /////////
    getTaskDetail(id) {
      let data = {
        taskId: id,
      }
      this.$axios.post('/ocarplay/task/edit', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data.data
          this.taskDetail = data
          this.taskName = data.taskName
          this.taskType = data.taskType
          this.placeId = data.placeId
          this.budgetApplyId = data.budgetApplyId
          this.applyDetailId = data.applyDetailId
          let listInviteList = []
          let listInviteOwners = []
          let listInvitePerson = []
          let listInviteModel = []
          this.budgetApplyId = data.proName
          this.applyDetailName = data.subItemsName
          data.listInvite.forEach((element) => {
            if (element.userType == 0) {
              listInviteList.push([
                element.listOwnerType[0].typeId,
                element.listOwnerItem[0].itemId,
                element.ownerId,
              ])
              listInviteOwners.push({
                inviteId: element.inviteId,
                ownerId: element.ownerId,
                userType: element.userType,
              })
            } else if (element.userType == 1) {
              listInvitePerson.push({
                inviteId: element.inviteId,
                ownerId: element.ownerId,
                userType: element.userType,
              })
            } else if (element.userType == 2) {
              listInviteModel.push({
                inviteId: element.inviteId,
                ownerId: element.ownerId,
                userType: element.userType,
              })
            }
          })
          this.listInviteOwners = listInviteOwners // 车主结算列表
          this.listInvitePerson = listInvitePerson // 摄影师结算列表
          this.listInviteModel = listInviteModel // 模特结算列表

          this.listInviteList = listInviteList

          let personId = []
          let personIdList = data.taskToPersonList
          let modelId = []
          let modelIdList = data.taskToModelList
          personIdList.forEach((element) => {
            personId.push(element.personId)
          })
          modelIdList.forEach((element) => {
            modelId.push(element.modelId)
          })
          this.personId = personId
          // console.log(personId)
          this.personIdList = personIdList
          this.modelId = modelId
          this.modelIdList = modelIdList

          // this.personId = data.taskToPersonList
          // if (data.taskToModelList) {
          //   this.modelId = data.taskToModelList
          // } else if (!data.modelId && data.personId) {
          //   this.modelId = 0
          // } else {
          //   this.modelId = null
          // }
          // this.carSeriesId = [null,null,data.carSeriesId]
          data.listTaskOfCartype.forEach((element) => {
            this.seriesId.push(element.cartypeId)
          })

          this.periodTime = [
            new Date(data.startTime.replace(/-/g, '/')),
            new Date(data.endTime.replace(/-/g, '/')),
          ]
          this.photoTime = data.photoTime
          ;(this.pickerOptions = {
            disabledDate(time) {
              return (
                time.getTime() > new Date(data.photoTime.replace(/-/g, '/'))
              )
            },
          }),
            (this.taskNum = data.num)
          this.cost = data.cost
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
    getOwnerListNo() {
      let data = []
      this.$axios
        .post('/ocarplay/api/vehicleOwner/ownerTypeCoopItemOwners', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            let noOwner = {}
            let list = []
            data.forEach((element) => {
              if (element.typeId == 4 || element.typeId == 1) {
                let noOwner = {
                  value: element.typeId,
                  label: element.typeName,
                  children: [],
                }
                element.ownerItems.forEach((element1, j) => {
                  // console.log(1)
                  noOwner.children.push({
                    value: element1.itemId,
                    label: element1.itemName,
                    children: [],
                  })
                  element1.vehicleOwners.forEach((element2) => {
                    noOwner.children[j].children.push({
                      value: element2.vehicleOwnerId,
                      label: element2.name,
                    })
                  })
                })
                list.push(noOwner)
              }
            })
            // this.noOwner = noOwner
            this.options2 = list
            // console.log(noOwner)
          }
        })
    },
    getOwnerList(data) {
      // this.listLoading = true
      // let data = []
      this.$axios
        .post('/ocarplay/api/vehicleOwner/ownerTypeCoopItemOwners', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            // data.splice(1, 1)
            let list = []
            data.forEach((element, i) => {
              // if (element.typeId != 4) {
              list.push({
                value: element.typeId,
                label: element.typeName,
                children: [],
              })
              element.ownerItems.forEach((element1, j) => {
                // console.log(1)
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
              // }
            })
            // list.push(this.noOwner)
            this.options2 = list
            // console.log(list)
          }
        })
    },
    ///////// 获取车主列表 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
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

    difference(arr1, arr2, key) {
      // arr1相对于arr2的差集
      // 差集
      let diff = [...arr1]
      for (let i = 0, len = arr1.length; i < len; i++) {
        let flag = false
        for (let j = 0, length = arr2.length; j < length; j++) {
          if (arr1[i][key] === arr2[j][key]) {
            flag = true
          }
        }
        if (flag) {
          diff.splice(
            diff.findIndex((item) => item[key] === arr1[i][key]),
            1
          )
        }
      }
      return diff
      console.log('差集', diff)
    },

    // 添加任务描述
    addTaskDescList() {
      let taskDescList = this.taskDescList
      taskDescList.push({
        input1: null,
        input2: null,
        input3: null,
        input4: null,
        input5: null,
        input6: null,
      })
      this.taskDescList = taskDescList
    },

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
      let carSeriesId = this.carSeriesId
      let listTaskOfCartype = []
      carSeriesId.forEach((element) => {
        listTaskOfCartype.push({ cartypeId: element[1] })
      })
      let initUserId = this.userId
      let deptId = this.deptId
      let status = 0
      // let createTime = this.$time0(new Date())
      let applyDetail = {}
      if (this.taskId) {
        initUserId = ''
        status = ''
        deptId = this.taskDetail.deptId
        // createTime = null
      }
      let proName = null
      this.budgetApplyIdList.forEach((element) => {
        if (this.budgetApplyId == element.budgetApplyId) {
          proName = element.proName
        }
      })

      // let jsonData = null
      // let jsonData = JSON.stringify([{num:1, budget:this.cost}])
      // if (this.subjectId == 8) {
      let jsonData = JSON.stringify([
        {
          num: 1,
          budget: this.cost,
          reqFinishTime: endTime,
          remark: this.remark,
        },
      ])
      // }else if (this.subjectId == 10) {
      //   jsonData = JSON.stringify([{num:1,cost:this.cost, remark:this.remark}])

      // }
      // console.log(proName)
      // console.log(applyDetail)
      let data = {
        initUserId: initUserId,
        deptId: deptId,
        // createTime: createTime,
        taskType: this.taskType,
        taskId: this.taskId,
        taskName: this.taskName,
        status: status,
        startTime: startTime,
        endTime: endTime,
        photoTime: this.photoTime, // 拍摄时间
        num: this.taskNum * 1,
        cost: this.cost * 1,
        // carSeriesId: carSeriesId, // 品牌车型

        taskToPersonList: [], // 摄影师列表
        taskToModelList: [], // 模特列表
        placeId: this.placeId,
        listTaskOfCartype: listTaskOfCartype, // 品牌车型
        taskDesc: this.taskDesc,
        remark: this.remark,
        listInvite: [],
        listTaskFile: this.taskFileList,

        budgetApplyId: this.budgetApplyId,
        proName: proName,

        applyDetailId: this.applyDetailId,
        subjectId: this.subjectId,
        subItemsId: this.subItemsId,
        subItemsName: this.subItemsName,
        subjectTempId: this.subjectTempId,
        jsonData: jsonData,
        cost: this.cost * 1,
      }
      if (this.taskId) {
        delete data.budgetApplyId
        delete data.proName
        delete data.applyDetailId
        delete data.subjectId, delete data.subItemsId
        delete data.subjectTempId
        delete data.jsonData
        delete data.cost
        delete data.subItemsName
      }
      let listInvite = []
      let listInviteList = [] // 邀约对象
      this.listInviteList.forEach((element) => {
        listInviteList.push({
          typeId: element[0],
          itemId: element[1],
          ownerId: element[2],
        })
      })
      let listInviteOwners = this.listInviteOwners // 车主结算列表
      let newListInviteOwners = [] // 新车主结算列表
      this.difference(listInviteList, listInviteOwners, 'ownerId').forEach(
        (element) => {
          newListInviteOwners.push({
            typeId: element.typeId,
            itemId: element.itemId,
            ownerId: element.ownerId,
            userType: 0,
          })
        }
      )
      this.difference(listInviteOwners, listInviteList, 'ownerId').forEach(
        (element) => {
          newListInviteOwners.push({
            inviteId: element.inviteId,
            deleteFlag: true,
            typeId: element.typeId,
            itemId: element.itemId,
            ownerId: element.ownerId,
            userType: 0,
          })
        }
      )

      let taskToPersonList = [] // 摄影师列表
      let personId = this.personId
      let personIdList = this.personIdList // 旧摄影师列表
      let newTaskToPersonList = [] // 新摄影师列表
      let listInvitePerson = this.listInvitePerson // 摄影师结算列表
      let listInvitePerson0 = [] // 选择摄影师结算列表
      let newListInvitePerson = [] // 新摄影师结算列表

      personId.forEach((element) => {
        taskToPersonList.push({
          personId: element,
        })
        listInvitePerson0.push({
          ownerId: element,
          userType: 1,
        })
      })
      // 新增的摄影师
      this.difference(taskToPersonList, personIdList, 'personId').forEach(
        (element) => {
          newTaskToPersonList.push(element)
        }
      )
      // 删除的摄影师
      this.difference(personIdList, taskToPersonList, 'personId').forEach(
        (element) => {
          element.deleteFlag = true
          newTaskToPersonList.push(element)
        }
      )
      // 新增的摄影师结算
      this.difference(listInvitePerson0, listInvitePerson, 'personId').forEach(
        (element) => {
          newListInvitePerson.push(element)
        }
      )
      data.taskToPersonList = newTaskToPersonList

      let taskToModelIdList = [] // 模特列表
      let modelId = this.modelId
      let modelIdList = this.modelIdList // 旧模特列表
      let newTaskToModelList = [] // 新模特师列表
      let listInviteMode = this.listInviteModel // 模特结算列表
      let listInviteMode0 = [] // 选择模特结算列表
      let newListInviteMode = [] // 新模特结算列表

      modelId.forEach((element) => {
        taskToModelIdList.push({
          modelId: element,
        })
        listInviteMode0.push({
          ownerId: element,
          userType: 2,
        })
      })
      // 新增的模特
      this.difference(taskToModelIdList, modelIdList, 'modelId').forEach(
        (element) => {
          newTaskToModelList.push(element)
        }
      )
      // 删除的模特
      this.difference(modelIdList, taskToModelIdList, 'modelId').forEach(
        (element) => {
          element.deleteFlag = true
          newTaskToModelList.push(element)
        }
      )
      // 新增的模特结算
      this.difference(listInviteMode0, listInviteMode, 'modelId').forEach(
        (element) => {
          newListInvitePerson.push(element)
        }
      )
      data.taskToModelList = newTaskToModelList
      data.listInvite = newListInviteOwners.concat(
        newListInvitePerson,
        newListInviteMode
      )

      let flag = true
      let list = [
        data.taskType,
        data.taskName,
        data.startTime,
        data.num,
        data.listTaskOfCartype.length,
        data.remark,
      ]
      if (!this.taskId) {
        list.push(data.budgetApplyId)
        list.push(data.applyDetailId)
        list.push(data.cost)
      }

      list.forEach((element) => {
        if (!element) {
          flag = false
        }
      })

      if (data.taskType == 4 && !data.photoTime) {
        flag = false
      }

      // console.log(data)
      // console.log(JSON.stringify(data))
      // return
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
        // this.$message.error('点击提交')
      } else {
        this.$message.error('请检查信息是否填写完整！')
      }
    },
    ///////// 新增任务 start /////////

    ///////// 提交表单 start /////////
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ///////// 提交表单 end /////////
  },
}
</script>
<style lang="scss" scoped>
#reimbursement {
  height: 100%;
  background: white;
  border-radius: 8px 8px 0 0;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
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
    .formBox {
      margin-top: 36px;
      .el-form {
        height: 570px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
        & > .el-form-item {
          width: 39%;
        }
        .el-select {
          width: 100%;
        }
      }
    }
    $pad: 49px;
    .putPlaceholder {
      height: 28px;
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
  & >>> .el-table__body tr.current-row > td {
    background: #d8d8c8;
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
