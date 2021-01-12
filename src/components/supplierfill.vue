<template>
  <div id="supplierfill">
    <el-dialog
      :title="supplierData.type + '供应商'"
      :visible.sync="dialogVisible"
      width="720px"
      center
      @open="openDialog"
    >
      <el-row class="box">
        <el-scrollbar style="height: 100%">
          <div class="content">
            <el-col class="list">
              <el-col :span="4" class="key">任务名称</el-col>
              <el-col :span="20" class="val">{{ supplierData.name }}</el-col>
            </el-col>
            <el-col class="list">
              <el-col :span="4" class="key">{{ supplierData.type }}来源</el-col>
              <el-col :span="20" class="val">
                <el-col
                  class="item"
                  v-for="(item, index) in fromData"
                  :key="index"
                >
                  <el-col :span="10">
                    <el-select
                      v-model="item.supplierId"
                      placeholder="供应商"
                      filterable
                      clearable
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.supplierId"
                        :label="item.supplierName"
                        :value="item.supplierId"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6">
                    <el-input
                      v-model="item.supplierMoney"
                      placeholder="金额"
                      clearable
                    ></el-input>
                  </el-col>
                  <el-col :span="4" class="icon">
                    <i
                      class="el-icon-circle-plus-outline"
                      @click="addFromData(index)"
                      v-show="index == fromData.length - 1"
                    ></i>
                    <i class="el-icon-delete" @click="delFromData(index)"></i>
                    <!-- <i
                      class="el-icon-s-promotion"
                      v-show="supplierData.type == '模特'"
                      @click="send(index)"
                    ></i> -->
                  </el-col>
                  <el-col
                    :span="4"
                    class="switch"
                    v-show="supplierData.type == '模特'"
                  >
                    是否发送任务
                    <el-switch
                      v-model="item.isVisible"
                      active-text="是"
                      inactive-text="否"
                    >
                    </el-switch>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
          </div>
        </el-scrollbar>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveSupplier"> 提交 </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'supplierfill',
  props: {
    supplierShow: Number,
    supplierData: Object,
  }, // 接受参数
  components: {}, // 注册组件
  data() {
    return {
      dialogVisible: false,
      fromData: [],
      options: [
        {
          label: 'label1',
          value: 1,
        },
        {
          label: 'label2',
          value: 2,
        },
        {
          label: 'label3',
          value: 3,
        },
      ],
      movieToSupplierList: [],
      delFromDataList: [],
      list: this.supplierData.list,
      isVisible: false, // 是否在小程序可现实
    }
  },
  // 侦听器
  watch: {
    supplierShow: function (newData, oldData) {
      if (newData) {
        this.dialogVisible = true
      }
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // console.log(this.list)
  },
  // 方法
  methods: {
    // 添加供应商
    addFromData(index) {
      let fromData = this.fromData
      fromData.push({
        deleteFlag: false,
        movieId: this.supplierData.id,
        supplierId: null,
        supplierMoney: null,
        supplierName: null,
        supplierType: this.supplierData.typeId,
        isVisible: false,
      })
      this.fromData = fromData
    },
    // 删除供应商
    delFromData(index) {
      let fromData = this.fromData
      if (fromData.length > 1) {
        if (fromData[index].msId) {
          fromData[index].deleteFlag = true
          this.delFromDataList.push(fromData[index])
        }
        fromData.splice(index, 1)
        this.fromData = fromData
      } else {
        this.$message.warning('至少一个')
      }
      // console.log(this.delFromDataList)
      // console.log(this.fromData)
    },
    // 打开对话框回调
    openDialog() {
      this.getPmsSupplierToOcarplay()
      let fromData = []
      if (this.supplierData.list.length) {
        this.supplierData.list.forEach((element) => {
          fromData.push({
            deleteFlag: false,
            msId: element.msId,
            movieId: element.movieId,
            supplierId: element.supplierId,
            supplierName: element.supplierName,
            supplierMoney: element.supplierMoney,
            supplierType: element.supplierType,
            isVisible: false,
          })
        })
        this.fromData = fromData
      } else {
        this.fromData = [
          {
            deleteFlag: false,
            movieId: this.supplierData.id,
            supplierId: null,
            supplierName: null,
            supplierMoney: null,
            supplierType: this.supplierData.typeId,
            isVisible: false,
          },
        ]
      }

      // console.log(this.supplierData.list)
      // console.log(this.fromData)
    },
    // 获取供应商
    getPmsSupplierToOcarplay() {
      let data = {
        subjectId: 8,
      }
      this.$axios
        .post('/ocarplay/api/movie/getPmsSupplierToOcarplay', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            this.options = res.data.data
          }
        })
        .catch((res) => {
          console.log(res)
          this.drawerLoading = false
        })
    },
    // 提交供应商
    saveSupplier() {
      // this.dialogVisible = false
      let that = this
      let fromData = this.fromData
      let options = this.options
      for (let i = 0; i < fromData.length; i++) {
        let element = fromData[i]
        if (!element.supplierId) {
          this.$message.error('请选择供应商！')
          return
        }
        if (!element.supplierMoney) {
          this.$message.error('请填写金额！')
          return
        }
        for (let j = 0; j < options.length; j++) {
          let element_ = options[j]
          // console.log(j)
          if (element.supplierId == element_.supplierId) {
            element.supplierName = element_.supplierName
            break
          }
        }
      }
      let movieToSupplierList = fromData.concat(this.delFromDataList)
      let data = {
        movieId: this.supplierData.id,
        movieToSupplierList: movieToSupplierList,
      }
      // console.log(data)
      // return
      this.$axios
        .post('/ocarplay/api/movie/save', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode == 0) {
            this.$message.success(that.supplierData.type + '供应商完善成功！')
            ///////// 获取活动列表 start /////////
            this.$parent.getMovieListAjax()
            this.dialogVisible = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    // 发送任务补全模特
    send(index) {
      let fromData = this.fromData
      let data = {
        isVisible: true,
        movieId: this.supplierData.id,
        supplierId: fromData[index].supplierId,
      }
      this.$axios
        .post('/ocarplay/api/movie/updateVisible', data)
        .then((res) => {
          // console.log(res)
          if (res.status == 200 && res.data.errcode == 0) {
            // this.options = res.data.data
            this.$message.success('任务发送成功！')
          }
        })
        .catch((res) => {
          console.log(res)
          this.drawerLoading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
#supplierfill {
  & >>> .el-dialog__header {
    // text-align: center;
    font-weight: bold;
  }
  .box {
    height: 360px;
    box-sizing: border-box;
    padding: 0 3%;
    .list {
      font-size: 16px;
      margin-bottom: 13px;
      .val {
        .item {
          margin-bottom: 9px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          .switch {
            font-size: 12px;
            text-align: center;
          }
        }
        .icon {
          i {
            font-size: 24px;
            line-height: 40px;
            cursor: pointer;
          }
        }
      }
    }
    // display: flex;
    // flex-wrap: wrap;
    // align-items: center;
    // justify-content: center;
  }
  .dialog-footer {
    .el-button {
      width: 108px;
    }
  }
}
</style>
