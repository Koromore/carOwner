webpackJsonp([25],{AF3E:function(e,t){},FRhV:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"ownersrecord",components:{},data:function(){return{ownerScheduleListData:[],input:"",urlImg:"",srcList:[],total:0,pageNum:1,pageSize:10}},watch:{},beforeCreate:function(){},beforeMount:function(){},mounted:function(){this.getOwnerScheduleList()},methods:{previous:function(){this.$router.push({path:"/home/owners"})},getOwnerScheduleList:function(){var e=this,t={pageNum:this.pageNum,pageSize:this.pageSize,vehicleOwnerId:this.$route.params.id,isDo:!0};this.$axios.post("/ocarplay/api/vehicleOwner/ownerScheduleListAjax",t).then(function(t){if(console.log(t),200==t.status){var a=t.data;e.ownerScheduleListData=a.items,e.total=a.totalRows}})},changeSize:function(e){console.log(e),this.pageSize=e,this.getOwnerScheduleList()},changePage:function(e){console.log(e),this.pageNum=e,this.getOwnerScheduleList()}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"ownersrecord"}},[a("el-row",{staticClass:"top"},[a("el-col",{staticClass:"left cont",attrs:{span:8}},[a("div",{on:{click:e.previous}},[a("i",{staticClass:"el-icon-arrow-left"}),e._v("\n        返回\n      ")])]),e._v(" "),a("el-col",{staticClass:"center cont",attrs:{span:8}},[e._v("车主解雨臣-预约记录")])],1),e._v(" "),a("el-row",{staticClass:"content"},[a("div",{staticClass:"table_list"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.ownerScheduleListData,"header-row-style":{height:"70px",background:"rgb(242, 242, 242)"},"header-cell-style":{color:"#000",background:"rgb(242, 242, 242)"},height:"100%"}},[a("el-table-column",{attrs:{prop:"",label:"序号",width:"81",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("0"+e._s(t.$index+1))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"addressee",label:"预约时间","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.$date(t.row.startTime)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"schName",label:"日程主题","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"during",label:"时长","min-width":"81"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dayTypeName",label:"类型","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"schLine",label:"路线","min-width":"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"地点","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.province)+e._s(t.row.city)+e._s(t.row.area))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"deptName",label:"预约组别","min-width":"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"carTypeName",label:"预约车辆","min-width":"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"schNum",label:"计划预约量",width:"100",align:"center"}})],1)],1),e._v(" "),a("el-col",{staticClass:"paging",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[10,20,30,40],"page-size":e.pageSize,layout:"total, prev, pager, next ,sizes",total:e.total,background:""},on:{"size-change":e.changeSize,"current-change":e.changePage}})],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(n,l,!1,function(e){a("AF3E")},"data-v-0774f854",null);t.default=s.exports}});