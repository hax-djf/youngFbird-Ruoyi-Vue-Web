<template>
  <div>
    <el-form ref="form" :model="user" :rules="rules" label-width="120px">
      <el-form-item label="允许在线用户"  prop="onlineNumber">
        <el-input-number :max="100" :min="1" v-model="user.onlineNumber" />
      </el-form-item> 
      <el-form-item label-width="90px" label="同步在线">
        <el-radio-group v-model="user.onlineSync">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submit">保存</el-button>
        <el-button type="danger" size="mini" @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateUseronlineNumber } from "@/api/system/user";
export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        onlineNumber: [
          { required: true, message: "允许最大在线用户数量", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            let params = {
              onlineNumber: this.user.onlineNumber,
              onlineSync: this.user.onlineSync
            }
          updateUseronlineNumber(params).then(response => {
            this.msgSuccess("修改成功");
          });
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    }
  }
};
</script>
