/**
 * 登录管理
 */
'use strict';
import cookie from 'vue-cookie';
import config from '../config';

const cookieConfig = {
    domain: config.CookieDomain
}

export function saveCookie(key,value){
    cookie.set(key, value, cookieConfig);
}
export function getCookie(key){
    return cookie.get(key);
}
export function removeCookie(key){
    cookie.delete(key, cookieConfig);
}
export function setTokenCookie(value){
    cookie.set('token', value);
}
export function getTokenCookie(){
    return cookie.get('token');
}
export function removeTokenCookie(){
    cookie.delete('token', cookieConfig);
}
export function signOut(){
    cookie.delete('token',cookieConfig);
}
export function isLogin(){
    return !!cookie.get('token');
}