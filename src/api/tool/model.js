import request from '@/utils/request'

// 查询数据模型列表
export function listModel(queryData) {
  return request({
    url: '/tool/genPlus/genDataModel/queryByParams',
    method: 'post',
    data: queryData
  })
}

// 查询数据模型列表
export function listModelAll() {
  return request({
    url: '/tool/genPlus/genDataModel/queryByAll',
    method: 'get',
  })
}

// 查询全部未生成数据模型的数据表
export function getModelAllByDb(query) {
  return request({
    url: '/tool/genPlus/genDataModel/genModelAll',
    method: 'get',
    params: query
  })
}

// 查询数据模型详细
export function getModel(id) {
  return request({
    url: '/tool/genPlus/genDataModel/queryByPrimarykeyId/' + id,
    method: 'get'
  })
}

// 新增数据模型
export function addModel(data) {
  return request({
    url: '/tool/genPlus/genDataModel/saveOrUpdate',
    method: 'post',
    data: data
  })
}
export function updateModel(data) {
  return request({
    url: '/tool/genPlus/genDataModel/saveOrUpdate',
    method: 'post',
    data: data
  })
}
// 数据同步
export function syncModel(id) {
  return request({
    url: '/tool/genPlus/genDataModel/syncDataByPrimarykeyId/'+id,
    method: 'get',
  })
}

// 数据同步
export function genModelStatusById(id,status) {
  return request({
    url: '/tool/genPlus/genDataModel/genModelStatusById/'+id+'/'+status,
    method: 'get',
  })
}

// 根据表名生成数据模型
export function genModelByTableName(tableName) {
  return request({
    url: '/tool/genPlus/genDataModel/genModelByTableName/'+tableName,
    method: 'get',
  })
}

// 删除数据模型
export function delModel(id) {
  return request({
    url: '/tool/genPlus/genDataModel/deleteByPrimarykeyId/' + id,
    method: 'delete'
  })
}

// 删除数据批量删除模型
export function delModels(ids) {
  return request({
    url: '/tool/genPlus/genDataModel/deleteByPrimarykeyIds/' + ids,
    method: 'delete'
  })
}

// 导出数据模型
export function exportModel(data) {
  return request({
    url: '/tool/genPlus/genDataModel/dataModelExport/export',
    method: 'post',
    data: data
  })
}