// 添加标签
<style scoped lang="less">
    ul,li{
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
    .add-goods-grout{
        .tool-bar{
            background: none;
        }
        .select-goods{
            padding:10px;
            min-width: 600px;
            display: flex;
            > div {
                margin-bottom: 15px;
            }
            .goods-tag{
                
            }
            .righ-area{
                // width: 60%;
                // min-width: 450px;
                // max-width: 800px;
                flex: 1;
                margin-left: 10px;
                .save-ope{
                    padding: 10px 0px;
                }
            }

            .goods-list{
                background: #f2f2f2;
                padding: 0 15px;
                li {
                    display: flex;
                    border-bottom: 1px solid #ccc;
                    line-height: 40px;
                    padding: 0px 10px;
                    .icon{
                        width: 30px;
                        i{
                            cursor: pointer;
                            &:hover{
                                color:red;
                            }
                            &:active{
                                color:#ccc;
                            }
                        }
                    }
                    // &:last-child{
                    //     border: none;
                    // }
                    .goods-title{
                        flex: 1;
                        min-width: 300px;
                    }
                    .goods-price{
                        width: 100px;
                        text-align: right;
                    }
                }
            }
        }
        .select-layout{
            .search-box{
                padding-bottom: 10px;
                .input{
                    width: 50%;
                }
            }
            .cell {
                padding: 10px;
                &,
                img{
                    width: 100%;
                }
                .price{
                    color:red;
                }
                button{
                    margin: 0px;
                }
                > .el-input-number{
                    width: auto;
                    padding-top:8px;
                }
            }
            .btn-add {
            	padding: 10px 0;
            	background: #E5E9F2;
            	margin-top: 10px;
            }
        }
    }
</style>
<template>
    <section class="add-goods-grout" v-loading="loadingLayout">
        <!--标签名称-->
		<el-col :span="24" class="toolbar tool-bar" style="padding-bottom: 0px;">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form :inline="true">
                        <el-form-item>
                            标签名称：
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="输入标签名" v-model="tagName"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
		</el-col>
        <!--添加商品-->
        <div class="select-goods">
            <div class="goods-tag">添加商品：</div>
            <div class="righ-area">
                <el-row v-loading="goodsLayoutLoad">
                    <div class="goods-list">
                        <ul>
                            <li v-for="(item, index) in selectGoods">
                                <div class="icon"><i class="el-icon-circle-close" @click="onRemoveSelectGoods(index)"></i></div>
                                <div class="goods-title">
                                    {{item.name}}
                                </div>
                                <div class="goods-price">￥{{item.s_price}}</div>
                            </li>
                        </ul>
                        <el-button type="text" @click="onAddSelectGoods">{{addContent}}</el-button>
                    </div>
                </el-row>
                <div class="save-ope">
                    <el-button type="primary" @click="onSave">保存</el-button>
                </div>
            </div>
        </div>
        <!--选择商品界面-->
        <el-dialog class="select-layout" size="large" title="选择商品" v-model="showSelectLayout">
            <div class="search-box">
                <el-input class="input" placeholder="输入你要搜索的商品" icon="search" :on-icon-click="onSearchGoods" v-model="searchKey"></el-input>
            </div>
            <el-table :data="searchResult" v-loading="searchLoading" @selection-change="onSelectGoods" v-model="tempSelectGoods">
                <el-table-column type="selection" width="55" v-model="tempSelectGoods"></el-table-column>
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
            <el-row class="btn-add">
            	<el-col :span="5" :offset="19">
            		你已选择 <b>{{selectQty}}</b> 款商品
            		<el-button type="primary" @click="onConfirmSelect()">确定添加</el-button>
            	</el-col>
            </el-row>
        </el-dialog>
    </section>
</template>
<script>
	import { addGoodsTag, getGoodsList, getGoodsTagDetail, editGoodsTag, delTagGoods } from 'api';
    export default {
        data(){
            return {
                group_id: null,
                loadingLayout: false,
                searchLoading: false,   // 搜索loading
                showSelectLayout: false,
                tagName: '',	// 标签名
                searchKey: '',	// 搜索关键词
                searchResult: [], // 搜索结果
                addContent: '+添加内容',
                selectGoods: [],    // 已经选择的商品
                tempSelectGoods: [],    // 临时选中的商品
                goodsLayoutLoad: false,

                multipleSelection: [],
                selectQty: 0,
            }
        },
        methods:{
            alertBox(res){
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },
            // 
            reSetData() {
                this.tagName = '';
                this.selectGoods = [];
                this.tempSelectGoods = [];
                this.searchResult = [];
                this.searchKey = '';
            },
            // 点击保存
            onSave() {
                if (!this.tagName) {
                    this.$message.error('标签名不能为空');
                    return;
                }
                let param = {
                    t_name: this.tagName,
                    goods: []
                }
                for(let i = 0; i < this.selectGoods.length; i++) {
                    if (this.selectGoods[i].old) continue;
            		param.goods.push(this.selectGoods[i].goods_sn);
            	}
                if (this.group_id) {
                    param.t_id = this.group_id;
                    this.editTag(param);
                }
                else {
                    this.addTag(param);
                }
            },
        	// 保存标签
            addTag(param){
                addGoodsTag(param).then(res => {
                	if(res.state != 0) {
                		this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定',
                        });
                        return;
                	}
                	this.reSetData();
                	this.$message({
                        showClose: true,
                        message: '保存成功！',
                        type: 'success'
                    });
                }, err => {
                	console.log('保存失败：', err);
                })
            },
            // 保存修改
            editTag(param) {
                editGoodsTag(param).then(res => {
                    if (!this.alertBox(res)) return;
                	this.$message({
                        showClose: true,
                        message: '操作成功',
                        type: 'success'
                    });
                },
                err => {
                });
            },
            // 获取标签详细
            readyGroutInfo() {
                if (!this.group_id) return;
                this.loadingLayout = true;
                getGoodsTagDetail({t_id: this.group_id}).then(res => {
                    this.loadingLayout = false;
                    if (!this.alertBox(res)) return;
                    this.tagName = res.data.tag_name;
                    for (var i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].old = true;
                    }
                    this.selectGoods = res.data.list;
                },
                err => {
                    this.loadingLayout = false;
                });
            },
            // 搜索商品
			onSearchGoods() {
        		let kw = this.searchKey;
        		if (!kw) {
                    this.$message.error('请输入搜索关键字');
                    return {}
                };
                this.searchLoading = true;
                getGoodsList({p_name: kw}).then(res => {
                    this.searchLoading = false;
                    this.searchResult = res.data.list;
                },
                err => {
                    this.searchLoading = false;
                });
        	},
            // 点击添加内容
            onAddSelectGoods() {
                this.showSelectLayout = true;
            },
        	// 确定选择商品
        	onConfirmSelect() {
                this.showSelectLayout = false;
                if (this.selectGoods.length === 0) {
                    this.selectGoods = this.tempSelectGoods;
                    return;
                }
                for(let t = 0; t < this.tempSelectGoods.length; t++) {
                    for (var i = 0; i < this.selectGoods.length; i++) {
                        if(this.tempSelectGoods[t].goods_sn === this.selectGoods[i].goods_sn) {
                            break;
                        }
                        else if (i === this.selectGoods.length - 1) {
                            this.selectGoods.push(this.tempSelectGoods[t]);
                            i++;
                        }
                    }
                }

        		// if(this.tempSelectGoods.length > 0) {
        		// }
                // else {
        		// 	this.$alert('提示：请选择商品', {
                //         confirmButtonText: '确定',
                //     });
                //     return;
        		// }
        	},
            // 删除选择的商品
            _removeSelectGoods(index) {
                const item = this.selectGoods[index];
                this.selectGoods.splice(index, 1);
                for (var i = 0; i < this.tempSelectGoods.length; i++) {
                    if (this.tempSelectGoods[i].goods_sn === item.goods_sn) {
                        this.tempSelectGoods.splice(i, 1);
                        return;
                    }
                }
                this.goodsLayoutLoad = false;
            },
        	onRemoveSelectGoods(index) {
                this.goodsLayoutLoad = true;
                const item = this.selectGoods[index];
                if (item.old) {
                    delTagGoods({
                        t_id: this.group_id,
                        g_sn: item.goods_sn
                    }).then(res => {
                        this._removeSelectGoods(index);
                    },
                    err => {
                        this.goodsLayoutLoad = false;
                        this.$message.error('删除失败');
                    });
                }
                else {
                    this._removeSelectGoods(index);
                }
        		// for(let i = 0; i < this.selectGoods.length; i++) {
        		// 	if(this.selectGoods[i].id === id) {
        		// 		this.searchResult.push(this.selectGoods[i]);
        		// 		this.selectGoods.splice(i,1);
        		// 	}
        		// }
        	},



            // 选择商品
            onSelectGoods(val) {
            	this.multipleSelection = val;
            	this.selectQty = this.multipleSelection.length;
            	this.tempSelectGoods = this.multipleSelection;
            },

        	
        },
        mounted() {
            if (this.$route.query.id) {
                this.group_id = this.$route.query.id;
                this.readyGroutInfo();
            }
        }
    }
</script>