<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="数据库类型" prop="dbType">
        <el-select v-model="queryParams.dbType" placeholder="请选择数据库类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="数据库驱动" prop="driverClass">
        <el-input
          v-model="queryParams.driverClass"
          placeholder="请输入数据库驱动"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据库名称" prop="dbName">
        <el-input
          v-model="queryParams.dbName"
          placeholder="请输入数据库名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据库host" prop="dbHost">
        <el-input
          v-model="queryParams.dbHost"
          placeholder="请输入数据库host"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作者名" prop="author">
        <el-input
          v-model="queryParams.author"
          placeholder="请输入作者名"
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
          v-hasPermi="['gen:data-source:add']"
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
          v-hasPermi="['gen:data-source:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['gen:data-source:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['gen:data-source:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="DatasourceConfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="字段id" align="center" prop="id" />
      <el-table-column label="数据库类型" align="center" prop="dbType" />
      <el-table-column label="数据库驱动" align="center" prop="driverClass" />
      <el-table-column label="schema(PGSQL专用)" align="center" prop="schemaName" />
      <el-table-column label="数据库名称" align="center" prop="dbName" />
      <el-table-column label="数据库host" align="center" prop="dbHost" />
      <el-table-column label="数据库端口" align="center" prop="dbPort" />
      <el-table-column label="数据库用户名" align="center" prop="userName" />
      <el-table-column label="数据库密码" align="center" prop="passWord" />
      <el-table-column label="是否已删除，1：已删除，0：未删除" align="center" prop="isDeleted" />
      <el-table-column label="包名" align="center" prop="packageName" />
      <el-table-column label="删除的前缀" align="center" prop="delPrefix" />
      <el-table-column label="代码生成器模板组id" align="center" prop="groupId" />
      <el-table-column label="作者名" align="center" prop="author" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['gen:DatasourceConfig:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['gen:DatasourceConfig:remove']"
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

    <!-- 添加或修改数据源对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="数据库类型" prop="dbType">
          <el-select v-model="form.dbType" placeholder="请选择数据库类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据库驱动" prop="driverClass">
          <el-input v-model="form.driverClass" placeholder="请输入数据库驱动" />
        </el-form-item>
        <el-form-item label="数据库名称" prop="dbName">
          <el-input v-model="form.dbName" placeholder="请输入数据库名称" />
        </el-form-item>
        <el-form-item label="数据库host" prop="dbHost">
          <el-input v-model="form.dbHost" placeholder="请输入数据库host" />
        </el-form-item>
        <el-form-item label="数据库端口" prop="dbPort">
          <el-input v-model="form.dbPort" placeholder="请输入数据库端口" />
        </el-form-item>
        <el-form-item label="数据库用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入数据库用户名" />
        </el-form-item>
        <el-form-item label="数据库密码" prop="passWord">
          <el-input v-model="form.passWord" placeholder="请输入数据库密码" />
        </el-form-item>
        <el-form-item label="是否已删除，1：已删除，0：未删除" prop="isDeleted">
          <el-input v-model="form.isDeleted" placeholder="请输入是否已删除，1：已删除，0：未删除" />
        </el-form-item>
        <el-form-item label="包名" prop="packageName">
          <el-input v-model="form.packageName" placeholder="请输入包名" />
        </el-form-item>
        <el-form-item label="删除的前缀" prop="delPrefix">
          <el-input v-model="form.delPrefix" placeholder="请输入删除的前缀" />
        </el-form-item>
        <el-form-item label="代码生成器模板组id" prop="groupId">
          <el-input v-model="form.groupId" placeholder="请输入代码生成器模板组id" />
        </el-form-item>
        <el-form-item label="作者名" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者名" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDatasourceConfig, getDatasourceConfig, delDatasourceConfig, addDatasourceConfig, updateDatasourceConfig, exportDatasourceConfig } from "@/api/tool/data-source";

export default {
  name: "DatasourceConfig",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 数据源表格数据
      DatasourceConfigList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dbType: null,
        driverClass: null,
        dbName: null,
        dbHost: null,
        dbPort: null,
        userName: null,
        passWord: null,
        isDeleted: null,
        packageName: null,
        delPrefix: null,
        groupId: null,
        author: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询数据源列表 */
    getList() {
      this.loading = true;
      listDatasourceConfig(this.queryParams).then(response => {
        this.DatasourceConfigList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        dbType: null,
        driverClass: null,
        schemaName: null,
        dbName: null,
        dbHost: null,
        dbPort: null,
        userName: null,
        passWord: null,
        isDeleted: null,
        packageName: null,
        delPrefix: null,
        groupId: null,
        author: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
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
      this.reset();
      this.open = true;
      this.title = "添加数据源";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDatasourceConfig(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改数据源";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDatasourceConfig(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDatasourceConfig(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除数据源编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDatasourceConfig(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据源数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportDatasourceConfig(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
