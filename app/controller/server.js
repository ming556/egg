'use strict';

const Controller = require('egg').Controller;

class ServerController extends Controller {
  async serve() {
    const { ctx } = this;
    console.log(ctx.query, '====>ctx.query');
    const body = await ctx.service.server.server(ctx.query);
    console.log(body);
    ctx.body = {
      data: body,
    };
  }
}

module.exports = ServerController;
