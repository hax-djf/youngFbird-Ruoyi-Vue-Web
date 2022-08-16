import request from '@/utils/request'

// 查询代码生成历史记录列表
export function listHistory(query) {
  return request({
    url: '/tool/gen/history/list',
    method: 'get',
    params: query
  })
}

// 查询代码生成历史记录详细
export function getHistory(id) {
  return request({
    url: '/tool/gen/history/' + id,
    method: 'get'
  })
}

// 新增代码生成历史记录
export function addHistory(data) {
  return request({
    url: '/tool/gen/history',
    method: 'post',
    data: data
  })
}

// 修改代码生成历史记录
export function updateHistory(data) {
  return request({
    url: '/tool/gen/history',
    method: 'put',
    data: data
  })
}

// 删除代码生成历史记录
export function delHistory(id) {
  return request({
    url: '/tool/gen/history/' + id,
    method: 'delete'
  })
}

// 导出代码生成历史记录
export function exportHistory(query) {
  return request({
    url: '/tool/gen/history/export',
    method: 'get',
    params: query
  })
}