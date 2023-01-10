<template>
  <marker
    :id="`${id}arrowWidget`"
    :markerWidth="configure.size.width"
    :markerHeight="configure.size.height"
    markerUnits="userSpaceOnUse"
    :viewBox="`0 0 ${configure.size.width} ${configure.size.height}`"
    :refX="configure.ref.x"
    :refY="configure.ref.y"
    orient="auto"
  >
    <path :d="d" :style="cssStyle" />
  </marker>
</template>

<script>
export default {
  name: "arrowWidget",
  props: {
    id: {
      type: String,
      required: true,
    },
    configure: {
      type: Object,
      default: () => {
        return {
          size: {
            width: 12,
            height: 12,
          },
          ref: {
            x: 30,
            y: 6,
          },
          tail: 2,
        };
      },
    },
    cssStyle: {
      type: Object,
      default: () => {
        return {
          fill: "rgba(0, 0, 0, 1)",
          stroke: "",
          strokeWidth: 1,
          cursor: "crosshair",
        };
      },
    },
  },
  computed: {
    d() {
      const size = this.configure.size;
      const tail = this.configure.tail;
      return `M 0 0 L ${size.width} ${size.height / 2} L 0 ${size.height} L ${tail} ${
        size.height / 2
      } L 0 0`;
    },
  },
};
</script>

<style lang="less" scoped></style>
