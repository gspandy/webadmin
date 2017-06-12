/**
 * @file: 商品管理（平台端
 * author: chenzhengquan(mewhat)
 */
'use strict';
import { base, axios } from './config';
const pat = base + '/pat/web'; // 平台接口

// 添加商品规格
// 参数：t_name 标签名字，con_list 相关属性值
export const addAdminType = params => { return axios.post(`${pat}/goods_attr/add_type`, params) };

// 添加商品规格属性
// 参数：s_id 规格ID，a_name 属性名称
export const addAdminAttr = params => { return axios.post(`${pat}/goods_attr/add_attr`, params) };

// 删除商品规格
// 参数：s_id 规格code
export const delAdminType = params => { return axios.post(`${pat}/goods_attr/del_type`, params) };

// 删除商品规格属性
// 参数：s_id 规格code
export const delAdminAttr = params => { return axios.post(`${pat}/goods_attr/del_attr`, params) };

// 获取商品规格属性列表
const list = base + '/gds/web/product_attr/get_type_list';
export const getTypeAttrLists = params => {
    return axios.post(`${list}`, params);
}

// 获取主体列表
// 参数：
export const getListAdmin = params => { return axios.post(`${pat}/group/get_list`, params) };

// 获取主体信息 group_sn
export const getShopGroup = params => { return axios.post(`${pat}/group/get_group`, params) };

// 编辑主体信息 group_sn
export const editShopGroup = params => { return axios.post(`${pat}/group/edit_group`, params) }

// 删除主体 group_sn
export const delShopGroup = params => { return axios.post(`${pat}/group/delete_group`, params) };

// 添加主体信息
// type 类型ID，1-个人，2-公司
// r_name 主体或者法定代表人名字
// c_name 联系人名称
// c_tel 联系号码
// wx 微信
// qq qq
export const addGroupAdmin = params => { return axios.post(`${pat}/group/add_group`, params); }


// 添加店铺信息
// g_sn 组织ID
// s_name 商铺名字
// e_time 过期时间
// logo logo图片
// desc 简介
// address 自取地址列表
export const addShopAdmin = params => { return axios.post(`${pat}/store/add_shop`, params); }

// 平台端获取店铺信息 s_sn 店铺ID
export const getShopAdmin = params => { return axios.post(`${pat}/store/get_shop`, params); }

// 平台端修改店铺信息
// s_sn	true	int	post	店铺ID
// s_name	true	string	post	商铺名字
// e_time	true	string	post	过期时间
// logo	false	string	post	logo图片
// desc	false	string	post	简介
// invite_name	true	string	post	自取点
// invite_address	true	string	post	自取地址
// c_name	true	string	post	联系人
// c_tel	true	string	post	联系电话
// wx	true	string	post	微信号码
// qq	true	string	post	qq号码
export const editShopAdmin = params => { return axios.post(`${pat}/store/edit_shop`, params); }

// 获取文章标签列表
// export const getArticleTagList = params => { return axios.post(`${art}/article_tags/get_list`, { params: params }); };

// 获取店铺列表
export const getShopList = params => { return axios.post(`${pat}/store/get_shop_list`, params); }

// 获取商品分类列表
export const getGoodsCatList = params => { return axios.post(`${pat}/goods_cat/get_cat_list`, params); }

// 添加商品分类
export const addGoodsCat = params => { return axios.post(`${pat}/goods_cat/add_cat`, params); }

// 删除商品分类  参数：c_id--分类id，非必要
export const delGoodsCat = params => { return axios.post(`${pat}/goods_cat/del_cat`, params); }

// 编辑商品分类  参数：c_id--分类id，非必要；c_name--分类名称，必要
export const editGoodsCat = params => { return axios.post(`${pat}/goods_cat/edit_cat`, params); }

const usr = base + '/usr/web/user/get_reserve_user';
// 获取店长
export const getManager = params => { return axios.post(`${usr}`, params); }

// 添加系统用户
export const addSysUser = params => { return axios.post(`${pat}/system/add_sys_user`, params); }
// 编辑系统用户
export const editSysUser = params => { return axios.post(`${pat}/system/edit_sys_user`, params); }
// 获取系统用户列表
export const getSysUserList = params => { return axios.post(`${pat}/system/get_sys_user_list`, params); }
// 获取管理员信息
export const getSysUser = params => { return axios.post(`${pat}/system/get_sys_user`, params); }



// 测试图片上传
// export const testUploadImgApi = params => { return axios.post(`http://localhost:3801/upload/images`, params); };
export const uploadShopsImg = params => { return axios.post(`${base}/pat/web/store/upload_logo_img`, params); };
export const testUploadImgApi = params => { return axios.post(`${base}/art/web/article/up_logo_img`, params); };