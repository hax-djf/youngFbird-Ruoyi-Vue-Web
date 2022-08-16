<template>
  
  <div class="app-container">
    <div v-if="bindStatus">
       <img class="header-logo-img" src="@/assets/images/indexLogo.svg"
          @click="$router.push({path:'/'})"
      >
    </div>
    <div class="login" v-else>
      <img class="header-logo-img" src="@/assets/images/indexLogo.svg"
          @click="$router.push({path:'/'})"
      >
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">绑定账号</h3>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            <span v-if="!loading">绑 定</span>
            <span v-else>绑 定 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "ThirdLogin",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false, //默认不记住
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
      },
      loading: false,
      redirect: undefined,
      // 社交登录相关
      type: undefined,
      code: undefined,
      state: undefined,
      bindStatus: true,
    };
  },
  created() {
    this.handleLogin0();
  },
  methods: {
    handleLogin0() {
      // 重定向地址
      this.redirect = this.$route.query.redirect;
      // 社交登录相关
      this.type = this.$route.query.type;
      this.code = this.$route.query.code;
      this.state = this.$route.query.state;
      const loading = this.$loading({
            lock: true,
            text: '第三发授权登录中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
          loading.close();
      }, 20000);
      this.$store.dispatch("SocialLogin", {
        code: this.code,
        state: this.state,
        type: this.type
      }).then(() => {
        //重定向到主页面
        this.$router.push({ path: this.redirect || "/index" }).catch(()=>{});
        loading.close();
      }).catch(() => {
        this.loading = false;
        this.bindStatus = false;
        loading.close();
      });
    },
    /** 第三方账号未绑定本账号 ，进行绑定登录 */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
          }
          this.$store.dispatch("SocialLogin2", {
            code: this.code,
            state: this.state,
            type: this.type,
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(() => {
            this.$router.push({ path: this.redirect || "/index" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/assets/styles/mixin.scss';

.app-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.login {
  width: 31%;
  height: 55%;
  align-content: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 50px;
  div {
    width: 350px;
  }
}

.header-logo-img {
  width: 120px;
  height: 78px;
  float: left;
  margin-left: 25px;
  cursor: pointer;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.login-code-img {
  height: 38px;
}
</style>
