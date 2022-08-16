<template>
  <!-- 导入表 -->
  <el-dialog title="导入数据模型" :visible.sync="visible" width="800px" top="5vh" append-to-body>
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="模型名称" prop="modelName">
        <el-input
          v-model="queryParams.modelName"
          placeholder="请输入模型名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模型描述" prop="description">
        <el-input
          v-model="queryParams.description"
          placeholder="请输入模型描述"
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
    <el-row>
      <el-table @row-click="clickRow" 
                ref="table" 
                :data="dbModelList" 
                highlight-current-row  
                @current-change="handleSelectionChange" 
                height="260px">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="modelName" label="模型名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="description" label="模型描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
           <template slot-scope="scope">
             <i  v-if="scope.row.createTime != null" class="el-icon-time"></i>
             <span>{{ parseTime(scope.row.createTime) }}</span>
           </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间">
            <template slot-scope="scope">
              <i v-if="scope.row.updateTime != null" class="el-icon-time"></i>
             <span>{{ parseTime(scope.row.updateTime) }}</span>
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
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleImportTable">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getModelAllByDb} from "@/api/tool/model.js";
export default {
  components :{
  },
  data() {
    return {
      // 遮罩层
      visible: false,
      // 选中数组值
      selectRow:{},
      // 总条数
      total: 0,
      // 表数据
      dbModelList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        modelName: undefined,
        description: undefined
      }
    };
  },
  methods: {
    // 显示弹框
    show() {
      this.getList();
      this.visible = true;
    },
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    // 多选框选中数据
    handleSelectionChange(currentRow,oldCurrentRow) {
      this.selectRow = currentRow;
    },
    // 查询表数据
    getList() {
      getModelAllByDb(this.queryParams).then(res => {
        if (res.code === 200) { 
          this.dbModelList = res.data;
          this.total = res.total;
        }
      });
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
    /** 导入按钮操作 默认支持单选*/
    handleImportTable() {
      this.$emit("ok",this.selectRow);
      this.visible = false;
      this.msgSuccess('导入成功');
    },
    handleUpdate(row) {
       this.$refs["list"].handleUpdate(row);
    },
  }
};
</script>
