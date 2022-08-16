import request from '@/utils/request'

// 查询模板列表
export function listTemplateConfig(query) {
  return request({
    url: '/tool/gen/template-config/list',
    method: 'get',
    params: query
  })
}

// 查询模板详细
export function getTemplateConfig(id) {
  return request({
    url: '/tool/gen/template-config/' + id,
    method: 'get'
  })
}

// 新增模板
export function addTemplateConfig(data) {
  return request({
    url: '/tool/gen/template-config',
    method: 'post',
    data: data
  })
}

// 修改模板
export function updateTemplateConfig(data) {
  return request({
    url: '/tool/gen/template-config',
    method: 'put',
    data: data
  })
}

// 删除模板
export function delTemplateConfig(id) {
  return request({
    url: '/tool/gen/template-config/' + id,
    method: 'delete'
  })
}

// 导出模板
export function exportTemplateConfig(query) {
  return request({
    url: '/tool/gen/template-config/export',
    method: 'get',
    params: query
  })
}