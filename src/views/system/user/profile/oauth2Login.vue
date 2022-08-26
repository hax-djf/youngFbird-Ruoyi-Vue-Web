<template>
   <el-table
    :data="list"
    style="width: 100%"
    border
    max-height="250">
    <el-table-column
      fixed
      align="center"
      type="index"
      label="序号"
      min-width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="绑定帐号"
      align="center"
      min-width="80px">
      <template slot-scope="scope">
       <el-avatar :src="getLogo(scope.row.type)"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column
      prop="avatar"
      label="头像"
      align="center"
      min-width="80px">
      <template slot-scope="scope">
        <el-avatar :src="scope.row.avatar"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="名称"
      align="center"
      min-width="100px">
      <template slot-scope="scope">
        <span>{{ scope.row.nickname}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      align="center"
      label="绑定时间	"
      min-width="150px">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      min-width="100px">
      <template slot-scope="scope">
        <el-button
          type="danger"
          @click="socialUnbind(scope.row)"
          size="small">
          解除绑定
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { listSocialUser,socialUnbind } from "@/api/system/social";
import { SystemUserSocialList } from "@/utils/constants";
export default {
  data() {
    return {
      list: [],
      UserSocialList: SystemUserSocialList,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      listSocialUser().then((res) => {
        this.list = res.data;
      });
    },
    getLogo(type) {
      return this.UserSocialList.find((item) => (item.type = type)).img;
    },
    //取消社交绑定
    socialUnbind(row){
      this.$confirm('确认取消社交绑定用户'+row.nickname+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let query ={
            type:row.type,
            unionId:row.unionId
          }
          socialUnbind(query).then((res) => {
              this.$message({
                type: 'success',
                message: '取消绑定成功!'
              });
              this.getList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑'
          });          
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
