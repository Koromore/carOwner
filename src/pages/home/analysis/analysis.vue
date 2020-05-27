<template>
  <div id="analysis">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="24" class="cont">
        <div class="butBox1">
          <div :class="[tab1act==1?'but act':'but']" @click="tab1(1)">任务完成数</div>
          <div :class="[tab1act==2?'but act':'but']" @click="tab1(2)">车主发展数</div>
          <div :class="[tab1act==3?'but act':'but']" @click="tab1(3)">累计支出费用</div>
          <div :class="[tab1act==4?'but act':'but']" @click="tab1(4)">累计合作次数</div>
        </div>

        <div class="butBox2">
          <div
            :class="[tab2act==index?'but act':'but']"
            @click="tab2(index)"
            v-for="(item,index) in tab2Items"
            :key="index"
          >{{item.name}}</div>
          <!-- <div :class="[tab2act==2?'but act':'but']" @click="tab2(2)">项目组分布</div> -->
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容图表 start -->
    <el-row class="content">
      <div id="chartBar"></div>
    </el-row>
    <!-- 内容图表 end -->
  </div>
</template>
<script>
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入饼状图
require('echarts/lib/chart/pie')
// 引入提示框,标题,图例组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
  name: 'analysis',
  components: {},
  data() {
    return {
      tab1act: 1,
      tab2act: 0,
      tab2Items: [
        {
          id: 1,
          name: '状态分布'
        },
        {
          id: 2,
          name: '时间分布'
        },
        {
          id: 3,
          name: '对象分布'
        },
        {
          id: 4,
          name: '项目组分布'
        }
      ],
      // 图表数据
      chartTitle: '任务完成数量',
      chartKeyData: ['执行中', '结算中', '延期', '已完成'],
      chartvalData: [520, 360, 130, 240]
    }
  },
  // 侦听器
  watch: {
    tab1act: function(newData, oldData) {
      // console.log(newData)
      if (newData == 1) {
        this.tab2Items = [
          {
            id: 1,
            name: '状态分布'
          },
          {
            id: 2,
            name: '时间分布'
          },
          {
            id: 3,
            name: '对象分布'
          },
          {
            id: 4,
            name: '项目组分布'
          }
        ]
      } else if (newData == 2) {
        this.tab2Items = [
          {
            id: 5,
            name: '类型分布'
          },
          {
            id: 2,
            name: '时间分布'
          },
          {
            id: 6,
            name: '地域分布'
          },
          {
            id: 4,
            name: '项目组分布'
          }
        ]
      } else if (newData == 3) {
        this.tab2Items = [
          {
            id: 2,
            name: '时间分布'
          },
          {
            id: 4,
            name: '项目组分布'
          }
        ]
      } else if (newData == 4) {
        this.tab2Items = [
          {
            id: 7,
            name: '邀约对象'
          },
          {
            id: 4,
            name: '项目组分布'
          }
        ]
      }

      this.tab2act = 0
      let tab1act = newData
      let tab2act = this.tab2act
    },
    tab2act: function(newData, oldData) {
      let tab1act = this.tab1act
      let tab2act = newData
      console.log(tab2act)
      if (tab2act == 0) {
        this.chartKeyData = ['执行中', '结算中', '延期', '已完成']
        this.chartvalData = [520, 360, 130, 240]
        this.echartsPie(0)
        this.echartsBar()
      } else if (tab2act == 1) {
        this.chartKeyData = [
          '2019-01',
          '2019-02',
          '2019-03',
          '2019-04',
          '2019-05',
          '2019-06',
          '2019-07',
          '2019-08',
          '2019-09',
          '2019-10',
          '2019-11',
          '2019-12'
        ]
        this.chartvalData = [
          520,
          360,
          130,
          240,
          240,
          240,
          240,
          240,
          240,
          240,
          240,
          240
        ]
        this.echartsPie(0)
        this.echartsBar()
      } else if (tab2act == 2) {
        this.chartKeyData = ['资源型车主', '拍摄型车主', '支持型车主']
        this.chartvalData = [520, 360, 130]
        this.echartsPie(0)
        this.echartsBar()
      } else if (tab2act == 3) {
        this.echartsBar(0)
        this.echartsPie()
      }

      // this.chartvalData = [520, 360, 130, 240]
      // console.log(this.chartvalData)
      // this.echartsBar()
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    this.echartsBar()
    // this.echartsPie()
  },
  // 方法
  methods: {
    tab1(e) {
      this.tab1act = e
    },
    tab2(e) {
      this.tab2act = e
    },
    // 图表
    echartsBar(res) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chartBar'))
      // 绘制图表
      let title = this.chartTitle
      let chartKeyData = this.chartKeyData
      let chartvalData = this.chartvalData
      myChart.setOption({
        title: {
          text: title,
          subtext: 13600 + '个',
          subtextStyle: { fontSize: 20 }
          // fontSize
        },
        color: 'rgb(106, 145, 232)',
        tooltip: {},
        xAxis: {
          data: chartKeyData
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: chartvalData,
            barWidth: 54,
            label: {
              show: true,
              position: 'top',
              fontSize: 16,
              color: 'black'
            }
          }
        ]
      })
      if (res == 0) {
        myChart.dispose()
      }
    },
    // 图表
    echartsPie(res) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chartBar'))
      // 绘制图表
      let title = this.chartTitle

      myChart.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      if (res == 0) {
        myChart.dispose()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#analysis {
  height: 100%;
  .top {
    height: 88px;
    margin-bottom: 9px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .cont {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .butBox1 {
        width: auto;
        height: 48px;
        margin-left: 36px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-radius: 6px;
        border: 1px solid rgb(205, 205, 205);
        .but {
          width: 113px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          box-sizing: border-box;
          border-left: 1px solid rgb(205, 205, 205);
        }
        .but:nth-of-type(1) {
          border: none;
        }
        .but.act,
        .but:hover {
          font-weight: bold;
          color: white;
          background: rgb(106, 145, 232);
        }
      }
      .butBox2 {
        width: auto;
        height: 48px;
        margin-left: 36px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-radius: 6px;
        border: 1px solid rgb(205, 205, 205);
        .but {
          width: 113px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          box-sizing: border-box;
          border-left: 1px solid rgb(205, 205, 205);
        }
        .but:nth-of-type(1) {
          border: none;
        }
        .but.act,
        .but:hover {
          font-weight: bold;
          color: white;
          background: rgb(103, 169, 214);
        }
      }
    }
  }
  .content {
    height: calc(100% - 97px);
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    #chartBar {
      width: 80%;
      height: 100%;
    }
  }
}
</style>
