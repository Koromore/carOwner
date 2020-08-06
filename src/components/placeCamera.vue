<template>
  <div id="placeCamera">
    <el-drawer
      title="新增拍摄记录"
      :visible.sync="drawerData"
      size="566px"
      @close="drawerDataClose"
      v-loading="loading"
    >
      <el-row class="drawerData">
        <el-col :span="5" class="key imp">新增任务</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-input placeholder="请输入内容" v-model="title" clearable></el-input>
        </el-col>
        <el-col :span="5" class="key imp">摄影师</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="key imp">模特</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="key imp">场地</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="16" class="val">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
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
  name: 'placeCamera',
  // 接受参数
  props: {
    placeCameraShow: Number,
  },
  components: {},
  data() {
    return {
      drawerData: false,
      loading: false,
      placeId: null, // 场地Id
      title: null, // 任务名称
      cameraTime: null, // 拍摄时间
      options: [
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
      value: '',
    }
  },
  // 侦听器
  watch: {
    placeCameraShow: function (newData, oldData) {
      this.drawerData = true
      this.placeId = this.$parent.placeId
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {
    //
    drawerDataClose() {},
    // 取消按钮
    cancel() {
      this.drawerData = false
      this.title = null
      this.cameraTime = null
    },
    // 提交按钮
    saveBtn() {
      if (this.title || this.cameraTime) {
        this.$confirm('是否删场地拍摄信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.placeCameraSave()
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
    placeCameraSave() {
      this.loading = true
      let data = {
        placeId: this.placeId, // 场地Id
        title: this.title, // 拍摄任务名称
        cameraTime: this.cameraTime, // 拍摄时间
      }
      this.$axios.post('/ocarplay/api/placeCamera/save', data).then((res) => {
        // console.log(res)
        this.loading = false
        // this.drawerAdd = false
        if (res.status == 200) {
          let data = res.data
          if (data.errcode == 0) {
            this.$message.success(data.msg)
            this.drawerData = false
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
#placeCamera {
  .el-input {
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
