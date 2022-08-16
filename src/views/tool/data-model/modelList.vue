<template>
  <div class="app-container">
    <el-form :model="conditions" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="模型名称" prop="modelName">
        <el-input
          v-model="conditions.modelName"
          placeholder="请输入模型名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="同步时间">
          <el-date-picker
            v-model="dateRangeBeginTime"
            type="daterange"
            clearable 
            size="small"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="conditions.status" placeholder="请选择状态" clearable size="small">
          <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
              />
        </el-select>
      </el-form-item>
      <el-form-item label="开发人员" prop="userName">
        <el-input
          v-model="conditions.userName"
          placeholder="创建人/修改人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['genPlus:model:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['genPlus:model:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDeletes"
          v-hasPermi="['genPlus:model:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['genPlus:model:export']"
        >导出</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="openImportTable"
            v-hasPermi="['genPlus:model:export']"
          >模型导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-zoom-in"
            size="mini"
            @click="handleAddByDb"
            v-hasPermi="['genPlus:model:export']"
          >表名生成</el-button>
        </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="modelList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="模型名称" align="center" prop="modelName" />
      <el-table-column label="描述" align="center" prop="description" />
       <el-table-column label="同步时间" align="center" prop="syncTime" width="240">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.syncTime) }}</span>
          <el-tag
            :type="handleSynced(scope.row) ? 'success' : 'danger'"
            effect="light" 
            size="mini">
             {{handleSynced(scope.row) ? '已同步' : '未同步'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" >
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              @change="handleupdateStatus(scope.row)"
              inactive-text="禁用">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createName" />
      <el-table-column label="修改人" align="center" prop="updateName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success" 
            icon="el-icon-connection"
            @click="handleSync(scope.row)"
            :disabled="handleSynced(scope.row)"
            v-hasPermi="['genPlus:model:sycn']"
          >同步</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['genPlus:model:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['genPlus:model:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
    />
    <!-- 父子组件的调用 -->
     <datamodelEdit ref="edit" @saveSuccess="saveSuccessManage" @cancelSave="search"></datamodelEdit>
     <!--模型导入组件 -->
     <importTable ref="import" @ok="handleUpdateByDb($event)" />
  </div>
</template>

<script>
import { listModel,delModel,delModels,syncModel,exportModel,genModelStatusById,genModelByTableName} from "@/api/tool/model.js";
import datamodelEdit from "./modelEdit.vue";
import importTable from "./importTable.vue";
function newQueryConditions() {
  /**查询条件构造 */
  return {
    modelName: undefined,
    userName: undefined,
    status:undefined
  };
}
export default {
  name: "datamodelList",
  components: {
    datamodelEdit,importTable
  },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedSysDataColumn: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 数据模型表格数据
      modelList: [],
      // 数据字段表格数据
      genDataColumnList: [],
      //状态
      statusOptions:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数对象
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        conditions:{},
      },
      dateRangeBeginTime:[],
      conditions:newQueryConditions(),
      selectCurrentRowId: "",
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getList();
  },
  mounted(){
    this.getDicts("sys_general_stastus").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 保存数据回调 */
    saveSuccessManage(id){
        this.search().then(() => {
          this.selectCurrentRowId = id || (this.modelList[0] || {}).id;
      });
    },
    /** 查询数据模型列表 */
    getList() {
      const _this = this;
      _this.loading = true;
      _this.queryParams.conditions = _this.conditions;
      _this.addBeginAndEndTime(_this.queryParams.conditions, this.dateRangeBeginTime);
     return listModel(_this.queryParams).then(res => {
        if(res.data != null){
            _this.modelList = res.data;
            _this.total = res.total;
        }else{
           _this.$message({
              message: res.msg,
              type: 'error'
          });
        }
        _this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 搜索按钮操作 */
    search(){
     return this.getList();
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.dateRangeBeginTime = [];
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$refs["edit"].handleAdd();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
       this.$refs["edit"].handleUpdate(row);
    },
      /** 打开导入表弹窗 */
    openImportTable() {
      this.$refs.import.show();
    },
    handleUpdateByDb(params){
        this.handleUpdate(params);
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id
      this.$confirm('是否确认删除数据模型编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delModel(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
     /** 删除按钮操作 */
    handleDeletes() {
      const ids = this.ids;
      this.$confirm('是否确认删除数据模型编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delModels(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据模型数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportModel(queryParams);
        }).then(response => {
          this.download(response.msg);
      })
    },
    handleSynced(row) {
      const { syncTime, createTime, updateTime } = row;
      //存在2中情况
      return syncTime !== null && syncTime !== undefined && (updateTime === null ? createTime : updateTime) === syncTime;
    },
    /**数据童同步 */
    handleSync(row){
       this.$confirm('是否确认同步'+row.modelName+'数据模型?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return syncModel(row.id);
        }).then(response => {
          this.getList();
          this.msgSuccess(response.msg);
      })

    },
    /**数据修改 */
    handleupdateStatus(row){
        var text = row.status == true ? "启用" : "禁用";
        this.$confirm('是否确认'+text+row.modelName+'数据模型?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return genModelStatusById(row.id,row.status == true ? 1 : 0);
        }).then(response => {
          this.getList();
          this.msgSuccess(response.msg);
        }).catch(() =>{
          row.status = !row.status;
      });

    },
    /**根据表从数据库中生成 */
    handleAddByDb(){
       this.$prompt('请输入数据表名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[_a-zA-Z][_a-zA-Z0-9]*$/,
          inputErrorMessage: '输入格式不正确'
        }).then(({ value }) => {
           return genModelByTableName(value);
        }).then(response => {
          this.handleUpdate(response.data);
        });
    }
  }
};
</script>
