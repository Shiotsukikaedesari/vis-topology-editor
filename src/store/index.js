import Vue from "vue";
import Vuex from "vuex";

const context = require.context("./", true, /\.js$/);
const modules = {};

context.keys().forEach((url) => {
  if (url !== "./index.js") {
    modules[url.replace(/.\/|\.js$/g, "")] = context(url).default;
  }
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: "dev",
  },
  getters: {
    mode(state) {
      return state.mode;
    },
  },
  mutations: {
    setMode(state, mode) {
      state.mode = mode;
    },
  },
  actions: {},
  modules,
});
