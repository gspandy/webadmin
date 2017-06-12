/*
 * @file: 营销服务管理
 * @author: mewhat(mewhat.github.io)
 */
'use strict';
import Home from '../../views/home.vue';
import Service from '../../views/market-service/service.vue';
import GroupManage from '../../views/market-service/group-buy/group-manage.vue';
import Grouprelease from '../../views/market-service/group-buy/group-release.vue';
import FullManage from '../../views/market-service/full-manage/full-manage.vue';
import Fullrelease from '../../views/market-service/full-manage/full-release.vue';
import Membermanager from '../../views/market-service/member-manage/member-manage.vue';
import Menbercardcheck from '../../views/market-service/member-manage/membercard-check.vue';
import Menbercardrelease from '../../views/market-service/member-manage/membercard-release.vue';
import DiscountManager from '../../views/market-service/discount/discount-manage.vue';
import DiscountRelease from '../../views/market-service/discount/discount-release.vue';
import discountUsed from '../../views/market-service/discount/discount-used.vue';
import DiscountReceive from '../../views/market-service/discount/discount-recevie.vue';
import Route from '../../components/router.vue';

const control = '/service';

export default {
    path: '/',
    component: Home,
    name: '营销服务',
    iconCls: 'fa fa-shopping-bag', // 图标样式class
    limits: [1,2],
    children: [
        {
            path: control + '/service',
            name: '营销服务列表',
            component: Service
        },
        {
            path: control + '/groupmanage',
            name: '团购',
            component: Route,
            children: [
                {
                    path: control + '/groupmanage',
                    name: '团购活动管理',
                    component: GroupManage,
                },
                {
                    path: control + '/grouprelease',
                    name: '团购活动发布',
                    component: Grouprelease
                },
            ]
        },
        {
            path: control + '/fullmanage',
            name: '满减/满返',
            component: Route,
            children: [
                {
                    path: control + '/fullmanage',
                    name: '满减/满返活动管理',
                    component: FullManage,
                },
                {
                    path: control + '/fullrelease',
                    name: '满减/满返活动发布',
                    component: Fullrelease
                }
            ]
        },
        {
            path: control + '/membercard/manage',
            name: '会员卡',
            component: Route,
            children: [
                {
                    path: control + '/membercard/manage',
                    name: '会员卡管理',
                    component: Membermanager
                },
                {
                    path: control + '/membercard/check',
                    name: '查看会员卡',
                    component: Menbercardcheck
                },
                {
                    path: control + '/membercard/release',
                    name: '发布会员卡',
                    component: Menbercardrelease
                }
            ]
        },
        {
            path: control + '/discount/manage',
            name: '优惠券',
            component: Route,
            children: [
                {
                    path: control + '/discount/manage',
                    name: '优惠券管理',
                    component: DiscountManager,
                },
                {
                    path: control + '/discount/release',
                    name: '发布优惠券',
                    component: DiscountRelease
                },
                {
                    path: control + '/discount/used',
                    name: '已使用优惠券',
                    component: discountUsed
                },
                {
                    path: control + '/discount/recevie',
                    name: '已领用优惠券',
                    component: DiscountReceive
                }
            ]
        }
    ]
};
