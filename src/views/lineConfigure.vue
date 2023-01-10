<template>
  <div class="line-configure">
    <el-collapse v-model="activeName">
      <el-collapse-item title="线条配置" name="line"></el-collapse-item>
      <el-collapse-item title="形状配置" name="shape" v-if="activeLine.framework.shape">
        <component :is="activeLine.framework.shape" :configure="activeLine.shape"></component>
      </el-collapse-item>

      <el-collapse-item title="头部配置" name="markerStart" v-if="activeLine.framework.markerStart">
        <component
          :is="activeLine.framework.markerStart"
          :configure="activeLine.markerStart"
        ></component>
      </el-collapse-item>

      <el-collapse-item title="中部配置" name="markerMid" v-if="activeLine.framework.markerMid">
        <component
          :is="activeLine.framework.markerMid"
          :configure="activeLine.markerMid"
        ></component>
      </el-collapse-item>

      <el-collapse-item title="尾部配置" name="markerEnd" v-if="activeLine.framework.markerEnd">
        <component
          :is="activeLine.framework.markerEnd"
          :configure="activeLine.markerEnd"
        ></component>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { components as shapeControllers } from "../components/line/controller/shape/index";
import { components as widgetControllers } from "../components/line/controller/widget/index";

export default {
  components: {
    ...shapeControllers,
    ...widgetControllers,
  },
  data() {
    return {
      activeName: ["line", "shape", "markerStart", "markerMid", "markerEnd"],
    };
  },
  computed: {
    activeLine() {
      return this.$store.getters["active/line"];
    },
  },
};
</script>

<style lang="less" scoped></style>
