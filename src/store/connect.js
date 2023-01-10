// import Vue from "vue";
import { themeMenu } from "../components/line";
import { v4 as getUuid } from "uuid";

import { Message } from "element-ui";

export default {
  namespaced: true,
  state: {
    defaultLineStructure: themeMenu[0].structure, // 默认的连接线
    finishFlag: "", // 完成标识 start/end
    dragStartPointer: {
      x: 0,
      y: 0,
    },
  },
  getters: {},
  mutations: {
    applyDefaultLineStructure(state, structure) {
      state.defaultLineStructure = JSON.parse(JSON.stringify(structure));
    },
    setDragStartPointer(state, position) {
      state.dragStartPointer = Object.assign(state.dragStartPointer, position);
    },
    // 间接器开始链接
    start(state, message) {
      // 注册开始节点可以生成线了
      const lineStructure = JSON.parse(JSON.stringify(state.defaultLineStructure));

      lineStructure.id = getUuid();
      lineStructure.start = { ...message };
      lineStructure.end.position = { ...lineStructure.start.position };

      // 加入节点缓存
      const node = this.getters["component/getNode"](lineStructure.start.node);
      node.line.connective[lineStructure.id] = "start";

      // 设置下一步完成标识为end
      state.finishFlag = "end";

      // 加入结构
      this.commit("structure/addLine", lineStructure);

      // 设置为当前激活线
      this.commit("active/setLine", lineStructure.id);

      // 绑定画布事件
      const canvas = this.getters["canvas/canvas"];
      const canvasScale = this.getters["canvas/scale"];

      const endPosition = lineStructure.end.position;

      const cachePosition = { ...endPosition };
      const dragStartPointer = state.dragStartPointer;

      // 用偏移量计算
      const mousemoveFun = (event) => {
        endPosition.x =
          cachePosition.x + Math.round((event.clientX - dragStartPointer.x) * canvasScale);

        endPosition.y =
          cachePosition.y + Math.round((event.clientY - dragStartPointer.y) * canvasScale);
      };

      const mouseleaveFun = () => {
        this.commit("structure/deleteLine", lineStructure.id);
        canvas.removeEventListener("mousemove", mousemoveFun);
        canvas.removeEventListener("mouseleave", mouseleaveFun);
      };

      const mouseupFun = () => {
        canvas.removeEventListener("mousemove", mousemoveFun);
        canvas.removeEventListener("mouseleave", mouseleaveFun);
        canvas.removeEventListener("mouseup", mouseupFun);
      };

      canvas.addEventListener("mousemove", mousemoveFun);
      canvas.addEventListener("mouseleave", mouseleaveFun);
      canvas.addEventListener("mouseup", mouseupFun);
    },

    // 连接器触发完成操作
    finish(state, message) {
      const lineStructure = this.getters["active/line"];

      if (!lineStructure) {
        return false;
      }
      if (lineStructure.start.node && message.node === lineStructure.start.node) {
        // 位置过近删掉改线
        const startPosition = lineStructure.start.position;
        const endPosition = lineStructure.end.position;
        const distance = Math.sqrt(
          (endPosition.x - startPosition.x) ** 2 + (endPosition.y - startPosition.y) ** 2
        );
        if (distance < 5) {
          this.commit("structure/deleteLine", lineStructure.id);
        }
        Message.warning("节点不能链接本身！");
        return false;
      }

      Object.assign(lineStructure.end, message);
      console.log(lineStructure);
      // 加入节点缓存
      const node = this.getters["component/getNode"](lineStructure.end.node);
      node.line.connective[lineStructure.id] = state.finishFlag;
    },

    // 设置完成标识
    setFinishFlag(state, flag) {
      state.finishFlag = flag;
    },
  },
  actions: {},
};
