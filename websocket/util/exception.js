class HttpException extends Error{
  constructor (msg = '服务异常', errorCode = -1, code = 500){
      super()
      this.code = code // http 状态码
      this.errorCode = errorCode // 内部状态 0 成功 -1 失败
      this.msg = msg
  }
}
module.exports = HttpException