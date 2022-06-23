/**
* @配置数据路信息
* */
let mysql = require('mysql')
// 连接池

let db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Yy089290',
    database: 'dbase_test',
})

module.exports = db
