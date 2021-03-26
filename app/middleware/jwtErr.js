'use strict';
// token中间键
// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async function jwtErr(ctx, next) {
    // 获取头部token
    const token = ctx.request.header.authorization;
    // console.log(ctx.request.header);
    let decode = '';
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
        console.log('decode======>', decode);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          ctx.status = 401;
          ctx.body = {
            msg: 'token已过期，请重新登录',
            code: '401',
          };
          return;
        } else if (error.name === 'JsonWebTokenError') {
          ctx.status = 401;
          ctx.body = {
            msg: '无效的token',
            code: '401',
          };
          return;
        }
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: 'token不存在',
        code: '401',
      };
      return;
    }
  };
};
