/**
 * @配置路由
 * */
let express = require('express')
let router = express.Router()

let user = require('./API/user')

router.post('/user/login', user.login)

module.exports = router
