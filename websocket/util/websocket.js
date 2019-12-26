const WebSocket = require('ws')
const Comment = require('../models/comment')

const wss = new WebSocket.Server({port: 7878})
global.wssList = []
wss.initSendData = _=> {
  wss.on('connection', async ws => {
    console.log('server connection')
    ws.on('message', msg => {
      console.log('server receive msg：', msg)
    });
    try {
      // 全部数据
      result = await Comment.find()
    } catch (error) { 
      result = error
    }
    // 当前连接
    ws.send(JSON.stringify(result))
    wssList.push(ws)
  })
}

wss.saveSendData = _=> {
  try {
    wssList.forEach(async function each(client) {
      if (client && client.readyState === WebSocket.OPEN) {
        result = await Comment.find()
        client.send(JSON.stringify(result))
      }
    })
  } catch (e) {
    console.log(e)
  }
}
module.exports = wss