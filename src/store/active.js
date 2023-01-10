export default {
  namespaced: true,
  state: {
    node: "",
    line: "",
  },
  getters: {
    node(state) {
      return state.node;
    },
    line(state) {
      return state.line;
    },
  },
  mutations: {
    setNode(state, id) {
      const structure = this.getters["structure/getNode"](id);
      state.node = structure;
    },

    clearNode(state) {
      state.node = "";
    },

    setLine(state, id) {
      const structure = this.getters["structure/getLine"](id);
      state.line = structure;
    },

    clearLine(state) {
      state.line = "";
    },

    clear(state) {
      state.node = "";
      state.line = "";
    },
  },
  actions: {},
};
