export default {
    // 签名秘钥
    signSecret: '916lWh2WMcbSWiHv', //目前未加密处理，明文传输，后续加上
    // 密码正则
    passwordReg: /^.{6,}$/,
    passwordRegDesc: '密码最少为6位字符',
    userUploadUrl: `${process.env.VUE_APP_API_ROOT}/user/file/upload`,
}

/**
 * API 异常数据的处理状态
 */
 export const InfApiErrorLogProcessStatusEnum = {
    INIT: 0, // 未处理
    DONE: 1, // 已处理
    IGNORE: 2// 已忽略
 }

 /**
 * 用户的社交平台的类型枚举
 */
export const SystemUserSocialTypeEnum = {
  GITEE: {
    title: "码云",
    type: 10,
    source: "gitee",
    img: "https://cdn.jsdelivr.net/gh/justauth/justauth-oauth-logo@1.11/gitee.png",    
  }
}

export const SystemUserSocialList  = [
  {
    title: "码云",
    type: 10,
    source: "gitee",
    img: "https://cdn.jsdelivr.net/gh/justauth/justauth-oauth-logo@1.11/gitee.png",
  }
]

 /**
 * 微服务的api前缀
 */
  export const FlybirdsServiceApiPrefix = {
    SYSTEM_API: 'system', 
    SMS_API: 'sms', 
    OSS_API: 'oss',  
    OAUTH_API: 'oauth2'
 }

 /**
 * 微服务的api前缀
 */
  export const FlybirdsServiceToApiPrefix = [
    {
      value: 'system',
      label: 'young-flybirds-system'
    },
    {
      value: 'sms',
      label: 'young-flybirds-sms'
    },
    {
      value: 'oss',
      label: 'young-flybirds-oss'
    },
    {
      value: 'oauth2',
      label: 'young-flybirds-oauth'
    }
  ]