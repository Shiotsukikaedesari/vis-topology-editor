<template>
  <foreignObject :width="size.width" :height="size.height">
    <div class="from-box">
      <div
        v-if="!edit"
        :style="cssStyle"
        class="display"
        @dblclick="
          () => {
            edit = true;
          }
        "
        v-text="configure.value || configure.placeholder"
      ></div>
      <textarea
        v-else
        :style="cssStyle"
        :placeholder="configure.placeholder"
        v-model="configure.value"
        @blur="
          () => {
            edit = false;
          }
        "
      ></textarea>
    </div>
  </foreignObject>
</template>

<script>
export default {
  name: "textAreaWidget",
  props: {
    size: {
      type: Object,
      required: true,
    },
    configure: {
      type: Object,
      default: () => {
        return {
          value: "",
          placeholder: "双击输入",
        };
      },
    },
    cssStyle: {
      type: Object,
      default: () => {
        return {
          width: "100%",
          height: "100%",
          border: "0",
          color: "black",
          fontSize: "12px",
          padding: "0",
        };
      },
    },
  },

  data() {
    return {
      edit: false,
    };
  },
};
</script>

<style lang="less" scoped>
textarea {
  user-select: none;
}

.from-box {
  width: 100%;
  height: 100%;
  position: relative;
}

.display {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
