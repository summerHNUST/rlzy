import request from '@/utils/request'
/**
 * 
 * @param {Object} data  登录需要的参数对象
 * @returns 返回的结果 
 */
export function login(data) {
    return request({
        method:'post',
        url:'/sys/login',
        data
    })
  
}

export function getUserInfo() {
    return request({
        method:'post',
        url:'/sys/profile'
    })
 
}

//获取用户头像
export function getUserDetailById(id){
    return request({
        method:'get',
        url:'/sys/user/'+id
    })
}

// export function logout() {
  
// }
