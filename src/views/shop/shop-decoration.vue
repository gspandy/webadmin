
<template>
	<section class="shop-decoration" v-loading="loadLayout">
		<el-row>
			<!--左侧预览图-->
			<el-col :span="10" class="preview">
				<!--首页广告预览-->
				<el-row class="banner" v-if="banner.is_show === true">
					<el-col :span="24">
						<el-carousel trigger="click" height="150px">
							<el-carousel-item v-for="item in banner.data" :key="item">
								<div class="show-banner-img" :style="{backgroundImage:'url(' + item.base64 + ')'}">
								</div>
							</el-carousel-item>
						</el-carousel>
					</el-col>
				</el-row>
				<!--首页分类预览-->
				<el-row class="sort mBottom" v-if="grid.is_show === true">
					<div class="grid-bn-box"  v-if="grid.show_type === 2">
						<div :style="{width: ((grid.data.length * 147) + 'px')}">
							<div class="tag-item" v-for="item in grid.data" :key="item.id">
								<div class="tag-img">
									<img v-if="item.base64 !== undefined" :src="item.base64"/>
								</div>
							</div>
						</div>
					</div>
					<el-col :span="24" v-else="">
						<!--首页分类九宫格预览-->
						<!--<div style="height: 50px;"></div>-->
						<div class="sort-ninebox">
							<el-row class="sort-ninebox-a">
								<el-col :span="8" v-for="item in grid.data" :key="item.id">
									<div class="tag-img">
										<img v-if="item.base64 !== undefined" :src="item.base64"/>
									</div>
									<div class="hy-line-1">{{item.title}}</div>
								</el-col>
							</el-row>
							<!--<el-row class="sort-ninebox-a" v-if="sortQty === '3' || '6' || '9'">
								<el-col :span="8">
									<img src="static/4.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/5.jpg"/>
									<div>订阅花</div>
								</el-col>
								<el-col :span="8">
									<img src="static/6.jpg"/>
									<div>屏展特卖</div>
								</el-col>
							</el-row>
							<el-row class="sort-ninebox-b" v-if="sortQty != '3'">
								<el-col :span="8">
									<img src="static/7.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/8.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/9.jpg"/>
									<div>屏展特卖</div>
								</el-col>
							</el-row>
							<el-row class="sort-ninebox-c" v-if="sortQty === '9'">
								<el-col :span="8">
									<img src="static/10.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/11.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/12.jpg"/>
									<div>屏展特卖</div>
								</el-col>
							</el-row>-->
						</div>
						<!--首页分类通栏侧滑预览-->
						<!--<div class="sort-slide" v-if="grid.show_type === 2">
							<el-row class="sort-slide-a" v-if="sortQty === '3'">
								<el-col :span="8">
									<img src="static/4.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/5.jpg"/>
									<div>订阅花</div>
								</el-col>
								<el-col :span="8">
									<img src="static/6.jpg"/>
									<div>屏展特卖</div>
								</el-col>
							</el-row>
							<el-row class="sort-slide-b" v-if="sortQty === '6'">
								<el-col :span="8">
									<img src="static/7.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/8.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/9.jpg"/>
									<div>屏展特卖</div>
								</el-col>
							</el-row>
							<el-row class="sort-slide-c" v-if="sortQty === '9'">
								<el-col :span="8">
									<img src="static/10.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/11.jpg"/>
									<div>屏展特卖</div>
								</el-col>
								<el-col :span="8">
									<img src="static/12.jpg"/>
									<div>屏展特卖</div>
								</el-col>
							</el-row>
						</div>-->
					</el-col>
				</el-row>
				<!--限时团购预览-->
				<!--<el-row class="group mBottom" v-if="checkGroup === true">
					<el-col :span="24">
						<img src="static/2.jpg"/>
					</el-col>
				</el-row>-->
				<!--专题活动预览-->
				<el-row class="activity mBottom" v-if="checkActivity === true">
					<el-col :span="24" v-for="item in promotion.data" :key="item">
						<div class="pt-title">{{item.title}}</div>
						<img :src="item.base64"/>
					</el-col>
				</el-row>
				<!--商品推荐预览-->
				<el-row class="recommend" :gutter="5" v-if="recommend.is_show === true">
					<!--通栏瀑布流预览-->
					<div class="recommend-data-list">
						<el-col v-for="(item, index) in recommend.data" :key="item.id" :span="recommend.show_type === 1 ? 24 : 12">
							<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
								<!--<img :src="item.img"/>-->
							</div>
						</el-col>
					</div>
					<!--分栏两商品预览-->
					<!--<div class="recommend-2" v-else="">
						<el-col :span="12">
							<img src="static/13.jpg"/>
						</el-col>
						<el-col :span="12">
							<img src="static/14.jpg"/>
						</el-col>
					</div>-->
				</el-row>
			</el-col>
			<!--右侧管理详情-->
			<el-col :span="13" :offset="1" class="select">
				<!--广告管理-->
				<div class="banner-manage">
					<el-row>Banner广告管理 <span class="suggest">（建议图片尺寸：750X300 像素）</span></el-row>
					<i class="el-icon-caret-left director"></i>
					<el-row class="banner control">
						<el-col :span="24">
							<el-form :inline="true">
								<el-form-item label="是否开启：">
									<el-checkbox v-model="banner.is_show">开启</el-checkbox>
								</el-form-item>
								<br />
								<template v-for="(item, index) in banner.data">
									<div>
										<el-form-item>
											<i @click="onRmBannerItem('banner', index)" class="rm-edit-item el-icon-circle-close"></i>
											<img-upload @imgChange="onBnImgChange" :index="index" list-type="min-view"></img-upload>
											<el-select v-model="item.type" size="small" @change="onBnTypeChange('banner', index)">
												<el-option v-for="sItem in options" :label="sItem.label" :key="sItem.value" :value="sItem.value"></el-option>
											</el-select>
											<span>选择：</span>
											<i @click="onSelectBnTypeVal('banner', index)" v-if="!item.name" class="el-icon-plus icon add-relation-icon"></i>
											<!--<span>|</span>-->
											<template v-else="">
												<i @click="onBnItemGoods('banner', index)" class="el-icon-minus icon add-relation-icon"></i>
												<span>{{item.name}}</span>
											</template>
										</el-form-item>
									</div>
								</template>

								<div class="add-config-box">
									<div @click="onAddBannerItem('banner')">
										<i class="el-icon-plus"></i> 添加banner
									</div>
								</div>
							</el-form>
						</el-col>
					</el-row>
				</div>
				<!--分类管理-->
				<div class="sort-manage">
					<el-row>首页分类 <span class="suggest">（建议图片尺寸：九宫格式：80X80 像素，通栏侧滑：207X287 像素）</span></el-row>
					<i class="el-icon-caret-left director"></i>
					<el-row class="sort control">
						<el-col :span="24">
							<el-form :inline="true">
								<el-form-item label="是否开启：">
									<el-checkbox v-model="grid.is_show">开启</el-checkbox>
								</el-form-item>
								<br />
								<el-form-item label="分类数量：">
									<el-radio-group @change="onGridCountChange" v-model="grid.count">
										<el-radio class="radio" :label="3">3</el-radio>
										<el-radio class="radio" :label="6">6</el-radio>
										<el-radio class="radio" :label="9">9</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="分类版式：">
									<el-radio v-model="grid.show_type" :label="1">九宫格式</el-radio>
									<el-radio v-model="grid.show_type" :label="2">通栏侧滑</el-radio>
								</el-form-item>
								<br />
								<template v-for="(item, index) in grid.data">
									<el-form-item>
										<span>{{ (index + 1) }}</span>
										<img-upload @imgChange="onGridImgChange" :index="index" list-type="min-view"></img-upload>
										<el-input placeholder="输入分类名称" v-model="item.title" size="small"></el-input>
										<el-select v-model="item.type" size="small" @change="onBnTypeChange('grid', index)">
											<el-option v-for="sItem in options" :label="sItem.label" :key="sItem.value" :value="sItem.value"></el-option>
										</el-select>
										<span>选择：</span>
										<i @click="onSelectBnTypeVal('grid', index)" v-if="!item.name" class="el-icon-plus icon add-relation-icon"></i>
										<!--<span>|</span>-->
										<template v-else="">
											<i @click="onBnItemGoods('grid', index)" class="el-icon-minus icon add-relation-icon"></i>
											<span>{{item.name}}</span>
										</template>

									</el-form-item>
								</template>
								<br />
								
							</el-form>
						</el-col>
					</el-row>
				</div>
				<!--限时团购管理-->
				<!--<div class="group-manage">
					<el-row>限时团购管理 <span class="suggest">（建议图片尺寸：750X500 像素）</span></el-row>
					<i class="el-icon-caret-left director"></i>
					<el-row class="group control">
						<el-col :span="24">
							<el-form :inline="true">
								<el-form-item label="是否开启：">
									<el-checkbox v-model="checkGroup">开启</el-checkbox>
								</el-form-item>
								<br />
								<el-form-item>
									<el-upload action="https://jsonplaceholder.typicode.com/posts/" class="banner img-uploader">
										<img v-if="groupUrl" :src="groupUrl" class="img-group img"/>
										<i v-else class="el-icon-upload2 uploader-icon"></i>
									</el-upload>
									<span>选择团购活动：</span>
									<i class="el-icon-plus icon"></i>
									<span>|</span>
									<i class="el-icon-minus icon"></i>
									<span>花艺师阳光套餐</span>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</div>-->
				<!--专题活动管理-->
				<div class="activity-manage">
					<el-row>专题活动管理 <span class="suggest">（建议图片尺寸：750X500 像素）</span></el-row>
					<i class="el-icon-caret-left director"></i>
					<el-row class="activity control">
						<el-col :span="24">
							<el-form :inline="true">
								<el-form-item label="是否开启：">
									<el-checkbox v-model="checkActivity">开启</el-checkbox>
								</el-form-item>
								<br />
								<!--<el-form-item>
									<el-upload action="https://jsonplaceholder.typicode.com/posts/" class="banner img-uploader">
										<img v-if="activityUrl" :src="activityUrl" class="img-activity img"/>
										<i v-else class="el-icon-upload2 uploader-icon"></i>
									</el-upload>
									<span>选择商品标签：</span>
									<i class="el-icon-plus icon"></i>
									<span>|</span>
									<i class="el-icon-minus icon"></i>
									<span>桌面绿植</span>
								</el-form-item>-->
								<template v-for="(item, index) in promotion.data">
									<el-form-item>
										<i @click="onRmBannerItem('promotion', index)" class="rm-edit-item el-icon-circle-close"></i>
										<img-upload @imgChange="onPtImgChange" :index="index" list-type="min-view"></img-upload>
										<el-input placeholder="活动名称" v-model="item.title" size="small"></el-input>
										<el-select v-model="item.type" size="small" @change="onBnTypeChange('promotion', index)">
											<el-option v-for="sItem in options" :label="sItem.label" :key="sItem.value" :value="sItem.value"></el-option>
										</el-select>
										<span>选择：</span>
										<i @click="onSelectBnTypeVal('promotion', index)" v-if="!item.name" class="el-icon-plus icon add-relation-icon"></i>
										<!--<span>|</span>-->
										<template v-else="">
											<i @click="onBnItemGoods('promotion', index)" class="el-icon-minus icon add-relation-icon"></i>
											<span>{{item.name}}</span>
										</template>

									</el-form-item>
								</template>
								<div class="add-config-box">
									<div @click="onAddBtItem('promotion')">
										<i class="el-icon-plus"></i> 添加专题活动
									</div>
								</div>
							</el-form>
						</el-col>
					</el-row>
				</div>
				<!--商品推荐-->
				<div class="recommend-manage">
					<el-row>商品推荐 <span class="suggest">（建议图片尺寸：通栏瀑布流：750X500 像素，分栏两商品：360X240 像素）</span></el-row>
					<i class="el-icon-caret-left director"></i>
					<el-row class="recommend control">
						<el-col :span="24">
							<el-form :inline="true">
								<el-form-item label="是否开启：">
									<el-checkbox v-model="recommend.is_show">开启</el-checkbox>
								</el-form-item>
								<br />
								<el-form-item label="展示版式：">
									<el-radio v-model="recommend.show_type" :label="1">通栏瀑布流</el-radio>
									<el-radio v-model="recommend.show_type" :label="2">分栏两商品</el-radio>
								</el-form-item>
								<div style="padding-bottom: 15px;">
									<el-form-item label="选择商品：">
										<i @click = "onAddRecommendGoods" class="el-icon-plus icon add-relation-icon"></i>
									</el-form-item>
									<div style="padding-left: 82px;" v-for="(item, index) in recommend.data" :key="item.id">
										<i @click="onRmRecommend(index)" class="el-icon-minus icon add-relation-icon"></i>
										<span>{{item.name}}</span>
									</div>
								</div>
							</el-form>
						</el-col>
					</el-row>
				</div>
				<div class="save-btn">
					<el-button type="primary" @click="onSaveSetData">保存设置</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 选择商品 -->
        <el-dialog title="选择商品" size="large" v-model="selectGoodsDialog">
            <div class="search-box">
                <el-input class="input" placeholder="输入你要搜索的商品" icon="search" :on-icon-click="onSearchGoods" v-model="searchGoodsKey"></el-input>
            </div>

            <el-table ref="reco-goods-list" @selection-change="onRecoGoodsChange" :data="searchGoodsResult" highlight-current-row style="width: 100%;">
				<el-table-column class-name="select-label" type="selection" width="55"></el-table-column>
                <el-table-column class-name="search-goods-img" width="100">
                    <template scope="scope">
						<div class="goods-img" :style="{backgroundImage: 'url(' + scope.row.logo_url + ')'}">
                        	<!--<img :src="" />-->
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
                <!--<el-table-column label="操作" width="50">
					<template scope="scope">
						<el-button>选择</el-button>
					</template>					
                </el-table-column>-->
            </el-table>
            <div class="btn-box">
                <el-button type="primary" @click="onConfirmSelectGoods()">确定添加</el-button>
            </div>
        </el-dialog>

		<!-- 选择标签 -->
        <el-dialog title="选择标签" size="large" v-model="selectTagDialog">
			<el-table ref="reco-tag-list" @selection-change="onSelectTagChange" :data="tagListData" highlight-current-row style="width: 100%;">
				<el-table-column class-name="select-label" type="selection" width="55"></el-table-column>
                <el-table-column prop="tag_name" label="标签名称" min-width="100" sortable>
                </el-table-column>
                <el-table-column prop="count" label="商品数量" width="200" sortable>
                </el-table-column>
                </el-table-column>
			</el-table>
            <div class="btn-box">
                <el-button type="primary" @click="onConfirmSelectTag()">确定添加</el-button>
            </div>
        </el-dialog>
	</section>
</template>

<script>
	import imgUpload from '../../components/upload-img.vue';
	import { isFunction } from '../../common/js/util.js';
	import {
        getGoodsList,
		getGoodsTagList,
		shopDecorationUpload,
		getDecorationData,
		saveDecorationData
    } from 'api';
	import { mapGetters } from 'vuex';
	export default {
		components: {
			imgUpload
		},
		data() {
			return {
				loadLayout: false,
				init: false,
				banner: {
					is_show: true,
					// data: [{
					// 	img_file: null,	// 选择的图片
					// 	base64: '',	// 图片base64
					// 	img: '',	// 图片短链接
					// 	type: 1,	// 类型。1：链接到标签，2：链接到商品
					// 	id: '',
					// 	name: ''
					// }]
					data: []
				},
				grid: {
					is_show: true,
					show_type: 1,
					count: 3,
					data: []
				},
				promotion: {
					is_show: true,
					data:[]
				},
				recommend: {
					is_show: true,
					show_type: 1,
					data: []
				},

				loadDialogStatus: false,	// 
				searchGoodsKey: '', 	// 搜索商品关键字
				searchGoodsResult: [],	// 搜索商品的结果
				options: [
				{
					value: 1,
					label: '链接到标签'
				}, 
				{
					value: 2,
					label: '链接到商品'
				}],
				selectGoodsDialog: false,	// 是否显示商品选中弹窗
				selectGoodsInfo: null,	// 选中的商品
				selectHostItem: null,	// 接受商品或标签选择结果的项目
				selectTagDialog: false,	// 是否显示标签选择窗口
				tempSelectTag: null,
				tagListData: [],




				checkBanner: true,
				checkSort: true,
				checkGroup: true,
				checkActivity: true,
				checkRecommend: true,
				bannerUrl: '',
				sortUrl: '',
				groupUrl: '',
				activityUrl: '',
				linkToWhereA: '链接到标签',
				linkToWhereB: '链接到标签',
				linkToWhereC: '链接到标签',
				linkToWhereD: '链接到标签',
				linkToWhereE: '链接到标签',
				sortQty: '3',
				sortStyle: '九宫格式',
				recommendStyle: '瀑布流',
			};
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
			// 选择banner图片
			onBnImgChange(img, index) {
				// console.log(arguments);
				this.banner.data[index].img_file = img;
				this.onloadImgFile(this.banner.data[index]);
			},
			// 九宫格图片
			onGridImgChange(img, index) {
				this.grid.data[index].img_file = img;
				this.onloadImgFile(this.grid.data[index]);
			},
			// 专题活动图片
			onPtImgChange(img, index) {
				this.promotion.data[index].img_file = img;
				this.onloadImgFile(this.promotion.data[index]);
			},
			// 点击添加banner
			onAddBannerItem(type) {
				if (type === 'banner' && this[type].data.length >= 10) {
					this.$alert('最多只能添加10个banner广告哦', '提示', {
                        confirmButtonText:'知道了'
					});
					return;
				}
				if (type === 'promotion' && this[type].data.length >= 3) {
					this.$alert('最多只能添加3个专题活动哦', '提示', {
                        confirmButtonText:'知道了'
					});
					return;
				}
				this[type].data.push({
					img_file: null,	// 选择的图片
					base64:	'',	// 图片base64
					img: '',	// 图片短链接
					type: 1,	// 类型。1：链接到标签，2：链接到商品
					id: '',
					name: ''
				});
			},
			// 添加专题活动项
			onAddBtItem(type) {
				if (type === 'promotion' && this[type].data.length >= 3) {
					this.$alert('最多只能添加3个专题活动哦', '提示', {
                        confirmButtonText:'知道了'
					});
					return;
				}
				this[type].data.push({
					img_file: null,	// 选择的图片
					base64:	'',	// 图片base64
					title: '',	// 活动名称
					img: '',	// 图片短链接
					type: 1,	// 类型。1：链接到标签，2：链接到商品
					id: '',
					name: ''
				});
			},
			// 移除banner项
			onRmBannerItem(type, index) {
				this[type].data.splice(index, 1);
			},
			// 选择类型发生变化
			onBnTypeChange(type, index) {
				if (!this.init) return;
				this[type].data[index].id = '';
				this[type].data[index].name = '';
			},
			// 添加选择类型的值
			onSelectBnTypeVal(type, index) {
				this.selectHostItem = this[type].data[index];
				if (this.selectHostItem.type === 2) {
					if (this.searchGoodsResult.length > 0) {
						this.$refs['reco-goods-list'].clearSelection();
					}
					this.selectGoodsDialog = true;
				}
				else if (this.selectHostItem.type === 1) {
					this.showTagDialog();
				}
			},
			// 添加推荐商品
			onAddRecommendGoods() {
				if (this.searchGoodsResult.length > 0) {
					this.$refs['reco-goods-list'].clearSelection();
				}
				this.selectGoodsDialog = true;
				this.selectHostItem = (data) => {
					this.recommend.data.push({
						type: 2,
						id: data.goods_sn,
						name: data.name,
						goods_img: data.logo_url
					});
				}
			},
			// 移除选择类型的值
			onBnItemGoods(type, index) {
				const _data = this[type].data[index];
				_data.id = '';
				_data.name = '';
			},
			// 移除推荐商品
			onRmRecommend(index) {
				this.recommend.data.splice(index,1);
			},
			// 搜索商品
			onSearchGoods() {
				this.loadDialogStatus = true;
				getGoodsList().then(res => {
					this.loadDialogStatus = false;
					if (!this.alertBox(res)) return;
					// console.log(res);
					this.searchGoodsResult = res.data.list;
				},
				err => {
					this.loadDialogStatus = false;
				});
			},
			// 选择商品触发
			onRecoGoodsChange(item) {
				// console.log(this.selectGoodsInfo);
				// console.log(item[0].goods_sn);
				const _item = item[item.length -1];
				if ((!_item) || (this.selectGoodsInfo !== null && this.selectGoodsInfo.goods_sn === _item.goods_sn)) return;
				this.selectGoodsInfo = _item;
				this.$refs['reco-goods-list'].clearSelection();
				this.$refs['reco-goods-list'].toggleRowSelection(this.selectGoodsInfo);
			},
			// 确定选择商品
			onConfirmSelectGoods() {
				if (!this.selectGoodsInfo || !this.selectHostItem) return;
				this.selectGoodsDialog = false;
				if (isFunction(this.selectHostItem)) {
					this.selectHostItem(this.selectGoodsInfo);
					return;
				}
				this.selectHostItem.id = this.selectGoodsInfo.goods_sn;
				this.selectHostItem.name = this.selectGoodsInfo.name;
				this.selectGoodsInfo = null;
				this.selectHostItem = null;
			},
			// 确定选择标签
			onConfirmSelectTag() {
				if (!this.tempSelectTag || !this.selectHostItem) return;
				this.selectHostItem.id = this.tempSelectTag.tag_id;
				this.selectHostItem.name = this.tempSelectTag.tag_name;
				this.tempSelectTag = null;
				this.selectHostItem = null;
				this.selectTagDialog = false;
			},
			// 选择标签触发
			onSelectTagChange(data) {
				const _item = data[data.length - 1];
				if (!_item || (this.tempSelectTag && this.tempSelectTag.tag_id === _item.tag_id)) return;
				this.tempSelectTag = _item;
				this.$refs['reco-tag-list'].clearSelection();
				this.$refs['reco-tag-list'].toggleRowSelection(this.tempSelectTag);
			},
			// 加载图片
			onloadImgFile(obj) {
				const reader = new FileReader();
				reader.onload = function(evt) {
					obj.base64 = evt.target.result;
				}
				reader.readAsDataURL(obj.img_file);
			},
			// 九宫格数量变化
			onGridCountChange() {
				if (this.grid.count < this.grid.data.length) {
					this.grid.data.splice(this.grid.count, this.grid.data.length - this.grid.count);
					return;
				}
				for (var i = 0; i < this.grid.count; i++) {
					if (this.grid.data[i]) continue;
					this.grid.data.push({
						img_file: null,	// 选择的图片
						base64:	'',	// 图片base64
						img: '',	// 图片短链接
						type: 1,	// 类型。1：链接到标签，2：链接到商品
						title: ('项目' + (i + 1)),
						id: '',
						name: ''
					});
				}
			},
			checkSaveData(_tempData) {
				let _item = [];
				let msg = '请选择图片';
				let _type = "";
				for (var key in _tempData) {
					_item = _tempData[key].data;
					switch (key) {
						case 'banner':
							_type = 'banner广告';
							break;
						case 'grid':
							_type = '首页分类';
							break;
						case 'promotion':
							_type = '专题活动';
							break;
					}
					for (var i = 0; i < _item.length; i++) {
						if (_tempData[key].is_show && key !== 'recommend' && !_item[i].img_file && !_item[i].img) {
							this.$alert('请选择' + _type + '图', '提示：', {
								confirmButtonText: '确定'
							});
							return false;
						}
						if (_tempData[key].is_show && ('id' in _item[i]) && !_item[i].id) {
							this.$alert('' + _type + '中的标签或商品不能为空', '提示：', {
								confirmButtonText: '确定'
							});
							return false;
						}
						// if (_tempData[key].is_show && ('title' in _item[i]) && !_item[i].title) {
						// 	this.$alert('' + _type + '中的标题不能为空', '提示：', {
						// 		confirmButtonText: '确定'
						// 	});
						// 	return false;
						// }
					}
				}
				return true;
			},
			// 保存设置数据
			async onSaveSetData() {
				if (!this.init) {
					this.$alert('页面初始化失败！请刷新页面重新操作！', '提示：', {
						confirmButtonText: '确定'
					});
					return;
				}
				const _tempData = {
					banner: this.banner,
					grid: this.grid,
					promotion: this.promotion,
					recommend: this.recommend	
				};
				let _item = [];
				let _dataItem = {};
				let _img_type = '';
				const data = {};
				if (!this.checkSaveData(_tempData)) return;
				this.loadLayout = true;
				for (var key in _tempData) {
					_item = _tempData[key].data;
					data[key] = {}
					for (var _hs in _tempData[key]) {
						data[key][_hs] = _tempData[key][_hs];
					}
					data[key].data = [];
					switch (key) {
						case 'banner':
							_img_type = 'show_banner';
							break;
						case 'grid':
							_img_type = 'shop_icon';
							break;
						case 'promotion':
							_img_type = 'shop_activity';
							break;
					}
					for (var i = 0; i < _item.length; i++) {
						_dataItem = {
							type: _item[i].type,
							id: _item[i].id
						}
						if (_item[i].img_file) {
							var temp_res = await this.uploadImages(_item[i].img_file, _img_type);
							_item[i].img = temp_res.data.img;
							_dataItem.img = _item[i].img;
							_item[i].img_file = '';
						}
						else if (_item[i].img) {
							_dataItem.img = _item[i].img;
						}
						if ('title' in _item[i]) {
							_dataItem.title = _item[i].title;
						}
						data[key].data.push(_dataItem);
					}
				}
				saveDecorationData({data: data}).then(res => {
					this.loadLayout = false;
					if (!this.alertBox(res)) return;
					// console.log(res);
					this.getPageData();
				},
				err => {
					this.loadLayout = false;
				});
				// console.log(JSON.stringify(data));
			},
			// 上传商品图片
            uploadImages(img, img_type) {
                // uploadGoodsImg()
                return new Promise((resolve, reject) => {
                    var formdata = new FormData();
					formdata.append('shop_img', img);
					formdata.append('img_type', img_type);
					formdata.append('token', this.getLoginToken());
					shopDecorationUpload(formdata).then(res => {
						this.loadLayout = false;
						if (!this.alertBox(res)) {
							reject('上传图片失败！');
							return;
						};
						resolve(res);
					},
					err => {
						this.loadLayout = false;
                        this.$alert('上传图片失败！', '提示', {
                            confirmButtonText:'确定'
                        });
                        reject('上传图片失败！');
					});
                });
            },
			getPageData() {
				this.loadLayout = true;
				getDecorationData().then(res => {
					this.loadLayout = false;
					if (!this.alertBox(res)) {
						// this.onGridCountChange();
						return;
					};
					const _data = res.data.data;
					let _list = [];
					for (var key in _data) {
						_list = _data[key].data;
						for (var i = 0; i < _list.length; i++) {
							if ('img' in _list[i]) {
								_list[i].base64 = _list[i].img_url;
								delete _list[i].img_url;
								_list[i].img_file = '';
							}
							else if (key !== 'recommend') {
								_list[i].base64 = '';
							}
						}
						this[key] = _data[key];
						// console.log(this[key]);
					}
					if (this.grid.data.length == 0) {
						// console.log(1);
						// this.onGridCountChange();
					}
					setTimeout(() => {
						this.init = true;
					}, 500);
					// console.log(res);
				}, err => {
					this.loadLayout = false;
				});
			},

			// 显示标签选择窗口
			showTagDialog() {
				this.selectTagDialog = true;
				if (this.tagListData.length <= 0) {
					this.loadTagData();
				}
				else {
					this.$refs['reco-tag-list'].clearSelection();
				}
			},
			loadTagData() {
				this.loadDialogStatus = true;
				getGoodsTagList().then(res => {
					this.loadDialogStatus = false;
					if (!this.alertBox(res)) return;
					this.tagListData = res.data;
				},
				err => {
					this.loadDialogStatus = false;
				});
			},




			handleBannerSuccess(res, file) {
				this.bannerUrl = URL.createObjectURL(file.raw);
			},
			handleSortSuccess(res, file) {
				this.sortUrl = URL.createObjectURL(file.raw);
			},
			handleRemove(file) {
				console.log(file);
			},
		},
		mounted() {
			this.onGridCountChange();
			this.getPageData();
		}
	}


// {
// 	// banner
//     "banner": {
//         "is_show": true,
//         "data": [{	// 图片列表
//                 "type": 2,	// 1：标签，2：商品 （下同）
//                 "id": 15,	// 标签或者商品ID
//                 "img": ""	// 图片
//             }]
//     },
// 	// 九宫格
//     "grid": {
//         "is_show": true,
//         "show_type": 1,
//         "count": 3,
//         "data": [{
//                 "type": 1,
//                 "id": 16,
//                 "title": "项目1",
//                 "img": ""
//             }, {
//                 "type": 2,
//                 "id": 6012,
//                 "title": "项目2",
//                 "img": ""
//             }, {
//                 "type": 2,
//                 "id": 3010,
//                 "title": "项目3",
//                 "img": ""
//             }]
//     },
//     "promotion": {
//         "is_show": true,
//         "data": [{
//                 "type": 1,
//                 "id": 18,
//                 "title": "活动",
//                 "img": ""
//             }]
//     },
//     "recommend": {
//         "is_show": true,
//         "show_type": 1,
//         "data": [{
//                 "type": 2,
//                 "id": 6012,
//                 "img": "http://p1.flowerexpresses.com/pf/goods/6012/4030_360_360.jpg"
//             }, {
//                 "type": 2,
//                 "id": 8015,
//                 "img": "http://p1.flowerexpresses.com/pf/goods/8015/8037_360_360.png"
//             }]
//     }
// }
</script>

<style lang="less">
	.shop-decoration {
		@bgW: 750/1.7px;	/*满背景宽*/
		@bannerH: 300/1.7px;	/*广告图片高*/
		@sortLineWH: 750/1.7/3px;	/*分类正方框宽高*/
		@sortSlideImgW: 207/1.7px;	/*分类通栏侧滑图片宽*/
		@sortSlideImgH: 287/1.7px;	/*分类通栏侧滑图片高*/
		@groActRec1H: 500/1.7px;	/*团购,专题活动,推荐1, 图片高*/
		@recommend2ImgWH: 750/1.7/2px;	/*推荐2图片高*/
		@border: 1px solid #ccc;
		@color: #8c939d;
		width: 1200px;
		padding: 10px;
		margin-bottom: 10px;
		position: relative;

		.mBottom {
			margin-bottom: 10px;
		}
		/*左侧预览图*/
		.preview {
			// position: absolute;
			float: left;
			left: 0;
			width: 445px;
			border: #ccc solid 1px;
			img {
				vertical-align: top;
				box-sizing: border-box;
			}
			.banner, .group, .activity, .recommend-data-list {
				width: @bgW;
				// height: @bannerH;
				img {
					border: @border;
					width: @bgW;
					// height: @bannerH;
				} 
			}
			.banner {
				.show-banner-img{
					height: 100%;
					background-size: cover;
					background-position: center;
				}
			}
			.group, .activity, .recommend-data-list {
				// height: @groActRec1H;
				img {
					// height: @groActRec1H;
				}
			}
			.recommend-data-list {
				padding-left: 5px;
				box-sizing: border-box;
				> div {
					margin-bottom: 5px;
				}
				div {
					height: 100%;
					background-size: cover;
					background-position: center;
				}
			}
			.sort-ninebox {
				width: @bgW;
				height: auto;
				text-align: center;
				.tag-img,
				img {
					width: 80px;
					height: 80px;
					margin: auto;
				}
			}
			.sort-slide {
				width: @bgW;
				height: auto;
				text-align: center;
				img {
					width: @sortSlideImgW;
					height: @sortSlideImgH;
				}
			}
			.recommend {
				.recommend-2{
					width: @bgW;
					height: @recommend2ImgWH;
					border: @border;
					img {
						width: @recommend2ImgWH;
						height: @recommend2ImgWH;
						border-right: @border;
					}
				}
			}
			.sort-ninebox-a, .sort-ninebox-b, .sort-ninebox-c {
				height: @sortLineWH;
				border: @border;
				.el-col {
					border: @border;
					height: @sortLineWH;
					padding: 20px 0;
					div {
						margin-top: 6px;
					}
				}
			}
			.sort-slide-a, .sort-slide-b, .sort-slide-c {
				border: @border;
				.el-col {
					margin: 10px 0;
					position: relative;
					div {
						position: absolute;
						top: 0;
						left: 12px;
						color: #fff;
						background: rgba(0, 0, 0, .3);
						width: @sortSlideImgW;
						height: @sortSlideImgH;
						line-height: @sortSlideImgH;
					}
				}
			}
		}
		/*右侧管理详情*/
		.select {
			// position: absolute;
			float: left;
			right: 0;
			width: 700px;
			.suggest {
				color: @color;
			}
			.director {
				position:relative;
				left: -11px;
				top: 27px;
				color: @color;
			}
			.img-banner, .img-group {
				width: 60px;
				height: 30px;
			}
			.uploader-icon {
				width: 60px;
			}
			.control {
				border: @border;
				padding: 0 10px;
				.img-uploader {
					border: 1px dashed #d9d9d9;
					border-radius: 6px;
					cursor: pointer;
					position: relative;
					display: inline-block;
					line-height: 30px;
				}
				.img-uploader:hover {
					border-color: #20a0ff;
				}
				.el-input {
					width: 120px;
					.el-input__inner {
						height: 30px;
						line-height: 30px;
					}
				}
				.el-select {
					margin: 0 5px;
					width: 114px;
				}
				.el-form-item {
					margin-bottom: 5px;
				}
				.uploader-icon {
					color: @color;
					height: 30px;
					line-height: 30px;
					text-align: center;
				}
				.icon {
					color: @color;
					padding: 0 5px;
				}
			}
			.sort-manage {
				.img-sort {
					width: 30px;
				}
				.uploader-icon {
					width: 30px;
				}
			}
		}
		.add-config-box {
			// font-size: 13px;
			padding: 10px 0px;
			color: #0b6bff;
			> div {
				cursor: pointer;
				display: inline-block;
				&:hover {
					color: red;
				}
			}
		}
		.search-box {
            margin-bottom: 15px;
            width: 50%;
        }
		.btn-box {
            text-align: center;
            margin-top: 20px;
        }
		.add-relation-icon,
		.minus-relation-icon,
		.rm-edit-item {
			margin-right: 5px;
			cursor: pointer;
			&:hover {
				color: #20a0ff !important;
			}
		}
		.rm-edit-item {
			font-size: 20px;
		}
		.search-goods-img {
			.cell {
				padding: 0px;
			}
			.goods-img {
				width: 80px;
				height: 80px;
				margin: 10px;
				background-size: cover;
				background-position: center;
			}
		}
		th {
			&.select-label {
				.cell {
					display: none;
				}
			}
		}
		.pt-title {
			padding: 15px 5px 5px 5px;
		}
		.save-btn {
			padding: 30px;
			text-align: center;
		}
		.grid-bn-box {
			width: 100%;
			overflow-x: scroll;
			> div {
				.tag-item {
					display: inline-block;
					width: 130px;
					// height: 147px;
					padding: 20px 0;
					box-sizing: border-box;
					text-align: center;
					.tag-img {
						margin-bottom: 5px;
						img {
							width: 95%;
						}
					}
				}
			}
		}
	}
</style>