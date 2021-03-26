/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'edu',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '123456',
    },
    client: {
      port: '6379', // Redis port
      host: 'localhost', // Redis host
      password: '', // 密码
      db: 1, // 存储区
    },
    security: {
      csrf: {
        enable: false,
      }, // 必须加 否则： 403 Forbidden message: "missing csrf token"
      // domainWhiteList: [ '*' ]
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    jwt: {
      secret: '123456',
    },
  };
  // config.security = {
  //   csrf: {
  //     headerName: 'x-csrf-token', // 自定义请求头
  //   },
  // };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1616401305414_9199';
  // eslint-disable-next-line array-bracket-spacing
  config.middleware = [];
  // add your middleware config here
  // 添加view配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
