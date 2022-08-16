import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  return request({
    url: '/oauth2/token/login-password',
    method: 'post',
    data: { username, password, code, uuid }
  })
}
export function smsLogin(mobile,mobileCode,grant_type) {
  return request({
    url: '/oauth2/token/login-mobile',
    method: 'post',
    data: { mobile, mobileCode,grant_type}
  })
}

// 社交登录，使用 code 授权码
export function socialLogin(type, code, state, grant_type) {
  return request({
    url: '/oauth2/token/login-social',
    method: 'post',
    data: {type,code,state,grant_type}
  })
}

// 社交登录，使用 code 授权码
export function socialLogin2(type, code, state, username,password,grant_type) {
  return request({
    url: '/oauth2/token/login-social2',
    method: 'post',
    data: {
      type,
      code,
      state,
      username,
      password,
      grant_type
    }
  })
}

// 刷新方法
export function refreshToken() {
  return request({
    url: '/oauth2/token/refresh',
    method: 'post'
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/oauth2/token/logout',
    method: 'delete'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/code',
    method: 'get'
  })
}

// 获取短信验证码
export function getSmsCode(mobile) {
  return request({
    url: '/oauth2/token/loginSmsCode/' + mobile,
    method: 'get'
  })
}

