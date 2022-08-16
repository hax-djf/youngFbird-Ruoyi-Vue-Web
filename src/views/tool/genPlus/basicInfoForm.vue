<template>
  <el-form ref="basicInfoForm" :model="info" :rules="rules" label-width="130px" style="padding-left:0;padding-top:15px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="项目名称" prop="projectName">
          <el-input placeholder="请输入项目名称" v-model="info.projectName" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item  prop="functionName">
            <span slot="label">
              功能名称
            <el-tooltip content="用作类描述，例如 部门、用户等" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-input placeholder="请输入模块名称" v-model="info.functionName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="模型数据" prop="modelName">
        <el-select v-model="info.modelName" 
            placeholder="请选择主表对象\输入搜索" 
            @change="getMasterDataColumn"  
            style="width: 100%;" 
            :disabled="false"
            filterable clearable>
              <el-option
                v-for="item in masterTableList"
                :key="item.id"
                :label="item.description"
                :value="item.modelName">
              </el-option>
        </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="author">
          <span slot="label">
              作者
            <el-tooltip content="用作类描述代码生成者" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-input placeholder="请输入作者" v-model="info.author" />
        </el-form-item>
      </el-col>
      <el-col :span="24"> 
        <el-form-item prop="remark">
          <span slot="label">
              描述
            <el-tooltip content="基本功能描述" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-input type="textarea" :rows="3" v-model="info.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { queryDatabase,queryDatabaseColumn } from "@/api/tool/genPlus";
import { listModelAll } from "@/api/tool/model.js";

export default {
  name: "BasicInfoForm",
  props: {
    info: {
      type: Object,
      default: null
    },
    activeName: {
      type: String,
      default: 'cloum'
    }
  },
  data() {
    return {
      masterTableList:[],
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        functionName: [
          { required: true, message: "请输入模块名称", trigger: "blur" }
        ],
        modelName: [
          { required: true, message: "请选择主表对象", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入作者", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    /**加载数据模型数据 */
   this.gentableList();
  },
  methods:{
    gentableList(){
       listModelAll().then(res =>{
         this.masterTableList = res.data;
       });
    },
    getMasterDataColumn(tableName){
      /*
        改变info里面绑定的数据
        表名获取到列数据
      */
       if(tableName !== undefined && tableName !== null){
         queryDatabaseColumn(tableName).then(res =>{
          this.info.genPageColumnList = res.data;
         });
         //将id赋值
         if(this.masterTableList != null && this.masterTableList.length>0){
            const modelData = this.masterTableList.find(item=> item.modelName == tableName);
            if(modelData !== undefined){
              this.info.modelId = modelData.id;
            }
         }
       }
    },
  },
};
</script>
