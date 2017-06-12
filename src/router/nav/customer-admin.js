/*
 * @file: 客户管理（平台）
 * @author: zpc
 */
'use strict';
import Home from '../../views/home.vue';
import CustomerAdmin from '../../views/customer-admin/customer-admin.vue';
const customer_admin = '/customer-admin';
export default {
    path: '/',
    component: Home,
    name: '客户管理（平台）',
    iconCls: 'el-icon-setting', // 图标样式class
    leaf: true,
    limits: [1,2],
    children: [
    	{
    		path: customer_admin + '/customer-admin',
    		component: CustomerAdmin,
    		name: '客户管理信息'
    	},
    ]
}