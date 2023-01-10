export default {
  namespaced: true,
  state: {
    canvas: null,
    offset: {
      x: 0,
      y: 0,
    },
    scale: 1,
    renderPower: 2,
  },
  getters: {
    canvas(state) {
      return state.canvas;
    },
    offset(state) {
      return state.offset;
    },
    scale(state) {
      return state.scale;
    },
    renderPower(state) {
      return state.renderPower;
    },
  },
  mutations: {
    setCanvas(state, svg) {
      state.canvas = svg;
    },
    setOffset(state, offset) {
      state.offset = Object.assign(state.offset, offset);
    },
    setScale(state, scale) {
      state.scale = scale;
    },
    setRenderPower(state, value) {
      state.renderPower = value;
    },
  },
  actions: {},
};
