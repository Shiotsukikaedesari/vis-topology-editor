(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-593ca638"],{"1b9b":function(t,e,i){"use strict";i("27af")},"27af":function(t,e,i){},"2a628":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"left-part"},[t._m(0),i("el-tooltip",{attrs:{effect:"dark",content:"新建",placement:"bottom"}},[i("el-button",{attrs:{size:"small",icon:"el-icon-folder-add",circle:""},on:{click:function(e){t.addNewVisiable=!0}}})],1),i("el-dialog",{attrs:{title:"画布尺寸",visible:t.addNewVisiable,width:"420px"},on:{"update:visible":function(e){t.addNewVisiable=e}}},[i("el-form",{attrs:{"label-width":"110px","label-position":"left"}},[i("el-form-item",{attrs:{label:"宽度 : 高度(px):"}},[i("el-input-number",{attrs:{size:"mini",controls:!1,precision:0},model:{value:t.stageSize.width,callback:function(e){t.$set(t.stageSize,"width",e)},expression:"stageSize.width"}}),t._v(" x "),i("el-input-number",{attrs:{size:"mini",controls:!1,precision:0},model:{value:t.stageSize.height,callback:function(e){t.$set(t.stageSize,"height",e)},expression:"stageSize.height"}})],1)],1),i("span",{staticStyle:{color:"red"}},[t._v("注意：新建之前请保存好上一份数据！")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addNewVisiable=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.addNew}},[t._v("确 定")])],1)],1)],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"logo"},[i("img",{attrs:{src:"logo.png",alt:""}})])}],o={data:function(){return{addNewVisiable:!1,stageSize:{width:827,height:1169}}},methods:{addNew:function(){this.$store.commit("stage/setSize",this.stageSize),this.$store.commit("structure/clearNodes"),this.$store.commit("structure/clearLines"),this.addNewVisiable=!1,this.stageSize={width:827,height:1169}}}},l=o,n=(i("1b9b"),i("2877")),c=Object(n["a"])(l,s,a,!1,null,"52748854",null);e["default"]=c.exports}}]);