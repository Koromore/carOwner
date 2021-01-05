<template>
  <div id="addactivity">
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
        <el-col :span="12" class="left">
          <el-col :span="24" class="list">
            <div class="key imp">任务类型</div>
            <div class="val">
              <el-radio-group
                v-model="movieType"
                :disabled="movieId ? true : false"
              >
                <el-radio :label="1">有车拍摄</el-radio>
                <el-radio :label="2">非车拍摄</el-radio>
                <el-radio :label="3">其他</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key imp">项目名称</div>
            <div class="val">
              <el-select
                v-model="budgetApplyId"
                placeholder="请选择"
                clearable
                filterable
                @change="chageBudgetApplyId"
                :disabled="movieId ? true : false"
              >
                <el-option
                  v-for="item in budgetApplyIdList"
                  :key="item.budgetApplyId"
                  :label="item.proName"
                  :value="item.budgetApplyId"
                >
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
                :disabled="movieId ? true : false"
                @focus="applyDetailIdBoxShow = true"
              ></el-input>
            </div>
          </el-col>

          <el-col :span="24" class="list taskName">
            <div class="key imp">任务名称</div>
            <div class="val" v-show="movieType == 1 || !movieType">
              <el-select v-model="city" placeholder="城市" clearable filterable>
                <el-option
                  v-for="item in cityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="brandId"
                placeholder="品牌"
                clearable
                filterable
                @change="changeBrandId"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="carTypeId"
                placeholder="车型"
                clearable
                filterable
                no-data-text="请先选择品牌"
                @change="changeCarType"
              >
                <el-option
                  v-for="item in carTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="photoType"
                placeholder="拍摄类型"
                clearable
                filterable
                @change="changePhotoType"
              >
                <el-option
                  v-for="item in photoTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="val" v-show="movieType == 2">
              <el-select v-model="city" placeholder="城市" clearable filterable>
                <el-option
                  v-for="item in cityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="brandId"
                placeholder="品牌"
                clearable
                filterable
                @change="changeBrandId"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                class="halfTaskName"
                placeholder="请输入内容"
                v-model="movieName"
                clearable
              ></el-input>
            </div>
            <div class="val" v-show="movieType == 3">
              <el-input
                placeholder="请输入内容"
                v-model="movieName"
                clearable
              ></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list" v-show="movieType != 3">
            <div class="key imp">模特资源</div>
            <div class="val">
              <el-radio-group v-model="isModel">
                <el-radio :label="true">需要</el-radio>
                <el-radio :label="false">不需要</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="24" class="list" v-show="movieType != 3">
            <div class="key imp">摄影师资源</div>
            <div class="val">
              <el-radio-group v-model="isPerson">
                <el-radio :label="true">需要</el-radio>
                <el-radio :label="false">不需要</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <!-- <el-col :span="24" class="list" v-show="movieType == 3">
            <div class="key imp">其他资源</div>
            <div class="val">
              <el-radio-group v-model="isOther">
                <el-radio :label="true">需要</el-radio>
                <el-radio :label="false">不需要</el-radio>
              </el-radio-group>
            </div>
          </el-col> -->
          <el-col :span="24" v-show="movieType != 3">
            <el-col :span="24" class="list">
              <div class="key imp">场地</div>
              <div class="val">
                <el-select
                  v-model="placeId"
                  placeholder="请选择"
                  clearable
                  filterable
                >
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
          <el-col :span="24" class="list">
            <div class="key imp">计划周期</div>
            <div class="val">
              <el-date-picker
                v-model="periodTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :disabled="movieId ? true : false"
              ></el-date-picker>
            </div>
          </el-col>

          <el-col :span="24" class="list">
            <div class="key">任务文件</div>
            <div class="val">
              <el-upload
                class="upload-demo"
                action="/ocarplay/file/upload"
                :on-remove="movieFileRemove"
                :on-success="movieFileSuccess"
                :file-list="fileList"
                :disabled="!disabledCaigou"
              >
                <el-button
                  size="small"
                  type="primary"
                  class="SlideOpen SlideOpenM"
                  data-text="点击上传"
                  ><span>点击上传</span></el-button
                >
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </div>
          </el-col>
        </el-col>
        <el-col :span="12" class="right">
          <el-col :span="24" class="list" v-show="movieType != 3">
            <div class="key imp">发布数</div>
            <div class="val">
              <el-input
                placeholder="请输入内容"
                v-model="num"
                clearable
                :disabled="!disabledCaigou"
                type="number"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="24" class="list" v-show="movieType != 3">
            <div class="key imp">拍摄时间</div>
            <div class="val">
              <el-date-picker
                v-model="photoTime"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                :disabled="movieId ? true : false"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key imp">任务描述</div>
            <div
              class="val valList"
              v-for="(item, index) in movieDescList"
              :key="index"
            >
              <!-- <el-input
                type="textarea"
                :rows="7"
                placeholder="请输入内容"
                v-model="taskDesc"
                :disabled="!disabledCaigou"
                maxlength="500"
                show-word-limit
              ></el-input> -->
              <div class="miKey">主题:</div>
              <el-input
                placeholder="请输入内容"
                v-model="item.descName"
              ></el-input>
              <div class="miKey">时间:</div>
              <el-input
                placeholder="请输入内容"
                v-model="item.descTime"
              ></el-input>
              <div class="miKey">集合地点:</div>
              <el-input
                placeholder="请输入内容"
                v-model="item.place"
              ></el-input>
              <div class="miKey">成片要求:</div>
              <el-input
                placeholder="请输入内容"
                v-model="item.photoDesc"
              ></el-input>
              <div class="miKey">人员要求:</div>
              <el-input
                placeholder="请输入内容"
                v-model="item.personDesc"
              ></el-input>
              <div class="miKey">其他要求:</div>
              <el-input
                placeholder="请输入内容"
                v-model="item.otherDesc"
              ></el-input>
              <i
                class="el-icon-circle-plus-outline addValList"
                @click="addMovieDescList"
                v-show="index == movieDescList.length - 1"
              ></i>
            </div>
          </el-col>
          <!-- <el-col :span="24" class="list">
            <div class="key imp">备注</div>
            <div class="val">
              <el-input
                placeholder="拍摄时间+任务名称"
                v-model="remark"
                clearable
                :disabled="!disabledCaigou"
                maxlength="100"
                show-word-limit
              ></el-input>
            </div>
          </el-col> -->
          <el-col :span="24" class="list">
            <div class="key imp">预估费用</div>
            <div class="val valList">
              <!-- <el-input
                placeholder="请输入内容"
                v-model="cost"
                clearable
                :disabled="movieId ? true : false"
                type="number"
              ></el-input> -->
              <div class="miKey">总费用:</div>
              <el-input placeholder="请输入内容" v-model="money"></el-input>
              <div class="miKey">费用明细:</div>
              <el-input
                placeholder="请输入内容"
                v-model="moneyRemark"
              ></el-input>
            </div>
          </el-col>
        </el-col>

        <el-col :span="24" class="putPlaceholder"></el-col>
        <el-col :span="24" class="put">
          <!-- <el-button type="primary" @click="saveMovie">提交</el-button> -->
          <el-button
            type="primary"
            @click="saveMovie"
            class="SlideOpen"
            data-text="提交"
            ><span>提交</span></el-button
          >
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
    <!-- 预算明细选择弹窗 -->
    <el-dialog
      title="预算明细(点击选中)"
      :visible.sync="applyDetailIdBoxShow"
      width="80%"
    >
      <el-table
        :data="applyDetailIdList"
        empty-text="请先选择项目名称"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          property="subjectName"
          label="科目"
          width="150"
        ></el-table-column>
        <el-table-column
          property="subItemsName"
          label="细分项"
          width="200"
        ></el-table-column>
        <el-table-column property="remark" label="预算备注"></el-table-column>
        <el-table-column
          width="100"
          property="remainNum"
          label="剩余量"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="applyDetailIdBoxShow = false">取 消</el-button> -->
        <el-button type="primary" @click="applyDetailIdBoxShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import cityList from '@/common/cityen' // 引入文件格式判断方法

export default {
  name: 'addactivity',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId, // 90
      // 页面类型
      input1: null,
      movieId: '',
      type: 0,
      title: '新建影视活动',
      // 任务名称
      movieDetail: null,
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

      taskName: '',
      listInviteList: [],
      listInviteOwners: [],
      listInvitePerson: [],
      listInviteModel: [],

      carSeriesId: [],
      seriesId: [],

      taskNum: '',
      cost: null,
      listmovieFile: [],
      taskDesc: '',
      remark: '',

      applyDetailIdBoxShow: false,
      gridData: [],
      // 按钮开关
      submitFlag: true,
      putLoading: false,

      // 影视活动

      cityList: cityList, // 城市列表
      // 品牌列表
      brandList: [
        {
          value: 105,
          label: '沃尔沃',
        },
        {
          value: 110,
          label: '吉利',
        },
        {
          value: 153,
          label: '长城',
        },
        {
          value: 106,
          label: '东本',
        },
      ],
      // 车型列表
      carTypeList: [],
      // 车系列表
      carSeriesList: this.$store.state.carSeriesList,
      // 拍摄类型列表
      photoTypeList: [
        {
          value: 1,
          label: '视频拍摄',
        },
        {
          value: 2,
          label: '超精拍摄',
        },
        {
          value: 3,
          label: '图片和视频拍摄',
        },
      ],
      // 预算明细选择弹窗
      applyDetailName: null,
      // applyDetailId: null,
      subjectId: null,
      subItemsId: null,
      subjectTempId: null,
      subItemsName: null,
      identifier: null, // 编号
      // 信息
      movieId: null, // 活动任务ID
      movieName2: null,
      movieName3: null,
      movieName: null, // 任务名称
      movieType: null, // 活动类型
      budgetApplyId: null, // 预算项目
      proName: null, // 预算项目
      applyDetailId: null, // 预算明细
      city: '', // 所属城市
      brandId: null, // 品牌
      brandName: '', // 品牌名称
      carTypeId: null, // 车型
      carTypeName: '', // 车型名称
      photoType: null, // 拍摄类型
      photoTypeName: '', // 拍摄类型名称

      isModel: null, // 是否需要模特
      isPerson: null, // 是否需要摄影师
      isOther: null, // 是否需要其他资源
      placeId: null, // 场地ID
      periodTime: [new Date(), ''], // 计划周期
      // 任务文件
      movieFileList: [],
      fileList: [],
      num: null, // 发布数
      photoTime: '', // 拍摄时间
      // 任务描述列表
      movieDescList: [
        {
          // deleteFlag: null,
          descName: '', // 主题
          descTime: '', // 时间
          place: '', // 集合地点
          photoDesc: '', // 成片要求
          personDesc: '', // 人员要求
          otherDesc: '', // 其他要求
        },
      ], //
      money: null, // 预估费用
      moneyRemark: '', // 费用明细
      halfTaskName: null, //
      // 任务所属供应商集合
      // supplierType
      // 1-模特供应商，2-摄影师供应商，3-车辆供应商，4-其他供应商
      supplierList: [], //
    }
  },
  // 侦听器
  watch: {
    // carSeriesList: function (newData, oldData) {
    //   if (newData.length != 0) {
    //     this.getCarSeriesId()
    //   }
    // },
    // seriesId: function (newData, oldData) {
    //   if (newData != '') {
    //     this.getCarSeriesId()
    //   }
    // },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    let data = {
      movieId: 14,
      movieToSupplierList: [
        {
          deleteFlag: false,
          movieId: 14,
          supplierId: 61,
          supplierName: '冯萌',
          supplierMoney: '100',
          supplierType: 2,
        },
      ],
    }
    ///////// 接受页面传参 start /////////
    this.getQuery()

    ///////// 获取场地列表 start /////////
    this.getPlaceList()
    ///////// 判断部门 start /////////
    this.isDeptId()
    this.getOwnerListNo()
    ///////// 获取项目名称 start /////////
    this.getBudget()
    ///////// 获取预算明细 start /////////
    // this.getBudgetDetailByApplyId()
    let brandList = this.brandList
    let deptId = this.deptId

    for (let i = 0; i < brandList.length; i++) {
      let element = brandList[i]
      if (element.value == deptId) {
        this.brandList = [element]
      }
    }
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
        this.movieId = ''
      } else if (type == 1) {
        this.title = '编辑影视活动'
        this.movieId = id
        ///////// 获取任务详情 start /////////
        this.getMovieDetail(id)
      } else if (type == 2) {
        this.title = '新建影视活动'
        // this.movieId = id
        ///////// 获取任务详情 start /////////
        this.getMovieDetail(id)
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 获取项目名称 start /////////
    getBudget() {
      let data = { userId: this.userId, subjectId: 8 }
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
      } else {
        let budgetApplyIdList = this.budgetApplyIdList
        budgetApplyIdList.forEach((element) => {
          if (val == element.budgetApplyId) {
            this.identifier = element.identifier
            this.proName = element.proName
            console.log(this.identifier)
          }
        })
        // this.identifier =
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
            // this.applyDetailIdList = res.data.data
            let applyDetailIdList = []
            res.data.data.forEach((element) => {
              if (element.subjectId == 8 && element.remainNum > 0) {
                applyDetailIdList.push(element)
              }
            })
            this.applyDetailIdList = applyDetailIdList
          }
        })
    },
    handleCurrentChange(val) {
      // this.currentRow = val;
      // console.log(val)applyDetailId
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
    // getCarSeriesId() {
    //   // console.log(this.seriesId)
    //   let carSeriesId = []

    //   this.carSeriesList.forEach((element0) => {
    //     element0.children.forEach((element1) => {
    //       this.seriesId.forEach((element2) => {
    //         if (element1.value == element2) {
    //           carSeriesId.push([element0.value, element1.value])
    //         }
    //       })
    //     })
    //   })
    //   this.carSeriesId = carSeriesId
    //   // console.log(carSeriesId)
    // },
    ///////// 循环查找品牌车型 start /////////

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
    getMovieDetail(id) {
      let data = {
        movieId: id,
      }
      this.$axios.post('/ocarplay/api/movie/show', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data
          this.changeBrandId(data.brandId)
          this.movieDetail = data
          this.movieId = data.movieId
          this.movieType = data.movieType
          this.budgetApplyId = data.budgetApplyId
          this.applyDetailName = data.subItemsName
          this.city = data.city
          this.brandId = data.brandId
          this.carTypeId = data.carTypeId
          this.photoType = data.photoType
          this.isModel = data.isModel
          this.isPerson = data.isPerson
          this.isOther = data.isOther
          this.placeId = data.placeId
          this.periodTime = [data.startTime, data.endTime]
          this.num = data.num
          this.photoTime = data.photoTime
          this.movieDescList = data.movieDescList
          this.money = data.money
          this.moneyRemark = data.moneyRemark
          this.movieName = data.movieName

          // 文件回调
          let fileList = []
          let movieFileList = []

          data.movieFileList.forEach((element) => {
            fileList.push({
              name: element.fileName,
              url: element.localPath,
            })
            movieFileList.push({
              fileName: element.fileName,
              localPath: element.localPath,
              suffix: element.suffix,
            })
          })
          this.fileList = fileList
          this.movieFileList = movieFileList
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
    movieFileSuccess(res, file, fileList) {
      // this.movieFileList  = res
      let list = []
      fileList.forEach((element) => {
        list.push(element.response.data)
        // console.log(element.response)
      })
      this.movieFileList = list
      // console.log(res)
      // console.log(file)
      // console.log(fileList)
      // console.log(list)
    },
    // 删除成功回调
    movieFileRemove(file, fileList) {
      let list = []
      fileList.forEach((element) => {
        list.push(element.response.data)
      })
      this.movieFileList = list
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
    addMovieDescList() {
      let movieDescList = this.movieDescList
      movieDescList.push({
        descName: null, // 主题
        descTime: null, // 时间
        place: null, // 集合地点
        photoDesc: null, // 成片要求
        personDesc: null, // 人员要求
        otherDesc: null, // 其他要求
      })
      this.movieDescList = movieDescList
    },

    ///////// 影视活动任务 start /////////
    // （0-进行中，1-结算中，2-完成，3-延期，4-人工延期
    saveMovie() {
      let periodTime = this.periodTime
      let startTime = ''
      let endTime = ''
      if (periodTime.length != 0) {
        startTime = this.$date0(periodTime[0])
        endTime = this.$date0(periodTime[1])
      }
      let initUserId = this.userId
      let deptId = this.deptId
      let status = 0
      let city = this.city
      let brandName = this.brandName
      let carTypeName = this.carTypeName
      let photoTypeName = this.photoTypeName
      let movieName = null
      let movieName2 = this.movieName2
      let movieName3 = this.movieName3
      if (this.movieType == 1) {
        movieName = ``
      } else {
        movieName = this.movieName
      }
      let remark = null
      if (this.movieType == 1) {
        remark =
          this.photoTime +
          '-' +
          city +
          '-' +
          brandName +
          '-' +
          carTypeName +
          '-' +
          photoTypeName
      } else if (this.movieType == 2) {
        remark =
          this.photoTime + '-' + city + '-' + brandName + '-' + this.movieName
      } else if (this.movieType == 3) {
        remark = this.photoTime + '-' + this.movieName
      }
      let jsonData = JSON.stringify([
        {
          num: 1,
          budget: this.money,
          reqFinishTime: endTime,
          remark: this.photoTime + '-' + city + '-' + brandName,
        },
      ])
      let data = {
        initUserId: initUserId, // 任务发起人
        movieId: this.movieId, // 任务名称
        movieName: movieName, // 任务名称
        movieType: this.movieType, // 活动类型
        identifier: this.identifier, // 编号
        budgetApplyId: this.budgetApplyId, // 预算项目名称
        proName: this.proName, // 预算项目ID
        applyDetailId: this.applyDetailId, // 预算明细
        subjectId: 8, // 科目
        subjectTempId: this.subjectTempId,
        subItemsId: this.subItemsId, // 细分项ID
        subItemsName: this.applyDetailName, // 细分项名称
        city: this.city, // 所属城市
        brandId: this.brandId, // 品牌
        carTypeId: this.carTypeId, // 车型
        photoType: this.photoType, // 拍摄类型
        isModel: this.isModel, // 是否需要模特
        isPerson: this.isPerson, // 是否需要摄影师
        // isOther: this.isOther, // 是否需要其他资源
        placeId: this.placeId, // 场地ID
        startTime: startTime, // 计划周期
        endTime: endTime, // 计划周期
        // 任务文件
        movieFileList: this.movieFileList,
        // fileList: [],
        num: this.num, // 发布数
        photoTime: this.photoTime, // 拍摄时间
        movieDescList: this.movieDescList, // 任务描述列表
        money: this.money * 1, // 预估费用
        moneyRemark: this.moneyRemark, // 费用明细
        // halfTaskName: halfTaskName, //
        // 任务所属供应商集合
        // supplierType
        // 1-模特供应商，2-摄影师供应商，3-车辆供应商，4-其他供应商
        // supplierList: [], //

        jsonData: jsonData,
      }
      // data.movieId
      // data.movieType
      if (data.movieType == 3) {
        data.isOther = true
      }
      if (!data.movieType) {
        this.$message.error('请选择任务类型')
        return
      }
      if (!data.applyDetailId && !data.movieId) {
        this.$message.error('请选择项目名称和预算明细')
        return
      }
      if (data.movieType != 3 && !data.city) {
        this.$message.error('请选择城市')
        return
      }
      if (data.movieType != 3 && !data.brandId) {
        this.$message.error('请选择品牌')
        return
      }
      if (data.movieType == 1 && !data.carTypeId) {
        this.$message.error('请选择车型')
        return
      }
      if (data.movieType == 1 && !data.photoType) {
        this.$message.error('请选择拍摄类型')
        return
      }
      if (data.movieType != 1 && !data.movieName) {
        this.$message.error('请填写任务名称')
        return
      }
      if (data.movieType != 3 && data.isModel == null) {
        this.$message.error('请选择是否需要模特资源')
        return
      }
      if (data.movieType != 3 && data.isPerson == null) {
        this.$message.error('请选择是否需要摄影师资源')
        return
      }
      // if (data.movieType == 3 && data.isOther == null) {
      //   this.$message.error('请选择是否需要其他资源')
      //   return
      // }
      if (!data.placeId) {
        this.$message.error('请填写场地信息')
        return
      }
      if (!data.startTime || !data.endTime) {
        this.$message.error('请填写计划周期')
        return
      }
      if (data.movieType != 3 && !data.num) {
        this.$message.error('请填写发布数')
        return
      }
      if (data.movieType != 3 && !data.photoTime) {
        this.$message.error('请填写拍摄时间')
        return
      }
      if (!data.money && data.money > 0) {
        this.$message.error('预估费用必须大于0')
        return
      }
      if (!data.moneyRemark) {
        this.$message.error('请填写费用明细')
        return
      }
      if (
        !data.movieDescList[0].descName ||
        !data.movieDescList[0].descTime ||
        !data.movieDescList[0].place ||
        !data.movieDescList[0].photoDesc ||
        !data.movieDescList[0].personDesc ||
        !data.movieDescList[0].otherDesc
      ) {
        this.$message.error('请填写任务描述')
        return
      }
      if (this.movieId) {
        delete data.budgetApplyId
        delete data.proName
        delete data.applyDetailId
        delete data.subjectId
        delete data.subItemsId
        delete data.subjectTempId
        delete data.jsonData
        delete data.cost
        delete data.subItemsName
      }
      // if (flag) {
      this.putLoading = true
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode === 0) {
            if (this.movieId) {
              this.$message.success('任务更新成功！')
            } else {
              this.$message.success('任务新建成功！')
            }
            // return
            setTimeout(() => {
              this.$router.push({
                name: 'activity',
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
      // } else {
      //   this.$message.error('请检查信息是否填写完整！')
      // }
    },
    ///////// 影视活动任务 end /////////

    ///////// 品牌切换 start /////////
    changeBrandId(val) {
      console.log(val)
      if (val) {
        let carSeriesList = this.carSeriesList
        let carTypeList = []
        carSeriesList.forEach((element) => {
          if (element.value == val) {
            carTypeList = element.children
          }
        })
        this.carTypeList = carTypeList
        let brandName = null
        let brandList = this.brandList
        brandList.forEach((element) => {
          if (val == element.value) {
            brandName = element.label
          }
        })
        this.brandName = brandName
        this.carTypeId = null
        // console.log(this.brandName)
      } else {
        this.carTypeList = []
        this.carTypeId = null
        this.brandName = null
      }

      // console.log(carSeriesList)
    },
    ///////// 品牌切换 end /////////

    ///////// 车型切换 start /////////
    changeCarType(val) {
      if (val) {
        let carTypeName = null
        let carTypeList = this.carTypeList
        carTypeList.forEach((element) => {
          if (val == element.value) {
            carTypeName = element.label
          }
        })
        this.carTypeName = carTypeName
      } else {
        this.carTypeName = null
      }
    },
    ///////// 车型切换 end /////////

    ///////// 拍摄类型切换 start /////////
    changePhotoType(val) {
      if (val) {
        let photoTypeName = null
        let photoTypeList = this.photoTypeList
        photoTypeList.forEach((element) => {
          if (val == element.value) {
            photoTypeName = element.label
          }
        })
        this.photoTypeName = photoTypeName
      } else {
        this.photoTypeName = null
      }
    },
    ///////// 拍摄类型切换 end /////////
  },
}
</script>
<style lang="scss" scoped>
#addactivity {
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
      &.taskName {
        .el-select {
          width: 24%;
        }
        .halfTaskName {
          width: 49%;
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
        .el-link {
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
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          padding: 16px;
          margin-bottom: 9px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          position: relative;
          .addValList {
            font-size: 24px;
            color: #333333;
            position: absolute;
            right: -32px;
            bottom: 0;
          }
          &:nth-of-type(n + 3) {
            margin-left: 121px;
          }
          &:nth-last-of-type(1) {
            margin-bottom: 0px;
          }
          & > div {
            margin-bottom: 9px;
          }
          .miKey {
            width: 64px;
            font-size: 14px;
            color: #aaa;
          }
          .el-input {
            width: calc(100% - 64px);
          }
        }
      }
    }
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
