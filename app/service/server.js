'use strict';

const Service = require('egg').Service;
class ServerController extends Service {
  // 查询会员信息
  async serve(val) {
    const { ctx } = this;
    // 去掉空值
    for (const key in val) {
      if (val[key] === '') {
        delete val[key];
      }
    }
    const params = {
      val,
      Pagesize: val.Pagesize || 10,
      current: val.current || 1,
    };
    const data = await ctx.model.Server.findUser(params);
    const count = await ctx.model.Server.findserver();
    if (data) {
      const body = {
        data: {
          data,
          current: params.current,
          Pagesize: params.Pagesize,
          count,
        },
        msg: '查询成功',
        code: 200,
      };
      return body;
    }
  }
  // 新增会员信息
  async register(val) {
    const { ctx } = this;
    const user = await ctx.model.Server.register(val);
    if (user.dataValues) {
      const body = {
        msg: '新增成功',
        code: 200,
      };
      return body;
    }
    const body = {
      msg: '新增失败',
      code: 201,
    };
    return body;
  }
  // 修改当前会员的信息
  async putserver(val) {
    const { ctx } = this;
    const id = val.id;
    const data = await ctx.model.Server.putserver({
      val,
    }, {
      id,
    });
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
  // 删除当前会员的信息
  async deleteserver(val) {
    const { ctx } = this;
    console.log(this.app.jwt, '===>jwt');
    if (await ctx.model.Server.findByIds({ val })) {
      const data = await ctx.model.Server.deleteserver({ val });
      if (data === 1) {
        const body = {
          msg: '删除成功',
          code: 200,
        };
        return body;
      }
      const body = {
        msg: '删除失败',
        code: 201,
      };
      return body;
    }
    const body = {
      msg: '当前会员不存在',
      code: 201,
    };
    return body;

  }
}

module.exports = ServerController;
