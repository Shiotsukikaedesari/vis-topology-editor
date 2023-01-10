<template>
  <marker
    :id="`${id}textWidget`"
    :markerWidth="configure.size.width"
    :markerHeight="configure.size.height"
    markerUnits="userSpaceOnUse"
    :viewBox="`${-configure.size.width / 2} ${-configure.size.height / 2} ${configure.size.width} ${
      configure.size.height
    }`"
    :refX="configure.ref.x"
    :refY="configure.ref.y"
    orient="0"
  >
    <rect
      :width="configure.size.width"
      :height="configure.size.height"
      :style="shapeStyle"
      :transform="`translate(${-configure.size.width / 2}, ${-configure.size.height / 2})`"
    ></rect>
    <text
      :x="-configure.textLength / 2"
      :y="parseInt(cssStyle.fontSize) / 2"
      :font-size="cssStyle.fontSize"
      :style="textStyle"
      :textLength="configure.textLength"
    >
      {{ configure.value }}
    </text>
  </marker>
</template>

<script>
export default {
  name: "textWidget",
  props: {
    id: {
      type: String,
      required: true,
    },
    configure: {
      type: Object,
      default: () => {
        return {
          size: {
            width: 54,
            height: 18,
          },
          ref: {
            x: 0,
            y: 0,
          },
          value: "一段文本",
          textLength: 50,
        };
      },
    },
    cssStyle: {
      type: Object,
      default: () => {
        return {
          color: "rgba(255, 255, 255,1)",
          fontSize: "14px",
          fill: "rgba(15, 236, 182, 1)",
          stroke: "rgba(0, 0, 0, 1)",
          strokeWidth: 0,
          padding: 2,
        };
      },
    },
  },
  computed: {
    textStyle() {
      const cssStyle = this.cssStyle;
      return {
        fill: cssStyle.color,
        fontSize: cssStyle.fontSize,
      };
    },

    shapeStyle() {
      const cssStyle = this.cssStyle;
      return {
        fill: cssStyle.fill,
        stroke: cssStyle.stroke,
        strokeWidth: cssStyle.strokeWidth,
      };
    },
  },
};
</script>

<style lang="less" scoped></style>
