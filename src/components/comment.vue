<template>
  <div id="comment">
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawerData"
      size="640px"
      @close="drawerDataClose"
      @open="drawerDataOpen"
      v-loading="loading"
    >
      <el-scrollbar style="height:100%">
        <el-row>
          <el-col :span="3" class="left">
            <el-col class="firstGrade">
              <span>技</span>
              <span>术</span>
              <span>指</span>
              <span>标</span>
            </el-col>
            <el-col class="firstGrade">
              <span>服</span>
              <span>务</span>
              <span>指</span>
              <span>导</span>
            </el-col>
          </el-col>
          <el-col :span="21" class="right">
            <el-col class="gradeList" v-for="(item,index) in gradeList" :key="index">
              <span>{{item.secondGrade}}/</span>
              <span>{{item.thirdGrade}}</span>
              <div class="score">
                <el-col :span="12">
                  <el-input v-model="item.score" placeholder="请输入" type="number"></el-input>
                </el-col>
                <el-col :span="12">满分{{item.total}}</el-col>
              </div>
            </el-col>
          </el-col>
          <el-col class="bottom">
            <el-col>备注信息</el-col>
            <el-col>
              <el-input v-model="remark" type="textarea" :rows="2" placeholder="请输入评论内容"></el-input>
            </el-col>
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
      </el-scrollbar>
    </el-drawer>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'comment',
  // 接受参数
  props: {
    commentShow: Number,
  },
  components: {},
  data() {
    return {
      drawerData: false,
      drawerTitle: '摄影师品论',
      loading: false,
      personId: null, // 摄影师Id
      cameraTime: null, // 拍摄时间
      gradeList: [], // 评分列表
      remark: null, // 备注
    }
  },
  // 侦听器
  watch: {
    commentShow: function (newData, oldData) {
      if (newData != 0) {
        this.drawerData = true
      }
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    this.getGradeList()
  },
  // 方法
  methods: {
    //
    drawerDataClose() {
      this.$parent.cameraListShow = 0
    },
    drawerDataOpen() {
      let data = {
        pageNum: 1,
        pageSize: 1000,
        camera: {},
      }
      this.personId = this.$parent.personId
      this.getGradeList()
    },
    // /api/camera/listAjax
    getGradeList() {
      // console.log(data)
      let data = {
        pageNum: 1,
        pageSize: 20,
      }
      this.$axios.post('/ocarplay/api/grade/listAjax', data).then((res) => {
        console.log(res)
        if (res.status == 200) {
          let data = res.data
          data.items.forEach((element) => {
            element.score = 1
          })
          this.gradeList = data.items
          this.loading = false
        }
      })
    },
    cancel() {},
    saveBtn() {
      let doUserId = this.$parent.userId
      let personId = this.personId
      let remark = this.remark
      let gradeInfoList = []
      let personScore = 0
      let gradeList = this.gradeList
      gradeList.forEach((element) => {
        gradeInfoList.push({
          gradeId: element.gradeId,
          score: element.score*1,
        })
        personScore += element.score*1
      })
      let data = {
        doUserId,
        gradeInfoList,
        personId, // 摄影师Id
        personScore,
        remark,
      }
      // console.log(data)
      this.loading = true
      this.$axios.post('/ocarplay/api/personGrade/save', data).then((res) => {
        console.log(res)
        if (res.status == 200) {
          let data = res.data
          // data.items.forEach((element) => {
          //   element.score = 0
          // })
          // this.gradeList = data.items
          if (data.errcode==0) {
            this.$message.success(data.msg)
            this.drawerData = false
          }else {
            this.$message.error(data.msg)
          }
          this.loading = false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#comment {
  .el-input {
    width: 100%;
    & >>> input::-webkit-outer-spin-button,
    & >>> input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
  }
  .left {
    .firstGrade {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .firstGrade:nth-of-type(1) {
      height: 405px;
    }
    .firstGrade:nth-of-type(2) {
      height: 180px;
    }
  }
  .gradeList {
    height: 45px;
    line-height: 45px;
    span:nth-of-type(1) {
      font-size: 14px;
      font-weight: 700;
    }
    span:nth-of-type(2) {
      font-size: 12px;
    }
    .score {
      float: right;
      width: 100px;
    }
  }
  .bottom {
    margin-bottom: 36px;
  }
  .el-row {
    position: relative;
    .btn {
      height: 54px;
      background: white;
      // position: absolute;
      // left: 0;
      // bottom: 0;
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
