import { login,smsLogin,socialLogin,socialLogin2 ,logout, getInfo, refreshToken } from '@/api/login'
import { getToken, setToken, setExpiresIn, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    expires_in:'',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_EXPIRES_IN: (state, time) => {
      state.expires_in = time
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          let data = res.data
          setToken(data.accessToken)
          commit('SET_TOKEN', data.accessToken)
          setExpiresIn(data.expires_in)
          commit('SET_EXPIRES_IN', data.expires_in)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SmsLogin({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim();
      const mobileCode = userInfo.mobileCode;
      const grant_type = "sms";
      return new Promise((resolve, reject) => {
        smsLogin(mobile,mobileCode,grant_type).then(res => {
          let data = res.data
          setToken(data.accessToken)
          commit('SET_TOKEN', data.accessToken)
          setExpiresIn(data.expires_in)
          commit('SET_EXPIRES_IN', data.expires_in)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 社交登录
    SocialLogin({ commit }, userInfo) {
        const code = userInfo.code
        const state = userInfo.state
        const type = userInfo.type
        const grant_type = "social";
        return new Promise((resolve, reject) => {
          socialLogin(type, code, state,grant_type).then(res => {
            let data = res.data
            setToken(data.accessToken)
            commit('SET_TOKEN', data.accessToken)
            setExpiresIn(data.expires_in)
            commit('SET_EXPIRES_IN', data.expires_in)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
    },

    // 社交登录+ 绑定
    SocialLogin2({ commit }, userInfo) {
      const code = userInfo.code
      const state = userInfo.state
      const type = userInfo.type
      const username = userInfo.username.trim()
      const password = userInfo.password
      const grant_type = "social";
      return new Promise((resolve, reject) => {
        socialLogin2(type, code, state, username, password,grant_type).then(res => {
            let data = res.data
            setToken(data.accessToken)
            commit('SET_TOKEN', data.accessToken)
            setExpiresIn(data.expires_in)
            commit('SET_EXPIRES_IN', data.expires_in)
            resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = user.avatar == "" ? require("@/assets/images/profile.jpg") : user.avatar;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 刷新token
    RefreshToken({commit, state}) {
      return new Promise((resolve, reject) => {
        refreshToken(state.token).then(res => {
          setExpiresIn(res.data)
          commit('SET_EXPIRES_IN', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
