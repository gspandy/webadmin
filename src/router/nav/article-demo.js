/*
 * @file: 文章管理
 * @author: YJ(yjzhen@live.com)
 */
'use strict';
import Home from '../../views/home.vue';
import Table from '../../views/article-demo/table.vue';
import Form from '../../views/article-demo/form.vue';
import user from '../../views/article-demo/user.vue';

const control = '/article-demo';
export default {
    path: '/',
    component: Home,
    name: '文章管理',
    iconCls: 'el-icon-menu',//图标样式class
    children: [
        {
            path: control + '/table',
            name: '文章分类',
            component: Table
        },
        { path: control + '/form', component: Form, name: 'Form' },
        { path: control + '/user', component: user, name: '列表' },
    ]
}