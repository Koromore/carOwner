<template>
  <div id="placeCameraList">
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawerData"
      size="566px"
      @close="drawerDataClose"
      v-loading="loading"
    >
      <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
    </el-drawer>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'placeCameraList',
  // 接受参数
  props: {
    placeCameraListShow: Number,
  },
  components: {},
  data() {
    return {
      drawerData: false,
      drawerTitle: '场地拍摄记录',
      loading: false,
      placeId: null, // 场地Id
      title: null, // 任务名称
      cameraTime: null, // 拍摄时间
    }
  },
  // 侦听器
  watch: {
    placeCameraListShow: function (newData, oldData) {
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
    saveBtn(){
      if (this.title||this.cameraTime) {
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
      }else{
        this.$message.error("带*号信息不能为空！")
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
          if (data.errcode==0) {
            this.$message.success(data.msg)
            this.drawerData = false
          }else{
            this.$message.error(data.msg)
          }
        }else{
          this.$message.error('网络错误！')
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#placeCameraList {
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
