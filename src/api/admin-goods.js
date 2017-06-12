/**
 * @file: 平台端商品管理管理接口
 * author: YJ(yjzhen@live.com)
 */
'use strict';
import { base, axios } from './config';

// 新增商品前，获取商品编码
export const getAdGoodsNewSn = params => { return axios.post(`${base}/pat/web/goods/goods_page`, params) };
// 平台端添加商品
export const adAddGoods = params => { return axios.post(`${base}/pat/web/goods/add_goods`, params) };
// 商品分类列表
export const adGetCatsList = params => { return axios.post(`${base}/pat/web/goods_cat/get_cat_list`, params) };

// 获取商品列表	参数：s-筛选，非必要
export const getAdGoodsList = params => { return axios.post(`${base}/pat/web/goods/get_list`, params) };

// 平台端审核商品
// 参数 g_sn 商品编号 g_status 销售状态，1-可售，2-停售
export const adAuditGoods = params => { return axios.post(`${base}/pat/web/goods/audit_goods`, params) };

// 获取推荐商品
export const getAdRecommendGoods = params => { return axios.post(`${base}/pat/web/goods/get_recommend_list`, params); };
// 上传商品图片
export const uploadAdGoodsImg = params => { return axios.post(`${base}/pat/web/goods/upload_big_img`, params); };
// 编辑商品
export const editAdGoods = params => { return axios.post(`${base}/pat/web/goods/edit_goods`, params) };
// 商品详情
export const getAdGoodsInfo = params => { return axios.post(`${base}/pat/web/goods/get_goods`, params); }
