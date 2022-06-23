import axios from "axios";
import qs from "qs";

// axios.defaults.baseURL = 'http://hp.suoluomei.cn/index.php'  //正式
axios.defaults.baseURL = 'http://hp.suoluomei.cn/index.php' //测试

//post请求头
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        Dialog.alert({
            title: "提示",
            message: "网络请求失败，请刷新重试"
        });
    }
);
// 通过promise拿到回调
export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: qs.stringify(data),
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },

    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: data,
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
};

const api_key = '233d4cad34c34d343785s34dw3er3ds3234esd4'
let sign = process.env.VUE_APP_SIGN
if (process.env.NODE_ENV === 'production') {
    sign = localStorage.getItem("sign")
} else {
    sign = '17a1920fdc3c3c25d1bf7c6dd724f5cf'
}

export const post = (url, data = {}) =>
    post(
        url,
        Object.assign({
                api_key: api_key,
                sign,
            },
            // {
            //   data: Object.assign({
            //       role_id: role_id //如果需要再包层data就这样写
            //     },
            //     data
            //   )
            // }
            data
        )
    )
export const get = (url, params = {}) =>
   get(
        url,
        Object.assign({
                api_key: api_key,
                sign
            },
            params
        )
    )


