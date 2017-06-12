
/**
 * @file: 接口配置文件
 * author: YJ(yjzhen@live.com)
 */
'use strict';

import axios from 'axios';
import config from '../config';
import store from '../vuex/store';

// import { mapMutations, mapGetters } from 'vuex';
// import { getTokenCookie, setTokenCookie, removeTokenCookie } from '../common/auth';

// import Vue from 'vue';
// import { Alert } from 'element-ui'
// Vue.use(Alert);
// http://shop.flowerexpresses.com
let base = config.apiDomain;
// const global = {
//     ...mapMutations(['setLoginToken']),
//     ...mapGetters(['getLoginToken'])
// }

// base += '/art/web'; // 文章接口
// Add a request interceptor
axios.defaults.withCredentials = false;
// axios.defaults.headers.common['token'] = '234';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = config.data || {};
    // const _token = getTokenCookie();
    const _token = store.getters.getLoginToken
    if (config.method === 'get') {
        config.url = config.url + '?token=' + _token;
    }
    else {
        config.data.token = _token;
    }
    // Do something before request is sent
    return config;
},
function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    var _data = response.data;
    if (parseInt(_data.code) === 40201009) {
        // removeTokenCookie();
        store.commit('userLogout');
        location.href = location.origin + '/login';
        // location.reload();
        return;
    }
    if (_data.state !== 0) {
        return _data;
    }
    // Do something with response data
    return _data;
},
function (error) {
    // Do something with response error
    // console.log($alert);
    // $alert('159', '提示：', {
    //     confirmButtonText: '确定',
    // });
    return Promise.reject(error);
});

module.exports = {
    base,
    axios
};
