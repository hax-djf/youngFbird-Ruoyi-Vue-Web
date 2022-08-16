<template>
  <div>
  <el-form 
           status-icon
           :rules="loginRulesBySms"
           ref="loginFormBySms"
           :model="loginFormBySms"
           label-width="0">
    <el-form-item prop="mobile">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginFormBySms.mobile"
                auto-complete="off"
                placeholder="手机号">
         <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon" />
      </el-input>
    </el-form-item>
      <el-form-item prop="mobileCode">
        <el-row :span="24">
              <el-col :span="16">
                <el-input style="width: 83%" size="small"
                    @keyup.enter.native="handleLogin"
                    type="text"
                    maxlength="6" 
                    v-model="loginFormBySms.mobileCode"
                    auto-complete="off"
                    :clearable="false"
                    placeholder="请输入验证码">
              
                    <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
                </el-input>
              </el-col>
              <div class="login-code">
                  <el-button  
                    slot="suffix"
                    type="primary"
                    @click="handleClick" :disabled="!show" round>
                  <span v-show="show">获取验证码</span>
                  <span v-show="!show" class="count">{{count}} s</span>
                 </el-button>
              </div>
          </el-row>
      </el-form-item>
    <el-form-item>
        <el-button
            class="login-submit"
            type="info"
            :loading="loading"
            style="width:100%;"
            @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
    </el-form-item>
  </el-form>
  <!-- 验证码 -->
   <Vcode
      :show="isVerificationShow"
      @success="handleSuccess"
      @close="handleClose"
      :imgs ="puzzleImgList"
      :sliderText="sliderText"
      :successText="successText"
      :failText="failText"
    />
  </div>
</template>

<script>
import { getSmsCode } from "@/api/login";
import Vcode from "vue-puzzle-vcode";
export default {
  name: "userlogin",
  components :{
    Vcode
  },
  data () {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginFormBySms: {
        mobile: "17682991004",
        mobileCode: undefined,
        userName: undefined,
      },
      loginRulesBySms: {
        mobile: [
          {  
            required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        mobileCode: [
          { required: true, trigger: "blur", message: "短信验证码不能为空" }
        ]
      },
      puzzleImgList: [
          require("@/assets/images/verify/1.jpg"),
          require("@/assets/images/verify/2.jpg"),
          require("@/assets/images/verify/3.jpg"),
          require("@/assets/images/verify/4.jpg"),
          require("@/assets/images/verify/5.jpg"),
          require("@/assets/images/verify/6.jpg"),
          require("@/assets/images/verify/7.jpg"),
          require("@/assets/images/verify/8.jpg"),
      ],
      sliderText:"短信验证码安全验证",
      successText:"验证通过!",
      failText:"验证失败，再试一下!",
      loading: false,
      redirect: undefined,
      isVerificationShow: false,
      count:undefined,
      show:true,
    };
  },
  created () {},
  mounted () {},
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  props: [],
  methods: {
     queryMobileCode(){
       //发送短信验证码
      getSmsCode(this.loginFormBySms.mobile).then(res => {
        if(res.data != null && res.code == 200){
            this.msgSuccess(res.msg);
            //成功之后倒计时
            this.countDown();
        }else if(res.data != null){
          this.$message({
              message: res.msg,
              type: 'warning'
          });
        }else{
          this.$message({
              message: res.msg,
              type: 'error'
          });
        }
      });
     },
     countDown() {
        const TIME_COUNT = 60
        if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--
                } else {
                    this.show = true
                    clearInterval(this.timer)
                    this.timer = null
                }
            }, 1000)
        } 
     },
     handleClick(){
       var pattMoble = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
       if (this.loginFormBySms.mobile === '' 
              || this.loginFormBySms.mobile === undefined) {
          this.$message({
              message: '警告, 手机号输入哦',
              type: 'info'
          });
       }else if(!(pattMoble.test(this.loginFormBySms.mobile))){
            this.$message({
              message: '警告, 手机号格式错误',
              type: 'info'
            });
       }else{
          this.isVerificationShow = true;
       }   
     },
     handleSuccess() {
        // 验证通过后关闭图片验证
        this.isVerificationShow = false;
        // 将数据传送到后端验证
        console.log("验证成功");
        // 发送验证码
        this.queryMobileCode();
     },
     handleClose() {
        // 滑动验证失败
        console.log("验证失败");
        this.isVerificationShow = false;
    },
    handleLogin() {
      this.$refs.loginFormBySms.validate(valid => {
        if (valid) {
          this.loading = true;
          //发送异步任务->store中的user.js中模块
          this.$store.dispatch("SmsLogin", this.loginFormBySms).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>
<style>
</style>