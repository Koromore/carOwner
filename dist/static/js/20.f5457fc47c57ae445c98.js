webpackJsonp([20],{"0wc5":function(e,t){},XoGP:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"carownerspeciality",props:{openDrawer:Number},components:{},data:function(){return{skillId:"",skillName:"",loading:!1,ownerSkillData:[],drawerData:!1,drawerTietle:"新增数据",total:0,pageNum:1,pageSize:10}},watch:{openDrawer:function(e,t){this.drawerData=!0,this.drawerTietle="新增数据"}},beforeCreate:function(){},beforeMount:function(){},mounted:function(){this.getOwnerSkillList()},methods:{changeSize:function(e){console.log(e),this.pageSize=e,this.getOwnerSkillList()},changePage:function(e){console.log(e),this.pageNum=e,this.getOwnerSkillList()},redact:function(e){this.drawerData=!0,this.drawerTietle="编辑数据",this.skillName=e.skillName,this.skillId=e.skillId},cancel:function(){this.drawerData=!1},drawerDataClose:function(){this.skillName="",this.skillId=""},getOwnerSkillList:function(){var e=this;this.loading=!0;this.$axios.post("/ocarplay/api/ownerSkill/listAjaxUnPage",{ids:0,pageNum:1,pageSize:30}).then(function(t){if(e.loading=!1,200==t.status){var a=t.data;e.ownerSkillData=a,e.total=a.totalRows}})},saveSubmit:function(){var e="?skillName="+this.skillName+"&skillId="+this.skillId;this.saveCarType(e)},saveCarType:function(e){var t=this;this.drawerData=!1,this.$axios.post("/ocarplay/api/ownerSkill/saveOrUpdate"+e).then(function(e){200==e.status?(t.messageWin(e.data.msg),t.getOwnerSkillList()):t.messageWin(e.data.msg)})},deleteOwnerSkill:function(e){var t=this,a={skillId:e};this.$axios.post("/ocarplay/api/ownerSkill/delete",a).then(function(e){200==e.status&&0==e.data.errcode?(t.messageWin(e.data.msg),t.getOwnerSkillList()):t.messageError(e.data.msg)})},delContent:function(e){var t=this;this.$confirm("确认要删除该数据吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deleteOwnerSkill(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},messageWin:function(e){this.$message({message:e,type:"success"})},messageWarning:function(e){this.$message({message:e,type:"warning"})},messageError:function(e){this.$message.error(e)}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"carownerspeciality"}},[a("div",{staticClass:"table_list"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.ownerSkillData,"header-row-style":{height:"70px",background:"rgb(242, 242, 242)"},"header-cell-style":{color:"#000",background:"rgb(242, 242, 242)"},height:"100%"}},[a("el-table-column",{attrs:{prop:"name",label:"序号",width:"81",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("0"+e._s(t.$index+1))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"skillName",label:"车主特长","min-width":"240"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-edit",on:{click:function(a){return e.redact(t.row)}}}),e._v(" "),a("i",{staticClass:"el-icon-delete",on:{click:function(a){return e.delContent(t.row.skillId)}}})]}}])})],1)],1),e._v(" "),a("el-drawer",{attrs:{title:e.drawerTietle,visible:e.drawerData,size:"566px"},on:{"update:visible":function(t){e.drawerData=t},close:e.drawerDataClose}},[a("el-row",{staticClass:"drawerData"},[a("el-col",{attrs:{span:4}},[e._v("车主特长:")]),e._v(" "),a("el-col",{attrs:{span:18}},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.skillName,callback:function(t){e.skillName=t},expression:"skillName"}})],1)],1),e._v(" "),a("el-col",{staticClass:"btn",attrs:{span:24}},[a("el-col",{attrs:{span:6,offset:5}},[a("el-button",{attrs:{type:"info"},on:{click:e.cancel}},[e._v("取消")])],1),e._v(" "),a("el-col",{attrs:{span:6,offset:2}},[a("el-button",{attrs:{type:"primary"},on:{click:e.saveSubmit}},[e._v("提交")])],1)],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(i,s,!1,function(e){a("0wc5")},"data-v-36e1ffbf",null);t.default=l.exports}});