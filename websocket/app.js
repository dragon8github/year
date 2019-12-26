const Koa = require('koa')
const cors = require('koa2-cors');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const catchError = require('./middleware/catcherror')
// const websockify = require('koa-websocket')
const WebSocket = require('ws');

const ws = require('./util/websocket')

const app = new Koa()

app.use(catchError)

require('./dbHelp/index')

ws.initSendData()
// error handler
onerror(app)
app.use(cors())
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(comments.routes(), comments.allowedMethods())
const router = require('./routes/comments')()

app.use(router.routes())
   .use(router.allowedMethods())

// app.use(async (ctx, next) => {
//   if (parseInt(ctx.response.status) === 404) {
//     ctx.throw(404)
//   } else {
//     next()
//   }
// })
// error-handling
app.on('error', (err, ctx) => {
  console.log(err)
  ctx.body = {
    code: err.errorCode,
    msg: err.msg || '请联系管理员，服务发生异常'
  }
  // 后续改成错误页面
})

module.exports = app
