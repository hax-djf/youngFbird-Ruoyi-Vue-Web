import request from '@/utils/request'

// 查询动态列表
export function listDynamic(query) {
  return request({
    url: '/system/dynamic/list',
    method: 'get',
    params: query
  })
}

// 查询动态列表{用户查询无权限}
export function userListDynamic(query) {
  return request({
    url: '/system/dynamic/userList',
    method: 'get',
    params: query
  })
}

// 查询动态详细
export function getDynamic(dynamicId) {
  return request({
    url: '/system/dynamic/' + dynamicId,
    method: 'get'
  })
}

// 新增动态
export function addDynamic(data) {
  return request({
    url: '/system/dynamic',
    method: 'post',
    data: data
  })
}

// 修改动态
export function updateDynamic(data) {
  return request({
    url: '/system/dynamic',
    method: 'put',
    data: data
  })
}

// 删除动态
export function delDynamic(dynamicId) {
  return request({
    url: '/system/dynamic/' + dynamicId,
    method: 'delete'
  })
}