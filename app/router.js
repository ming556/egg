'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller, middleware } = app;
  // token验证
  const jwtErr = middleware.jwtErr(app.config.jwt);
  // 登录
  router.get('/api/login', controller.home.index);
  // 注册
  router.post('/api/register', jwtErr, controller.home.info);
  // 查询所有账户
  router.post('/api/all', jwtErr, controller.home.all);
  // 修改账户信息
  router.put('/api/edit', jwtErr, controller.home.edit);
  // 新增账户信息
  router.post('/api/create', jwtErr, controller.home.create);
  // 查询账户信息
  router.post('/api/editmenu', jwtErr, controller.home.editmenu);
  // 查询会员信息
  router.get('/api/server', jwtErr, controller.server.serve);
  // 新增会员信息
  router.post('/api/server', jwtErr, controller.server.register);
  // 修改会员信息
  router.put('/api/server', jwtErr, controller.server.putserver);
  // 删除会员信息
  router.delete('/api/server', jwtErr, controller.server.deleteserver);
};
