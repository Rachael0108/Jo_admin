import axios from 'axios'
import qs from 'qs'
import router from "../router";
import store from '../store/index';

    const instance = axios.create({
        baseURL: 'http://127.0.0.1',
        timeout: '5000',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        cors: true,
        //消息框消失时间
        messageDuration: 3000,
        //最长请求时间
        requestTimeout: 10000,
    })
    //请求
    instance.interceptors.request.use(
        (config) => {
            if (store.getters['user/accessToken']) {
                config.headers['Access-Token'] = store.getters['user/accessToken'];
            }
            if (
                config.data &&
                config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
            )
                config.data = qs.stringify(config.data);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    //响应
    instance.interceptors.response.use(
        (res) => {
            if (res.status === 200) {
                if (res.data.status === 2000) {
                    return res.data
                } else if (res.data.status === 4003) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('userInfo')
                    router.push({name: 'login'})
                } else if (res.data.status) {
                    return res.data
                } else if (!res.data.status) {
                    return res
                }
                return res.data
            } else {
                console.log('系统异常，请稍后再试')
            }
        },
        (error) => {
            console.log(error)
        }
    );

export default instance
