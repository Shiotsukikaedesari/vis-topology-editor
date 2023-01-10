<template>
  <g class="vis-connectLine" :class="{ 'vis-connectLine-acitve': active }" @click.stop="activeLine">
    <circle
      :r="point.r"
      :style="point.style"
      :transform="`translate(${startNode.x}, ${startNode.y})`"
      class="vis-connectLine-point"
      @mousedown="(event) => mousedown(event, 'start')"
    ></circle>

    <defs>
      <component :is="framework.markerStart" :id="id" v-bind="markerStart"></component>

      <component :is="framework.markerMid" :id="id" v-bind="markerMid"></component>

      <component :is="framework.markerEnd" :id="id" v-bind="markerEnd"></component>
    </defs>

    <component
      :is="framework.shape"
      :markerStart="`${id}${framework.markerStart}`"
      :markerMid="`${id}${framework.markerMid}`"
      :markerEnd="`${id}${framework.markerEnd}`"
      :startPosition="startPosition"
      :endPosition="endPosition"
      :startMessage="start"
      :endMessage="end"
      v-bind="shape"
    ></component>

    <circle
      :r="point.r"
      :style="point.style"
      :transform="`translate(${endNode.x}, ${endNode.y})`"
      class="vis-connectLine-point"
      @mousedown="(event) => mousedown(event, 'end')"
    ></circle>
  </g>
</template>

<script>
import svg from "../../mixins/svg";
// import dev from "../../mixins/dev";

import { components as shapeComponents } from "./shape";
import { components as widgetComponents } from "./widget";

export default {
  name: "connectLine",
  mixins: [svg],
  components: {
    ...shapeComponents,
    ...widgetComponents,
  },
  props: {
    framework: {
      type: Object,
      default: () => {
        return {
          shape: "linear",
          markerStart: "",
          markerMid: "textWidget",
          markerEnd: "arrow",
        };
      },
    },
    start: {
      type: Object,
      default: () => {
        return {
          node: "",
          interface: "",
          direction: "",
          position: {
            x: 0,
            y: 0,
          },
        };
      },
      required: true,
    },
    end: {
      type: Object,
      default: () => {
        return {
          node: "",
          interface: "",
          direction: "",
          position: {
            x: 0,
            y: 0,
          },
        };
      },
      required: true,
    },
    shape: {
      type: Object,
      required: true,
    },
    markerStart: {
      type: Object,
    },
    markerMid: {
      type: Object,
    },
    markerEnd: {
      type: Object,
    },
  },
  data() {
    return {
      // 链接点控件的样式
      point: {
        r: 10,
        style: {
          fill: "white",
          stroke: "green",
          strokeWidth: 1,
          cursor: "move",
        },
      },
      // 开始位置
      startPosition: { x: 0, y: 0 },
      // 结束位置
      endPosition: { x: 0, y: 0 },
    };
  },
  computed: {
    startNode() {
      const node = this.$store.getters["component/getNode"](this.start.node);
      if (node && node.$refs[this.start.interface][0]) {
        return node.$refs[this.start.interface][0].point;
      }
      return this.start.position;
    },
    endNode() {
      const node = this.$store.getters["component/getNode"](this.end.node);
      if (node && node.$refs[this.end.interface][0]) {
        return node.$refs[this.end.interface][0].point;
      }
      return this.end.position;
    },

    canvas() {
      return this.$store.getters["canvas/canvas"];
    },

    active() {
      return this.$store.getters["active/line"].id === this.id;
    },
  },
  methods: {
    activeLine() {
      this.$store.commit("active/clear");
      this.$store.commit("active/setLine", this.id);
    },
    mousedown(event, point) {
      // 设置链接标识
      this.$store.commit("connect/setFinishFlag", point);

      // 注册事件
      const pointPosition = this[point].position;
      const canvas = this.canvas;
      const canvasScale = this.$store.getters["canvas/scale"];

      const cachePosition = { ...pointPosition };
      const dragStartPointer = { x: event.clientX, y: event.clientY };
      const boundingBox = canvas.getBoundingClientRect();

      const mousemoveFun = (event) => {
        pointPosition.x =
          cachePosition.x + Math.round((event.clientX - dragStartPointer.x) * canvasScale);
        pointPosition.y =
          cachePosition.y + Math.round((event.clientY - dragStartPointer.y) * canvasScale);
      };

      const mouseupFun = () => {
        canvas.removeEventListener("mousemove", mousemoveFun);
        canvas.removeEventListener("mouseup", mouseupFun);
      };

      const mouseleaveFun = () => {
        const homing = 30;

        if (pointPosition.x <= 0) {
          pointPosition.x = homing;
        } else if (pointPosition.x >= boundingBox.width - 5) {
          pointPosition.x = boundingBox.width - homing;
        }

        if (pointPosition.y <= 0) {
          pointPosition.y = homing;
        } else if (pointPosition.y >= boundingBox.height - 5) {
          pointPosition.y = boundingBox.height - homing;
        }

        canvas.removeEventListener("mousemove", mousemoveFun);
        canvas.removeEventListener("mouseup", mouseupFun);
        canvas.removeEventListener("mouseleave", mouseleaveFun);
      };

      canvas.addEventListener("mousemove", mousemoveFun);
      canvas.addEventListener("mouseup", mouseupFun);
      canvas.addEventListener("mouseleave", mouseleaveFun);
    },
  },
  watch: {
    startNode: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal !== this.start.position) {
            this.start.position.x = newVal.x;
            this.start.position.y = newVal.y;
          }

          this.startPosition = newVal;
        }
      },
      immediate: true,
    },
    endNode: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal !== this.end.position) {
            this.end.position.x = newVal.x;
            this.end.position.y = newVal.y;
          }
          this.endPosition = newVal;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.vis-connectLine {
  cursor: pointer;
  transition: filter ease 150ms;
  &:hover {
    filter: drop-shadow(0 0 3px rgb(0, 197, 241));
  }
}

.vis-connectLine-acitve {
  filter: drop-shadow(0 0 3px rgb(196, 2, 255)) !important;
}

.vis-connectLine-point {
  opacity: 0;
  transition: opacity ease 300ms;
  &:hover {
    opacity: 1;
  }
}
</style>
