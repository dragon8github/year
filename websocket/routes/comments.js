'use strict'

let Router = require('koa-router')
const Comment = require('../controller/comment')
// api 地址
module.exports = function () {
    var router = new Router({
        prefix:'/nhcapi'
    })
    router.get('/', Comment.homeIndex)
    router.get('/wechatAuth', Comment.wechatAuth)
    router.get('/wechatAccessToken', Comment.wechatAccessToken)
    router.post('/userInfo', Comment.getUserInfo)
    router.post('/addComment', Comment.addComment)
    router.get('/getComment',Comment.getComment)
    return router
}


