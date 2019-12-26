const WebSocket = require('ws')
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const UUID = require('uuid')
const superagent = require('superagent')

const HttpException  = require('../util/exception')

app.use(bodyParser())

// models
const Comment = require('../models/comment')
const User = require('../models/user')

// ws
const wss = require('../util/websocket')
const wx =  require('../config/wx')

exports.homeIndex = async(ctx) => {
  try {
    let title = 'hello，welcome 纳海川'
    await ctx.render('index',{ title })
  } catch (error) {
  }
}
exports.addComment = async(ctx) => {
  //创建这个模型的实例啦'
  let code, msg = '', newData = null
  try {
    const uuid = UUID.v1()
    const openid = ctx.request.body.openid
    if (!openid) {
     throw new HttpException('缺少openid，保存失败', -1, 400)
    }

    if (!ctx.request.body.content && ctx.request.body.content.trim() === '') {
      throw new HttpException('内容为空，保存失败', -1, 400)
    }

    let userInfo = null
    await User.findOne({ 'openid': openid }, (err, doc) => {
      if (err) {
        throw new HttpException(err, -1, 500)
       }
      if (doc && !err) {
        userInfo = doc
      }
    })
    const comment = new Comment({
      commentId: uuid,
      userName: userInfo.nickname || '',
      headimgurl: userInfo.headimgurl || '',
      content: ctx.request.body.content,
      createTime: Date.now(),
      isShow: true
    })
    await comment.save()
    wss.clients.forEach(async function each(client) {
      if (client && client.readyState === WebSocket.OPEN) {
        await Comment.findOne({'commentId': uuid}, (err, doc) => {
          if (err) {
            throw new HttpException(err, -1, 500)
           }
          if (doc && !err) {
            newData = doc
            client.send(JSON.stringify([doc]))
          }
        })
      }
    })
    code = 0
    ctx.body = {
      code,
      data: newData,
      msg
    }
  } catch (err) {
    ctx.app.emit('error', err, ctx)
  }
}
exports.getComment = async(ctx) => {
  let code, msg = '', result = []
  try {
    result = await Comment.find()
    code = 0
  } catch (err) { 
    const error = new HttpException(err, -1, 500)
    ctx.app.emit('error', error, ctx)
  }
  ctx.body = {
    code,
    data: result,
    msg
  }
}
// 微信登录
exports.wechatAuth = async(ctx) => {
  try {
    // 引导用户同意授权，获取code
    const AppID = wx.APPID
    const Redircet_uri = wx.REDIRECT_URI
    const Scope = wx.SCOPE
    const Response_type = wx.RESPONSE_TYPE

    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppID}&redirect_uri=${Redircet_uri}&response_type=${Response_type}&scope=${Scope}&state=STATE#wechat_redirect`
    ctx.response.redirect(url)
  } catch (err) {
    const error = new HttpException('微信授权异常', -1, 500)
    ctx.app.emit('error', error, ctx)
  }
}
// get accessToken and userInfo
exports.wechatAccessToken = async(ctx) => {
  // 通过code 获取access_token
  try {
    let access_token = null, openid = null
    let code = ctx.query.code
    if (!code) {
      throw new HttpException('缺少微信授权code', -1, 400)
    }
    const AppID = wx.APPID
    const AppSecret = wx.APPSECRET
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${AppID}&secret=${AppSecret}&code=${code}&grant_type=authorization_code`
    const data = await superagent.get(url)
    if (data && data.status === 200) {
      let result = JSON.parse(data.text)
      access_token = result.access_token
      openid = result.openid
      // 获取用户信息
     let resUserInfo = await superagent.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`)
     if (resUserInfo && resUserInfo.status === 200) {
      let resultUser = JSON.parse(resUserInfo.text)
       await User.findOne({ 'openid': resultUser.openid }, (err, doc) => {
        if (err) {
          throw new HttpException(err, -1, 500)
         }
         if (doc) {
          updateUser(resultUser) 
         } else {
          addUser(resultUser)
         }
       })
      // 重定向移动端首页
      ctx.status = 301
      // ctx.response.redirect(`/chat?openid=${resultUser.openid}`)
      // http://47.107.160.191:8882/#/chat
      ctx.response.redirect(`http://wx.dgdatav.com:8882/#/chat?openid=${resultUser.openid}`)
     }
    }
  } catch (e) {
    // 有可能微信报的错
    if (e.msg === '' || e.msg) {
      ctx.app.emit('error', e, ctx)
    } else {
      const error = new HttpException(e, -1, 500)
      ctx.app.emit('error', error, ctx)
    }
  }
}

// 获取当前用户
exports.getUserInfo = async(ctx) => {
  let msg = ''
  // let openid = ctx.query.openid
  const openid = ctx.request.body.openid
  try {
    let userInfo = {}
    await User.findOne({ openid: openid }, (err, doc) => {
      if (err) {
        throw new HttpException(`${err}，请尝试重新扫二维码登录`, -1, 500)
       }
      if (doc && !err) {
        userInfo.openid = doc.openid
        userInfo.nickname = doc.nickname
        userInfo.headimgurl = doc.headimgurl
      }
      code = 0
      userInfo = userInfo.openid ? userInfo : null
      ctx.body = {
        code,
        data: userInfo,
        msg
      }
    })
  } catch (err) { 
    ctx.app.emit('error', err, ctx)
  }
}
// add user
 async function addUser ({openid, nickname = '', headimgurl = ''}) {
  const user = new User({
    'openid': openid,
    'nickname': nickname,
    'headimgurl': headimgurl
  })
  await user.save()
}
// update user
function updateUser ({openid, nickname = '', headimgurl = ''}) {
  User.update({ 'openid': openid }, {'nickname':nickname, 'headimgurl': headimgurl }, (err, writeOpResult) => {
    if (err) {
      console.log(err)
    }
  })
}
