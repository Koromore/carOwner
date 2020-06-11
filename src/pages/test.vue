<template>
  <div class="test">
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
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
    </el-table>

    <!--  -->
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{date, data}">
        <!-- {{date}} -->
        <p
          :class="data.isSelected ? 'is-selected' : ''"
        >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>

        <!-- {{data.isSelected}}
        {{data.day}}-->
        <!-- <div class="box">{{data}}</div> -->
        <!-- {{test(date)}} -->
      </template>
      <!-- 123 -->
    </el-calendar>

    <div id="g2"></div>
  </div>
</template>
<script>
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
export default {
  // 页面名称
  name: 'test',
  // 接受父组件传值
  props: {},
  // 定义模板
  components: {},
  // Data数据
  data() {
    return {
      // valueDate: {
      //   time: 1
      // },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }
      ],
      flag: true
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  mounted() {
    // test(){
    let data = {
      id: 1,
      name: '解雨臣'
    }
    this.G2()
  },
  // 方法
  methods: {
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
      let data = [
        {
          createTime: '2020-06-02 14:54:31',
          deleteFlag: false,
          ownerItems: [
            {
              card: true,
              createTime: '2020-06-03 14:50:21',
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 1,
              itemIds: null,
              itemName: '合作事项1',
              money: null,
              typeId: 1,
              typeName: null,
              updateTime: null,
              vehicleOwners: [
                {
                  bbsId: '汽车之家ID',
                  birthday: '2020-06-02',
                  buycarplace: '光谷广场店',
                  carSeriesName: null,
                  carUse: '家用车',
                  city: '武汉市',
                  coopId: null,
                  cooperates: null,
                  createTime: '2020-06-04 06:56:21',
                  deleteFlag: false,
                  deptId: 93,
                  doUserId: null,
                  dyId: '打野先锋',
                  email: '11111@163.com',
                  homeAddress: '武大科技园',
                  homeUrl: 'www.baidu.com',
                  image: null,
                  invites: null,
                  ipGrows: null,
                  itemId: 1,
                  name: '测试车主',
                  otherId: null,
                  ownerCoops: null,
                  phone: '1567895565',
                  plateNum: null,
                  province: '湖北省',
                  qq: '56565656',
                  relations: null,
                  seriesId: 5,
                  sex: true,
                  skillId: null,
                  skillName: null,
                  sourceId: null,
                  sourceName: null,
                  typeId: 1,
                  updateTime: null,
                  vehicleOwnerId: 1,
                  vinno: '111111',
                  weiboId: '1111',
                  work: '111',
                  wx: '1111'
                }
              ]
            },
            {
              card: true,
              createTime: '2020-06-03 03:00:22',
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 4,
              itemIds: null,
              itemName: '合作事项2',
              money: 0,
              typeId: 1,
              typeName: null,
              updateTime: '2020-06-03 03:01:07',
              vehicleOwners: []
            },
            {
              card: true,
              createTime: null,
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 5,
              itemIds: null,
              itemName: '租借车辆',
              money: 30,
              typeId: 1,
              typeName: null,
              updateTime: null,
              vehicleOwners: []
            },
            {
              card: true,
              createTime: null,
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 6,
              itemIds: null,
              itemName: '发布',
              money: 30,
              typeId: 1,
              typeName: null,
              updateTime: null,
              vehicleOwners: []
            },
            {
              card: true,
              createTime: null,
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 7,
              itemIds: null,
              itemName: 'ID',
              money: 30,
              typeId: 1,
              typeName: null,
              updateTime: null,
              vehicleOwners: []
            }
          ],
          typeId: 1,
          typeName: '支持型',
          updateTime: null
        },
        {
          createTime: '2020-06-02 14:54:47',
          deleteFlag: false,
          ownerItems: [
            {
              card: true,
              createTime: null,
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 8,
              itemIds: null,
              itemName: 'IP孵化器',
              money: 1000,
              typeId: 2,
              typeName: null,
              updateTime: null,
              vehicleOwners: []
            },
            {
              card: true,
              createTime: null,
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 9,
              itemIds: null,
              itemName: '签约摄影师',
              money: 1000,
              typeId: 2,
              typeName: null,
              updateTime: null,
              vehicleOwners: []
            }
          ],
          typeId: 2,
          typeName: '拍摄型',
          updateTime: null
        },
        {
          createTime: '2020-06-02 14:55:00',
          deleteFlag: false,
          ownerItems: [
            {
              card: true,
              createTime: null,
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 10,
              itemIds: null,
              itemName: '自驾',
              money: 100,
              typeId: 3,
              typeName: null,
              updateTime: null,
              vehicleOwners: []
            },
            {
              card: true,
              createTime: null,
              deleteFlag: false,
              isCard: true,
              isCards: null,
              itemId: 11,
              itemIds: null,
              itemName: '越野',
              money: 100,
              typeId: 3,
              typeName: null,
              updateTime: null,
              vehicleOwners: []
            }
          ],
          typeId: 3,
          typeName: '资源型',
          updateTime: null
        }
      ]
    },
    G2() {
      // 数据来源于 https://github.com/react-d3/react-d3-map-bubble
      fetch('https:/g2.antv.vision/zh/examples/data/china-provinces.geo.json')
        .then(res => res.json())
        .then(mapData => {
          fetch('../data/earthquake.json')
            // .then(res => res.json())
            .then(data => {
              console.log(data)
              const chart = new Chart({
                container: 'g2',
                autoFit: true,
                width: 700,
                height: 500,
                padding: []
              })
              // force sync scales
              chart.scale({
                x: { sync: false },
                y: { sync: false }
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
                    border: '1px solid #333'
                  }
                }
              })
              // data set
              const ds = new DataSet()

              // draw the map
              const dv = ds
                .createView('back')
                .source(mapData, {
                  type: 'GeoJSON'
                })
                .transform({
                  type: 'geo.projection',
                  projection: 'geoMercator',
                  as: ['x', 'y', 'centroidX', 'centroidY']
                })
              const bgView = chart.createView()
              bgView.data(dv.rows)
              bgView.tooltip(false)
              bgView
                .polygon()
                .position('x*y')
                .style({
                  fill: '#DDDDDD',
                  stroke: '#b1b1b1',
                  lineWidth: 0.5,
                  fillOpacity: 0.85
                })

              // draw the bubble plot
              const userData = ds.createView().source(data)
              userData.transform({
                type: 'map',
                callback: obj => {
                  const projectedCoord = dv.geoProjectPosition(
                    [obj.lng * 1, obj.lat * 1],
                    'geoMercator'
                  )
                  obj.x = projectedCoord[0]
                  obj.y = projectedCoord[1]
                  obj.deaths = obj.deaths * 1
                  obj.magnitude = obj.magnitude * 1
                  return obj
                }
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
                  fillOpacity: 0.45
                })
                .state({
                  active: {
                    style: {
                      lineWidth: 1,
                      stroke: '#FF2F29'
                    }
                  }
                })
              pointView.interaction('element-active')
              chart.render()
            })
        })
    }
  }
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
