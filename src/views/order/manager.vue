<template>
    <section v-loading="loadingLayout">
        <el-row>

            <el-col :span="24" class="toolbar" v-if="orderData.trade_sn">
                <div class="steps" v-if="orderData.order_status == 2">
                    <el-steps :space="250" :active="stepState" finish-status="success">
                        <el-step title="买家下单" :description="orderData.create_time"></el-step>
                        <el-step title="买家付款" :description="orderData.pay_time"></el-step>
                        <el-step title="商家发货" :description="orderData.delivery_time"></el-step>
                        <el-step title="交易完成" :description="orderData.complete"></el-step>
                    </el-steps>
                </div>
                <div v-else>
                    <el-steps :space="250" :active="stepState" finish-status="success">
                        <el-step title="买家下单" :description="orderData.create_time"></el-step>
                        <el-step title="取消订单" description=""></el-step>
                    </el-steps>
                </div>
            </el-col>
            <el-col :span="24" class="orderpay-msg" v-if="orderData.trade_sn">
                <el-col :span="8" class="orderpay-left">
                    <el-col class="title">订单信息</el-col>
                    <el-col><span>订单号 : </span><label>{{orderData.trade_sn}}</label></el-col>
                    <el-col><span>订单类型 : </span><label></label></el-col>
                    <el-col><span>配送方式 : </span><label>{{orderData.shipping_name}}</label></el-col>
                    <el-col class="line"></el-col>
                    <el-col><span>收货人 : </span><label>{{orderData.consignee}}</label></el-col>
                    <el-col><span>电话 : </span><label>{{orderData.mobile}}</label></el-col>
                    <el-col><span>配送地址 : </span><label>{{orderData.address}}</label></el-col>
                    <el-col><span>买家留言 : </span><label></label></el-col>
                    <el-col><span>卖家留言 : </span><label></label></el-col>
                </el-col>
                <el-col :span="16" class="orderpay-right">
                    <el-col :span="24" class="order-nav">
                        <el-col align="center" :span="9">商品</el-col>
                        <el-col align="center" :span="5">单价/数量</el-col>
                        <el-col align="center" :span="5">优惠</el-col>
                        <el-col align="center" :span="5">实付合计</el-col>
                    </el-col>
                    <el-col :span="24" class="order">
                        <el-col :span="24" class="order-list" v-for="(item, index) in orderData.goods_info" :key="item.goods_sn">
                            <el-col align="center" :span="9" class="msg-icon">
                                <el-col class="icon">
                                    <img :src="item.goods_img" alt="order-msg-icon" />
                                </el-col>
                                <el-col class="order-msg-text">
                                    {{item.goods_name}}
                                </el-col>
                            </el-col>
                            <el-col class="msg-li" :span="5">{{item.goods_price}} ({{item.goods_number}}件)</el-col>
                            <el-col class="msg-li" :span="5">
                                <!--<div>10</div>-->
                                <!--<div>(满150减8元)</div>-->
                            </el-col>
                            <el-col class="msg-li" :span="5">{{item.goods_number * item.transaction_price}}</el-col>
                        </el-col>

                        <el-col class="line"></el-col>
                        <el-col :span="24" class="order-money">订单共{{orderData.goods_info.length}}件商品，合计:￥{{orderData.total_fee}}(含运费 ￥0.00)</el-col>
                        <el-col :span="24" class="order-send">
                            <el-col class="send-msg" v-if="showShippingNum">{{orderData.shipping_name}}快递：{{orderData.invoice_no}}</el-col>
                            <el-col class="send-select" v-if="showShippingType">
                                <el-form :span="24" :inline="true">
                                    <el-form-item>
                                        <el-select v-model="shippingName" placeholder="选择快递公司">
                                            <el-option
                                            v-for="item in shipping_type"
                                            :label="item.label"
                                            :value="item.value"
                                            :key="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input placeholder="输入快递单号" v-model="shippingNumber"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="onShipments">确定</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
    </section>
</template>

<script>
	import { getOrderDetail, orderShipments } from 'api'
    import { mapGetters } from 'vuex';

	export default {
        data () {
            return {
                orderId: null,
                orderData: {},
                stepState: 1,
                loadingLayout: false,
                showShippingNum: false,
                showShippingType: false,
                shippingName: '',
                shippingNumber: '',

                shipping_type: []
            }
        },
        methods: {
            ...mapGetters(['shippingType']),
            alertBox(res){
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },
            // 获取订单详情
            getOrderIndo() {
                this.loadingLayout = true;
                getOrderDetail({trade_sn: this.orderId}).then(res => {
                    this.loadingLayout = false;
                    if (!this.alertBox(res)) return;
                    this.orderData = res.data || {};
                    this.setOrderState();
                    this.setShippingState();
                    // console.log(JSON.stringify(this.orderData));
                },
                err => {
                    this.loadingLayout = false;
                });
            },
            // 订单状态
            setOrderState() {
                switch (parseInt(this.orderData.order_status)) {
                        case 0:
                            // this.orderListData[i].order_status_txt = '待付款';
                            this.stepState = 1;
                            this.orderData.pay_time = '';
                            break;
                        case 1:
                            this.stepState = 2;
                            break;
                        case 2:
                            this.stepState = 2;
                            this.orderData.pay_time = '';
                            break;
                        case 3:
                            this.stepState = 4;
                            // this.orderListData[i].order_status_txt = '退款审核中';
                            break;
                        case 4:
                            this.stepState = 4;
                            break;
                        case 5:
                            this.stepState = 3;
                            // this.orderListData[i].order_status_txt = '待提货';
                            break;
                        case 6: // 已提货
                            this.stepState = 4;
                            break;
                        case 7:
                            this.stepState = 4;
                            // this.orderListData[i].order_status_txt = '已退款';
                            break;
                    
                        default:
                            this.orderListData[i].order_status_txt = '';
                            break;
                    }
            },
            // 物流状态
            setShippingState() {
                let order_status = this.orderData.order_status;
                // order_status = 1;
                if (order_status == 0 || order_status == 2) {
                    this.showShippingNum = false;
                    this.showShippingType = false;
                    return;
                }
                if (order_status == 1) {
                    this.showShippingNum = false;
                    this.showShippingType = true;
                    return;
                }
                this.showShippingNum = true;
            },
            // 发货
            onShipments() {
                orderShipments({
                    tid: this.orderId,
                    s_name: this.shippingName,
                    s_sn: this.shippingNumber
                })
                .then(res => {
                    if (!this.alertBox(res)) return;
                    this.showShippingType = false;
                    this.showShippingNum = true;

                    this.orderData.shipping_name = this.shippingName;
                    this.orderData.invoice_no = this.shippingNumber;
                },
                err => {

                });
            }

        },
        mounted() {
            this.orderId = this.$route.query.id;
            if (!this.orderId) {
                this.$router.push('order');
                return;
            }
            this.getOrderIndo();
            this.shipping_type = this.shippingType();
        }
    }
</script>

<style lang="less">
    .steps {
        display: inline-block;
        margin: 0 auto;
    }
    .line {
        height: 1px;
        width: 100%;
        display: block;
        border-top: 1px dashed #ccc;
        padding-bottom: 10px;
        margin-top: 10px;
    }
    .orderpay-msg {
        border: 1px solid #ccc;
        .orderpay-left {
            padding: 10px;
            line-height: 26px;
            .title {
                font-weight: 800;
            }
            span {
                display: inline-block;
                width: 70px!important;
                height: 100%;
                text-align: right;
            }
            label {
                text-align: left;
                padding-left: 5px;
            }
        }
        .orderpay-right {
            border-left: 1px solid #ccc;
            .order-nav {
                background: #ccc;
                height: 36px;
                line-height: 36px;
                font-weight: 800;
            }
            .order {
                padding: 0 10px;
                .order-list {
                    padding: 10px 5px;
                    .msg-icon {
                        // padding: 10px 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .icon {
                            width: 80px;
                            height: 80px;
                            overflow: hidden;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .order-msg-text {
                            flex: 1;
                        }
                    }
                    .msg-li {
                        display: flex;
                        height: 80px;
                        justify-content: center;
                        align-items: center;
                        div {
                            display: block!important;
                        }
                    }
                }
                .order-money {
                    text-align: right;
                    padding-right: 20px;
                    padding-top: 10px;
                }
                .order-send {
                    padding-top: 20px;
                    .send-msg {
                        padding: 10px 5px;
                    }
                    .send-select {

                    }
                }
            }
        }
    }
</style>