import request from '@/utils/request'

// 邮箱注册用户
export function registerByEmail(data) {
  return request({
    url: '/system/register/email',
    method: 'post',
    data: data
  })
}
//邮箱验证码发送
export function registerCodeByEmail(query) {
    return request({
      url: '/system/register/email/code',
      method: 'get',
      params: query
    })
}

// 手机号注册用户
export function registerByPhone(data) {
    return request({
      url: '/system/register/phone',
      method: 'post',
      data: data
    })
}

//手机验证码发送
export function registerCodeByPhone(query) {
    return request({
      url: '/system/register/phone/code',
      method: 'get',
      params: query
    })
}

