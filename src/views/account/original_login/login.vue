<template>
  <div class="login-container">
    <vue-particles
      id="particles-js"    
      color="#8B8989"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"	
      linesColor="#8B8989"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="fly-Dynamic"/>
      <div class="login-weaper  animated bounceInDown">
        <div class="login-left">
          <img class="img"
              src="@/assets/images/login.png"
              alt="">
          <p class="title">{{flivirdsName}}</p>
          <p>©2021 v1.0.0</p>
        </div>
        <div class="login-border">
          <div class="login-main">
             <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="账号密码登录" name="account">用户管理</el-tab-pane>
              <el-tab-pane label="手机免密登录" name="mobile">配置管理</el-tab-pane>
            </el-tabs>
            <userLogin v-if="activeName == 'account'"></userLogin>
            <userLoginMobile v-if="activeName == 'mobile'"></userLoginMobile>
          </div>
        </div>
      </div>
    <div class="el-login-footer">
      <span>Copyright © 2020-2021 io.flying.top All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import "@/assets/styles/login.scss";
import userLogin from "./userlogin.vue";
import userLoginMobile from "./userLoginMobile.vue";
export default {
  name: "Login",
  components: {
      userLogin,
      userLoginMobile,
  },
  data() {
    return {
      activeName: "account",
      flivirdsName: "YOUNG FBIRD",
    };
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    /* 卡片点击事件*/
     handleClick(tab, event) {
        console.log(tab, event);
     },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-tabs{
  .el-tabs__item{
    font-size:15px;
    line-height: 35px;
    margin: 0px 26px;
    padding: 0px 20px;
  }
  .el-tabs__active-bar{
    background-color:#dfe4ed;
  }
  /**点击是颜色 */
  .el-tabs__item:hover{
    color:#2a80f0;
  }
  /**选中颜色 */
  .el-tabs__item.is-active{
    color:#2a80f0;  
  }
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #b8b8b8;
  font-family: Arial;
  font-size: 14px;
  letter-spacing: 1px;
}
#particles-js{
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;   //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景
}
</style>
