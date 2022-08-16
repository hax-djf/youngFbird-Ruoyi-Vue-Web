import request from '@/utils/request'

// 找回免密发送短信验证码
export function retrieveCodeByPhone(query) {
  return request({
    url: '/system/retrieve/password/phone/code',
    method: 'get',
    params: query
  })
}

// 找回密码、邮箱验证码发送
export function retrieveCodeByEmail(query) {
    return request({
      url: '/system/retrieve/password/email',
      method: 'get',
      params: query
    })
}

// 校验手机用户的code是否正确，返回重置密码Code
export function retrieveCheckPhone(data) {
    return request({
      url: '/system/retrieve/password/check/phone-code',
      method: 'post',
      data: data
    })
}

//设置密码
export function retrieveReset(data) {
    return request({
      url: '/system/retrieve/password/reset',
      method: 'post',
      data: data
    })
}

