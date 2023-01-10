<template>
  <g v-show="show">
    <!-- 旋转 -->
    <!-- 四角变换 -->
    <rect
      style="cursor: nw-resize"
      :width="scaleNodeSize.width"
      :height="scaleNodeSize.height"
      :style="nodeStyle"
      :transform="`translate(${leftTop.x}, ${leftTop.y})`"
      @mousedown.stop="leftTopHandler"
    ></rect>
    <rect
      style="cursor: ne-resize"
      :width="scaleNodeSize.width"
      :height="scaleNodeSize.height"
      :style="nodeStyle"
      :transform="`translate(${rightBottom.x}, ${leftTop.y})`"
      @mousedown.stop="rightTopHandler"
    ></rect>
    <rect
      style="cursor: se-resize"
      :width="scaleNodeSize.width"
      :height="scaleNodeSize.height"
      :style="nodeStyle"
      :transform="`translate(${rightBottom.x}, ${rightBottom.y})`"
      @mousedown.stop="rightBottomHandler"
    ></rect>
    <rect
      style="cursor: sw-resize"
      :width="scaleNodeSize.width"
      :height="scaleNodeSize.height"
      :style="nodeStyle"
      :transform="`translate(${leftTop.x}, ${rightBottom.y})`"
      @mousedown.stop="leftBottomHandler"
    ></rect>
    <!-- 锚点 -->
  </g>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    target: {
      type: Object,
      default: () => {
        return {
          node: "",
          translate: { x: 50, y: 50 },
          scale: { x: 1, y: 1 },
          rotate: 0,
          anchor: { x: 25, y: 25 },
          size: { width: 50, height: 50 },
        };
      },
    },
  },
  data() {
    return {
      nodeStyle: {
        stroke: "#0F9BFF",
        strokeWidth: 1,
        fill: "white",
        shapeRendering: "crispEdges",
      },
      maskStyle: {
        stroke: "#1584FC",
        strokeWidth: 2,
        fill: "transparent",
        cursor: "move",
      },
      dragging: false,
      changed: false,
    };
  },
  computed: {
    position() {
      return {
        x: this.target.translate.x - this.target.anchor.x,
        y: this.target.translate.y - this.target.anchor.y,
      };
    },
    halfScaleNodeSize() {
      return {
        width: this.scaleNodeSize.width / 2,
        height: this.scaleNodeSize.height / 2,
      };
    },
    leftTop() {
      return {
        x: this.position.x - this.halfScaleNodeSize.width,
        y: this.position.y - this.halfScaleNodeSize.height,
      };
    },
    rightBottom() {
      return {
        x: this.position.x - this.halfScaleNodeSize.width + this.target.size.width,
        y: this.position.y - this.halfScaleNodeSize.height + this.target.size.height,
      };
    },
    canvas() {
      return this.$store.getters["canvas/canvas"];
    },
    canvasScale() {
      return this.$store.getters["canvas/scale"];
    },

    scaleNodeSize() {
      let size = 10 * this.canvasScale;
      size < 5 && (size = 5);
      return {
        width: size,
        height: size,
      };
    },
  },
  methods: {
    // 左上角
    leftTopHandler(event) {
      const dragStartPointer = {
        x: event.clientX,
        y: event.clientY,
      };

      const cacheSize = { ...this.target.size };
      const cacheTranslate = { ...this.target.translate };

      const canvasScale = this.canvasScale;

      const targetSize = this.target.size;
      const targetTranslate = this.target.translate;

      let diffx = 0;
      let diffY = 0;
      // 设置吸附所需对象
      this.$store.commit("adsorb/setCurrentNode", this.target.node);
      const mousemoveFun = (event) => {
        diffx = Math.round((event.clientX - dragStartPointer.x) * canvasScale);
        diffY = Math.round((event.clientY - dragStartPointer.y) * canvasScale);

        // 不能小于0
        if (cacheSize.width - 5 < diffx) {
          diffx = cacheSize.width - 5;
        }

        if (cacheSize.height - 5 < diffY) {
          diffY = cacheSize.height - 5;
        }

        targetSize.width = cacheSize.width - diffx;
        targetSize.height = cacheSize.height - diffY;

        targetTranslate.x = cacheTranslate.x + diffx;
        targetTranslate.y = cacheTranslate.y + diffY;
      };

      const mouseup = () => {
        // 更新吸附节点信息
        this.$store.commit("adsorb/updateNode", this.target.node);
        document.body.removeEventListener("mousemove", mousemoveFun);
        document.body.removeEventListener("mouseup", mouseup);
      };

      document.body.addEventListener("mousemove", mousemoveFun);
      document.body.addEventListener("mouseup", mouseup);
      // 阻止画布的清空事件
      this.changed = true;
    },
    // 右上
    rightTopHandler(event) {
      const dragStartPointer = {
        x: event.clientX,
        y: event.clientY,
      };

      const cacheSize = { ...this.target.size };
      const cacheTranslate = { ...this.target.translate };

      const canvasScale = this.canvasScale;

      const targetSize = this.target.size;
      const targetTranslate = this.target.translate;

      let diffx = 0;
      let diffY = 0;
      // 设置吸附所需对象
      this.$store.commit("adsorb/setCurrentNode", this.target.node);
      const mousemoveFun = (event) => {
        diffx = Math.round((event.clientX - dragStartPointer.x) * canvasScale);
        diffY = Math.round((event.clientY - dragStartPointer.y) * canvasScale);

        // 不能小于0
        if (cacheSize.width + diffx < 5) {
          diffx = 5 - cacheSize.width;
        }

        if (cacheSize.height - 5 < diffY) {
          diffY = cacheSize.height - 5;
        }

        targetSize.width = cacheSize.width + diffx;
        targetSize.height = cacheSize.height - diffY;

        targetTranslate.y = cacheTranslate.y + diffY;
      };

      const mouseup = () => {
        // 更新吸附节点信息
        this.$store.commit("adsorb/updateNode", this.target.node);
        document.body.removeEventListener("mousemove", mousemoveFun);
        document.body.removeEventListener("mouseup", mouseup);
      };

      document.body.addEventListener("mousemove", mousemoveFun);
      document.body.addEventListener("mouseup", mouseup);
      // 阻止画布的清空事件
      this.changed = true;
    },
    // 右下角
    rightBottomHandler(event) {
      const dragStartPointer = {
        x: event.clientX,
        y: event.clientY,
      };

      const cacheSize = { ...this.target.size };

      const canvasScale = this.canvasScale;

      const targetSize = this.target.size;

      // 设置吸附所需对象
      this.$store.commit("adsorb/setCurrentNode", this.target.node);
      const mousemoveFun = (event) => {
        targetSize.width =
          cacheSize.width + Math.round((event.clientX - dragStartPointer.x) * canvasScale);
        targetSize.height =
          cacheSize.height + Math.round((event.clientY - dragStartPointer.y) * canvasScale);
        // 不能小于0
        targetSize.width < 5 && (targetSize.width = 5);
        targetSize.height < 5 && (targetSize.height = 5);
        // 执行节点吸附
        // this.$store.commit("adsorb/executeNodeAdsorb");
      };

      const mouseup = () => {
        // 更新吸附节点信息
        this.$store.commit("adsorb/updateNode", this.target.node);
        // 更新吸附节点信息
        this.$store.commit("adsorb/updateNode", this.target.node);
        document.body.removeEventListener("mousemove", mousemoveFun);
        document.body.removeEventListener("mouseup", mouseup);
      };

      document.body.addEventListener("mousemove", mousemoveFun);
      document.body.addEventListener("mouseup", mouseup);
      // 阻止画布的清空事件
      this.changed = true;
    },
    // 左下
    leftBottomHandler(event) {
      const dragStartPointer = {
        x: event.clientX,
        y: event.clientY,
      };

      const cacheSize = { ...this.target.size };
      const cacheTranslate = { ...this.target.translate };

      const canvasScale = this.canvasScale;

      const targetSize = this.target.size;
      const targetTranslate = this.target.translate;

      let diffx = 0;
      let diffY = 0;
      // 设置吸附所需对象
      this.$store.commit("adsorb/setCurrentNode", this.target.node);
      const mousemoveFun = (event) => {
        diffx = Math.round((event.clientX - dragStartPointer.x) * canvasScale);
        diffY = Math.round((event.clientY - dragStartPointer.y) * canvasScale);

        // 不能小于0
        if (cacheSize.width - 5 < diffx) {
          diffx = cacheSize.width - 5;
        }

        if (cacheSize.height + diffY < 5) {
          diffY = 5 - cacheSize.height;
        }

        targetSize.width = cacheSize.width - diffx;
        targetSize.height = cacheSize.height + diffY;

        targetTranslate.x = cacheTranslate.x + diffx;
      };

      const mouseup = () => {
        // 更新吸附节点信息
        this.$store.commit("adsorb/updateNode", this.target.node);
        document.body.removeEventListener("mousemove", mousemoveFun);
        document.body.removeEventListener("mouseup", mouseup);
      };

      document.body.addEventListener("mousemove", mousemoveFun);
      document.body.addEventListener("mouseup", mouseup);
      // 阻止画布的清空事件
      this.changed = true;
    },
  },
};
</script>

<style lang="less" scoped></style>
