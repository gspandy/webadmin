/**
 * @file: 文章管理接口
 * author: YJ(yjzhen@live.com)
 */
'use strict';
import { base, axios } from './config';
const art = base + '/art/web'; // 文章接口
// let article = 'http://shop.flowerexpresses.com/art/web'; // 文章接口
/**
 * article
 */
// 参数：s-当前页码，必要；l-当前页条目数量，非必要
export const listArticle = params => { return axios.post(`${art}/article/get_list`, params) };
// 参数：title-标题; t_desc-摘要;
// cat-分类; sort-排序码; type-文章状态：0，普通；1，置顶；2，推荐，3，热门
// content-内容; logo_url-文章头图；issue_time：发布时间
export const addArticle = params => { return axios.post(`${art}/article/add_article`, params); };
// 编辑文章
// // 参数： t_id-标签名字; t_name-标签名字; con_list-数组，元素为{a_id, a_title}(文章ID，文章标题)
export const editArticle = params => { return axios.post(`${art}/article/edit_article`, params) };
// //参数： a_id-文章ID
export const getArticleInfo = params => { return axios.post(`${art}/article/get_article`, params) };
// 获取文章标签列表
export const getArticleTagList = params => { return axios.post(`${art}/article_tags/get_list`, { params: params }); };
// 添加文章标签
// 参数： t_name-标签名字; con_list-数组，元素为{a_id, a_title}(文章ID，文章标题)
export const addArticleTag = params => { return axios.post(`${art}/article_tags/add_tag`, params); };
// 编辑文章标签
export const editArticleTag = params => { return axios.post(`${art}/article_tags/edit_tag`, params); };
// 删除标签
// 参数： t_id-标签ID
export const delArticleTag = params => { return axios.post(`${art}/article_tags/del_tag`, params) };
// 标签详情
// 参数： t_id-标签ID
export const getArticleTagInfo = params => { return axios.post(`${art}/article_tags/get_tag`, params) };
// 删除文章
// 参数： a_id-文章ID
export const delArticle = params => { return axios.post(`${art}/article/del_article`, params); };
// 获取文章分类
export const getArticleCatList = params => { return axios.post(`${art}/article_cat/get_cat_list`, { params: params }); };
// export const getArticleCatList = function(params) {
//      return axios.post(`${art}/article_cat/get_cat_list`, { params: params });
// }
// 添加文章分类选项
// 参数： p_id-父类ID，必要，分类为顶级，传1 ; c_name-分类名称
export const addArticleCat = params => { return axios.post(`${art}/article_cat/add_cat`, params); };
// 删除文章分类
export const delArticleCat = params => { return axios.post(`${art}/article_cat/del_cat`, params); };
// 编辑文章分类
export const editArticleCat = params => { return axios.post(`${art}/article_cat/edit_cat`, params); };
export const testApi = params => { return axios.post(`${art}/article_cat/edit_cat`, params); };
// 参数： t_id-标签ID ;a_id-文章ID
export const delTagArticle = params => { return axios.post(`${art}/article_tags/del_tag_ariticle`, params) };

// 测试图片上传
// export const testUploadImgApi = params => { return axios.post(`http://localhost:3801/upload/images`, params); };
export const uploadArticleImg = params => { return axios.post(`${base}/art/web/article/up_logo_img`, params); };
export const testUploadImgApi = params => { return axios.post(`${base}/art/web/article/up_logo_img`, params); };

// export const _addArticleCat = params => { 
//     return axios.post('http://localhost:3801/article/add', {
//         title:123,
//         name: 123123
//     });
// };





// export const requestLogin = params => { return axios.post(`${base}/login`, params) };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
// // // 商品列表
// // export const getGoodsList = params => { return axios.get(`${base}/goods/list`, { params: params }); };
// // // 获取商品标签列表
// // export const getGoodsGrout = params => { return axios.get(`${base}/goods/grout`, { params: params }); };
// // 商品列表
// export const getGoodsList = params => { return axios.get(`${base}/goods/list`, { params: params }); };
// // 获取商品标签列表
// export const getGoodsGrout = params => { return axios.get(`${base}/goods/grout`, { params: params }); };









// export const getUpLogo = params => { return axios.get(`${base}/article/up_logo_img`, { params: params }); };



// /**
//  * articletag
//  */


// // 参数： t_id-标签名字; t_name-标签名字; con_list-数组，元素为{a_id, a_title}(文章ID，文章标题)
// export const editTag = params => { return axios.post(`${base}/article_tags/edit_tag`, params) };




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

// import Vue from 'vue';
// import VueResource from 'vue-resource';
// Vue.use(VueResource);
// const ArticleResource = Vue.resource(`${art}/article_cat/add_cat`);
// Vue.http.interceptors.push((request,next)=>{
//     request.headers = request.headers || {};
//     // request.headers.set('Authorization','Bearer 123');
//     console.log('请求');
//     next((response)=>{
//         if(response.status == 401){
//             signOut();
//             window.location.pathname='/login';
//         }
//     })
// });
// export const _catList = params => {
//     return ArticleResource.get();
// }
// export const _addArticleCat = params => {
//     return ArticleResource.save(params);
// }