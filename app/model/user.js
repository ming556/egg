'use strict';
const bcrypt = require('bcrypt');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define('user', { // 定义模型`model`和表之间的映射关系使用`define`方法
    id: {
      type: INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: 0,
    },
    username: {
      type: STRING(30),
      unique: true,
      allowNull: false,
    }, // 用户名
    password: {
      type: STRING,
      allowNull: false,
    },
    spid: {
      type: INTEGER,
      allowNull: false,
    },
    // 权限
    jurisdiction: {
      type: INTEGER,
      allowNull: false,
    },
    // 上级会员的spid
    uiid: {
      type: INTEGER,
    },
  });
  // 根据参数获取用户
  User.getUserByArgs = params => {
    return User.findOne({ // 搜索数据库中的一个特定元素
      where: params,
    });
  };
  // 分页查询
  User.findUser = params => {
    console.log(params);
    return User.findAll({ where: params.data, limit: params.Pagesize, offset: params.Pagesize * (params.current - 1) });
  };
  // 查询总数
  User.findUserAll = params => {
    return User.count({ where: params });
  };
  // 修改用户信息
  User.editUser = async (params, id) => {
    // 如果密码存在
    if (params.val.password) {
      params.val.password = User.hashPassword(params.val.password);
    }
    return User.update(params.val, { where: id });
  };
  // 查询指定参数
  User.queryUser = async params => {
    return User.findOne({
      where: params,
      // eslint-disable-next-line array-bracket-spacing
      attributes: ['username'],
    });
  };
  // 密码hash
  User.hashPassword = password => {
    const salt = bcrypt.genSaltSync(10); // 处理数据的轮次数
    return bcrypt.hashSync(password, salt); // 将密码转为加密值
  };
  // 注册用户
  User.register = fields => {
    // this.app.mysql.literals.now
    fields.spid = Math.round(new Date().getTime() / 1000);
    fields.password = User.hashPassword(fields.password);
    console.log(fields, '==>fields');
    return User.create(fields); // 在数据库里创建一条数据
  };
  // 将密码跟加密的密码对比
  User.compareSync = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
  };
  User.associate = () => {
    app.model.User.hasOne(app.model.Menu, { foreignKey: 'spid' });
  };
  User.associate = () => {
    app.model.User.hasMany(app.model.Server, { foreignKey: 'spid', targetKey: 'spid' });
  };
  return User;
};
