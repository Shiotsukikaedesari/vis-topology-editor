<template>
  <g
    tabindex="0"
    class="vis-node"
    :class="{
      'connector-hover': configure.connector.hover && !dragging,
      'vis-node-acitve': active,
      'vis-node-edit': edit,
    }"
    :width="size.width"
    :height="size.height"
    :transform="`translate(${position.x}, ${position.y})rotate(${rotate}, ${anchor.x} ${anchor.y})`"
    @mousedown.stop="mousedown"
    @dblclick="dblclick"
  >
    <component :is="framework.shape" :size="size" v-bind="shape"></component>

    <image
      v-if="configure.backgroundImage"
      :width="size.width"
      :height="size.height"
      :href="configure.backgroundImage"
    ></image>

    <g class="icon" aria-hidden="true" v-if="configure.icon">
      <use :width="size.width" :height="size.height" :xlink:href="configure.icon"></use>
    </g>

    <component :is="framework.widget" :size="size" v-bind="widget"></component>

    <component
      v-for="item in connector"
      :key="item.interface"
      :class="{ 'connector-transparent': configure.connector.hover }"
      :ref="item.interface"
      :is="item.component"
      :node="{
        id,
        position,
        size,
      }"
      v-bind="item"
    ></component>
  </g>
</template>

<script>
import svg from "../../mixins/svg";
import node from "../../mixins/node";
import dev from "../../mixins/dev";

import { components as shapeComponents } from "./shape";
import { components as connectorComponents } from "./connector";
import { components as widgetComponents } from "./widget";
export default {
  name: "node",
  mixins: [svg, node, dev],
  components: {
    ...shapeComponents,
    ...connectorComponents,
    ...widgetComponents,
  },
  props: {
    framework: {
      type: Object,
      default: () => {
        return {
          shape: "rectShape",
          widget: "",
          connector: "single",
        };
      },
    },
    translate: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
        };
      },
    },
    rotate: {
      type: Number,
      default: 0,
    },
    anchor: {
      type: Object,
      default: () => {
        return {
          x: 25,
          y: 25,
        };
      },
    },
    size: {
      type: Object,
      default: () => {
        return {
          width: 50,
          height: 50,
        };
      },
    },
    configure: {
      type: Object,
      default: () => {
        return {
          connector: { hover: true },
          backgroundImage: "",
          icon: "",
        };
      },
    },
    widget: {
      type: Object,
    },
    shape: {
      type: Object,
    },
    connector: {
      type: Array,
      // default: () => {
      //   return [
      //     {
      //       interface: "p1",
      //       direction: { x: 0, y: 0 },
      //       component: "circleShape",
      //       size: {
      //         width: 5,
      //         height: 5,
      //       },
      //       translate: {
      //         x: 0.5,
      //         y: 0.5,
      //       },
      //       offset: {
      //         x: 0,
      //         y: 0,
      //       },
      //       cssStyle: {
      //         fill: "white",
      //         stroke: "blue",
      //         strokeWidth: 1,
      //         cursor: "crosshair",
      //       },
      //     },
      //   ];
      // },
    },
    // 链接线配置
    line: {
      type: Object,
      default: () => {
        return {
          framework: {
            shape: "linear",
            markerStart: "",
            markerMid: "textWidget",
            markerEnd: "arrowWidget",
          },
          shape: {},
          markerStart: {},
          markerMid: {},
          markerEnd: {},
          connective: {}, // 连线的信息
        };
      },
    },
  },

  data() {
    return {
      dragging: false, // 拖拽标识
      edit: false, // 编辑标识
      // 鼠标位置差值
      dragStartPointer: {
        x: 0,
        y: 0,
      },
      // translate缓存
      cacheTranslate: {
        x: 0,
        y: 0,
      },
    };
  },

  computed: {
    position() {
      return {
        x: this.translate.x - this.anchor.x,
        y: this.translate.y - this.anchor.y,
      };
    },
    canvas() {
      return this.$store.getters["canvas/canvas"];
    },
    active() {
      return this.$store.getters["active/node"].id === this.id;
    },
  },

  methods: {
    dblclick() {
      this.edit = true;
      const mousedownFun = () => {
        this.edit = false;
        document.body.removeEventListener("mousedown", mousedownFun);
      };
      document.body.addEventListener("mousedown", mousedownFun);
    },
    mousedown(event) {
      if (this.edit) {
        return false;
      }

      this.$store.commit("active/clear");
      this.$store.commit("controls/transformNode", this.id);
      this.$store.commit("active/setNode", this.id);

      this.dragging = true;

      const dragStartPointer = this.dragStartPointer;
      const cacheTranslate = this.cacheTranslate;
      const translate = this.translate;
      const canvas = this.canvas;

      cacheTranslate.x = this.translate.x;
      cacheTranslate.y = this.translate.y;

      dragStartPointer.x = event.clientX;
      dragStartPointer.y = event.clientY;

      const canvasScale = this.$store.getters["canvas/scale"];

      // 设置吸附所需对象
      this.$store.commit("adsorb/setCurrentNode", this.id);

      const mousemoveFun = (event) => {
        translate.x =
          cacheTranslate.x + Math.round((event.clientX - dragStartPointer.x) * canvasScale);
        translate.y =
          cacheTranslate.y + Math.round((event.clientY - dragStartPointer.y) * canvasScale);
        // 执行节点吸附
        this.$store.commit("adsorb/executeNodeAdsorb");
      };

      const mouseupFun = () => {
        this.dragging = false;
        // 更新吸附节点信息
        this.$store.commit("adsorb/updateNode", this.id);
        canvas.removeEventListener("mousemove", mousemoveFun);
        canvas.removeEventListener("mouseup", mouseupFun);
      };

      canvas.addEventListener("mousemove", mousemoveFun);
      canvas.addEventListener("mouseup", mouseupFun);
    },
  },
};
</script>

<style lang="less" scoped>
.vis-node {
  cursor: move;
  transition: filter ease 150ms;
  &:hover {
    filter: drop-shadow(0 0 6px rgb(0, 197, 241));
  }
}

.vis-node-acitve {
  filter: drop-shadow(0 0 6px rgb(196, 2, 255)) !important;
}

.vis-node-edit {
  filter: drop-shadow(0 0 6px rgb(255, 165, 30)) !important;
}

.connector-transparent {
  opacity: 0;
  transition: opacity ease 300ms;
}

.connector-hover {
  &:hover .connector-transparent {
    opacity: 1;
  }
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
