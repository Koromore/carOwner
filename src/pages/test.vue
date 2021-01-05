<template>
  <div class="test">
    
    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
      ></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>-->

    <!--  -->
    <!-- <el-calendar>
      <template slot="dateCell" slot-scope="{date, data}">
        <p
          :class="data.isSelected ? 'is-selected' : ''"
        >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>

        {{data.isSelected}}
        {{data.day}}
        <div class="box">{{data}}</div>
        {{test(date)}}
      </template>
    </el-calendar>-->

    <div id="g2"></div>

    <el-date-picker
      v-model="periodTime"
      :picker-options="pickerOptions"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :onPick="onPick"
      :unlink-panels="test"
    ></el-date-picker>
  </div>
</template>
<script>
import veCalendar from 've-calendar'
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
// import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  // 页面名称
  name: 'test',
  // 接受父组件传值
  props: {},
  // 定义模板
  components: {
    veCalendar,
    // swiper,
    //  swiperSlide,
  },
  // Data数据
  data() {
    return {
      test: true,
      // 禁止选择当前时间之前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        },
      },
      periodTime: '',
      // valueDate: {
      //   time: 1
      // },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司',
        },
      ],
      flag: true,
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  mounted() {
    let data = {
      movieType: 1,
      budgetApplyId: 1624,
      subItemsId: 131,
      subjectId: 8,
      applyDetailId: 24729,
      subjectTempId: 0,
      jsonData:
        '[{"num":2,"budget":505.1,"reqFinishTime":"2020-12-30","remark":"武汉-博越-2020款 2.0L 手动两驱智悦型-视频拍摄-2020-12-22"}]',

      city: '武汉',
      carTypeId: 1,
      carSeriesId: 1,
      photoType: 1,
      isModel: true,
      isPerson: true,
      placeId: 1,
      startTime: '2020-12-01',
      endTime: '2020-12-30',
      num: 2,
      photoTime: '2020-12-22',
      money: 505.1,
      moneyRemark: 'ccc',
      movieFileList: [
        {
          fileName: '111',
          suffix: 'doc',
          localPath: 'c:',
          updateUserId: 3985,
        },
        {
          fileName: '222',
          suffix: 'doc',
          localPath: 'c:',
          updateUserId: 3985,
        },
      ],
      movieDescList: [
        {
          descName: 'descName',
          place: 'place',
          photoDesc: 'photoDesc',
          personDesc: 'personDesc',
          otherDesc: 'otherDesc',
        },
        {
          descName: 'descName',
          place: 'place',
          photoDesc: 'photoDesc',
          personDesc: 'personDesc',
          otherDesc: 'otherDesc',
        },
      ],
    }

    this.G2()
  },
  created() {
    //只有一张图片时不轮播
    this.swiperOption.autoplay =
      this.swiperList.length != 1
        ? {
            disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
            delay: 3000, // 自动切换的时间间隔（单位ms）
          }
        : false
  },
  // 方法
  methods: {
    onPick(time) {
      console.log(123)
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
      console.log(1)
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
      console.log(2)
    },

    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      let flag = this.flag
      if (flag) {
        console.log(flag)
        this.flag = false
      }
      // return row.tag === value
    },
    filterHandler(value, row, column) {
      console.log(5)
      const property = column['property']
      return row[property] === value
    },
    test(res) {
      return res
    },
    G2() {
      // 数据来源于 https://github.com/react-d3/react-d3-map-bubble
      fetch('https:/g2.antv.vision/zh/examples/data/china-provinces.geo.json')
        .then((res) => res.json())
        .then((mapData) => {
          fetch('../data/earthquake.json')
            // .then(res => res.json())
            .then((data) => {
              console.log(data)
              const chart = new Chart({
                container: 'g2',
                autoFit: true,
                width: 700,
                height: 500,
                padding: [],
              })
              // force sync scales
              chart.scale({
                x: { sync: false },
                y: { sync: false },
              })
              chart.coordinate('rect').reflect('y')
              chart.legend(false)
              chart.axis(false)

              // style the tooltip
              chart.tooltip({
                showTitle: false,
                shared: true,
                showMarkers: false,
                containerTpl:
                  '<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>',
                itemTpl:
                  '<tr data-index="{index}"><td style="padding:5px;background-color:#545454;">{name}</td><td style="padding:5px;background-color:#fff;color:#000;">{value}</td></tr>',
                domStyles: {
                  'g2-tooltip': {
                    borderRadius: '2px',
                    backgroundColor: '#DDDDDD',
                    padding: 0,
                    border: '1px solid #333',
                  },
                },
              })
              // data set
              const ds = new DataSet()

              // draw the map
              const dv = ds
                .createView('back')
                .source(mapData, {
                  type: 'GeoJSON',
                })
                .transform({
                  type: 'geo.projection',
                  projection: 'geoMercator',
                  as: ['x', 'y', 'centroidX', 'centroidY'],
                })
              const bgView = chart.createView()
              bgView.data(dv.rows)
              bgView.tooltip(false)
              bgView.polygon().position('x*y').style({
                fill: '#DDDDDD',
                stroke: '#b1b1b1',
                lineWidth: 0.5,
                fillOpacity: 0.85,
              })

              // draw the bubble plot
              const userData = ds.createView().source(data)
              userData.transform({
                type: 'map',
                callback: (obj) => {
                  const projectedCoord = dv.geoProjectPosition(
                    [obj.lng * 1, obj.lat * 1],
                    'geoMercator'
                  )
                  obj.x = projectedCoord[0]
                  obj.y = projectedCoord[1]
                  obj.deaths = obj.deaths * 1
                  obj.magnitude = obj.magnitude * 1
                  return obj
                },
              })
              const pointView = chart.createView()
              pointView.data(userData.rows)
              pointView
                .point()
                .position('x*y')
                .size('deaths', [2, 30])
                .shape('circle')
                .color('#FF2F29')
                .tooltip('date*location*lat*lng*deaths*magnitude')
                .style({
                  fillOpacity: 0.45,
                })
                .state({
                  active: {
                    style: {
                      lineWidth: 1,
                      stroke: '#FF2F29',
                    },
                  },
                })
              pointView.interaction('element-active')
              chart.render()
            })
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.is-selected {
  color: #1989fa;
}
.box:hover {
  background: red;
}
#g2 {
  width: 600px;
}
</style>
