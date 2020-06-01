<template>
  <div id="owners">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="16" class="left">
        <div class="butBox1">
          <div :class="[tab1act==1?'but act':'but']" @click="tab1(1)">支持型</div>
          <div :class="[tab1act==2?'but act':'but']" @click="tab1(2)">拍摄型</div>
          <div :class="[tab1act==3?'but act':'but']" @click="tab1(3)">资源型</div>
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
      <el-col :span="8" class="right">
        <!-- 邀约对象 -->
        <el-select v-model="value" clearable placeholder="空挡车主" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 邀约事项 -->
        <el-select v-model="value" clearable placeholder="车型" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 邀约车型 -->
        <el-select v-model="value" clearable placeholder="城市" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div @click="submit" class="add">
          <i class="el-icon-circle-plus-outline"></i>
          <br />添加车主
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <!-- content1 -->
    <el-row class="content content1" v-if="tab1act==1">
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label="序号" min-width="81" align="center">
            <template slot-scope="scope">0{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="车主姓名" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="car" label="认证车型" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="matter" label="合作事项" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time" label="合作时长" min-width="81"></el-table-column>
          <el-table-column prop="mandnum" label="合作费用" min-width="81"></el-table-column>
          <el-table-column prop="addnum" label="固定合作总量" min-width="100"></el-table-column>
          <el-table-column prop="oldnum" label="历史合作次数" min-width="100"></el-table-column>
          <el-table-column prop="surplusnum" label="剩余合作次数" min-width="100"></el-table-column>
          <el-table-column prop="period" label="结算周期" min-width="100"></el-table-column>
          <el-table-column prop label="操作" width="160">
            <template>
              <i class="el-icon-view"></i>
              <i class="el-icon-map-location" @click="toOwnerssite"></i>
              <i class="el-icon-delete" @click="delOwners"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next ,sizes"
          :total="100"
          background
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- content2 -->
    <el-row class="content content2" v-if="tab1act==2">
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label="序号" min-width="81" align="center">
            <template slot-scope="scope">0{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="车主姓名" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="car" label="认证车型" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="matter" label="所在区域" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time" label="特长" min-width="81"></el-table-column>
          <el-table-column prop="mandnum" label="IP账号" min-width="81"></el-table-column>
          <el-table-column prop="addnum" label="合作时长" min-width="100"></el-table-column>
          <el-table-column prop="oldnum" label="历史合作次数" min-width="100"></el-table-column>
          <el-table-column prop="surplusnum" label="本月合作次数" min-width="100"></el-table-column>
          <el-table-column prop label="操作" width="230">
            <template>
              <i class="el-icon-timer"></i>
              <i class="el-icon-view"></i>
              <i class="el-icon-date" @click="toOwnersschedule"></i>
              <i class="el-icon-map-location" @click="toOwnerssite"></i>
              <i class="el-icon-delete" @click="delOwners"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next ,sizes"
          :total="100"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- content3 -->
    <el-row class="content content3" v-if="tab1act==3">
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop label="序号" min-width="81" align="center">
            <template slot-scope="scope">0{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="车主姓名" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="car" label="认证车型" min-width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="matter" label="所在区域" min-width="81" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time" label="特长" min-width="81"></el-table-column>
          <el-table-column prop="mandnum" label="IP账号" min-width="81"></el-table-column>
          <el-table-column prop="addnum" label="合作时长" min-width="100"></el-table-column>
          <el-table-column prop="oldnum" label="历史合作次数" min-width="100"></el-table-column>
          <el-table-column prop="surplusnum" label="本月合作次数" min-width="100"></el-table-column>
          <el-table-column prop label="操作" width="230">
            <template>
              <i class="el-icon-timer"></i>
              <i class="el-icon-view"></i>
              <i class="el-icon-date"></i>
              <i class="el-icon-map-location" @click="toOwnerssite"></i>
              <i class="el-icon-delete" @click="delOwners"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next ,sizes"
          :total="100"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
export default {
  name: 'owners',
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
      value: ''
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
            name: '租借车辆'
          },
          {
            id: 2,
            name: '发布'
          },
          {
            id: 3,
            name: 'ID账号'
          },
          {
            id: 4,
            name: '日常素材'
          },
          {
            id: 5,
            name: '文案约稿'
          }
        ]
      } else if (newData == 2) {
        this.tab2Items = [
          {
            id: 5,
            name: 'IP孵化型'
          },
          {
            id: 2,
            name: '签约摄影师'
          }
        ]
      } else if (newData == 3) {
        this.tab2Items = [
          {
            id: 2,
            name: '自驾'
          },
          {
            id: 4,
            name: '越野'
          }
        ]
      }

      this.tab2act = 0
      let tab1act = newData
      let tab2act = this.tab2act
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    this.foreach()
  },
  // 方法
  methods: {
    ///////// 循环 start /////////
    foreach() {
      for (let i = 0; i < 30; i++) {
        // const element = array[i];
        this.tableData.push({
          name: '解雨臣',
          car: 'XC60 2017款 T5 AWD 个性运动升级版',
          matter: '日常素材',
          time: '6个月',
          mandnum: '1500',
          addnum: '20',
          oldnum: '16',
          surplusnum: '4',
          period: '按月结算'
        })
      }
    },
    ///////// 循环 end /////////

    tab1(e) {
      this.tab1act = e
    },
    tab2(e, id) {
      this.tab2act = e
      console.log(id)
    },

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
    },
    ///////// 分页 end /////////

    ///////// 跳转场地信息 start /////////
    toOwnerssite() {
      this.$router.push({ path: '/home/ownerssite' })
      console.log(1)
    },
    ///////// 跳转场地信息 end /////////

    ///////// 跳日程管理页面 start /////////
    toOwnersschedule() {
      this.$router.push({ path: '/home/ownersschedule' })
      console.log(1)
    },
    ///////// 跳日程管理页面 end /////////

    ///////// 删除车主 start /////////
    delOwners() {
      this.$confirm('确认要删除该场地吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    ///////// 删除车主 end /////////

    ///////// 确认 start /////////
    submit() {
      this.$confirm('确认提交任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
    }
    ///////// 确认 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
#owners {
  height: 100%;
  .top {
    height: 88px;
    margin-bottom: 9px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .left {
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
