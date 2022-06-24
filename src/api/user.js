import { GET, POST } from '../api/index'

export const login = async (data) => {
    return GET( '/user/login', data)
}

export const userList = async (data) => {
    return GET('/user/list',data)
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
