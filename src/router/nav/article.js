
/**
 * @file: 文章管理导航
 * @author: chenzhengquan(mewhat.github.io)
 */
'use strict';
import Home from '../../views/home.vue';
import pages from '../../views/article/pages';
import classify from '../../views/article/classify';
import submit from '../../views/article/add-article';
import tagdetail from '../../views/article/tagdetail';
import tags from '../../views/article/tags';
import Route from '../../components/router.vue';

const control = '/article';
export default {
    path: '/',
    component: Home,
    name: '文章管理',
    iconCls: 'el-icon-edit', // 图标样式class
    limits: [1,2],
    children: [
        {
            path: control + '/pages',
            name: '文章管理列表',
            component: pages,
        },
        {
            path: control + '/classify',
            component: classify,
            name: '文章分类'
        },
        {
            path: control + '/tags',
            component: Route,
            name: '文章标签',
            children: [
                {
                    path: control + '/tags',
                    component: tags,
                    name: '文章标签列表'
                },
                {
                    path: control + '/tagdetail',
                    component: tagdetail,
                    name: '标签详情'
                }
            ]
        },
        {
            path: control + '/add-article',
            component: submit,
            name: '发布/编辑文章'
        }
    ]
}