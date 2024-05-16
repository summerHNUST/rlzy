import request from '@/utils/request'
export function getDepartmentList(){  
    return request({
        method:'get',
        url:'/company/department'
    })
}

export function addDepartment(data){
    return request({
        method:'post',
        url:'/company/department',
        data
    })
}