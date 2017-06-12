/*
 * @file: 店铺管理/平台
 * @author: chenzhengquan(mewhat)
 */
'use strict';
import Home from '../../views/home.vue';
import ShopAdminData from '../../views/shop-admin/shop-admin-data.vue';
import ShopAdminInfo from '../../views/shop-admin/shop-admin-info.vue';
import ShopAdminRecall from '../../views/shop-admin/shop-admin-recall.vue';
import ShopAdminFund from '../../views/shop-admin/shop-admin-fund.vue';
import ShopAdminPaymsg from '../../views/shop-admin/shop-admin-paymsg';
import ShopAdminAdd from '../../views/shop-admin/shop-admin-addbody';
import ShopAdminBody from '../../views/shop-admin/shop-admin-body';
import ShopAdminAddUser from '../../views/shop-admin/shop-admin-managerAdd';
import ShopAdminUser from '../../views/shop-admin/shop-admin-managerList';
import Route from '../../components/router.vue';

const shop = '/shop-admin';
export default {
    path: '/',
    component: Home,
    name: '店铺管理（平台）',
    iconCls: 'el-icon-setting', // 图标样式class
    limits: [1,2],
    children: [
        {
            path: shop + '/shop-admin-data',
            component: ShopAdminData,
            name: '店铺管理'
        },
        {
            path: shop + '/shop-admin-info',
            component: ShopAdminInfo,
            name: '店铺基本信息（平台）'
        },
        {
            path: shop + '/shop-admin-fund',
            component: Route,
            name: '资金记录',
            children: [
                {
                    path: shop + '/shop-admin-fund',
                    component: ShopAdminFund,
                    name: '店铺资金（平台）',
                },
                {
                    path: shop + '/shop-admin-paymsg',
                    component: ShopAdminPaymsg,
                    name: '资金提现（平台）'
                },
                {
                    path: shop + '/shop-admin-recall',
                    component: ShopAdminRecall,
                    name: '提现记录（平台）'
                }
            ]
        },
        {
            path: shop + '/shop-admin-body',
            component: Route,
            name: '主体列表（平台）',
            children: [
                {
                    path: shop + '/shop-admin-body',
                    component: ShopAdminBody,
                    name: '主体列表信息（平台）',
                },
                {
                    path: shop + '/shop-admin-add',
                    component: ShopAdminAdd,
                    name: '添加主体（平台）'
                }
            ]
        },
        {
            path: shop + '/shop-admin-addSysUser',
            component: Route,
            name: '添加用户管理员',
            children: [
                {
                    path: shop + '/shop-admin-sysUserList',
                    component: ShopAdminUser,
                    name: '管理员列表（平台）'
                },
                {
                    path: shop + '/shop-admin-addSysUser',
                    component: ShopAdminAddUser,
                    name: '添加管理员（平台）'
                }
            ]
        }
    ]
}
