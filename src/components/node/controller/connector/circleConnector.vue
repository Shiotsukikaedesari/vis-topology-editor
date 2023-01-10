<template>
  <div class="rectShapeController-container">
    <configure-layout title="节点标志">
      <span slot="controller" v-text="configure.interface"></span>
    </configure-layout>
    <configure-layout title="节点尺寸">
      <vector-two slot="controller" :configure="configure.size" x="width" y="height"></vector-two>
    </configure-layout>
    <configure-layout title="节点位置">
      <vector-two slot="controller" :configure="configure.translate" :precision="1"></vector-two>
    </configure-layout>
    <configure-layout title="节点偏移">
      <vector-two slot="controller" :configure="configure.offset"></vector-two>
    </configure-layout>
    <configure-layout title="填充颜色">
      <el-color-picker
        slot="controller"
        v-model="configure.cssStyle.fill"
        size="medium"
        show-alpha
      ></el-color-picker>
    </configure-layout>
    <configure-layout title="描边颜色">
      <el-color-picker
        slot="controller"
        v-model="configure.cssStyle.stroke"
        size="medium"
        show-alpha
      ></el-color-picker>
    </configure-layout>
    <configure-layout title="描边宽度">
      <el-input-number
        slot="controller"
        :precision="0"
        size="mini"
        v-model="configure.cssStyle.strokeWidth"
      ></el-input-number>
    </configure-layout>
  </div>
</template>

<script>
import configureLayout from "../../../common/layout/configureLayout.vue";
import vectorTwo from "../../../common/controller/vectorTwo.vue";
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
