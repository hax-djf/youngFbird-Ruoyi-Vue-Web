import request from '@/utils/request'

// 创建短信模板
export function createSmsTemplate(data) {
  return request({
    url: '/sms/template/create',
    method: 'post',
    data: data
  })
}

// 更新短信模板
export function updateSmsTemplate(data) {
  return request({
    url: '/sms/template/update',
    method: 'put',
    data: data
  })
}

// 删除短信模板
export function deleteSmsTemplate(id) {
  return request({
    url: '/sms/template/delete?id=' + id,
    method: 'delete'
  })
}

// 获得短信模板
export function getSmsTemplate(id) {
  return request({
    url: '/sms/template/get?id=' + id,
    method: 'get'
  })
}

// 获得短信模板分页
export function getSmsTemplatePage(query) {
  return request({
    url: '/sms/template/page',
    method: 'get',
    params: query
  })
}

// 创建短信模板
export function sendSms(data) {
  return request({
    url: '/sms/template/send-sms',
    method: 'post',
    data: data
  })
}

// 导出短信模板 Excel
export function exportSmsTemplateExcel(query) {
  return request({
    url: '/sms/template/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

