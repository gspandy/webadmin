/*
 * @file: 客户管理
 * @author: mewhat(mewhat.github.io)
 */
'use strict';
import Home from '../../views/home.vue';
import Route from '../../components/router.vue';
import Manage from '../../views/customer/manage.vue';
import Infoedit from '../../views/customer/infoedit.vue';
import Labeledit from '../../views/customer/labeledit.vue';
import Addlabel from '../../views/customer/addlabel.vue';

const control = '/customer';

export default {
    path: '/',
    component: Home,
    name: '客户管理',
    iconCls: 'fa fa-users', // 图标样式class
    limits: [3,4],
    children: [
        {
            path: control + '/manage',
            name: '客户管理列表',
            component: Route,
            children: [
                {
                    path: control + '/manage',
                    name: '客户列表',
                    component: Manage,
                },
                {
                    path: control + '/infoedit',
                    component: Infoedit,
                    name: '客户信息编辑'
                },
            ]
        },
        {
            path: control + '/labeledit',
            component: Route,
            name: '客户标签管理',
            children: [
                {
                    path: control + '/labeledit',
                    component: Labeledit,
                    name: '客户标签',
                },
                {
                    path: control + '/addlabel',
                    component: Addlabel,
                    name: '添加标签'
                }
            ]
        }
    ]
}