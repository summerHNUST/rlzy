
// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'


// const state = {
//   token: getToken(),
//   name: '',
//   avatar: ''
// }

// const mutations = {
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         commit('SET_TOKEN', '')
//         removeToken()
//         resetRouter()
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       commit('SET_TOKEN', '')
//       removeToken()
//       resolve()
//     })
//   }
// }
import { getToken, setToken, removeToken} from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

export default {
  namespaced: true,
  state:{
    token:getToken()||'',
    userInfo:{}
  },
  mutations:{
    updateToken(state,token){
      state.token=token
      //存储token
      setToken(token)
    },
    updateUserInfo(state,userInfo){
      state.userInfo=userInfo
    },
    removeToken(state){
      state.token=''
      removeToken()
    },
    removeUserInfo(state){
      state.userInfo={}
    }

  },
  actions:{
   async userLogin(context,loginForm){
      const res = await login(loginForm)
      context.commit('updateToken',res.data)
      return res
    },
   async getUserProfile(context){
      const res = await getUserInfo()
      const res2= await getUserDetailById(res.data.userId)
      context.commit('updateUserInfo',{...res.data,...res2.data})
     
    },
    logout(context){
      context.commit('removeToken')
      context.commit('removeUserInfo')
    }
  },
  getters:{
    
  }
}

