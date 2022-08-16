<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <blockquote class="text-warning" style="font-size: 14px">
          基于芋道源码
          <br />
          <el-link
            href="https://github.com/YunaiV/ruoyi-vue-pro"
            type="primary"
            target="_blank"
            >@开源地址</el-link
          >
          <br />
          基于若依
          <br />
          <el-link
            href="https://gitee.com/y_project/RuoYi-Cloud"
            type="primary"
            target="_blank"
            >@开源地址</el-link
          >
          <br />
          <h4 class="text-danger">
            部分源码由以上开源项目提供,在此表示@ 特别感谢
          </h4>
        </blockquote>
        <hr />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>YOUNG FBIRD</h2>
        <p>
          项目的宗旨: 创建一个企业级别的孵化平台,打造低耦合,高聚合的快速应用平台
        </p>
        <p>本菜单【应用功能】主要上线为:基于本平台的客户端认证多应用聚合</p>
        <el-row>
          <el-col :span="10">
            <h4>当前版本</h4>
            <ul>
              <li>v.1.0.0</li>
              <li>内容:</li>
              <li>1.支持SMS短信服务</li>
              <li>2.支持gen代码生成</li>
              <li>3.监控服务</li>
              <li>4.系统管理</li>
            </ul>
          </el-col>
           <el-col :span="10">
            <h4>计划版本</h4>
            <ul>
              <li>v.1.0.1</li>
              <li>内容:</li>
              <li>1.个人网盘系统集成</li>
              <li>2.CMS服务完善</li>
              <li>3.工作流OA</li>
            </ul>
          </el-col>
        </el-row>
        <p> 敬请期待。。。。。。。。。。。。。。。。肝</p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-tag type="danger">&yen;免费开源</el-tag>
        </p>
        <p>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-cloudy"
            plain
            @click="goTarget('https://github.com/hax-djf/flying-birds')"
            >访问码云</el-button
          >
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>Spring Cloud && Alibaba</li>
              <li>Spring Security</li>
              <li>JWT</li>
              <li>Oauth2.0</li>
              <li>Nacos</li>
              <li>MyBatis-Plus</li>
              <li>Druid</li>
              <li>Fastjson</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>Sass</li>
              <li>Quill</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>联系信息</span>
          </div>
          <div class="body">
            <p>
              <i class="el-icon-s-promotion"></i> 官网：暂无
              <!-- <el-link
                href="http://www.ruoyi.vip"
                target="_blank"
                >http://www.ruoyi.vip</el-link
              > -->
            </p>
            <p>
              <i class="el-icon-user-solid"></i> QQ群：暂无
              <!-- <a href="https://jq.qq.com/?_wv=1027&k=4WWwqNxN" target="_blank"
                > 104180207</a
              > -->
            </p>
            <p>
              <i class="el-icon-chat-dot-round"></i> 微信：<a
                href="javascript:;"
                >/ *小熊技术栈</a
              >
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>更新日志</span>
          </div>
          <el-collapse accordion>
            <el-collapse-item title="v1.1.0 - 2022-1-18">
              <ol>
                <li>新增缓存监控功能</li>
                <li>支持主题风格配置</li>
                <li>修复多级菜单之间切换无法缓存的问题</li>
                <li>多级菜单自动配置组件</li>
                <li>代码生成预览支持高亮显示</li>
                <li>支持Get请求映射Params参数</li>
                <li>删除用户和角色解绑关联</li>
                <li>去除用户手机邮箱部门必填验证</li>
                <li>Excel支持注解align对齐方式</li>
                <li>Excel支持导入Boolean型数据</li>
                <li>优化头像样式，鼠标移入悬停遮罩</li>
                <li>代码生成预览提供滚动机制</li>
                <li>代码生成删除多余的数字float类型</li>
                <li>修正转换字符串的目标字符集属性</li>
                <li>回显数据字典防止空值报错</li>
                <li>日志记录增加过滤多文件场景</li>
                <li>修改缓存Set方法可能导致嵌套的问题</li>
                <li>移除前端一些多余的依赖</li>
                <li>防止安全扫描YUI出现的风险提示</li>
                <li>修改node-sass为dart-sass</li>
                <li>升级SpringBoot到最新版本2.1.18</li>
                <li>升级poi到最新版本4.1.2</li>
                <li>升级oshi到最新版本v5.3.6</li>
                <li>升级bitwalker到最新版本1.21</li>
                <li>升级axios到最新版本0.21.0</li>
                <li>升级element-ui到最新版本2.14.1</li>
                <li>升级vue到最新版本2.6.12</li>
                <li>升级vuex到最新版本3.6.0</li>
                <li>升级vue-cli到版本4.5.9</li>
                <li>升级vue-router到最新版本3.4.9</li>
                <li>升级vue-cli到最新版本4.4.6</li>
                <li>升级vue-cropper到最新版本0.5.5</li>
                <li>升级clipboard到最新版本2.0.6</li>
                <li>升级core-js到最新版本3.8.1</li>
                <li>升级echarts到最新版本4.9.0</li>
                <li>升级file-saver到最新版本2.0.4</li>
                <li>升级fuse.js到最新版本6.4.3</li>
                <li>升级js-beautify到最新版本1.13.0</li>
                <li>升级js-cookie到最新版本2.2.1</li>
                <li>升级path-to-regexp到最新版本6.2.0</li>
                <li>升级quill到最新版本1.3.7</li>
                <li>升级screenfull到最新版本5.0.2</li>
                <li>升级sortablejs到最新版本1.10.2</li>
                <li>升级vuedraggable到最新版本2.24.3</li>
                <li>升级chalk到最新版本4.1.0</li>
                <li>升级eslint到最新版本7.15.0</li>
                <li>升级eslint-plugin-vue到最新版本7.2.0</li>
                <li>升级lint-staged到最新版本10.5.3</li>
                <li>升级runjs到最新版本4.4.2</li>
                <li>升级sass-loader到最新版本10.1.0</li>
                <li>升级script-ext-html-webpack-plugin到最新版本2.1.5</li>
                <li>升级svg-sprite-loader到最新版本5.1.1</li>
                <li>升级vue-template-compiler到最新版本2.6.12</li>
                <li>其他细节优化</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.0 - 2019-01-08">
              <ol>
                <li>FBIRD 正式维护</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span>捐赠支持【暂且放在，哈哈哈。。。。。。。。】</span>
          </div>
          <div class="body">
            <!-- <img
              src="https://oscimg.oschina.net/oscnet/up-d6695f82666e5018f715c41cb7ee60d3b73.png"
              alt="donate"
              width="100%"
            /> -->
            <span style="display: inline-block; height: 30px; line-height: 30px"
              >你可以请作者喝杯咖啡表示鼓励</span
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      // 版本号
      version: "1.0.0",
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

