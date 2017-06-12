/*
 * @file: 商品管理
 * @author: YJ(yjzhen@live.com)
 */
'use strict';
import Home from '../../views/home.vue';
import List from '../../views/goods/goods-list.vue';
import Group from '../../views/goods/group-list.vue';
import AddGroup from '../../views/goods/add-group.vue';
import AddGoods from '../../views/goods/add-goods.vue';
import RetailGoods from '../../views/goods/retail-goods.vue';
import GoodsInfo from '../../views/goods/goods-info.vue';
import Route from '../../components/router.vue';

const control = '/goods';
export default {
    path: '/',
    component: Home,
    name: '商品管理',
    iconCls: 'el-icon-menu',//图标样式class
    limits: [3,4],
    children: [
        {
            path: control + '/list',
            name: '商品列表',
            component: List
        },
        {
            path: control + '/group/list',
            name: '商品标签管理',
            component: Route,
            children: [
                {
                    path: control + '/group/list',
                    name: '商品标签列表',
                    component: Group
                },
                {
                    path: control + '/group/add',
                    name: '商品标签',
                    component: AddGroup,
                }
            ]
        },
        {
            path: control + '/add',
            name: '发布商品',
            component: AddGoods,
        },
        {
            path: control + '/retailgoods',
            name: '分销商品',
            component: Route,
            children: [
                {
                    path: control + '/retailgoods',
                    name: '分销商品信息',
                    component: RetailGoods
                },
                {
                    path: control + '/goodsinfo',
                    name: '分销商品详情',
                    component: GoodsInfo,
                    hidden: true
                }
            ]
        }
    ]
}
