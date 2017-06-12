<template>
    <section class="add-article-page" v-loading="loadingLayout">
        <el-row>            
            <el-col :span="24" class="submit">
                <el-col :span="24" class="submit-header">
                    资金提现
                </el-col>
                <el-col :span="24" class="submit-list">
                    <el-col :span="24" class="msg">
                        <el-form :label-position="labelPosition" label-width="150px" :model="formLabelAlign">
                            <el-form-item label="提现金额：">
                                <b>3032.23</b>元
                            </el-form-item>
                            <el-form-item label="收款信息：">
                                <el-col class="ali-pay">
                                    支付宝：slk@aliyun.com
                                </el-col>
                                <el-col class="bar" :disable="payState">
                                    <p>账号：32077401840821348204812</p>
                                    <p>支行信息：中国银行广州天河支行</p>
                                    <p>主体/姓名：赵宽余</p>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="联系人手机号：">
                                28282736482
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="24" :disabled="rejectState">
                        <el-form :label-position="labelPosition" label-width="200px" :model="formLabelAlign">
                            <el-form-item label="输入打款流水号：">
                                <el-input value="" placeholder="单行输入" style="width: 300px;"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="8">
                                    <el-button size="large" type="success" @click="changeState">确认打款</el-button>
                                </el-col>
                                <el-col :span="6">
                                    <el-popover ref="popover1" placement="right" v-model="visible1" width="400" trigger="click">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="textarea">
                                        </el-input>
                                        <el-button type="primary" @click="visible1 = false" class="comfirmReject">确定拒绝</el-button>
                                    </el-popover>
                                    <el-button type="error" @click="reject" v-popover:popover1>拒绝</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="24" :disabled="error">
                        <b>已拒绝！理由：抱歉，目前不支持银行账号提现</b>
                    </el-col>
                    <el-col :span="24" :disabled="success">
                        <b>已完成！打款流水账号：E4324234206</b>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
        
    </section>
</template>

<script>
    import vue from 'vue';
    import util from '../../common/js/util';
    import {getArticleCatList, getArticleTagList, addArticle, getArticleInfo, editArticle} from 'api'

    export default {
        data () {
            return {
                payState: false,
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                visible1: false,
                textarea: '',
                loadingLayout: false,
                rejectState: true,
                error: false,
                success: false,
                form: {}
            }
        },
        methods: {
            changeState() {

            },
            reject() {

            }
        },
        computed: {
           
        },
        mounted() {

        }
    }
</script>

<style lang="less">
    .add-article-page {
        .input-new-tag{
            width: 78px;
            margin-left: 10px;
            vertical-align: middle;
        }
        .submit {
            box-sizing: border-box;
            border: 1px solid #ccc;
            padding: 20px;
            .submit-header {
                font-weight: 800;
                line-height: 30px;
                border-bottom: 1px solid #ccc;
            }
            .submit-list {
                padding-top: 20px;
            }
        }
    }
    .comfirmReject {
        margin-top: 10px!important;
    }
</style>