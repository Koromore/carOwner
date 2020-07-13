<template>
  <div id="analysis">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="24" class="cont">
        <div class="butBox1">
          <div :class="[tab1act==0?'but act':'but']" @click="tab1(0)">任务完成数</div>
          <div :class="[tab1act==1?'but act':'but']" @click="tab1(1)">车主发展数</div>
          <div :class="[tab1act==2?'but act':'but']" @click="tab1(2)">累计支出费用</div>
          <div :class="[tab1act==3?'but act':'but']" @click="tab1(3)">累计合作次数</div>
        </div>

        <div class="butBox2">
          <div
            :class="[tab2act==index?'but act':'but']"
            @click="tab2(index,item.id)"
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
      tab1act: 0,
      tab2act: 0,
      tab2Items: [
        {
          id: 0,
          name: '状态分布'
        },
        {
          id: 1,
          name: '时间分布'
        },
        {
          id: 2,
          name: '对象分布'
        },
        {
          id: 3,
          name: '项目组分布'
        }
      ],
      // 图表数据
      chartTitle: '任务完成数量',
      chartNum: 0,
      chartKeyData: ['执行中', '结算中', '延期', '已完成'],
      chartvalData: [520, 360, 130, 240]
    }
  },
  // 侦听器
  watch: {
    tab1act: function(newData, oldData) {
      // console.log(newData)
      if (newData == 0) {
        this.chartTitle = '任务完成数量'
        this.tab2Items = [
          {
            id: 0,
            name: '状态分布'
          },
          {
            id: 1,
            name: '时间分布'
          },
          {
            id: 2,
            name: '对象分布'
          },
          {
            id: 3,
            name: '项目组分布'
          }
        ]
      } else if (newData == 1) {
        this.chartTitle = '车主发展数'
        this.tab2Items = [
          {
            id: 0,
            name: '类型分布'
          },
          {
            id: 1,
            name: '时间分布'
          },
          {
            id: 2,
            name: '地域分布'
          },
          {
            id: 3,
            name: '项目组分布'
          }
        ]
      } else if (newData == 2) {
        this.chartTitle = '累计支出费'
        this.tab2Items = [
          {
            id: 0,
            name: '时间分布'
          },
          {
            id: 1,
            name: '项目组分布'
          }
        ]
      } else if (newData == 3) {
        this.chartTitle = '累计合作次'
        this.tab2Items = [
          {
            id: 0,
            name: '邀约对象'
          },
          {
            id: 1,
            name: '项目组分布'
          }
        ]
      }

      this.tab2act = 0
      let tab1act = newData
      let tab2act = this.tab2act
      // 获取数据
      this.getData()
    },
    tab2act: function(newData, oldData) {
      let tab1act = this.tab1act
      let tab2act = newData
      // console.log(tab2act)
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
      // 获取数据
      this.getData()
      // this.chartvalData = [520, 360, 130, 240]
      // console.log(this.chartvalData)
      // this.echartsBar()
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // 获取数据
    this.getData()
    // 生成图表
    this.echartsBar()
    // this.echartsPie()
  },
  // 方法
  methods: {
    tab1(e) {
      this.tab1act = e
    },
    tab2(e, id) {
      this.tab2act = e
      console.log(id)
    },
    getData() {
      // webType 0-任务完成数量 1-车主发展数量 2-累计支出费用 3-累计合作次数
      // type 任务分心类型 0-状态 1-时间 2-对象 3-项目组
      let data = {
        webType: this.tab1act,
        type: this.tab2act,
        // deptId: '',
        // years: ''
      }
      this.$axios
        .post('/ocarplay/api/analysis/taskAnalysis', data)
        .then(res => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data
            let tab1act = this.tab1act
            let tab2act = this.tab2act
            let chartKeyData = []
            let chartvalData = []
            this.chartNum = data.count
            if (tab1act == 0) {
              if (tab2act == 0) {
                data.data.forEach(element => {
                  chartKeyData.push(element.type)
                  chartvalData.push(element.num)
                })
                chartKeyData.forEach((element, i) => {
                  if (element == 0) {
                    chartKeyData[i] = '执行中'
                  }else if (element == 1) {
                    chartKeyData[i] = '结算中'
                  }else if (element == 2) {
                    chartKeyData[i] = '已完成'
                  }else if (element == 3) {
                    chartKeyData[i] = '延期'
                  }
                  else if (element == 4) {
                    chartKeyData[i] = '延期'
                  }
                });
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsPie(0)
                this.echartsBar()
              } else if (tab2act == 1) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE)
                  chartvalData.push(element.num)
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsPie(0)
                this.echartsBar()
              } else if (tab2act == 2) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE)
                  chartvalData.push(element.num)
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsPie(0)
                this.echartsBar()
              } else if (tab2act == 3) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE || '默认')
                  chartvalData.push({
                    value: element.num,
                    name: element.TYPE || '默认'
                  })
                })
                console.log(chartKeyData)
                console.log(chartvalData)
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsBar(0)
                this.echartsPie()
              }
            } else if (tab1act == 1) {
              if (tab2act == 0) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE)
                  chartvalData.push(element.num)
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsPie(0)
                this.echartsBar()
              } else if (tab2act == 1) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE)
                  chartvalData.push(element.num)
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsPie(0)
                this.echartsBar()
              } else if (tab2act == 2) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE)
                  chartvalData.push(element.num)
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsPie(0)
                this.echartsBar()
              } else if (tab2act == 3) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE || '默认')
                  chartvalData.push({
                    value: element.num,
                    name: element.TYPE || '默认'
                  })
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsBar(0)
                this.echartsPie()
              }
            } else if (tab1act == 2) {
              if (tab2act == 0) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE)
                  chartvalData.push(element.num)
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsPie(0)
                this.echartsBar()
              } else if (tab2act == 1) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE || '默认')
                  chartvalData.push({
                    value: element.num,
                    name: element.TYPE || '默认'
                  })
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsBar(0)
                this.echartsPie()
              }
            } else if (tab1act == 3) {
              if (tab2act == 0) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE)
                  chartvalData.push(element.num)
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsPie(0)
                this.echartsBar()
              } else if (tab2act == 1) {
                data.data.forEach(element => {
                  chartKeyData.push(element.TYPE || '默认')
                  chartvalData.push({
                    value: element.num,
                    name: element.TYPE || '默认'
                  })
                })
                this.chartKeyData = chartKeyData
                this.chartvalData = chartvalData
                // 图表生成
                this.echartsBar(0)
                this.echartsPie()
              }
            }
          }
        })
    },
    // 图表
    echartsBar(res) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chartBar'))
      // 绘制图表
      let title = this.chartTitle
      let chartNum = this.chartNum
      let chartKeyData = this.chartKeyData
      let chartvalData = this.chartvalData
      myChart.setOption({
        title: {
          text: title,
          subtext: chartNum + '个',
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
      let chartNum = this.chartNum
      let chartKeyData = this.chartKeyData
      let chartvalData = this.chartvalData

      myChart.setOption({
        title: {
          text: title,
          subtext: chartNum + '个',
          subtextStyle: { fontSize: 20 },
          left: 'left'
        },
        color: ['#2B4E76', '#4175B1', '#A4C3E2'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: chartKeyData
        },
        series: [
          {
            name: '项目组',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: chartvalData,
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
        height: 36px;
        margin-left: 36px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-radius: 6px;
        border: 1px solid rgb(205, 205, 205);
        overflow: hidden;
        .but {
          width: 81px;
          height: 36px;
          line-height: 36px;
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
        height: 36px;
        margin-left: 36px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-radius: 6px;
        border: 1px solid rgb(205, 205, 205);
        .but {
          width: 81px;
          height: 36px;
          line-height: 36px;
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
      width: 95%;
      height: 90%;
    }
  }
}
</style>
