'use strict';

const Service = require('egg').Service;

class ServerController extends Service {
  async serve(val) {
    const { ctx } = this;
    const user = await ctx.model.server.register(val);
    console.log(user);
  }
}

module.exports = ServerController;
