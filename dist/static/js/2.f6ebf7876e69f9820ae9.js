webpackJsonp([2],{"4WTo":function(t,e,a){var i=a("NWt+");t.exports=function(t,e){var a=[];return i(t,!1,a.push,a,e),a}},"5y3q":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("BO1k"),s=a.n(i),l=a("lHA8"),o=a.n(l),n=a("c/Tr"),r=a.n(n),c=a("bOdI"),u=a.n(c),d=a("/vms"),v={name:"addOwners",components:{},data:function(){var t;return t={loading:!1,checked:!1,radio:"",input1:"",value1:"",dialogImageUrl:"",dialogVisible:!1,tabact:"1"},u()(t,"dialogVisible",!1),u()(t,"options",[]),u()(t,"value",""),u()(t,"periodList",[{value:0,label:"按月结算"},{value:1,label:"按年结算"},{value:2,label:"按季度结算"}]),u()(t,"vehicleOwnerId",""),u()(t,"addType",0),u()(t,"ownerDetil",""),u()(t,"fileList",[]),u()(t,"handerImg",""),u()(t,"eventDataList",[]),u()(t,"eventData",[]),u()(t,"sex",""),u()(t,"work",""),u()(t,"birthDate",""),u()(t,"optionsCity",d.a),u()(t,"district_code",""),u()(t,"district",""),u()(t,"ownerSkilList",[]),u()(t,"speciality",""),u()(t,"ownersName",""),u()(t,"livelihood",[]),u()(t,"livelihood0",""),u()(t,"sourceList",[]),u()(t,"source",""),u()(t,"carSeriesList",[]),u()(t,"carSeries",""),u()(t,"carSeriesId",""),u()(t,"mail",""),u()(t,"team",""),u()(t,"tel",""),u()(t,"wx",""),u()(t,"qq",""),u()(t,"carId",""),u()(t,"carHome",""),u()(t,"microblog",""),u()(t,"tikTokId",""),u()(t,"socialId",""),u()(t,"carNum",""),u()(t,"vin",""),u()(t,"branch",""),u()(t,"address",""),u()(t,"deliAddress",""),u()(t,"relationList",[{relationId:"",name:"",relation:"",birthday:"",work:""}]),u()(t,"pactFileList",[]),u()(t,"pactName",""),u()(t,"pactPath",""),u()(t,"pactsuffix",""),u()(t,"timeLimit",""),u()(t,"duration",""),u()(t,"eventList",[{itemId:"",itemName:"",coopNum:"",coopMoney:"",period:"",timeLimit:"",typeId:""}]),u()(t,"hatchList",[{plat:"",platRole:"",nickname:"",url:""}]),u()(t,"submitFlag",!0),t},watch:{tabact:function(t,e){var a=this;0==this.addType&&(this.eventData=[]),this.geteventDataList(t),this.eventList.forEach(function(e,i){a.eventList[i].typeId=t}),this.addType=0},duration:function(t,e){var a=this;this.eventList.forEach(function(e,i){a.eventList[i].timeLimit=t})},carSeriesId:function(t,e){t&&0!=this.carSeriesList.length&&this.getCarSeries()},carSeriesList:function(t,e){0!=t.length&&this.carSeriesId&&this.getCarSeries()}},beforeCreate:function(){},beforeMount:function(){},mounted:function(){this.disCities(),1==this.$route.params.type&&(this.addType=1,this.getVehicleOwnerDetail()),this.geteventDataList(1),this.getSourceList(),this.getOwnerSkillList(),this.getCarSeriesLists()},methods:{previous:function(){this.$router.go(-1)},getCarSeries:function(){var t=this,e=[];this.carSeriesList.forEach(function(a){a.children.forEach(function(i){i.children.forEach(function(s){s.value==t.carSeriesId&&(e.push(a.value),e.push(i.value),e.push(s.value))})})}),this.carSeries=e},disCities:function(){var t=[];d.a.forEach(function(e){var a={value:e.value,label:e.label,children:[]};e.children.forEach(function(t){a.children.push({value:t.value,label:t.label})}),t.push(a)}),this.optionsCity=t},getVehicleOwnerDetail:function(){var t=this,e={typeId:this.$store.state.vehicleOwnerDetailNum[0],vehicleOwnerId:this.$store.state.vehicleOwnerDetailNum[1]};this.$axios.post("/ocarplay/api/vehicleOwner/preEdit",e).then(function(e){if(200==e.status){var a=e.data;if(t.vehicleOwnerId=a.vehicleOwnerId,t.handerImg=a.image,a.image="/ocarplay/"+a.image,t.ownerDetil=a,t.fileList=[{name:"",url:a.image}],t.tabact=a.typeId,1==a.typeId){var i=[];a.ownerCoops.forEach(function(t){i.push(t.itemId)}),i=r()(new o.a(i)),t.eventData=i,console.log(t.eventData);var s=[];a.ownerCoops.forEach(function(t){s.push({itemId:t.itemId,itemName:t.itemName,coopNum:t.coopNum,coopMoney:t.coopMoney,period:t.period,timeLimit:t.timeLimit,typeId:t.typeId})}),t.eventList=s,console.log(s)}else if(2==a.typeId||3==a.typeId){var l=[];a.ipGrows.forEach(function(t){l.push(t.itemId)}),l=r()(new o.a(l)),t.eventData=l,console.log(t.eventData);var n=a.ipGrows[0].itemId,c=[];a.ipGrows.forEach(function(t){t.itemId==n&&c.push({plat:t.plat,platRole:t.platRole,nickname:t.nickname,url:t.url})}),t.hatchList=c}a.sex?t.sex="1":t.sex="0",t.work=a.work,t.birthDate=new Date(a.birthday.replace(/-/g,"/")),t.district=[a.province,a.city];var u=[a.province,a.city],d=t.optionsCity;t.district_code=t.getValue(u,d),t.speciality=a.skillId,t.ownersName=a.name,t.livelihood=a.carUse.split(","),t.source=a.sourceId,t.carSeriesId=a.seriesId,t.mail=a.email,t.tel=a.phone,t.wx=a.wx,t.qq=a.qq,t.carId=a.bbsId,t.carHome=a.homeUrl,t.microblog=a.weiboId,t.tikTokId=a.dyId,t.socialId=a.otherId,t.carNum=a.plateNum,t.vin=a.vinno,t.branch=a.buycarplace,t.address=a.homeAddress,t.deliAddress=a.homeAddress;var v=[];a.relations.forEach(function(t){v.push({relationId:t.relationId,name:t.name,relation:t.relation,birthday:t.birthday,work:t.work})}),t.relationList=v,t.pactFileList=[{name:a.cooperates[0].fileName,url:a.cooperates[0].localPath}],t.pactName=a.cooperates[0].fileName,t.pactPath=a.cooperates[0].localPath,t.pactsuffix=a.cooperates[0].suffix,t.timeLimit=[a.cooperates[0].startTime.replace(/-/g,"/"),a.cooperates[0].endTime.replace(/-/g,"/")],t.duration=a.cooperates[0].timeLimit}})},changeEvent:function(t){var e=this;console.log("changeEvent");var a=this.eventDataList,i=[];t.forEach(function(t){a.forEach(function(e){e.value==t&&i.push(e.label)})}),console.log(i);var s=[];t.forEach(function(t,a){s.push({name:t,itemId:t,itemName:i[a],coopNum:"",coopMoney:"",period:"",timeLimit:e.duration,typeId:e.tabact})}),this.eventList=s,console.log(s)},geteventDataList:function(t){var e=this,a={typeId:t};this.$axios.post("/ocarplay/api/vehicleOwner/getOwnerTypeItems",a).then(function(t){if(200==t.status){var a=[];t.data.forEach(function(t){a.push({value:t.itemId,label:t.itemName})}),e.eventDataList=a}})},getSourceList:function(){var t=this;this.$axios.post("/ocarplay/api/ownerSource/listAjaxUnPage",{ids:0,pageNum:1,pageSize:100}).then(function(e){if(200==e.status){var a=[];e.data.forEach(function(t){a.push({value:t.sourceId,label:t.sourceName})}),t.sourceList=a}})},getOwnerSkillList:function(){var t=this;this.$axios.post("/ocarplay/api/ownerSkill/listAjaxUnPage",{ids:0,pageNum:1,pageSize:30}).then(function(e){if(200==e.status){var a=[];e.data.forEach(function(t){a.push({value:t.skillId,label:t.skillName})}),t.ownerSkilList=a}})},getCarSeriesLists:function(){var t=this;this.$axios.post("/ocarplay/api/carSeries/getCarSeriesLists",{ids:0,pageNum:1,pageSize:30}).then(function(e){if(200==e.status){var a=[{value:105,label:"沃尔沃",children:[]},{value:110,label:"吉利舆情",children:[]},{value:153,label:"长城",children:[]}];e.data.items.forEach(function(t){var e={value:t.carTypeId,label:t.carTypeName,children:[]},i=t.carSeriesIds.split("/"),s=t.carSeriesName.split("/");i.forEach(function(t,a){e.children.push({value:t,label:s[a]})}),105==t.deptId?a[0].children.push(e):110==t.deptId?a[1].children.push(e):153==t.deptId&&a[2].children.push(e)}),t.carSeriesList=a}})},tab:function(t){this.tabact=t},handleRemove:function(t,e){this.handerImg=""},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},headImgSuccess:function(t,e,a){this.handerImg=t.data.localPath},getCascaderObj:function(t,e){return t.map(function(t,a,i){var l=!0,o=!1,n=void 0;try{for(var r,c=s()(e);!(l=(r=c.next()).done);l=!0){var u=r.value;if(u.value==t)return e=u.children,u}}catch(t){o=!0,n=t}finally{try{!l&&c.return&&c.return()}finally{if(o)throw n}}return null})},getValue:function(t,e){return t.map(function(t,a,i){var l=!0,o=!1,n=void 0;try{for(var r,c=s()(e);!(l=(r=c.next()).done);l=!0){var u=r.value;if(u.label==t)return e=u.children,u.value}}catch(t){o=!0,n=t}finally{try{!l&&c.return&&c.return()}finally{if(o)throw n}}return null})},handleChangeCity:function(t,e){for(var a=this.getCascaderObj(t,this.optionsCity),i=[],s=0;s<a.length;s++)i.push(a[s].label);this.district=i,console.log(i)},handleChange:function(t){},addRelationList:function(){this.relationList.push({relationId:"",name:"",relation:"",birthday:"",work:""})},delRelationList:function(){this.relationList.length>1&&this.relationList.pop()},addHatchList:function(){this.hatchList.push({plat:"",platRole:"",nickname:"",url:""})},delHatchList:function(){this.hatchList.length>1&&this.hatchList.pop()},pactSuccess:function(t,e,a){var i=t.data;this.pactName=i.fileName,this.pactPath=i.localPath,this.pactsuffix=i.suffix},pactExceed:function(){this.messageWarning("合同文档允许上传一个！")},pactRemove:function(t,e){this.pactName="",this.pactPath="",this.pactsuffix=""},changeTimeLimit:function(t){var e=(t[1]-t[0])/1e3/60/60/24;this.duration=e},submit:function(){var t=this;this.loading=!0;var e=this.$date0(this.timeLimit[0]),a=this.$date0(this.timeLimit[1]),i=this.livelihood.toString(),s=this.livelihood0,l=i;s&&(l=i+","+s);var o=this.eventData.toString(),n=this.$date0(this.birthDate),r={deptId:"",vehicleOwnerId:this.vehicleOwnerId,image:this.handerImg,typeId:this.tabact,itemId:o,name:this.ownersName,sex:this.sex,carUse:l,work:this.work,sourceId:this.source,birthday:n,seriesId:this.carSeries[2],email:this.mail,skillId:this.speciality,phone:this.tel,homeAddress:this.address,wx:this.wx,qq:this.qq,relations:this.relationList,bbsId:this.carId,homeUrl:this.carHome,weiboId:this.microblog,dyId:this.tikTokId,otherId:this.socialId,plateNum:this.carNum,vinno:this.vin,buycarplace:this.branch,cooperates:[{fileName:this.pactName,localPath:this.pactPath,startTime:e,endTime:a,suffix:this.pactsuffix,timeLimit:this.duration}]},c=this.district;if(2==c.length?r.city=c[0]:3==c.length&&(r.province=c[0],r.city=c[1]),1==this.tabact)r.ownerCoops=this.eventList,r.ownerCoops.forEach(function(e){e.timeLimit=t.timeLimit});else{var u=[],d=this.eventData,v=this.hatchList;d.forEach(function(e){v.forEach(function(a){u.push({itemId:e,nickname:a.nickname,plat:a.plat,platRole:a.platRole,url:a.url,typeId:t.tabact})})}),r.ipGrows=u}var p=!0;[r.image,o,r.sex,r.sourceId,r.seriesId,r.email,r.cooperates[0].localPath,r.cooperates[0].timeLimit].forEach(function(t){t||(p=!1)}),this.submitFlag&&p?(this.submitFlag=!1,this.$axios.post("/ocarplay/api/vehicleOwner/saveOrUpdate",r).then(function(e){200==e.status&&0==e.data.errcode?(t.messageWin(e.data.msg),setTimeout(function(){t.$router.push({path:"/home/owners"})},1e3)):t.messageError(e.data.msg)}).catch(function(e){t.loading=!1,200!=e.status&&(t.submitFlag=!0,t.$message("网络错误"+e.status))})):p||(this.loading=!1,this.messageError("请检查信息是否完整！"))},messageWin:function(t){this.$message({message:t,type:"success"})},messageWarning:function(t){this.$message({message:t,type:"warning"})},messageError:function(t){this.$message.error(t)}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"addOwners"}},[a("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"content"},[a("el-scrollbar",{staticStyle:{height:"100%"}},[a("el-col",{staticClass:"title",attrs:{span:24}},[a("el-col",{staticClass:"previousBox",attrs:{span:6}},[a("div",{on:{click:t.previous}},[a("i",{staticClass:"el-icon-arrow-left"}),t._v("\n            返回\n          ")])]),t._v(" "),a("el-col",{attrs:{span:12}},[t._v("车主基础信息")])],1),t._v(" "),a("el-col",{staticClass:"upladImgBox",attrs:{span:24}},[a("el-upload",{staticClass:"upladImg",attrs:{action:"/ocarplay/file/upload","list-type":"picture-card","on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove,"on-success":t.headImgSuccess,limit:1,"file-list":t.fileList}},[a("i",{staticClass:"el-icon-plus"})]),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1),t._v(" "),a("el-col",{staticClass:"tab",attrs:{span:24}},[a("div",{staticClass:"butBox1"},[a("div",{class:[1==t.tabact?"but act":"but"],on:{click:function(e){return t.tab(1)}}},[t._v("支持型")]),t._v(" "),a("div",{class:[2==t.tabact?"but act":"but"],on:{click:function(e){return t.tab(2)}}},[t._v("拍摄型")]),t._v(" "),a("div",{class:[3==t.tabact?"but act":"but"],on:{click:function(e){return t.tab(3)}}},[t._v("资源型")])])]),t._v(" "),a("el-col",{staticClass:"information information1",attrs:{span:24}},[a("el-col",{staticClass:"left",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("合作事项")]),t._v(" "),a("div",{staticClass:"val"},[a("el-select",{attrs:{multiple:"",clearable:"",placeholder:"请选择"},on:{change:t.changeEvent},model:{value:t.eventData,callback:function(e){t.eventData=e},expression:"eventData"}},t._l(t.eventDataList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("车主性别")]),t._v(" "),a("div",{staticClass:"val"},[a("el-radio",{attrs:{label:"0"},model:{value:t.sex,callback:function(e){t.sex=e},expression:"sex"}},[a("i",{staticClass:"el-icon-male"})]),t._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:t.sex,callback:function(e){t.sex=e},expression:"sex"}},[a("i",{staticClass:"el-icon-female"})])],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车主职业")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.work,callback:function(e){t.work=e},expression:"work"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("出生日期")]),t._v(" "),a("div",{staticClass:"val"},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.birthDate,callback:function(e){t.birthDate=e},expression:"birthDate"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("所在区域")]),t._v(" "),a("div",{staticClass:"val"},[a("el-cascader",{ref:"cascaderAddr",attrs:{options:t.optionsCity,filterable:"",clearable:"",placeholder:"请选择所在区域"},on:{change:t.handleChangeCity},model:{value:t.district_code,callback:function(e){t.district_code=e},expression:"district_code"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("特长")]),t._v(" "),a("div",{staticClass:"val"},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.speciality,callback:function(e){t.speciality=e},expression:"speciality"}},t._l(t.ownerSkilList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)])],1),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("车主姓名")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.ownersName,callback:function(e){t.ownersName=e},expression:"ownersName"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("用车生活")]),t._v(" "),a("div",{staticClass:"val"},[a("el-col",{attrs:{span:18}},[a("el-checkbox-group",{staticClass:"livelihood",model:{value:t.livelihood,callback:function(e){t.livelihood=e},expression:"livelihood"}},[a("el-checkbox",{attrs:{label:"通勤"}}),t._v(" "),a("el-checkbox",{attrs:{label:"自驾游"}}),t._v(" "),a("el-checkbox",{attrs:{label:"越野"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.livelihood0,callback:function(e){t.livelihood0=e},expression:"livelihood0"}})],1)],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("车主来源")]),t._v(" "),a("div",{staticClass:"val"},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.source,callback:function(e){t.source=e},expression:"source"}},t._l(t.sourceList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("认证车型")]),t._v(" "),a("div",{staticClass:"val"},[a("el-cascader",{attrs:{options:t.carSeriesList,filterable:""},model:{value:t.carSeries,callback:function(e){t.carSeries=e},expression:"carSeries"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("车主邮箱")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.mail,callback:function(e){t.mail=e},expression:"mail"}})],1)])],1)],1),t._v(" "),a("el-col",{staticClass:"title",attrs:{span:24}},[a("el-col",{attrs:{span:24}},[t._v("车主详细信息")])],1),t._v(" "),a("el-col",{staticClass:"information information2",attrs:{span:24}},[a("el-col",{staticClass:"left",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("手机号")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.tel,callback:function(e){t.tel=e},expression:"tel"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("微信号")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.wx,callback:function(e){t.wx=e},expression:"wx"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("QQ号")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.qq,callback:function(e){t.qq=e},expression:"qq"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("汽车之家ID")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.carId,callback:function(e){t.carId=e},expression:"carId"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("汽车之家主页")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.carHome,callback:function(e){t.carHome=e},expression:"carHome"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("微博ID")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.microblog,callback:function(e){t.microblog=e},expression:"microblog"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("抖音ID")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.tikTokId,callback:function(e){t.tikTokId=e},expression:"tikTokId"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("其他社交ID")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.socialId,callback:function(e){t.socialId=e},expression:"socialId"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车牌号")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.carNum,callback:function(e){t.carNum=e},expression:"carNum"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("车架号")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.vin,callback:function(e){t.vin=e},expression:"vin"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("购车网点")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.branch,callback:function(e){t.branch=e},expression:"branch"}})],1)])],1),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("家庭住址")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("收货地址")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.deliAddress,callback:function(e){t.deliAddress=e},expression:"deliAddress"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key relation"},[t._v("家属信息")]),t._v(" "),a("div",{staticClass:"val"},t._l(t.relationList,function(e,i){return a("el-col",{key:i,staticClass:"relationList",attrs:{spam:24}},[a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"姓名"},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"item.name"}})],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-input",{attrs:{placeholder:"关系"},model:{value:e.relation,callback:function(a){t.$set(e,"relation",a)},expression:"item.relation"}})],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"出生日期"},model:{value:e.birthday,callback:function(a){t.$set(e,"birthday",a)},expression:"item.birthday"}})],1),t._v(" "),a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"职业"},model:{value:e.work,callback:function(a){t.$set(e,"work",a)},expression:"item.work"}})],1),t._v(" "),a("el-col",{attrs:{span:3}},[i==t.relationList.length-1?a("el-col",{attrs:{span:24}},[a("i",{staticClass:"el-icon-delete",on:{click:t.delRelationList}}),t._v(" "),a("i",{staticClass:"el-icon-circle-plus-outline",on:{click:t.addRelationList}})]):t._e()],1)],1)}),1)])],1)],1),t._v(" "),a("el-col",{staticClass:"title",attrs:{span:24}},[a("el-col",{attrs:{span:24}},[t._v("签约合作信息")])],1),t._v(" "),a("el-col",{staticClass:"information information3",attrs:{span:24}},[a("el-col",{staticClass:"left",attrs:{span:12}},[a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("签约合同")]),t._v(" "),a("div",{staticClass:"val"},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"/ocarplay/file/upload","on-success":t.pactSuccess,"on-remove":t.pactRemove,"on-exceed":t.pactExceed,limit:1,"file-list":t.pactFileList}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("合作期限")]),t._v(" "),a("div",{staticClass:"val"},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.changeTimeLimit},model:{value:t.timeLimit,callback:function(e){t.timeLimit=e},expression:"timeLimit"}})],1)]),t._v(" "),a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("合作时长")]),t._v(" "),a("div",{staticClass:"val"},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:"",disabled:!0},model:{value:t.duration,callback:function(e){t.duration=e},expression:"duration"}})],1)])],1),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:12}},[1==t.tabact?a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key imp"},[t._v("合作概况")]),t._v(" "),a("div",{staticClass:"val situation"},t._l(t.eventList,function(e,i){return a("el-col",{key:i,staticClass:"list",attrs:{span:21}},[a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"请输入",clearable:"",disabled:!0},model:{value:e.itemName,callback:function(a){t.$set(e,"itemName",a)},expression:"item.itemName"}})],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"固定合作总量",clearable:""},model:{value:e.coopNum,callback:function(a){t.$set(e,"coopNum",a)},expression:"item.coopNum"}})],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"固定合作总价",clearable:""},model:{value:e.coopMoney,callback:function(a){t.$set(e,"coopMoney",a)},expression:"item.coopMoney"}})],1),t._v(" "),a("el-col",{attrs:{span:5}},[a("el-select",{attrs:{clearable:"",placeholder:"结算周期"},model:{value:e.period,callback:function(a){t.$set(e,"period",a)},expression:"item.period"}},t._l(t.periodList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)],1)}),1)]):1!=t.tabact?a("el-col",{staticClass:"list",attrs:{span:24}},[a("div",{staticClass:"key"},[t._v("IP孵化打造")]),t._v(" "),a("div",{staticClass:"val hatch"},t._l(t.hatchList,function(e,i){return a("el-col",{key:i,staticClass:"list",attrs:{span:21}},[a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"平台",clearable:""},model:{value:e.plat,callback:function(a){t.$set(e,"plat",a)},expression:"item.plat"}})],1),t._v(" "),a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"人设",clearable:""},model:{value:e.platRole,callback:function(a){t.$set(e,"platRole",a)},expression:"item.platRole"}})],1),t._v(" "),a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"账号昵称",clearable:""},model:{value:e.nickname,callback:function(a){t.$set(e,"nickname",a)},expression:"item.nickname"}})],1),t._v(" "),a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"主页链接",clearable:""},model:{value:e.url,callback:function(a){t.$set(e,"url",a)},expression:"item.url"}})],1),t._v(" "),a("el-col",{attrs:{span:3}},[i==t.hatchList.length-1?a("el-col",{attrs:{span:24}},[a("i",{staticClass:"el-icon-delete",on:{click:t.delHatchList}}),t._v(" "),a("i",{staticClass:"el-icon-circle-plus-outline",on:{click:t.addHatchList}})]):t._e()],1)],1)}),1)]):t._e()],1)],1),t._v(" "),a("el-col",{staticClass:"put",attrs:{span:24}},[a("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("完成")])],1)],1)],1)],1)},staticRenderFns:[]};var h=a("VU/8")(v,p,!1,function(t){a("mNs6"),a("K+rd")},"data-v-cadd3164",null);e.default=h.exports},"5zde":function(t,e,a){a("zQR9"),a("qyJz"),t.exports=a("FeBl").Array.from},"7Doy":function(t,e,a){var i=a("EqjI"),s=a("7UMu"),l=a("dSzd")("species");t.exports=function(t){var e;return s(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!s(e.prototype)||(e=void 0),i(e)&&null===(e=e[l])&&(e=void 0)),void 0===e?Array:e}},"9Bbf":function(t,e,a){"use strict";var i=a("kM2E");t.exports=function(t){i(i.S,t,{of:function(){for(var t=arguments.length,e=new Array(t);t--;)e[t]=arguments[t];return new this(e)}})}},"9C8M":function(t,e,a){"use strict";var i=a("evD5").f,s=a("Yobk"),l=a("xH/j"),o=a("+ZMJ"),n=a("2KxR"),r=a("NWt+"),c=a("vIB/"),u=a("EGZi"),d=a("bRrM"),v=a("+E39"),p=a("06OY").fastKey,h=a("LIJb"),f=v?"_s":"size",m=function(t,e){var a,i=p(e);if("F"!==i)return t._i[i];for(a=t._f;a;a=a.n)if(a.k==e)return a};t.exports={getConstructor:function(t,e,a,c){var u=t(function(t,i){n(t,u,e,"_i"),t._t=e,t._i=s(null),t._f=void 0,t._l=void 0,t[f]=0,void 0!=i&&r(i,a,t[c],t)});return l(u.prototype,{clear:function(){for(var t=h(this,e),a=t._i,i=t._f;i;i=i.n)i.r=!0,i.p&&(i.p=i.p.n=void 0),delete a[i.i];t._f=t._l=void 0,t[f]=0},delete:function(t){var a=h(this,e),i=m(a,t);if(i){var s=i.n,l=i.p;delete a._i[i.i],i.r=!0,l&&(l.n=s),s&&(s.p=l),a._f==i&&(a._f=s),a._l==i&&(a._l=l),a[f]--}return!!i},forEach:function(t){h(this,e);for(var a,i=o(t,arguments.length>1?arguments[1]:void 0,3);a=a?a.n:this._f;)for(i(a.v,a.k,this);a&&a.r;)a=a.p},has:function(t){return!!m(h(this,e),t)}}),v&&i(u.prototype,"size",{get:function(){return h(this,e)[f]}}),u},def:function(t,e,a){var i,s,l=m(t,e);return l?l.v=a:(t._l=l={i:s=p(e,!0),k:e,v:a,p:i=t._l,n:void 0,r:!1},t._f||(t._f=l),i&&(i.n=l),t[f]++,"F"!==s&&(t._i[s]=l)),t},getEntry:m,setStrong:function(t,e,a){c(t,e,function(t,a){this._t=h(t,e),this._k=a,this._l=void 0},function(){for(var t=this._k,e=this._l;e&&e.r;)e=e.p;return this._t&&(this._l=e=e?e.n:this._t._f)?u(0,"keys"==t?e.k:"values"==t?e.v:[e.k,e.v]):(this._t=void 0,u(1))},a?"entries":"values",!a,!0),d(e)}}},ALrJ:function(t,e,a){var i=a("+ZMJ"),s=a("MU5D"),l=a("sB3e"),o=a("QRG4"),n=a("oeOm");t.exports=function(t,e){var a=1==t,r=2==t,c=3==t,u=4==t,d=6==t,v=5==t||d,p=e||n;return function(e,n,h){for(var f,m,b=l(e),_=s(b),k=i(n,h,3),y=o(_.length),C=0,g=a?p(e,y):r?p(e,0):void 0;y>C;C++)if((v||C in _)&&(m=k(f=_[C],C,b),t))if(a)g[C]=m;else if(m)switch(t){case 3:return!0;case 5:return f;case 6:return C;case 2:g.push(f)}else if(u)return!1;return d?-1:c||u?u:g}}},BDhv:function(t,e,a){var i=a("kM2E");i(i.P+i.R,"Set",{toJSON:a("m9gC")("Set")})},HpRW:function(t,e,a){"use strict";var i=a("kM2E"),s=a("lOnJ"),l=a("+ZMJ"),o=a("NWt+");t.exports=function(t){i(i.S,t,{from:function(t){var e,a,i,n,r=arguments[1];return s(this),(e=void 0!==r)&&s(r),void 0==t?new this:(a=[],e?(i=0,n=l(r,arguments[2],2),o(t,!1,function(t){a.push(n(t,i++))})):o(t,!1,a.push,a),new this(a))}})}},"K+rd":function(t,e){},LIJb:function(t,e,a){var i=a("EqjI");t.exports=function(t,e){if(!i(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},"c/Tr":function(t,e,a){t.exports={default:a("5zde"),__esModule:!0}},fBQ2:function(t,e,a){"use strict";var i=a("evD5"),s=a("X8DO");t.exports=function(t,e,a){e in t?i.f(t,e,s(0,a)):t[e]=a}},ioQ5:function(t,e,a){a("HpRW")("Set")},lHA8:function(t,e,a){t.exports={default:a("pPW7"),__esModule:!0}},m9gC:function(t,e,a){var i=a("RY/4"),s=a("4WTo");t.exports=function(t){return function(){if(i(this)!=t)throw TypeError(t+"#toJSON isn't generic");return s(this)}}},mNs6:function(t,e){},oNmr:function(t,e,a){a("9Bbf")("Set")},oeOm:function(t,e,a){var i=a("7Doy");t.exports=function(t,e){return new(i(t))(e)}},pPW7:function(t,e,a){a("M6a0"),a("zQR9"),a("+tPU"),a("ttyz"),a("BDhv"),a("oNmr"),a("ioQ5"),t.exports=a("FeBl").Set},qo66:function(t,e,a){"use strict";var i=a("7KvD"),s=a("kM2E"),l=a("06OY"),o=a("S82l"),n=a("hJx8"),r=a("xH/j"),c=a("NWt+"),u=a("2KxR"),d=a("EqjI"),v=a("e6n0"),p=a("evD5").f,h=a("ALrJ")(0),f=a("+E39");t.exports=function(t,e,a,m,b,_){var k=i[t],y=k,C=b?"set":"add",g=y&&y.prototype,x={};return f&&"function"==typeof y&&(_||g.forEach&&!o(function(){(new y).entries().next()}))?(y=e(function(e,a){u(e,y,t,"_c"),e._c=new k,void 0!=a&&c(a,b,e[C],e)}),h("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(t){var e="add"==t||"set"==t;t in g&&(!_||"clear"!=t)&&n(y.prototype,t,function(a,i){if(u(this,y,t),!e&&_&&!d(a))return"get"==t&&void 0;var s=this._c[t](0===a?0:a,i);return e?this:s})}),_||p(y.prototype,"size",{get:function(){return this._c.size}})):(y=m.getConstructor(e,t,b,C),r(y.prototype,a),l.NEED=!0),v(y,t),x[t]=y,s(s.G+s.W+s.F,x),_||m.setStrong(y,t,b),y}},qyJz:function(t,e,a){"use strict";var i=a("+ZMJ"),s=a("kM2E"),l=a("sB3e"),o=a("msXi"),n=a("Mhyx"),r=a("QRG4"),c=a("fBQ2"),u=a("3fs2");s(s.S+s.F*!a("dY0y")(function(t){Array.from(t)}),"Array",{from:function(t){var e,a,s,d,v=l(t),p="function"==typeof this?this:Array,h=arguments.length,f=h>1?arguments[1]:void 0,m=void 0!==f,b=0,_=u(v);if(m&&(f=i(f,h>2?arguments[2]:void 0,2)),void 0==_||p==Array&&n(_))for(a=new p(e=r(v.length));e>b;b++)c(a,b,m?f(v[b],b):v[b]);else for(d=_.call(v),a=new p;!(s=d.next()).done;b++)c(a,b,m?o(d,f,[s.value,b],!0):s.value);return a.length=b,a}})},ttyz:function(t,e,a){"use strict";var i=a("9C8M"),s=a("LIJb");t.exports=a("qo66")("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return i.def(s(this,"Set"),t=0===t?0:t,t)}},i)}});