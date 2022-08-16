import request from '@/utils/request'


// 查询数据库中所有的表数据
export function queryDatabase() {
    return request({
      url: '/tool/genPlus/genFunction/queryDatabase',
      method: 'get',
    })
}

// 查询数据库中所有的表数据
export function queryDatabaseColumn(tableName) {
  return request({
    url: '/tool/genPlus/genFunction/queryDatabaseColumn/'+tableName,
    method: 'get',
  })
}

//功能模块保存或者修改
export function saveFunction(info) {
  return request({
    url: '/tool/genPlus/genFunction/saveOrUpdate',
    method: 'post',
    data:info
  })
}

//代码生成
export function genCode(tableId) {
  return request({
    url: '/tool/genPlus/genFunction/toGenerateByZip/'+tableId,
    method: 'get',
  })
}

//分页查询
export function queryByParams(params) {
  return request({
    url: '/tool/genPlus/genFunction/queryByParams',
    method: 'post',
    data: params
  })
}

//主键id查询
export function getGenFunctionById(id) {
  return request({
    url: '/tool/genPlus/genFunction/queryByPrimaryKeyId/'+id,
    method: 'get'
  })
}

//物理删除
export function delById(id) {
  return request({
    url: '/tool/genPlus/genFunction/deleteByPrimaryKeyId/'+id,
    method: 'delete'
  })
}

//物理批量删除
export function delByIds(ids) {
  return request({
    url: '/tool/genPlus/genFunction/deleteBatchByPrimaryKeyIds'+ids,
    method: 'delete',
  })
}

//代码预览
export function previewTable(id) {
  return request({
    url: '/tool/genPlus/genFunction/preview/' + id,
    method: 'get'
  })
}


