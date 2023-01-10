export default {
  namespaced: true,
  state: {
    size: {
      width: 827,
      height: 1169,
    },
    translate: {
      x: 0,
      y: 0,
    },
  },
  getters: {
    size(state) {
      return state.size;
    },
    translate(state) {
      return state.translate;
    },
  },
  mutations: {
    setSize(state, size) {
      state.size = size;
    },
    setTranslate(state, translate) {
      state.translate = translate;
    },
  },
  actions: {},
};
