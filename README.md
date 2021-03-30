# egg

一个使用egg写的后台管理系统的后端接口
使用了egg-jwt，egg-sequelize，egg-cors，egg-redis

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```
### 接口
除注册跟登录以外全部使用了egg-jwt创建token进行验证

  // 登录
  get('/api/login') 

  // 注册
  post('/api/register')

  // 查询所有账户
  post('/api/all')

  // 修改账户信息
  put('/api/edit')

  // 新增账户信息
  post('/api/create')

  // 查询账户信息
  post('/api/editmenu') 

  // 查询会员信息
  get('/api/server')

  // 新增会员信息
  post('/api/server') 

  // 修改会员信息
  put('/api/server')

  // 删除会员信息
  delete('/api/server')



[egg]: https://eggjs.org