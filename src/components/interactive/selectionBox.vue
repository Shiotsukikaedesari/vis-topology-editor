<template>
  <rect
    :width="end.x - start.x"
    :height="end.y - start.y"
    :style="svgStyle"
    :transform="`translate(${start.x}, ${start.y})`"
  ></rect>
</template>

<script>
export default {
  props: {
    selection: {
      type: Object,
      default: () => {},
    },
    start: {
      type: Object,
      default: () => {
        return { x: 0, y: 0 };
      },
    },

    end: {
      type: Object,
      default: () => {
        return { x: 0, y: 0 };
      },
    },
  },
  data() {
    return {
      intersection: new Set(),
      svgStyle: {
        fill: "rgba(0, 0, 200, 0.2)",
        strokeWidth: 1,
        stroke: "blue",
      },
    };
  },

  methods: {
    getIntersection() {
      return this.intersection;
    },
    intersectObject() {},
  },
};
</script>

<style lang="less" scoped></style>
