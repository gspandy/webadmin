/**
 * @file: 用户信息、状态管理
 */
'use strict';
// import { getTokenCookie, setTokenCookie, removeTokenCookie } from '../../common/auth';

const state = {
    // token: getTokenCookie() || '',
    token: sessionStorage.getItem('token') || '',
    user: JSON.parse(sessionStorage.getItem('user')) || {},
    ext: sessionStorage.getItem('ext') || 99999
}

const mutations = {
    setLoginToken(state, token) {
        state.token = token;
        // setTokenCookie(token);
        sessionStorage.setItem('token', token);
    },
    userLogout(state){
        state.token = '';
        sessionStorage.removeItem('token');
        state.ext = '';
        sessionStorage.removeItem('ext');
        // removeTokenCookie();
    },
    setUserInfo(state, data) {
        state.user = data;
        sessionStorage.setItem('user', JSON.stringify(data));
    },
    // 设置权限
    setExt(state, ext) {
        state.ext = ext;
        sessionStorage.setItem('ext', ext);
    }
}
const getters = {
    getLoginToken(state) {
        return state.token;
    },
    getUserInfo(state) {
        return state.user;
    },
    getExt: state => state.ext
}

export default {
    state,
    mutations,
    getters
}

