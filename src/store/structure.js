import Vue from "vue";

export default {
  namespaced: true,
  state: {
    nodes: {},
    lines: {},
  },
  getters: {
    nodes(state) {
      return state.nodes;
    },
    lines(state) {
      return state.lines;
    },
    getNode(state) {
      return (id) => state.nodes[id];
    },

    getLine(state) {
      return (id) => state.lines[id];
    },
  },
  mutations: {
    addNode(state, structure) {
      state.nodes[structure.id] = Vue.observable(structure);
      state.nodes.__ob__.dep.notify();
      Vue.nextTick(() => {
        this.commit("component/cacheNode", structure.id);
        this.commit("adsorb/updateNode", structure.id);
      });
    },

    deleteNode(state, id) {
      this.commit("component/clearCacheNode", id);
      this.commit("adsorb/clearNode", id);
      Vue.delete(state.nodes, id);
    },

    addLine(state, structure) {
      state.lines[structure.id] = Vue.observable(structure);
      state.lines.__ob__.dep.notify();
    },

    deleteLine(state, id) {
      const line = state.lines[id];
      // 删除节点中线的缓存
      if (!line) {
        console.error(`can not get this line id: '${id}'`);
        return false;
      }

      if (line.start.node) {
        const startNode = state.nodes[line.start.node];

        if (startNode) {
          if (startNode.line.connective[line.id]) {
            delete startNode.line.connective[line.id];
          } else {
            console.error(`stat node can not found this line: '${line.id}'`);
          }
        }
      }

      if (line.end.node) {
        const endNode = state.nodes[line.end.node];

        if (endNode) {
          if (endNode.line.connective[line.id]) {
            delete endNode.line.connective[line.id];
          } else {
            console.error(`stat node can not found this line: '${line.id}'`);
          }
        }
      }

      Vue.delete(state.lines, id);
    },

    clearNodes(state) {
      this.commit("component/clearCacheNodes");
      state.nodes = {};
    },

    clearLines(state) {
      state.lines = {};
    },

    loadNodes(state, nodes) {
      state.nodes = nodes;
      Vue.nextTick(() => {
        Object.keys(nodes).forEach((id) => {
          this.commit("component/cacheNode", id);
          this.commit("adsorb/updateNode", id);
        });
      });
    },

    loadLines(state, lines) {
      state.lines = lines;
    },
  },
  actions: {},
};
