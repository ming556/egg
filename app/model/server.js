'use strict';
const sd = require('silly-datetime');
module.exports = app => {
  // const { DataTypes } = require('sequelize'); // 导入内置数据类型
  const { INTEGER, STRING, DATE, BIGINT } = app.Sequelize;
  const Server = app.model.define('server', { // 定义模型`model`和表之间的映射关系使用`define`方法
    id: {
      type: INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    spid: {
      type: INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: STRING,
    },
    age: {
      type: INTEGER,
      allowNull: true,
    },
    gender: {
      type: STRING,
      allowNull: true,
    },
    birthday: {
      type: DATE,
      isDate: true,
      allowNull: true,
    },
    phone: {
      type: BIGINT(11),
      allowNull: true,
    },
    position: {
      type: STRING,
      allowNull: true,
    },
    createtime: {
      type: DATE,
      allowNull: true,
    },
  });
  // 根据参数获取用户
  // 新增用户
  Server.register = fields => {
    fields.id = Math.round(new Date().getTime() / 1000);
    if (fields.age === '') {
      fields.age = null;
    }
    if (fields.birthday === '') {
      fields.birthday = null;
    }
    fields.createtime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    return Server.create(fields); // 在数据库里创建一条数据
  };
  // 分页查询加条件
  Server.findUser = params => {
    console.log(params, '==>params');
    return Server.findAll({
      where: params.val, limit: params.Pagesize, offset: params.Pagesize * (params.current - 1),
    });
  };
  // 查询总数
  Server.findserver = () => {
    return Server.count({});
  };
  // 查询会员是否存在
  Server.findByIds = params => {
    console.log(params.val.id);
    return Server.findOne({ where: params.val });
  };
  // 修改会员信息
  Server.putserver = (params, id) => {
    console.log(params, id);
    return Server.update(params.val, { where: id });
  };
  // 删除信息
  Server.deleteserver = params => {
    console.log(params, '==>params');
    return Server.destroy({
      where: params.val,
    });
  };

  // 模型关联
  Server.associate = () => {
    app.model.Menu.belongsTo(app.model.User, { foreignKey: 'spid', targetKey: 'spid' });
  };
  return Server;
};
