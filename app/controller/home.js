'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 注册
  async info() {
    const { ctx } = this;
    const body = await ctx.service.home.register(ctx.request.body);
    // const token = this.app.jwt.sign({ name, password }, '123456', { expiresIn: '1h' }); // token签名 有效期为1小时

    ctx.body = {
      data: body,
    };
  }
  // 登录
  async index() {
    const { ctx } = this;
    const body = await ctx.service.home.login(ctx.query);
    const username = ctx.query.username;
    const password = ctx.query.password;
    // 创建token
    const token = this.app.jwt.sign({ username, password }, '123456', { expiresIn: '30 days' }); // token签名 有效期为1小时
    ctx.body = {
      data: body,
      token,
    };
  }
  // 查询所以用户
  async all() {
    const { ctx } = this;
    const body = await ctx.service.home.all(ctx.request.body);
    ctx.body = {
      data: body,
    };
  }
  // 修改密码
  async edit() {
    const { ctx } = this;
    console.log(ctx.query);
    const body = await ctx.service.home.edit(ctx.request.body);
    console.log(body);
    ctx.body = {
      data: body,
    };
  }
  // 修改会员数据
  async create() {
    const { ctx } = this;
    console.log(ctx.query);
    const body = await ctx.service.home.create(ctx.request.body);
    console.log(body);
    ctx.body = {
      data: body,
    };
  }
  // 查询会员详情
  async editmenu() {
    const { ctx } = this;
    console.log(ctx.request.body, ctx.query, '====>ctx.request.body');
    const body = await ctx.service.home.editmenu(ctx.request.body);
    console.log(body);
    ctx.body = {
      data: body,
    };
  }
}
module.exports = HomeController;
