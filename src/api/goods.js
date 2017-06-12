/**
 * @file: 商品管理接口
 * author: zhangpeichan
 */
'use strict';
import { base, axios } from './config';

// 新增商品前，获取商品编码
export const getGoodsNewSn = params => { return axios.post(`${base}/gds/web/product/product_page`, params) };

// 添加商品	参数：p_name--商品名字，必要；p_cat--商品分类，必要；p_sort--排序号，非必要；p_m_price--销售价格，必要；p_o_price--原价，必要；p_inven--商品库存，非必要；l_img_url--文章标签，非必要；p_intro--商品简介，非必要；p_desc--商品详情，非必要；p_sns--sku列表，非必要；p_recommend--商品推荐，非必要；shipping_type--配送方式，1-自取，2-花巴士，3-其他快递，必要；shipping_self--自取点地址，非必要；s_fee_type--运费类型，目前统一邮费，类型1，非必要；s_fee_value--对应选择的运费值，非必要；h_time--是否有配送时间，有-1，没-0，非必要；d_time_type--配送时间的类型，1-按周天，2-按时间段，3-指定日期，非必要；d_time_value--配送时间类型对应的值，非必要；
export const addGoods = params => { return axios.post(`${base}/gds/web/product/add_goods`, params) };

// 获取规格属性所有内容列表
export const getGoodsAttrList = params => { return axios.post(`${base}/gds/web/product_attr/get_type_list`, params) };

// 获取规格列表
export const getSpecifyList = params => { return axios.post(`${base}/gds/web/product_attr/get_specify_list`, params) };

// 获取分销商品列表
export const getDistributionList = params => { return axios.post(`${base}/gds/web/fenxiao/get_dis_list`, params) };

// 获取分销商品详情
// g_sn 商品编号
export const getDistributionDetail = params => { return axios.post(`${base}/gds/web/fenxiao/get_fenxiao`, params) };

// 检查是否添加分销商品
// g_sn 商品编号
export const checkDistributionGoods = params => { return axios.post(`${base}/gds/web/fenxiao/check_goods`, params) };

// 拉去分销商品
// g_sn 商品编号
export const relateDistributionGoods = params => { return axios.post(`${base}/gds/web/fenxiao/relate_goods`, params) };

// 获取某个规格对应属性列表   参数：s_id--规格编号，必要
export const getAttrList = params => { return axios.post(`${base}/gds/web/product_attr/get_attr_list`, params) };

// 获取商品列表	参数：s-筛选，非必要
export const getGoodsList = params => { return axios.post(`${base}/gds/web/product/get_list`, params) };

// 获取商品标签列表
export const getGoodsTagList = params => { return axios.post(`${base}/gds/web/product_tags/get_tag_list`, {params}); };

// 添加商品标签	参数：t_name--标签名字，必要；goods--需要关联标签的商品sn列表，非必要
export const addGoodsTag = params => { return axios.post(`${base}/gds/web/product_tags/add_tag`, params) };

// 获取商品标签详情	参数：tag_id--标签ID，必要
export const getGoodsTagDetail = params => { return axios.post(`${base}/gds/web/product_tags/get_tag`, params) };

// 修改商品标签	参数：t_id--标签ID，必要；t_name--标签名字，必要；goods--需要关联标签的商品sn列表，非必要
export const editGoodsTag = params => { return axios.post(`${base}/gds/web/product_tags/edit_tag`, params) };

// 删除商品标签	参数：t_id--标签ID，必要
export const delGoodsTag = params => { return axios.post(`${base}/gds/web/product_tags/del_tag`, params) };

// 删除商品标签对应商品	参数：t_id--标签ID，必要；g_sn--商品ID，必要
export const delTagGoods = params => { return axios.post(`${base}/gds/web/product_tags/del_tag_goods`, params) };

// B端商店商品下架
// 参数 goods_sn 商品编号
export const takeGoodsOffSell = params => { return axios.post(`${base}/gds/web/product/take_offsell`, params) };


// B端商店商品上架
// 参数 goods_sn 商品编号
export const takeGoodsONSell = params => { return axios.post(`${base}/gds/web/product/take_onsell`, params) };

// 获取推荐商品
export const getRecommendGoods = params => { return axios.post(`${base}/gds/web/product/get_recommend_list`, params); }
// 商品详情
export const getGoodsInfo = params => { return axios.post(`${base}/gds/web/product/get_goods`, params); }
// 上传商品图片
export const uploadGoodsImg = params => { return axios.post(`${base}/gds/web/product/upload_big_img`, params); };
// 编辑商品
export const editGoods = params => { return axios.post(`${base}/gds/web/product/edit_goods`, params) };

// 获取商品二维码
export const getGoodsQrCode = params => { return axios.post(`${base}/ord/web/wxqr/get_qr_for_product`, params); };
/***
 * 所有的接口返回结构如下：
{
 "state":0,  ###0-成功，1-失败
 "code":,    ###错误码
 "msg"       ###文字描述
 "data"  ###返回数据
}

P.S.分页的返回结构：
{
 "state":0,  ###0-成功，1-失败
 "code":,    ###错误码
 "msg"       ###文字描述
 "data":[
  "count": ####总量
  "list":  ####列表结果
 ]
} 
*/
