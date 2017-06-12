
/**
 * @file: 文章管理接口
 * author: YJ(yjzhen@live.com)
 */
'use strict';
import { base, axios } from './config';
/**
 * article
 */
// 登录
export const useLogin = params => { return axios.post(`${base}/lgn/web/login/act_login`, params); };
export const useLogout = params => { return axios.post(`${base}/lgn/web/login/log_out`, params); };


// Access-Control-Allow-Credentials: true

// export const _setSession = params => { return axios.get(`http://yj.taokeschool.com/wechat/setsession`, params); };
// export const _getSession = params => { return axios.get(`http://yj.taokeschool.com/wechat/getsession`, params); };
