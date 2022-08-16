<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="动态标题" prop="dynamicTitle">
        <el-input
          v-model="queryParams.dynamicTitle"
          placeholder="请输入动态标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作人员" prop="createName">
        <el-input
          v-model="queryParams.createName"
          placeholder="请输入操作人员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="dynamicType">
        <el-select v-model="queryParams.dynamicType" placeholder="动态类型" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['system:dynamic:add']"
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
          v-hasPermi="['system:dynamic:edit']"
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
          v-hasPermi="['system:dynamic:remove']"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dynamicList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="dynamicId" width="100" />
      <el-table-column
        label="动态标题"
        align="center"
        prop="dynamicTitle"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="动态类型"
        align="center"
        prop="dynamicType"
        :formatter="typeFormat"
        width="100"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
        width="100"
      />
      <el-table-column label="创建者" align="center" prop="createName" width="100" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dynamic:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dynamic:remove']"
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

    <!-- 添加或修改动态对话框 -->
    <el-dialog :title="title" @close="cancel" :visible.sync="open" width="780px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="动态标题" prop="dynamicTitle">
              <el-input v-model="form.dynamicTitle" placeholder="请输入动态标题" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="动态类型" prop="dynamicType">
              <el-select v-model="form.dynamicType" placeholder="请选择">
                <el-option
                  v-for="dict in typeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item  label="图片">
               <ImageUploads @input="handleUpload" :fileList="images" @remove="handleRemove" v-model="form.imgs"/>
             </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <editor v-model="form.dynamicContent" :min-height="192"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDynamic, getDynamic, delDynamic, addDynamic, updateDynamic, exportDynamic } from "@/api/system/dynamic";
import Editor from '@/components/Editor';

export default {
  name: "Dynamic",
  components: {
    Editor
  },
  data() {
    return {
       //图片集合
      images: [],
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
      // 动态表格数据
      dynamicList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dynamicTitle: undefined,
        createName: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dynamicTitle: [
          { required: true, message: "动态标题不能为空", trigger: "blur" }
        ],
        dynamicType: [
          { required: true, message: "动态类型不能为空", trigger: "blur" }
        ]
      },
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_notice_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_dynamic_type").then(response => {
      this.typeOptions = response.data;
    });
  },
  watch:{
    images(newval,oldval){
      if(newval.length > 0){
         this.form.imgs = newval.map(item=>item.url).join(",")
      }else{
        this.form.imgs = undefined
      }
    }
  },
  methods: {
    handleUpload(url,uid){
      let image ={
        url:url,
        name:uid
      }
      console.log(this.images);
      this.images.push(image);
      console.log(url);
      console.log(this.images);
    },
    handleRemove(uid){
      if(this.images.length > 0){
        let i =   this.images.map(image=>image.name).indexOf(uid);
        //删除数据
        this.images.splice(i,1);
        console.log(this.images);
      }
    },
    /** 查询动态列表 */
    getList() {
      this.loading = true;
      listDynamic(this.queryParams).then(response => {
        this.dynamicList = response.data;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 动态状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 动态状态字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.dynamicType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.images = [];
    },
    // 表单重置
    reset() {
      this.form = {
        dynamicId: undefined,
        dynamicTitle: undefined,
        dynamicType: undefined,
        dynamicContent: undefined,
        status: "0"
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
      this.ids = selection.map(item => item.dynamicId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加动态";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const dynamicId = row.dynamicId || this.ids
      getDynamic(dynamicId).then(response => {
        this.form = response.data;
        this.buildImagse();
        this.open = true;
        this.title = "修改动态";
      });
    },
    buildImagse(){
      if(this.form.imgs != null){
        let Array =   this.form.imgs.split(",");
        Array.forEach((element,index) => {
            let img ={
              url:element,
              name:index
            }
            this.images.push(img);
        });
      }
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.dynamicId != undefined) {
            updateDynamic(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDynamic(this.form).then(response => {
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
      const dynamicIds = row.dynamicId || this.ids
      this.$confirm('是否确认删除动态编号为"' + dynamicIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDynamic(dynamicIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    }
  }
};
</script>