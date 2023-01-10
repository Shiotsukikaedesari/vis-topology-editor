<template>
  <div class="textAreaWidgetController-container">
    <configure-layout title="内容">
      <el-input slot="controller" size="mini" v-model="configure.configure.value"></el-input>
    </configure-layout>
    <configure-layout title="文本颜色">
      <el-color-picker
        slot="controller"
        v-model="configure.cssStyle.color"
        size="medium"
        show-alpha
      ></el-color-picker>
    </configure-layout>
    <configure-layout title="字体大小">
      <el-input slot="controller" size="mini" v-model="configure.cssStyle.fontSize"></el-input>
    </configure-layout>
  </div>
</template>

<script>
import configureLayout from "../../../common/layout/configureLayout.vue";
// import vectorTwo from "../../../common/controller/vectorTwo.vue";
export default {
  components: {
    configureLayout,
    // vectorTwo,
  },
  props: {
    configure: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
