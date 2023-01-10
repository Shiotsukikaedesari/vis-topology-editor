<template>
  <div class="left-part">
    <div class="logo"><img src="logo.png" alt="" /></div>
    <el-tooltip effect="dark" content="新建" placement="bottom">
      <el-button
        size="small"
        icon="el-icon-folder-add"
        @click="addNewVisiable = true"
        circle
      ></el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="导入" placement="bottom">
      <el-button size="small" icon="el-icon-download" @click="importData" circle></el-button>
    </el-tooltip>

    <input ref="importInput" type="file" style="display: none" @change="fileHandler" />

    <el-dialog title="画布尺寸" :visible.sync="addNewVisiable" width="420px">
      <el-form label-width="110px" label-position="left">
        <el-form-item label="宽度 : 高度(px):">
          <el-input-number
            v-model="stageSize.width"
            size="mini"
            :controls="false"
            :precision="0"
          ></el-input-number>
          x
          <el-input-number
            v-model="stageSize.height"
            size="mini"
            :controls="false"
            :precision="0"
          ></el-input-number>
        </el-form-item>
      </el-form>

      <span style="color: red">注意：新建之前请保存好上一份数据！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addNew">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addNewVisiable: false,
      stageSize: {
        width: 827,
        height: 1169,
      },
    };
  },
  methods: {
    addNew() {
      this.$store.commit("stage/setSize", this.stageSize);
      this.$store.commit("structure/clearNodes");
      this.$store.commit("structure/clearLines");
      this.addNewVisiable = false;
      this.stageSize = {
        width: 827,
        height: 1169,
      };
    },

    importData() {
      this.$refs.importInput.click();
    },

    fileHandler() {
      const file = this.$refs.importInput.files[0];

      if (!file) {
        return false;
      }

      // 文件格式
      if (file.name.split(".").pop() !== "json") {
        this.$message.warning("文件格式有误！");
        return false;
      }
      const message = this.$message({
        showClose: true,
        message: "正在读取文件...",
        iconClass: "el-icon-loading",
        duration: 0,
      });

      // 读取文件
      const fileReader = new FileReader();
      fileReader.readAsText(file, "utf-8");
      fileReader.onload = () => {
        message.close();
        try {
          const data = JSON.parse(fileReader.result);
          if (data.stage?.size) {
            this.$store.commit("stage/setSize", this.stageSize);
          }

          if (data.nodes) {
            this.$store.commit("structure/clearNodes");
            this.$store.commit("structure/loadNodes", data.nodes);
          }

          if (data.lines) {
            this.$store.commit("structure/clearLines");
            this.$store.commit("structure/loadLines", data.lines);
          }
          this.$message.success("导入成功！");
        } catch (error) {
          this.$message.error("文件格式有误！");
        }

        this.$refs.importInput.value = "";
      };

      fileReader.onerror = () => {
        this.$message.error("读取失败！");
      };
    },
  },
};
</script>

<style lang="less" scoped>
.left-part {
  flex: 1;
}

.left-part {
  padding-left: 8px;
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
