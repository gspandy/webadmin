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
        .last {
            margin-right: 20px;
            .last-hd {
                margin-bottom: 20px;
            }
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
                <el-form-item label="商品分类：">
                    <el-select v-model="goods.p_cat" placeholder="选择商品分类">
                        <el-option v-for="item in catsList" :label="item.cat_name" :key="item.cat_id" :value="item.cat_id"></el-option>
                    </el-select>
                </el-form-item>
                
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
                <el-form-item label="商品类型：">
                    <el-radio-group v-model="goods.p_type">
                        <el-radio :label="1">分销商品</el-radio>
                        <el-radio :label="2">半成品花材</el-radio>
                        <el-radio :label="3">商户发布</el-radio>
                    </el-radio-group>
                </el-form-item>
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
			                        <el-input placeholder="结算价：0" v-model="goods.p_a_price"></el-input>
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
                <el-form-item label="商品图片：">
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
                </el-form-item>
                <el-form-item label="商品简介：">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入商品简介" v-model="goods.p_intro">
                    </el-input>
                </el-form-item>
                <el-form-item label="商品详情：">
                    <wang-editor :init-content="goods.p_desc" @contentChanged="goodsInfoChanged" v-model="goods.p_desc"></wang-editor>
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
	                    <el-button icon="plus" @click="onAddAttrList">添加规格项目</el-button>
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
                    <el-table-column prop="a_price" label="结算价" width="110">
                        <template scope="scope">
                            <el-input v-model="scope.row.a_price"></el-input>
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
                            <el-checkbox :label="0">自取</el-checkbox>
                        </el-col>
                        <el-col :span="7">
                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox :label="1">花巴士</el-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <el-input placeholder="0" v-model="tempShipping.price[1]" size="small"></el-input>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="7">
                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox :label="2">其他快递</el-checkbox>
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
        <!--可销／其他-->
        <h3>可销／其他</h3>
        <hr />
        <el-row class="last">
            <el-col :span="24" class="last-hd">
                <el-radio-group v-model="radio1">
                    <el-radio :label="1">可售</el-radio>
                    <el-radio :label="2">停售</el-radio>
                    <el-radio :label="3" :disabled="true">审核中</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
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
                        <img :src="scope.row.img" />
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
    import wangEditor from '../../components/wangeditor.vue';
    import {getGoodsList, getGoodsTagList, adAddGoods, getGooesAttrList, adGetCatsList, getAdRecommendGoods} from 'api';
	export default {
        components:{
            wangEditor
        },
        data() {
            return {
            	loadingLayout: false,
            	searchLoading: false,
            	// 商品
        		goods: {
					p_name: '', // 商品名字，必要
					p_tags: [], // 商品分类，必要
                    p_cat: null,
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
					sns_attr: '',
					sns_val: '',
                    p_type: 1
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
                tempSelectTags: {
                    current: '',
                    tags: []
                },
                tagsList: [], // 商品标签
                catsList: [],   // 商品分类
                radio2: 1,
                radio1: 1,
                selectRecoGoods: [],    // 已选择的推荐商品
                tempSelectRecoGoods: [],    // 选中的推荐商品
                recoGoodsList: [],  // 搜索推荐商品结果列表
                selectGoodsLayout: false,   // 是否显示搜索推荐商品弹窗
                loadRecoGoods: false,       // 搜索商品弹窗loading
                searchKey: '',  // 搜索推荐商品关键字
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
                getGooesAttrList().then(res => {
                    if (!this.alertBox(res)) return;
                    this._addAttrItem();
                    const _data = res.data;
                    _data[0].list = [];
                    this.goodsAllAttrs = _data;
                    // for (var i = 0; i < _data.length; i++) {
                    //     this.goodsAllAttrs.push.apply(this.goodsAllAttrs, _data[i].list);
                    // }
                },
                err => {
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
                this.hasGoodsAttr[index].list = [];
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

            // 确定添加
            onOkAddGoods() {
                // 组织配送方式
                const shippingName = this.tempShipping.name;
                const shippingPrice = this.tempShipping.price;
                this.logistics.shipping_type = [];
                for (var i = 0; i < shippingName.length; i++) {
                    this.logistics.shipping_type.push({
                        s_type: shippingName[i],
                        s_value: shippingPrice[shippingName[i]]
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
                        this.goods.p_tags[i].splice(i, 1);
                    }
                }
            },
            // 添加推荐商品
            onAddRecommen() {
            	// this.loadingLayout = true;
                this.selectGoodsLayout = true;
                if (this.recoGoodsList.length > 0) return;
                this.loadRecoGodos = true;
            	getAdRecommendGoods().then(res => {
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
        	// 获取商品标签
        	getTagsList() {
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
            // 获取分类
            getCatsList() {
                adGetCatsList().then(res => {
                    if (!this.alertBox(res)) return;
                    this.catsList = res.data.data;
                },
                err => {
                });
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
                        a_price : 0,
                        s_inven : 0,
                        outer_sn : '',
                    });
                }
                // this.goodsAttrTable = _temp2;
                // console.log(this.goodsAttrTable);
            },
            // 添加商品
            releaseGoods(params) {
                if (!params.p_name) {
                    this.$message.error('商品名称不能为空');
                    return;
                }
                if (params.p_tags.length === 0) {
                    this.$message.error('请选择商品标签');
                    return;
                }
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
                params.p_sns = this.goodsAttrTable;
                adAddGoods(params).then(res => {
                    if (!this.alertBox(res)) return;
                    this.$message({
                        showClose: true,
                        message: '添加商品成功',
                        type: 'success'
                    });
                },
                err => {
                });
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








            uploadGoodsImg() {
                this.$refs.goodsImgBox.submit();
            },
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
            // 添加推荐
            addRecommend() {
            	this.loadingLayout = true;
            	getGoodsList().then(res => {
            		this.loadingLayout = false;
            		this.goods.p_recommend = res.data;
            	}, err => {
            		this.loadingLayout = false;
            		console.log('添加推荐失败',err);
            	})
            }
        },
        mounted() {
            // this.createEditor();
            this.getTagsList();
            this.getCatsList();
        }
    }
</script>
