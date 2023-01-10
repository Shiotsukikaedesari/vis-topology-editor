<template>
  <div></div>
</template>

<script>
export default {
  props: {
    node: {
      type: String,
      required: true,
    },
    // x y
    axis: {
      type: String,
      required: true,
    },
    // start middle end
    marker: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
