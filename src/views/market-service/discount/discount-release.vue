<template>
    <section class="dis-release-section">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row type="flex">
                <el-col :span="8">
                    <el-form-item prop="name" label="优惠券名称:">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="name" label="发放数量:">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item prop="name" label="面值:" label-width="80px">
                        <el-input v-model="ruleForm.name" width="70px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" class="center" style="line-height:36px">
                    至
                </el-col>
                <el-col :span="2">
                    <el-input v-model="ruleForm.name" width="70px"></el-input>
                </el-col>
                <el-col :span="1" class="center" style="line-height:36px">
                    元
                </el-col>
                <el-col :span="2">
                    <el-form-item label-width="0">
                        <el-radio class="radio" v-model="radio2" label="1">随机</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="使用门槛:" required>
                    <el-col :span="24" class="pd">
                        <el-col :span="3">
                            <el-radio v-model="radio" label="无期限">无期限</el-radio>
                        </el-col>
                        <el-col :span="18">
                            <el-radio class="my-radio" v-model="radio" label="60"> 满 </el-radio>
                            <el-col :span="3">
                                <el-form-item>
                                    <el-input placeholder="天数"></el-input>
                                </el-form-item>
                            </el-col>
                            <span class="mg-left">元可以使用</span>
                        </el-col>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="会员等级:" required>
                    <el-col :span="12">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option  :key="item.value"
                                        v-for="item in options" 
                                        :label="item.label" 
                                        :value="item.value" 
                                        ></el-option>
                        </el-select>
                        <span class="mg-left">可领取</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="mg-left" style="float:left">每人限领:</span>
                        <el-col :span="3" class="mg-left">
                            <el-input></el-input>
                        </el-col>
                        <span class="mg-left">张</span>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="有效时间:" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" 
                                            placeholder="选择日期" 
                                            v-model="ruleForm.date1" 
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center">至</el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker type="fixed-time" 
                                            placeholder="选择时间" 
                                            v-model="ruleForm.date2" 
                                            style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="选择商品:">
                    <el-radio-group v-model="radio2">
                        <el-radio :label="1">备选项</el-radio>
                        <el-radio :label="2">备选项</el-radio>
                        <el-radio :label="3">备选项</el-radio>
                    </el-radio-group>
                    <div>
                        <span>
                            以下商品参加活动:
                            <i class="el-icon-plus"
                                @click="dialogTableVisible=true"></i>
                        </span>
                    </div>
                    <el-row class="product">
                        <el-col :span="24" class="product-list">
                            <el-col :span="4">
                                <i class="el-icon-minus sub"></i>
                                <span class="product-list-title">花艺师套餐</span>
                            </el-col>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="使用说明:">
                    <div style="height:330px;">
                        <wang-editor v-bind:init-content="ruleForm.content" @contentChanged="onContentChanged"></wang-editor>
                    </div>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--选择商品弹窗-->
        <el-dialog title="选择商品" v-model="dialogTableVisible">
            <el-col :span="8" style="margin-bottom:10px">
                <el-input   icon="search"
                            placeholder="请选择日期" 
                            v-model="searchProduct" 
                            :on-icon-click="handleIconClick"></el-input>
            </el-col>
            <el-table :data="gridData" @selection-change="handleSelectionChange" height="500">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="商品/价格" min-width="300" header-align="center">
                    <template scope="scope">
                        <div class="product-info">
                            <img src="scope.row.img" />
                            <div class="product-info-title">
                                <p>{{scope.row.title}}</p>
                                <em>￥ {{scope.row.price}}-{{scope.row.price2}}</em>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column property="store" label="库存"></el-table-column>
                <el-table-column property="sale" label="总销量"></el-table-column>
                <el-table-column property="shop" label="供货商"></el-table-column>
                <el-table-column property="type" label="商品类型"></el-table-column>
            </el-table>
            <el-col :span="24" class="footer">
                <strong style="margin-right:10px">你已经选择5款商品</strong>
                <el-button type="primary">确定添加</el-button>
            </el-col>
        </el-dialog>
    </section>
</template>

<script>
    import wangEditor from '../../../components/wangeditor.vue';
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                radio: '',
                radio2: 1,
                dialogTableVisible: false,
                regulardialog: false,
                searchProduct: '',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                gridData: [{
                    img: '',
                    price: 1800,
                    price2: 5800,
                    title: '话费撒到广发覅时候',
                    store: '308',
                    sale: '1234',
                    shop: '鲜花说',
                    type: '成品花束'
                }],
                rules: {
                    name: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                    ],
                    region: [{
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }],
                    date1: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    date2: [{
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                    }],
                    type: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }],
                    resource: [{
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onContentChanged(val) { },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleIconClick() { },
            handleSelectionChange(val) {
                console.log(val)
            }
        },
        components: {
            wangEditor
        }
    }
</script>

<style>
    .dis-release-section {
        margin: 10px;
        width: 70%;
        min-width: 600px;
    }

    .dis-release-section .flex {
        display: flex;
    }

    .dis-release-section .mg-left5 {
        margin-left: 5px
    }

    .dis-release-section .center {
        text-align: center
    }

    .dis-release-section .line {
        text-align: center
    }

    .dis-release-section i.el-icon-plus {
        color: #8492a6;
        cursor: pointer;
        opacity: 0.7;
        transition: all .5s
    }

    .dis-release-section .el-col-2 {
        color: #48576a
    }

    .dis-release-section i.el-icon-plus:hover {
        opacity: 1
    }

    .dis-release-section i.sub {
        width: 20px;
        height: 20px;
        display: inline-block;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        background: #8492a6;
        color: #FFFFFF
    }

    .dis-release-section .my-label {
        width: 80px;
        text-align: right;
        padding-right: 12px;
        margin-left: 10px;
    }

    .dis-release-section .product-list {
        border-bottom: 1px dashed #f5f5f5;
        border-top: 1px dashed #f5f5f5;
        padding: 10px 0;
    }

    .dis-release-section .product-list .label {
        text-align: right;
        padding-right: 12px;
    }

    .dis-release-section .product-list .group-price label {
        width: 100px;
    }

    .dis-release-section .product-info {
        display: flex;
        padding: 10px 0;
    }

    .dis-release-section .product-info img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
    }

    .dis-release-section .product-info .product-info-title p {
        margin: 0 0 10px;
    }

    .dis-release-section .product-info .product-info-title em {
        color: red;
    }

    .dis-release-section .footer {
        text-align: right;
        line-height: 40px;
        padding: 10px 0;
    }

    .dis-release-section .my-radio {
        float: left;
        margin-right: 8px;
    }

    .dis-release-section .mg-left {
        margin-left: 5px;
    }
</style>