'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwtErr = middleware.jwtErr(app.config.jwt);
  // 注册
  router.post('/api/register', controller.home.info);
  // 登录
  router.get('/api/login', controller.home.index);
  // 查询所有用户
  router.post('/api/all', jwtErr, controller.home.all);
  // 修改密码
  router.put('/api/edit', jwtErr, controller.home.edit);
  // router.get('/news', controller.news.list);
  // 新增用户信息
  router.post('/api/create', jwtErr, controller.home.create);
  // 查询用户信息
  router.post('/api/editmenu', jwtErr, controller.home.editmenu);
  // 查询用户信息
  router.get('/api/server', jwtErr, controller.server.serve);

};
