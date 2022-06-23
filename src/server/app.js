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
const port = process.env.PORT|| 80;

app.listen(port, ()=>{
    console.log('server success ！')
})

