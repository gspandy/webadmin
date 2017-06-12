/*
 * @file: 商品管理(平台端)
 * @author: chenzhengquan(mewhat)
 */
'use strict';
import Home from '../../views/home.vue';
import List from '../../views/goods-admin/goods-list.vue';
import Group from '../../views/goods-admin/group-list.vue';
import AddGroup from '../../views/goods-admin/add-group.vue';
import AddGoods from '../../views/goods-admin/ad-add-goods.vue';
import DetailGoods from '../../views/goods-admin/detail-goods.vue';
import GoodsAdminClassify from '../../views/goods-admin/goods-admin-classify.vue';
import Route from '../../components/router.vue';

const control = '/goods-admin';
export default {
    path: '/',
    component: Home,
    name: '商品管理(平台)',
    iconCls: 'el-icon-menu',//图标样式class
    limits: [1,2],
    children: [
        {
            path: control + '/list',
            name: '商品管理列表',
            component: List
        },
        {
            path: control + '/detailgoods',
            name: '商品规格属性(平台)',
            component: DetailGoods,
        },
        {
            path: control + '/group/list',
            name: '商品标签管理(平台)',
            component: Route,
            children: [
                {
                    path: control + '/group/list',
                    name: '所有商品标签(平台)',
                    component: Group,
                },
                {
                    path: control + '/group/add',
                    name: '添加商品标签(平台)',
                    component: AddGroup,
                }
            ]
        },
        {
        	path: control + '/goods-admin-classify',
        	component: GoodsAdminClassify,
        	name: '商品分类管理(平台)'
        },
        {
            path: control + '/add',
            name: '发布商品(平台)',
            component: AddGoods,
        }
    ]
}