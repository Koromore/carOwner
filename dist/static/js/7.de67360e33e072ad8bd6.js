webpackJsonp([7],{"CLj+":function(e,t){},YU76:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"settlement",components:{},data:function(){return{tabact:1,options:[{value:"1",label:"沃尔沃项目组"},{value:"2",label:"吉利项目组"},{value:"3",label:"长城项目组"}],memuValue:"1",tableData:[{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29",expenditure:1e4},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"},{serNum:"106945851123",proTeam:"吉利组",taskName:"6-7月 长城汽车哈佛H系日常",subTime:"20-04-29"}]}},watch:{},beforeCreate:function(){},beforeMount:function(){},mounted:function(){},methods:{tab:function(e){console.log(e),this.tabact=e},changeSize:function(e){console.log(e)},changePage:function(e){console.log(e)},reject:function(){var e=this;this.$confirm("确认要驳回该任务吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$message({type:"success",message:"驳回成功!"})}).catch(function(){e.$message({type:"info",message:"已取消驳回"})})},toDetail:function(){this.$router.push({path:"/home/settlementDetail"})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"settlement"}},[a("el-row",{staticClass:"top"},[a("el-col",{staticClass:"left",attrs:{span:12}}),e._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[a("div",{staticClass:"memu"},[a("el-select",{attrs:{clearable:"",placeholder:"项目组",size:"small"},model:{value:e.memuValue,callback:function(t){e.memuValue=t},expression:"memuValue"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("div",{staticClass:"butBox"},[a("div",{class:[1==e.tabact?"but act":"but"],on:{click:function(t){return e.tab(1)}}},[e._v("未结算")]),e._v(" "),a("div",{class:[2==e.tabact?"but act":"but"],on:{click:function(t){return e.tab(2)}}},[e._v("已结算")])])])],1),e._v(" "),1==e.tabact?a("el-row",{staticClass:"content content1"},[a("div",{staticClass:"table_list"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-row-style":{height:"70px",background:"rgb(242, 242, 242)"},"header-cell-style":{color:"#000",background:"rgb(242, 242, 242)"},height:"100%"}},[a("el-table-column",{attrs:{prop:"serNum",label:"采购编号",width:"360"}}),e._v(" "),a("el-table-column",{attrs:{prop:"proTeam",label:"项目组",width:"240"}}),e._v(" "),a("el-table-column",{attrs:{prop:"taskName",label:"任务名称",width:"240"}}),e._v(" "),a("el-table-column",{attrs:{prop:"subTime",label:"提交时间","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"account",label:"结算清单",width:"130",align:"center"}},[[a("i",{staticClass:"el-icon-edit",on:{click:e.toDetail}})]],2),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"130",align:"center"}},[[a("img",{attrs:{src:"static/images/ico/reject.png",width:"24",alt:"",srcset:""},on:{click:e.reject}})]],2)],1)],1),e._v(" "),a("el-col",{staticClass:"paging",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[10,20,30,40],"page-size":10,layout:"total, prev, pager, next ,sizes",total:100,background:""},on:{"size-change":e.changeSize,"current-change":e.changePage}})],1)],1):e._e(),e._v(" "),2==e.tabact?a("el-row",{staticClass:"content conten2"},[a("div",{staticClass:"table_list"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-row-style":{height:"70px",background:"rgb(242, 242, 242)"},"header-cell-style":{color:"#000",background:"rgb(242, 242, 242)"},height:"100%"}},[a("el-table-column",{attrs:{prop:"serNum",label:"采购编号",width:"360"}}),e._v(" "),a("el-table-column",{attrs:{prop:"proTeam",label:"项目组",width:"240"}}),e._v(" "),a("el-table-column",{attrs:{prop:"taskName",label:"任务名称",width:"240"}}),e._v(" "),a("el-table-column",{attrs:{prop:"subTime",label:"提交时间","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"expenditure",label:"实际支出",width:"130",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"结算清单",width:"130",align:"center"}},[[a("i",{staticClass:"el-icon-view",on:{click:e.toDetail}})]],2)],1)],1),e._v(" "),a("el-col",{staticClass:"paging",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[10,20,30,40],"page-size":10,layout:"total, prev, pager, next ,sizes",total:100,background:""},on:{"size-change":e.changeSize,"current-change":e.changePage}})],1)],1):e._e()],1)},staticRenderFns:[]};var r=a("VU/8")(s,l,!1,function(e){a("CLj+")},"data-v-4f1bb01e",null);t.default=r.exports}});