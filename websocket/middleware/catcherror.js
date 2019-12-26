const { HttpException } = require('../util/exception')

// 统一异常处理中间件
const catchError = async (ctx,next) => {
  try{
      await next()
  } catch(error){
    if (error instanceof HttpException){
        return ctx.body = error.msg
    }
  }
}
 
module.exports = catchError
