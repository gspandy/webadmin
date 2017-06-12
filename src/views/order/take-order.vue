
<style lang="less">
    .take-order-page{
        .query-area {
            margin-top: 20px;
        }
        .explain-text {
            margin: 30px 0px;
            span {
                color: #5677fc;
            }
        }
        .order-info {
            border: 1px solid #dfe6ec;

        }
        .order-msg {
            padding: 0px 20px;
            border-right: 1px solid #dfe6ec;
            min-height: 210px;
            h6,p{
                margin: 0px;
            }
            h6{
                padding: 15px 0px;
            }
            p {
                padding-bottom: 8px;
            }
        }
        .order-ope {
            display: flex;
            padding: 20px 50px;
            > div {
                flex: 1;
            }
            .order-price {
                line-height: 36px;
            }
            .order-ope-btn {
                text-align: right;
            }
        }
        .goods-name-img {
            display: flex;
            padding: 10px 0px;
            .goods-img{
                margin-right: 10px;
                &,
                img {
                    width: 80px;
                    height: 80px;
                }
            }
            .goods-name{}
        }
    }
</style>

<template>
    <section v-loading="loadLayout" class="take-order-page">
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="6">
                <el-input v-model="verifyCode" placeholder="输入提货码"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="searchOrder">查询</el-button>
            </el-col>
        </el-row>
        <div class="explain-text">
            <p>
                <span>状态1：</span>提货码有误，请重新核对输入
            </p>
            <p>
                <span>状态2：</span>提货码非本商户所有，请核对并告知用户
            </p>
            <p>
                <span>状态3：</span>无效提货码！“ 2345446234 ” 已经于2017-04-23 被[管理员]-[分店名称]验证过！
            </p>
        </div>
        <div class="order-info">
            <el-row :gutter="0">
                <el-col :span="7">
                    <div class="order-msg">
                        <h6>订单详情</h6>
                        <p>订单号：{{orderData.trade.t_id}}</p>
                        <p>订单类型：{{orderData.trade.type}}</p>
                        <p>电话：{{orderData.trade.mobile}}</p>
                        <p>买家留言：{{orderData.trade.message}}</p>
                    </div>
                </el-col>
                <el-col :span="17">
                    <el-table
                        :data="orderData.list"
                        row-class-name="table"
                        style="width: 100%">
                        <el-table-column
                            label="商品"
                            min-width="280">
                            <template scope="scope">
                                <!--7645370769-->
                                <div class="goods-name-img">
                                    <div class="goods-img">
                                        <img :src="scope.row.goods_img" />
                                        <!--<img src="http://p1.flowerexpresses.com/pf/goods/15/2036_750_750.jpg" />-->
                                    </div>
                                    <div class="goods-name">{{scope.row.goods_name}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="单价/数量"
                            width="180">
                            <template scope="scope">
                                <div>
                                    {{scope.row.goods_price}} x{{scope.row.goods_number}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="discount"
                            label="优惠"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="total"
                            label="实付合计"
                            width="180">
                        </el-table-column>
                    </el-table>
                    <div class="order-ope" v-if="orderData.list.length > 0">
                        <div class="order-price">订单共{{orderData.num}}件商品，总计：￥{{orderData.num}}</div>
                        <div class="order-ope-btn">
                            <el-button type="primary" @click="onConfirmVerify">确定验证</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-dialog title="输入提货码" v-model="showVerifyBox">
            <el-form label-width="85px" style="margin:20px;width:90%;">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item label="提货码：">
                            <el-input v-model="verifyCodeNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showVerifyBox = false">取 消</el-button>
                <el-button type="primary" @click="onConfirmVerify()">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import { getVerifyOrder, confirmVerifyOrder } from 'api';
    export default {
        data() {
            return {
                loadLayout: false,
                showVerifyBox: false,
                verifyCode: '',
                verifyCodeNum: '',
                orderData: {
                    list:[],
                    trade:{},
                    total: '',
                    num: ''
                }
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
            searchOrder() {
                if (!this.verifyCode) {
                    this.$message.error('请输入提货码');
                    return;
                }
                getVerifyOrder({v_code: this.verifyCode}).then(res => {
                    if (!this.alertBox(res)) return;
                    this.orderData = res.data || {};
                    // console.log(JSON.stringify(res));
                });
            },
            onConfirmVerify() {
                if (!this.verifyCode || this.orderData.list.length <= 0) {
                    this.$message.error('请输入提货码查询！');
                    return;
                }
                this.$confirm('你要确定验证改订单吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    this.loadLayout = true;
                    confirmVerifyOrder({v_code: this.verifyCode, t_id: this.orderData.trade.t_id}).then(res => {
                        this.loadLayout = false;
                        if (!this.alertBox(res)) return;
                        this.$message({
                            type: 'success',
                            message: '验证成功！'
                        });
                    },
                    err => {
                        this.loadLayout = false;
                    });
                })
                .catch(() => {
                });
                // this.showVerifyBox = false;
            }
        }
    }
</script>

