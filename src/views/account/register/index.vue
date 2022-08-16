<template>
  <div class="register-container">
    <p class="tips">注册成为Flybirds体验用户~</p>
    <el-tabs v-model="regType" class="register-form">
      <el-tab-pane label="手机号注册" name="regPhone">
        <el-form
          ref="phoneRegForm"
          :model="accountForm"
          :rules="phoneRegRules"
          label-width="0px"
        >
          <el-form-item label="" prop="phoneNumber">
            <el-input
              v-model="accountForm.phoneNumber"
              prefix-icon="el-icon-user-solid"
              autocomplete="off"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="accountForm.password"
              autocomplete="off"
              placeholder="请输入密码"
              show-password
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item label="" prop="code">
            <el-row :span="24">
              <el-col :span="16">
                <el-input
                  v-model="accountForm.code"
                  autocomplete="off"
                  placeholder="请输入验证码"
                >
                  <font-icon
                    slot="prefix"
                    class="el-input__icon fa fa-shield"
                  />
                  <!-- <el-button slot="suffix" :disabled="phoneValidateCodeBtn" class="ml-20" type="primary"
                                   @click="sendPhoneCodeHandle">
                            {{ phoneValidateCodeBtnText }}
                             </el-button> -->
                </el-input>
              </el-col>
              <el-col :span="8">
                <div class="login-code">
                  <el-button
                    slot="suffix"
                    type="primary"
                    @click="sendPhoneCodeHandle"
                    :disabled="phoneValidateCodeBtn"
                    round
                  >
                    <span v-show="show">获取验证码</span>
                    <span v-show="!show" class="count">{{
                      phoneValidateCodeBtnText
                    }}</span>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button
              class="login-submit"
              type="info"
              :loading="registeredStatus_phone"
              style="width: 100%"
              @click.native.prevent="phoneRegHandle"
            >
              <span v-if="!registeredStatus_phone">注 册</span>
              <span v-else>注册成功</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱号注册" name="regEmail">
        <el-form
          ref="emailRegForm"
          :model="accountForm"
          :rules="emailRegRules"
          label-width="0px"
          status-icon
        >
          <el-form-item label="" prop="email">
            <el-input
              v-model="accountForm.email"
              prefix-icon="el-icon-user-solid"
              autocomplete="off"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="accountForm.password"
              autocomplete="off"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
            />
          </el-form-item>
          <el-form-item label="" prop="code">
            <el-row :span="24">
              <el-col :span="16">
                <el-input
                  v-model="accountForm.code"
                  autocomplete="off"
                  maxlength="4"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  placeholder="请输入验证码"
                >
                  <font-icon
                    slot="prefix"
                    class="el-input__icon fa fa-shield"
                  />
                  <!-- <el-button
                slot="suffix"
                :disabled="emailValidateCodeBtn"
                class="ml-20"
                type="primary"
                @click="sendEmailCodeHandle"
              >
                {{ emailValidateCodeBtnText }}
              </el-button> -->
                </el-input>
              </el-col>
              <el-col :span="8">
                <div class="login-code">
                  <el-button
                    slot="suffix"
                    class="ml-20"
                    type="primary"
                    @click="sendEmailCodeHandle"
                    :disabled="emailValidateCodeBtn"
                    round
                  >
                    {{ emailValidateCodeBtnText }}
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-submit"
              type="info"
              :loading="registeredStatus_email"
              style="width: 100%"
              @click.native.prevent="emailRegHandle"
            >
              <span v-if="!registeredStatus_email">注 册</span>
              <span v-else>注册成功</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// 引入组件
import constants from "@/utils/constants";
import {
  registerByEmail,
  registerByPhone,
  registerCodeByEmail,
  registerCodeByPhone,
} from "@/api/system/register.js";

export default {
  name: "Register",
  data() {
    return {
      regType: "regPhone",
      accountForm: {
        email: "",
        phoneNumber: "",
        password: "",
      },
      registeredStatus_phone: false,
      registeredStatus_email: false,
      emailValidateCodeBtn: false,
      emailValidateCodeBtnText: "发送验证码",
      phoneValidateCodeBtn: false,
      phoneValidateCodeBtnText: "发送验证码",
      phoneRegRules: {
        phoneNumber: [
          { required: true, trigger: "blur", message: "请输入手机号" },
          {
            pattern: /^(?:0|86|\+86)?1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入新密码" },
          {
            pattern: constants.passwordReg,
            message: constants.passwordRegDesc,
          },
        ],
        code: { required: true, trigger: "blur", message: "请输入验证码" },
      },
      emailRegRules: {
        email: [
          { required: true, trigger: "blur", message: "请输入邮箱" },
          {
            pattern:
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "请输入正确的邮箱",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入新密码" },
          {
            pattern: constants.passwordReg,
            message: constants.passwordRegDesc,
          },
        ],
        code: { required: true, trigger: "blur", message: "请输入验证码" },
      },
    };
  },
  created() {},
  destroyed() {},
  methods: {
    sendEmailCodeHandle() {
      this.$refs["emailRegForm"].validateField("email", (err) => {
        if (!err) {
          this.emailValidateCodeBtn = true;
          let params = {
            email: this.accountForm.email,
          };
          registerCodeByEmail(params).then(() => {
            this.msgSuccess("验证码发送成功，5分钟内有效");
            this.emailValidateCodeBtn = true;
            let count = 60;
            let timer = setInterval(() => {
              count--;
              this.emailValidateCodeBtnText = count + "s后重新发送";
              if (count == 0) {
                this.emailValidateCodeBtnText = "发送验证码";
                this.emailValidateCodeBtn = false;
                clearInterval(timer);
              }
            }, 1000);
          });
        }
      });
    },
    sendPhoneCodeHandle() {
      this.$refs["phoneRegForm"].validateField("phoneNumber", (err) => {
        if (!err) {
          this.phoneValidateCodeBtn = true;
          let params = {
            phoneNumber: this.accountForm.phoneNumber,
          };
          registerCodeByPhone(params).then(() => {
            this.msgSuccess("验证码发送成功，5分钟内有效");
            this.phoneValidateCodeBtn = true;
            let count = 60;
            let timer = setInterval(() => {
              count--;
              this.phoneValidateCodeBtnText = count + "s后重新发送";
              if (count == 0) {
                this.phoneValidateCodeBtnText = "发送验证码";
                this.phoneValidateCodeBtn = false;
                clearInterval(timer);
              }
            }, 1000);
          });
        }
      });
    },
    phoneRegHandle() {
      this.$refs["phoneRegForm"].validate((valid) => {
        if (valid) {
          registerByPhone(this.accountForm).then(() => {
            this.registerSuccessHandle(1);
          });
        } else {
          return false;
        }
      });
    },
    emailRegHandle() {
      this.$refs["emailRegForm"].validate((valid) => {
        if (valid) {
          registerByEmail(this.accountForm).then(() => {
            this.registerSuccessHandle(2);
          });
        } else {
          return false;
        }
      });
    },
    registerSuccessHandle(type) {
      this.msgSuccess("注册成功，快去登录吧");
      switch (type) {
        case 1:
          this.registeredStatus_phone = true;
          break;
        case 2:
          this.registeredStatus_email = true;
          break;
      }
      setTimeout(() => {
        this.$emit("success");
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.register-container {
  .tips {
    height: 15px;
    font-size: 15px;
    font-weight: 300;
    color: #10141c;
    line-height: 20px;
  }
}
.code-input {
  width: 180px;
}
</style>
