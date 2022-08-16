import request from '@/utils/request'

// 查询模板组列表
export function listTemplateGroup(query) {
  return request({
    url: '/tool/gen/template-group/list',
    method: 'get',
    params: query
  })
}

// 查询模板组详细
export function getTemplateGroup(id) {
  return request({
    url: '/tool/gen/template-group/' + id,
    method: 'get'
  })
}

// 新增模板组
export function addTemplateGroup(data) {
  return request({
    url: '/tool/gen/template-group',
    method: 'post',
    data: data
  })
}

// 修改模板组
export function updateTemplateGroup(data) {
  return request({
    url: '/tool/gen/template-group',
    method: 'put',
    data: data
  })
}

// 删除模板组
export function delTemplateGroup(id) {
  return request({
    url: '/tool/gen/template-group/' + id,
    method: 'delete'
  })
}

// 导出模板组
export function exportTemplateGroup(query) {
  return request({
    url: '/tool/gen/template-group/export',
    method: 'get',
    params: query
  })
}