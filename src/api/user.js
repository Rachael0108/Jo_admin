import { get,post } from '../config/http.js'

export const login = (data) => {
    return post({
        url: '/user/login',
        method: 'post',
        data
    })
}

// export const logout = () => {
//     return request({
//         url: '/logout',
//         method: 'post',
//     });
// };
//
// export const register = async () => {
//     return request({
//         url: '/register',
//         method: 'post',
//     });
// };
//
