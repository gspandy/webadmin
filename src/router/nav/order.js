
/**
 * @file: 订单管理导航
 * @author: chenzhengquan(mewhat.github.io)
 */
'use strict';
import Home from '../../views/home.vue';
import order from '../../views/order/order'
import manager from '../../views/order/manager'
import takeOrder from '../../views/order/take-order'

const control = '/order';
export default {
    path: '/',
    component: Home,
    name: '订单管理',
    iconCls: 'el-icon-document', // 图标样式class
    limits: 'all',
    children: [
        {
            path: control + '/order',
            name: '订单管理列表',
            component: order
        },
        {
            path: control + '/take',
            component: takeOrder,
            name: '自取验证'
        },
        {
            path: control + '/manager',
            component: manager,
            name: '订单详情'
        }
    ]
}