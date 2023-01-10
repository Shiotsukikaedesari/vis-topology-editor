<template>
  <div class="textWidgetController-container">
    <configure-layout title="尺寸">
      <vector-two
        slot="controller"
        :configure="configure.configure.size"
        :x="'width'"
        :y="'height'"
      ></vector-two>
    </configure-layout>
    <configure-layout title="偏移量">
      <vector-two slot="controller" :configure="configure.configure.ref"></vector-two>
    </configure-layout>
    <configure-layout title="内容">
      <el-input slot="controller" size="mini" v-model="configure.configure.value"></el-input>
    </configure-layout>
    <configure-layout title="文本长度">
      <el-input-number
        slot="controller"
        size="mini"
        v-model="configure.configure.textLength"
      ></el-input-number>
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

    <configure-layout title="内边距">
      <el-input-number
        slot="controller"
        size="mini"
        v-model="configure.cssStyle.padding"
      ></el-input-number>
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
  created() {
    console.log(this.configure);
  },
};
</script>

<style lang="less" scoped></style>
