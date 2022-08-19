<template>
    <div class="login-container">
        <div class="logo-banner">
            <img src="@/assets/images/login/login_left.png">
        </div>
        <div class="logo-content">
            <span class="hello">YOUNG-FBIRD</span>
            <el-tabs v-if="formType=='login'" v-loading="tableLoading" v-model="loginType" class="login-form-tab">
                <el-tab-pane label="账号密码登录" name="account">
                    <el-form ref="loginForm" :model="loginForm" :rules="accountLoginRules"
                             class="account-login-form"
                             hide-required-asterisk
                             label-position="top"
                             size="small"
                             status-icon
                             @keyup.enter.native="loginHandle"
                    >
                        <el-form-item prop="account">
                            <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入手机号/邮箱"
                                      prefix-icon="el-icon-user-solid"
                            />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-lock"
                                      show-password
                            />
                        </el-form-item>

                        <el-form-item prop="code">
                            <el-row :span="24">
                                <el-col :span="16">
                                <el-input
                                        v-model="loginForm.code"
                                        auto-complete="off"
                                        placeholder="校验码"
                                        style="width: 83%">
                                            
                                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
                                </el-input>
                                </el-col>
                                <div class="login-code">
                                    <img :src="codeUrl" @click="getCode" class="login-code-img"/>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    class="login-submit"
                                    type="info"
                                    :loading="loading"
                                    style="width:57%;"
                                    @click.native.prevent="loginHandle">
                                <span v-if="!loading">登 录</span>
                                <span v-else>登 录 中...</span>
                            </el-button>
                            <el-link class="ml-15 link-btn" @click="toForgetPwdHandle">忘记密码</el-link>
                            <el-link class="ml-15 link-btn" @click="formType='reg'">立即注册</el-link>
                        </el-form-item>
                        <!--  集成第三方登录 -->
                        <div class="other-login">
                            <el-form-item>
                                <div class="oauth-login" style="display:flex">
                                    <div  class="oauth-login-item" 
                                          v-for="item in SysUserSocialTypeEnum" 
                                          :key="item.type" @click="doSocialLogin(item)">
                                        <img :src="item.img" height="25px" width="25px" alt="登录" >
                                    </div>
                                </div>
                            </el-form-item>
                        </div> 
                    </el-form>
                </el-tab-pane>
                <!-- 手机号免密登录 -->
                <el-tab-pane label="手机免密登录" name="mobile">
                     <loginMobile v-if="loginType == 'mobile'"></loginMobile>
                </el-tab-pane>
            </el-tabs>
            <register v-else @success="registerSuccessHandle" />
            <p class="desc_red">
                关于社交登录(需要先绑定登录) 
            </p>
            <p class="desc">
                图片如有侵权,请联系删除。 
            </p>  
            <p class="desc">
                简化版,删除了很多功能,代码生成,任务调度, 租户模式,文件服务,工作流,api监控等;
                简化版搭建周期比较短,可能会出现一些bug,该版本主在演示;
                管理员账号 admin/123456 
            </p>  
        </div>
    </div>
</template>

<script>
import "@/assets/styles/official_login.scss";
import Register from '../register/index.vue'
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import loginMobile from "./loginMobile.vue";
import { socialAuthRedirect } from '@/api/oauth/auth'
import { getToken } from '@/utils/auth'
import constants from '@/utils/constants'
import {SystemUserSocialTypeEnum} from "@/utils/constants";

export default {
    name: 'Login',
    components: {
        Register,loginMobile
    },
    data() {
        const validateAccount = (rule, value, callback) => {
            const reg1 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            const reg2 = /^(?:0|86|\+86)?1[3456789]\d{9}$/
            if (reg1.test(value) || reg2.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的账号'))
            }
        }
        return {
            loginForm: {
                username: "admin",
                password: "123456",
                rememberMe: false,
                tenantName:'FBIRD',
                code: "",
                uuid: ""
            },
            codeUrl: undefined,
            loading: false,
            tableLoading: false,
            redirect:undefined,
            formType: 'login',
            loginType: 'account',
            agreeProtocol: '',
            accountLoginRules: {
                username: [
                    {required: true, trigger: 'blur', message: '请输入账号'}, {trigger: 'blur', validator: validateAccount}],
                password: [
                    {required: true, trigger: 'blur', message: '请输入新密码'},
                    {
                        pattern: constants.passwordReg,
                        message: constants.passwordRegDesc
                    }
                ],
                code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
            },
            accountForm: {
                email: '',
                phoneNumber: '',
                password: ''
            },
            SysUserSocialTypeEnum: SystemUserSocialTypeEnum,
        }
    },
    computed: { 
        isLogin(){
            return getToken()
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        },
        isLogin:{
          handler(newValue, oldValue){
              if(newValue){
                  this.toIndex()
              }
          },
          immediate: true
        }
    },
    created() {
        this.LoginInit();
    },
    destroyed() {
    },
    methods: {
        /**社交登录 */
        doSocialLogin(socialTypeEnum){
            const _this = this;
            this.tableLoading = true;
            const redirectUri = location.origin + '/social-login?type=' + socialTypeEnum.type 
            // + '&redirect=' + (this.redirect || "/"); // 重定向不能丢
            console.log("location.origin",redirectUri);
            // 进行跳转
            socialAuthRedirect(socialTypeEnum.type, encodeURIComponent(redirectUri)).then((res) => {
                window.location.href = res.data;
            });
        },
        //toindex页面
        toIndex(){
            this.$router.push({path: '/index'})
        },
        LoginInit(){
            this.getCode();
        },
        getCode() {
            getCodeImg().then(res => {
                this.codeUrl = "data:image/gif;base64," + res.img;
                this.loginForm.uuid = res.uuid;
            });
        },
        // 忘记密码
        toForgetPwdHandle() {
            this.$router.push({path: '/forget/password'})
        },
        registerSuccessHandle() {
            this.formType = 'login'
            this.loginType = 'account'
        },
        loginHandle() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                this.loading = true;
                if (this.loginForm.rememberMe) {
                    Cookies.set("username", this.loginForm.username, { expires: 30 });
                    Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
                    Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
                } else {
                    Cookies.remove("username");
                    Cookies.remove("password");
                    Cookies.remove('rememberMe');
                }
                //发送异步任务->store中的user.js中模块
                this.$store.dispatch("Login", this.loginForm).then(() => {
                    this.$router.push({ path: this.redirect || "/index" }).catch(()=>{});
                }).catch(() => {
                    this.loading = false;
                    this.getCode();
                });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.desc_red{
    color: red;
}
.logo-content ::v-deep.el-tabs__nav-wrap::after {
  position: static !important;
}

.logo-content ::v-deep.el-tabs__active-bar {
  width: 59px !important;
  height: 7px !important;
  border-radius: 4px !important;
  left: 5% !important;
  background-color: #D8D8D8 !important;
}
.logo-tabs ::v-deep.el-tabs__item.is-active {
  color: #10141C !important;
}

::v-deep .el-input {
  height: 39px !important;
  line-height: 39px !important;
}

.link-btn {
  font-size: 12px !important;
}
::v-deep .el-input__inner {
  height: 39px !important;
  line-height: 39px !important;
  background: #F2F2F2 !important;
  border: none;
}

::v-deep .el-button {
  background: #408EFC;
  border-radius: 10px;
  width: 145px;
}
</style>
