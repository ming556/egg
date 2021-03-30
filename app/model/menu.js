'use strict';
module.exports = app => {
  const { DataTypes } = require('sequelize'); // 导入内置数据类型
  // const { INTEGER } = app.Sequelize;
  const Menu = app.model.define('menu', { // 定义模型`model`和表之间的映射关系使用`define`方法
    spid: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
    }, // 用户名
    age: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
      isDate: true,
    },
    phone: {
      type: DataTypes.BIGINT(11),
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
    },
  });
  // 根据参数获取用户
  Menu.findMenuAll = params => {
    return Menu.findAll({
      include: [
        {
          model: app.model.User,
          where: params,
          // eslint-disable-next-line array-bracket-spacing
          attributes: ['username', 'id'],
        },
      ],
    });
  };
  // 新增数据
  Menu.findedit = params => {
    return Menu.create(params);
  };
  // 查询id是否存在
  Menu.findOnes = params => {
    return Menu.findOne({ // 搜索数据库中的一个特定元素
      include: [
        {
          model: app.model.User,
          where: params,
        },
      ],
    });
  };
  // 模型关联
  Menu.associate = () => {
    app.model.Menu.belongsTo(app.model.User, { foreignKey: 'spid', targetKey: 'spid' });
  };
  return Menu;
};
