(function(t){function e(e){for(var r,s,a=e[0],c=e[1],u=e[2],l=0,f=[];l<a.length;l++)s=a[l],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&f.push(o[s][0]),o[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={app:0},i=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="vis-topology-editor/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0275":function(t,e,n){var r={"./circleShape.vue":"1aa7","./rectShape.vue":"bbbc"};function o(t){var e=i(t);return n(e)}function i(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}o.keys=function(){return Object.keys(r)},o.resolve=i,t.exports=o,o.id="0275"},"0345":function(t,e,n){},"0865":function(t,e,n){"use strict";n("7461")},1525:function(t,e,n){},"1aa7":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",[n("circle",{style:t.cssStyle,attrs:{r:t.r,transform:"translate("+t.size.width/2+", "+t.size.height/2+")"}}),t.cssStyle.backgroundImage?n("image",{attrs:{width:t.size.width,height:t.size.height,href:t.cssStyle.backgroundImage}}):t._e()])},o=[],i={props:{size:{type:Object,required:!0},cssStyle:{type:Object,default:function(){return{fill:"red",stroke:"black",strokeWidth:2,backgroundImage:""}}}},computed:{r:function(){return Math.min(this.size.width,this.size.height)/2}}},s=i,a=n("2877"),c=Object(a["a"])(s,r,o,!1,null,"58e738ff",null);e["default"]=c.exports},"1bca":function(t,e,n){"use strict";n("1525")},2142:function(t,e,n){var r={"./single.vue":"a263","./square.vue":"b618"};function o(t){var e=i(t);return n(e)}function i(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}o.keys=function(){return Object.keys(r)},o.resolve=i,t.exports=o,o.id="2142"},2395:function(t,e,n){},"2b9a":function(t,e,n){"use strict";n("f795")},"4e52":function(t,e,n){},"50de":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("foreignObject",{attrs:{width:t.size.width,height:t.size.height}},[n("div",{staticClass:"from-box"},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.edit,expression:"!edit"}],staticClass:"mask",on:{dblclick:function(){t.edit=!0}}}),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.configure.value,expression:"configure.value"}],style:t.cssStyle,attrs:{placeholder:t.configure.placeholder},domProps:{value:t.configure.value},on:{blur:function(){t.edit=!1},input:function(e){e.target.composing||t.$set(t.configure,"value",e.target.value)}}})])])},o=[],i={props:{size:{type:Object,required:!0},configure:{type:Object,default:function(){return{value:"",placeholder:"请输入文字"}}},cssStyle:{type:Object,default:function(){return{width:"100%",height:"100%",border:"0",color:"black",fontSize:"12px",padding:"0"}}}},data:function(){return{edit:!1}}},s=i,a=(n("52f1"),n("2877")),c=Object(a["a"])(s,r,o,!1,null,"4b2b5029",null);e["default"]=c.exports},"52f1":function(t,e,n){"use strict";n("0345")},5364:function(t,e,n){},"551c":function(t,e,n){var r={"./brokenLine.vue":"c32d","./linear.vue":"fe1e"};function o(t){var e=i(t);return n(e)}function i(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}o.keys=function(){return Object.keys(r)},o.resolve=i,t.exports=o,o.id="551c"},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=n("5c96"),i=n.n(o),s=(n("0fae"),n("5364"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"top-nav"}),n("div",{staticClass:"container-main"},[n("div",{staticClass:"object-part"},[n("object-view")],1),n("div",{staticClass:"canvas-part"},[n("canvas-view")],1),n("div",{staticClass:"function-part"},[n("function-view")],1)])])}),a=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container",staticClass:"canvasView-container"},[n("svg",{ref:"svgCanvas",staticClass:"svg-container",attrs:{width:t.width,height:t.height},on:{mousemove:t.mousemove}},[t._l(t.lines,(function(e){return n(e.component,t._b({key:e.id,tag:"component"},"component",e,!1))})),t._l(t.nodes,(function(e){return n(e.component,t._b({key:e.id,ref:"node",refInFor:!0,tag:"compnent"},"compnent",e,!1))})),t.dev?n("transfrom-controls",{ref:"transformControls",attrs:{show:t.transformControls.show,target:t.transformControls}}):t._e(),t.dev?n("selection-box"):t._e()],2),t.dev?n("svg",{staticClass:"svg-helper",attrs:{width:t.width,height:t.height}}):t._e()])},u=[],d=n("5530"),l=(n("d3b7"),n("159b"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("rect",{style:t.svgStyle,attrs:{width:t.end.x-t.start.x,height:t.end.y-t.start.y,transform:"translate("+t.start.x+", "+t.start.y+")"}})}),f=[],h=(n("6062"),n("3ca3"),n("ddb0"),{props:{selection:{type:Object,default:function(){}},start:{type:Object,default:function(){return{x:0,y:0}}},end:{type:Object,default:function(){return{x:0,y:0}}}},data:function(){return{intersection:new Set,svgStyle:{fill:"rgba(0, 0, 200, 0.2)",strokeWidth:1,stroke:"blue"}}},methods:{getIntersection:function(){return this.intersection},intersectObject:function(){}}}),p=h,m=n("2877"),g=Object(m["a"])(p,l,f,!1,null,"59bcb76b",null),y=g.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[n("rect",{style:t.maskStyle,attrs:{width:t.target.size.width,height:t.target.size.height,transform:"translate("+t.position.x+", "+t.position.y+")"},on:{mousedown:t.MaskHandler}}),n("rect",{staticStyle:{cursor:"nw-resize"},style:t.scaleNode.style,attrs:{width:t.scaleNode.width,height:t.scaleNode.height,transform:"translate("+t.leftTop.x+", "+t.leftTop.y+")"}}),n("rect",{staticStyle:{cursor:"ne-resize"},style:t.scaleNode.style,attrs:{width:t.scaleNode.width,height:t.scaleNode.height,transform:"translate("+t.rightBottom.x+", "+t.leftTop.y+")"}}),n("rect",{staticStyle:{cursor:"se-resize"},style:t.scaleNode.style,attrs:{width:t.scaleNode.width,height:t.scaleNode.height,transform:"translate("+t.rightBottom.x+", "+t.rightBottom.y+")"}}),n("rect",{staticStyle:{cursor:"sw-resize"},style:t.scaleNode.style,attrs:{width:t.scaleNode.width,height:t.scaleNode.height,transform:"translate("+t.leftTop.x+", "+t.rightBottom.y+")"}})])},b=[],w=(n("18a5"),{props:{show:{type:Boolean,default:!0},target:{type:Object,default:function(){return{translate:{x:50,y:50},scale:{x:1,y:1},rotate:0,anchor:{x:25,y:25},size:{width:50,height:50}}}}},data:function(){return{scaleNode:{width:10,height:10,style:{stroke:"black",strokeWidth:1,fill:"white"}},maskStyle:{stroke:"#1584FC",strokeWidth:2,fill:"transparent",cursor:"move"},dragging:!1,changed:!1}},computed:{position:function(){return{x:this.target.translate.x-this.target.anchor.x,y:this.target.translate.y-this.target.anchor.y}},halfScaleNodeSize:function(){return{width:this.scaleNode.width/2,height:this.scaleNode.height/2}},leftTop:function(){return{x:this.position.x-this.halfScaleNodeSize.width,y:this.position.y-this.halfScaleNodeSize.height}},rightBottom:function(){return{x:this.position.x-this.halfScaleNodeSize.width+this.target.size.width,y:this.position.y-this.halfScaleNodeSize.height+this.target.size.height}},canvas:function(){return this.$store.getters["canvas/canvas"]}},methods:{MaskHandler:function(){var t=this;this.dragging=!0,this.changed=!0;var e=function(e){t.target.translate.x=e.offsetX,t.target.translate.y=e.offsetY},n=function(){t.dragging=!1,t.canvas.removeEventListener("mousemove",e),document.body.removeEventListener("mouseup",e)};this.canvas.addEventListener("mousemove",e),document.body.addEventListener("mouseup",n)}}}),k=w,x=Object(m["a"])(k,v,b,!1,null,"c3fbeeda",null),O=x.exports,S=(n("b0c0"),n("d81d"),n("7ce2")),j=n.n(S),_=(n("ac1f"),n("5319"),n("2142")),z={};_.keys().forEach((function(t){z[t.replace(/.\/|\.vue$/g,"")]=_(t).default}));var $=n("0275"),N={};$.keys().forEach((function(t){N[t.replace(/.\/|\.vue$/g,"")]=$(t).default}));var E={node:{size:{width:50,height:50},anchor:{x:25,y:25},configure:{connector:{hover:!0}}},widget:{component:"",props:""},shape:{props:{cssStyle:{fill:"#3875E8",stroke:"black",strokeWidth:2,backgroundImage:""}}},line:{component:"svgline",props:{fill:"white",stroke:"black",strokeWidth:2,cursor:"pointer"}},connector:{component:"single",props:{configure:{r:5,offset:{x:.5,y:.5}},cssStyle:{fill:"white",stroke:"blue",strokeWidth:1,cursor:"crosshair"}}}},P=[{name:"basicRect",label:"基础矩形",shape:{component:"rectShape"}},{name:"basicCircle",label:"基础圆形",shape:{component:"circleShape"}}],L={name:"basicShape",label:"基础控件",desp:"形状与单节点",inventory:P.map((function(t){return j()(t,E)}))},C={node:{size:{width:70,height:50},anchor:{x:35,y:25},configure:{connector:{hover:!1}}},widget:{component:"textArea",props:""},shape:{props:{cssStyle:{fill:"transparent",stroke:"black",strokeWidth:4,backgroundImage:""}}},line:{component:"svgline",props:{fill:"white",stroke:"black",strokeWidth:2,cursor:"pointer"}},connector:{component:"square",props:{configure:{r:5,offset:{x:0,y:0}},cssStyle:{fill:"white",stroke:"green",strokeWidth:1,cursor:"crosshair"}}}},W=[{name:"squareRect",label:"四方矩形",shape:{component:"rectShape"}},{name:"squareCircle",label:"四方圆形",shape:{component:"circleShape"}}],M={name:"squareText",label:"四方表单控件",desp:"形状表单与四方节点",inventory:W.map((function(t){return j()(t,C)}))},q=n("b256"),T={};q.keys().forEach((function(t){T[t.replace(/.\/|\.vue$/g,"")]=q(t).default}));var D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{class:{"connector-hover":t.configure.connector.hover},attrs:{tabindex:"0",width:t.size.width,height:t.size.height,transform:"translate("+t.position.x+", "+t.position.y+")rotate("+t.rotate+", "+t.anchor.x+" "+t.anchor.y+")"}},[n(t.framework.shape,t._b({tag:"component",attrs:{size:t.size}},"component",t.shape,!1)),n(t.framework.widget,t._b({tag:"component",attrs:{size:t.size}},"component",t.widget,!1)),n(t.framework.connector,t._b({ref:"connector",tag:"component",class:{"connector-transparent":t.configure.connector.hover},attrs:{node:t.id,position:t.position,anchor:t.anchor,size:t.size}},"component",t.connector,!1))],1)},F=[],I=(n("a9e3"),{props:{id:{type:String,default:""},use:{type:String,default:"work"}}}),B={props:{translate:{type:Object,default:function(){return{x:0,y:0}}},rotate:{type:Number,default:0},anchor:{type:Object,default:function(){return{x:25,y:25}}},size:{type:Object,default:function(){return{width:50,height:50}}}}},H={data:function(){return{$dragging:!1,$devWatcher:null}},computed:{$dev:function(){return"dev"===this.$store.getters.mode}},mounted:function(){var t=this;if("work"===this.use){var e=function(t){t.stopPropagation()},n=function(t){t.stopPropagation()},r=function(e){e.stopPropagation(),t.$store.commit("active/setNode",t.id),t.$store.commit("controls/transformNode",t.id)},o=function(e){console.log(e),46===e.keyCode&&(t.$store.commit("structure/deleteNode",t.id),t.$store.commit("controls/resetTransform"))},i=this.$el;this.$devWatcher=this.$watch("$dev",(function(t){t?(i.addEventListener("mouseenter",e),i.addEventListener("mouseleave",n),i.addEventListener("click",r),i.addEventListener("keyup",o)):(i.removeEventListener("mouseenter",e),i.removeEventListener("mouseleave",n),i.removeEventListener("click",r),i.removeEventListener("keyup",o))}),{immediate:!0})}},beforeDestroy:function(){this.$devWatcher()}},U={mixins:[I,B,H],components:Object(d["a"])(Object(d["a"])(Object(d["a"])({},N),z),T),props:{framework:{type:Object},translate:{type:Object,default:function(){return{x:0,y:0}}},rotate:{type:Number,default:0},anchor:{type:Object,default:function(){return{x:25,y:25}}},size:{type:Object,default:function(){return{width:50,height:50}}},configure:{type:Object,default:function(){return{connector:{hover:!0}}}},widget:{type:Object},shape:{type:Object},connector:{type:Object},line:{type:Object,default:function(){return{component:"svgline",fill:"white",stroke:"black",strokeWidth:2,cursor:"pointer"}}}},data:function(){return{interface:{}}},computed:{position:function(){return{x:this.translate.x-this.anchor.x,y:this.translate.y-this.anchor.y}}}},V=U,J=(n("626d"),Object(m["a"])(V,D,F,!1,null,"5f12dc8e",null)),X=J.exports,Y=(n("b64b"),n("1276"),function(t){var e={},n=function(t){Object.keys(t).forEach((function(n){t[n].default&&(e[n]="function"===typeof t[n].default?t[n].default():t[n].default)}))};if(t.mixins&&t.mixins.length&&t.mixins.forEach((function(t){t.props&&n(t.props)})),t.props&&n(t.props),t.name)e.component=t.name;else{var r=t.__file;e.component=r.split("/").pop().split(".").shift()}return e}),A=function(t){var e=j()(Y(X),t.node);return e.framework={},e.framework.connector=t.connector.component,t.connector.component&&(e.connector=j()(Y(z[t.connector.component]),t.connector.props)),e.framework.widget=t.widget.component,t.widget.component&&(e.widget=j()(Y(T[t.widget.component]),t.widget.props)),e.framework.shape=t.shape.component,t.shape.component&&(e.shape=j()(Y(N[t.shape.component]),t.shape.props)),e.name=t.name,e.label=t.label,e},R=function(t){return{name:t.name,label:t.label,desp:t.desp,structure:t.inventory.map((function(t){return A(t)}))}},G=[R(L),R(M)];console.log(G);var K={node:X},Q=n("551c"),Z={};Q.keys().forEach((function(t){Z[t.replace(/.\/|\.vue$/g,"")]=Q(t).default}));var tt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("marker",{attrs:{id:t.id+"arrow",markerWidth:t.configure.size.width,markerHeight:t.configure.size.height,viewBox:"0 0 "+t.configure.size.width+" "+t.configure.size.height,refX:t.configure.ref.x,refY:t.configure.ref.y,orient:"auto"}},[n("path",{style:t.cssStyle,attrs:{d:"M2,2 L10,6 L2,10 L6,6 L2,2"}})])},et=[],nt={props:{id:{type:String,required:!0},configure:{type:Object,default:function(){return{r:5,size:{width:12,height:12},ref:{x:30,y:6}}}},cssStyle:{type:Object,default:function(){return{fill:"#26FFC6",stroke:"",strokeWidth:1,cursor:"crosshair"}}}}},rt=nt,ot=Object(m["a"])(rt,tt,et,!1,null,"b7a1da8e",null),it=ot.exports,st=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("marker",{attrs:{id:t.id+"textWidget",markerWidth:t.configure.size.width,markerHeight:t.configure.size.height,markerUnits:"userSpaceOnUse",viewBox:-t.configure.size.width/2+" "+-t.configure.size.height/2+" "+t.configure.size.width+" "+t.configure.size.height,refX:t.configure.ref.x,refY:t.configure.ref.y,orient:"0"}},[n("rect",{style:t.shapeStyle,attrs:{width:t.configure.size.width,height:t.configure.size.height,transform:"translate("+-t.configure.size.width/2+", "+-t.configure.size.height/2+")"}}),n("text",{style:t.textStyle,attrs:{x:-t.configure.textLength/2,y:parseInt(t.cssStyle.fontSize)/2,"font-size":t.cssStyle.fontSize,textLength:t.configure.textLength}},[t._v(t._s(t.configure.value))])])},at=[],ct=(n("cb29"),{props:{id:{type:String,required:!0},configure:{type:Object,default:function(){return{size:{width:54,height:18},ref:{x:0,y:0},value:"一段文本",textLength:50}}},cssStyle:{type:Object,default:function(){return{color:"white",fontSize:"14px",fill:"#0FECB6",stroke:"black",strokeWidth:0,padding:2}}}},computed:{textStyle:function(){var t=this.cssStyle;return{fill:t.color,fontSize:t.fontSize}},shapeStyle:function(){var t=this.cssStyle;return{fill:t.fill,stroke:t.stroke,strokeWidth:t.strokeWidth}}}}),ut=ct,dt=Object(m["a"])(ut,st,at,!1,null,"cf8e5ac0",null),lt=dt.exports,ft={arrow:it,textWidget:lt},ht=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",[n("circle",{staticClass:"connectLine",style:t.point.style,attrs:{r:t.point.r,transform:"translate("+t.startNode.x+", "+t.startNode.y+")"}}),n("defs",[n(t.framework.markerStart,t._b({tag:"component",attrs:{id:t.id}},"component",t.markerStart,!1)),n(t.framework.markerMid,t._b({tag:"component",attrs:{id:t.id}},"component",t.markerMid,!1)),n(t.framework.markerEnd,t._b({tag:"component",attrs:{id:t.id}},"component",t.markerEnd,!1))],1),n(t.framework.shape,t._b({tag:"component",attrs:{markerStart:""+t.id+t.framework.markerStart,markerMid:""+t.id+t.framework.markerMid,markerEnd:""+t.id+t.framework.markerEnd,startPoint:t.startPoint,endPoint:t.endPoint,startNode:t.start.node,endNode:t.end.node}},"component",t.shape,!1)),n("circle",{staticClass:"connectLine",style:t.point.style,attrs:{r:t.point.r,transform:"translate("+t.endNode.x+", "+t.endNode.y+")"}})],1)},pt=[],mt={props:{start:{type:Object,default:{node:"",interface:"",position:{x:0,y:0}}},end:{type:Object,default:{node:"",interface:"",position:{x:0,y:0}}},cssStyle:{type:Object,default:function(){return{fill:"red",stroke:"blue",strokeWidth:2}}}}},gt={mixins:[I,mt,H],components:Object(d["a"])(Object(d["a"])({},Z),ft),props:{framework:{type:Object,default:function(){return{shape:"linear",markerStart:"",markerMid:"textWidget",markerEnd:"arrow"}}},shape:{type:Object,required:!0},markerStart:{type:Object},markerMid:{type:Object},markerEnd:{type:Object}},data:function(){return{point:{r:10,style:{fill:"transparent",stroke:"green",strokeWidth:1}},startPoint:{x:0,y:0},endPoint:{x:0,y:0}}},computed:{startNode:function(){var t=this.$store.getters["component/getNode"](this.start.node);return t&&t.$refs.connector[this.start.interface]?t.$refs.connector[this.start.interface]:this.start.position},endNode:function(){var t=this.$store.getters["component/getNode"](this.end.node);return t&&t.$refs.connector[this.end.interface]?t.$refs.connector[this.end.interface]:this.end.position}},watch:{startNode:{handler:function(t,e){t!==e&&(t!==this.start.position&&(this.start.position.x=t.x,this.start.position.y=t.y),this.startPoint=t)},immediate:!0},endNode:{handler:function(t,e){t!==e&&(t!==this.end.position&&(this.end.position.x=t.x,this.end.position.y=t.y),this.endPoint=t)},immediate:!0}},methods:{mouseenter:function(){console.log(this.id)}},mounted:function(){}},yt=gt,vt=(n("1bca"),Object(m["a"])(yt,ht,pt,!1,null,"420efbb5",null)),bt=vt.exports,wt=function(t){var e=Object(d["a"])({},Y(bt));return t.shape&&(e.shape=Y(Z[t.shape])),t.markerStart&&(e.markerStart=Y(ft[t.markerStart])),t.markerMid&&(e.markerMid=Y(ft[t.markerMid])),t.markerEnd&&(e.markerEnd=Y(ft[t.markerEnd])),e.framework=Object(d["a"])({},t),e},kt={basic:{shape:"linear",markerStart:"",markerMid:"textWidget",markerEnd:"arrow"}},xt=[wt(kt.basic)];console.log(xt);var Ot={connectLine:bt},St={components:Object(d["a"])(Object(d["a"])({selectionBox:y,transfromControls:O},K),Ot),data:function(){return{width:0,height:0}},computed:{dev:function(){return"dev"===this.$store.getters.mode},nodes:function(){return this.$store.getters["structure/nodes"]},connectors:function(){return this.$store.getters["structure/connectors"]},lines:function(){return this.$store.getters["structure/lines"]},transformControls:function(){return this.$store.getters["controls/transform"]}},watch:{"$store.state.structure.nodes":function(t){var e=this;t&&this.$nextTick((function(){var t={},n=e.$refs.node;n.forEach((function(e){t[e.id]=e})),e.$store.commit("component/cacheNodes",t)}))}},methods:{mousemove:function(t){this.$store.commit("canvas/setPointer",{x:t.offsetX,y:t.offsetY})}},mounted:function(){var t=this,e=this.$refs.container;this.width=e.offsetWidth,this.height=e.offsetHeight;var n=this.$refs.svgCanvas;n.addEventListener("click",(function(){if(t.$refs.transformControls.changed)return t.$refs.transformControls.changed=!1,!1;t.$store.commit("controls/resetTransform"),t.$store.commit("active/clearNode")})),this.$store.commit("canvas/setCanvas",n)}},jt=St,_t=(n("2b9a"),Object(m["a"])(jt,c,u,!1,null,"14d67cc8",null)),zt=_t.exports,$t=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"objectView-container"},[n("el-collapse",{model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.themeMenu,(function(e){return n("el-collapse-item",{key:e.name,attrs:{title:e.label,name:e.name}},t._l(e.structure,(function(e){return n("node-display-window",{key:e.name,attrs:{width:t.windowWidth,height:t.windowHeight,structure:e}})})),1)})),1)],1)},Nt=[],Et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"display-window-container",style:{width:t.width+"px",height:t.height+"px"},on:{mousedown:function(e){return t.dragStart(t.structure)}}},[n("svg",{staticStyle:{"pointer-events":"none"},attrs:{width:t.width,height:t.height}},[n(t.structure.component,t._b({tag:"component",attrs:{use:"display",translate:t.displayPosition}},"component",t.structure,!1))],1)])},Pt=[],Lt=(n("e9c4"),n("ec26")),Ct={components:Object(d["a"])({},K),props:{width:{type:Number,default:50},height:{type:Number,default:50},structure:{type:Object}},computed:{displayPosition:function(){return{x:this.width/2,y:this.height/2}},canvasPointer:function(){return this.$store.getters["canvas/pointer"]}},methods:{dragStart:function(t){var e=this,n=r["default"].observable(JSON.parse(JSON.stringify(t)));console.log(n),n.id=Object(Lt["a"])(),n.translate.x=-100,n.translate.y=-100;var o=this.$store.getters["canvas/canvas"],i=function(){e.$store.commit("structure/addNode",n),e.$store.commit("active/setNode",n.id),e.$store.commit("controls/transformNode",n.id)},s=function(){n.translate.x=e.canvasPointer.x,n.translate.y=e.canvasPointer.y},a=function t(){o.removeEventListener("mouseenter",i),o.removeEventListener("mousemove",s),document.body.removeEventListener("mouseup",t)};o.addEventListener("mouseenter",i),o.addEventListener("mousemove",s),document.body.addEventListener("mouseup",a)}}},Wt=Ct,Mt=(n("cc1a"),Object(m["a"])(Wt,Et,Pt,!1,null,"6924947f",null)),qt=Mt.exports,Tt={components:{nodeDisplayWindow:qt},data:function(){var t=G.map((function(t){return t.name}));return{active:t,windowWidth:100,windowHeight:80,themeMenu:G}},methods:{}},Dt=Tt,Ft=(n("8894"),Object(m["a"])(Dt,$t,Nt,!1,null,"78e831d3",null)),It=Ft.exports,Bt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"functionView-container"})},Ht=[],Ut={components:{},data:function(){return{active:["connector"],windowWidth:100,windowHeight:80}},computed:{avtiveNode:function(){return this.$store.getters["active/node"]}},methods:{}},Vt=Ut,Jt=(n("0865"),Object(m["a"])(Vt,Bt,Ht,!1,null,"eddbbba4",null)),Xt=Jt.exports,Yt={components:{canvasView:zt,objectView:It,functionView:Xt},data:function(){return{key:""}}},At=Yt,Rt=(n("7c55"),Object(m["a"])(At,s,a,!1,null,null,null)),Gt=Rt.exports,Kt=n("2f62"),Qt={namespaced:!0,state:{nodes:{},lines:{},cacheLine:{start:"",end:""}},getters:{nodes:function(t){return t.nodes},lines:function(t){return t.lines},getNode:function(t){return function(e){return t.nodes[e]}},getCacheLine:function(t){return t.cacheLine}},mutations:{addNode:function(t,e){t.nodes[e.id]=r["default"].observable(e),t.nodes.__ob__.dep.notify(),console.log(t.nodes)},deleteNode:function(t,e){r["default"].delete(t.nodes,e)},addLine:function(t,e){t.lines[e.id]=r["default"].observable(e),t.lines.__ob__.dep.notify()},generateLine:function(t){if(t.cacheLine.start.node!==t.cacheLine.end.node){var e=Object.assign({},xt[0]);e.start=Object(d["a"])({},t.cacheLine.start),e.end=Object(d["a"])({},t.cacheLine.end),e.id=Object(Lt["a"])(),this.commit("structure/addLine",e)}}},actions:{}},Zt={namespaced:!0,state:{pointer:{x:0,y:0},canvas:null},getters:{pointer:function(t){return t.pointer},canvas:function(t){return t.canvas}},mutations:{setPointer:function(t,e){t.pointer=e},setCanvas:function(t,e){t.canvas=e}},actions:{}},te={namespaced:!0,state:{node:"",line:""},getters:{node:function(t){return t.node}},mutations:{setNode:function(t,e){var n=this.getters["structure/getNode"](e);t.node=n},clearNode:function(t){t.node="",t.connector=""}},actions:{}},ee={namespaced:!0,state:{transform:{show:!1,translate:{x:50,y:50},scale:{x:1,y:1},rotate:0,anchor:{x:25,y:25},size:{width:50,height:50}}},getters:{transform:function(t){return t.transform}},mutations:{setTransform:function(t,e){var n=e.key,r=e.value;void 0!==t.transform[n]&&(t.transform[n]=r)},transformNode:function(t,e){var n=this.getters["structure/getNode"](e);t.transform.translate=n.translate,t.transform.scale=n.scale,t.transform.rotate=n.rotate,t.transform.anchor=n.anchor,t.transform.size=n.size,t.transform.show=!0},resetTransform:function(t){t.transform={show:!1,translate:{x:50,y:50},scale:{x:1,y:1},rotate:0,anchor:{x:25,y:25},size:{width:50,height:50}}}},actions:{}},ne={namespaced:!0,state:{nodes:{}},getters:{getNode:function(t){return function(e){return t.nodes[e]}}},mutations:{cacheNodes:function(t,e){t.nodes=e}},actions:{}};r["default"].use(Kt["a"]);var re=new Kt["a"].Store({state:{mode:"dev"},getters:{mode:function(t){return t.mode}},mutations:{setMode:function(t,e){t.mode=e}},actions:{},modules:{canvas:Zt,structure:Qt,controls:ee,active:te,component:ne}});r["default"].use(i.a),r["default"].config.productionTip=!1,new r["default"]({store:re,render:function(t){return t(Gt)}}).$mount("#app")},"626d":function(t,e,n){"use strict";n("eb17")},7461:function(t,e,n){},"7c55":function(t,e,n){"use strict";n("2395")},8894:function(t,e,n){"use strict";n("cb51")},a263:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("circle",{style:t.cssStyle,attrs:{r:t.configure.r,transform:"translate("+t.offsetDistance.x+", "+t.offsetDistance.y+")"},on:{mousedown:function(e){return t.mousedown("p1")},mouseup:function(e){return t.mouseup("p1")}}})},o=[],i=n("5530"),s={props:{node:{type:String,required:!0},position:{type:Object,required:!0},size:{type:Object,required:!0},configure:{type:Object,default:function(){return{r:5,offset:{x:.5,y:1.5}}}},cssStyle:{type:Object,default:function(){return{fill:"white",stroke:"blue",strokeWidth:1,cursor:"crosshair"}}}},data:function(){return{interface:["p1"]}},computed:{cacheLine:function(){return this.$store.getters["structure/getCacheLine"]},offsetDistance:function(){return{x:this.size.width*this.configure.offset.x,y:this.size.height*this.configure.offset.y}},p1:function(){return{x:this.position.x+this.offsetDistance.x,y:this.position.y+this.offsetDistance.y}}},methods:{mousedown:function(t){console.log(this.node,t,this.p1),this.cacheLine.start={node:this.node,interface:"p1",position:Object(i["a"])({},this.p1)}},mouseup:function(t){console.log(this.node,t,this.p1),this.cacheLine.end={node:this.node,interface:"p1",position:Object(i["a"])({},this.p1)},this.$store.commit("structure/generateLine")}}},a=s,c=n("2877"),u=Object(c["a"])(a,r,o,!1,null,"5c945704",null);e["default"]=u.exports},b256:function(t,e,n){var r={"./textArea.vue":"50de"};function o(t){var e=i(t);return n(e)}function i(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}o.keys=function(){return Object.keys(r)},o.resolve=i,t.exports=o,o.id="b256"},b618:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",[n("circle",{style:t.cssStyle,attrs:{r:t.configure.r,transform:"translate("+t.top.x+", "+t.top.y+")"},on:{mousedown:function(e){return t.mousedown("p1")},mouseup:function(e){return t.mouseup("p1")}}}),n("circle",{style:t.cssStyle,attrs:{r:t.configure.r,transform:"translate("+t.right.x+", "+t.right.y+")"},on:{mousedown:function(e){return t.mousedown("p2")},mouseup:function(e){return t.mouseup("p2")}}}),n("circle",{style:t.cssStyle,attrs:{r:t.configure.r,transform:"translate("+t.bottom.x+", "+t.bottom.y+")"},on:{mousedown:function(e){return t.mousedown("p3")},mouseup:function(e){return t.mouseup("p3")}}}),n("circle",{style:t.cssStyle,attrs:{r:t.configure.r,transform:"translate("+t.left.x+", "+t.left.y+")"},on:{mousedown:function(e){return t.mousedown("p4")},mouseup:function(e){return t.mouseup("p4")}}})])},o=[],i=n("5530"),s={props:{node:{type:String,required:!0},position:{type:Object,required:!0},size:{type:Object,required:!0},configure:{type:Object,default:function(){return{r:5,offset:{x:0,y:0}}}},cssStyle:{type:Object,default:function(){return{fill:"white",stroke:"blue",strokeWidth:1,cursor:"crosshair"}}}},data:function(){return{interface:["p1","p2","p3","p4"]}},computed:{cacheLine:function(){return this.$store.getters["structure/getCacheLine"]},top:function(){return{x:this.size.width/2+this.configure.offset.x,y:this.configure.offset.y}},right:function(){return{x:this.size.width+this.configure.offset.x,y:this.size.height/2+this.configure.offset.y}},bottom:function(){return{x:this.top.x,y:this.size.height+this.configure.offset.y}},left:function(){return{x:this.configure.offset.x,y:this.right.y}},p1:function(){return{x:this.position.x+this.top.x,y:this.position.y+this.top.y}},p2:function(){return{x:this.position.x+this.right.x,y:this.position.y+this.right.y}},p3:function(){return{x:this.position.x+this.bottom.x,y:this.position.y+this.bottom.y}},p4:function(){return{x:this.position.x+this.left.x,y:this.position.y+this.left.y}}},methods:{mousedown:function(t){console.log(this.node,t,this[t]),this.cacheLine.start={node:this.node,interface:t,position:Object(i["a"])({},this[t])}},mouseup:function(t){console.log(this.node,t,this[t]),this.cacheLine.end={node:this.node,interface:t,position:Object(i["a"])({},this[t])},this.$store.commit("structure/generateLine")}}},a=s,c=n("2877"),u=Object(c["a"])(a,r,o,!1,null,"85e65ce0",null);e["default"]=u.exports},bbbc:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",[n("rect",{style:t.cssStyle,attrs:{width:t.size.width,height:t.size.height}}),t.cssStyle.backgroundImage?n("image",{attrs:{width:t.size.width,height:t.size.height,href:t.cssStyle.backgroundImage}}):t._e()])},o=[],i={props:{size:{type:Object,required:!0},cssStyle:{type:Object,default:function(){return{fill:"red",stroke:"black",strokeWidth:2,backgroundImage:""}}}},created:function(){}},s=i,a=n("2877"),c=Object(a["a"])(s,r,o,!1,null,"0a0c4974",null);e["default"]=c.exports},c32d:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",[n("path",{style:t.cssStyle,attrs:{d:"M "+t.startPoint.x+" "+t.startPoint.y+" H "+t.middlePoint.x,"marker-start":"url(#"+t.markerStart+")"}}),n("path",{style:t.cssStyle,attrs:{d:"M "+t.middlePoint.x+" "+t.startPoint.y+" V "+t.endPoint.y+" ","marker-mid":"url(#"+t.markerMid+")"}}),n("path",{style:t.cssStyle,attrs:{d:"M "+t.middlePoint.x+" "+t.endPoint.y+" H "+t.endPoint.x+" ","marker-end":"url(#"+t.markerEnd+")"}})])},o=[],i={props:{startPoint:{type:Object,required:!0},endPoint:{type:Object,required:!0},startNode:{type:String},endNode:{type:String},markerStart:{type:String},markerMid:{type:String},markerEnd:{type:String},cssStyle:{type:Object,default:function(){return{fill:"transparent",stroke:"#2856FF",strokeWidth:2}}}},computed:{middlePoint:function(){return{x:(this.endPoint.x-this.startPoint.x)/2+this.startPoint.x,y:(this.endPoint.y-this.startPoint.y)/2+this.startPoint.y}}}},s=i,a=n("2877"),c=Object(a["a"])(s,r,o,!1,null,"4c2c0d1c",null);e["default"]=c.exports},cb51:function(t,e,n){},cc1a:function(t,e,n){"use strict";n("4e52")},eb17:function(t,e,n){},f795:function(t,e,n){},fe1e:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("path",{style:t.cssStyle,attrs:{d:"M "+t.startPoint.x+" "+t.startPoint.y+" L "+t.middlePoint.x+" "+t.middlePoint.y+" L "+t.endPoint.x+" "+t.endPoint.y+" ","marker-start":"url(#"+t.markerStart+")","marker-mid":"url(#"+t.markerMid+")","marker-end":"url(#"+t.markerEnd+")"}})},o=[],i={props:{startPoint:{type:Object,required:!0},endPoint:{type:Object,required:!0},markerStart:{type:String},markerMid:{type:String},markerEnd:{type:String},cssStyle:{type:Object,default:function(){return{fill:"transparent",stroke:"#2856FF",strokeWidth:2}}}},computed:{middlePoint:function(){return{x:(this.endPoint.x-this.startPoint.x)/2+this.startPoint.x,y:(this.endPoint.y-this.startPoint.y)/2+this.startPoint.y}}}},s=i,a=n("2877"),c=Object(a["a"])(s,r,o,!1,null,"16f3cf9d",null);e["default"]=c.exports}});
//# sourceMappingURL=app.0e153d0c.js.map