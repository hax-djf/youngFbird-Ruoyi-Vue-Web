<template>
    <el-tabs style="padding-left:0;padding-top:5px">
    <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddGenFunctionDetail">添加</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteGenFunctionDetail">删除</el-button>
            </el-col>
    </el-row>
    <el-table :data="info.genFunctionDetailList" :row-class-name="rowGenFunctionDetailIndex" @selection-change="handleGenFunctionDetailSelectionChange" ref="genFunctionDetail">
          
          <el-table-column type="selection" width="50" align="center" />

          <el-table-column label="序号" align="center" prop="index" width="50"/>

          <el-table-column label="子表模型数据" prop="modelName">
            <template slot-scope="scope">
             <el-select v-model="scope.row.modelName" 
                placeholder="请选择主表对象\输入搜索" 
                @change="(value) => getChildDataColumn(value, scope.row, scope.$index)"  
                style="width: 100%;" 
                :disabled="false"
                filterable clearable>
                <el-option
                    v-for="item in childTableList"
                    :key="item.id"
                    :label="item.description"
                    :value="item.modelName">
                </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column label="子表关联字段" prop="childColumn">
            <template slot-scope="scope">
                <el-select
                    v-model="scope.row.childColumn"
                    placeholder="请选择子表关联字段"
                    style="width: 100%;"
                    >
                    <el-option
                        v-for="item in scope.row.genPageColumnList"
                        :key="item.columnName"
                        :label="item.columnName +'_'+ item.columnComment"
                        :value="item.columnName"
                    ></el-option>
                </el-select>
            </template>
          </el-table-column>

          <el-table-column label="主表关联字段" prop="masterColumn">
            <template slot-scope="scope">
                <el-select
                  v-model="scope.row.masterColumn"
                  placeholder="请选择主表关联字段"
                  style="width: 100%;"
                 >
                  <el-option
                    v-for="item in info.genPageColumnList"
                    :key="item.columnName"
                    :label="item.columnName +'_'+ item.columnComment"
                    :value="item.columnName"
                  ></el-option>
                </el-select>
            </template>
          </el-table-column>

          <el-table-column label="描述" prop="description">
            <template slot-scope="scope">
               <el-input
                  type="text"
                  v-model.number="scope.row.description"
                  placeholder
                  max="100"
                ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="序号" prop="sort">
            <template slot-scope="scope">
                <el-input
                  type="number"
                  v-model.number="scope.row.sort"
                  placeholder
                  min="1"
                  max="100"
                  step="1"
                  @change="handleSortChange2Row(scope.row, scope.$index)"
                ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <!-- 子表数据显示 -->
        <el-row v-show="checkedGenFunctionDetail !== undefined 
                                && checkedGenFunctionDetail[0].genPageColumnList.length > 0">
           <el-divider content-position="center">{{checkedGenFunctionDetail[0].modelName}} 子表字段信息</el-divider>  
          <el-table ref="dragTable" :data="checkedGenFunctionDetail[0].genPageColumnList" row-key="columnId" :max-height="tableHeight">
            <el-table-column label="序号" type="index" min-width="5%" class-name="allowDrag" />
            <el-table-column
                label="字段列名"
                prop="columnName"
                min-width="10%"
                :show-overflow-tooltip="true"
            />
            <el-table-column label="字段描述" min-width="10%">
                <template slot-scope="scope">
                <el-input v-model="scope.row.columnComment"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                label="物理类型"
                prop="columnType"
                min-width="10%"
                :show-overflow-tooltip="true"
            />
            <el-table-column label="Java类型" min-width="11%">
                <template slot-scope="scope">
                <el-select v-model="scope.row.javaType">
                    <el-option label="Long" value="Long" />
                    <el-option label="String" value="String" />
                    <el-option label="Integer" value="Integer" />
                    <el-option label="Double" value="Double" />
                    <el-option label="BigDecimal" value="BigDecimal" />
                    <el-option label="Date" value="Date" />
                </el-select>
                </template>
            </el-table-column>
            <el-table-column label="java属性" min-width="10%">
                <template slot-scope="scope">
                <el-input v-model="scope.row.javaField"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="插入" min-width="5%">
                <template slot-scope="scope">
                <el-checkbox  v-model="scope.row.ifInsert"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="编辑" min-width="5%">
                <template slot-scope="scope">
                <el-checkbox  v-model="scope.row.ifEdit"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="列表" min-width="5%">
                <template slot-scope="scope">
                <el-checkbox  v-model="scope.row.ifList"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="查询" min-width="5%">
                <template slot-scope="scope">
                <el-checkbox  v-model="scope.row.ifQuery"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="查询方式" min-width="10%">
                <template slot-scope="scope">
                <el-select v-model="scope.row.queryType">
                    <el-option label="=" value="EQ" />
                    <el-option label="!=" value="NE" />
                    <el-option label=">" value="GT" />
                    <el-option label=">=" value="GTE" />
                    <el-option label="<" value="LT" />
                    <el-option label="<=" value="LTE" />
                    <el-option label="LIKE" value="LIKE" />
                    <el-option label="BETWEEN" value="BETWEEN" />
                </el-select>
                </template>
            </el-table-column>
            <el-table-column label="必填" min-width="5%">
                <template slot-scope="scope">
                <el-checkbox true-label="1" v-model="scope.row.ifRequired"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示类型" min-width="12%">
                <template slot-scope="scope">
                <el-select v-model="scope.row.htmlType">
                    <el-option label="文本框" value="input" />
                    <el-option label="文本域" value="textarea" />
                    <el-option label="下拉框" value="select" />
                    <el-option label="单选框" value="radio" />
                    <el-option label="复选框" value="checkbox" />
                    <el-option label="日期控件" value="datetime" />
                    <el-option label="图片上传" value="imageUpload" />
                    <el-option label="文件上传" value="fileUpload" />
                    <el-option label="富文本控件" value="editor" />
                </el-select>
                </template>
            </el-table-column>
            <el-table-column label="字典类型" min-width="12%">
                <template slot-scope="scope">
                <el-select v-model="scope.row.dictType" clearable filterable placeholder="请选择">
                    <el-option
                    v-for="dict in dictOptions"
                    :key="dict.dictType"
                    :label="dict.dictName"
                    :value="dict.dictType">
                    <span style="float: left">{{ dict.dictName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ dict.dictType }}</span>
                </el-option>
                </el-select>
                </template>
            </el-table-column>
            </el-table>
         </el-row>
    </el-tabs>
</template>
<script>
import {queryDatabaseColumn } from "@/api/tool/genPlus";
import { listModelAll } from "@/api/tool/model.js";
import { optionselect as getDictOptionselect } from "@/api/system/dict/type";

function newGenFunctionDetail(){
    return{
        id:undefined,
        functionId:undefined,
        modelName:undefined,
        modelId:undefined,
        description:undefined,
        childColumn:undefined,
        masterColumn:undefined,
        sort:undefined,
        genPageColumnList:[]
    }
}
export default {
  name: "BasicInfoForm",
  props: {
    info: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      childTableList:[],
      /**选择数据*/
      checkedGenFunctionDetail:[
          {
              genPageColumnList:[]
          }
      ],
      dictOptions: [],
      tableHeight: document.documentElement.scrollHeight - 245 + "px",
      rules: {
        modelName: [
          { required: true, message: "请选择模型名称", trigger: "blur" }
        ],
        modelId: [
          { required: true, message: "请选择模型id", trigger: "blur" }
        ],
        childColumn: [
          { required: true, message: "请选择子表关联字段", trigger: "blur" }
        ],
        masterColumn: [
          { required: true, message: "请选择主表关联字段", trigger: "blur" }
        ]
      }
    };
  },
  created(){
    /**加载数据模型数据 */
   this.gentableList();
    /** 查询字典下拉列表 */
    getDictOptionselect().then(response => {
        this.dictOptions = response.data;
    });
  },
  methods:{
    handleAddGenFunctionDetail(){
        const newRow = newGenFunctionDetail();
        newRow.sort = this.info.genFunctionDetailList.length + 1;
        this.info.genFunctionDetailList.push(newRow);
        this.updateSort2List(this.info.genFunctionDetailList);
    },
    handleDeleteGenFunctionDetail(){
        if (this.checkedGenFunctionDetail.length == 0) {
            this.$alert("请先选择要删除的数据字段数据", "提示", { confirmButtonText: "确定", });
        } else {
            this.info.genFunctionDetailList.splice(this.checkedGenFunctionDetail[0].index - 1, 1);
        }
    },
    handleGenFunctionDetailSelectionChange(selection){
     if (selection.length > 1) {
        this.$refs.genFunctionDetail.clearSelection();
        this.$refs.genFunctionDetail.toggleRowSelection(selection.pop());
      } else {
        this.checkedGenFunctionDetail = selection;
      }
    },
    rowGenFunctionDetailIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    getChildDataColumn(tableName,row,index){
        console.log(this.info);
        /*
        改变info里面绑定的数据
        表名获取到列数据
        */
       if(Object.keys(tableName).length !== 0){
            queryDatabaseColumn(tableName).then(res =>{
              row.genPageColumnList= res.data;
            });
            if(this.childTableList != null && this.childTableList.length>0){
                const modelData = this.childTableList.find(item=> item.modelName == tableName);
                if(modelData !== undefined){
                this.info.genFunctionDetailList.modelId = modelData.id;
            }
         }
       }
    },
    gentableList(){
       listModelAll().then(res =>{
         this.childTableList = res.data;
       });
    },
    handleSortChange2Row(row, index) {
      row.sort = Math.min(Math.max(1, row.sort), this.info.genFunctionDetailList.length);
      // 调整顺序
      this.info.genFunctionDetailLis.splice(index, 1);
      this.info.genFunctionDetailLis.splice(row.sort - 1, 0, row);
      this.updateSort2List(this.info.genFunctionDetailList);
    },
    /*统一初始化操作 */
    updateSort2List(list) {
      list.forEach((item, index) => item.sort = index+1);
    },
  },
};
</script>
