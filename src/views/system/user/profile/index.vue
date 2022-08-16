<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户账号
                <div class="pull-right">{{ user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />手机号码
                <div class="pull-right">{{ user.phonenumber }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />所属部门
                <div class="pull-right" v-if="user.dept">{{ user.dept.deptName }} / {{ postGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" />所属角色
                <div class="pull-right">{{ roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />注册日期
                <div class="pull-right">{{ parseTime(user.createTime)  }}</div>
              </li>
              <li class="list-group-item">
                 <svg-icon icon-class="client" /> 注册渠道
                <div class="pull-right">{{user.regChannel}}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="lock" />锁定
                <div class="pull-right">{{user.locks == '0' ? "否" : '是'}}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="lock" />停用
                <div class="pull-right">{{user.status == '0' ? "否" : '是'}}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="link" /> 当前登录IP
                <div class="pull-right">{{user.loginIp}}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="time" />当前登录时间
                <div class="pull-right">{{parseTime(user.loginDate)}}</div>
              </li>
              <li class="list-group-item">
                 <svg-icon icon-class="client" /> 当前登录渠道
                <div class="pull-right">{{user.lastLoginChannel}}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="8" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

      <el-col :span="10" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>功能设置</span>
          </div>
          <el-tabs v-model="activeSet">
            <!-- <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane> -->
            <el-tab-pane label="同时在线" name="resetOnlineNumber">
              <onlineNumber :user="user" />
            </el-tab-pane>
            <el-tab-pane label="最近登录" name="viewLoginLog">
              <loginLog :user="user" />
            </el-tab-pane>
            <el-tab-pane label="第三方账号绑定" name="oauth2Login">
              <oauth2Login :user="user" />
            </el-tab-pane>
            <el-tab-pane label="动态圈" name="activity">
              <activity :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>
<script>
import userAvatar from "./userAvatar";
import activity from "./activity";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import onlineNumber from "./onlineNumber"
import loginLog from "./loginLog"
import oauth2Login from "./oauth2Login"
import { getUserProfile } from "@/api/system/user";

export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd,onlineNumber,loginLog,oauth2Login,activity },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: "userinfo",
      activeSet:"viewLoginLog"
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
        this.roleGroup = response.roleGroup;
        this.postGroup = response.postGroup;
      });
    }
  }
};
</script>
