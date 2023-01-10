import Vue from "vue";
import "./assets/plugins/axios";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 通用样式
import "./assets/less/common.less";

import App from "./App.vue";
// import router from "./router";
import store from "./store";

Vue.use(ElementUI);

Vue.config.productionTip = false;
// 生产动态

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
