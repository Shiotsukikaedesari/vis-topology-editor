<template>
  <g v-if="message.distance">
    <defs>
      <marker
        :id="id"
        :markerWidth="message.textLength"
        :markerHeight="fontSize * 1.5"
        markerUnits="userSpaceOnUse"
        :viewBox="`${-message.textLength / 2} ${-fontSize / 2} ${message.textLength} ${
          fontSize * 1.5
        }`"
        :refX="0"
        :refY="0"
        orient="0"
      >
        <text
          :x="-message.textLength / 2"
          :y="fontSize / 2"
          :font-size="fontSize"
          :style="textStyle"
          :textLength="message.textLength"
        >
          {{ `${message.distance}px` }}
        </text>
      </marker>
    </defs>
    <path
      :d="`M ${message.start.x} ${message.start.y} L ${message.middle.x} ${message.middle.y} L ${message.end.x} ${message.end.y}`"
      :style="lineStyle"
      :marker-mid="`url(#${id})`"
    ></path>
    text
  </g>
</template>

<script>
import { v4 as getUuid } from "uuid";
export default {
  props: {
    start: {
      type: Object,
      default: () => {
        return {
          node: "", // id
          axis: "", // x y
          marker: "", // start middle end
        };
      },
    },
    end: {
      type: Object,
      default: () => {
        return {
          node: "", // id
          axis: "", // x y
          marker: "", // start middle end
        };
      },
    },
  },
  data() {
    return {
      fontSize: 12,
      textStyle: {
        fill: "rgb(235, 67, 255)",
        filter: "drop-shadow(0 0 3px rgb(255, 255, 255))",
      },
      lineStyle: {
        stroke: "rgb(235, 67, 255)",
        strokeWidth: 1,
      },
      id: getUuid(),
    };
  },
  computed: {
    message() {
      const start = this.start;
      const end = this.end;
      const axis = start.axis;
      const otherAxis = axis === "x" ? "y" : "x";

      const startBoudningBox = this.getBoundingBox(start.node);
      const endBoudningBox = this.getBoundingBox(end.node);

      let distance = 0;
      let startMessage = {
        [axis]: startBoudningBox[axis][start.marker],
        [otherAxis]: 0,
      };
      let endMessage = {
        [axis]: endBoudningBox[axis][end.marker],
        [otherAxis]: 0,
      };
      // 判断另一个轴有无空隙
      if (startBoudningBox[otherAxis].end <= endBoudningBox[otherAxis].start) {
        distance = Math.abs(endBoudningBox[otherAxis].start - startBoudningBox[otherAxis].end);
        startMessage[otherAxis] = startBoudningBox[otherAxis].end;
        endMessage[otherAxis] = endBoudningBox[otherAxis].start;
      } else if (startBoudningBox[otherAxis].start >= endBoudningBox[otherAxis].end) {
        distance = Math.abs(startBoudningBox[otherAxis].start - endBoudningBox[otherAxis].end);
        startMessage[otherAxis] = startBoudningBox[otherAxis].start;
        endMessage[otherAxis] = endBoudningBox[otherAxis].end;
      }

      return {
        start: startMessage,
        middle: {
          x: startMessage.x + (endMessage.x - startMessage.x) / 2,
          y: startMessage.y + (endMessage.y - startMessage.y) / 2,
        },
        end: endMessage,
        distance,
        textLength: distance.toString().length + 2 * this.fontSize * 1.2,
      };
    },
  },

  methods: {
    getBoundingBox(node) {
      const component = this.$store.getters["component/getNode"](node);
      const position = component.position;
      const size = component.size;
      return {
        x: {
          start: position.x,
          middle: position.x + size.width / 2,
          end: position.x + size.width,
        },
        y: {
          start: position.y,
          middle: position.y + size.height / 2,
          end: position.y + size.height,
        },
      };
    },
  },

  created() {},
};
</script>

<style lang="less" scoped></style>
