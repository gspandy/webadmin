
<style lang="less">
    .goods-info-page {
        padding-top: 20px;
        min-width: 900px;
        .goods-data {
            display: flex;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .left-img {
                width: 380px;
                border-right: 1px solid #ccc;
                padding: 20px 0px;
                img {
                    width: 100%;
                    height: 100%
                }
                .big-img {
                    width: 90%;
                    img {
                        width: 360px;
                        height: 240px;
                    }
                }
                .min-img{
                    overflow: hidden;
                    padding: 20px 0;
                    width: 360px;
                    height:80px;
                    position: relative;
                    .slide{
                        margin: 0 auto;
                        transition: all .5s;
                        overflow: hidden;
                        div {
                            width: 80px;
                            height: 80px;
                            margin-right: 13px;
                            float: left;
                            cursor: pointer;
                            position: relative;
                            box-sizing: border-box;
                            &:last-child {
                                margin-right: 0;
                            }
                            &:before {
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                top: 0;
                                left: 0;
                                background: rgba(112,112,112,.8);
                                display: block;
                                content: '';
                            }
                            &.active {
                                border: 1px solid #bad55b;
                                &:before {
                                    display: none!important;
                                }
                            }
                        }
                    }
                    .right, 
                    .left {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                        display: inline-block;
                        width:20px;
                        height: 80px;
                        line-height: 80px;
                        text-align: center;
                        background: rgba(0,0,0,.2);
                        transition: all .3s;
                        color: #FFFFFF;
                        &:hover {
                            background: rgba(0,0,0,.5);
                        }
                    }
                    .right {
                        right: 0
                    }
                    .left {
                        left: 0
                    }
                }
            }
            .right-attr{
                width:380px;
                padding: 0px 20px;
                .goods-ratio {
                    width:360px;
                    > p {
                        display: flex;
                        font-size: 16px;
                        justify-content: space-between;
                    }
                    .red {
                        color: red;
                    }
                }
                .goods-title{
                    font-size: 20px;
                    font-weight: 800;
                }
            }
        }
        .goods-info-area{
            margin-top: 30px;
            * {
                max-width: 760px;
            }
        }
    }
    [v-cloak] {
        display: none;
    }
</style>

<template>
    <section class="goods-info-page">
        <div class="goods-data">
            <div class="left-img" v-if="imgArr.length > 0">
                <div class="big-img">
                    <img :src="imgArr[hoverIndex].url" />
                </div>
                <div class="min-img">
                    <div class="slide" :style="{width: slideWidth + 'px', transform: 'translateX('+ (-93 * myIndex) + 'px)'}">
                        <div v-for="(item, index) in imgArr" @mouseover="getHoverIndex(index)" :class="{'active' : hoverIndex === index}">
                            <img :src="item.url" />
                        </div>
                    </div>
                    <i class="el-icon-arrow-left left" @click="prev"></i>
                    <i class="el-icon-arrow-right right" @click="next"></i>
                </div>
            </div>
            <div class="right-attr" v-if="goodDetail">
                <p class="goods-title">{{goodDetail.goods_name}}</p>
                <div class="goods-ratio">
                    <p>
                        <span>利润比：</span>
                        <span class="red">{{goodDetail.goods_ratio_min}}% ~ {{goodDetail.goods_ratio_max}}%</span>
                    </p>
                    <p>
                        <span>成本价：</span>
                        <span>￥{{goodDetail.a_price}}</span>
                    </p>
                    <p>
                        <span>建议零售价：</span>
                        <span>￥{{goodDetail.m_price}} ~ ￥{{goodDetail.o_price}}</span>
                    </p>
                    <p>
                        <span>销量：</span>
                        <span>{{goodDetail.sales_number}}</span>
                    </p>
                    <p>
                        <span>库存：</span>
                        <span>{{goodDetail.invent}}</span>
                    </p>
                </div>
                <div class="">
                    <el-button type="primary" v-if="goodDetail.had_add === 0" @click="addToStore(goodDetail.goods_sn)">添加到仓库</el-button>
                    <el-button type="primary" v-if="goodDetail.had_add === 1" @click="addToStore(goodDetail.goods_sn)" disabled>已添加到仓库</el-button>
                </div>
            </div>
        </div>
        <div class="goods-info-area">
            <h3>商品详情：</h3>
            <div v-if="goodDetail" v-html="goodDetail.desc">
                
            </div>
        </div>
    </section>
</template>

<script>
    import {getDistributionDetail, checkDistributionGoods, relateDistributionGoods} from 'api'
    export default {
        data() {
            return {
                slideWidth: null,
                imgArr: [],
                goodDetail: {},
                myIndex: 0,
                bigImg: 0,
                hoverIndex: 0,
            }
        },
        created() {
            const _goodSn = this.$route.query.goodsn;
            this.getDetail(_goodSn);          
        },
        methods: {
            getDetail(_goodSn) {
                getDistributionDetail({
                    g_sn: _goodSn
                })
                .then((result) => {
                    console.log(result)
                    this.goodDetail = result.data;
                    this.imgArr = result.data.img;
                    this.slideWidth = (93 * this.imgArr.length);
                })
            },
            next() {
                if (this.imgArr.length <= 4) return ;
                if ((this.slideWidth - (4 * 93)) == Math.abs(-93 * this.myIndex)) return;
                this.myIndex++;
            },
            prev() {
                if (this.myIndex == 0) return;
                this.myIndex--;
            },
            getHoverIndex(_index) {
                this.hoverIndex = _index;
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
                    this.$message({
                            message: '添加成功',
                            type: 'success'
                    });
                    console.log('relateGoods', result);
                })
            }
        }
    }
</script>