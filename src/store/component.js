export default {
  namespaced: true,
  state: {
    canvas: "",
    nodes: {},
  },
  getters: {
    getNode(state) {
      return (id) => state.nodes[id];
    },
    canvas(state) {
      return state.canvas;
    },
  },
  mutations: {
    setCanvas(state, canvas) {
      state.canvas = canvas;
    },
    cacheNode(state, id) {
      const component = state.canvas.$refs[id][0];
      component && (state.nodes[component.id] = component);
    },
    clearCacheNode(state, id) {
      delete state.nodes[id];
    },
    clearCacheNodes(state) {
      state.nodes = {};
    },
  },
  actions: {},
};
