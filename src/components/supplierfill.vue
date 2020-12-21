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
                  <el-col :span="6" :offset="1">
                    <el-input
                      v-model="item.supplierMoney"
                      placeholder="请输入金额"
                      clearable
                    ></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1" class="icon">
                    <i
                      class="el-icon-circle-plus-outline"
                      @click="addFromData(index)"
                      v-show="index == fromData.length - 1"
                    ></i>
                    <i class="el-icon-delete" @click="delFromData(index)"></i>
                    <i class="el-icon-plus"></i>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
            <!-- {{ fromData }} -->
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
      fromData: [
        {
          supplierId: null,
          supplierMoney: null,
          supplierType: this.supplierData.typeId,
        },
      ],
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
    console.log(this)
  },
  // 方法
  methods: {
    // 添加供应商
    addFromData(index) {
      let fromData = this.fromData
      fromData.push({
        // value1: '',
        // value2: '',
        supplierId: null,
        supplierMoney: null,
        supplierType: this.supplierData.typeId,
      })
      this.fromData = fromData
    },
    // 删除供应商
    delFromData(index) {
      let fromData = this.fromData
      if (fromData.length > 1) {
        fromData.splice(index, 1)
        this.fromData = fromData
      } else {
        this.$message.warning('至少一个')
      }
    },
    // 打开对话框回调
    openDialog() {
      this.getPmsSupplierToOcarplay()
    },
    // 获取供应商
    getPmsSupplierToOcarplay() {
      let data = {
        subItemsId: 8,
      }
      this.$axios
        .post('/ocarplayapi/movie/getPmsSupplierToOcarplay', data)
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
      let data = {
        movieId: this.supplierData.id,
        movieToSupplierList:this.fromData
        
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
    padding: 0 9%;
    .list {
      font-size: 16px;
      margin-bottom: 13px;
      .val {
        .item {
          margin-bottom: 9px;
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
