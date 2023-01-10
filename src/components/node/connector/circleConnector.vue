<template>
  <circle
    :r="r"
    :style="cssStyle"
    :transform="`translate(${position.x}, ${position.y})`"
    @mousedown.stop="mousedown"
    @mouseup="mouseup"
  ></circle>
</template>

<script>
import connectEvent from "./connectEvent.js";
export default {
  name: "cricleShape",
  mixins: [connectEvent],
  props: {
    node: {
      type: Object,
      default: () => {
        return {
          id: "",
          position: { x: 0, y: 0 },
          size: { width: 50, height: 50 },
        };
      },
      required: true,
    },
    interface: {
      type: String,
      default: "",
    },
    direction: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
        };
      },
    },
    translate: {
      type: Object,
      default: () => {
        return {
          x: 0.5,
          y: 0.5,
        };
      },
    },
    offset: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
        };
      },
    },
    size: {
      type: Object,
      default: () => {
        return {
          width: 10,
          height: 10,
        };
      },
    },
    configure: {
      type: Object,
      default: () => {
        return {};
      },
    },
    cssStyle: {
      type: Object,
      default: () => {
        return {
          fill: "white",
          stroke: "blue",
          strokeWidth: 1,
          cursor: "crosshair",
        };
      },
    },
  },
  data() {
    return {};
  },

  computed: {
    r() {
      return Math.min(this.size.width, this.size.height) / 2;
    },
    position() {
      const node = this.node;
      return {
        x: node.size.width * this.translate.x + this.offset.x,
        y: node.size.height * this.translate.y + this.offset.y,
      };
    },
  },

  created() {},
};
</script>

<style lang="less" scoped></style>
