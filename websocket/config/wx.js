const urlencode = require('urlencode');

// 莞数科技
const wxAuth = {
  APPID: 'wx32f119d971b97acf',
  // APPID: 'wx8f4191d1757a02eb', // 微信测试平台appid
  // APPSECRET: '0c7fae6e850c2ec3949ff98251675916',
  APPSECRET: 'b4f491bc7f47c3fe9910a196c18d1685',
  // REDIRECT_URI: urlencode('hui-m.dgjy.net'),
  REDIRECT_URI: urlencode('http://wx.dgdatav.com/nhcapi/wechatAccessToken'),
  RESPONSE_TYPE: 'code',
  SCOPE: 'snsapi_userinfo'
}

module.exports = wxAuth
