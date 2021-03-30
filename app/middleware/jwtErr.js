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
        // const username = ctx.cookies.get('username', { signed: false });
        // await next();
        console.log('decode======>', decode);
        // if () {
        // const redis_token = await ctx.app.redis.get(username); // 获取redis中的token
        // console.log(redis_token, '===>redis_token');
        // 验证是否为最新的token
        // if (token === redis_token) {
        await next();
        // } else {
        //   // 如果不是最新token，则代表用户在另一个机器上进行操作，需要用户重新登录保存最新token
        //   ctx.body = {
        //     code: 401,
        //     msg: '您的账号已在其他机器保持登录，如果继续将清除其他机器的登录状态',
        //   };
        // }
        // }
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
