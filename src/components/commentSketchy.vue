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
            <el-rate v-model="techScore"></el-rate>
          </el-col>
          <el-col :span="11" :offset="2" class="right">
            <div class="title">服务指标</div>
            <el-rate v-model="serviceScore"></el-rate>
          </el-col>
          <!-- {{techScore}}
          {{serviceScore}} -->
          <el-col :span="24" class="btn">
            <!-- <template v-if="type == 0"> -->
            <el-col :span="6" :offset="5">
              <el-button type="info" @click="cancel" size="small">
                取消
              </el-button>
            </el-col>
            <el-col :span="6" :offset="2">
              <el-button type="primary" @click="saveBtn" size="small">
                提交
              </el-button>
            </el-col>
            <!-- </template> -->
            <!-- <template v-if="type == 1">
              <el-col :span="5" :offset="18">
                <el-button type="primary" size="small" @click="close">
                  返回
                </el-button>
              </el-col>
            </template> -->
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
      movieId: null,
      supplierId: null, // 摄影师供应商Id
      personId: null, // 摄影师Id
      techScore: null, // 技术分
      serviceScore: null, // 服务分
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
      this.movieId = null
      this.supplierId = null // 摄影师供应商Id
      this.personId = null // 摄影师Id
      this.techScore = null
      this.serviceScore = null
      this.remark = null
    },
    drawerDataOpen() {
      // console.log(this.$parent.type)
      // this.type = this.$parent.type
      this.movieId = this.$parent.gradeMovieId
      this.supplierId = this.$parent.gradeSupplierId
    },
    // /api/camera/listAjax

    ///////// json数组排序 /////////
    sortby(a, b) {
      return a.gradeId - b.gradeId
    },
    ///////// json数组排序 /////////
    close() {
      this.drawerData = false
      this.techScore = null // 技术分
      this.serviceScore = null // 服务分
    },
    cancel() {
      this.drawerData = false
    },
    saveBtn() {
      // let doUserId = this.$parent.userId
      let supplierId = this.supplierId

      let data = {
        movieId: this.movieId,
        movieToSupplierList: [
          {
            // msId: null,
            supplierId: supplierId,
            techScore: this.techScore, // 技术分
            serviceScore: this.serviceScore, // 服务分
          },
        ],
      }
      // console.log(data)
      if (!this.techScore || !this.serviceScore) {
        this.$message.error('分值不能为空')
        return
      }
      if (this.techScore>2&&this.techScore>2) {
        data.movieToSupplierList[0].grade = true
      }
      // return
      // if (max) {
      this.loading = true
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            let data = res.data
            if (data.errcode == 0) {
              this.$message.success('评分成功')
              this.drawerData = false
              this.$parent.getMovieListAjax()
              if (this.techScore<3||this.techScore<3) {
                this.$message.warning('分数少于2星，请进行详细评分')
                this.$parent.commentShow++
              }
            } else {
              this.$message.error(data.msg)
            }
            this.loading = false
          }
        })
        .catch((res) => {
          console.log(res)
        })
      // } else {
      //   this.$message.error('分数不可超过最大值')
      // }
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
    .left,
    .right {
      height: 200px;
      text-align: center;
      border: 1px solid #cccccc;
      padding-top: 36px;
      font-size: 18px;
      font-weight: bold;
      .el-rate {
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
