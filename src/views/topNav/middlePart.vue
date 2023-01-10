<template>
  <div class="middle-part">
    <el-tooltip effect="dark" content="重置画布" placement="bottom">
      <el-button
        @click="resetCanvas"
        size="small"
        icon="el-icon-refresh"
        circle
        title=""
      ></el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="画布尺寸" placement="bottom">
      <span>
        <i class="el-icon-full-screen" style="margin-right: 5px"></i>
        <el-input-number
          :precision="0"
          size="mini"
          v-model="stageSize.width"
          :controls="false"
        ></el-input-number>
        x
        <el-input-number
          :precision="0"
          size="mini"
          v-model="stageSize.height"
          :controls="false"
        ></el-input-number>
      </span>
    </el-tooltip>
    <el-tooltip effect="dark" content="画布缩放" placement="bottom">
      <span>
        <i class="el-icon-sort" style="margin-right: 5px"></i>
        <el-input-number
          :precision="2"
          size="mini"
          v-model="canvasScale"
          :controls="false"
        ></el-input-number>
      </span>
    </el-tooltip>
    <el-tooltip effect="dark" content="吸附" placement="bottom">
      <span>
        <i class="el-icon-attract" style="margin-right: 5px"></i>
        <el-switch v-model="adsorbStatus"></el-switch>
      </span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  computed: {
    canvasScale: {
      get() {
        return this.$store.getters["canvas/scale"];
      },
      set(value) {
        this.$store.commit("canvas/setScale", value);
      },
    },
    stageSize() {
      return this.$store.getters["stage/size"];
    },
    adsorbStatus: {
      get() {
        return this.$store.getters["adsorb/status"];
      },
      set(value) {
        this.$store.commit("adsorb/setStatus", value);
      },
    },
  },
  methods: {
    resetCanvas() {
      this.$store.commit("canvas/setOffset", {
        x: 0,
        y: 0,
      });
      this.$store.commit("canvas/setScale", 1);
    },
  },
};
</script>

<style lang="less" scoped>
.middle-part {
  width: 50%;
  min-width: 465px;
  height: 100%;
  justify-content: center;
  > * {
    margin: 0 12px;
    display: flex;
    align-items: center;
  }
}
</style>
