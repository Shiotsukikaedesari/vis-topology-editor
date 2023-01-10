<template>
  <div class="node-configure">
    <el-collapse v-model="activeName">
      <el-collapse-item title="节点配置" name="node">
        <node-controller :configure="activeNode"></node-controller>
      </el-collapse-item>

      <el-collapse-item title="形状配置" name="shape" v-if="activeNode.framework.shape">
        <component :is="activeNode.framework.shape" :configure="activeNode.shape"></component>
      </el-collapse-item>

      <el-collapse-item title="装置配置" name="widget" v-if="activeNode.framework.widget">
        <component :is="activeNode.framework.widget" :configure="activeNode.widget"></component>
      </el-collapse-item>

      <el-collapse-item title="连接器配置" name="connector" v-if="activeNode.framework.connector">
        <component
          v-for="item in activeNode.connector"
          :key="item.interface"
          :is="item.component"
          :configure="item"
        ></component>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
const nodeController = () => import("../components/node/controller/node.vue");
import { components as shapeControllers } from "../components/node/controller/shape/index";
import { components as connectorControllers } from "../components/node/controller/connector/index";
import { components as widgetControllers } from "../components/node/controller/widget/index";
console.log(widgetControllers);
export default {
  components: {
    nodeController,
    ...shapeControllers,
    ...connectorControllers,
    ...widgetControllers,
  },
  data() {
    return {
      activeName: ["node", "shape", "widget", "connector"],
    };
  },
  computed: {
    activeNode() {
      return this.$store.getters["active/node"];
    },
  },
};
</script>

<style lang="less" scoped></style>
