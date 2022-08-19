import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'  
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import './assets/icons' // icon
import './permission' // permission control
import { download } from '@/utils/request'
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { 
  parseTime, 
  resetForm, 
  addDateRange, 
  selectDictLabel, 
  selectDictLabels, 
  handleTree,
  addBeginAndEndTime,
  downloadExcel,
  downloadWord,
  downloadZip,
  downloadHtml,
  downloadMarkdown} from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";

//图片预览组件
import ImagePreview from "@/components/ImagePreview"
//字典组件
import {DICT_TYPE, getDictDataLabel, getDictDatas} from "@/utils/dict/DictConstant";
// 自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar"
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件(单个)
import ImageUpload from "@/components/ImageUpload"
// 图片上传组件(多个)
import ImageUploads from "@/components/ImageUploads"
//动画背景
import VueParticles from 'vue-particles';
// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'
// 字典标签组件 since ruoyi 3.8.0
import DictTag from '@/components/DictTag'

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.addBeginAndEndTime = addBeginAndEndTime
Vue.prototype.getDictDatas = getDictDatas
Vue.prototype.getDictDataLabel = getDictDataLabel
Vue.prototype.DICT_TYPE = DICT_TYPE
//下载
Vue.prototype.downloadExcel = downloadExcel
Vue.prototype.downloadWord = downloadWord
Vue.prototype.downloadHtml = downloadHtml
Vue.prototype.downloadMarkdown = downloadMarkdown
Vue.prototype.downloadZip = downloadZip

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}
Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}
Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component("ImageUploads",ImageUploads)
Vue.component('ImagePreview', ImagePreview)

Vue.use(VueParticles) 
Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
DictData.install()

import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
