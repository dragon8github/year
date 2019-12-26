
const mongoose = require('../dbHelp/index')

let commentSchma = new mongoose.Schema({
    commentId: { type: String, unique: true},
    headimgurl: String,
    userName:String,
    content: String,
    createTime: Date,
    isShow: Boolean
})
// 模式创建模型
module.exports = mongoose.model('Comment',commentSchma)
