<template>
  <rect :width="size.width" :height="size.height" :style="cssStyle"></rect>
</template>

<script>
export default {
  name: "rectShape",
  props: {
    size: {
      type: Object,
      required: true,
    },
    cssStyle: {
      type: Object,
      default: () => {
        return {
          fill: "red",
          stroke: "black",
          strokeWidth: 2,
        };
      },
    },
  },

  created() {},
};
</script>

<style lang="less" scoped></style>
