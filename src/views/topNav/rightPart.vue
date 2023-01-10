<template>
  <div class="right-part">
    <el-button
      size="mini"
      icon="el-icon-upload2"
      type="primary"
      @click="exportDialogVisiable = true"
    >
      导出
    </el-button>
    <el-button size="mini" icon="el-icon-folder" type="primary" @click="saveData">保存</el-button>
    <el-button
      size="mini"
      icon="el-icon-lightning"
      type="primary"
      @click="renderDialogVisiable = true"
    >
      渲染
    </el-button>

    <el-dialog title="导出设置" :visible.sync="exportDialogVisiable" width="420px">
      <el-form label-width="110px" label-position="left">
        <el-form-item label="文件名称:">
          <el-input size="mini" v-model="exportName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="exportDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="exportData">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="渲染设置" :visible.sync="renderDialogVisiable" width="420px">
      <el-form label-width="110px" label-position="left">
        <el-form-item label="文件名称:">
          <el-input size="mini" v-model="renderName"></el-input>
        </el-form-item>
        <el-form-item label="渲染倍率:">
          <el-input-number
            v-model="renderPower"
            size="mini"
            :min="1"
            :max="10"
            :step="1"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="宽度 : 高度(px):">
          <el-input-number
            :value="stageSize.width * renderPower"
            size="mini"
            :controls="false"
            disabled
          ></el-input-number>
          x
          <el-input-number
            :value="stageSize.height * renderPower"
            size="mini"
            :controls="false"
            disabled
          ></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="renderDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="render">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as rasterizeHTML from "rasterizehtml";
export default {
  data() {
    return {
      renderDialogVisiable: false,
      exportDialogVisiable: false,
      renderName: "vis-topology",
      exportName: "vis-topology",
    };
  },
  computed: {
    renderPower: {
      get() {
        return this.$store.getters["canvas/renderPower"];
      },
      set(value) {
        this.$store.commit("canvas/setRenderPower", value);
      },
    },
    stageSize() {
      return this.$store.getters["stage/size"];
    },
  },
  methods: {
    async exportData() {
      const saveData = {
        stage: {
          size: this.stageSize,
        },
        nodes: this.$store.getters["structure/nodes"],
        lines: this.$store.getters["structure/lines"],
      };
      const blob = new Blob([JSON.stringify(saveData)], { type: "text/json" });

      const a = document.createElement("a");
      a.download = `${this.exportName}.json`;
      a.href = window.URL.createObjectURL(blob);
      a.click();
      this.exportDialogVisiable = false;
    },
    async saveData() {
      const message = this.$message({
        showClose: true,
        message: "正在保存...",
        iconClass: "el-icon-loading",
        duration: 0,
      });
      let saveData = {
        stage: {
          size: this.stageSize,
        },
        nodes: this.$store.getters["structure/nodes"],
        lines: this.$store.getters["structure/lines"],
      };

      saveData = JSON.stringify(saveData);
      // 计算string的字节大小
      const getByteLength = function (str) {
        let byt = 0;
        const length = str.length;
        for (let i = 0; i < length; i += 1) {
          let char = str[i];
          if (char.charCodeAt() > 255) {
            //字符编码大于255，说明是双字节字符
            byt += 2; //则累加2个
          } else {
            byt += 1; //否则递加一次
          }
        }
        return byt;
      };

      // 判断大小小于5M才保存到localStorage
      const mb = getByteLength(saveData) / 1024 / 1024;
      console.log(mb);
      if (mb >= 5) {
        this.$message.warning("数据过大！");
        return false;
      }
      localStorage.setItem("vis-topology", saveData);
      message.close();
      this.$message.success("保存成功！");
    },
    async render() {
      // TODO: 后期压力测试看看是否需要多异步优化
      const svg = this.$store.getters["canvas/canvas"].cloneNode(true);

      // 将图标svg下的节点插入该svg
      const svgList = document.querySelectorAll("svg");
      svgList.forEach((dom) => {
        if (dom.getAttribute("aria-hidden")) {
          svg.appendChild(dom.cloneNode(true));
        }
      });

      // 框选为舞台大小
      const stageSize = this.stageSize;
      const translate = this.$store.getters["stage/translate"];
      const renderPower = this.renderPower;
      svg.setAttribute(
        "viewBox",
        `${translate.x} ${translate.y} ${stageSize.width} ${stageSize.height}`
      );
      svg.setAttribute("width", stageSize.width * renderPower);
      svg.setAttribute("height", stageSize.height * renderPower);

      let svgXml = svg.outerHTML;

      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", stageSize.width * renderPower);
      canvas.setAttribute("height", stageSize.height * renderPower);

      rasterizeHTML.drawHTML(svgXml, canvas).then(() => {
        const png = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.download = `${this.renderName}.png`;
        a.href = png;
        a.click();
        this.renderDialogVisiable = false;
      });
    },
  },

  mounted() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "s" && event.ctrlKey) {
        if (event.repeat) {
          return false;
        }
        event.preventDefault();
        this.saveData();
      }
    });
  },
};
</script>

<style lang="less" scoped>
.right-part {
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
  flex: 1;
}
</style>
