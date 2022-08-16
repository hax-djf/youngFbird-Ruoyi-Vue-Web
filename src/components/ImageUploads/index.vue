<template>
  <div class="component-upload-image">
    <el-upload
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :on-error="handleUploadError"
      name="file"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :show-file-list="true"
      :limit="limit"
      :file-list="fileList"
      :headers="headers"
      style="display: inline-block; vertical-align: top"
    >
    <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览" width="800" append-to-body>
      <img :src="value" style="display: block; max-width: 100%; margin: 0 auto;">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      dialogVisible: false,
      uploadImgUrl: process.env.VUE_APP_BASE_API + "/file/upload", // 上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    limit:{
      type: Number,
      default: 6,
    },
    fileList:{
      type:Array,
      default:[],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.$emit("remove", file.uid);
    },
    handleUploadSuccess(res,file,fileList) {
      //将uid传递过去
      this.$emit("input", res.data.url,file.uid);
      this.loading.close();
    },
    handleBeforeUpload() {
      this.loading = this.$loading({
        lock: true,
        text: "上传中",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    handleUploadError() {
      this.$message({
        type: "error",
        message: "上传失败",
      });
      this.loading.close();
    },
    handlePictureCardPreview(file) {
      this.value = file.url;
      this.dialogVisible = true;
    }
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.image {
  position: relative;
  .mask {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
  }
  &:hover .mask {
    opacity: 1;
  }
}
</style>