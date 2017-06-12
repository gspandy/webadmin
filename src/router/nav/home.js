
/**
 * @file: 首页导航
 * @author: YJ(yjzhen@live.com)
 */
'use strict';
import Home from '../../views/home.vue';
import echarts from '../../views/control/home.vue'

export default {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'fa fa-address-card',
    leaf: true,//只有一个节点
    children: [
        { path: '/', component: echarts, name: '控制台' }
    ]
}