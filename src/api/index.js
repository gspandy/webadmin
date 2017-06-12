/**
 * @file: 接口文件
 * author: YJ(yjzhen@live.com)
 */
'use strict';
// import * as api from './api';
// export default api;

import * as user from './user';
import * as article from './article';
import * as goods from './goods';
import * as customer from './customer';
import * as shopAdmin from './shop-admin';
import * as adminGoods from './admin-goods';
import * as shop from './shop';
import * as order from './order';

module.exports = {
    ...article, // 文章
    ...goods, // 商品
    ...customer,
    ...shopAdmin,
    ...adminGoods,   // 商品列表
    ...shop,
    ...user,        // 用户管理模块
    ...order,       // 订单管理
};
