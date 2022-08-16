// 导出参数
import request from "@/utils/request";

export function exportHtml(apiPrefix) {
  return request({
    url: '/'+ apiPrefix +'/db/doc/export-html',
    method: 'get',
    responseType: 'blob'
  })
}

export function exportWord() {
  return request({
    url: '/'+ apiPrefix +'/db/doc/export-word',
    method: 'get',
    responseType: 'blob'
  })
}

export function exportMarkdown() {
  return request({
    url: '/'+ apiPrefix +'/db/doc/export-markdown',
    method: 'get',
    responseType: 'blob'
  })
}
