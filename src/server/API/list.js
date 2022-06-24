let db = require('../dbase/index')
exports.all = (req, res) => {
    var sql = 'select * from userlist'
    db.query(sql, (err,data) => {
        if(err){
            return res.send('error')
        }
        res.send(data)
        console.log(data)
    })
}
