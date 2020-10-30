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
            <div class="key imp">任务类型</div>
            <div class="val">
              <el-radio-group v-model="taskType" :disabled="!disabledCaigou">
                <el-radio :label="1">借车</el-radio>
                <el-radio :label="2">素材</el-radio>
                <el-radio :label="3">邀约</el-radio>
                <el-radio :label="4">拍摄</el-radio>
                <el-radio :label="5">发布</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key imp">项目名称</div>
            <div class="val">
              <el-select v-model="budgetApplyId" placeholder="请选择" clearable filterable @change="chageBudgetApplyId" :disabled="taskId ? true : false">
                <el-option
                  v-for="item in budgetApplyIdList"
                  :key="item.budgetApplyId"
                  :label="item.proName"
                  :value="item.budgetApplyId">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key imp">预算明细</div>
            <div class="val">
              <el-input
                placeholder="请输入内容"
                v-model="applyDetailName"
                clearable
                :disabled="taskId ? true : false"
                @focus="applyDetailIdBoxShow = true"
              ></el-input>
            </div>
          </el-col>
          
          <el-col :span="24" class="list">
            <div class="key imp">任务名称</div>
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
            <div class="key imp">品牌车型</div>
            <div class="val">
              <el-cascader
                v-model="carSeriesId"
                :props="props"
                :options="carSeriesList"
                clearable
                filterable
                @change="carSeriesChange"
                :disabled="!disabledCaigou"
              ></el-cascader>
              <!-- collapse-tags -->
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key" v-if="disabledCaigou">任务对象</div>
            <div class="key" v-else>车辆来源</div>
            <div class="val">
              <el-cascader
                :options="options2"
                :props="props"
                v-model="listInviteList"
                clearable
                filterable
              ></el-cascader>
              <!-- :disabled="!disabledCaigou" -->
              <!-- collapse-tags -->
            </div>
          </el-col>
          <!-- 摄影填写 start -->
          <el-col :span="24" v-show="taskType==4">
            <el-col :span="24" class="list" v-show="!disabledCaigou">
              <div class="key">摄影师</div>
              <div class="val">
                <el-select
                  v-model="personId"
                  placeholder="请选择"
                  :disabled="disabledCaigou"
                  clearable
                  filterable
                  multiple
                >
                  <el-option
                    v-for="item in cameraList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- {{personId}} -->
              </div>
              <el-link href="#/home/resource/addCameraman?type=0">添加</el-link>
            </el-col>
            <el-col :span="24" class="list" v-show="!disabledCaigou">
              <div class="key">模特</div>
              <div class="val">
                <el-select
                  v-model="modelId"
                  placeholder="请选择"
                  :disabled="disabledCaigou"
                  clearable
                  filterable
                  multiple
                >
                  <el-option
                    v-for="item in modelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <el-link href="#/home/resource/addModel?type=0">添加</el-link>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">场地</div>
              <div class="val">
                <el-select v-model="placeId" placeholder="请选择" clearable filterable>
                  <el-option
                    v-for="item in placeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <el-link href="#/home/resource/addplace">添加</el-link>
            </el-col>
          </el-col>
          <!-- 摄影填写 end -->
          <el-col :span="24" class="list">
            <div class="key imp">计划周期</div>
            <div class="val">
              <el-date-picker
                v-model="periodTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="taskId ? true : false"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="24" class="list" v-show="taskType==4">
            <div class="key imp">拍摄时间</div>
            <div class="val">
              <el-date-picker v-model="photoTime" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key imp">计划邀约量</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="taskNum" clearable :disabled="!disabledCaigou" type="number"></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key imp">预估费用</div>
            <div class="val">
              <el-input placeholder="请输入内容" v-model="cost" clearable :disabled="taskId ? true : false" type="number"></el-input>
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
                <el-button size="small" type="primary" class="SlideOpen SlideOpenM" data-text="点击上传"><span>点击上传</span></el-button>
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
                maxlength="500"
                show-word-limit
              ></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">备注</div>
            <div class="val">
              <el-input
                placeholder="请输入内容"
                v-model="remark"
                clearable
                :disabled="!disabledCaigou"
                maxlength="500"
              ></el-input>
            </div>
          </el-col>
        </el-col>
        <el-col :span="24" class="put">
          <!-- <el-button type="primary" @click="saveTask">提交</el-button> -->
          <el-button type="primary" @click="saveTask" class="SlideOpen" data-text="提交"><span>提交</span></el-button>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
    <!-- 预算明细选择弹窗 -->
    <el-dialog title="预算明细(点击选中)" :visible.sync="applyDetailIdBoxShow" width="80%">
      <el-table
        :data="applyDetailIdList"
        empty-text="请先选择项目名称"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="subjectName" label="科目" width="150"></el-table-column>
        <el-table-column property="subItemsName" label="细分项" width="200"></el-table-column>
        <el-table-column property="remark" label="预算备注"></el-table-column>
        <el-table-column width="100" property="remainNum" label="剩余量"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="applyDetailIdBoxShow = false">取 消</el-button> -->
        <el-button type="primary" @click="applyDetailIdBoxShow = false">确 定</el-button>
      </span>
    </el-dialog>
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
      taskDetail: null,
      options2: [], // 任务对象（车主）
      noOwner: null, // 非车主信息
      input: '',
      input1: '',
      // 任务对象选择数据
      input2: '',
      textarea: '',
      props: { multiple: true,expandTrigger: 'hover' },
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

    ///////// 获取项目名称 start /////////
    getBudget(){
      let data = {userId: this.userId}
      this.$axios
        .post('/ocarplay/task/getBudget', data)
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            this.budgetApplyIdList = res.data.data
          }
        })
    },
    ///////// 获取项目名称 end /////////

    chageBudgetApplyId(val){
      if (!val) {
        this.applyDetailId = null
      }
      this.getBudgetDetailByApplyId(val)
    },

    ///////// 获取预算明细 start /////////
    getBudgetDetailByApplyId(id){
      let data = {budgetApplyId:id}
      this.$axios
        .post('/ocarplay/task/getBudgetDetailByApplyId', data)
        .then((res) => {
          // console.log(res)
          // this.listLoading = false
          if (res.status == 200) {
            this.applyDetailIdList = res.data.data
            let applyDetailIdList = []
            res.data.data.forEach(element => {
              if (element.remainNum>0&&element.subjectId!=10) {
                applyDetailIdList.push(element)
              }
            });
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
        orderType: 1,
        type: 2,
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
        orderType: 1,
        type: 2,
      }
      this.$axios.post('/ocarplay/api/model/listAjax', data).then((res) => {
        // console.log(res)
        this.listLoading = false
        if (res.status == 200) {
          let data = res.data.items
          let modelList = [
            {
              value: 0,
              label: '无模特',
            },
          ]
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
          this.pickerOptions= {
            disabledDate(time) {
              return time.getTime() > new Date(data.photoTime.replace(/-/g, '/'))
            },
          },
          this.taskNum = data.num
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
      this.budgetApplyIdList.forEach(element => {
        if (this.budgetApplyId == element.budgetApplyId) {
          proName=element.proName
        }
      });
      
      
      // let jsonData = null
      let jsonData = JSON.stringify([{num:1, budget:this.cost}])
      // if (this.subjectId == 8) {
      //   jsonData = JSON.stringify([{num:1,budget:this.cost,reqFinishTime:endTime, remark:this.remark}])
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
        num: this.taskNum*1,
        cost: this.cost*1,
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

        applyDetailId:this.applyDetailId,
        subjectId: this.subjectId,
        subItemsId:this.subItemsId,
        subItemsName:this.subItemsName,
        subjectTempId:this.subjectTempId,
        jsonData: jsonData,
        cost:this.cost*1,
      }
      if (this.taskId) {
        delete data.budgetApplyId
        delete data.proName
        delete data.applyDetailId
        delete data.subjectId,
        delete data.subItemsId
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

      if (data.taskType==4&&!data.photoTime) {
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
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
    padding: 36px;
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 16px 0;
      .key {
        width: 108px;
        height: 40px;
        padding: 0 9px;
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
        position: relative;
        .el-link{
          position: absolute;
          right: -36px;
          top: 50%;
          margin-top: -10px;
        }
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
  &>>>.el-table__body tr.current-row>td{
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
