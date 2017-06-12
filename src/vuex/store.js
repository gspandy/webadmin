import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import user from './modules/user';
import order from './modules/order';
import shopAdmin from './modules/shop-admin';

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    // mewhat
    code: '',
    list: [],

    group_sn: '',
    type: 0
}
// 定义所需的 mutations
const mutations = {
    // INCREMENT(state) {
    //     state.count++
    // },
    // DECREMENT(state) {
    //     state.count--
    // },
    LIST(state, list) {
        state.list = list
    },
    CODE(state, code) {
        state.code = code
    },
    GROUPSNCODE(state, code) {
        state.group_sn = code
    },
    TYPE(state, type) {
        state.type = type
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules: {
        user,
        shopAdmin,
        order
    }
});