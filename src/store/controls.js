export default {
  namespaced: true,
  state: {
    transform: {
      show: false,
      node: "",
      translate: { x: 50, y: 50 },
      scale: { x: 1, y: 1 },
      rotate: 0,
      anchor: { x: 25, y: 25 },
      size: { width: 50, height: 50 },
    },
  },
  getters: {
    transform(state) {
      return state.transform;
    },
  },
  mutations: {
    setTransform(state, { key, value }) {
      state.transform[key] !== undefined && (state.transform[key] = value);
    },
    transformNode(state, id) {
      const structure = this.getters["structure/getNode"](id);
      state.transform.translate = structure.translate;
      state.transform.scale = structure.scale;
      state.transform.rotate = structure.rotate;
      state.transform.anchor = structure.anchor;
      state.transform.size = structure.size;
      state.transform.node = structure.id;
      state.transform.show = true;
    },

    resetTransform(state) {
      state.transform = {
        show: false,
        node: "",
        translate: { x: 50, y: 50 },
        scale: { x: 1, y: 1 },
        rotate: 0,
        anchor: { x: 25, y: 25 },
        size: { width: 50, height: 50 },
      };
    },
  },
  actions: {},
};
