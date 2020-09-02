<template>
  <div id="noDataList" :style="noDatastyle">
    <!-- <div class="content"> -->
      <img width="30%" src="static/images/carow/empty.png" alt srcset />
      <p>很抱歉，还没有内容哦!</p>
    <!-- </div> -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'noDataList',
  props: {noDatastyle:String}, // 接受参数
  components: {}, // 注册组件
  data() {
    return {
      
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {},
}
</script>
<style lang="scss" scoped>
#noDataList {
  height: 100%;
  width: 100%;
  text-align: center;
  color: #666;
  box-sizing: border-box;
  margin-top: 30%;
  p{
    margin-top: 9px;
  }
}
</style>
