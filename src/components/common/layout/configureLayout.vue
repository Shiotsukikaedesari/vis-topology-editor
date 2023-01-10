<template>
  <div
    class="configureLayout-container"
    :style="{
      'flex-direction': layout === 'h' ? 'row' : 'column',
      'align-items': layout === 'h' ? 'center' : 'flex-start',
    }"
  >
    <div class="configure-title" :title="title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="configure-controller">
      <slot name="controller"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "配置控件",
    },
    layout: {
      type: String,
      default: "h",
    },
  },
};
</script>

<style lang="less" scoped>
.configureLayout-container {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}

.configure-title {
  width: 4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
}
</style>
