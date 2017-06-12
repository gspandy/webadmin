<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :span="24" :inline="true">
                <el-form-item>
                    <el-select v-model="value" placeholder="订单号">
                        <el-option
                        v-for="item in options"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="下单时间:">
                    <el-input v-model="input"></el-input>
                </el-form-item>
                <el-form-item label="至">
                    <el-input v-model="input"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-tag type="success">近3天</el-tag>
                    <el-tag type="success">近30天</el-tag>
                </el-form-item>
			</el-form>
            <el-form :span="24" :inline="true">
                <el-form-item label="订单类型:">
                    <el-select v-model="value" placeholder="全部">
                        <el-option
                        v-for="item in options2"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态:">
                    <el-select v-model="value" placeholder="全部">
                        <el-option
                        v-for="item in options4"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物流方式:">
                    <el-select v-model="value" placeholder="全部">
                        <el-option
                        v-for="item in options3"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary">筛选</el-button>
                </el-form-item>
			</el-form>
		</el-col>

        <!--导航条-->
        <el-col :span="24" class="navbar" style="padding-bottom: 0px;">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first"></el-tab-pane>
                <el-tab-pane label="待付款" name="second"></el-tab-pane>
                <el-tab-pane label="待发货" name="third"></el-tab-pane>
                <el-tab-pane label="已发货" name="fourth"></el-tab-pane>
                <el-tab-pane label="已完成" name="fifth"></el-tab-pane>
            </el-tabs>
        </el-col>

        <!--列表详情-->
        <!--列表标题-->
        <!--<el-table style="width: 100%">
            <el-table-column align="center" prop="date" label="全部"></el-table-column>
            <el-table-column align="center" prop="name" label="待付款"></el-table-column>
            <el-table-column align="center" prop="address" label="待发货"></el-table-column>
            <el-table-column align="center" prop="name" label="已发货"></el-table-column>
            <el-table-column align="center" prop="address" label="已完成"></el-table-column>
        </el-table>-->
        <el-col :span="24" class="order-nav">
            <el-col align="center" :span="8">商品</el-col>
            <el-col align="center" :span="3">单价/数量</el-col>
            <el-col align="center" :span="3">实付金额</el-col>
            <el-col align="center" :span="3">买家</el-col>
            <el-col align="center" :span="3">下单时间</el-col>
            <el-col align="center" :span="3">订单状态</el-col>
        </el-col>
        <!--循环订单列表-->
        <div v-for="(item, index) in orderListData">
            <el-col :span="24" class="order-list">
                <el-col :span="24" class="list-header">
                    <el-col :inline="true" align="left" :span="18">
                        <el-col :span="6" class="order-number">订单号：{{item.trade_sn}}</el-col>
                        <!--<el-col :span="9" class="order-other">代销订单（利润： 20.00）</el-col>-->
                    </el-col>
                    <el-col align="right" :span="6">
                        <!--<el-popover ref="popover1" placement="bottom" width="400" trigger="click">
                            <el-form :model="form" :inline="true" align="left">
                                <el-form-item>
                                    <el-select v-model="form.company" placeholder="选择快递公司" style="max-width: 120px;">
                                        <el-option label="顺丰快递" value="shunfeng"></el-option>
                                        <el-option label="圆通快递" value="yuantong"></el-option>
                                        <el-option label="申通快递" value="shentong"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="form.id" auto-complete="off" placeholder="输入快递单号"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" size="small">确定</el-button>
                                </el-form-item>
                            </el-form>
                        </el-popover>-->
                        <el-button type="primary" size="mini" @click="onShipments(item.trade_sn)" v-if="item.order_status !== 0 && item.order_status !== 1 && item.order_status !== 2 && item.order_status !== 7">发货</el-button>
                        <span><el-button type="text" @click="onGoToOrderInfo(item.trade_sn)">备注-查看详情>></el-button></span>
                    </el-col>
                </el-col>
                <el-col :span="24" class="list-msg" v-for="(aGoods, aIndex) in item.goods_info" :key="aGoods.goods_sn">
                    <el-col :span="24"  class="goods-info">
                        <el-col :span="24" class="msg-index">
                            <el-col :span="8" class="msg-icon">
                                <el-col class="icon">
                                    <img :src="aGoods.goods_img" alt="order-msg-icon" />
                                </el-col>
                                <el-col class="order-msg-text">
                                    {{aGoods.goods_name}}
                                </el-col>
                            </el-col>
                            <el-col :span="3" class="msg-li" align="center">
                                {{aGoods.goods_price}}（{{aGoods.goods_number}}件）
                            </el-col>
                            <el-col :span="3" class="msg-li" align="center">
                                {{aGoods.transaction_price}}
                            </el-col>
                            <el-col :span="3" class="msg-li msg-top" align="center">
                                {{item.buyer_name}} {{item.mobile}}
                            </el-col>
                            <el-col :span="4" class="msg-li" align="center">
                                {{item.create_time}}
                            </el-col>
                            <el-col :span="3" class="msg-li" align="center">
                                {{item.order_status_txt}}
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="msg-text">
                            <el-col  :span="12" align="left">
                                买家留言：
                            </el-col>
                            <el-col  :span="12" align="right">
                                卖家备注：
                            </el-col>
                        </el-col>
                    </el-col>
                </el-col>

            </el-col>
        </div>
        <el-dialog title="物流信息" v-model="showShippingLayout">
            <el-form :model="shipping" label-width="85px" style="margin:20px;width:90%;">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="物流：">
                            <el-select v-model="shipping.s_name" placeholder="请选择配送方式">
                                <el-option v-for="(item, index) in shipping_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="物流单号：">
                            <el-input v-model="shipping.s_sn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showShippingLayout = false">取 消</el-button>
                <el-button type="primary" @click="onSetShipping()">确 定</el-button>
            </div>
        </el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getOrderList } from 'api'
    import { mapGetters } from 'vuex';

	export default {
		data() {
            return {
                orderListData:[],   // 订单列表
                shipping_type: [],
                shipping: {
                    s_name: '',
                    s_sn: ''
                },
                showShippingLayout: false,
                orderId: null,

                activeName2: 'first',
                options: [{
                    value: '选项1',
                    label: '订单号'
                }, {
                    value: '选项2',
                    label: '收货人'
                }, {
                    value: '选项3',
                    label: '收货人手机'
                }],
                options2: [{
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项1',
                    label: '代销订单'
                }, {
                    value: '选项2',
                    label: '普通订单'
                }, {
                    value: '选项3',
                    label: '团购订单'
                }],
                options3: [{
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项1',
                    label: '花巴士'
                }, {
                    value: '选项2',
                    label: '快递'
                }, {
                    value: '选项3',
                    label: '自提'
                }],
                options4: [{
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项1',
                    label: '待付款'
                }, {
                    value: '选项2',
                    label: '待发货'
                }, {
                    value: '选项3',
                    label: '已发货'
                }, {
                    value: '选项4',
                    label: '已完成'
                }],
                value: '',
                input: '',
                form: {
                    id: '',
                    company: ''
                },
                visible1: false
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
            onShipments(id) {
                this.showShippingLayout = true;
                this.orderId = id;
            },
            handleClick(tab, event) {
                // console.log(tab, event)
            },
            // 转换订单状态
            switchOrderStatus(orderListData) {
                for (var i = 0; i < this.orderListData.length; i++) {
                    switch (parseInt(this.orderListData[i].order_status)) {
                        case 0:
                            this.orderListData[i].order_status_txt = '待付款';
                            break;
                        case 1:
                            this.orderListData[i].order_status_txt = '待发货';
                            break;
                        case 2:
                            // this.orderListData[i].order_status_txt = '待收货';
                            this.orderListData[i].order_status_txt = '已取消';
                            break;
                        case 3:
                            this.orderListData[i].order_status_txt = '退款审核中';
                            break;
                        case 4:
                            this.orderListData[i].order_status_txt = '已收货';
                            break;
                        case 5:
                            this.orderListData[i].order_status_txt = '待提货';
                            break;
                        case 6:
                            this.orderListData[i].order_status_txt = '已提货';
                            break;
                        case 7:
                            this.orderListData[i].order_status_txt = '已退款';
                            break;
                    
                        default:
                            this.orderListData[i].order_status_txt = '';
                            break;
                    }
                }
            },
            // 
            onGoToOrderInfo(id) {
                this.$router.push('manager?id=' + id);
            },
            // 获取订单列表
            orderList() {
                getOrderList().then(res => {
                    if (!this.alertBox(res)) return;
                    const _data = res.data.list;
                    this.orderListData = _data;
                    this.switchOrderStatus(_data);
                    // console.log(JSON.stringify(res));
                    
                    // for (var i = 0; i < _data.length; i++) {
                    // }
                });
            },
            onSetShipping() {
                const orderId = this.orderId;
                const shipping = {...this.shipping}
                this.shipping.s_sn = '';
                if (!shipping.s_sn || !shipping.s_name) {
                    this.$alert('请选择物流和填写物流单号！', '提示', {
                        confirmButtonText:'确定'
                    });
                }
                orderShipments({
                    tid: orderId,
                    ...shipping
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
			this.orderList();
            this.shipping_type = this.shippingType();
            if (this.shipping_type.length > 0) {
                this.shipping.s_name = this.shipping_type[0].value;
            }
            // console.log(this.shipping_type);
		}
	}

</script>

<style scoped lang="less">
    .order-nav {
        background: #ccc;
        height: 36px;
        line-height: 36px;
        font-weight: 800;
    }
    .order-list {
        border: 1px solid #ccc;
        margin-top: 10px;
        .list-header {
            border-bottom: 1px solid #ccc;
            height: 30px;
            line-height: 30px;
            .order-number {
                display: inline-block;
                padding-left: 5px;
            }
            .order-other {
                display: inline-block;
            }
            span {
                padding-right: 10px;
            }
            .to-detail {
                text-decoration: none;
            }
        }
        .list-msg {
            padding: 0 10px;
            .goods-info {
                border-bottom: 1px solid #ccc;
            }
            &:last-child {
                .goods-info{
                    border:none;
                }
            }
            .msg-index {
                .msg-li {
                    box-sizing: border-box;
                    display: flex;
                    height: 80px;
                    margin: 10px 0;
                    justify-content: center;
                    align-items: center;
                }
                .msg-icon {
                    padding: 10px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .icon {
                        width: 80px;
                        height: 80px;
                        overflow: hidden;
                        margin-right: 10px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .order-msg-text {
                        flex: 1;
                    }
                }
            }
            .msg-text {
                height: 30px;
                line-height: 30px;
            }
        }
    }
</style>