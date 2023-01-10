<template>
  <circle
    :r="r"
    :style="cssStyle"
    :transform="`translate(${size.width / 2}, ${size.height / 2})`"
  ></circle>
</template>

<script>
export default {
  name: "circleShape",
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

  computed: {
    r() {
      return Math.min(this.size.width, this.size.height) / 2;
    },
  },
};
</script>

<style lang="less" scoped></style>
