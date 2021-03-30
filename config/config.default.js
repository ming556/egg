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

  const Op = require('sequelize').Op;
  const config = exports = {
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'edu',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '123456',
      define: { // model的全局配置
        timestamps: false, // 添加create,update,delete时间戳
        paranoid: true, // 添加软删除
        freezeTableName: true, // 防止修改表名为复数
        underscored: false, // 防止驼峰式字段被默认转为下划线
        distinct: true, // 去重
      },
      timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
      dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
        dateStrings: true,
        typeCast(field, next) {
          if (field.type === 'DATETIME') {
            return field.string();
          }
          return next();
        },
      },
      operatorsAliases: {
        $eq: Op.eq,
        $ne: Op.ne,
        $gte: Op.gte,
        $gt: Op.gt,
        $lte: Op.lte,
        $lt: Op.lt,
        $not: Op.not,
        $in: Op.in,
        $notIn: Op.notIn,
        $is: Op.is,
        $like: Op.like,
        $notLike: Op.notLike,
        $iLike: Op.iLike,
        $notILike: Op.notILike,
        $regexp: Op.regexp,
        $notRegexp: Op.notRegexp,
        $iRegexp: Op.iRegexp,
        $notIRegexp: Op.notIRegexp,
        $between: Op.between,
        $notBetween: Op.notBetween,
        $overlap: Op.overlap,
        $contains: Op.contains,
        $contained: Op.contained,
        $adjacent: Op.adjacent,
        $strictLeft: Op.strictLeft,
        $strictRight: Op.strictRight,
        $noExtendRight: Op.noExtendRight,
        $noExtendLeft: Op.noExtendLeft,
        $and: Op.and,
        $or: Op.or,
        $any: Op.any,
        $all: Op.all,
        $values: Op.values,
        $col: Op.col,
      },
    },
    redis: {
      client: {
        port: '6379', // Redis port
        host: '127.0.0.1', // Redis host
        password: '', // 密码
        db: 0, // 存储区
      },
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
