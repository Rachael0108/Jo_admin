let express = require('express')
let app = express()
let cors = require('cors')/*
  中间件解析 json 和 urllencode格式的数据
 */
let bodyParser = require('body-parser')
let router = require('./router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extented: false}))
app.use(cors())
app.use(router)
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

const port = process.env.PORT|| 80;

app.listen(port, ()=>{
    console.log('server success ！')
})

