import Cookies from 'js-cookie';

const TokenKey = "authorized-token";

//获取token
export function getToken() {
    return Cookies.get(TokenKey)
}
//移除token
export function removeToken() {
    Cookies.remove(TokenKey)
}

//获取当前返回URL中的账号和来源
export function getAccount() {
    let index = window.location.href.lastIndexOf("?");
    let datalist = window.location.href.substring(index + 1, window.location.href.length);
    let data = datalist.split('&')
    let obj = {};
    data.map((e) => {
        obj[e.split("=")[0]] = e.split("=")[1];
    })
    return obj
}

