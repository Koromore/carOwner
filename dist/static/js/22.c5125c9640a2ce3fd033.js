webpackJsonp([22],{"5KN6":function(t,s){},GNfT:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var l=a("BO1k"),e=a.n(l),i=a("bOdI"),r=a.n(i),o=a("/vms"),v={name:"ownersdetail",components:{},data:function(){var t;return t={tableData:[{name:"解雨臣",car:"XC60 2017款 T5 AWD 个性运动升级版",matter:"日常素材",time:"6个月",mandnum:"1500",addnum:"20",oldnum:"16",surplusnum:"4",period:"按月结算"}],url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",radio:"",input1:"",value1:"",dialogImageUrl:"",dialogVisible:!1,optionsCity:o.a,district_code:"",district:""},r()(t,"dialogVisible",!1),r()(t,"options",[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}]),r()(t,"value",""),r()(t,"ownerDetil",{cooperates:[{}],invites:[],ipGrows:[{}]}),t},watch:{},beforeCreate:function(){},beforeMount:function(){},mounted:function(){this.getVehicleOwnerPreEdit()},methods:{previous:function(){this.$router.go(-1)},toAddOwners:function(){this.$router.push({path:"/home/addowners"})},getVehicleOwnerPreEdit:function(t){var s=this,a={typeId:this.$route.params.typeId,vehicleOwnerId:this.$route.params.vehicleOwnerId};console.log(a),this.$axios.post("/ocarplay/api/vehicleOwner/preEdit",a).then(function(t){if(200==t.status){var a=t.data;s.ownerDetil=a}})},handleRemove:function(t,s){console.log(t,s)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},getCascaderObj:function(t,s){return t.map(function(t,a,l){var i=!0,r=!1,o=void 0;try{for(var v,c=e()(s);!(i=(v=c.next()).done);i=!0){var n=v.value;if(n.value==t)return s=n.children,n}}catch(t){r=!0,o=t}finally{try{!i&&c.return&&c.return()}finally{if(r)throw o}}return null})},handleChangeCity:function(t,s){for(var a=this.getCascaderObj(t,this.optionsCity),l=[],e=0;e<a.length;e++)l.push(a[e].label);this.district=l},handleChange:function(t){},download:function(t){console.log(t);var s=t.localPath,a=document.createElement("a");a.download=t.fileName+"."+t.suffix,a.setAttribute("href","http://176.10.10.235:8080/ocarplay/"+s),a.click()}}},c={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"ownersdetail"}},[a("el-row",{staticClass:"content"},[a("el-scrollbar",{staticStyle:{height:"100%"}},[a("el-col",{staticClass:"title",attrs:{span:24}},[a("el-col",{staticClass:"previousBox",attrs:{span:6}},[a("div",{on:{click:t.previous}},[a("i",{staticClass:"el-icon-arrow-left"}),t._v("\n            返回\n          ")])]),t._v(" "),a("el-col",{attrs:{span:12}},[t._v("车主信息")]),t._v(" "),a("el-col",{staticClass:"change",attrs:{span:6}},[a("i",{staticClass:"el-icon-edit",on:{click:t.toAddOwners}})])],1),t._v(" "),a("el-col",{staticClass:"upladImgBox",attrs:{span:24}},[a("el-image",{staticClass:"upladImg",attrs:{src:"/ocarplay/"+t.ownerDetil.image,fit:"cover"}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])])],1),t._v(" "),a("el-col",{staticClass:"information information1",attrs:{span:24}},[a("el-col",{staticClass:"left",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车主类型")]),t._v(" "),a("div",{staticClass:"val"},[1==t.ownerDetil.typeId?[t._v("支持型")]:t._e(),t._v(" "),2==t.ownerDetil.typeId?[t._v("拍摄型")]:t._e(),t._v(" "),3==t.ownerDetil.typeId?[t._v("资源型")]:t._e()],2)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车主性别")]),t._v(" "),a("div",{staticClass:"val"},[t.ownerDetil.sex?[a("i",{staticClass:"el-icon-female sex1"})]:[a("i",{staticClass:"el-icon-male sex0"})]],2)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车主职业")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.work))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("出生日期")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.birthday))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("所在区域")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.province)+t._s(t.ownerDetil.city))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("特长")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.skillName))])])],1),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("合作事项")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(this.$route.params.itemName))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车主姓名")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.name))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("用车生活")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.carUse))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车主来源")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.sourceName))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("认证车型")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.carSeriesName))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车主邮箱")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.email))])])],1)],1),t._v(" "),a("el-col",{staticClass:"title",attrs:{span:24}},[a("el-col",{attrs:{span:24}},[t._v("车主详细信息")])],1),t._v(" "),a("el-col",{staticClass:"information information2",attrs:{span:24}},[a("el-col",{staticClass:"left",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("手机号")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.phone))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("微信号")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.wx))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("QQ号")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.qq))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("汽车之家ID")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.bbsId))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("汽车之家主页")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.homeUrl))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("微博ID")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.weiboId))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("抖音ID")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.dyId))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("其他社交ID")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.otherId))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车牌号")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.plateNum))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车架号")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.vinno))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("购车网点")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.buycarplace))])])],1),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("家庭住址")]),t._v(" "),a("div",{staticClass:"val"},[t._v(t._s(t.ownerDetil.homeAddress))])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("收货地址")]),t._v(" "),a("div",{staticClass:"val"},[t._v("收货地址")])]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("家属信息")]),t._v(" "),a("div",{staticClass:"val"},t._l(t.ownerDetil.relations,function(s,l){return a("el-col",{key:l,attrs:{span:24}},[a("el-col",{attrs:{span:5}},[t._v(t._s(s.name))]),t._v(" "),a("el-col",{attrs:{span:5}},[t._v(t._s(s.relation))]),t._v(" "),a("el-col",{attrs:{span:7}},[t._v(t._s(t.$date0(s.birthday)))]),t._v(" "),a("el-col",{attrs:{span:7}},[t._v(t._s(s.work))])],1)}),1)])],1)],1),t._v(" "),a("el-col",{staticClass:"title",attrs:{span:24}},[a("el-col",{attrs:{span:24}},[t._v("签约合作信息")])],1),t._v(" "),a("el-col",{staticClass:"information information3",attrs:{span:24}},[a("el-col",{staticClass:"left",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("签约合同")]),t._v(" "),a("div",{staticClass:"val"},[a("img",{attrs:{src:"static/images/document/ppt.png",width:"24",alt:"",srcset:""}}),t._v("\n               \n              "),a("el-link",{on:{click:function(s){return t.download(t.ownerDetil.cooperates[0])}}},[t._v(t._s(t.ownerDetil.cooperates[0].fileName))])],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("合作期限")]),t._v(" "),t._l(t.ownerDetil.cooperates,function(s,l){return a("div",{key:l,staticClass:"val"},[t._v(t._s(t.$date(s.startTime))+"---"+t._s(t.$date(s.endTime)))])})],2),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("合作时长")]),t._v(" "),t._l(t.ownerDetil.cooperates,function(s,l){return a("div",{key:l,staticClass:"val"},[s.timeLimit>=30?[t._v(t._s(parseInt(s.timeLimit/30))+"个月")]:[t._v(t._s(s.timeLimit)+"天")]],2)})],2)],1),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("合作事项要求频次")]),t._v(" "),a("div",{staticClass:"val"}),t._v(" "),a("div",{staticClass:"key"},[t._v("IP孵化打造")]),t._v(" "),a("div",{staticClass:"val"},t._l(t.ownerDetil.ipGrows,function(s,l){return a("el-col",{key:l,attrs:{span:24}},[a("el-col",{attrs:{span:6}},[t._v(t._s(s.plat))]),t._v(" "),a("el-col",{attrs:{span:6}},[t._v(t._s(s.platRole))]),t._v(" "),a("el-col",{attrs:{span:6}},[t._v(t._s(s.nickname))]),t._v(" "),a("el-col",{attrs:{span:6}},[t._v(t._s(s.url))])],1)}),1)])],1)],1),t._v(" "),a("el-col",{attrs:{span:22,offset:1}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.ownerDetil.invites,"header-row-style":{height:"70px",background:"rgb(242, 242, 242)"},"header-cell-style":{color:"#000",background:"rgb(242, 242, 242)"}}},[a("el-table-column",{attrs:{prop:"",label:"序号",width:"81",align:"center"},scopedSlots:t._u([{key:"default",fn:function(s){return[t._v("0"+t._s(s.$index+1))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"受邀时间","min-width":"81","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(s){return[t._v(t._s(t.$date(s.row.createTime)))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"task.taskName",label:"受邀任务","min-width":"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"itemName",label:"受邀事项","min-width":"81","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"内容标题","min-width":"81"}}),t._v(" "),a("el-table-column",{attrs:{prop:"url",label:"内容链接","min-width":"81"},scopedSlots:t._u([{key:"default",fn:function(s){return[a("el-link",{attrs:{type:"primary",href:"http://"+s.row.url,target:"_blank"}},[t._v(t._s(s.row.url))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"addnum",label:"成果","min-width":"100"}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(v,c,!1,function(t){a("5KN6")},"data-v-35ff1fec",null);s.default=n.exports}});