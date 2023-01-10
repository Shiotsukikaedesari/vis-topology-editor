<template>
  <div class="canvasView-container" ref="container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="svg-container"
      tabindex="0"
      :viewBox="`${canvasOffset.x} ${canvasOffset.y} ${width * canvasScale} ${
        height * canvasScale
      }`"
      :width="width"
      :height="height"
      ref="svgCanvas"
    >
      <!-- stage -->
      <stage :size="stageSize" :translate="$store.getters['stage/translate']"></stage>

      <!-- line -->
      <connect-line
        v-for="item in lines"
        :key="item.id"
        :is="item.component"
        v-bind="item"
      ></connect-line>

      <!-- node -->
      <node :ref="item.id" v-for="item in nodes" :key="item.id" v-bind="item"></node>

      <!-- helper -->
      <node-spacing
        v-for="(item, index) in helperStructure"
        :key="index"
        :start="item.start"
        :end="item.end"
      ></node-spacing>

      <transfrom-controls
        ref="transformControls"
        v-if="dev"
        :show="transformControls.show"
        :target="transformControls"
      ></transfrom-controls>

      <selection-box v-if="dev"></selection-box>
    </svg>
  </div>
</template>

<script>
import selectionBox from "../components/interactive/selectionBox.vue";
import transfromControls from "../components/controls/transformControls.vue";
import node from "../components/node/node.vue";
import connectLine from "../components/line/connectLine.vue";
import stage from "../components/helper/stage.vue";

import nodeSpacing from "../components/helper/nodeSpacing.vue";
export default {
  components: {
    selectionBox,
    transfromControls,
    node,
    connectLine,
    stage,
    nodeSpacing,
  },
  data() {
    return {
      width: 0,
      height: 0,
      stageSafeDistance: 50,
    };
  },
  computed: {
    dev() {
      return this.$store.getters.mode === "dev";
    },
    nodes() {
      return this.$store.getters["structure/nodes"];
    },
    connectors() {
      return this.$store.getters["structure/connectors"];
    },
    lines() {
      return this.$store.getters["structure/lines"];
    },
    transformControls() {
      return this.$store.getters["controls/transform"];
    },

    stageSize() {
      return this.$store.getters["stage/size"];
    },

    canvasOffset() {
      return this.$store.getters["canvas/offset"];
    },
    canvasScale() {
      return this.$store.getters["canvas/scale"];
    },

    helperStructure() {
      return this.dev ? this.$store.getters["adsorb/structure"] : [];
    },
  },
  methods: {
    resize() {
      const container = this.$refs.container;
      this.width = container.offsetWidth;
      this.height = container.offsetHeight;
      this.$nextTick(() => {
        const canvas = this.$refs.svgCanvas;
        // 舞台根据canvas大小居中显示
        const boudingBox = canvas.getBoundingClientRect();
        let offsetX = this.stageSafeDistance;
        let offsetY = this.stageSafeDistance;
        if (this.stageSize.width < boudingBox.width) {
          offsetX = (boudingBox.width - this.stageSize.width) / 2;
        }
        if (this.stageSize.height < boudingBox.height) {
          offsetY = (boudingBox.height - this.stageSize.height) / 2;
        }

        this.$store.commit("stage/setTranslate", {
          x: offsetX,
          y: offsetY,
        });
      });
    },
  },

  mounted() {
    // 窗口事件
    this.resize();
    window.addEventListener("resize", this.resize);

    // 缓存组件
    this.$store.commit("component/setCanvas", this);

    // 初始画布事件
    const canvas = this.$refs.svgCanvas;
    canvas.addEventListener("click", () => {
      if (this.$refs.transformControls.changed) {
        this.$refs.transformControls.changed = false;
        return false;
      }
      this.$store.commit("controls/resetTransform");
      this.$store.commit("active/clear");
    });

    const canvasOffset = this.canvasOffset;

    canvas.addEventListener("mousewheel", (event) => {
      // 滚动
      if (!event.altKey) {
        let distance = canvasOffset.y + event.deltaY;
        distance < 0 && (distance = 0);
        distance > this.height * 2 && (distance = this.height * 2);
        this.$store.commit("canvas/setOffset", {
          y: distance,
        });
      } else {
        // 缩放
        // 根据鼠标位置缩放 需要移动offset
        let scale = this.canvasScale + Math.sign(event.deltaY) * 0.1;
        scale <= 0.1 && (scale = 0.1);
        scale > 5 && (scale = 5);
        this.$store.commit("canvas/setOffset", {
          x: canvasOffset.x + event.offsetX * this.canvasScale - event.offsetX * scale,
          y: canvasOffset.y + event.offsetY * this.canvasScale - event.offsetY * scale,
        });
        this.$store.commit("canvas/setScale", scale);
      }
    });

    const dragStartPointer = { x: 0, y: 0 };
    let cacheCanvasOffset = { x: 0, y: 0 };

    const canvasDragStartFun = (event) => {
      canvas.style.cursor = "grabbing";
      dragStartPointer.x = event.clientX;
      dragStartPointer.y = event.clientY;
      cacheCanvasOffset = { ...canvasOffset };
      canvas.addEventListener("mousemove", canvasDraggingFun);
    };

    const canvasDraggingFun = (event) => {
      this.$store.commit("canvas/setOffset", {
        x: cacheCanvasOffset.x - (event.clientX - dragStartPointer.x),
        y: cacheCanvasOffset.y - (event.clientY - dragStartPointer.y),
      });
    };

    const canvasDragStopFun = () => {
      canvas.style.cursor = "grab";
      canvas.removeEventListener("mousemove", canvasDraggingFun);
    };

    canvas.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.repeat) {
        return false;
      }
      // 空格移动画布
      if (event.keyCode === 32) {
        canvas.style.cursor = "grab";
        canvas.addEventListener("mousedown", canvasDragStartFun);
        canvas.addEventListener("mouseup", canvasDragStopFun);
      }
    });

    canvas.addEventListener("keyup", (event) => {
      // 空格移动画布
      if (event.keyCode === 32) {
        canvas.style.cursor = "unset";
        canvas.removeEventListener("mousedown", canvasDragStartFun);
        canvas.removeEventListener("mousemove", canvasDraggingFun);
        canvas.removeEventListener("mouseup", canvasDragStopFun);
      }
    });

    this.$store.commit("canvas/setCanvas", canvas);
  },
};
</script>

<style lang="less" scoped>
.canvasView-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.svg-container {
  // background-image: linear-gradient(
  //     to right,
  //     rgba(0, 0, 0, 0.15) 10%,
  //     rgba(0, 0, 0, 0) 10%
  //   ),
  //   linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  // background-size: 10px 10px;
  background-color: rgb(228, 228, 228);
}

.svg-helper {
  pointer-events: none;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
