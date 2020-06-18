webpackJsonp([24],{YU76:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"settlement",components:{},data:function(){return{userId:this.$store.state.user.userId,deptId:this.$store.state.user.deptId,tabact:1,options:[{value:105,label:"沃尔沃项目组"},{value:110,label:"吉利项目组"},{value:153,label:"长城项目组"}],memuValue:"",inviteListData:[],inviteListData1:[],pageNum:1,pageSize:10,total:0}},watch:{},beforeCreate:function(){},beforeMount:function(){},mounted:function(){this.getInviteList(this.memuValue)},methods:{tab:function(t){console.log(t),this.tabact=t,this.getInviteList(this.memuValue)},memuChange:function(t){this.getInviteList(t)},getInviteList:function(t){var e=this,a={task:{deleteFlag:!1,status:0,deptId:this.memuValue},pageNum:this.pageNum,pageSize:this.pageSize},s=this.tabact;1==s?(a.task.status=1,this.$axios.post("/ocarplay/api/invite/getTaskOfInviteList",a).then(function(t){if(console.log(t),200==t.status){var a=t.data;e.inviteListData=a.items,e.total=a.totalRows}})):2==s&&(a.task.status=2,this.$axios.post("/ocarplay/api/invite/getTaskOfInviteList",a).then(function(t){if(200==t.status){var a=t.data;e.inviteListData1=a.items,e.total=a.totalRows}}))},changeSize:function(t){console.log(t),this.pageNum=1,this.pageSize=t;var e=this.memuValue;this.getInviteList(e)},changePage:function(t){console.log(t),this.pageNum=t;var e=this.memuValue;this.getInviteList(e)},reject:function(t){var e=this;this.$confirm("确认要驳回该任务吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.repulseInvite(t)}).catch(function(){e.$message({type:"info",message:"已取消驳回"})})},repulseInvite:function(t){var e=this,a={taskId:t,status:0};this.$axios.post("/ocarplay/api/invite/repulseInvite",a).then(function(t){console.log(t),200==t.status&&0==t.data.errcode&&(e.$message.success(t.data.msg),e.getInviteList(e.memuValue))})},toDetail:function(t){this.$router.push({name:"settlementDetail",params:{id:t}})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"settlement"}},[a("el-row",{staticClass:"top"},[a("el-col",{staticClass:"left",attrs:{span:12}}),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[a("div",{staticClass:"memu"},[a("el-select",{attrs:{clearable:"",placeholder:"项目组",size:"small"},on:{change:t.memuChange},model:{value:t.memuValue,callback:function(e){t.memuValue=e},expression:"memuValue"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("div",{staticClass:"butBox"},[a("div",{class:[1==t.tabact?"but act":"but"],on:{click:function(e){return t.tab(1)}}},[t._v("未结算")]),t._v(" "),a("div",{class:[2==t.tabact?"but act":"but"],on:{click:function(e){return t.tab(2)}}},[t._v("已结算")])])])],1),t._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:1==t.tabact,expression:"tabact==1"}],staticClass:"content content1"},[a("div",{staticClass:"table_list"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.inviteListData,"header-row-style":{height:"70px",background:"rgb(242, 242, 242)"},"header-cell-style":{color:"#000",background:"rgb(242, 242, 242)"},height:"100%"}},[a("el-table-column",{attrs:{prop:"",label:"",width:"24","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"deptName",label:"项目组","min-width":"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskName",label:"任务名称","min-width":"360"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"提交时间","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$date(e.row.updateTime)))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"account",label:"结算清单",width:"130",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"清单",placement:"top"}},[a("i",{staticClass:"el-icon-edit",on:{click:function(a){return t.toDetail(e.row.taskId)}}})])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"130",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"驳回",placement:"top"}},[a("img",{attrs:{src:"static/images/ico/reject.png",width:"24",alt:"",srcset:""},on:{click:function(a){return t.reject(e.row.taskId)}}})])]}}])})],1)],1),t._v(" "),a("el-col",{staticClass:"paging",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[10,20,30,40,50],"page-size":t.pageSize,layout:"total, prev, pager, next ,sizes",total:t.total,background:""},on:{"size-change":t.changeSize,"current-change":t.changePage}})],1)],1),t._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:2==t.tabact,expression:"tabact==2"}],staticClass:"content conten2"},[a("div",{staticClass:"table_list"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.inviteListData1,"header-row-style":{height:"70px",background:"rgb(242, 242, 242)"},"header-cell-style":{color:"#000",background:"rgb(242, 242, 242)"},height:"100%"}},[a("el-table-column",{attrs:{prop:"",label:"",width:"24","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"deptName",label:"项目组","min-width":"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskName",label:"任务名称","min-width":"360"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"提交时间","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$date(e.row.updateTime)))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"invMoney",label:"实际支出",width:"130",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"结算清单",width:"130",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:"查看清单",placement:"top"}},[a("i",{staticClass:"el-icon-view",on:{click:function(a){return t.toDetail(e.row.taskId)}}})])]}}])})],1)],1),t._v(" "),a("el-col",{staticClass:"paging",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[10,20,30,40],"page-size":t.pageSize,layout:"total, prev, pager, next ,sizes",total:t.total,background:""},on:{"size-change":t.changeSize,"current-change":t.changePage}})],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(s,i,!1,function(t){a("o5XK")},"data-v-28b4c342",null);e.default=n.exports},o5XK:function(t,e){}});