<template>
  <div class="app-container">
      <el-row :gutter="20">
          <el-col v-for="app in applicationLocal" :key="app.name" :span="6" :xs="24">
            <el-card style="margin-bottom:20px;">
              <div slot="header" class="clearfix">
                <span>{{app.name}}</span>
              </div>
              <div class="app-profile">
                <div class="box-center">
                  <pan-thumb :image="app.image" :height="'100px'" :width="'100px'" :hoverable="false">
                    <div>{{app.label}}</div>
                  </pan-thumb>
                </div>
                <div class="box-center">
                  <el-button @click="openUrl(app.host + app.url)" class="app-name text-center" type="success" plain>打开</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
export default {
  name: 'ComponentMixinDemo',
  components: {
    PanThumb
  },
  data() {
    return {
      applicationLocal:[
        {
          name :"FBIRD-API接口文档",
          label:"FBIRD-API",
          image:"http://120.79.220.218:9000/demo/icon/api.jpg",
          // host:"http://localhost:9903",
          host:"http://119.91.25.140:9903",
          url:"/doc.html"
        },
        {
          name :"NACOS配置注册中心",
          label:"FBIRD-NACOS",
          image:"http://120.79.220.218:9000/demo/icon/nacos.jpg",
          // host:"http://192.168.144.129:8848",
          host:"http://120.79.220.218:8848",
          url:"/nacos/#/login"
        },
        {
          name :"SENTINEL限流管理",
          label:"FBIRD-SENTINEL",
          image:"http://120.79.220.218:9000/demo/icon/sentinel.jpg",
          // host:"http://192.168.144.129:8858",
          host:"http://120.79.220.218:8858",
          url:"/#/login"
        },
        {
          name :"SPRING-BOOT-ADMIN监控中心",
          label:"FBIRD-ADMIN",
          image:"http://120.79.220.218:9000/demo/icon/spring-boot-admin.jpg",
          // host:"http://localhost:9100",
          host:"http://119.91.25.140:9100",
          url:"/application"
        },
        {
          name :"MINIO分布式文件",
          label:"FBIRD-MINIO",
          image:"http://120.79.220.218:9000/demo/icon/minio.jpg",
          // host:"http://192.168.144.129:9000",
          host:"http://120.79.220.218:9000",
          url:"/minio"
        }
      ],  
    }
  },
  methods:{
    openUrl(href) {
      //跳转
       window.open(href, '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.app-profile {
  .app-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }
}
</style>
