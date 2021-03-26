'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async list() {
    // console.log(page.query.id, '123');
    // read config
    const newsList = [
      { id: 1, title: 'this is news 1', url: '/news/1' },
      { id: 2, title: 'this is news 2', url: '/news/2' },
    ];
    return newsList;
    // if (page.query.id === '123') {
    //   return newsList;
    // }
    // const { serverUrl, pageSize } = this.config.news;
    // console.log(serverUrl, pageSize, '234');
    // use build-in http client to GET hacker-news api
    // console.log(idList, '111');
    // parallel GET detail
  }
}

module.exports = NewsService;
