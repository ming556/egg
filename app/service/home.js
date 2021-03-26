'use strict';

const Service = require('egg').Service;

class HomeController extends Service {
  // 注册
  async register(val) {
    const { ctx } = this;
    if (!(await ctx.model.User.queryUser({ username: val.username }))) {
      const user = await ctx.model.User.register(val);
      if (user.dataValues) {
        const body = {
          msg: '注册成功',
          code: 200,
        };
        return body;
      }
    }
    const body = {
      msg: '该用户名已注册',
      code: 1001,
    };
    return body;
  }
  // 登录
  async login(val) {
    const { ctx } = this;
    const username = val.username;
    const password = val.password;
    const user = await ctx.model.User.getUserByArgs({ username }, '');
    if (!user) {
      const body = {
        msg: '没有找到该用户',
        code: 1001,
      };
      return body;
    }
    if (!(ctx.model.User.compareSync(password, user.dataValues.password))) {
      const body = {
        msg: '密码错误',
        code: 1002,
      };
      return body;
    }
    const body = {
      msg: '登录成功',
      spid: user.id,
      code: 200,
    };
    return body;
  }
  // 查询所有用户
  async all(val) {
    const { ctx } = this;
    // 查询总条数
    const count = await ctx.model.User.findUserAll(); // 总数
    const current = val.current || 1; // 当前页码
    const Pagesize = val.current || 10; // 每页条数
    // const data = {
    //   username,
    // };
    const totalNum = await ctx.model.User.findUser({ Pagesize, current });
    console.log(totalNum, '1');
    if (totalNum) {
      const body = {
        data: {
          data: totalNum,
          current,
          Pagesize,
          count,
        },
        msg: '查询成功',
        code: 200,
      };
      return body;
    }
  }
  // 修改用户信息
  async edit(val) {
    const { ctx } = this;
    // const list = {
    //   age: val.age,
    // };
    const id = val.id;
    const data = await ctx.model.User.editUser({
      val,
    }, {
      id,
    });
    console.log(data);
    if (data[0] === 1) {
      const body = {
        msg: '修改成功',
        code: 200,
      };
      return body;
    }
    const body = {
      msg: '修改失败',
      code: 201,
    };
    return body;
  }
  async create(val) {
    const { ctx } = this;
    const data = await ctx.model.Menu.findedit(val);
    if (data.dataValues) {
      const body = {
        msg: '新增数据成功',
        code: 200,
      };
      return body;
    }
  }
  // 查询用户信息
  async editmenu(val) {
    const { ctx } = this;
    // 判断id是否正确
    if ((await ctx.model.Menu.findOnes(val))) {
      const data = await ctx.model.Menu.findMenuAll(val);
      if (data) {
        const body = {
          msg: '查询成功',
          code: 200,
          data,
        };
        return body;
      }
    }
    const body = {
      msg: '查询失败，spid不正确',
      code: 201,
    };
    return body;
  }
}

module.exports = HomeController;
