import axios from 'axios'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/api', // url = base url + request url
 // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(function(config){
  const token=store.state.user.token
  //console.log("我是拦截器,token为:",token);
   if(token){
  
    config.headers.Authorization=`Bearer ${token}`

   }
   return config
},function(error){

  return Promise.reject(error)
})


// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
 if(!response.data.success){
  return Promise.reject(new Error(response.data.message))
 }else{
  return response.data
 }
 // return response
}, function (error) {
  // 对响应错误做点什么
 // console.log('--',error);
 if(error.response.data.code===10002){
  store.dispatch('user/logout')
  //router.push('/login')
  router.push({
    path:'/login',
    query:{
      redirect:location.hash.substring(1)
    }
  })

 }
  return Promise.reject(error);
});

export default service