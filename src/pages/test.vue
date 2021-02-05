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
      errcode: 0,
      msg: 'success',
      data: {
        offlineDataList: [
          {
            '51971': [
              {
                applyDetailId: 29748,
                applyNumber: '210204020',
                auditStatus: 0,
                bossMailFlag: 0,
                budgetApplyId: 1838,
                businessFormId: 0,
                buyMoney: 200.0,
                buyNum: 1,
                buyPrice: 200.0,
                buyType: 1,
                circulationFeedback: 0,
                circulationType: 0,
                companyId: 31,
                costPerson: '曾雪梅',
                createTime: 1612427194000,
                deleteFlag: 0,
                distributeType: 0,
                groupId: '106',
                isInvoice: false,
                ispay: 0,
                issuccess: 0,
                mailFlag: 0,
                mailNum: 0,
                noauditMail: 0,
                offlineId: 13279,
                offlineIdList: [],
                preMoney: 0.0,
                preNum: 0,
                prePrice: 0.0,
                proRequireId: 51971,
                remark: '2.1东本新年视频配音费用200',
                subItemsId: 514,
                subjectId: 8,
                updateTime: 1612427194000,
              },
            ],
          },
        ],
        paymentList: [
          {
            '51971': [
              {
                bankAccount: '6217002870034622108',
                circulationFeedback: 0,
                circulationType: 0,
                companyId: 19,
                contacts: '黄菲',
                createTime: 1612495289000,
                deforOther: 0,
                depositBank: '建设银行',
                distributeType: 0,
                groupName: '东风本田',
                idCard: '420106198501174438',
                identifier: '210750000107010',
                invoice: true,
                invoiceRemark: 'null',
                isInvoice: true,
                listPrequire: [
                  {
                    applyDetailId: 29748,
                    budgetApplyId: 1838,
                    commentRemainNum: 0,
                    createTime: 1612339399000,
                    deleteFlag: 0,
                    feedbackStat: 2,
                    groupId: 106,
                    isAdd: 0,
                    payStat: 0,
                    personName:
                      '田莉霞,宋晓,陈芹英,张旗,阳开波,童双平,唐婷,黄金金,柳燕云,段昌国,朱健,薛云,曾雪梅,杨康,冯蕾,卢鸣',
                    picId:
                      '4264,765,165,3875,103,578,105,4265,28,620,32,193,3790,4271,34,956,',
                    proName: '东本1、2月社会化媒体运营（氟铯）',
                    proRequireId: 51971,
                    propertys: 0,
                    remainNum: 0,
                    reqpayState: 1,
                    subItemsId: 514,
                    subName: '影视活动-拍摄',
                    subjectId: 8,
                    subjectName: '影视活动',
                    transmitRemainNum: 0,
                    updTime: 1612339399000,
                    userId: 4243,
                    userName: '李雨珊',
                    workLoad: 1,
                  },
                ],
                operationId: 0,
                payApplyStat: 0,
                payId: 54304,
                payMergeIdList: [],
                payMode: 4,
                payMoney: 200.0,
                payState: false,
                payTime: 1612454400000,
                payType: true,
                phoneNum: '13628668258',
                proName: '东本1、2月社会化媒体运营（氟铯）',
                proRequireId: 51971,
                proitemId: 3445,
                rejectPayStat: 0,
                remark: '2.4东本拍摄化妆师费用张莹',
                reqMergeFlag: true,
                reqMergeId: 54304,
                reqUserDeptId: 155,
                reqauditeState: 0,
                roleId: 52,
                roleName: '个人劳务',
                serviceScale: 0.0,
                subItemsId: 514,
                subTime: 1612495289000,
                subitemName: '影视活动-拍摄',
                subjectId: 8,
                subjectName: '影视活动',
                supplierId: 1261,
                supplierName: '黄菲',
                userId: 956,
                userName: '朱健',
              },
              {
                bankAccount: '6217002870014093627',
                circulationFeedback: 0,
                circulationType: 0,
                companyId: 19,
                contacts: '张莹',
                createTime: 1612495233000,
                deforOther: 0,
                depositBank: '建设银行武汉市硚口区宗关支行',
                distributeType: 0,
                groupName: '东风本田',
                idCard: '420982199410153863',
                identifier: '210750000107010',
                invoice: true,
                invoiceRemark: 'null',
                isInvoice: true,
                listPrequire: [
                  {
                    applyDetailId: 29748,
                    budgetApplyId: 1838,
                    commentRemainNum: 0,
                    createTime: 1612339399000,
                    deleteFlag: 0,
                    feedbackStat: 2,
                    groupId: 106,
                    isAdd: 0,
                    payStat: 0,
                    personName:
                      '田莉霞,宋晓,陈芹英,张旗,阳开波,童双平,唐婷,黄金金,柳燕云,段昌国,朱健,薛云,曾雪梅,杨康,冯蕾,卢鸣',
                    picId:
                      '4264,765,165,3875,103,578,105,4265,28,620,32,193,3790,4271,34,956,',
                    proName: '东本1、2月社会化媒体运营（氟铯）',
                    proRequireId: 51971,
                    propertys: 0,
                    remainNum: 0,
                    reqpayState: 1,
                    subItemsId: 514,
                    subName: '影视活动-拍摄',
                    subjectId: 8,
                    subjectName: '影视活动',
                    transmitRemainNum: 0,
                    updTime: 1612339399000,
                    userId: 4243,
                    userName: '李雨珊',
                    workLoad: 1,
                  },
                ],
                operationId: 0,
                payApplyStat: 0,
                payId: 54303,
                payMergeIdList: [],
                payMode: 4,
                payMoney: 300.0,
                payState: false,
                payTime: 1612454400000,
                payType: true,
                phoneNum: '18674079989',
                proName: '东本1、2月社会化媒体运营（氟铯）',
                proRequireId: 51971,
                proitemId: 3445,
                rejectPayStat: 0,
                remark: '2.4东本拍摄化妆师费用张莹',
                reqMergeFlag: true,
                reqMergeId: 54303,
                reqUserDeptId: 155,
                reqauditeState: 0,
                roleId: 52,
                roleName: '个人劳务',
                serviceScale: 0.0,
                subItemsId: 514,
                subTime: 1612495233000,
                subitemName: '影视活动-拍摄',
                subjectId: 8,
                subjectName: '影视活动',
                supplierId: 2139,
                supplierName: '张莹',
                userId: 956,
                userName: '朱健',
              },
              {
                accountName: '胡丽娟',
                bankAccount: '6226220512755801',
                circulationFeedback: 0,
                circulationType: 0,
                contacts: '胡丽娟',
                createTime: 1612422882000,
                deforOther: 0,
                depositBank: '民生银行龙阳支行',
                distributeType: 0,
                groupName: '东风本田',
                idCard: '420112198612013343',
                identifier: '210750000107010',
                invoice: true,
                isInvoice: true,
                listPrequire: [
                  {
                    applyDetailId: 29748,
                    budgetApplyId: 1838,
                    commentRemainNum: 0,
                    createTime: 1612339399000,
                    deleteFlag: 0,
                    feedbackStat: 2,
                    groupId: 106,
                    isAdd: 0,
                    payStat: 0,
                    personName:
                      '田莉霞,宋晓,陈芹英,张旗,阳开波,童双平,唐婷,黄金金,柳燕云,段昌国,朱健,薛云,曾雪梅,杨康,冯蕾,卢鸣',
                    picId:
                      '4264,765,165,3875,103,578,105,4265,28,620,32,193,3790,4271,34,956,',
                    proName: '东本1、2月社会化媒体运营（氟铯）',
                    proRequireId: 51971,
                    propertys: 0,
                    remainNum: 0,
                    reqpayState: 1,
                    subItemsId: 514,
                    subName: '影视活动-拍摄',
                    subjectId: 8,
                    subjectName: '影视活动',
                    transmitRemainNum: 0,
                    updTime: 1612339399000,
                    userId: 4243,
                    userName: '李雨珊',
                    workLoad: 1,
                  },
                ],
                payApplyStat: 0,
                payId: 54295,
                payMergeIdList: [],
                payMode: 4,
                payMoney: 600.0,
                payState: false,
                payTime: 1612368000000,
                payType: true,
                phoneNum: '13554340971',
                proName: '东本1、2月社会化媒体运营（氟铯）',
                proRequireId: 51971,
                proitemId: 3445,
                rejectPayStat: 0,
                remark: '0204武汉本田XRV车辆拍摄，车主车辆费用600元',
                reqMergeFlag: true,
                reqMergeId: 54295,
                reqUserDeptId: 90,
                reqauditeState: 0,
                roleId: 63,
                roleName: '北京氟铯财务',
                serviceScale: 0.0,
                subItemsId: 514,
                subTime: 1612422882000,
                subitemName:
                  '影视活动-拍摄摄影师 演员 车辆 服装 道具 化妆师 配音 租赁设备等',
                subjectId: 8,
                subjectName: '影视活动',
                supplierId: 2350,
                supplierName: '胡丽娟',
                userId: 4264,
                userName: '杨康',
              },
            ],
          },
        ],
      },
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
