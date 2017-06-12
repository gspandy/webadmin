/**
 * @file: 客户管理管理接口
 * author: 郑志勇
 */
'use strict';
import { base, axios } from './config';
const art = base + '/usr/web'; // 文章接口


// 编辑客户信息
// 参数：u_id-客户ID pr_id 会员等级
export const editCustomerInfo = params => { return axios.post(`${art}/user/edit_user`, params); };
// 获取客户信息
// 参数：u_id-客户ID
export const getCustomerInfo = params => { return axios.post(`${art}/user/get_user`, params); };

// 获取客户列表
// 参数：
export const getCustomerList = params => { return axios.post(`${art}/user/get_list`); };
// 添加客户标签
// 参数：t_name-标签名字,u_list-需要关联标签的用户ID列表
export const addCustomerTag = params => { return axios.post(`${art}/user_tags/add_tag`, params); };
// 获取用户标签列表
// 参数：
export const getCustomerTagList = params => { return axios.post(`${art}/user_tags/get_list`); };
// 获取客户标签详情
// 参数：t_id-标签ID
export const getCustomerTag = params => { return axios.post(`${art}/user_tags/get_tag`, params); };
// 删除客户标签
// 参数：t_id-标签ID
export const delCustomerTag = params => { return axios.post(`${art}/user_tags/del_tag`, params); };
// 删除客户标签中管理的客户
// 参数：t_id-标签ID,u_id-客户ID
export const delCustomerUserTag = params => { return axios.post(`${art}/user_tags/del_tag_user`, params); };
// 编辑客户标签
// 参数：t_id-标签ID,t_name-标签名字，u_list：type=array，-需要关联标签的用户ID列表。
export const editCustomerTag = params => { return axios.post(`${art}/user_tags/edit_tag`, params); };

// 给客户添加客户标签
// 参数：u_id-客户ID, t_list type=array  标签ID列表
export const addCustomerUsertag = params => { return axios.post(`${art}/user_tags/add_user_tag`, params); };
