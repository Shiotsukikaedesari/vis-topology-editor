<template>
  <div class="vectorTwo-container">
    <el-input-number
      style="margin-right: 8px"
      :precision="precision"
      size="mini"
      v-model="configure[x]"
      controls-position="right"
    ></el-input-number>
    <el-input-number
      :precision="precision"
      size="mini"
      v-model="configure[y]"
      controls-position="right"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  props: {
    configure: {
      type: Object,
      required: true,
    },
    x: {
      type: String,
      default: "x",
    },
    y: {
      type: String,
      default: "y",
    },
    precision: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="less" scoped>
.vectorTwo-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
