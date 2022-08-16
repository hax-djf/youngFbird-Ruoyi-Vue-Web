<template>
    <div>
    <!-- 修改邮箱  -->
      <el-dialog
          title="修改邮箱"
          :visible.sync="emailDialogVisible"
          width="450px"
          center
      >
          <el-form ref="updateEmailForm"
                    style="width: 80%;"
                    :model="user" :rules="rules" label-width="80px"
          >
              <el-form-item label="邮箱" prop="email">
                  <el-input v-model="user.email" placeholder="请输入邮箱" />
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button 
                          type="primary"
                          @click="()=>{this.emailDialogVisible = false ;this.sendUpdateEmail()}"
              >发送验证邮件</el-button>
          </span>
      </el-dialog>
      <el-dialog
          title="修改手机号"
          :visible.sync="phoneDialogVisible"
          width="450px"
          center
      >
        <el-form ref="updatePhoneForm"
                  :model="user" :rules="rules" label-width="120px"
        >
            <el-form-item label="手机号" prop="phoneNumber">
                <el-input v-model="user.phoneNumber" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="输入验证码" prop="code">
                <el-input v-model="user.code" placeholder="请输入验证码"
                          style="display: inline-block; width: 60%;"
                />
                <el-button 
                            style="display: inline-block; width: 40%;"
                            @click.native="sendUpdatePhoneNumber"
                >
                    {{ phoneValidateCodeBtnText }}
                </el-button>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"
                        @click="()=>{this.phoneDialogVisible = false;this.updateUserPhoneHandle()}"
            >完 成</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { updateUserEmailMsg,updateUserPhoneCode,updateUserPhone} from "@/api/system/user";

export default {
  name:"userUpdate",
  props: {
    user: {
      type: Object
    },
    rules:{
        type: Object
    }
  },
  data() {
    return {
      emailDialogVisible:false,
      phoneDialogVisible:false,
      phoneValidateCodeBtnText: '发送验证码',
    };
  },
  methods: {
    sendUpdateEmail() {
        this.$refs['updateEmailForm'].validateField('email', err => {
            if (!err) {
                //发送到邮件
                updateUserEmailMsg({email: this.user.email}).then(res => {
                     if (res.data) {
                        this.$message.success('发送成功,请去您的邮箱查看')
                        this.emailDialogVisible = false
                    }
                })
            }
        })
    },
    sendUpdatePhoneNumber() {
      this.$refs['updatePhoneForm'].validateField('phoneNumber', err => {
          if (!err) {
            updateUserPhoneCode({phoneNumber:this.user.phoneNumber}).then(res =>{
                 this.$message.success('验证码发送成功，5分钟内有效')
                  let count = 60
                  let timer = setInterval(() => {
                      count--
                      this.phoneValidateCodeBtnText = count + 's后重新发送'
                      if (count == 0) {
                          this.phoneValidateCodeBtnText = '发送验证码'
                          clearInterval(timer)
                      }
                  }, 1000)

            })
          }
      })
    },
    updateUserPhoneHandle() {
        this.$refs['updatePhoneForm'].validateField(['phoneNumber', 'code'], err => {
            if (!err) {
                updateUserPhone(this.user).then(res=>{
                     this.$message.success('修改成功')
                })
            }
        })
    },
  }
};
</script>
