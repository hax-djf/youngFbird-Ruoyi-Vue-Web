<template>
  <el-form ref="genInfoForm" :model="info" :rules="rules" label-width="130px">
    <el-row>
      <el-col :span="12">
        <el-form-item prop="tplCategory">
          <span slot="label">生成模板</span>
          <el-select v-model="info.tplCategory">
              <el-option
                v-for="item in info.genFunctionDetailList !== null 
                && info.genFunctionDetailList.length > 0 ? sysGenplusCategoryList.filter(item => !item.dictValue.includes('single'))
                : sysGenplusCategoryList.filter(item => !item.dictValue.includes('master') )"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue">
              </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="cssType">
          <span slot="label">页面样式</span>
          <el-select v-model="info.cssType">
              <el-option
                v-for="item in sysCssTypeList"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue">
              </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="packageName">
          <span slot="label">
            生成包路径
            <el-tooltip content="生成在哪个java包下，例如 com.flybirds.system" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-input v-model="info.packageName" placeholder="com.flybirds.system"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="moduleName">
          <span slot="label">
            生成模块名
            <el-tooltip content="可理解为子系统名，例如 system" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-input v-model="info.moduleName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="businessName">
          <span slot="label">
            生成业务名
            <el-tooltip content="可理解为功能英文名，例如 user" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-input v-model="info.businessName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item>
          <span slot="label">
            上级菜单
            <el-tooltip content="分配到指定菜单下，例如 系统管理" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <treeselect
            :append-to-body="true"
            v-model="info.parentMenuId"
            :options="menus"
            :normalizer="normalizer"
            :show-count="true"
            placeholder="请选择系统菜单"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="genType">
          <span slot="label">
            生成代码方式
            <el-tooltip content="默认为zip压缩包下载，也可以自定义生成路径" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-radio v-model="info.genType" label="0">zip压缩包</el-radio>
          <el-radio v-model="info.genType" label="1">自定义路径</el-radio>
        </el-form-item>
      </el-col>

      <el-col :span="24" v-if="info.genType == '1'">
        <el-form-item prop="genPath">
          <span slot="label">
            自定义路径
            <el-tooltip content="填写磁盘绝对路径，若不填写，则生成到当前Web项目下" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-input v-model="info.genPath">
            <el-dropdown slot="append">
              <el-button type="primary">
                最近路径快速选择
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="info.genPath = '/'">恢复默认的生成基础路径</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row v-show="info.tplCategory !== undefined 
                  && info.tplCategory.toString().includes('tree')">
      <h4 class="form-header">树表信息</h4>
      <el-col :span="12">
        <el-form-item>
          <span slot="label">
            树编码字段
            <el-tooltip content="树显示的编码字段名， 如：dept_id" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-select v-model="info.treeCode" placeholder="请选择">
            <el-option
              v-for="(column, index) in info.columns"
              :key="index"
              :label="column.columnName + '：' + column.columnComment"
              :value="column.columnName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <span slot="label">
            树父编码字段
            <el-tooltip content="树显示的父编码字段名， 如：parent_id" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-select v-model="info.treeParentCode" placeholder="请选择">
            <el-option
              v-for="(column, index) in info.columns"
              :key="index"
              :label="column.columnName + '：' + column.columnComment"
              :value="column.columnName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <span slot="label">
            树名称字段
            <el-tooltip content="树节点的显示名称字段名， 如：dept_name" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <el-select v-model="info.treeName" placeholder="请选择">
            <el-option
              v-for="(column, index) in info.columns"
              :key="index"
              :label="column.columnName + '：' + column.columnComment"
              :value="column.columnName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "BasicInfoForm",
  components: { Treeselect },
  props: {
    info: {
      type: Object,
      default: null
    },
    tables: {
      type: Array,
      default: null
    },
    menus: {
      type: Array,
      default: []
    },
    activeName: {
      type: String,
      default: 'genInfo'
    }
  },
  watch :{},
  data() {
    return {
      subColumns: [],
      /**类别字典 */
      sysGenplusCategoryList:[],
      sysCssTypeList:[],
      rules: {
        tplCategory: [
          { required: true, message: "请选择生成模板", trigger: "blur" }
        ],
        packageName: [
          { required: true, message: "请输入生成包路径", trigger: "blur" }
        ],
        moduleName: [
          { required: true, message: "请输入生成模块名", trigger: "blur" }
        ],
        businessName: [
          { required: true, message: "请输入生成业务名", trigger: "blur" }
        ],
        cssType: [
          { required: true, message: "请输入生成页面样式", trigger: "blur" }
        ],
      }
    };
  },
  created() {},
  mounted(){ 
     this.getDicts("sys_genplus_category").then(response => {
        this.sysGenplusCategoryList =  Array.isArray(response.data) ? response.data : [];
      });
     this.getDicts("sys_css_type").then(response => {
        this.sysCssTypeList = Array.isArray(response.data) ? response.data: [];
     });
  },
  watch: {
    // 'activeName': function(newValue,oldValue){
    //   if(newValue == 'genInfo' && oldValue !== 'genInfo'){
    //     this.info.tplCategory = undefined;
    //     this.getSysGenplusCategoryList();
    //   }
    // }
  },
  methods: {
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children
      };
    },
    getSysGenplusCategoryList(){
      this.getDicts("sys_genplus_category").then(response => {
        /**
         * 类型校验
         * 子表存在数据,过滤单表，单树表
         */
        if(this.info.genFunctionDetailList !== null 
            &&this.info.genFunctionDetailList.length>0){
          this.sysGenplusCategoryList =  Array.isArray(response.data) ? 
                                          response.data.filter(item=>!item.dictValue.includes("single")) : [];
        }else{
          this.sysGenplusCategoryList =  Array.isArray(response.data) ? 
                                          response.data.filter(item=>!item.dictValue.includes("master")) : [];
        }
      });
    }
  }
};
</script>
