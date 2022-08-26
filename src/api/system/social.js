import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询用户列表
export function listSocialUser(query) {
  return request({
    url: '/system/social/social-user-list',
    method: 'get',
    params: query
  })
}

//解除绑定
export function socialUnbind(data) {
  return request({
    url: '/system/social/social-unbind',
    method: 'post',
    data: data
  })
}