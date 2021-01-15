<template>
  <div id="requestpayout">
    <!-- 内容列表 start -->
    <el-row class="content" v-loading="loading">
      <el-scrollbar style="height: 100%">
        <el-col :span="24" class="title">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-col>
        <el-col :span="24" class="top">
          <div class="case">申请人</div>
          <div class="case">{{ supplierObj.supplierName }}</div>
          <div class="case">申请日期</div>
          <div class="case">{{ createTime }}</div>
          <div class="case">供应商</div>
          <div class="case">
            <el-select v-model="fromData.supplierId" @change="handleSupplier" placeholder="请选择" filterable>
              <el-option
                v-for="item in supplierOptions"
                :key="item.supplierId"
                :label="item.supplierName"
                :value="item.supplierId"
              >
              </el-option>
            </el-select>
          </div>
          <div class="case">付款方</div>
          <div class="case">
            <el-radio-group v-model="fromData.roleId" @change="getServe">
               <el-radio v-for="item in payerList" :key="item.roleId" :label="item.roleId">{{item.roleName}}</el-radio>
            </el-radio-group>
          </div>

          <div class="case">联系人</div>
          <div class="case">{{supplierObj.contacts?supplierObj.contacts:'/'}}</div>
          <div class="case">联系方式</div>
          <div class="case">{{supplierObj.phoneNum?supplierObj.phoneNum:'/'}}</div>

          <div class="case">银行卡号</div>
          <div class="case">{{supplierObj.bankAccount?supplierObj.bankAccount:'/'}}</div>
          <div class="case">开户行</div>
          <div class="case">{{supplierObj.depositBank?supplierObj.depositBank:'/'}}</div>

          <div class="case">支付宝账号</div>
          <div class="case">{{supplierObj.alipayAccount?supplierObj.alipayAccount:'/'}}</div>
          <div class="case">链接</div>
          <div class="case">{{supplierObj.url?supplierObj.url:'/'}}</div>

          <div class="case">付款种类</div>
          <div class="case">
            <el-radio-group v-model="fromData.payType">
              <el-radio label="0">对公付款</el-radio>
              <el-radio label="1">对私付款</el-radio>
            </el-radio-group>
          </div>
         
          <div class="case">有无发票</div>
          <div class="case">
            <el-radio-group v-model="fromData.isInvoice" @change="handleInvoice">
              <el-radio label="1">无发票</el-radio>
              <el-radio label="0">有发票</el-radio>
            </el-radio-group>
            <el-select style="width:37%" v-show="invoiceFlag" v-model="fromData.invoiceRemark"  placeholder="请选择发票类型">
              <el-option  label="普票" value="0"></el-option>
              <el-option  label="3点专票" value="1"></el-option>
              <el-option  label="6点专票" value="2"></el-option>
              <el-option  label="17点专票" value="3"></el-option>
            </el-select>
          </div>

          <div class="case" ></div>
          <div class="case"></div>

           <div class="case" >服务费率</div>
          <div class="case" >
             <el-radio-group v-model="fromData.serviceScale" @change="handleSevice">
              <el-radio label="0">默认({{defscale}})%</el-radio>
              <el-radio label="1">其他</el-radio>
            </el-radio-group>
            <el-input v-show="otherFlag"
            style="display:inline-block;    width: 35%;"
                  placeholder="请输入内容"
                  v-model="fromData.deforOther"
                  clearable
                >
            </el-input>
            <span v-show="otherFlag">%</span>
          </div>
        </el-col>
        <el-col class="bottom">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-row-style="{
              height: '54px',
              background: 'rgb(242, 242, 242)',
            }"
            :header-cell-style="{
              color: '#000',
              background: 'rgb(242, 242, 242)',
            }"
            border
          >
            <el-table-column prop="identifier" label="项目编号" show-overflow-tooltip> 
              <template slot-scope="scope">
                {{scope.row.identifier?scope.row.identifier:'/'}}
              </template>
            </el-table-column>
            <el-table-column prop="proName " label="项目名称" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.proName?scope.row.proName:'/'}}
              </template> </el-table-column>
            <el-table-column  label="科目" show-overflow-tooltip> 
              <template>
                影视活动
              </template>
            </el-table-column>
            <el-table-column prop="subItemsName" label="细分项" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.subItemsName?scope.row.subItemsName:'/'}}
              </template> </el-table-column>
            <el-table-column prop="money" label="预计费用" show-overflow-tooltip width="100"> 
              <!-- <template slot-scope="scope" >
                {{scope.row.money?scope.row.money:'/'}}
                {{scope.row.money?scope.row.money:'/'}}
              </template> -->
            </el-table-column>
            <el-table-column prop="buyNum" label="采购数量" show-overflow-tooltip width="80">
              <template slot-scope="scope">
                {{scope.row.buyNum?scope.row.buyNum:'/'}}
              </template>
            </el-table-column>
            <el-table-column prop="buyPrice" label="单价" show-overflow-tooltip width="50">
              <template slot-scope="scope">
                {{scope.row.buyPrice?scope.row.buyPrice:'/'}}
              </template> </el-table-column>
            <el-table-column prop="totalMoney" label="费用" show-overflow-tooltip width="50">
              <template slot-scope="scope">
                {{scope.row.totalMoney?scope.row.totalMoney:'/'}}
              </template> </el-table-column>
            <el-table-column prop="name" label="支付方式" width="120">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.payMode"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in payMode"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="付款日期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.payTime"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="请款金额" width="100">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入内容"
                  v-model="scope.row.cashMoney"
                  clearable
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="服务费" >
              <template slot-scope="scope">
                <!-- <el-input
                  v-model="scope.row.fwf"
                  disabled
                >
                </el-input> -->{{otherFlag&&scope.row.cashMoney?(( Number(fromData.deforOther)*Number(scope.row.cashMoney))/100).toFixed(2):!otherFlag&&scope.row.cashMoney?((scope.row.cashMoney*defscale)/100).toFixed(2):0}}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="付款金额">
              <template slot-scope="scope">
                <!-- <el-input
                  placeholder="请输入内容"
                  v-model="scope.row.payMoney"
                  clearable
                >
                </el-input> -->
                {{otherFlag&&scope.row.cashMoney?((( Number(fromData.deforOther)*Number(scope.row.cashMoney))/100)+Number(scope.row.cashMoney)).toFixed(2):!otherFlag&&scope.row.cashMoney?(((scope.row.cashMoney*defscale)/100)+Number(scope.row.cashMoney)).toFixed(2):0}}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="备注">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入内容"
                  v-model="scope.row.remark"
                  clearable
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-link type="primary" @click="del(scope.row.$index)">
                  删除
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="putPlaceholder"></el-col>
        <el-col :span="24" class="put">
          <el-button type="primary" @click="submit" :disabled="putDisabled">
            <span>提交</span>
          </el-button>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
import Template from '../../template.vue';
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'requestpayout',
  components: {Template},
  data() {
    return {
      userId: this.$store.state.user.userId,
      deptId: this.$store.state.user.deptId,
      userName: this.$store.state.user.userName,
      loading: false,
      createTime: null,
      pId: 0,
      supplierOptions:[],//供应商
      payMode:[
        {label:'全款先付',value:'1'},
        {label:'全款后付',value:'2'},
        {label:'预付款',value:'3'},
        {label:'分期预付',value:'4'},
        {label:'尾款',value:'5'},
      ],
      supplierObj:{},//供应商数据
      payerList:[],
      supplierData:{},//付款方/服务费率
      fromData:{
        supplierId:'',
        serviceScale:'0' , //默认费率
        deforOther:'',  //其他费率
        roleId:'',//付款方
        payType:'0',//付款种类
        isInvoice:'1',
      },
      defscale:0,//用户输入的服务费率
      otherFlag:false,//用户输入服务费率输入框
      invoiceFlag:false,//有票下拉框

      tableData: [ ],//列表数据

      chooseArr:[],//批量请款选中的id数组
      putDisabled: false,
      
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {

    this.chooseArr=this.$store.state.batchCashOut;

    ///////// 接受页面传参 start /////////
    // this.getQuery();
    this.getSupplier();
    this.getpayerList();
    this.createTime = this.$date0(new Date())
  },
  // 方法事件
  methods: {
    submit(){
      // console.log(this.tableData)
      let outData={
            subjectId:this.tableData[0].subjectId,
            subItemsId:this.tableData[0].subItemsId,
            supplierName: this.supplierObj.supplierName,
            supplierId:this.fromData.supplierId
        };
      let data=[];
      for (let i = 0; i < this.tableData.length; i++) {
        if(!this.tableData[i].payMode){
          this.$message.error('请选择支付方式');
          return false
        }
        if(!this.tableData[i].payTime){
           this.$message.error('请选择付款日期');
          return false
        }

         if(!this.tableData[i].cashMoney){
           this.$message.error('请输入请款金额');
          return false
        }
      }
      this.tableData.forEach(element => {
        
        let money='';
        if(this.fromData.deforOther){
         money= Number((element.cashMoney*this.fromData.deforOther)/100)+Number(element.cashMoney)
        }
        if(this.fromData.serviceScale=='0'){
         money= Number((element.cashMoney*this.defscale)/100)+Number(element.cashMoney)
        }
        data.push(
          {
            serviceScale:this.fromData.serviceScale,//默认费率
            deforOther:this.fromData.deforOther,//其他费率
            proRequireId:element.proRequireId,//采购系统任务id
            roleId:this.fromData.roleId,//付款方
            supplierId:this.fromData.supplierId,//供应商id
            payType:this.fromData.payType,//付款种类
            payMode:element.payMode, //支付方式
            payMoney:money,//请款金额(总额)
            subjectId:element.subjectId,//科目id
            subItemsId:element.subItemsId,//细分项id
            remark:element.remark,//备注
            payTime:element.payTime,//付款日期
            subjectName:'影视活动',//科目名
            subItemsName:element.subItemsName,//细分项名
            isInvoice:this.fromData.isInvoice,//有无发票 0-有  1-没有
            invoiceRemark:this.fromData.invoiceRemark,//发票类型(用户下拉框选中)
            proitemId: this.pId
          }
        )
      });
      
      let jsonstr=JSON.stringify(data).substr(1,JSON.stringify(data).length-2)
      let sumData={
        supplier:outData,
        prequireId:this.tableData[0].proRequireId,
        user:{
          userId:this.$store.state.user.userId
        },
        paydetail:jsonstr
      }
      // console.log(sumData)
      // return
      this.loading = true
      this.$axios.post('/ocarplay/api/movie/creatPayDetail',sumData).then((res) => {
        if(res.status==200){
          this.$message.success(res.data.msg);
          this.putDisabled = true
        }else{
          this.$message.error(res.data.msg)
        }
          this.loading = false
      }).catch((err) => {
         this.$message.error(err)
         this.loading = false
      });
      // console.log(sumData);

    },
    //是否有票
    handleInvoice(e){
      if(e=='0'){
        this.invoiceFlag=true;
      }else{
        this.invoiceFlag=false;

      }
    },
    //费率选中其他
    handleSevice(e){
      if(e=='1'){
        this.otherFlag=true;
      }else{
        this.otherFlag=false;
        this.fromData.deforOther='';

      }
    },
    //供应商下拉框选中
    handleSupplier(e){
      console.log(e);
      this.putDisabled = false
       this.$axios.post('/ocarplay/api/movie/toCashOut',{movieIdList:this.chooseArr,supplierId:e}).then((res) => {
            if(res.status==200){
              this.supplierObj=res.data[0].supplierList[0];
              // this.fromData.supplier.subjectId=this.supplierObj.s
             res.data.forEach(element => {
                element.totalMoney=0;
                element.cashMoney=element.supplierMoney;
                element.payMode='';
                element.remark=element.supplierTypeStr;
                element.payTime='';
                element.invoiceRemark='';

              });
              this.pId = res.data[0].pId
              this.tableData=res.data;
            }
          }).catch((err) => {
            
          });
    },
    //付款方选中——服务费率
    getServe(e){
       this.$axios.post('/ocarplay/api/movie/getPaymentRoleToOcarplay', {roleId: e}).then((res) => {
          if (res.status == 200 && res.data.errorCode == 0) {
              this.defscale = res.data.data[0].defscale;
          }
      })
    },
    //获取付款方
    getpayerList() {
      this.$axios.post('/ocarplay/api/movie/getPaymentRoleToOcarplay', {isOther: 1}).then((res) => {
          if (res.status == 200 && res.data.errorCode == 0) {
              this.payerList = res.data.data;
              this.fromData.roleId=res.data.data[0].roleId;
              this.getServe(res.data.data[0].roleId)
          }
      })
        },
        //获取供应商
    getSupplier(){
      this.$axios.post('/ocarplay/api/movie/getSupplierByMovieIds',{movieIdList:this.chooseArr}).then((res) => {
        if(res.status==200){
          this.supplierOptions=res.data;
          this.fromData.supplierId=res.data[0].supplierId;
          this.$axios.post('/ocarplay/api/movie/toCashOut',{movieIdList:this.chooseArr,supplierId:res.data[0].supplierId}).then((res) => {
            if(res.status==200){
              this.supplierObj=res.data[0].supplierList[0];
              res.data.forEach(element => {
                element.payMoney=0;//付款金额-总额
                element.cashMoney=element.supplierMoney;//用户输入-请款金额
                element.payMode='';//支付方式
                element.remark=element.supplierTypeStr;//备注
                element.payTime='';//时间
                element.invoiceRemark='';//有发票-用户下拉框选择


              });
              this.pId = res.data[0].pId
              this.tableData=res.data;
            }
          }).catch((err) => {
            
          });
        }
      }).catch((err) => {
        
      });

    },
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 接受页面传参 start /////////
    isDeptId() {
      if (this.deptId == 90) {
        this.disabledCaigou = false
      } else {
        this.disabledCaigou = true
      }
    },
    ///////// 接受页面传参 end /////////

    ///////// 接受页面传参 start /////////
    getQuery() {
      let type = this.$route.query.type
      let id = this.$route.query.id
    },
    ///////// 接受页面传参 end /////////

    ///////// 删除 end /////////
    del(index) {},
    ///////// 删除 end /////////
  },
}
</script>
<style lang="scss" scoped>
#requestpayout {
  height: 100%;
  background: white;
  border-radius: 8px 8px 0 0;
  .putPlaceholder{
    height: 40px;
  }
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #e7e7e7;
    border-radius: 8px 8px 0 0;
    padding: 36px;

    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 13px;
      .previousBox {
        font-size: 22px;
        text-align: left;
        // padding-left: 36px;
        div {
          cursor: pointer;
          text-align: left;
          font-weight: 100;
          height: 37px;
          line-height: 37px;
        }
        i {
          font-weight: bold;
        }
      }
    }
    $borderColor: #cccccc;
    .top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      box-sizing: border-box;
      // border-top: 1px solid $borderColor;
      // border-left: 1px solid $borderColor;

       border: 1px solid #DCDBDB;
      border-radius: 10px;
      overflow: hidden;
      
      .case {
        // min-width: 160px;
        height: 49px;
        // border-bottom: 1px solid $borderColor;
        border-bottom:1px dashed #EFEFEF;
        
        border-right: 1px solid $borderColor;
        box-sizing: border-box;
        line-height: 49px;
        &:nth-of-type(2n-1) {
          width: 10%;
          // background: #f2f2f2;
          background: #8C8C8C;
          text-align: left;
          border: none !important;
          color: #ffffff;
          padding: 0 10px;
        }
        &:nth-of-type(2n) {
          width: 40%;
          padding: 0 20px;
          color: #606266;
          // background: #ccc;
        }
        .el-radio{
          padding: 4px 0;
        }
      }
    }
    .bottom {
      margin-top: 32px;
    }
    .put {
      background: white;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      button {
        width: 136px;
      }
    }
  }
  & >>> .el-table__body tr.current-row > td {
    background: #d8d8c8;
  }
  .el-table thead{
    background-color:#8C8C8C !important;
    color: #ffffff !important;
  }
}
</style>
<style lang="scss">
.right {
  .list {
    .valList {
      .el-input {
        .el-input__inner {
          border: none;
        }
      }
    }
  }
}
#requestpayout {
  .el-table {
    .el-table__header-wrapper {
      border-radius: 0;
      margin: 0;
    }
  }
}
</style>
