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
          <el-col :span="2" class="left">
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
          <el-col :span="21" :offset="1" class="right">
            <template v-if="type==0">
              <el-col class="gradeList" v-for="(item,index) in gradeList" :key="index">
                <span>{{item.secondGrade}}/</span>
                <span>{{item.thirdGrade}}</span>
                <div class="score">
                  <template v-if="type==0">
                    <el-col :span="16">
                      <el-input
                        v-model="item.score"
                        placeholder="请输入"
                        type="number"
                        :max="5"
                        :min="0"
                        size="mini"
                      ></el-input>
                    </el-col>
                    <el-col :span="8">/{{item.total}}</el-col>
                  </template>
                  <template v-if="type==1">
                    <el-col :span="20" :offset="4">分数</el-col>
                  </template>
                </div>
              </el-col>
            </template>
            <template v-else-if="type==1">
              <el-col class="gradeList" v-for="(item,index) in gradeList" :key="index">
                <span>{{item.grade.secondGrade}}/</span>
                <span>{{item.grade.thirdGrade}}</span>
                <div class="score">
                  <el-col :span="20" :offset="4">{{item.score}}分</el-col>
                </div>
              </el-col>
            </template>
          </el-col>
          <el-col class="bottom">
            <template v-if="type==0">
              <el-col>备注信息</el-col>
              <el-col>
                <el-input v-model="remark" type="textarea" :rows="4" placeholder="请输入评论内容"></el-input>
              </el-col>
            </template>
            <template v-if="type==1">
              <el-col>总体评分 {{personScore}}分</el-col>
              <el-col>备注信息 {{remark}}</el-col>
            </template>
          </el-col>
          <el-col :span="24" class="btn">
            <template v-if="type==0">
              <el-col :span="6" :offset="5">
                <el-button type="info" @click="cancel" size="small">取消</el-button>
              </el-col>
              <el-col :span="6" :offset="2">
                <el-button type="primary" @click="saveBtn" size="small">提交</el-button>
              </el-col>
            </template>
            <template v-if="type==1">
              <el-col :span="5" :offset="18">
                <el-button type="primary" size="small" @click="close">返回</el-button>
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
      type: 0,
      personId: null, // 摄影师Id
      cameraTime: null, // 拍摄时间
      gradeList: [], // 评分列表
      remark: null, // 备注
      personScore: 0, // 总分
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
      this.remark = null
    },
    drawerDataOpen() {
      console.log(this.$parent.type)
      this.type = this.$parent.type
      if (this.type == 0) {
        this.personId = this.$parent.personId
        this.getGradeList()
      } else if (this.type == 1) {
        this.personGradeShow()
      }
    },
    // /api/camera/listAjax

    ///////// json数组排序 /////////
    sortby(a, b) {
      return a.gradeId - b.gradeId
    },
    ///////// json数组排序 /////////

    getGradeList() {
      // console.log(data)
      let data = {
        pageNum: 1,
        pageSize: 20,
      }
      this.$axios.post('/ocarplay/api/grade/listAjax', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data
          data.items.forEach((element) => {
            element.score = 0
          })
          ///////// json数组排序 /////////
          data.items.sort(this.sortby)
          this.gradeList = data.items
          this.loading = false
        }
      })
    },
    personGradeShow() {
      // console.log(data)
      let data = {
        pgId: this.$parent.pgId,
      }
      this.$axios.post('/ocarplay/api/personGrade/show', data).then((res) => {
        console.log(res)
        if (res.status == 200) {
          let data = res.data
          // data.items.forEach((element) => {
          //   element.score = 0
          // })
          // ///////// json数组排序 /////////
          // data.items.sort(this.sortby)
          this.gradeList = data.gradeInfoList
          this.personScore = data.personScore
          this.remark = data.remark
          // this.loading = false
        }
      })
    },
    close() {
      this.drawerData = false
    },
    cancel() {
      this.drawerData = false
    },
    saveBtn() {
      let doUserId = this.$parent.userId
      let personId = this.personId
      let remark = this.remark
      let gradeInfoList = []
      let personScore = 0
      let gradeList = this.gradeList
      let max = true
      gradeList.forEach((element) => {
        gradeInfoList.push({
          gradeId: element.gradeId,
          score: element.score * 1,
        })
        if (element.score * 1 > element.total) {
          max = false
        }
        personScore += element.score * 1
      })
      let data = {
        doUserId,
        gradeInfoList,
        personId, // 摄影师Id
        personScore,
        remark,
      }
      // console.log(data)
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
#comment {
  .el-row{
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
  .left {
    .firstGrade {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid #6a91e842;
      color: #4a6fc2;
    }
    .firstGrade:nth-of-type(1) {
      height: 477px;
      margin-bottom: 9px;
    }
    .firstGrade:nth-of-type(2) {
      height: 207px;
    }
  }
  .gradeList {
    height: 45px;
    line-height: 45px;
    box-shadow: 0 0 10px 0 #ddd;
    margin-bottom: 9px;
    padding-left: 9px;
    border-radius: 6px;
    span:nth-of-type(1) {
      font-size: 14px;
      font-weight: 700;
    }
    span:nth-of-type(2) {
      font-size: 12px;
    }
    .score {
      float: right;
      width: 90px;
    }
  }
  .bottom {
    margin: 13px 0;
    div:nth-of-type(1){
      margin-bottom: 6px;
    }
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
