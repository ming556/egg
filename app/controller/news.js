'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const { ctx } = this;
    // const newsList = [
    //   { id: 1, title: 'this is news 1', url: '/news/1' },
    //   { id: 2, title: 'this is news 2', url: '/news/2' },
    // ];
    const newsList = await ctx.service.news.list();
    console.log(newsList);
    // await ctx.render(newsList);
    ctx.body = {
      code: 200,
      msg: 'scusse',
      data: newsList,
    };
  }
}
module.exports = NewsController;

