const mongoose = require('../dbHelp/index')
let userSchma = new mongoose.Schema({
    openid: String,
    nickname: String,
    headimgurl: { type: String, index: true }
})
// 模式创建模型
module.exports = mongoose.model('User',userSchma)
