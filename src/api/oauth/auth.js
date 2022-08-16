import request from '@/utils/request'

// 社交授权的跳转
export function socialAuthRedirect(type, redirectUri) {
  return request({
    url: '/system/social/open/social-auth-redirect?type=' + type + '&redirectUri=' + redirectUri,
    method: 'get'
  })
}




