
'use strict';

const state = {
    selectMainBody: {}
}

const mutations = {
    setSelectMainBody(state, data) {
        state.selectMainBody = data || {};
    }
}

const getters = {
    getSelectMainBody: state => state.selectMainBody
}

export default {
    state,
    mutations,
    getters
}

