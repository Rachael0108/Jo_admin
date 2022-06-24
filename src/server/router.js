/**
 * @配置路由
 * */
let express = require('express')
let router = express.Router()

let user = require('./API/user')
let info = require('./API/list')

/**
 * @后端路由和前端接口地址统一
 * */
router.get('/user/login', user.login)     // 这里用post失败，但是get成功

router.get('/user/list', info.all )

module.exports = router
