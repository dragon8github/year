const mongoose = require('mongoose')
const config = require('../config/index')

// connect mongoDb
mongoose.connect(config.mongoDb, {
  useNewUrlParser:true,
  useUnifiedTopology: true
})
/**
 * mongoose从@5.2.8后会弃用一些指令，为防止程序如下警告：
 * (node:24864) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
 * (node:24841) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
 * 可以如下设置
 */
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

//连接成功
mongoose.connection.on('connected', function() {
  console.log(`mongoose connection open to ${config.mongoDb}`)
})
//连接异常
mongoose.connection.on('error', function (err) {
  console.log(`mongoose connection error: ${err}`)
})
//连接断开
mongoose.connection.on('disconnected', function() {
  console.log(`mongoose connection disconnected`)
})

module.exports = mongoose