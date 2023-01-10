<template>
  <path
    :d="`M ${startPosition.x} ${startPosition.y} L ${middlePoint.x} ${middlePoint.y} L ${endPosition.x} ${endPosition.y} `"
    :style="cssStyle"
    :marker-start="`url(#${markerStart})`"
    :marker-mid="`url(#${markerMid})`"
    :marker-end="`url(#${markerEnd})`"
  ></path>
</template>

<script>
import basicProps from "./basicProps";
export default {
  name: "linear",
  mixins: [basicProps],
  props: {
    cssStyle: {
      type: Object,
      default: () => {
        return {
          fill: "rgba(0, 0, 0, 0)",
          stroke: "rgba(0, 147, 255, 1)",
          strokeWidth: 2,
        };
      },
    },
  },
  computed: {
    middlePoint() {
      return {
        x: (this.endPosition.x - this.startPosition.x) / 2 + this.startPosition.x,
        y: (this.endPosition.y - this.startPosition.y) / 2 + this.startPosition.y,
      };
    },
  },
};
</script>

<style lang="less" scoped></style>
