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

    <div>
      <section class="swiper">
        <swiper :options="swiperOption">
          <swiper-slide
            class="swp-silde"
            v-for="(item, index) in swiperList"
            :key="index"
            data-id="item.id"
          >
            <img class="swp-img" :src="item.imgUrl" alt />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </section>
    </div>
  </div>
</template>
<script>
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
    // swiper,
    //  swiperSlide,
  },
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

      swiperOption: {
        pagination: { el: '.swiper-pagination' },
        autoplay: {},
        loop : true, // 环路
        //  pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30
      },
      swiperList: [
        {
          id: '0001',
          imgUrl:
            'http://img1.qunarzz.com/piao/fusion/1708/7c/c0b9acba07764302.jpg_750x200_389436b7.jpg',
        },
        {
          id: '0002',
          imgUrl:
            'http://img1.qunarzz.com/piao/fusion/1805/13/6332699c44387902.jpg_750x200_b7afa4f8.jpg',
        },
        {
          id: '0003',
          imgUrl:
            'http://img1.qunarzz.com/piao/fusion/1805/3b/ef86879aa50e3002.jpg_750x200_2a108508.jpg',
        },
        {
          id: '0004',
          imgUrl:
            'http://img1.qunarzz.com/piao/fusion/1806/c1/a8a7d6b08a69c002.jpg_750x200_59bdc9ae.jpg',
        },
        {
          id: '0005',
          imgUrl:
            'http://img1.qunarzz.com/piao/fusion/1806/5a/a7fc8e091190d602.jpg_750x200_e3aae50d.jpg',
        },
      ],
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  mounted() {
    // test(){
    let data = {}
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
      let data = {
        buyCode: 'string',
        carSeriesId: 0,
        carSeriesName: 'string',
        carTypeId: 0,
        carTypeName: 'string',
        createTime: {
          chronology: {
            calendarType: 'string',
            id: 'string',
          },
          dayOfMonth: 0,
          dayOfWeek: 'MONDAY',
          dayOfYear: 0,
          hour: 0,
          minute: 0,
          month: 'JANUARY',
          monthValue: 0,
          nano: 0,
          second: 0,
          year: 0,
        },
        delayReason: 'string',
        deleteFlag: true,
        deptId: 0,
        endTime: {
          chronology: {
            calendarType: 'string',
            id: 'string',
          },
          dayOfMonth: 0,
          dayOfWeek: 'MONDAY',
          dayOfYear: 0,
          era: {
            value: 0,
          },
          leapYear: true,
          month: 0,
          monthValue: 0,
          year: 0,
        },
        initUserId: 0,
        invMoney: 0,
        itemId: 0,
        listInvite: [
          {
            card: true,
            createTime: {
              chronology: {
                calendarType: 'string',
                id: 'string',
              },
              dayOfMonth: 0,
              dayOfWeek: 'MONDAY',
              dayOfYear: 0,
              hour: 0,
              minute: 0,
              month: 'JANUARY',
              monthValue: 0,
              nano: 0,
              second: 0,
              year: 0,
            },
            deleteFlag: true,
            homeAddress: 'string',
            inviteId: 0,
            isCard: true,
            isOver: true,
            itemId: 0,
            itemName: 'string',
            listOwnerItem: [
              {
                card: true,
                createTime: {
                  chronology: {
                    calendarType: 'string',
                    id: 'string',
                  },
                  dayOfMonth: 0,
                  dayOfWeek: 'MONDAY',
                  dayOfYear: 0,
                  hour: 0,
                  minute: 0,
                  month: 'JANUARY',
                  monthValue: 0,
                  nano: 0,
                  second: 0,
                  year: 0,
                },
                deleteFlag: true,
                isCard: true,
                isCards: 'string',
                itemId: 0,
                itemIds: 'string',
                itemName: 'string',
                money: 0,
                typeId: 0,
                typeName: 'string',
                updateTime: {
                  chronology: {
                    calendarType: 'string',
                    id: 'string',
                  },
                  dayOfMonth: 0,
                  dayOfWeek: 'MONDAY',
                  dayOfYear: 0,
                  hour: 0,
                  minute: 0,
                  month: 'JANUARY',
                  monthValue: 0,
                  nano: 0,
                  second: 0,
                  year: 0,
                },
                vehicleOwners: [
                  {
                    bbsId: 'string',
                    birthday: {
                      chronology: {
                        calendarType: 'string',
                        id: 'string',
                      },
                      dayOfMonth: 0,
                      dayOfWeek: 'MONDAY',
                      dayOfYear: 0,
                      era: {
                        value: 0,
                      },
                      leapYear: true,
                      month: 0,
                      monthValue: 0,
                      year: 0,
                    },
                    buycarplace: 'string',
                    carSeriesName: 'string',
                    carUse: 'string',
                    city: 'string',
                    coopId: 0,
                    cooperates: [
                      {
                        carTypeName: 'string',
                        createTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          hour: 0,
                          minute: 0,
                          month: 'JANUARY',
                          monthValue: 0,
                          nano: 0,
                          second: 0,
                          year: 0,
                        },
                        deleteFlag: true,
                        doUserId: 0,
                        endTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          era: {
                            value: 0,
                          },
                          leapYear: true,
                          month: 0,
                          monthValue: 0,
                          year: 0,
                        },
                        fileName: 'string',
                        id: 0,
                        localPath: 'string',
                        name: 'string',
                        ownerId: 0,
                        startTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          era: {
                            value: 0,
                          },
                          leapYear: true,
                          month: 0,
                          monthValue: 0,
                          year: 0,
                        },
                        suffix: 'string',
                        timeLimit: 'string',
                        updateTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          hour: 0,
                          minute: 0,
                          month: 'JANUARY',
                          monthValue: 0,
                          nano: 0,
                          second: 0,
                          year: 0,
                        },
                      },
                    ],
                    createTime: '2020-06-16T05:25:11.905Z',
                    deleteFlag: true,
                    deptId: 0,
                    doUserId: 0,
                    dyId: 'string',
                    email: 'string',
                    homeAddress: 'string',
                    homeUrl: 'string',
                    image: 'string',
                    invites: [{}],
                    ipGrows: [
                      {
                        carSeriesName: 'string',
                        coopId: 0,
                        createTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          hour: 0,
                          minute: 0,
                          month: 'JANUARY',
                          monthValue: 0,
                          nano: 0,
                          second: 0,
                          year: 0,
                        },
                        deleteFlag: true,
                        doUserId: 0,
                        itemId: 0,
                        nickname: 'string',
                        ownerArea: 'string',
                        ownerId: 0,
                        ownerName: 'string',
                        plat: 'string',
                        platRole: 'string',
                        skillName: 'string',
                        timeLimit: 'string',
                        typeId: 0,
                        updateTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          hour: 0,
                          minute: 0,
                          month: 'JANUARY',
                          monthValue: 0,
                          nano: 0,
                          second: 0,
                          year: 0,
                        },
                        url: 'string',
                      },
                    ],
                    itemId: 0,
                    name: 'string',
                    otherId: 'string',
                    ownerCoops: [
                      {
                        carSeriesName: 'string',
                        coopId: 0,
                        coopMoney: 0,
                        coopNum: 0,
                        createTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          hour: 0,
                          minute: 0,
                          month: 'JANUARY',
                          monthValue: 0,
                          nano: 0,
                          second: 0,
                          year: 0,
                        },
                        deleteFlag: true,
                        doUserId: 0,
                        itemId: 0,
                        itemName: 'string',
                        ownerId: 0,
                        ownerName: 'string',
                        period: 0,
                        timeLimit: 'string',
                        typeId: 0,
                        updateTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          hour: 0,
                          minute: 0,
                          month: 'JANUARY',
                          monthValue: 0,
                          nano: 0,
                          second: 0,
                          year: 0,
                        },
                      },
                    ],
                    phone: 'string',
                    plateNum: 'string',
                    province: 'string',
                    qq: 'string',
                    relations: [
                      {
                        birthday: '2020-06-16T05:25:11.906Z',
                        createTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          hour: 0,
                          minute: 0,
                          month: 'JANUARY',
                          monthValue: 0,
                          nano: 0,
                          second: 0,
                          year: 0,
                        },
                        deleteFlag: true,
                        name: 'string',
                        relation: 'string',
                        relationId: 0,
                        updateTime: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          hour: 0,
                          minute: 0,
                          month: 'JANUARY',
                          monthValue: 0,
                          nano: 0,
                          second: 0,
                          year: 0,
                        },
                        vehicleOwnerId: 0,
                        work: 'string',
                      },
                    ],
                    seriesId: 0,
                    sex: true,
                    skillId: 0,
                    skillName: 'string',
                    sourceId: 0,
                    sourceName: 'string',
                    typeId: 0,
                    updateTime: '2020-06-16T05:25:11.906Z',
                    vehicleOwnerId: 0,
                    vinno: 'string',
                    weiboId: 'string',
                    work: 'string',
                    wx: 'string',
                  },
                ],
              },
            ],
            listOwnerType: [
              {
                createTime: {
                  chronology: {
                    calendarType: 'string',
                    id: 'string',
                  },
                  dayOfMonth: 0,
                  dayOfWeek: 'MONDAY',
                  dayOfYear: 0,
                  hour: 0,
                  minute: 0,
                  month: 'JANUARY',
                  monthValue: 0,
                  nano: 0,
                  second: 0,
                  year: 0,
                },
                deleteFlag: true,
                ownerItems: [
                  {
                    card: true,
                    createTime: {
                      chronology: {
                        calendarType: 'string',
                        id: 'string',
                      },
                      dayOfMonth: 0,
                      dayOfWeek: 'MONDAY',
                      dayOfYear: 0,
                      hour: 0,
                      minute: 0,
                      month: 'JANUARY',
                      monthValue: 0,
                      nano: 0,
                      second: 0,
                      year: 0,
                    },
                    deleteFlag: true,
                    isCard: true,
                    isCards: 'string',
                    itemId: 0,
                    itemIds: 'string',
                    itemName: 'string',
                    money: 0,
                    typeId: 0,
                    typeName: 'string',
                    updateTime: {
                      chronology: {
                        calendarType: 'string',
                        id: 'string',
                      },
                      dayOfMonth: 0,
                      dayOfWeek: 'MONDAY',
                      dayOfYear: 0,
                      hour: 0,
                      minute: 0,
                      month: 'JANUARY',
                      monthValue: 0,
                      nano: 0,
                      second: 0,
                      year: 0,
                    },
                    vehicleOwners: [
                      {
                        bbsId: 'string',
                        birthday: {
                          chronology: {
                            calendarType: 'string',
                            id: 'string',
                          },
                          dayOfMonth: 0,
                          dayOfWeek: 'MONDAY',
                          dayOfYear: 0,
                          era: {
                            value: 0,
                          },
                          leapYear: true,
                          month: 0,
                          monthValue: 0,
                          year: 0,
                        },
                        buycarplace: 'string',
                        carSeriesName: 'string',
                        carUse: 'string',
                        city: 'string',
                        coopId: 0,
                        cooperates: [
                          {
                            carTypeName: 'string',
                            createTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              hour: 0,
                              minute: 0,
                              month: 'JANUARY',
                              monthValue: 0,
                              nano: 0,
                              second: 0,
                              year: 0,
                            },
                            deleteFlag: true,
                            doUserId: 0,
                            endTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              era: {
                                value: 0,
                              },
                              leapYear: true,
                              month: 0,
                              monthValue: 0,
                              year: 0,
                            },
                            fileName: 'string',
                            id: 0,
                            localPath: 'string',
                            name: 'string',
                            ownerId: 0,
                            startTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              era: {
                                value: 0,
                              },
                              leapYear: true,
                              month: 0,
                              monthValue: 0,
                              year: 0,
                            },
                            suffix: 'string',
                            timeLimit: 'string',
                            updateTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              hour: 0,
                              minute: 0,
                              month: 'JANUARY',
                              monthValue: 0,
                              nano: 0,
                              second: 0,
                              year: 0,
                            },
                          },
                        ],
                        createTime: '2020-06-16T05:25:11.906Z',
                        deleteFlag: true,
                        deptId: 0,
                        doUserId: 0,
                        dyId: 'string',
                        email: 'string',
                        homeAddress: 'string',
                        homeUrl: 'string',
                        image: 'string',
                        invites: [{}],
                        ipGrows: [
                          {
                            carSeriesName: 'string',
                            coopId: 0,
                            createTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              hour: 0,
                              minute: 0,
                              month: 'JANUARY',
                              monthValue: 0,
                              nano: 0,
                              second: 0,
                              year: 0,
                            },
                            deleteFlag: true,
                            doUserId: 0,
                            itemId: 0,
                            nickname: 'string',
                            ownerArea: 'string',
                            ownerId: 0,
                            ownerName: 'string',
                            plat: 'string',
                            platRole: 'string',
                            skillName: 'string',
                            timeLimit: 'string',
                            typeId: 0,
                            updateTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              hour: 0,
                              minute: 0,
                              month: 'JANUARY',
                              monthValue: 0,
                              nano: 0,
                              second: 0,
                              year: 0,
                            },
                            url: 'string',
                          },
                        ],
                        itemId: 0,
                        name: 'string',
                        otherId: 'string',
                        ownerCoops: [
                          {
                            carSeriesName: 'string',
                            coopId: 0,
                            coopMoney: 0,
                            coopNum: 0,
                            createTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              hour: 0,
                              minute: 0,
                              month: 'JANUARY',
                              monthValue: 0,
                              nano: 0,
                              second: 0,
                              year: 0,
                            },
                            deleteFlag: true,
                            doUserId: 0,
                            itemId: 0,
                            itemName: 'string',
                            ownerId: 0,
                            ownerName: 'string',
                            period: 0,
                            timeLimit: 'string',
                            typeId: 0,
                            updateTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              hour: 0,
                              minute: 0,
                              month: 'JANUARY',
                              monthValue: 0,
                              nano: 0,
                              second: 0,
                              year: 0,
                            },
                          },
                        ],
                        phone: 'string',
                        plateNum: 'string',
                        province: 'string',
                        qq: 'string',
                        relations: [
                          {
                            birthday: '2020-06-16T05:25:11.906Z',
                            createTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              hour: 0,
                              minute: 0,
                              month: 'JANUARY',
                              monthValue: 0,
                              nano: 0,
                              second: 0,
                              year: 0,
                            },
                            deleteFlag: true,
                            name: 'string',
                            relation: 'string',
                            relationId: 0,
                            updateTime: {
                              chronology: {
                                calendarType: 'string',
                                id: 'string',
                              },
                              dayOfMonth: 0,
                              dayOfWeek: 'MONDAY',
                              dayOfYear: 0,
                              hour: 0,
                              minute: 0,
                              month: 'JANUARY',
                              monthValue: 0,
                              nano: 0,
                              second: 0,
                              year: 0,
                            },
                            vehicleOwnerId: 0,
                            work: 'string',
                          },
                        ],
                        seriesId: 0,
                        sex: true,
                        skillId: 0,
                        skillName: 'string',
                        sourceId: 0,
                        sourceName: 'string',
                        typeId: 0,
                        updateTime: '2020-06-16T05:25:11.906Z',
                        vehicleOwnerId: 0,
                        vinno: 'string',
                        weiboId: 'string',
                        work: 'string',
                        wx: 'string',
                      },
                    ],
                  },
                ],
                typeId: 0,
                typeName: 'string',
                updateTime: {
                  chronology: {
                    calendarType: 'string',
                    id: 'string',
                  },
                  dayOfMonth: 0,
                  dayOfWeek: 'MONDAY',
                  dayOfYear: 0,
                  hour: 0,
                  minute: 0,
                  month: 'JANUARY',
                  monthValue: 0,
                  nano: 0,
                  second: 0,
                  year: 0,
                },
              },
            ],
            money: 0,
            name: 'string',
            over: true,
            overTime: {
              chronology: {
                calendarType: 'string',
                id: 'string',
              },
              dayOfMonth: 0,
              dayOfWeek: 'MONDAY',
              dayOfYear: 0,
              hour: 0,
              minute: 0,
              month: 'JANUARY',
              monthValue: 0,
              nano: 0,
              second: 0,
              year: 0,
            },
            ownerId: 0,
            phone: 'string',
            prove: 'string',
            realName: 'string',
            taskId: 0,
            title: 'string',
            typeId: 0,
            updateTime: {
              chronology: {
                calendarType: 'string',
                id: 'string',
              },
              dayOfMonth: 0,
              dayOfWeek: 'MONDAY',
              dayOfYear: 0,
              hour: 0,
              minute: 0,
              month: 'JANUARY',
              monthValue: 0,
              nano: 0,
              second: 0,
              year: 0,
            },
            url: 'string',
            userId: 0,
          },
        ],
        listTaskFile: [
          {
            createTime: {
              chronology: {
                calendarType: 'string',
                id: 'string',
              },
              dayOfMonth: 0,
              dayOfWeek: 'MONDAY',
              dayOfYear: 0,
              hour: 0,
              minute: 0,
              month: 'JANUARY',
              monthValue: 0,
              nano: 0,
              second: 0,
              year: 0,
            },
            deleteFlag: true,
            fileId: 0,
            fileName: 'string',
            localPath: 'string',
            suffix: 'string',
            taskId: 0,
            updateTime: {
              chronology: {
                calendarType: 'string',
                id: 'string',
              },
              dayOfMonth: 0,
              dayOfWeek: 'MONDAY',
              dayOfYear: 0,
              hour: 0,
              minute: 0,
              month: 'JANUARY',
              monthValue: 0,
              nano: 0,
              second: 0,
              year: 0,
            },
            updateUserId: 0,
          },
        ],
        num: 0,
        overTime: {
          chronology: {
            calendarType: 'string',
            id: 'string',
          },
          dayOfMonth: 0,
          dayOfWeek: 'MONDAY',
          dayOfYear: 0,
          hour: 0,
          minute: 0,
          month: 'JANUARY',
          monthValue: 0,
          nano: 0,
          second: 0,
          year: 0,
        },
        remark: 'string',
        startTime: {
          chronology: {
            calendarType: 'string',
            id: 'string',
          },
          dayOfMonth: 0,
          dayOfWeek: 'MONDAY',
          dayOfYear: 0,
          era: {
            value: 0,
          },
          leapYear: true,
          month: 0,
          monthValue: 0,
          year: 0,
        },
        status: 0,
        taskDesc: 'string',
        taskId: 0,
        taskName: 'string',
        typeId: 0,
        updateTime: {
          chronology: {
            calendarType: 'string',
            id: 'string',
          },
          dayOfMonth: 0,
          dayOfWeek: 'MONDAY',
          dayOfYear: 0,
          hour: 0,
          minute: 0,
          month: 'JANUARY',
          monthValue: 0,
          nano: 0,
          second: 0,
          year: 0,
        },
        years: 'string',
      }
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
