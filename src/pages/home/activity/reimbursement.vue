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
            <el-form-item label="项目组" prop="groupId">
              <el-select v-model="fromData.groupId" placeholder="请选择项目组">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in groupList" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称" prop="input2">
              <el-select v-model="fromData.input2" placeholder="请选择项目名称">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="buyType">
              <el-radio-group v-model="fromData.buyType">
                <el-radio label="1">日常</el-radio>
                <el-radio label="2">专项</el-radio>
                <el-radio label="3">行政</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="科目" prop="subjectId">
              <el-select v-model="fromData.subjectId" placeholder="请选择科目">
                <el-option label="影视活动" value="8"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="细分项" prop="subItemsId">
              <el-select v-model="fromData.subItemsId" placeholder="请选择项目名称">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="采购单价" prop="buyPrice">
              <el-input v-model="fromData.buyPrice"></el-input>
            </el-form-item>
            <el-form-item label="采购数量" prop="buyNum">
              <el-input v-model="fromData.buyNum"></el-input>
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
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="fromData.remark"></el-input>
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
      groupList: [
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
      fromData: {
        groupId: '',
        input2: '',
        buyType: '',
        subjectId: '',
        subItemsId: '',
        buyPrice: '',
        buyNum: '',
        input8: '',
        input9: '',
        remark: '',
        input11: '',
      },
      fromRules: {
        groupId: [
          { required: true, message: '请选择项目组', trigger: 'change' },
        ],
        input2: [
          { required: true, message: '请选择项目名称', trigger: 'change' },
        ],
        buyType: [{ required: true, message: '请选择类型', trigger: 'change' }],
        subjectId: [{ required: true, message: '请选择科目', trigger: 'change' }],
        subItemsId: [
          { required: true, message: '请选择细分项', trigger: 'change' },
        ],
        buyPrice: [
          { required: true, message: '请输入采购单价', trigger: 'blur' },
        ],
        buyNum: [
          { required: true, message: '请输入采购数量', trigger: 'blur' },
        ],
        input8: [
          { required: true, message: '请选择有无发票', trigger: 'change' },
        ],
        input9: [
          { required: true, message: '请选择产生日期', trigger: 'blur' },
        ],
        remark: [
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
    ///////// 判断部门 start /////////
    this.isDeptId()
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
      } else if (type == 2) {
        this.title = '新建影视活动'
        // this.taskId = id
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 获取影视活动列表 start /////////
    getBudget() {
      let data = { userId: this.userId }
      this.$axios.post('/ocarplay/api/movie/toCashOut', data).then((res) => {
        // console.log(res)
        // this.listLoading = false
        if (res.status == 200) {
          this.budgetApplyIdList = res.data.data
        }
      })
    },
    ///////// 获取影视活动列表 end /////////

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

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

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
