<template>
  <div class="topNavView-container">
    <left-part></left-part>
    <middle-part></middle-part>
    <right-part></right-part>
  </div>
</template>

<script>
const rightPart = () => import("./topNav/rightPart.vue");
const middlePart = () => import("./topNav/middlePart.vue");
const leftPart = () => import("./topNav/leftPart.vue");
export default {
  components: {
    leftPart,
    rightPart,
    middlePart,
  },
};
</script>

<style lang="less" scoped>
.topNavView-container {
  width: 100%;
  height: 100%;
  display: flex;
  > div {
    display: flex;
    align-items: center;
  }
}
</style>
