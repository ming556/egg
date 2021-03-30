'use strict';

const Controller = require('egg').Controller;

class ServerController extends Controller {
  async serve() {
    const { ctx } = this;
    console.log(ctx.query, '====>ctx.query');
    const body = await ctx.service.server.serve(ctx.query);
    ctx.body = {
      data: body,
    };
  }
  async register() {
    const { ctx } = this;
    console.log(ctx.request.body, '====>ctx.request.body');
    const body = await ctx.service.server.register(ctx.request.body);
    console.log(body);
    ctx.body = {
      data: body,
    };
  }
  // 修改会员的信息
  async putserver() {
    const { ctx } = this;
    console.log(ctx.query, '====>ctx.query');
    const body = await ctx.service.server.putserver(ctx.query);
    console.log(body);
    ctx.body = {
      data: body,
    };
  }
  // 删除会员信息
  async deleteserver() {
    const { ctx } = this;
    console.log(ctx.query, '====>ctx.query');
    const body = await ctx.service.server.deleteserver(ctx.query);
    console.log(body);
    ctx.body = {
      data: body,
    };
  }
}

module.exports = ServerController;
