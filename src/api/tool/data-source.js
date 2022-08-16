import request from '@/utils/request'

// 查询数据源列表
export function listDatasourceConfig(query) {
  return request({
    url: '/tool/gen/data-source/list',
    method: 'get',
    params: query
  })
}

// 查询数据源详细
export function getDatasourceConfig(id) {
  return request({
    url: '/tool/gen/data-source/' + id,
    method: 'get'
  })
}

// 新增数据源
export function addDatasourceConfig(data) {
  return request({
    url: '/tool/gen/data-source',
    method: 'post',
    data: data
  })
}

// 修改数据源
export function updateDatasourceConfig(data) {
  return request({
    url: '/tool/gen/data-source',
    method: 'put',
    data: data
  })
}

// 删除数据源
export function delDatasourceConfig(id) {
  return request({
    url: '/tool/gen/data-source/' + id,
    method: 'delete'
  })
}

// 导出数据源
export function exportDatasourceConfig(query) {
  return request({
    url: '/tool/gen/data-source/export',
    method: 'get',
    params: query
  })
}