/**
 * @file: 文章管理接口
 * author: YJ(yjzhen@live.com)
 */
'use strict';
import { base, axios } from './config';
// const art = base + '/art/web';
export const getOrderList = params => { return axios.post(`${base}/ord/web/order/get_list`, params) };

export const getOrderDetail = params => { return axios.post(`${base}/ord/web/order/detail`, params) }

export const orderShipments = params => { return axios.post(`${base}/ord/web/order/detail`, params) }

export const getVerifyOrder = params => { return axios.post(`${base}/ord/web/order/verify`, params) }
export const confirmVerifyOrder = params => { return axios.post(`${base}/ord/web/order/confirm_verfify`, params) }
// http://webshop.flowerexpresses.com/ord/web/order/verify
// v_code：验证码
// http://webshop.flowerexpresses.com/ord/web/order/confirm_verfify
// v_code：验证码
// t_id：订单号