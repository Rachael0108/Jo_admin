import http from '../config/request'

var  baseURL= 'http://127.0.0.1'

export const POST = (url, data = {}) => {
    return http.post(baseURL + url, data)
}

// get 请求
export const GET = (url, data = {}) => {
    return http.get(baseURL + url, {
        params: data
    })
}
