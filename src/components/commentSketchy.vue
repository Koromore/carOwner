<template>
  <div id="commentSketchy">
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawerData"
      size="720px"
      @close="drawerDataClose"
      @open="drawerDataOpen"
      v-loading="loading"
      :close-on-press-escape="false"
      :wrapperClosable="false"
    >
      <el-scrollbar style="height: 100%">
        <el-row>
          <el-col :span="11" class="left">
            <div class="title">技术指标</div>
            <el-rate v-model="value1"></el-rate>
          </el-col>
          <el-col :span="11" :offset="2" class="right">
            <div class="title">服务指标</div>
            <el-rate v-model="value2"></el-rate>
          </el-col>
          <el-col :span="24" class="btn">
            <template v-if="type == 0">
              <el-col :span="6" :offset="5">
                <el-button type="info" @click="cancel" size="small"
                  >取消</el-button
                >
              </el-col>
              <el-col :span="6" :offset="2">
                <el-button type="primary" @click="saveBtn" size="small"
                  >提交</el-button
                >
              </el-col>
            </template>
            <template v-if="type == 1">
              <el-col :span="5" :offset="18">
                <el-button type="primary" size="small" @click="close"
                  >返回</el-button
                >
              </el-col>
            </template>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'commentSketchy',
  // 接受参数
  props: {
    commentSketchyShow: Number,
  },
  components: {},
  data() {
    return {
      drawerData: false,
      drawerTitle: '摄影师评价',
      loading: false,
      type: 0,
      personId: null, // 摄影师Id
      value1: null,
      value2: null,
    }
  },
  // 侦听器
  watch: {
    commentSketchyShow: function (newData, oldData) {
      if (newData != 0) {
        this.drawerData = true
        // console.log(newData)
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
      this.$parent.cameraListShow = 0
      this.remark = null
    },
    drawerDataOpen() {
      // console.log(this.$parent.type)
      this.type = this.$parent.type
    },
    // /api/camera/listAjax

    ///////// json数组排序 /////////
    sortby(a, b) {
      return a.gradeId - b.gradeId
    },
    ///////// json数组排序 /////////
    close() {
      this.drawerData = false
    },
    cancel() {
      this.drawerData = false
    },
    saveBtn() {
      let doUserId = this.$parent.userId
      let personId = this.personId

      let data = {
        doUserId, // 评论人
        taskId, // 任务Id
        personId, // 摄影师Id
      }
      // console.log(data)
      return
      if (max) {
        this.loading = true
        this.$axios.post('/ocarplay/api/personGrade/save', data).then((res) => {
          console.log(res)
          if (res.status == 200) {
            let data = res.data
            if (data.errcode == 0) {
              this.$message.success(data.msg)
              this.drawerData = false
              this.$parent.getlistPhotoPerson()
            } else {
              this.$message.error(data.msg)
            }
            this.loading = false
          }
        })
      } else {
        this.$message.error('分数不可超过最大值')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
#commentSketchy {
  .el-row {
    padding-top: 6px;
  }
  .el-input {
    width: 100%;
    & >>> input::-webkit-outer-spin-button,
    & >>> input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
  }
  & >>> .el-scrollbar__view {
    height: 100%;
  }
  .el-row {
    height: 100%;
    position: relative;
    .left,.right{
      height: 200px;
      text-align: center;
      border: 1px solid #cccccc;
      padding-top: 36px;
      font-size: 18px;
      font-weight: bold;
      .el-rate{
        margin-top: 49px;
        text-align: center;
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
