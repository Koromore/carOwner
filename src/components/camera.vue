<template>
  <div id="addCamera">
    <el-drawer
      title="新增拍摄记录"
      :visible.sync="drawerData"
      size="566px"
      @close="drawerDataClose"
      @open="drawerDataOpen"
      v-loading="loading"
    >
      <el-row class="drawerData">
        <el-col :span="5" class="key imp">拍摄组</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-select v-model="deptId" placeholder="请选择">
            <el-option
              v-for="item in deptList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="key imp">拍摄任务</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-input placeholder="请输入内容" v-model="title" clearable></el-input>
        </el-col>
        <el-col :span="5" class="key imp">摄影师</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-select v-model="personId" placeholder="请选择">
            <el-option
              v-for="item in personList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="key imp">模特</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-select v-model="modelId" placeholder="请选择">
            <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="key imp">场地</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-select v-model="placeId" placeholder="请选择">
            <el-option
              v-for="item in placeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="key imp">拍摄时间</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-date-picker
            v-model="cameraTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="24" class="btn">
          <el-col :span="6" :offset="5">
            <el-button type="info" @click="cancel" size="small">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button type="primary" @click="saveBtn" size="small">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'addCamera',
  // 接受参数
  props: {
    cameraShow: Number,
  },
  components: {},
  data() {
    return {
      drawerData: false,
      loading: false,
      deptList: [
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
      ],
      deptId: null, // 项目组ID
      personList: [], // 摄影师列表
      modelList: [], // 模特列表
      placeList: [], // 场地列表
      personId: null, // 摄影师Id
      modelId: null, // 模特Id
      placeId: null, // 场地Id
      title: null, // 任务名称
      cameraTime: null, // 拍摄时间
    }
  },
  // 侦听器
  watch: {
    cameraShow: function (newData, oldData) {
      if (newData) {
        this.drawerData = true
      }
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {
    //
    drawerDataClose() {
      this.$parent.cameraShow = 0

      // this.$parent.getlistPhotoPerson()
    },
    drawerDataOpen() {
      this.getlistPhotoPerson()
      this.getlistModel()
      this.getListPlace()
    },
    ///////// 获取摄影师列表 start /////////
    getlistPhotoPerson() {
      let personList = this.personList
      if (personList.length == 0) {
        let data = {
          pageNum: 1,
          pageSize: 1000,
          orderType: 1,
          type: 1,
        }
        this.$axios
          .post('/ocarplay/api/photoPerson/listAjax', data)
          .then((res) => {
            if (res.status == 200) {
              let data = res.data.items
              let list = []
              data.forEach((element) => {
                list.push({
                  value: element.personId,
                  label: element.name,
                })
              })
              this.personList = list
              // console.log(this.personList)
            }
          })
      }
    },
    ///////// 获取摄影师列表 end /////////

    ///////// 获取模特列表 start /////////
    getlistModel() {
      let modelList = this.modelList
      if (modelList.length == 0) {
        let data = {
          pageNum: 1,
          pageSize: 1000,
          orderType: 1,
          type: 1,
        }
        this.$axios.post('/ocarplay/api/model/listAjax', data).then((res) => {
          if (res.status == 200) {
            let data = res.data.items
            let list = []
            data.forEach((element) => {
              list.push({
                value: element.modelId,
                label: element.name,
              })
            })
            this.modelList = list
            // console.log(this.personList)
          }
        })
      }
    },
    ///////// 获取模特列表 end /////////

    ///////// 获取场地列表 start /////////
    getListPlace() {
      let placeList = this.placeList
      if (placeList.length == 0) {
        let data = {
          pageNum: 1,
          pageSize: 1000,
        }
        this.$axios.post('/ocarplay/api/place/listAjax', data).then((res) => {
          if (res.status == 200) {
            let data = res.data.items
            let list = []
            data.forEach((element) => {
              list.push({
                value: element.placeId,
                label: element.placeName,
              })
            })
            this.placeList = list
            // console.log(this.personList)
          }
        })
      }
    },
    ///////// 获取场地列表 end /////////

    // 取消按钮
    cancel() {
      this.drawerData = false
      this.title = null
      this.cameraTime = null
    },
    // 提交按钮
    saveBtn() {
      if (this.title || this.cameraTime) {
        this.$confirm('是否提交拍摄信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.cameraShowSave()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      } else {
        this.$message.error('带*号信息不能为空！')
      }
    },
    cameraShowSave() {
      this.loading = true
      let data = {
        deptId: this.deptId, // 拍摄组
        personId: this.personId, // 摄影师Id
        modelId: this.modelId, // 模特Id
        placeId: this.placeId, // 场地Id
        title: this.title, // 拍摄任务名称
        cameraTime: this.cameraTime, // 拍摄时间
      }
      this.$axios.post('/ocarplay/api/camera/save', data).then((res) => {
        // console.log(res)
        this.loading = false
        // this.drawerAdd = false
        if (res.status == 200) {
          let data = res.data
          if (data.errcode == 0) {
            this.$message.success(data.msg)
            this.drawerData = false
            let nameId = this.$parent.$el.id
            if (nameId == 'cameraman') {
              ///////// 获取摄影师列表 start /////////
              this.$parent.getlistPhotoPerson()
            } else if (nameId == 'model') {
              ///////// 获取模特列表 start /////////
              this.$parent.getlistModel()
            } else if (nameId == 'place') {
              ///////// 获取场地列表 start /////////
              this.$parent.getPlaceList()
            }
          } else {
            this.$message.error(data.msg)
          }
        } else {
          this.$message.error('网络错误！')
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#addCamera {
  .el-input,
  .el-select {
    width: 100%;
  }
  .drawerData {
    height: 100%;
    > .el-col {
      height: 40px;
      line-height: 40px;
      margin-bottom: 13px;
    }
    .key {
      margin-left: 20px;
      padding-left: 9px;
      font-size: 18px;
      text-align: justify;
      box-sizing: border-box;
      height: 40px;
      &:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
      }
    }
    .btn {
      height: 54px;
      background: white;
      position: absolute;
      left: 0;
      bottom: 0;
      margin-bottom: 0 !important;
      .el-col {
        margin-bottom: 0;
        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
