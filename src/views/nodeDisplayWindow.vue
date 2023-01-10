<template>
  <div
    class="display-window-container"
    :style="{ width: `${width}px`, height: `${height}px` }"
    @mousedown="(event) => dragStart(event, structure)"
  >
    <svg :width="width" :height="height" style="pointer-events: none">
      <component
        :is="structure.component"
        use="display"
        :translate="displayPosition"
        v-bind="structure"
      ></component>
    </svg>
  </div>
</template>

<script>
import Vue from "vue";
import node from "../components/node/node.vue";
import { v4 as getUuid } from "uuid";

export default {
  components: {
    node,
  },
  props: {
    width: {
      type: Number,
      default: 50,
    },
    height: {
      type: Number,
      default: 50,
    },
    structure: {
      type: Object,
    },
  },

  data() {
    return {};
  },

  computed: {
    displayPosition() {
      return {
        x: this.width / 2,
        y: this.height / 2,
      };
    },
  },
  methods: {
    dragStart(event, structure) {
      const newStructure = Vue.observable(JSON.parse(JSON.stringify(structure)));

      newStructure.id = getUuid();
      newStructure.translate.x = -100;
      newStructure.translate.y = -100;

      const canvas = this.$store.getters["canvas/canvas"];
      const canvasScale = this.$store.getters["canvas/scale"];
      const canvasOffset = this.$store.getters["canvas/offset"];

      const dragStartPointer = { x: 0, y: 0 };
      let cacheTranslate = { x: 0, y: 0 };
      const mouseenterFun = (event) => {
        dragStartPointer.x = event.clientX;
        dragStartPointer.y = event.clientY;
        cacheTranslate.x = Math.round(event.offsetX * canvasScale) + canvasOffset.x;
        cacheTranslate.y = Math.round(event.offsetY * canvasScale) + canvasOffset.y;
        this.$store.commit("structure/addNode", newStructure);
        this.$store.commit("active/clear");
        this.$store.commit("active/setNode", newStructure.id);
        this.$store.commit("controls/transformNode", newStructure.id);
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.$store.commit("adsorb/setCurrentNode", newStructure.id);
          });
        });
      };

      const mousemoveFun = (event) => {
        event.stopPropagation();
        newStructure.translate.x =
          cacheTranslate.x + Math.round((event.clientX - dragStartPointer.x) * canvasScale) - 10; //避免中心
        newStructure.translate.y =
          cacheTranslate.y + Math.round((event.clientY - dragStartPointer.y) * canvasScale) - 10; //避免中心
        // 执行节点吸附
        this.$store.commit("adsorb/executeNodeAdsorb");
      };

      const mouseupFun = () => {
        // 更新吸附节点信息
        this.$store.commit("adsorb/updateNode", newStructure.id);
        canvas.removeEventListener("mouseenter", mouseenterFun);
        canvas.removeEventListener("mousemove", mousemoveFun);
        document.body.removeEventListener("mouseup", mouseupFun);
      };

      canvas.addEventListener("mouseenter", mouseenterFun);
      canvas.addEventListener("mousemove", mousemoveFun);
      document.body.addEventListener("mouseup", mouseupFun);
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.display-window-container {
  cursor: pointer;
}
</style>
