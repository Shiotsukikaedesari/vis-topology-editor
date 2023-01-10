<template>
  <div class="nodeController-container">
    <configure-layout title="位置">
      <vector-two slot="controller" :configure="configure.translate"></vector-two>
    </configure-layout>
    <!-- <configure-layout title="旋转">
      <el-input-number
        slot="controller"
        :precision="0"
        size="mini"
        v-model="configure.rotate"
      ></el-input-number>
    </configure-layout> -->
    <!-- <configure-layout title="锚点">
      <vector-two slot="controller" :configure="configure.anchor"></vector-two>
    </configure-layout> -->
    <configure-layout title="尺寸">
      <vector-two
        slot="controller"
        :configure="configure.size"
        :x="'width'"
        :y="'height'"
      ></vector-two>
    </configure-layout>
    <configure-layout title="控制器hover">
      <el-switch slot="controller" v-model="configure.configure.connector.hover"></el-switch>
    </configure-layout>
    <configure-layout title="背景图标"></configure-layout>
    <configure-layout title="背景图片"></configure-layout>
  </div>
</template>

<script>
import configureLayout from "../../common/layout/configureLayout.vue";
import vectorTwo from "../../common/controller/vectorTwo.vue";
export default {
  components: {
    configureLayout,
    vectorTwo,
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
