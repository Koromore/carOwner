<template>
  <div id="commentList">
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawerData"
      size="566px"
      @close="drawerDataClose"
      @open="drawerDataOpen"
      v-loading="loading"
    >
      <el-scrollbar style="height:100%">
        <el-timeline>
          <el-timeline-item
            :timestamp="item.updateTime"
            placement="top"
            v-for="(item,index) in personGradeList"
            :key="index"
          >
            <el-card>
              <el-col :span="12">评分：{{item.personScore}}分</el-col>
              <el-col :span="12">评价人：{{item.deptName}}-{{item.realName}}</el-col>
              <el-col :span="24">{{item.remark}}</el-col>
              <el-col :span="24" @click.native="toCmmentDetails(item.pgId)">查看详细评分</el-col>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-col v-if="personGradeList.length==0" class="noData">暂无{{drawerTitle}}...</el-col>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'commentList',
  // 接受参数
  props: {
    commentListShow: Number,
  },
  components: {},
  data() {
    return {
      drawerData: false,
      drawerTitle: '评论详情',
      loading: false,
      placeId: null, // 场地Id
      title: null, // 任务名称
      cameraTime: null, // 拍摄时间
      personGradeList: [],
    }
  },
  // 侦听器
  watch: {
    commentListShow: function (newData, oldData) {
      if (newData != 0) {
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
      this.$parent.cameraListShow = 0
    },
    drawerDataOpen() {
      let data = {
        pageNum: 1,
        pageSize: 1000,
        personGrade: {
          personId: this.$parent.personId,
        },
      }
      this.getPersonGradeList(data)
    },
    ///////// 获取评论列表 start /////////
    getPersonGradeList(data) {
      // console.log(data)
      this.$axios
        .post('/ocarplay/api/personGrade/listAjax', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            this.personGradeList = data.items
            this.loading = false
          }
        })
    },
    ///////// 获取评论列表 end /////////

    ///////// 打开评论详情 start /////////
    toCmmentDetails(id){
      // console.log(this.$parent.commentShow)
      this.$parent.type = 1
      // console.log(this.$parent.type)
      this.$parent.pgId = id
      this.$parent.commentShow += 1
      
    }
    ///////// 打开评论详情 end /////////
  },
}
</script>
<style lang="scss" scoped>
$icoColor: #6a91e8;
#commentList {
  .el-input {
    width: 100%;
  }
  // .drawerData {
  // height: 100%;
  .el-card {
    .el-col {
      margin-bottom: 13px;
      &:nth-last-of-type(3),
      &:nth-last-of-type(1) {
        text-align: right;
      }
      &:nth-last-of-type(1){
        color: $icoColor;
        cursor: pointer;
      }
    }
  }
  // }
}
</style>
