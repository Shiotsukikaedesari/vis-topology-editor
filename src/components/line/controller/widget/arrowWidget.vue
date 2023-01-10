<template>
  <div class="linearShapeController-container">
    <configure-layout title="尺寸">
      <vector-two
        slot="controller"
        :configure="configure.configure.size"
        :x="'width'"
        :y="'height'"
      ></vector-two>
    </configure-layout>
    <configure-layout title="尾部">
      <el-input-number
        slot="controller"
        :precision="0"
        size="mini"
        v-model="configure.configure.tail"
      ></el-input-number>
    </configure-layout>
    <configure-layout title="偏移量">
      <vector-two slot="controller" :configure="configure.configure.ref"></vector-two>
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
