export default {
  namespaced: true,
  state: {
    stage: {}, // 画布的吸附
    nodes: {}, // 节点吸附
    connectors: {}, // 连接器吸附
    status: true,

    distance: 3, // 吸附距离

    cacheNodesPosition: {
      // 缓存的位置信息
      x: {},
      y: {},
    },

    currentNode: "", // 当前需要进行吸附的node

    structure: [],
  },
  getters: {
    status(state) {
      return state.status;
    },
    distance(state) {
      return state.distance;
    },
    structure(state) {
      return state.structure;
    },
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setDistance(state, number) {
      state.distance = number;
    },

    // 设置当前需要进行吸附的节点
    setCurrentNode(state, id) {
      const nodeComponent = this.getters["component/getNode"](id);
      if (!nodeComponent) {
        console.warn(`找不到相关node组件：'${id}'`);
        return false;
      }
      this.commit("adsorb/clearNodeCache", id);
      state.currentNode = nodeComponent;
    },

    // 清空当前节点的缓存
    clearNodeCache(state, id) {
      const cacheNodesPosition = state.cacheNodesPosition;

      const oldNode = state.nodes[id];
      const clearCache = (axis) => {
        // 先把原先的缓存清除
        if (oldNode) {
          Object.keys(oldNode[axis]).forEach((position) => {
            if (cacheNodesPosition[axis][position]) {
              cacheNodesPosition[axis][position].some((message, i, arr) => {
                if (message.node === id) {
                  arr.splice(i, 1);
                }
              });
              if (!cacheNodesPosition[axis][position].length) {
                delete cacheNodesPosition[axis][position];
              }
            }
          });
        }
      };

      clearCache("x");
      clearCache("y");
    },

    // 更新这个节点的相关信息
    updateNode(state, id) {
      this.commit("adsorb/clearNodeCache", id);
      this.commit("adsorb/clearStructure");
      const cacheNodesPosition = state.cacheNodesPosition;
      const nodeComponent = this.getters["component/getNode"](id);
      // 缓存x, y, harfX, harfY,
      const position = nodeComponent.position;
      const size = nodeComponent.size;

      const newMessage = {
        x: {
          [position.x]: "start",
          [position.x + size.width / 2]: "middle",
          [position.x + size.width]: "end",
        },
        y: {
          [position.y]: "start",
          [position.y + size.height / 2]: "middle",
          [position.y + size.height]: "end",
        },
      };
      state.nodes[id] = newMessage;

      // 通过nodes去更新cache
      const updateCache = (axis) => {
        Object.keys(newMessage[axis]).forEach((position) => {
          if (cacheNodesPosition[axis][position]) {
            cacheNodesPosition[axis][position].push({
              node: id,
              marker: newMessage[axis][position],
            });
          } else {
            cacheNodesPosition[axis][position] = [
              {
                node: id,
                marker: newMessage[axis][position],
              },
            ];
          }
        });
      };
      updateCache("x");
      updateCache("y");
    },
    // 删除这个节点的相关信息
    clearNode(state, id) {
      this.commit("adsorb/clearNodeCache", id);
      delete state.nodes[id];
    },

    // 执行吸附
    executeNodeAdsorb(state) {
      if (!state.status) {
        return false;
      }

      this.commit("adsorb/clearStructure");
      const nodeComponent = state.currentNode;
      const position = nodeComponent.position;
      const size = nodeComponent.size;

      const adsorbMessage = {
        x: {
          [position.x]: "start",
          [position.x + size.width / 2]: "middle",
          [position.x + size.width]: "end",
        },
        y: {
          [position.y]: "start",
          [position.y + size.height / 2]: "middle",
          [position.y + size.height]: "end",
        },
      };

      // 将adsorbMessage的信息扩充到吸附范围 并匹配最小吸附
      const distance = state.distance;
      const cacheNodesPosition = state.cacheNodesPosition;

      const getAdsorbMessage = (axis) => {
        let adsorb = {
          offset: 0,
          start: "",
          middle: "",
          end: "",
        };
        let hasAdsorb = false;

        // 取最小的吸附距离
        Object.keys(adsorbMessage[axis]).forEach((position) => {
          position = Number(position);
          // 上下游 因为是从小往大的吸附判断，所以这里直接break
          const marker = adsorbMessage[axis][position];
          for (let i = 0; i <= distance; i += 0.5) {
            if (cacheNodesPosition[axis][position - i]) {
              if (!hasAdsorb) {
                adsorb = {
                  offset: -i,
                  start: "",
                  middle: "",
                  end: "",
                };
                adsorb[marker] = [].concat(cacheNodesPosition[axis][position - i]);
                hasAdsorb = true;
                break;
              } else if (Math.abs(adsorb.offset) === i) {
                if (!adsorb[marker]) {
                  adsorb[marker] = [].concat(cacheNodesPosition[axis][position - i]);
                  break;
                }
              }
            }

            if (cacheNodesPosition[axis][position + i]) {
              if (!hasAdsorb) {
                adsorb = {
                  offset: i,
                  start: "",
                  middle: "",
                  end: "",
                };
                adsorb[marker] = [].concat(cacheNodesPosition[axis][position + i]);
                hasAdsorb = true;
                break;
              } else if (Math.abs(adsorb.offset) === i) {
                if (!adsorb[marker]) {
                  adsorb[marker] = [].concat(cacheNodesPosition[axis][position + i]);
                  break;
                }
              }
            }
          }
        });
        return hasAdsorb ? adsorb : "";
      };

      const adsorbX = getAdsorbMessage("x");
      const adsorbY = getAdsorbMessage("y");

      const getMinDistanceMessage = (nodes, axis) => {
        let minMessage = "";
        let min = "";
        nodes.forEach((message) => {
          const targetComponent = this.getters["component/getNode"](message.node);
          const distance = Math.abs(nodeComponent.position[axis] - targetComponent.position[axis]);
          if (min === "" || min > distance) {
            min = distance;
            minMessage = message;
          }
        });
        return minMessage;
      };

      const generateHelperStructure = (adsorbMessage, marker, axis) => {
        if (adsorbMessage[marker]) {
          const message = getMinDistanceMessage(adsorbMessage[marker], axis === "x" ? "y" : "x");
          state.structure.push({
            start: {
              node: nodeComponent.id,
              axis: axis,
              marker: marker,
            },
            end: {
              node: message.node,
              axis: axis,
              marker: message.marker,
            },
          });
        }
      };

      if (adsorbX) {
        // 判断最近的节点展示辅助
        generateHelperStructure(adsorbX, "start", "x");
        generateHelperStructure(adsorbX, "middle", "x");
        generateHelperStructure(adsorbX, "end", "x");
        // 执行吸附偏移
        if (adsorbX.offset) {
          nodeComponent.translate.x += adsorbX.offset;
        }
      }

      if (adsorbY) {
        // 判断最近的节点展示辅助
        generateHelperStructure(adsorbY, "start", "y");
        generateHelperStructure(adsorbY, "middle", "y");
        generateHelperStructure(adsorbY, "end", "y");
        // 执行吸附偏移
        if (adsorbY.offset) {
          nodeComponent.translate.y += adsorbY.offset;
        }
      }
    },

    // 清空辅助接口
    clearStructure(state) {
      state.structure = [];
    },
  },
  actions: {},
};
