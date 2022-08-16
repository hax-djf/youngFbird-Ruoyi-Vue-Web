<template>
 <div class="app-container">
 <!-- 添加或修改数据模型对话框 -->
    <el-dialog 
        :title="$route.meta.title"
        :visible.sync="open" 
        width="45%" 
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :fullscreen="true"
        :modal="false"
        custom-class="dialog-no-header"
      >
      <div class="dialogFix">
        <el-button
          icon="el-icon-circle-check"
          @click="submitForm"
          v-hasPermi="['genPlus:model:add']"
          size="small"
        >保 存</el-button>
        <el-button 
          icon="el-icon-back" 
          @click="cancel"
          size="small"
        >返 回</el-button>
      </div>
      <el-tabs style="padding-left:0;padding-top:10px">
         <el-row>
            <el-col :span="24">
              <el-form 
                  ref="form" 
                  :model="form" 
                  :rules="rules" 
                  label-width="80px"
                  >  
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height:36px">
                      <el-form-item label="模型名称" prop="modelName">
                        <el-input v-model="form.modelName" placeholder="数据库表名/sys_flybirds" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height:36px">
                      <el-form-item label="描述" prop="description">
                        <el-input 
                            v-model="form.description" 
                            type="textarea" placeholder="请输入内容" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                       <el-divider content-position="center">模型继承配置信息</el-divider>
                        <el-checkbox v-model="form.ifExtends" @change="changeExtends" label="继承MpBaseEntity" border></el-checkbox>
                        <el-checkbox v-model="form.ifExtendTree" @change="changeExtendTree" label="继承MpTreeEntity" border></el-checkbox>
                    </el-col>
                    <el-col :span="24">
                      <el-divider content-position="center">模型配置信息</el-divider>
                        <el-checkbox v-model="form.ifVersion" label="乐观锁" border></el-checkbox>
                        <el-checkbox v-model="form.ifLogic" label="逻辑删除" border></el-checkbox>
                        <el-checkbox v-model="form.ifStatus" label="状态码" border></el-checkbox>
                    </el-col>
              </el-form>
            </el-col>
          </el-row>
        <el-divider content-position="center">数据字段信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddSysDataColumn">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteSysDataColumn">删除</el-button>
          </el-col>
        </el-row>
        <el-table 
        :data="form.genDataColumnList" 
        :row-class-name="rowSysDataColumnIndex" 
        @selection-change="handleSysDataColumnSelectionChange" 
        ref="sysDataColumn">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="字段名称" prop="columnName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.columnName" placeholder="请输入字段名称" />
            </template>
          </el-table-column>
          <el-table-column label="字段说明" prop="columnComment">
            <template slot-scope="scope">
              <el-input v-model="scope.row.columnComment" placeholder="请输入字段说明" />
            </template>
          </el-table-column>
          <el-table-column label="字段类型" prop="columnType">
            <template slot-scope="scope">
              <el-select
                  v-model="scope.row.columnType"
                  placeholder="请选择字段类型"
                  style="width: 100%;"
                  :disabled="isEditDisabled || scope.row.columnName === 'id'"
                  @change="(value) => handleColumnTypeChange2Row(value, scope.row, scope.$index)"
                >
                  <el-option
                    v-for="item in columnTypeDocOptions"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
            </template>
          </el-table-column>
          <el-table-column label="字段长度" prop="columnPrecision">
            <template slot-scope="scope">
               <el-input
                  type="number"
                  v-model.number="scope.row.columnPrecision"
                  placeholder
                  min="1"
                  max="2000"
                  step="1"
                  :disabled="isEditDisabled || scope.row.columnName === 'id'"
                ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="小数位数" prop="columnScale">
            <template slot-scope="scope">
              <el-input
                  type="number"
                  v-model.number="scope.row.columnScale"
                  placeholder
                  min="1"
                  max="10"
                  step="1"
                  :disabled="isEditDisabled || scope.row.columnName === 'id'"
                ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否可空" prop="nullable">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.nullable"
                    :disabled="isEditDisabled || scope.row.columnName === 'id'"
                    >
                </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="默认值" prop="defaultValue">
            <template slot-scope="scope">
               <el-input
                  v-model="scope.row.defaultValue"
                  :title="scope.row.defaultValue"
                  placeholder
                  maxlength="255"
                  :disabled="isEditDisabled || scope.row.columnName === 'id'"
                ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否唯一" prop="isUnique">
            <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isUnique"
                  :disabled="isEditDisabled || scope.row.columnName === 'id'"
                  >
                </el-switch>
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
                  :disabled="isEditDisabled || scope.row.columnName === 'id'"
                ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tabs>
    </el-dialog>
 </div>
</template>
<script>
import {addModel, updateModel,getModel } from "@/api/tool/model.js";

function newEditForm() {
  return {
    createTime: "",
    createUser: "",
    description: "",
    id: "",
    modelName: "",
    status: true,
    ifVersion:true,
    ifLogic:false,
    ifExtends:false,
    ifExtendTree:false,
    ifStatus:false,
    updateTime: "",
    updateUser: "",
    syncTime: "",
    genDataColumnList: [],
  };
}
function newDataColumn() {
  return {
    id: "",
    modelId: "",
    columnName: "",
    columnComment: "",
    columnType: "",
    columnPrecision: null,
    columnScale: null,
    nullable: true,
    isUnique: false,
    defaultValue: null,
    sort: 0,
  }
}

export default {
  name: "modelEdit",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedSysDataColumn: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: newEditForm(),
      //数据字典
      columnTypeDocOptions:[],
      // 表单校验
      rules: {
        modelName: [
          { required: true, message: "模型名称不能为空", trigger: "blur" },
          { min: 2, message: '请输入不少于2个字符', trigger: 'blur' },
          { pattern: /^[_a-zA-Z][_a-zA-Z0-9]*$/, message: '格式不正确,栗子:sys_flybirds' }
        ],
      }
    };
  },
  created() {
    this.getDicts("sys_column_type").then(response => {
      this.columnTypeDocOptions = response.data;
    });
  },
  computed:{
    isEditDisabled() {
      return !this.savable;
    },
    savable() {
      return true;
    }
  },
  methods: {
    changeExtendTree(isExtendsTree){
      if(isExtendsTree){
        this.form.ifExtends = false;
      }
    },
    changeExtends(isExtends){
      if(isExtends){
        this.form.ifExtendTree = false;
      }
    },
    // 取消按钮
    cancel() {
       this.open = false;
       this.reset();
       this.$emit("cancelSave");
    },
    // 表单重置
    reset() {
      this.form = newEditForm();
    },
    /**数据新增 */
    handleAdd(){
      this.reset();
      this.open = true;
      this.formPushDefalut();
    },
    /**数据修改  */
    handleUpdate(row) {
      if (row === null) {
         this.$message({
           type: "warning",
          message:"数据加载异常"
         });
         return;
      }
      this.form = JSON.parse(JSON.stringify(row));
      this.open = true;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    formPushDefalut(){
        this.form.genDataColumnList.push({
        ...newDataColumn(),
        columnName: 'id',
        columnType: 'bigint',
        columnComment: 'ID',
        columnPrecision: 19,
        scale: null,
        nullable: false,
        defaultValue: null,
        isUnique: false,
        sort: 1,
        createBy: undefined,
        updateBy: undefined,
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateModel(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.$emit("saveSuccess", this.form.id);
            });
          } else {
            addModel(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.$emit("saveSuccess", this.form.id);
            });
          }
        }
      });
    },
	  /** 数据字段序号 */
    rowSysDataColumnIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 数据字段添加按钮操作 */
    handleAddSysDataColumn() {
      const newRow = newDataColumn();
      newRow.sort = this.form.genDataColumnList.length + 1;
      this.form.genDataColumnList.push(newRow);
      this.updateSort2List(this.form.genDataColumnList);
    },
    /** 数据字段删除按钮操作 */
    handleDeleteSysDataColumn() {
      if (this.checkedSysDataColumn.length == 0) {
        this.$alert("请先选择要删除的数据字段数据", "提示", { confirmButtonText: "确定", });
      } else {
        this.form.genDataColumnList.splice(this.checkedSysDataColumn[0].index - 1, 1);
      }
    },
    /** 单选框选中数据 */
    handleSysDataColumnSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.sysDataColumn.clearSelection();
        this.$refs.sysDataColumn.toggleRowSelection(selection.pop());
      } else {
        this.checkedSysDataColumn = selection;
      }
    },
    /**物理类型 */
    handleColumnTypeChange2Row(value, row, index){
      const item = this.columnTypeDocOptions.find(item => item.dictValue === value) || {};
      if(item.remark!= null && item.remark != ''){
        var arr = item.remark.split(",");
        row.columnPrecision = parseInt(arr[0]);
        row.columnScale = parseInt(arr[1]);
      }
    },
    /**顺序调整 */
    handleSortChange2Row(row, index) {
      row.sort = Math.min(Math.max(1, row.sort), this.form.genDataColumnList.length);
      // 调整顺序
      this.form.genDataColumnList.splice(index, 1);
      this.form.genDataColumnList.splice(row.sort - 1, 0, row);
      this.updateSort2List(this.form.genDataColumnList);
    },
    /*统一初始化操作 */
    updateSort2List(list) {
      list.forEach((item, index) => item.sort = index+1);
    },
  }
};
</script>

<style lang="less" scoped>
::v-deep .dialog-no-header > .el-dialog__header {
  display: none;
}
/deep/.el-dialog__wrapper {
    margin: 1px 16px 0;
    position: absolute;
    z-index: 1 !important;
  /deep/.el-dialog__header {
    padding: 10px;
    border-bottom: 1px solid #f7f4f4;
    /deep/.el-dialog__title {
      line-height: 10px;
      color: #303133;
      font-size: 15px;
      font-weight: 800;
    }
  }
  /deep/.el-dialog__body {
    padding: 10px;
    height: calc(100% - 37px);
  }
  /deep/.el-dialog__headerbtn {
    top: 10px;
  }
}
.edit--dialog-form {
  display: inline-block;
}
</style>
