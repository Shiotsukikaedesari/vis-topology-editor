(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17781cfd"],{"0dd3":function(e,t,r){},1293:function(e,t,r){"use strict";r("0dd3")},"931b":function(e,t,r){},ce88:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"objectView-container"},[r("el-collapse",{model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.themeMenu,(function(t){return r("el-collapse-item",{key:t.name,attrs:{title:t.label,name:t.name}},e._l(t.inventory,(function(t){return r("node-display-window",{key:t.name,attrs:{width:e.windowWidth,height:e.windowHeight,structure:t.structure}})})),1)})),1)],1)},o=[],i=(r("d81d"),r("b0c0"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"display-window-container",style:{width:e.width+"px",height:e.height+"px"},on:{mousedown:function(t){return e.dragStart(t,e.structure)}}},[r("svg",{staticStyle:{"pointer-events":"none"},attrs:{width:e.width,height:e.height}},[r(e.structure.component,e._b({tag:"component",attrs:{use:"display",translate:e.displayPosition}},"component",e.structure,!1))],1)])}),c=[],a=(r("a9e3"),r("e9c4"),r("2b0e")),s=r("ecce"),u=r("ec26"),d={components:{node:s["a"]},props:{width:{type:Number,default:50},height:{type:Number,default:50},structure:{type:Object}},data:function(){return{}},computed:{displayPosition:function(){return{x:this.width/2,y:this.height/2}}},methods:{dragStart:function(e,t){var r=this,n=a["default"].observable(JSON.parse(JSON.stringify(t)));n.id=Object(u["a"])(),n.translate.x=-100,n.translate.y=-100;var o=this.$store.getters["canvas/canvas"],i=function(){r.$store.commit("structure/addNode",n),r.$store.commit("active/clear"),r.$store.commit("active/setNode",n.id),r.$store.commit("controls/transformNode",n.id)},c=o.getBoundingClientRect().left,s=o.getBoundingClientRect().top,d=this.$store.getters["canvas/scale"],l=function(e){e.stopPropagation(),n.translate.x=Math.round((e.clientX-c-10)*d),n.translate.y=Math.round((e.clientY-s-10)*d)},h=function e(){o.removeEventListener("mouseenter",i),o.removeEventListener("mousemove",l),document.body.removeEventListener("mouseup",e)};o.addEventListener("mouseenter",i),o.addEventListener("mousemove",l),document.body.addEventListener("mouseup",h)}},created:function(){}},l=d,h=(r("d4f8"),r("2877")),f=Object(h["a"])(l,i,c,!1,null,"d9fb10dc",null),p=f.exports,m=(r("d3b7"),r("159b"),r("7ce2")),g=r.n(m),b=r("9cc8"),w=r("2a16"),y=r("40a7"),v=r("def3"),k=function(){return{framework:{shape:"",widget:"",connector:1},size:{width:50,height:50},anchor:{x:25,y:25},configure:{connector:{hover:!0},backgroundImage:"",icon:""},shape:{cssStyle:{fill:"rgba(56, 117, 232)",stroke:"rgba(0, 0, 0, 1)",strokeWidth:2}},widget:"",connector:[{interface:"p1",direction:{x:0,y:0},component:"circleConnector",size:{width:10,height:10},translate:{x:.5,y:.5},offset:{x:0,y:0},cssStyle:{fill:"rgba(255, 255, 255, 1)",stroke:"rgba(0, 0, 255, 1)",strokeWidth:1,cursor:"crosshair"}}],line:Object(v["a"])().structure}},x=[{name:"basicRect",label:"基础矩形",structure:{framework:{shape:"rectShape"}}},{name:"basicCircle",label:"基础圆形",structure:{framework:{shape:"circleShape"}}}],S=function(){return{name:"basicShape",label:"基础控件",desp:"形状与单节点",inventory:x.map((function(e){return e.structure=g()(k(),e.structure),e}))}},O=r("562e"),j=function(){return{framework:{shape:"",widget:"textAreaWidget",connector:"square"},size:{width:70,height:50},anchor:{x:35,y:25},configure:{connector:{hover:!1}},widget:{},shape:{cssStyle:{fill:"rgba(0, 0, 0, 0)",stroke:"rgba(0, 0, 0, 1)",strokeWidth:4}},connector:[{interface:"p1",direction:{x:0,y:1},component:"circleConnector",size:{width:10,height:10},translate:{x:.5,y:0},offset:{x:0,y:0},cssStyle:{fill:"rgba(255, 255, 255, 1)",stroke:"rgba(0, 0, 255, 1)",strokeWidth:1,cursor:"crosshair"}},{interface:"p2",direction:{x:1,y:0},component:"circleConnector",size:{width:10,height:10},translate:{x:1,y:.5},offset:{x:0,y:0},cssStyle:{fill:"rgba(255, 255, 255, 1)",stroke:"rgba(0, 0, 255, 1)",strokeWidth:1,cursor:"crosshair"}},{interface:"p3",direction:{x:0,y:-1},component:"circleConnector",size:{width:10,height:10},translate:{x:.5,y:1},offset:{x:0,y:0},cssStyle:{fill:"rgba(255, 255, 255, 1)",stroke:"rgba(0, 0, 255, 1)",strokeWidth:1,cursor:"crosshair"}},{interface:"p4",direction:{x:-1,y:0},component:"circleConnector",size:{width:10,height:10},translate:{x:0,y:.5},offset:{x:0,y:0},cssStyle:{fill:"rgba(255, 255, 255, 1)",stroke:"rgba(0, 0, 255, 1)",strokeWidth:1,cursor:"crosshair"}}],line:Object(O["a"])().structure}},C=[{name:"squareRect",label:"四方矩形",structure:{framework:{shape:"rectShape"}}},{name:"squareCircle",label:"四方圆形",structure:{framework:{shape:"circleShape"}}}],N=function(){return{name:"squareText",label:"四方表单控件",desp:"形状表单与四方节点",inventory:C.map((function(e){return e.structure=g()(j(),e.structure),e}))}},W=r("f9f8"),E=r("2f14"),J=function(e){var t=g()({},Object(E["a"])(s["a"]),e),r=t.framework;return r.shape&&w["a"][r.shape]?t.shape=g()(Object(E["a"])(w["a"][r.shape]),t.shape):t.shape={},r.widget&&y["a"][r.widget]?t.widget=g()(Object(E["a"])(y["a"][r.widget]),t.widget):t.widget={},r.connector&&Array.isArray(t.connector)?t.connector.forEach((function(e){b["a"][e.component]&&(e=g()(e,Object(E["a"])(b["a"][e.component])))})):t.connector=[],t.line?t.line=Object(W["a"])(t.line):t.line={},JSON.parse(JSON.stringify(t))},$=function(e){return e.inventory.forEach((function(e){e.structure=J(e.structure)})),JSON.parse(JSON.stringify(e))},z=[$(S()),$(N())];console.log(z);var _={components:{nodeDisplayWindow:p},data:function(){var e=z.map((function(e){return e.name}));return{active:e,windowWidth:100,windowHeight:80,themeMenu:z}},methods:{}},L=_,q=(r("1293"),Object(h["a"])(L,n,o,!1,null,"ffcc0d50",null));t["default"]=q.exports},d4f8:function(e,t,r){"use strict";r("931b")},d81d:function(e,t,r){"use strict";var n=r("23e7"),o=r("b727").map,i=r("1dde"),c=i("map");n({target:"Array",proto:!0,forced:!c},{map:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);