<template>
  <div class="app-container">
    <div class="top-nav">
      <top-nav-view></top-nav-view>
    </div>
    <div class="container-main">
      <div class="object-part">
        <object-view></object-view>
      </div>
      <div class="canvas-part">
        <canvas-view></canvas-view>
      </div>
      <div class="function-part">
        <function-view></function-view>
      </div>
    </div>
  </div>
</template>

<script>
import canvasView from "./views/canvasView.vue";
import objectView from "./views/objectView.vue";
import functionView from "./views/functionView.vue";
import topNavView from "./views/topNavView.vue";
export default {
  components: {
    canvasView,
    objectView,
    functionView,
    topNavView,
  },
  data() {
    return {
      key: "",
    };
  },
  beforeCreate() {
    // 动态加入图标
    this.axios.get("/icon/config.json").then((res) => {
      if (res.status === 200) {
        res.data.forEach((config) => {
          const baseURL = this.axios.defaults.baseURL;
          let js = document.createElement("script");
          js.src = `${baseURL}${config.js}`;
          let css = document.createElement("link");
          css.rel = "stylesheet";
          css.href = `${baseURL}${config.css}`;

          document.body.appendChild(js);
          document.head.appendChild(css);
        });
      } else {
        this.$message.error("请求错误！");
      }
    });
  },
  mounted() {
    window.NProgress.done();
    let storage = localStorage.getItem("vis-topology");
    if (!storage) {
      return false;
    }

    storage = JSON.parse(storage);

    const message = this.$message({
      showClose: true,
      message: "正在读取数据...",
      iconClass: "el-icon-loading",
      duration: 0,
    });
    this.$store.commit("stage/setSize", storage.stage.size);
    this.$store.commit("structure/loadNodes", storage.nodes);
    this.$store.commit("structure/loadLines", storage.lines);
    message.close();
  },
};
</script>

<style lang="less">
@topNavHeight: 50px;
@sidePart: 300px;

.app-container {
  width: 100%;
  height: 100%;
}

.top-nav {
  width: 100%;
  height: @topNavHeight;
}

.container-main {
  width: 100%;
  height: calc(100% - @topNavHeight);
  display: flex;
}

.object-part,
.function-part {
  width: @sidePart;
  height: 100%;
}

.object-part {
  box-shadow: 3px 3px 3px rgb(180, 180, 180);
  position: relative;
}

.function-part {
  box-shadow: -3px 3px 3px rgb(180, 180, 180);
  position: relative;
}

.canvas-part {
  width: calc(100% - 2 * @sidePart);
  height: 100%;
}
</style>
