<template>
  <div class="objectView-container">
    <el-collapse v-model="active">
      <el-collapse-item
        v-for="item in themeMenu"
        :key="item.name"
        :title="item.label"
        :name="item.name"
      >
        <node-display-window
          v-for="inventory in item.inventory"
          :key="inventory.name"
          :width="windowWidth"
          :height="windowHeight"
          :structure="inventory.structure"
        ></node-display-window>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import nodeDisplayWindow from "./nodeDisplayWindow.vue";
import { themeMenu } from "../components/node";

export default {
  components: {
    nodeDisplayWindow,
  },
  data() {
    const active = themeMenu.map((item) => item.name);
    return {
      active,
      windowWidth: 100,
      windowHeight: 80,
      themeMenu,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.objectView-container {
  width: 100%;
  height: 100%;
}

/deep/ .el-collapse {
  .el-collapse-item__content {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
