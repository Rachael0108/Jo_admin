/**
 * @操作数据库
 * */

let db = require('../dbase/index')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.login = (req, res) => {
    var sql = 'select * from user where account = ? and password = ?'
    db.query(sql, [req.query.account, req.query.password], (err, data) => {
        if(err) {
            return res.send({
                status: 400,
                message: "登录失败"
            })
        }

        if(data.length > 0) {
            res.send({
                status: 200,
                message: "登录成功"
            })
        }else{
            console.log(data)

            res.send({
                status: 202,
                message: '用户名或密码错误'
            })
        }
    })
}
