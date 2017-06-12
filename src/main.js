// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue';
import App from './App';
import Sortable from 'vue-sortable'; // 拖拽组件
import ElementUI from 'element-ui';
// import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router';
import store from './vuex/store';
import Vuex from 'vuex';
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import routes from './router/routes';

// import Mock from './mock';
// Mock.bootstrap();

// if(process.env.NODE_ENV == 'development') {
//     const Mock = require('./mock');
// }

import 'element-ui/lib/theme-default/index.css';
import 'font-awesome/css/font-awesome.min.css';

Vue.use(Sortable); // 引入拖拽组件
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

// NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/login') {
        store.commit('userLogout');
    }
    let user = store.getters.getLoginToken;

    if (!user && to.path != '/login'){
        next({
            path: '/login'
        });
    }
    else {
        next();
    }
});

// router.afterEach(transition => {
// NProgress.done();
// });


new Vue({
    // el: '#app',
    // template: '<App/>',
    router,
    store,
    // components: { App }
    render: h => h(App)
}).$mount('#app');
