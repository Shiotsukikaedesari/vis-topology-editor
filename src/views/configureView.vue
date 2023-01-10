<template>
  <div class="configure-container">
    <component :is="currentActive"></component>
  </div>
</template>

<script>
const nodeConfigure = () => import("./nodeConfigure.vue");
const lineConfigure = () => import("./lineConfigure.vue");
export default {
  components: {
    nodeConfigure,
    lineConfigure,
  },
  computed: {
    currentActive() {
      const currentActive =
        this.$store.getters["active/node"] || this.$store.getters["active/line"];

      if (currentActive?.component === "node") {
        return "nodeConfigure";
      } else if (currentActive?.component === "connectLine") {
        return "lineConfigure";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.configure-container {
  height: 100%;
  overflow: auto;
  padding: 0 4px;
}
</style>
