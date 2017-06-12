// 发布商品
<style scoped lang="less">
	@import '~less_defined';
    
    .add-goods-page{
        padding-bottom: 100px;
        .goods-info {
            margin-top: 30px;
        }
        .goods-attr {
            @_pdSize: 15px;
            background: #f2f2f2;
            padding: @_pdSize;
            .goods-attr-item{
                margin-bottom: @_pdSize;
                padding: @_pdSize;
                background: #fafafa;
                &:last-child{
                    margin-bottom: 0px;
                }
                .goods-attr-val {
                    margin-top:10px;
                }
                .goods-attr-tag {
                	margin-right: @_pdSize;
                }
            }
        }
        .related-goods{
            > div {
                border-bottom: 1px dashed #ccc;
            }
            i{
                color: @iconGray;
            }
            .plus-icon{
                font-size: 20px;
                font-weight: 800;
                i:hover{
                    color:red;
                    cursor: pointer;
                }
            }
            .related-goods-item{
                display: flex;
                flex-wrap: wrap;
                padding: 10px 0px;
                > div {
                    margin-right: 30px;
                    i:hover{
                        color:red;
                        cursor: pointer;
                    }
                }
            }
        }
        .date {
        	span {
        		margin-right: 15px;
        	}
        }
        .btn-confirm {
        	position: relative;
        	top: 20px;
        	left: 50%;
        	transform: translateX(-50%);
        }
        .btn-add {
        	text-align: right;
        }
        .pre-mini-img {
            display: inline-block;
        }

        .search-box {
            margin-bottom: 15px;
            width: 50%;
        }
        .btn-box {
            text-align: center;
            margin-top: 20px;
        }
    }
</style>

<template>
    <section class="add-goods-page" v-loading="loadingLayout">
        <!--商品信息-->
        <div class="goods-info">
            <h3>商品信息</h3>
            <hr />
            <el-form :model="goods" label-width="110px" style="margin:20px;width:90%;min-width:700px;">
                <el-row :gutter="20">
                    <el-col :span="15">
                        <el-form-item label="商品名称：">
                            <el-input v-model="goods.p_name"  placeholder="输入商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="排序号：">
                            <el-input-number :controls="false" placeholder="0" style="width: 60px" v-model="goods.p_sort"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="商品标签：">
                            <el-tag :key="tag.tag_id" v-for="(tag, index) in tempSelectTags.tags" :closable="true" :close-transition="false" @close="onRemoveSelectTag(index)">{{tag.tag_name}}</el-tag>
                            <el-select v-model="tempSelectTags.current" @change="onSelectGoodsTag" placeholder="选择商品标签">
                                <el-option v-for="item in tagsList" :label="item.tag_name" :key="item.tag_id" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="8">
                        <el-form-item label="排序号：">
                            <el-input-number :controls="false" placeholder="0" style="width: 60px" v-model="goods.p_sort"></el-input-number>
                        </el-form-item>
                    </el-col>-->
                </el-row>
                <el-row>
                	<el-col :span="18">
                		<el-row>
			                <el-form-item label="商品价格：">
			                    <el-col :span="7">
			                        <el-input placeholder="建议销售价" v-model="goods.p_m_price">
			                            <template slot="prepend">￥</template>
			                        </el-input>
			                    </el-col>
			                    <el-col :span="2">&nbsp;</el-col>
			                    <el-col :span="7">
			                        <el-input placeholder="市场价" v-model="goods.p_o_price"></el-input>
			                    </el-col>
			                    <el-col :span="2">&nbsp;</el-col>
			                    <el-col :span="6">
			                        <el-input disabled placeholder="结算价:0" v-model="goods.p_a_price"></el-input>
			                    </el-col>
			                    <!--<div class="demo-input-size">
			                        <el-input placeholder="请输入内容">
			                        </el-input>
			                        <el-input placeholder="请输入内容"></el-input>
			                        <el-input placeholder="请输入内容"></el-input>
			                    </div>-->
			                </el-form-item>
                		</el-row>
                	</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="库存：">
                            <el-input placeholder="0" v-model='goods.p_inven'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-form-item label="商品图片：">
                    <img-upload></img-upload>
                    <el-upload
                        ref="goodsImgBox"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handlePictureRemove"
                        :auto-upload="true"
                        accept="image/*">
                        <i class="el-icon-plus"></i>
                        <div slot="tip">建议尺寸：640X640像素</div>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="preview_goods_img"/>
                    </el-dialog>
                </el-form-item>-->
                <el-form-item label="商品图片：">
                    <img-upload :preinstall-images="goods.l_img_url" @imgChange="onImgChange" @rmSelectImg="onRmSelectImg" list-type="picture-card"></img-upload>
                </el-form-item>
                <el-form-item label="商品简介：">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入商品简介" v-model="goods.p_intro">
                    </el-input>
                </el-form-item>
                <el-form-item label="商品详情：">
                    <wang-editor
                        v-if="loadingEditor"

                        :params-data="uploadParams"
                        :upload-img-url="editUploadImgUrl"
                        name="product_desc_img"

                        :init-content="goods.p_desc"
                        @contentChanged="goodsInfoChanged"
                        v-model="goods.p_desc">
                    </wang-editor>
                </el-form-item>
            </el-form>
        </div>
        <!--商品属性-->
        <h3>商品属性</h3>
        <hr />
        <el-form :model="goods" label-width="110px" style="margin:20px;width:90%;min-width:700px;">
            <el-form-item label="商品属性：">
                <div class="goods-attr" v-model="goods.p_sns">
                    <!--<div class="goods-attr-item">
                        <el-row>
                            <el-col :span="21">
                                <el-select v-model="goods.region" placeholder="颜色">
                                    <el-option label="颜色" value="shanghai"></el-option>
                                    <el-option label="颜色" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="text">删除</el-button>
                            </el-col>
                        </el-row>
                        <div class="goods-attr-val">
                            <el-tag :closable="true">标签一</el-tag>
                            <el-button type="text">+添加</el-button>
                        </div>
                    </div>-->
                    <template v-for="(item, index) in hasGoodsAttr">
                        <div class="goods-attr-item">
                            <el-row>
                                <el-col :span="21">
                                    <el-select placeholder="请选择" v-model="item.specify_code" @change="onSelectGoodsAttr(index)">
                                        <template v-for="attrItem in goodsAllAttrs">
                                            <el-option v-if="attrItem.list.length > 0 && (attrItem.select === index || attrItem.select === undefined )" :label="attrItem.specify_name" :value="attrItem.specify_code"></el-option>
                                        </template>
                                    </el-select>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="text" @click="onRemoveAttrList(index)">删除</el-button>
                                </el-col>
                            </el-row>
                            <div class="goods-attr-val">
                                <el-tag v-for="(tag, tIndex) in hasGoodsAttr[index].list" :key="tag.code" :closable="true" :close-transition="false" @close="onRemoveAttrVal(index, tag.code)" class="goods-attr-tag">{{tag.name}}</el-tag>
                                <!--<el-input v-if="inputColorVisible" size="mini" ref="saveColorInput" @keyup.enter.native="handleColorConfirm" @blur="handleColorConfirm" placeholder="添加" v-model="inputColor" style="width:100px"></el-input>-->
                                <el-button type="text" size="small" @click="onAddGoodsAttrVal(index)">+添加</el-button>
                            </div>
                        </div>
                    </template>
                    <!--<div class="goods-attr-item">
                        <el-select placeholder="请选择">
                            <el-option label="上海" value="shanghai"></el-option>
                            <el-option label="广州" value="guangzhou"></el-option>
                        </el-select>
                        <div class="goods-attr-val">
                            <el-tag :closable="true">标签一</el-tag>
                            <el-button type="text">+添加</el-button>
                        </div>
                    </div>-->
	                <div>
	                    <el-button :disabled="getAttrListState" icon="plus" @click="onAddAttrList">添加规格项目</el-button>
	                </div>
                </div>
            </el-form-item>
            <el-form-item label="商品库存：">
                <el-table :data="goodsAttrTable" border style="width: 100%">
                    <el-table-column prop="date" label="规格" min-width="180">
                        <template scope="scope">
                            <template v-for="(item, index) in scope.row.s_attr">
                                <span>{{item.name}}</span>
                                <span v-if="index != (scope.row.s_attr.length - 1)"> x </span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column prop="s_price" label="价格" width="110">
                        <template scope="scope">
                            <el-input v-model="scope.row.s_price"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="s_inven" label="库存" width="110">
                        <template scope="scope">
                            <el-input v-model="scope.row.s_inven"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="outer_sn" label="商家编码" width="150">
                        <template scope="scope">
                            <el-input v-model="scope.row.outer_sn"></el-input>
                        </template>
                    </el-table-column>
                    <!--<el-table-column prop="date" label="销量" width="110"></el-table-column>-->
                </el-table>
            </el-form-item>
        </el-form>
        <!--相关推荐商品-->
        <h3>相关推荐商品</h3>
        <hr />
        <el-form :model="goods" label-width="110px" style="margin:20px;width:90%;min-width:700px;">
            <el-form-item label="选择商品：">
                <div class="related-goods">
                    <div class="plus-icon">
                        <i class="el-icon-plus" @click="onAddRecommen" size="21"></i>
                    </div>
                    <div class="related-goods-item" v-show="(selectRecoGoods.length !== 0)">
                        <div v-for="(item, index) in selectRecoGoods">
                            <i @click="onRemoveRecoGoods(index)" class="el-icon-circle-close"></i>
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <!--物流/其他-->
        <h3>物流/其他</h3>
        <hr />
                
        <el-form :model="logistics" label-width="110px" style="margin:20px;width:90%;min-width:700px;">
            <el-form-item label="配送方式：">
                <el-row :gutter="25">
                    <el-checkbox-group @change="onShippingChange" v-model="tempShipping.name">
                        <el-col :span="7">
                            <el-checkbox :label="1">自取</el-checkbox>
                        </el-col>
                        <el-col :span="7">
                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox :label="2">花巴士</el-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <el-input placeholder="0" v-model="tempShipping.price[1]" size="small"></el-input>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="7">
                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox :label="3">其他快递</el-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <el-input placeholder="0" v-model="tempShipping.price[2]" size="small"></el-input>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-checkbox-group>
                    <!--<el-col :span="5">
                        <el-select v-model="logistics.shipping_type" placeholder="请选择配送方式">
                            <el-option label="自取" value="self_pickup"></el-option>
                            <el-option label="花巴士" value="flowerbus"></el-option>
                            <el-option label="其他快递" value="express"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="5">
                        <el-input type="text" placeholder="输入自取点" v-model="logistics.shipping_self"></el-input>
                    </el-col>-->
                </el-row>
            </el-form-item>
            <el-form-item label="运费设置：">
                <!--<el-row>
                    <el-col :span="5">
                        <el-radio-group v-model="logistics.s_fee_type">
                            <el-radio label="unify_cost">统一邮费</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="5">
                        <el-input placeholder="输入价格" v-model="logistics.s_fee_value">
                            <template slot="prepend">￥</template>
                        </el-input>
                    </el-col>
                </el-row>-->
                <el-row>
                    <el-col>
                        <el-checkbox-group v-model="tempLogistics.h_time">
                            <el-checkbox :label="1">配送时间：</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                    <el-col>
                    	<el-form :inline="true">
                    		<el-form-item>
		                		<el-radio-group :disabled="!tempLogistics.h_time" v-model="logistics.d_time_type">
		                			<el-form-item>
		                				<el-radio :label="1">按周天：</el-radio>
		                			</el-form-item>
		                			<el-form-item>
		                				<el-checkbox-group v-model="tempLogistics.week">
		                					<el-checkbox :disabled="!tempLogistics.h_time || logistics.d_time_type !== 1" label="Mon">周一</el-checkbox>
		                					<el-checkbox :disabled="!tempLogistics.h_time || logistics.d_time_type !== 1" label="Tue">周二</el-checkbox>
		                					<el-checkbox :disabled="!tempLogistics.h_time || logistics.d_time_type !== 1" label="Wed">周三</el-checkbox>
		                					<el-checkbox :disabled="!tempLogistics.h_time || logistics.d_time_type !== 1" label="Thu">周四</el-checkbox>
		                					<el-checkbox :disabled="!tempLogistics.h_time || logistics.d_time_type !== 1" label="Fri">周五</el-checkbox>
		                					<el-checkbox :disabled="!tempLogistics.h_time || logistics.d_time_type !== 1" label="Sat">周六</el-checkbox>
		                					<el-checkbox :disabled="!tempLogistics.h_time || logistics.d_time_type !== 1" label="Sun">周日</el-checkbox>
		                				</el-checkbox-group>
		                			</el-form-item>
		                			<br />
		                			<el-form-item>
		                				<el-radio :label="2">按时间段：</el-radio>
		                			</el-form-item>
		                			<el-form-item label="从">
		                				<el-date-picker :disabled="tempLogistics.anyTime || !tempLogistics.h_time || logistics.d_time_type !== 2" v-model="tempLogistics.datePeriod1" placeholder="选择日期"></el-date-picker>
		                			</el-form-item>
		                			<el-form-item label="到">
		                				<el-date-picker :disabled="tempLogistics.anyTime || !tempLogistics.h_time || logistics.d_time_type !== 2" v-model="tempLogistics.datePeriod2" placeholder="选择日期"></el-date-picker>
		                			</el-form-item>
		                			<el-form-item>
		                				可选 | <el-checkbox :disabled="!tempLogistics.h_time || logistics.d_time_type !== 2" label="all" v-model="tempLogistics.anyTime">任意时段</el-checkbox>
		                			</el-form-item>
		                			<br />
		                			<br />
		                			<el-form-item>
		                				<el-radio :label="3">指定日期：</el-radio>
		                			</el-form-item>
		                			<el-form-item class="date">
		                				<el-tag :key="index" v-for="(date, index) in tempLogistics.givenTime" :closable="true" :close-transition="false" @close="onRemoveGivenTime(index)">{{date}}</el-tag>
                                        <el-date-picker @change="onSelectGivenTime" :disabled="!tempLogistics.h_time || logistics.d_time_type !== 3" v-model="tempLogistics.tempGivenTime" placeholder="+添加日期" :editable="false"></el-date-picker>
                                        
		                				<!--<el-input v-if="inputDateVisible" size="mini" ref="saveTagInput" @keyup.enter.native="handleDateConfirm" @blur="handleDateConfirm" placeholder="2017-01-01" v-model="inputDate" style="width:100px"></el-input>
		                				<el-button v-else size="small" @click="showInput">+添加日期</el-button>-->
		                			</el-form-item>
		                		</el-radio-group>
		                		<br />
                    		</el-form-item>
                    	</el-form>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
		<el-button type="primary" class="btn-confirm" size="large" @click="onOkAddGoods">确定</el-button>
		<!--商品属性弹窗-->
		<el-dialog title="选择商品属性" v-model="showAttrValBox">
			<el-form>
				<el-form-item>
					<el-checkbox-group v-model="tempSelectAttrVal">
						<el-checkbox v-for="item in goodsAttrValue.list" :key="item.code" :label="item.code">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item class="btn-add">
					<el-button type="primary" @click="onOkAttrVal">添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
        <!--关联、推荐商品-->
        <el-dialog size="large" v-model="selectGoodsLayout" v-loading="loadRecoGoods">
            <div class="search-box">
                <el-input class="input" placeholder="输入你要搜索的商品" icon="search" :on-icon-click="onSearchGoods" v-model="searchKey"></el-input>
            </div>

            <el-table ref="reco-goods-list" @selection-change="onRecoGoodsChange" :data="recoGoodsList" highlight-current-row style="width: 100%;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column width="80">
                    <template scope="scope">
						<div class="goods-img">
                        	<img :src="scope.row.logo_url" />
						</div>
                    </template>
                </el-table-column>
                <el-table-column label="商品/价格" min-width="120">
                    <template scope="scope">
                        <div>{{ scope.row.name }}</div>
                        <!--<div class="price">￥{{ scope.row.minPrice }}-{{ scope.row.maxPrice }}</div>-->
                        <div class="price">￥{{ scope.row.s_price }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="invent" label="库存" width="100" sortable>
                </el-table-column>
                <el-table-column prop="sales" label="销量" width="100" sortable>
                </el-table-column>
                <el-table-column prop="s_name" label="供货商" width="120">
                </el-table-column>
                <el-table-column prop="type" label="商品类型" width="120">
                </el-table-column>
            </el-table>
            <div class="btn-box">
                <el-button type="primary" @click="onConfirmSelect()">确定添加</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import Promise from 'promise';
    import { mapGetters } from 'vuex';
    import config from '../../config';
    import wangEditor from '../../components/wangeditor.vue';
    import imgUpload from '../../components/upload-img.vue';
    import {
        getGoodsNewSn,
        getGoodsList, 
        getGoodsTagList,
        addGoods,
        editGoods,
        getGoodsAttrList,
        getRecommendGoods,
        getGoodsInfo,
        uploadGoodsImg
    } from 'api';
	export default {
        components:{
            wangEditor,
            imgUpload
        },
        data() {
            return {
            	loadingLayout: false,
            	searchLoading: false,
                goods_sn: null,   //编辑商品时，商品的ID
                goodsInfoData: {},
                goods_new_sn: null,
                // 编辑框图片上传路径
                editUploadImgUrl: config.apiDomain + '/gds/web/product/upload_desc_img',
                // 编辑框图片上传的附加参数
                uploadParams: {
                    token: this.getLoginToken()
                },

            	// 商品
        		goods: {
                    p_sn: '',
					p_name: '', // 商品名字，必要
					p_tags: [], // 商品分类，必要
					p_sort: '', // 排序号，非必要
					p_m_price: '', // 销售价格，必要
					p_o_price: '', // 原价，必要
                    p_a_price: '',
					p_inven: '', // 商品库存，非必要
					l_img_url: [], // 文章标签，非必要
					p_intro: '', // 商品简介，非必要
					p_desc: '', // 商品详情，非必要
					p_sns: '', // 属性参数，sku列表，非必要
					p_recommend: [], // 商品推荐，非必要
					// sns_attr: '',
					// sns_val: '',
				},
                // 物流
                logistics: {
                	// shipping_self: '', // 自取点地址，非必要
                	// s_fee_type: '', // 运费类型，目前统一邮费，类型1，非必要
                	// s_fee_value: '', // 对应选择的运费值，非必要
                	shipping_type: [], // 配送方式，1-自取，2-花巴士，3-其他快递，必要
                	h_time: null, // 是否有配送时间，有-1，没-0，非必要
                	d_time_type: 0, // 配送时间的类型，1-按周天，2-按时间段，3-指定日期，非必要
                	d_time_value: [], // 配送时间类型对应的值，非必要
                },
                tempLogistics: {
                    h_time: false,
                    week: [],
                    anyTime: '',
                    datePeriod1: null,    // 按时间段:起始时段
                    datePeriod2: null,    // 按时间段:结束时段
                    tempGivenTime: null,
                    givenTime: []

                },
                tempShipping: { // 配送方式
                    name: [],
                    price: [0,,]
                },
				goodsAllAttrs: [],  // 商品属性列表
                hasGoodsAttr: [],   // 选中的商品属性
                goodsAttrTable: [],  // 属性表格
                goodsAttrValue: [], // 选择的属性对应的值（选择商品属性弹窗显示的数据）
                tempSelectAttrVal: [],  // 每次商品属性弹窗选择的值。
                showAttrValBox: false, // 是否显示商品属性值选择弹窗
                tempSelectTags: {   // 临时选择的标签
                    current: '',
                    tags: []
                },
                tagsList: [], // 商品分类标签
                selectRecoGoods: [],    // 已选择的推荐商品
                tempSelectRecoGoods: [],    // 选中的推荐商品
                recoGoodsList: [],  // 搜索推荐商品结果列表
                selectGoodsLayout: false,   // 是否显示搜索推荐商品弹窗
                loadRecoGoods: false,       // 搜索商品弹窗loading
                searchKey: '',  // 搜索推荐商品关键字
                selectImgs: [],
                loadingEditor: false,
                getAttrListState:false,
                // logiTimeType: null,
                // 、、、、、、、、、、、、、、

                preview_goods_img:'',
                dialogVisible: false,
                inputDateVisible: false, // 日期输入框
                inputTagVisible: false, // 日期输入框
                showSnsAttr: false, // 商品属性显示隐藏
                showSnsVal:false, // 商品属性值显示隐藏
                
            }
        },
        methods: {
            ...mapGetters(['getLoginToken']),
            alertBox(res){
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },
            // 添加一个商品属性项
            _addAttrItem() {
                this.hasGoodsAttr.push({
                    specify_code: '',
                    list: []
                });
            },
            // 添加商品属性名列表
            onAddAttrList() {
                this.showSnsAttr = true;
                if (this.goodsAllAttrs && this.goodsAllAttrs.length > 0) {
                    this._addAttrItem();
                    return;
                }
                this.getAttrListState = true;
                getGoodsAttrList().then(res => {
                    this.getAttrListState = false;
                    if (!this.alertBox(res)) return;
                    this._addAttrItem();
                    const _data = res.data;
                    this.goodsAllAttrs = _data;
                    if (this.goods_sn && ('goods_sn' in this.goodsInfoData)) {
                        this.initHasGoodsAttr();
                    }
                    // for (var i = 0; i < _data.length; i++) {
                    //     this.goodsAllAttrs.push.apply(this.goodsAllAttrs, _data[i].list);
                    // }
                },
                err => {
                    this.getAttrListState = false;
                    console.log(res);
                });
            	// if(this.goodsAllAttrs.length > 0) {
            	// 	for(let i = 0; i < this.goodsAllAttrs.length; i++) {
            	// 		if(this.goodsAllAttrs[i]) {
            	// 		}
            	// 	}
            	// }
            },
            // 移除已添加的属性名
            onRemoveAttrList(index) {
                const code = this.hasGoodsAttr[index].specify_code;
                this.hasGoodsAttr.splice(index, 1);
                for (var i = 0; i < this.goodsAllAttrs.length; i++) {
                    if (code === this.goodsAllAttrs[i].specify_code) {
                        delete this.goodsAllAttrs[i].select;
                    }
                }
                // 计算属性表
                this.computerAttrTable();
            },
            // 选择商品属性时触发
            onSelectGoodsAttr(index) {
                // const code = this.hasGoodsAttr[index].specify_code;
                // console.log(code);
                index && (this.hasGoodsAttr[index].list = []);
                for (var i = 0; i < this.goodsAllAttrs.length; i++) {
                    for (var h = 0; h < this.hasGoodsAttr.length; h++) {
                        if (this.goodsAllAttrs[i].specify_code === this.hasGoodsAttr[h].specify_code) {
                            this.goodsAllAttrs[i].select = h;
                            const _tempCode = this.hasGoodsAttr[h].specify_code;
                            this.hasGoodsAttr[h].specify_code = '';
                            this.hasGoodsAttr[h].specify_code = _tempCode;
                            break;
                        }
                        else if (h == this.hasGoodsAttr.length - 1) {
                            delete this.goodsAllAttrs[i].select;
                        }
                    }
                }
                // 计算属性表
                this.computerAttrTable();
            	// this.showSnsVal = true;
            },
            // 添加商品属性值时触发
            onAddGoodsAttrVal(index) {
                const _hasGoodsAttr = this.hasGoodsAttr[index];
                const code = _hasGoodsAttr.specify_code;
                this.tempSelectAttrVal = [];
                if (!code) {
                    this.$message.error({
                        showClose: true,
                        message: '请先选择属性',
                    });
                    return;
                }
                // 判断为那个属性添加值
                for (var i = 0; i < this.goodsAllAttrs.length; i++) {
                    if (this.goodsAllAttrs[i].specify_code === code) {
                        this.goodsAttrValue = this.goodsAllAttrs[i];
                        break;
                    }
                }
                // 遍历属性的所有值，筛选那个已经被选中
                // for (var i = 0; i < this.goodsAttrValue.list.length; i++) {
                //     if (this.goodsAttrValue.list.select === true) {
                //         this.tempSelectAttrVal.push(this.goodsAttrValue.list[i].code);
                //     }
                // }
                for (var i = 0; i < _hasGoodsAttr.list.length; i++) {
                    this.tempSelectAttrVal.push(_hasGoodsAttr.list[i].code);
                }
            	this.showAttrValBox = true;
            },
            // 确定添加商品属性值时触发（点击弹窗的“添加”按钮）
            onOkAttrVal() {
            	this.showAttrValBox = false;
                let index = null;
                // 循环判断为那个属性添加值
                for (var i = 0; i < this.hasGoodsAttr.length; i++) {
                    if (this.hasGoodsAttr[i].specify_code === this.goodsAttrValue.specify_code) {
                        index = i;
                        break;
                    }
                }
                if (index === null) return;
                this.hasGoodsAttr[index].list = [];
                // 循环遍历选中那些值
                for (var i = 0; i < this.goodsAttrValue.list.length; i++) {
            	    for (var t = 0; t < this.tempSelectAttrVal.length; t++) {
                        // 判断是否被选中
                        if (this.tempSelectAttrVal[t] == this.goodsAttrValue.list[i].code) {
                            this.hasGoodsAttr[index].list.push({
                                code: this.goodsAttrValue.list[i].code,
                                name: this.goodsAttrValue.list[i].name
                            });
                            // this.goodsAttrValue.list[i].select = true;
                            break;
                        }
                        // else if (t === this.tempSelectAttrVal.length - 1) {
                        //     delete this.goodsAttrValue.list[i].select;
                        // }
                    }
                }
                // for (var t = 0; t < this.tempSelectAttrVal.length; t++) {
                //     this.hasGoodsAttr[index].list.push({
                //         code: this.tempSelectAttrVal[i].code,
                //         name: this.tempSelectAttrVal[i].name
                //     });
                // }
                this.computerAttrTable();
            },
            // 删除选择颜色标签
            onRemoveAttrVal(index, code) {
            	let _tempGoodsAttr = null;
                let _hasGoodsAttr = this.hasGoodsAttr[index];
                for (var i = 0; i < _hasGoodsAttr.list.length; i++) {
                    if (_hasGoodsAttr.list[i].code === code) {
                        _hasGoodsAttr.list.splice(i, 1);
                        return;
                    }
                }
            },
            onShippingChange(_data) {
                // let _temp = [];
                // for (var i = 0; i < _data.length; i++) {
                //     _temp.push({
                //         s_type: _data[i],
                //         s_value: this.tempShipping.price[_data[i]]
                //     });
                // }
                // this.logistics.shipping_type = _temp;
            },
            // 添加指定配送日期
            onSelectGivenTime(_date) {
                // _date = new Date(_date);
                // console.log(_date);
                this.tempLogistics.givenTime.push(_date);
                this.tempLogistics.tempGivenTime = null;
            },
            // 删除指定配送日期
            onRemoveGivenTime(index) {
            	this.tempLogistics.givenTime.splice(index, 1);
            },
            // 确定添加商品
            onOkAddGoods() {
                // 组织配送方式
                const shippingName = this.tempShipping.name;
                const shippingPrice = this.tempShipping.price;
                this.logistics.shipping_type = [];
                for (var i = 0; i < shippingName.length; i++) {
                    this.logistics.shipping_type.push({
                        s_type: shippingName[i],
                        s_value: shippingPrice[shippingName[i] - 1]
                    });
                }
                // 是否有配送时间
                this.logistics.h_time = this.tempLogistics.h_time ? 1 : 0;
                this.logistics.d_time_value = [];
                if (this.logistics.h_time === 1) {
                    switch (this.logistics.d_time_type) {
                        case 1:
                            if (this.tempLogistics.week.length === 0) {
                                this.$message.error('请选择配送时间');
                                return;
                            }
                            this.logistics.d_time_value = this.tempLogistics.week;
                            break;
                        case 2:
                            if (this.tempLogistics.anyTime) {
                                this.logistics.d_time_value = ['all'];
                            }
                            else {
                                if (!this.tempLogistics.datePeriod1 || !this.tempLogistics.datePeriod1) {
                                    this.$message.error('起始时间和结束时间都不能为空');
                                    return;
                                }
                                const _time1 = new Date(this.tempLogistics.datePeriod1);
                                const _time2 = new Date(this.tempLogistics.datePeriod2);
                                this.logistics.d_time_value = [
                                    _time1.getTime(),
                                    _time2.getTime()
                                ]
                                // this.logistics.d_time_value = [
                                //     this.tempLogistics.datePeriod1.getTime(),
                                //     this.tempLogistics.datePeriod2.getTime()
                                // ]
                            }
                            break;
                        case 3:
                            for (var i = 0; i < this.tempLogistics.givenTime.length; i++) {
                                this.logistics.d_time_value.push(new Date(this.tempLogistics.givenTime[i]).getTime());
                            }
                            break;
                    }
                }
                // 关联商品
                const _selectReco = this.selectRecoGoods;
                for (var s = 0; s < _selectReco.length; s++) {
                    this.goods.p_recommend.push(_selectReco[s].goods_sn);
                }
                this.goods.p_sn = this.goods_new_sn || this.goods_sn;
                // console.log(this.logistics);
                this.releaseGoods({
                    ...this.goods,
                    ...this.logistics
                });
            },
            // 选择商品分类
            onSelectGoodsTag(tag) {
                this.tempSelectTags.current = '';
                if (!tag) return;
                for (var i = 0; i < this.goods.p_tags.length; i++) {
                    if (tag.tag_id === this.goods.p_tags[i]) return;
                }
                this.tempSelectTags.tags.push(tag);
                this.goods.p_tags.push(tag.tag_id);
            },
            // 移除商品分类
            onRemoveSelectTag(index) {
                const tag = this.tempSelectTags.tags[index];
                this.tempSelectTags.tags.splice(index, 1);
                for (var i = 0; i < this.goods.p_tags.length; i++) {
                    if (this.goods.p_tags[i] === tag.tag_id) {
                        this.goods.p_tags.splice(i, 1);
                    }
                }
            },
            // 添加推荐商品
            onAddRecommen() {
            	// this.loadingLayout = true;
                this.selectGoodsLayout = true;
                if (this.recoGoodsList.length > 0) return;
                this.loadRecoGodos = true;
            	getRecommendGoods().then(res => {
            		this.loadingLayout = false;
                    const _list = res.data.list;
                    if (this.recoGoodsList.length === 0) {
                        this.recoGoodsList = _list;
                        // setTimeout(() => {
                        //     this.$refs['reco-goods-list'].toggleRowSelection(_list[1]);
                        // }, 1000);
                    }
                    else {
                        for (var i = 0; i < _list.length; i++) {
                            for (var r = 0; r < this.recoGoodsList.length; r++) {
                                if (_list[i].goods_sn === this.recoGoodsList[r].goods_sn) {
                                    break;
                                }
                                else if (r === this.recoGoodsList.length - 1) {
                                    this.recoGoodsList.push(_list[i]);
                                    r++;
                                }
                            }
                        }
                    }
                    this.setSelectRecoGoods();
            		// this.recoGoodsList = res.data.list;
            	},
                err => {
            		this.loadingLayout = false;
            		console.log('添加推荐失败',err);
            	});
            },
            // 确定选择
            onConfirmSelect() {
                this.selectGoodsLayout = false;
                const _temp = this.tempSelectRecoGoods;
                const _select = this.selectRecoGoods;
                if (_select.length === 0) {
                    this.selectRecoGoods = _temp;
                    return;
                }
                for (var i = 0; i < _temp.length; i++) {
                    for (var r = 0; r < _select.length; r++) {
                         if (_temp[i].goods_sn === _select[r].goods_sn) {
                            break;
                        }
                        else if (r === _select.length - 1) {
                            _select.push(_temp[i]);
                            r++;
                        }
                    }
                }
                
            },
            // 移除选择的商品
            onRemoveRecoGoods(index) {
                const _item = this.selectRecoGoods[index];
                this.selectRecoGoods.splice(index, 1);
            },
            // 搜索商品
            onSearchGoods() {},
            onRecoGoodsChange(_data) {
                this.tempSelectRecoGoods = _data;
            },
            // 选择图片后触发
            onImgChange(img) {
                this.selectImgs = img;
                // await this.uploadImages();
            },
            // 移除图片后触发
            onRmSelectImg(img) {
                this.selectImgs = img;
            },
            // 发布商品前，获取商品编码
            getGoodsSn() {
                getGoodsNewSn().then(res => {
                    if (!this.alertBox(res)) return;
                    this.goods_new_sn = res.data.g_sn;
                },
                err => {})
            },
        	// 获取商品标签
        	getPcat() {
        		this.loadingLayout = true;
        		getGoodsTagList().then(res => {
        			this.loadingLayout = false;
        			this.tagsList = res.data;
        		},
                err => {
        			this.loadingLayout = false;
        			console.log('获取标签分类失败',err);
        		})
        	},
            // 根据已经选择的属性值，计算属性值组合的可能性
            computerAttrTable() {
                // console.log(this.hasGoodsAttr);
                const _tempAttrGroup = [];
                let _temp1 = [];
                let _temp2 = [];
                let _temp3 = [];
                for (var i = 0; i < this.hasGoodsAttr.length; i++) {
                    _temp1 = _temp2;
                    this.hasGoodsAttr[i].list.length > 0 && (_temp2 = []);
                    for (var l = 0; l < this.hasGoodsAttr[i].list.length; l++) {
                        if (i === 0) {
                            _temp2.push([
                                {
                                    a_type: this.hasGoodsAttr[i].specify_code,
                                    a_val: this.hasGoodsAttr[i].list[l].code,
                                    name: this.hasGoodsAttr[i].list[l].name
                                }
                            ]);
                            // _tempAttrGroup.push([this.hasGoodsAttr[i].list[l].name]);
                        }
                        else {
                            for (var t = 0; t < _temp1.length; t++) {
                                _temp2.push(_temp1[t].concat({
                                    a_type: this.hasGoodsAttr[i].specify_code,
                                    a_val: this.hasGoodsAttr[i].list[l].code,
                                    name: this.hasGoodsAttr[i].list[l].name
                                }));
                                // _temp2.push(_temp1[t].concat(this.hasGoodsAttr[i].list[l].name));
                            }
                        }
                    }
                }
                this.goodsAttrTable = [];
                for (var i = 0; i < _temp2.length; i++) {
                    this.goodsAttrTable.push({
                        s_attr: _temp2[i],
                        s_price : 0,
                        s_inven : 0,
                        outer_sn : '',
                    });
                }
                // this.goodsAttrTable = _temp2;
                // console.log(this.goodsAttrTable);
            },
            // 上传商品图片
            uploadImages(img) {
                // uploadGoodsImg()
                return new Promise((resolve, reject) => {
                    var formdata=new FormData();
                    formdata.append('token', this.getLoginToken());
                    formdata.append('g_sn', this.goods_new_sn || this.goods_sn);
                    formdata.append('product_img', img);
                    uploadGoodsImg(formdata).then(res => {
                        resolve(res);
                    },
                    err => {
                        this.$alert('上传图片失败！', '提示', {
                            confirmButtonText:'确定'
                        });
                        reject('上传图片失败！');
                    });
                });
            },
            // 添加商品
            async releaseGoods(params) {
                if (!params.p_name) {
                    this.$message.error('商品名称不能为空');
                    return;
                }
                // if (params.p_tags.length === 0) {
                //     this.$message.error('请选择商品标签');
                //     return;
                // }
                if (!params.p_m_price) {
                    this.$message.error('销售价不能为空');
                    return;
                }
                if (!params.p_o_price) {
                    this.$message.error('原价不能为空');
                    return;
                }
                if (params.shipping_type.length <= 0) {
                    this.$message.error('请选择配送方式');
                    return;
                }
                if (params.l_img_url.length <= 0 && this.selectImgs.length <= 0) {
                    this.$message.error('请选择要上传的商品图片');
                    return;
                }
                // 上传商品图片
                const temp_goods_img = [];
                let temp_res = {};
                for (var i = 0; i < this.selectImgs.length; i++) {
                    temp_res = await this.uploadImages(this.selectImgs[i]);
                    // console.log(temp_res);
                    temp_goods_img.push({
                        m_img: 0,
                        short_url:temp_res.data.img,
                        url:temp_res.data.img
                    });
                }
                params.l_img_url = params.l_img_url.concat(temp_goods_img)
                // 判断属性是否被改变
                this.changeGoodsAttrTable();
                // 属性列表
                params.p_sns = this.goodsAttrTable;
                params.edit = 1;
                // 遍历属性，判断是否被修改过
                for (var i = 0; i < params.p_sns.length; i++) {
                    if (params.p_sns[i].edit === 2) {
                        params.edit = 2;
                        break;
                    }
                }
                // 判断物流
                if (!params.h_time){
                    delete params.d_time_value;
                    delete params.d_time_type;
                }

                const _opeGoods = this.goods_sn ? editGoods : addGoods;
                _opeGoods(params).then(res => {
                    if (!this.alertBox(res)) return;
                    this.$message({
                        showClose: true,
                        message: this.goods_sn ? '编辑商品成功' : '添加商品成功',
                        type: 'success'
                    });
                    this.$router.push('list');
                },
                err => {
                });
            },
            // 判断商品属性是否被改变
            changeGoodsAttrTable(){
                const _attrTable = this.goodsInfoData.sku_list || [];
                const _table = this.goodsAttrTable;
                if (_attrTable.length == 0) {
                    for (var i = 0; i < _table.length; i++) {
                        _table[i].edit = 2;
                    }
                    return;
                }
                for (var i = 0; i < _table.length; i++) {
                    for (var s = 0; s < _attrTable.length; s++) {
                        if (_table[i].s_attr.length !== _attrTable[s].attr_list.length) {
                            if (s === _attrTable.length - 1) {
                                _table[i].edit = 2;
                                break;
                            }
                            continue;
                        }
                        
                        let _self = true;
                        for (var tl = 0; tl < _table[i].s_attr.length; tl++) {
                            for (var sl = 0; sl < _attrTable[s].attr_list.length; sl++) {
                                if (_table[i].s_attr[tl].a_val === _attrTable[s].attr_list[sl].code) {
                                    break;
                                }
                                else if (sl === _attrTable[s].attr_list.length - 1) {
                                    _self = false;
                                }
                            }
                            if (!_self) break;
                        }
                        if (_self) {
                            _table[i].edit = 1;
                            break;
                            // 还要判断价格
                            // if (_table[i].outer_sn == _attrTable[s].outer_sku_sn &&
                            // _table[i].s_inven == _attrTable[s].invent &&
                            // _table[i].s_price == _attrTable[s].price) {
                            //     _table[i].edit = 1;
                            //     break;
                            // }
                            // else if (s === _attrTable.length - 1) {
                            //     _table[i].edit = 2;
                            // }
                        }
                        else if (s === _attrTable.length - 1) {
                            _table[i].edit = 2;
                        }
                    }
                }
                this.goodsAttrTable = _table;
            },
            // 设置预选择推荐商品
            setSelectRecoGoods() {
                const _list = this.recoGoodsList;
                const _select = this.selectRecoGoods;
                const dom = this.$refs['reco-goods-list'];
                dom.clearSelection();
                for (var s = 0; s < _select.length; s++) {
                    for (var l = 0; l < _list.length; l++) {
                        if (_list[l].goods_sn === _select[s].goods_sn) {
                            dom.toggleRowSelection(_list[l]);
                            break;
                        }
                    }
                }
            },
            // 获取商品详情信息
            getGoodsInfoMsg() {
                getGoodsInfo({g_id: this.goods_sn}).then(res => {
                    if (!this.alertBox(res)) return;
                    this.goodsInfoData = res.data;
                    // console.log(res.data);
                    this.assignGoodsInfo(res.data);
                },
                err => {});
            },
            // 编辑商品时，初始化商品数据data
            assignGoodsInfo(data) {
                
                this.goods = {
					p_name: data.goods_name, // 商品名字，必要
					p_tags: [], // 商品分类，必要
					p_sort: data.sort, // 排序号，非必要
					p_m_price: data.m_price, // 销售价格，必要
					p_o_price: data.o_price, // 原价，必要
                    p_a_price: data.a_price,
					p_inven: data.invent, // 商品库存，非必要
					l_img_url: data.img, // 文章标签，非必要
					p_intro: data.g_intro, // 商品简介，非必要
					p_desc: data.g_desc, // 商品详情，非必要
					// p_sns: data.name, // 属性参数，sku列表，非必要
					p_recommend: data.name || [], // 商品推荐，非必要
					// sns_attr: data.name,
					// sns_val: data.name,
                }
                // 遍历标签
                for (var i = 0; i < data.tag_list.length; i++) {
                    this.goods.p_tags.push(data.tag_list[i].t_id);
                    this.tempSelectTags.tags.push({
                        tag_id: data.tag_list[i].t_id,
                        tag_name: data.tag_list[i].t_name
                    });
                }
                // 遍历关联商品
                for (var key in data.recommend_list) {
                    this.selectRecoGoods.push({
                        goods_sn: data.recommend_list[key].goods_sn,
                        name: data.recommend_list[key].goods_name
                    });
                }
                // 判断是否已经加载了
                // if (this.goodsAllAttrs.length > 0) {
                //     // 初始化属性
                // }
                this.initHasGoodsAttr();
                this.loadingEditor = true;
            },
            // 编辑商品时，初始化已有的属性
            initHasGoodsAttr() {
                const data = this.goodsInfoData;
                const attr = this.goodsAllAttrs;
                const _hasAttr = [];
                const _hasFAttr = [];
                let _tempAttr = [];
                const _tempAttrVal = [];
                // for (var t = 0; t < attr.length; t++) {
                //     // if ()
                // }
                // console.log(JSON.stringify(data));
                // 遍历商品的sku
                for (var i = 0; i < data.sku_list.length; i++) {
                    _tempAttr = data.sku_list[i].attr_list;
                    for (var t = 0; t < _tempAttr.length; t++) {
                        // 组织商品属性
                        if (_hasAttr.length === 0) {
                            _hasAttr.push({
                                specify_code: _tempAttr[t].s_code,
                                list: [{
                                    code: _tempAttr[t].code,
                                    specify_code: _tempAttr[t].s_code,
                                    name: _tempAttr[t].name
                                }]
                            });
                            _tempAttrVal.push(_tempAttr[t].code);
                        }
                        else {
                            for (var h = 0; h < _hasAttr.length; h++) {
                                if (_tempAttr[t].s_code === _hasAttr[h].specify_code) {
                                    for (var l = 0; l < _hasAttr[h].list.length; l++) {
                                         if (_tempAttr[t].code ===  _hasAttr[h].list[l].code) {
                                            break;
                                        }
                                        else if (l === _hasAttr[h].list.length - 1) {
                                            // console.log(_tempAttr[t].name);
                                             _hasAttr[h].list.push({
                                                code: _tempAttr[t].code,
                                                specify_code: _tempAttr[t].s_code,
                                                name: _tempAttr[t].name
                                            });
                                            _tempAttrVal.push(_tempAttr[t].code);
                                        }
                                    }
                                    break;
                                }
                                else if (h === _hasAttr.length - 1) {
                                    _hasAttr.push({
                                        specify_code: _tempAttr[t].s_code,
                                        list: [{
                                            code: _tempAttr[t].code,
                                            specify_code: _tempAttr[t].s_code,
                                            name: _tempAttr[t].name
                                        }]
                                    });
                                    _tempAttrVal.push(_tempAttr[t].code);
                                }
                                //  if (_tempAttr[t].code === _hasAttr[h].code) {
                                //     break;
                                // }
                                // else if (h === _hasAttr.length - 1) {
                                //     _hasAttr.push({
                                //         code: _tempAttr[t].code,
                                //         specify_code: _tempAttr[t].s_code,
                                //         specify_name: _tempAttr[t].name
                                //     });
                                // }
                            }
                        }
                    }
                }
                // for (var i = 0; i < attr.length; i++) {
                //     attr
                // }
                // this.tempSelectAttrVal = _tempAttrVal;
                this.hasGoodsAttr = _hasAttr;
                // console.log(_hasAttr);
                this.initShipping();
                this.initLogisticsTime();
                setTimeout(() => {
                    this.initGoodsAttrPrice();
                }, 500);
            },
            // 初始化商品属性组合后的价格、库存
            initGoodsAttrPrice() {
                const data = this.goodsInfoData;
                const tableData = [];
                let _temp = {};
                for (var i = 0; i < data.sku_list.length; i++) {
                    _temp = {
                        s_attr:[],
                        s_sn: data.sku_list[i].s_sn,
                        g_sn: data.sku_list[i].g_sn,
                        outer_sn:data.sku_list[i].outer_sku_sn,
                        s_inven:data.sku_list[i].invent,
                        s_price:data.sku_list[i].price
                    }
                    for (var l = 0; l < data.sku_list[i].attr_list.length; l++) {
                        _temp.s_attr.push({
                            a_type: data.sku_list[i].attr_list[l].s_code,
                            a_val: data.sku_list[i].attr_list[l].code,
                            name: data.sku_list[i].attr_list[l].name
                        });
                    }
                    tableData.push(_temp);
                }
                this.goodsAttrTable = tableData;
            },
            // 初始化配送方式
            initShipping() {
                const data = this.goodsInfoData;
                const shipping = data.shipping_list;
                this.tempShipping.name = [];
                for (var s = 0; s < shipping.length; s++) {
                    this.tempShipping.name.push(shipping[s].s_type);
                    this.tempShipping.price[shipping[s].s_type - 1] = shipping[s].s_value;
                }
            },
            // 初始化配送方式
            initLogisticsTime() {
                // d_time
                const d_time = this.goodsInfoData.d_time || {};
                const _val = d_time.d_time_value;
                this.tempLogistics.h_time = true;
                this.logistics.d_time_type = d_time.d_time_type;
                
                if (this.tempLogistics.h_time) {
                    switch (this.logistics.d_time_type) {
                        case 1: //周
                            this.tempLogistics.week = _val
                            break;
                        case 2: // 时段
                            if (_val[0] === 'all') {
                                this.tempLogistics.anyTime = true;
                            }
                            else {
                                this.tempLogistics.datePeriod1 = (new Date(_val[0]).getTime());
                                this.tempLogistics.datePeriod2 = (new Date(_val[1]).getTime());
                            }
                            break;
                        case 3: // 指定日期
                            for (var i = 0; i < _val.length; i++) {
                                this.tempLogistics.givenTime.push(new Date(_val[i]).getTime());
                            }
                            break;
                    }
                }
            },
            
            






            // uploadGoodsImg() {
            //     this.$refs.goodsImgBox.submit();
            // },
            // 删除图片
            handlePictureRemove(file, fileList) {
                // console.log(file, fileList);
            },
            // 上传图片
            handlePictureCardPreview(file) {
                this.preview_goods_img = file.url;
                this.goods.l_img_url.push(file.url);
                this.dialogVisible = true;
            },
            // 商品详情
            goodsInfoChanged(_content) {
                this.goods.p_desc = _content;
            },
            // 显示输入日期
            showInput() {
            	this.inputDateVisible = true;
            	// this.$nextTick(_ => {
            	// 	this.$refs.saveTagInput.$refs.input.focus();
            	// })
            },            
            
//          handleImageDrop(itemOne, itemTwo) {
//		        console.log('handleImageDrop', itemOne.getAttribute('data-index'), itemTwo.getAttribute('data-index'));
//		        this.loggedEvent = 'handleImageDrop';
//		        var dummy = this.images[itemOne.getAttribute('data-index')];
//		        this.images.$set(itemOne.getAttribute('data-index'), this.images[itemTwo.getAttribute('data-index')]);
//		        this.images.$set(itemTwo.getAttribute('data-index'), dummy);
//		    },
//		    handleDrag(elem) {
//		        // console.log('handleDrag', elem);
//		        this.loggedEvent = 'handleDrag';
//		    },
        },
        mounted() {
            this.goods_sn = this.$route.query.id;
            if (this.goods_sn) {
                // 加载属性
                this.onAddAttrList();
                // 加载商品详情
                this.getGoodsInfoMsg();
            }
            else {
                this.getGoodsSn();
                this.loadingEditor = true;
            }
            // if (this.goods_sn)
            // this.createEditor();
            // 加载标签
            this.getPcat();
        }
    }
</script>
