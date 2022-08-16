import Cookies from 'js-cookie'

//token
const TokenKey = 'FBIRD_TOKEN'
//过期时间
const ExpiresInKey = 'FBIRD_EXPIRES_IN'
//租户id
const TenantIdKey = 'FBIRD_TENANT_ID'


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTenantId() {
  return Cookies.get(TenantIdKey)
}

export function setTenantId(tenantId) {
  return Cookies.set(TenantIdKey, tenantId)
}

export function removeTenantId() {
  return Cookies.remove(TenantIdKey)
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time)
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey)
}
