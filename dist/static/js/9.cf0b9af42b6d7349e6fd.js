webpackJsonp([9],{lrUO:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={name:"taskdetail",components:{},data:function(){return{taskId:1,taskDetail:{},loading:!1}},watch:{},beforeCreate:function(){},beforeMount:function(){},mounted:function(){this.taskId=this.$route.params.id,this.getTaskDetails()},methods:{previous:function(){this.$router.go(-1)},handleRemove:function(t,s){console.log(t,s)},handlePreview:function(t){console.log(t)},handleExceed:function(t,s){this.$message.warning("当前限制选择 3 个文件，本次选择了 "+t.length+" 个文件，共选择了 "+(t.length+s.length)+" 个文件")},beforeRemove:function(t,s){return this.$confirm("确定移除 "+t.name+"？")},getTaskDetails:function(){var t=this;this.loading=!0;var s={taskId:this.$route.params.id};this.$axios.post("/ocarplay/task/edit",s).then(function(s){if(200==s.status){var a=s.data;a.inviteNum=a.listInvite.length,a.inviteNumOver=0,a.listInvite.forEach(function(t){1==t.isWrite&&(a.inviteNumOver+=1)}),t.taskDetail=a,t.loading=!1}})},toAddtask:function(){var t=this.taskId;this.$router.push({path:"/home/addTask",query:{type:2,id:t}})},sendInvitation:function(){var t=this,s={taskId:this.taskId};this.$axios.post("/ocarplay/task/sendInvitation",s).then(function(s){console.log(s),200==s.status&&(0==s.data.errcode?t.$message.success(s.data.msg):t.$message.error(s.data.msg))})},download:function(t){var s=t.localPath,a=document.createElement("a");a.download=t.fileName+"."+t.suffix,a.setAttribute("href","http://176.10.10.233:8082/ocarplay/"+s),a.click()},exportInvite:function(t){var s=this,a={taskId:t.taskId};this.$axios.post("/ocarplay/api/invite/exportInvite",a,{responseType:"blob"}).then(function(a){if(console.log(a),200==a.status){var i=new Blob([a.data],{type:"text/plain;charset=utf-8"});saveAs(i,t.taskName+".xls")}else s.$message.error("删除任务失败！")})}}},e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"taskdetail"}},[a("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"content"},[a("el-col",{staticClass:"title",attrs:{span:24}},[a("el-col",{staticClass:"previousBox",attrs:{span:6}},[a("div",{on:{click:t.previous}},[a("i",{staticClass:"el-icon-arrow-left"}),t._v("\n          返回\n        ")])]),t._v(" "),a("el-col",{attrs:{span:12}},[t._v("任务详情")])],1),t._v(" "),a("el-col",{staticClass:"left",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("任务名称")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.taskDetail.taskName))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("任务状态")]),t._v(" "),a("div",{staticClass:"val"},[0==t.taskDetail.status?[t._v("执行中")]:1==t.taskDetail.status?[t._v("审核中")]:2==t.taskDetail.status?[t._v("已完成")]:3==t.taskDetail.status?[t._v("延期")]:4==t.taskDetail.status?[t._v("人工延期")]:t._e()],2)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("品牌车型")]),t._v(" "),a("div",{staticClass:"val"},t._l(t.taskDetail.listInvite,function(s,i){return a("div",{key:i},[t._v(t._s(s.listOwnerType[0].typeName)+"—"+t._s(s.listOwnerItem[0].itemName)+"—"+t._s(s.realName))])}),0)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("计划周期")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.taskDetail.startTime)+"---"+t._s(t.taskDetail.endTime))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("计划邀约量")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.taskDetail.num))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("创建人")]),t._v(" "),a("div",{staticClass:"val"},[t._v("解雨臣")])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("备注")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.taskDetail.remark))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("品牌车型")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.taskDetail.carSeriesName))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("完成时间")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.taskDetail.overTime))])])],1),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("任务描述")]),t._v(" "),a("div",{staticClass:"val"},[t._v("\n          "+t._s(t.taskDetail.taskDesc)+"\n          ")])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("任务文件")]),t._v(" "),a("div",{staticClass:"val"},t._l(t.taskDetail.listTaskFile,function(s,i){return a("div",{key:i},[a("img",{attrs:{src:"static/images/document/ppt.png",width:"20",alt:""}}),t._v(" \n            "),a("el-link",{on:{click:function(a){return t.$download(s)}}},[t._v(t._s(s.fileName))])],1)}),0)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("结算清单")]),t._v(" "),a("div",{staticClass:"val"},[1==t.taskDetail.status||2==t.taskDetail.status?a("span",["doc"==t.ownerDetil.cooperates[0].suffix||"docx"==t.ownerDetil.cooperates[0].suffix?a("img",{attrs:{src:"static/images/document/word.png",width:"16",alt:"",srcset:""}}):"xls"==t.ownerDetil.cooperates[0].suffix||"xlsx"==t.ownerDetil.cooperates[0].suffix?a("img",{attrs:{src:"static/images/document/excle.png",width:"16",alt:"",srcset:""}}):"ppt"==t.ownerDetil.cooperates[0].suffix||"pptx"==t.ownerDetil.cooperates[0].suffix?a("img",{attrs:{src:"static/images/document/ppt.png",width:"16",alt:"",srcset:""}}):a("img",{attrs:{src:"static/images/document/other.png",width:"16",alt:"",srcset:""}}),t._v(" "),a("el-link",{on:{click:function(s){return t.exportInvite(t.taskDetail)}}},[t._v(t._s(t.taskDetail.taskName))])],1):a("span",[t._v("暂无")])]),t._v(" "),a("div",{staticClass:"key"},[t._v("完成进度")]),t._v(" "),a("div",{staticClass:"val"},[t._v("\n          "+t._s(t.taskDetail.inviteNum)+"/"+t._s(t.taskDetail.inviteNumOver)+"\n          ")]),t._v(" "),a("div",{staticClass:"key"},[t._v("完成详情")]),t._v(" "),a("div",{staticClass:"val"},t._l(t.taskDetail.listInvite,function(s,i){return a("div",{key:i},[a("span",[t._v(t._s(s.realName))]),t._v("  \n            "),a("span",[t._v(t._s(s.url))]),t._v("  \n            "),a("span",[t._v(t._s(s.money))]),t._v("  \n            "),s.isCard?a("span",[t._v("现金")]):a("span",[t._v("油卡")]),t._v("  \n            "),1==s.isWrite?a("span",[t._v("已完成")]):a("span",[t._v("未完成")])])}),0)])],1),t._v(" "),a("el-col",{staticClass:"btn",attrs:{span:24}},[a("el-button",{attrs:{type:"primary"},on:{click:t.sendInvitation}},[t._v("发送邀请函")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.toAddtask}},[t._v("复制任务")])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(i,e,!1,function(t){a("to5S")},"data-v-b56fed1c",null);s.default=l.exports},to5S:function(t,s){}});