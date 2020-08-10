<template>
  <div id="cameraList">
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
            :timestamp="item.cameraTime"
            placement="top"
            v-for="(item,index) in cameraList"
            :key="index"
          >
            <el-card>
              <p>拍摄任务：{{item.title}}</p>
              <p>摄影师：{{item.personName}}</p>
              <p>模特：{{item.modelName}}</p>
              <p>场地：{{item.placeName}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-col v-if="cameraList.length==0" class="noData">暂无{{drawerTitle}}...</el-col>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'cameraList',
  // 接受参数
  props: {
    cameraListShow: Number,
  },
  components: {},
  data() {
    return {
      drawerData: false,
      drawerTitle: '拍摄记录',
      loading: false,
      placeId: null, // 场地Id
      title: null, // 任务名称
      cameraTime: null, // 拍摄时间
      cameraList: [],
    }
  },
  // 侦听器
  watch: {
    cameraListShow: function (newData, oldData) {
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
        camera: {},
      }
      let type = this.$parent.$el.id
      // console.log(this.$parent.$el.id)
      if (type == 'cameraman') {
        data.camera.personId = this.$parent.personId
      } else if (type == 'model') {
        data.camera.modelId = this.$parent.modelId
      } else if (type == 'place') {
        data.camera.placeId = this.$parent.placeId
      }
      this.getCameraList(data)
    },
    // /api/camera/listAjax
    getCameraList(data) {
      // console.log(data)
      this.$axios.post('/ocarplay/api/camera/listAjax', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data
          this.cameraList = data.items
          this.loading = false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#cameraList {
  .el-input {
    width: 100%;
  }
  .el-card {
    p {
      margin-bottom: 13px;
    }
  }
}
</style>
