<template>
  <div id="owners">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="15" class="left">
        <div class="butBox1">
          <div :class="[tab1act==1?'but act':'but']" @click="tab1(1)">支持型</div>
          <div :class="[tab1act==2?'but act':'but']" @click="tab1(2)">拍摄型</div>
          <div :class="[tab1act==3?'but act':'but']" @click="tab1(3)">资源型</div>
        </div>

        <div class="butBox2">
          <div
            :class="[tab2act==item.id?'but act':'but']"
            @click="tab2(item.id)"
            v-for="(item,index) in tab2Items"
            :key="index"
          >{{item.name}}</div>
          <!-- <div :class="[tab2act==2?'but act':'but']" @click="tab2(2)">项目组分布</div> -->
        </div>
      </el-col>
      <el-col :span="9" class="right">
        <!-- 邀约对象 -->
        <el-select
          v-model="leisureOwners"
          filterable
          clearable
          placeholder="空挡车主"
          size="small"
          @change="leisureOwnersChange"
        >
          <el-option
            v-for="item in leisureOwnersList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 车型 -->
        <el-select
          v-model="carSeriesId"
          filterable
          clearable
          placeholder="车型"
          size="small"
          @change="carSeriesIdChange"
        >
          <el-option
            v-for="item in carSeriesList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 城市 -->
        <el-select
          v-model="cityName"
          filterable
          clearable
          placeholder="城市"
          size="small"
          @change="cityNameChange"
        >
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- {{cityName}} -->
        <div @click="submit" class="add">
          <i class="el-icon-circle-plus-outline"></i>
          <br />添加车主
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <!-- content1 -->
    <el-row class="content content1" v-show="tab1act==1">
      <div class="table_list">
        <el-table
          v-loading="listLoading"
          :data="ownerListData"
          style="width: 100%"
          :header-row-style="{'height': '54px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label="序号" width="81" align="center" type="index"></el-table-column>
          <el-table-column prop="ownerName" label="姓名" min-width="81" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link @click="toDetail(scope.row)">{{scope.row.ownerName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="carSeriesName" label="车型" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.ownerCarSeries" :key="index">
                {{item.carSeriesName}}
                <template
                  v-if="scope.row.ownerCarSeries.length>1&&index!=scope.row.ownerCarSeries.length-1"
                >,</template>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="itemName" label="合作事项" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="timeLimit" label="合作时长" min-width="81">
            <template slot-scope="scope">{{$duration(scope.row.timeLimit)}}</template>
          </el-table-column>
          <el-table-column prop="coopMoney" label="合作费用" min-width="81"></el-table-column>
          <el-table-column prop="coopNum" label="固定合作总量" min-width="100"></el-table-column>
          <el-table-column prop="alreadyCooperateNum" label="已合作" min-width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.alreadyCooperateNum">{{scope.row.alreadyCooperateNum}}</template>
              <template v-else>0</template>
            </template>
          </el-table-column>
          <el-table-column prop="surplusnum" label="剩余合作" min-width="100">
            <template slot-scope="scope">{{scope.row.coopNum-scope.row.alreadyCooperateNum}}</template>
          </el-table-column>
          <el-table-column prop="period" label="结算周期" min-width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.period == 0">按月结算</template>
              <template v-if="scope.row.period == 1">按年结算</template>
              <template v-if="scope.row.period == 2">按季度结算</template>
            </template>
          </el-table-column>
          <el-table-column prop label="操作" width="160">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="车主信息" placement="top">
                <i class="el-icon-view" @click="toDetail(scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="场地信息" placement="top">
                <i class="el-icon-map-location" @click="toOwnerssite(scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="el-icon-delete" @click="delContent(scope.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- content2 -->
    <el-row class="content content2" v-show="tab1act==2">
      <div class="table_list">
        <el-table
          v-loading="listLoading"
          :data="ownerListData"
          style="width: 100%"
          :header-row-style="{'height': '54px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label="序号" width="81" align="center" type="index"></el-table-column>
          <el-table-column prop="ownerName" label="姓名" min-width="81" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link @click="toDetail(scope.row)">{{scope.row.ownerName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="carSeriesName" label="车型" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.ownerCarSeries" :key="index">
                {{item.carSeriesName}}
                <template
                  v-if="scope.row.ownerCarSeries.length>1&&index!=scope.row.ownerCarSeries.length-1"
                >,</template>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="ownerArea" label="所在区域" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="skillName" label="特长" min-width="81"></el-table-column>
          <el-table-column prop="nickname" label="IP账号" min-width="81">
            <template slot-scope="scope">
              <!-- {{scope.row.ipGrows}} -->
              <span v-for="(item, index) in scope.row.ipGrows" :key="index">{{item.nickname}}
              <template
                  v-if="scope.row.ipGrows.length>1&&index!=scope.row.ipGrows.length-1&&item.nickname!=''"
                >,</template>
              </span>
              <!-- <template></template> -->
            </template>
          </el-table-column>
          <el-table-column prop="timeLimit" label="合作时长" min-width="100">
            <template slot-scope="scope">{{$duration(scope.row.timeLimit)}}</template>
          </el-table-column>
          <el-table-column prop="alreadyCooperateNum" label="已合作" min-width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.alreadyCooperateNum">{{scope.row.alreadyCooperateNum}}</template>
              <template v-else>0</template>
            </template>
          </el-table-column>
          <el-table-column prop="currMonthCooperateNum" label="本月合作次数" min-width="100"></el-table-column>
          <el-table-column prop label="操作" width="230">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="预约记录" placement="top">
                <i class="el-icon-time" @click="toRecord(scope.row.ownerId)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="车主信息" placement="top">
                <i class="el-icon-view" @click="toDetail(scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="日程管理" placement="top">
                <i class="el-icon-date" @click="toOwnersschedule(scope.row.ownerId)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="场地信息" placement="top">
                <i class="el-icon-map-location" @click="toOwnerssite(scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="el-icon-delete" @click="delContent(scope.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- content3 -->
    <el-row class="content content3" v-show="tab1act==3">
      <div class="table_list">
        <el-table
          v-loading="listLoading"
          :data="ownerListData"
          style="width: 100%"
          :header-row-style="{'height': '54px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label="序号" width="81" align="center" type="index"></el-table-column>
          <el-table-column prop="ownerName" label="姓名" min-width="81" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-link @click="toDetail(scope.row)">{{scope.row.ownerName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="carSeriesName" label="车型" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.ownerCarSeries" :key="index">
                {{item.carSeriesName}}
                <template
                  v-if="scope.row.ownerCarSeries.length>1&&index!=scope.row.ownerCarSeries.length-1"
                >,</template>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="ownerArea" label="所在区域" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="skillName" label="特长" min-width="81"></el-table-column>
          <el-table-column prop="nickname" label="IP账号" min-width="81"></el-table-column>
          <el-table-column prop="timeLimit" label="合作时长" min-width="100">
            <template slot-scope="scope">{{$duration(scope.row.timeLimit)}}</template>
          </el-table-column>
          <el-table-column prop="alreadyCooperateNum" label="已合作" min-width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.alreadyCooperateNum">{{scope.row.alreadyCooperateNum}}</template>
              <template v-else>0</template>
            </template>
          </el-table-column>
          <el-table-column prop="currMonthCooperateNum" label="本月合作次数" min-width="100"></el-table-column>
          <el-table-column prop label="操作" width="230">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="预约记录" placement="top">
                <i class="el-icon-time" @click="toRecord(scope.row.ownerId)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="车主信息" placement="top">
                <i class="el-icon-view" @click="toDetail(scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="日程管理" placement="top">
                <i class="el-icon-date" @click="toOwnersschedule(scope.row.ownerId)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="场地信息" placement="top">
                <i class="el-icon-map-location" @click="toOwnerssite(scope.row)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="el-icon-delete" @click="delContent(scope.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
import cityList from '@/common/city.js' // 引入城市数据
export default {
  name: 'owners',
  components: {},
  data() {
    return {
      listLoading: false, // 列表Loading控制
      ownerListData: [],
      tab1act: this.$store.state.ownersTypeNum,
      tab2act: 1,
      tab2Items: [],
      // 图表数据
      chartTitle: '任务完成数量',
      chartKeyData: ['执行中', '结算中', '延期', '已完成'],
      chartvalData: [520, 360, 130, 240],
      // 表格数据
      tableData: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      leisureOwnersList: [
        {
          value: 0,
          label: '空挡车主'
        },
        {
          value: 1,
          label: '未来3天'
        },
        {
          value: 2,
          label: '未来5天'
        },
        {
          value: 3,
          label: '未来一周'
        },
        {
          value: 4,
          label: '未来一月'
        }
      ],
      leisureOwners: '',
      // 车系列表
      carSeriesList: [],
      carSeriesId: '',
      // 城市列表
      cityList: cityList, // 城市筛列表
      cityName: '',
      // 分页数据
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  // 侦听器
  watch: {
    tab1act: function(newData, oldData) {
      // this.tabItems()
      this.geteventDataList(newData)
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取车系列表 start /////////
    this.getCarSeriesLists()
    // 获取合作事项列表
    let tab1act = this.tab1act
    this.geteventDataList(tab1act)
  },
  // 方法
  methods: {
    ///////// 循环 start /////////
    // foreach() {
    //   for (let i = 0; i < 30; i++) {
    //     // const element = array[i];
    //     this.tableData.push({
    //       name: '解雨臣',
    //       car: 'XC60 2017款 T5 AWD 个性运动升级版',
    //       matter: '日常素材',
    //       time: '6个月',
    //       mandnum: '1500',
    //       addnum: '20',
    //       oldnum: '16',
    //       surplusnum: '4',
    //       period: '按月结算'
    //     })
    //   }
    // },
    ///////// 循环 end /////////

    ///////// 获取车系列表 start /////////
    getCarSeriesLists() {
      // console.log(data)
      // console.log(1)
      let eventList = []
      this.$axios
        .post('/ocarplay/api/carSeries/getCarSeriesLists', {})
        .then(res => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            // console.log(res)
            let data = res.data.carTypes
            let carSeriesList = []
            data.forEach((element, i) => {
              carSeriesList.push({
                value: element.carTypeId,
                label: `${element.deptName}-${element.carTypeName}`
              })
            })
            this.carSeriesList = carSeriesList
            // console.log(this.carSeriesList)
            // this.tab2Items = eventDataList
            // this.tab2act = eventDataList[0].id
            // // console.log(this.tab2Items)
            // // 获取车主列表
            // this.CarSeriesLists()
          }
        })
    },
    ///////// 获取车系列表 end /////////

    ///////// 合作事项列表获取 start /////////
    geteventDataList(id) {
      // console.log(data)
      // console.log(1)
      let eventList = []
      let data = {
        typeId: id
      }
      this.$axios
        .post('/ocarplay/api/vehicleOwner/getOwnerTypeItems', data)
        .then(res => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            // console.log(res)
            let data = res.data
            let eventDataList = []
            data.forEach(element => {
              eventDataList.push({
                id: element.itemId,
                name: element.itemName
              })
            })
            this.tab2Items = eventDataList
            this.tab2act = eventDataList[0].id
            // console.log(this.tab2Items)
            // console.log(this.tab2act)
            // 获取车主列表
            this.getVehicleOwnerList()
          }
        })
    },
    ///////// 合作事项列表获取 end /////////

    ///////// 城市选择 start /////////
    cityNameChange() {
      ///////// 车主列表获取 start /////////
      this.getVehicleOwnerList()
    },
    ///////// 城市选择 end /////////

    ///////// 车型选择 start /////////
    carSeriesIdChange() {
      ///////// 车主列表获取 start /////////
      this.getVehicleOwnerList()
    },
    ///////// 车型选择 end /////////

    ///////// 档期选择 start /////////
    leisureOwnersChange() {
      ///////// 车主列表获取 start /////////
      this.getVehicleOwnerList()
    },
    ///////// 档期选择 end /////////

    ///////// 车主列表获取 start /////////
    getVehicleOwnerList() {
      let data = {
        city: '',
        seriesId: this.carSeriesId,
        futurePeriodType: this.leisureOwners,
        vehicleOwner: {
          typeId: this.tab1act,
          itemId: this.tab2act
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.cityName) {
        data.city = this.cityName + '市'
      } else {
        data.city = ''
      }
      this.$axios
        .post('/ocarplay/api/vehicleOwner/listAjax', data)
        .then(res => {
          // console.log(res)
          // this.drawerLoading = false
          // this.drawerAdd = false
          if (res.status == 200) {
            // this.ownerListData(res.data.msg)
            // this.getPlaceList()
            let data = res.data
            this.ownerListData = data.items
            this.total = data.totalRows
          }
        })
    },
    ///////// 车主列表获取 end /////////

    tab1(e) {
      this.tab1act = e
      this.getVehicleOwnerList()
    },
    tab2(id) {
      this.tab2act = id
      this.getVehicleOwnerList()
      // console.log(id)
    },

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      ///////// 车主列表获取 start /////////
      this.getVehicleOwnerList()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      // console.log(pageNum)
      this.pageNum = pageNum
      ///////// 车主列表获取 start /////////
      this.getVehicleOwnerList()
    },
    ///////// 分页 end /////////

    ///////// 跳转场地信息 start /////////
    toOwnerssite(prm) {
      // 记录类型
      let tab1act = this.tab1act
      let tab2act = this.tab2act
      this.$store.commit('ownersType', tab1act)
      this.$router.push({
        name: 'ownerssite',
        params: {
          ownerId: prm.ownerId
        }
      })
      // console.log(prm)
    },
    ///////// 跳转场地信息 end /////////

    ///////// 跳转预约记录页面 start /////////
    toRecord(id) {
      // 记录类型
      let tab1act = this.tab1act
      let tab2act = this.tab2act
      this.$store.commit('ownersType', tab1act)
      this.$router.push({
        name: 'ownersrecord',
        // query: { id: id }
        params: {
          id: id
        }
      })
    },
    ///////// 跳转预约记录页面 end /////////

    ///////// 跳日程管理页面 start /////////
    toOwnersschedule(id) {
      // 记录类型
      let tab1act = this.tab1act
      let tab2act = this.tab2act
      this.$store.commit('ownersType', tab1act)
      this.$router.push({
        name: 'ownersschedule',
        // query: { id: id }
        params: {
          id: id
        }
      })
    },
    ///////// 跳日程管理页面 end /////////

    ///////// 删除车主信息 start /////////
    delContent(par) {
      this.$confirm('确认要删除该车主吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // })
          this.delOwners(par)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delOwners(par) {
      let data = {
        coopId: par.coopId,
        typeId: par.typeId
      }
      this.$axios
        .post('/ocarplay/api/vehicleOwner/deleteVehicleOwner', data)
        .then(res => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode == 0) {
            let data = res.data
            this.ownerListData = data.items
            // this.messageWin(res.data.msg)
            this.$message.success(res.data.msg)
            this.getVehicleOwnerList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    ///////// 删除车主 end /////////

    ///////// 确认 start /////////
    submit() {
      this.$router.push({
        // path: '/home/addowners'
        name: 'addowners',
        // query: { id: id }
        params: {
          type: 0
        }
      })
    },
    ///////// 确认 end /////////

    ///////// 跳转车主信息页面 start /////////
    toDetail(prm) {
      console.log(prm)
      // 记录类型
      let tab1act = this.tab1act
      let tab2act = this.tab2act
      this.$store.commit('ownersType', tab1act)
      let vehicleOwnerId = ''
      if (prm.ownerId) {
        vehicleOwnerId = prm.ownerId
      }else {
        vehicleOwnerId = prm.vehicleOwnerId
      }
      // 记录车主ID
      this.$store.commit('ownerDetailId', [prm.typeId, prm.ownerId])
      this.$router.push({
        // name: 'ownersdetail',
        // params: {
        //   typeId: prm.typeId,
        //   vehicleOwnerId: prm.ownerId,
        //   itemName: prm.itemName
        // }
        path: '/home/ownersdetail',
        query: {
          typeId: prm.typeId,
          vehicleOwnerId: vehicleOwnerId
        }
      })
    }
    ///////// 跳转车主信息页面 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#owners {
  height: 100%;
  .top {
    height: 72px;
    margin-bottom: 9px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .left {
      height: 100%;
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .butBox1 {
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
    .right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      padding-right: 36px;
      color: $icoColor;
      font-size: 13px;
      .el-select {
        width: 100px;
        margin-left: 13px;
      }
      .add {
        margin-left: 13px;
        text-align: center;
        cursor: pointer;
        i {
          font-size: 24px;
        }
      }
    }
  }
  .content {
    height: calc(100% - 97px);
    background: #fff;
    .table_list {
      height: calc(100% - 64px);
      .el-table {
        .el-table__header {
          th {
            background: none;
          }
        }
      }
      i {
        font-size: 24px;
        color: $icoColor;
        cursor: pointer;
        margin-right: 13px;
      }
    }
    .paging {
      height: 64px;
      box-sizing: border-box;
      padding: 16px;
      text-align: center;
      // flex-wrap: wrap;
      // align-items: center;
      // justify-content: center;
    }
  }
}
</style>
