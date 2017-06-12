/*
 * @file: 店铺管理/数据
 * @author: zpc
 */
'use strict';
import Home from '../../views/home.vue';
import ShopData from '../../views/shop/shop-data.vue';
import ShopInfo from '../../views/shop/shop-info.vue';
import ShopDecoration from '../../views/shop/shop-decoration.vue';
import ShopFund from '../../views/shop/shop-fund.vue';
import ShopWithdrawRecord from '../../views/shop/shop-withdraw-record.vue';
import ShopWithdraw from '../../views/shop/shop-withdraw.vue';
import Route from '../../components/router.vue';

const shop = '/shop';
export default {
    path: '/',
    component: Home,
    name: '店铺管理/数据',
    iconCls: 'el-icon-setting', // 图标样式class
    limits: [3,4],
    children: [
    	{
    		path: shop + '/shop-data',
    		component: ShopData,
    		name: '店铺管理列表/数据'
    	},
        {
            path: shop + '/shop-info',
            component: ShopInfo,
            name: '店铺基本信息/数据'
        },
        { 
        	path: shop + '/shop-fund', 
        	component: Route, 
        	name: '店铺资金管理/数据',
            children: [
                {
                    path: shop + '/shop-fund', 
                    component: ShopFund, 
                    name: '店铺资金/数据'
                },
                { 
                    path: shop + '/shop-withdraw', 
                    component: ShopWithdraw, 
                    name: '资金提现/数据' 
                },
                { 
                    path: shop + '/shop-withdraw-record', 
                    component: ShopWithdrawRecord, 
                    name: '店铺提现记录/数据' 
                }
            ]
        },
        { 
        	path: shop + '/shop-decoration', 
        	component: ShopDecoration, 
        	name: '店铺装修/数据' 
        }
    ]
}