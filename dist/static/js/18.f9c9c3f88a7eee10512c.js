webpackJsonp([18],{IV8a:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"settlementDetail",components:{},data:function(){return{userId:this.$store.state.user.userId,deptId:this.$store.state.user.deptId,taskId:this.$route.params.id,listLoading:!1,uploadIndex:"",total:0,pageSize:10,pageNum:1,tableData:[],prove:"",inviteList:[]}},watch:{},beforeCreate:function(){},beforeMount:function(){},mounted:function(){this.getInvite()},methods:{previous:function(){this.$router.go(-1)},getInvite:function(){var t=this,e={invite:{taskId:this.taskId},pageNum:this.pageNum,pageSize:this.pageSize};this.$axios.post("/ocarplay/api/invite/getInvitePageListByTaskId",e).then(function(e){if(200==e.status){var a=e.data;e.data.items.forEach(function(t){t.prove0=""}),t.inviteList=e.data.items,t.total=a.totalRows}})},uploadClick:function(t){this.uploadIndex=t,console.log(this.uploadIndex)},handlePreview:function(){},filesuccess:function(t,e,a){console.log(t),this.inviteList[this.uploadIndex].prove=t.data.localPath},submit:function(t){var e=this;this.$confirm("确认提交任务吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.inviteSave(t)}).catch(function(){e.$message({type:"info",message:"已取消提交"})})},inviteSave:function(t){var e=this;console.log(t),this.listLoading=!0;var a={inviteId:t.inviteId,prove:t.prove,isOver:1,userId:this.userId};t.isCard?a.prove=t.prove:a.prove=t.prove0,this.$axios.post("/ocarplay/api/invite/save",a).then(function(t){console.log(t),e.listLoading=!1,200==t.status&&0==t.data.errcode?(e.$message.success(t.data.msg),e.getInvite()):e.$message.error(t.data.msg)})},submitList:function(){var t=this;this.$confirm("确认提交任务吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.inviteUpdate()}).catch(function(){t.$message({type:"info",message:"已取消提交"})})},inviteUpdate:function(){var t=this;this.listLoading=!0;var e={taskId:this.taskId};this.$axios.post("/ocarplay/api/invite/updateBatch",e).then(function(e){console.log(e),t.listLoading=!0,200==e.status&&0==e.data.errcode?(t.$message.success(e.data.msg),setTimeout(function(){t.$router.go(-1)},1e3)):t.$message.error(e.data.msg)})},changeSize:function(t){console.log(t),this.pageSize=t},changePage:function(t){console.log(t),this.getInvite()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"settlementDetail"}},[a("el-row",{staticClass:"top"},[a("el-col",{staticClass:"left cont",attrs:{span:8}},[a("div",{on:{click:t.previous}},[a("i",{staticClass:"el-icon-arrow-left"}),t._v("\n        返回\n      ")])]),t._v(" "),a("el-col",{staticClass:"center cont",attrs:{span:8}},[t._v("《哈弗4月日常邀约》")]),t._v(" "),a("el-col",{staticClass:"right cont",attrs:{span:8}},[a("div",{on:{click:t.submitList}},[a("i",{staticClass:"el-icon-circle-check"}),t._v(" "),a("br"),t._v("提交并完成\n      ")])])],1),t._v(" "),a("el-row",{staticClass:"content"},[a("div",{staticClass:"table_list"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.inviteList,"header-row-style":{height:"70px",background:"rgb(242, 242, 242)"},"header-cell-style":{color:"#000",background:"rgb(242, 242, 242)"},height:"100%"}},[a("el-table-column",{attrs:{prop:"",label:"",width:"24","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"时间",width:"81"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$date(e.row.createTime)))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"收件人","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"itemName",label:"合作事项","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"内容标题","min-width":"200","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"link",label:"链接",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-link",{attrs:{href:"http://"+e.row.url,target:"_blank"}},[t._v("【原】")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"电话","min-width":"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"homeAddress",label:"地址","min-width":"240","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"isCard",label:"油卡或现金",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isCard?[t._v("现金")]:[t._v("油卡")]]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"prove",label:"结算凭证",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isCard||e.row.prove?!e.row.isCard&&e.row.prove?[t._v(t._s(e.row.prove))]:e.row.isCard&&!e.row.prove?[a("el-upload",{staticClass:"upload-demo",attrs:{action:"/ocarplay/file/upload","on-preview":t.handlePreview,"on-success":t.filesuccess,limit:1,"show-file-list":!1}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.uploadClick(e.$index)}}},[t._v("上传凭证")])],1)]:e.row.isCard&&e.row.prove?[a("el-image",{staticStyle:{width:"80px",height:"28px",cursor:"pointer","font-size":"0"},attrs:{src:"static/images/ico/btn.jpg","preview-src-list":["/ocarplay/"+e.row.prove]}})]:t._e():[a("el-input",{attrs:{placeholder:"请输入单号",clearable:"",size:"mini"},model:{value:e.row.prove0,callback:function(a){t.$set(e.row,"prove0",a)},expression:"scope.row.prove0"}})]]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"money",label:"预算","min-width":"60",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"64",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return e.row.isOver?void 0:[a("i",{staticClass:"el-icon-circle-check",on:{click:function(a){return t.submit(e.row)}}})]}}],null,!0)})],1)],1),t._v(" "),a("el-col",{staticClass:"paging",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[10,20,30,40],"page-size":t.pageSize,layout:"total, prev, pager, next ,sizes",total:t.total,background:""},on:{"size-change":t.changeSize,"current-change":t.changePage}})],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(i,o,!1,function(t){a("JLxo")},"data-v-4b4b5505",null);e.default=s.exports},JLxo:function(t,e){}});