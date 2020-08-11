<template>
  <div id="carownertype">
    <div class="table_list">
      <el-table
        v-loading="loading"
        :data="ownerTypeListData"
        style="width: 100%"
        :header-row-style="{'height': '54px'}"
        :header-cell-style="{'color': '#000'}"
        height="100%"
      >
        <el-table-column prop="name" label="序号" width="81" align="center">
          <template slot-scope="scope">0{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="typeName" label="车主类型" width="240"></el-table-column>
        <el-table-column prop="itemName" label="合作事项" min-width="240"></el-table-column>
        <!-- <el-table-column prop="money" label="结算金额" min-width="240"></el-table-column> -->
        <el-table-column prop="address" label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="redact(scope.row)"></i>
            <!-- <i class="el-icon-delete" @click="delContent"></i> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-col :span="24" class="paging">
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
    </el-col>-->
    <!-- 抽屉弹窗新增/编辑数据 start -->
    <el-drawer
      :title="drawerTietle"
      :visible.sync="drawerData"
      size="720px"
      @close="drawerDataClose"
    >
      <el-scrollbar style="height:100%">
        <el-row class="drawerData">
          <el-col :span="4">车主类型:</el-col>
          <el-col :span="18">
            <el-select v-model="typeId" clearable placeholder="请选择" @change="typeIdChange">
              <el-option
                v-for="item in ownerType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" style="align-self: start;">合作事项:</el-col>
          <el-col :span="18" style="height: auto;">
            <el-col
              :span="24"
              v-for="(item, index) in cooperList"
              :key="index"
              class="list"
              v-show="!item.deleteFlag"
            >
              <el-col :span="10">
                <el-input placeholder="请输入内容" v-model="item.itemName" clearable></el-input>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-switch
                  style="display: block"
                  v-model="item.isCard"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="现金"
                  inactive-text="油卡"
                ></el-switch>
              </el-col>
              <el-col :span="4">
                <el-input placeholder="金额" v-model="item.money" clearable></el-input>
              </el-col>
              <el-col :span="3">
                <i class="el-icon-plus" @click="addCooperList"></i>
                <i class="el-icon-delete" @click="delCooperList(index)"></i>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
      </el-scrollbar>
      <el-col :span="24" class="btn">
        <el-col :span="6" :offset="5">
          <el-button type="info" @click="drawerData = false" size="small">取消</el-button>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-button type="primary" @click="saveSubmit" size="small">提交</el-button>
        </el-col>
      </el-col>
    </el-drawer>
    <!-- 抽屉弹窗新增/编辑数据 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'carownertype',
  props: {
    openDrawer: Number
  },
  components: {},
  data() {
    return {
      input: '', // 输入框内容占位
      isCard: true, // 输入框内容占位
      // 表格数据
      ownerTypeListData: [],
      // 弹窗开关
      drawerData: false,
      drawerTietle: '新增数据',
      // 加载Loading
      loading: false,
      // 车主类型
      ownerType: [],
      typeId: '',
      // 新增合作事项
      cooperList: [
        {
          typeId: this.typeId,
          itemName: '',
          money: '',
          isCard: false,
          deleteFlag: false
        }
      ]
    }
  },
  // 侦听器
  watch: {
    openDrawer: function(newData, oldData) {
      this.drawerData = true
      this.drawerTietle = '新增数据'
      this.typeId = ''
      this.cooperList = [
        {
          typeId: this.typeId,
          itemName: '',
          money: '',
          isCard: false,
          deleteFlag: false
        }
      ]
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取车主类型列表 start /////////
    this.getshowOwnerType()
    ///////// 获取车主类型 start /////////
    this.getOwnerType()
  },
  // 方法
  methods: {
    ///////// 选择车主类型监听事件 start /////////
    typeIdChange(data) {
      let cooperList = this.cooperList
      cooperList.forEach((element, i) => {
        cooperList[i].typeId = data
      })
    },
    ///////// 选择车主类型监听事件 end /////////

    ///////// 添加合作事项 start /////////
    addCooperList(data) {
      this.cooperList.push({
        typeId: this.typeId,
        itemName: '',
        money: '',
        isCard: true,
        deleteFlag: false
      })
    },
    ///////// 添加合作事项 end /////////

    ///////// 删除合作事项 start /////////
    delCooperList(index) {
      let cooperList = this.cooperList
      if (cooperList.length > 1) {
        this.cooperList[index].deleteFlag = true
      }
    },
    ///////// 删除合作事项 end /////////

    ///////// 删除任务 start /////////
    delContent() {
      this.$confirm('确认要删除该数据吗?', '提示', {
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
    ///////// 删除任务 end /////////

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

    ///////// 编辑数据 start /////////
    redact(prm) {
      this.drawerData = true
      this.drawerTietle = '编辑数据'
      console.log(prm)
      this.typeId = prm.typeId
      let itemIds = prm.itemIds.split('/')
      let itemNames = prm.itemName.split('/')
      let isCards = prm.isCards.split('/')
      let moneys = prm.moneys.split('/')
      let cooperList = []
      itemIds.forEach((element, i) => {
        let data = {
          typeId: this.typeId,
          itemId: element,
          itemName: itemNames[i],
          money: moneys[i] * 1,
          isCard: '',
          deleteFlag: false
        }
        if (isCards[i] == 1) {
          data.isCard = true
        } else {
          data.isCard = false
        }
        cooperList.push(data)
      })
      this.cooperList = cooperList
      // console.log(prm.itemIds.split('/'))
    },
    ///////// 编辑数据 start /////////

    ///////// 获取车主类型 start /////////
    getOwnerType() {
      // this.loading = true
      let data = {}
      this.$axios
        .post('/ocarplay/api/vehicleOwner/getOwnerType', data)
        .then(res => {
          // console.log(res)

          if (res.status == 200) {
            let data = res.data
            let ownerType = []
            data.forEach(element => {
              let ownerTypeData = {
                value: element.typeId,
                label: element.typeName
              }
              ownerType.push(ownerTypeData)
            })
            this.ownerType = ownerType
          }
        })
    },
    ///////// 获取车主类型 end /////////

    ///////// 获取车主类型列表 start /////////
    getshowOwnerType() {
      this.loading = true
      let data = {
        ids: 0,
        pageNum: 1,
        pageSize: 30
      }
      this.$axios
        .post('/ocarplay/api/ownerType/showOwnerType', data)
        .then(res => {
          // console.log(res)
          this.loading = false
          if (res.status == 200 && res.data.errcode == 0) {
            let data = res.data
            this.ownerTypeListData = data.data
          }
        })
    },
    ///////// 获取车主类型列表 end /////////

    ///////// 新增/修改车型数据 start /////////
    saveSubmit() {
      let data = this.cooperList
      console.log(data)
      let falg = true
      data.forEach((element, i) => {
        if (!element.itemName || !element.money) {
          falg = false
        }
      })
      // console.log(data)
      if (falg) {
        data.forEach((element, i) => {
          if (element.isCard) {
            data[i].isCard = 1
          } else {
            data[i].isCard = 0
          }
        })
        this.saveOwnerType(data)
        // this.$message.success('信息完整！')
      } else {
        this.$message.error('请检查信息不能为空！')
      }
    },
    saveOwnerType(data) {
      this.drawerData = false
      this.$axios
        .post('/ocarplay/api/ownerType/saveOwnerTypes', data)
        .then(res => {
          if (res.status == 200 && res.data.errcode == 0) {
            this.messageWin(res.data.msg)
            this.getshowOwnerType()
          } else {
            this.messageWin(res.data.msg)
          }
        })
    },
    ///////// 新增/修改车型数据 end /////////

    ///////// 抽屉关闭回调 start /////////
    drawerDataClose() {},
    ///////// 抽屉关闭回调 end /////////

    ///////// 消息提示 start /////////
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success'
      })
    },
    messageWarning(message) {
      // 警告提示
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    }
    ///////// 消息提示 end /////////
  }
}
</script>
<style lang="scss" scoped>
$icoColor: rgb(106, 145, 232);
#carownertype {
  width: 100%;
  height: 100%;
  .drawerData {
    i {
      cursor: pointer;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 9px;
    }
  }
}
</style>
