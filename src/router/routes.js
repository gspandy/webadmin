/**
 * @file: 路由控制
 * @author: YJ(yjzhen@live.com)
 */
import store from '../vuex/store';
import Login from '../views/login/login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/home.vue'

import shop from './nav/shop';
import shopAdmin from './nav/shop-admin';
import articleDemo from './nav/article-demo';
import goods from './nav/goods';
import goodsAdmin from './nav/goods-admin';
import control from './nav/home';
import order from './nav/order';
import article from './nav/article';
import customer from './nav/customer';
import service from './nav/service';
import customerAdmin from './nav/customer-admin';
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'home'
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // // control, // 首页
    // // articleDemo, // 文章管理
    // goods, // 商品管理
    // goodsAdmin, // 商品管理(平台端)
    // customer,   // 客户管理
    // service,    // 营销服务
    // order, // 订单管理
    // article, // 文章管理
    // shop,   // 店铺管理/数据
    // customerAdmin, // 客户管理（平台）
    // shopAdmin, // 店铺管理/平台
    
];
const menu_routes = [
    // control, // 首页
    // articleDemo, // 文章管理
    goods, // 商品管理
    goodsAdmin, // 商品管理(平台端)
    customer,   // 客户管理
    service,    // 营销服务
    order, // 订单管理
    article, // 文章管理
    shop,   // 店铺管理/数据
    customerAdmin, // 客户管理（平台）
    shopAdmin, // 店铺管理/平台
]

for (var i = 0; i < menu_routes.length; i++){
    if(!menu_routes[i].limits ||
    menu_routes[i].limits === 'all' ||
    menu_routes[i].limits.indexOf(parseInt(store.getters.getExt)) !== -1) {
        routes.push(menu_routes[i]);
    }
}

routes.push({
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
});

export default routes;
