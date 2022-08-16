import request from '@/utils/request'

// 查询登录日志列表
export function list(query) {
  return request({
    url: '/system/logininfor/list',
    method: 'get',
    params: query
  })
}

//查询个人登录记录
export function userList(query) {
  return request({
    url: '/system/logininfor/userList',
    method: 'get',
    params:query
  })
}

// 删除登录日志
export function delLogininfor(infoId) {
  return request({
    url: '/system/logininfor/' + infoId,
    method: 'delete'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: '/system/logininfor/clean',
    method: 'delete'
  })
}
