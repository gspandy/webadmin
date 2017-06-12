
<style lang="less">
	@import '~less_defined';
    // .icon {
    //     display: inline-block;
    //     width: 1em;
    //     height: 1em;
    //     stroke-width: 0;
    //     stroke: currentColor;
    //     fill: currentColor;
    // }
    .ratail-page{
        ul,li{
            list-style: none;
        }
        .goods-area {
            .goods-list{
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 200px;
                    margin-right: 15px;
                    margin-bottom: 15px;
                    border: 1px solid @iconGray;
                    position: relative;
                    .icon {
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &.active:hover {
                        .cost-price,
                        .goods-title,{
                            display: none;
                        }
                        .btn-box {
                            display: block
                        }
                    }
                    .goods-content{
                        padding: 10px;
                    }
                    img {
                        width: 180px;
                        height: 180px
                    }
                    .cost-price,
                    .goods-title{
                        margin-top: 10px;
                    }
                    .goods-title {
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .btn-box{
                        position:absolute;
                        top: 0;
                        left: 0;
                        overflow: hidden;
                        transition: all .2s;
                        width: 100%;
                        height:100%;
                        text-align: center;
                        color: #FFFFFF;
                        background: rgba(0,0,0,.5);
                        display: none;
                        cursor: pointer;
                        .btn-box-info {
                            margin-top: 200px;
                            margin-bottom: 10px;
                        }
                        span{
                            display: block;
                            margin: 0 auto;
                            width: 180px;
                            height: 36px;
                            line-height: 36px;
                            background: #20a0ff;
                            border-radius: 3px;
                        }
                        .disabled {
                            background: rgba(0,0,0,.5);
                            cursor: not-allowed;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <section class="ratail-page">
        <!--工具条-->
        <el-form :class="'head-input'" :model="form" label-width="80px" style="margin:20px 0 20px 20px;width:95%;min-width:900px;">
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="筛选：">
                        <el-select placeholder="选择类型" v-model="type">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="利润比：">
                        <el-select placeholder="选择" v-model="profix">
                            <el-option label="高于" value="shanghai"></el-option>
                            <el-option label="低于" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-input placeholder="0%"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="总销量：">
                        <el-select placeholder="选择"  v-model="profix">
                            <el-option label="高于" value="shanghai"></el-option>
                            <el-option label="低于" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-input placeholder="0"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="关键字">
                        <el-input placeholder="输入关键字"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary">确定筛选</el-button>
                </el-col>
            </el-row>
        </el-form>
        <!--商品列表-->
        <div class="goods-area">
            <div>
                <ul class="goods-list">
                    <li v-for="(item,index) in itemData" key="item.goods_sn" @mouseover="getListIndex(index)" @click.stop="goDetail(item.goods_sn)" :class="{'active' : listIndex == index}">
                        <div class="icon" v-if="item.had_add === 1">
                            <img src="../../assets/select.png" />
                        </div>
                        <div class="goods-content">
                            <div>
                                <img :src="item.goods_img" />
                            </div>
                            <!--<div class="icon">
                                <svg style="position: absolute; width: 1em; height: 1em; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <defs>
                                        <symbol id="icon-checkmark" viewBox="0 0 32 32">
                                            <title>checkmark</title>
                                            <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
                                        </symbol>
                                    </defs>
                                </svg>
                            </div>-->
                            <div class="hy-line-2 goods-title">
                                {{item.goods_name}}
                            </div>
                            <div class="cost-price">
                                <p class="pd0">成本价：￥{{item.base_price}}</p>
                                <p class="pd0">利润比：{{item.goods_ratio_min}}% ~ {{item.goods_ratio_max}}%</p>
                            </div>
                            <div class="btn-box">
                                <div class="btn-box-info">
                                    <p class="pd0">成本价：￥{{item.base_price}}</p>
                                    <p class="pd0">利润比：{{item.goods_ratio_min}}% ~ {{item.goods_ratio_max}}%</p>
                                </div>
                                <span type="primary" v-if="item.had_add === 0" @click.stop="addToStore(item.goods_sn)">添加到仓库</span>
                                <span class="disabled" v-if="item.had_add === 1" @click.stop="banClick">已添加到仓库</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--<el-row :gutter="10">
                <el-col :span="5">
                    <div>
                    </div>
                </el-col>
            </el-row>-->
        </div>
    </section>

</template>

<script>
    import {getDistributionList, checkDistributionGoods, relateDistributionGoods} from 'api';
	export default {
		data() {
			return {
                itemData: [],
                form: {

                },
                listIndex: null,
                profix: '',
                type: ''
            }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            banClick() {},
            getGoodsList() {
                getDistributionList({})
                .then((result) => {
                    console.log(result);
                    this.itemData = result.data.list;
                });
            },
            goDetail(_goodSn) {
                this.$router.push(`/goods/goodsinfo?goodsn=${_goodSn}`);
            },
            addToStore(_goodSn) {
                this.checkGoods(_goodSn);
            },
            checkGoods(_goodSn) {
                checkDistributionGoods({
                    g_sn: _goodSn
                })
                .then(result => {
                    if (result.state === 1) {
                        this.$message({
                            message: result.msg,
                            type: 'warning'
                        });
                        return;
                    }
                    this.relateGoods(_goodSn);
                });
            },
            relateGoods(_goodSn) {
                relateDistributionGoods({
                    g_sn: _goodSn
                })
                .then(result => {
                    if (result.state === 1) {
                        this.$message({
                            message: result.msg,
                            type: 'warning'
                        });
                        return;
                    }
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.getGoodsList();
                    // console.log('relateGoods', result);
                })
            },
            getListIndex(_index) {
                this.listIndex = _index
            }
        }
    }
</script>