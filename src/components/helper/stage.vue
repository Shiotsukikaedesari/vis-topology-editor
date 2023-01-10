<template>
  <rect
    :width="size.width"
    :height="size.height"
    :transform="`translate(${translate.x}, ${translate.y})`"
    :style="cssStyle"
  ></rect>
</template>

<script>
export default {
  props: {
    // 尺寸
    size: {
      type: Object,
      default: () => {
        return {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    },
    // 偏移量
    translate: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
        };
      },
    },
    // 样式
    cssStyle: {
      type: Object,
      default: () => {
        return {
          fill: "rgba(255, 255, 255, 1)",
          stroke: "rgba(200, 200, 200, 1)",
          strokeWidth: 1,
          filter: "drop-shadow(2px 2px 6px rgb(150, 150, 150))",
        };
      },
    },
  },
};
</script>

<style lang="less" scoped></style>
