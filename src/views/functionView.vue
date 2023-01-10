<template>
  <div class="functionView-container">
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="配置" name="configure">
        <configure-view></configure-view>
      </el-tab-pane>
      <el-tab-pane label="交互" name="second">交互管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const configureView = () => import("./configureView.vue");
export default {
  components: { configureView },
  data() {
    return {
      active: "configure",
    };
  },
};
</script>

<style lang="less" scoped>
.functionView-container {
  width: 100%;
  height: 100%;
}
/deep/ .el-tabs {
  height: 100%;
  .el-tabs__content {
    height: calc(100% - 56px);
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
