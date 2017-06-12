/**
 * @file: 商品管理（平台端
 * author: chenzhengquan(mewhat)
 */
'use strict';
import { base, axios } from './config';
const pat = base + '/top/web'; // B端商铺管理接口

// 获取B端店铺信息
export const getShop = params => { return axios.post(`${pat}/shop/get_shop`, params); };

// 修改商品标签
// s_sn	true	string	post	店铺ID
// logo	false	string	post	店铺logo
// t_desc	false	string	post	店铺简介
export const editShop = params => { return axios.post(`${pat}/shop/edit_shop`, params) };

// 修改店铺名称
// s_sn	true	int	post	店铺ID
// s_name	true	string	post	店铺名称
export const alertName = params => { return axios.post(`${pat}/shop/alter_name`, params) };

// 测试图片上传
// export const testUploadImgApi = params => { return axios.post(`http://localhost:3801/upload/images`, params); };
export const uploadImgShop = params => { return axios.post(`${base}/top/web/shop/upload_logo_img`, params); };
export const testUploadImgApi = params => { return axios.post(`${base}/art/web/article/up_logo_img`, params); };

// 店铺装修图片上传
export const shopDecorationUpload = params => { return axios.post(`${base}/top/web/shop/upload_home_img`, params); }
// 获取店铺装修数据
export const getDecorationData = params => { return axios.post(`${base}/top/web/shop/get_config`, params); }
// 保存店铺装修
export const saveDecorationData = params => { return axios.post(`${base}/top/web/shop/update_shop_config`, params); }

export const getShopQr = params => { return axios.post(`${base}/ord/web/wxqr/get_qr_for_shop`, params); }