<template>
    <section class="full-release-section">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="name"
                                  label="活动名称:">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="region"
                                  label="团购类型:">
                        <el-select v-model="ruleForm.region"
                                   placeholder="请选择团购类型">
                            <el-option label="普通团购"
                                       value="普通团购"></el-option>
                            <el-option label="拼团"
                                       value="拼团"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="排序号:">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="团购简介:">
                    <div style="height:330px;">
                        <wang-editor v-bind:init-content="ruleForm.content" @contentChanged="onContentChanged"></wang-editor>
                    </div>
                </el-form-item>
            </el-row>
            <el-row class="no-margin">
                <el-form-item label="活动规则:">
                    <i class="el-icon-plus"
                       @click="dialogTableVisible=true"></i>
                </el-form-item>
                <el-col :span="24"
                        class="product">
    
                    <el-col :span="1">
                        <i class="el-icon-minus sub"></i>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="满:">
                            <el-input placeholder="请输入价格">
                                <template slot="prepend">￥</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="减:">
                            <el-input placeholder="请输入价格">
                                <template slot="prepend">￥</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24"
                        class="no-margin">
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
                    </el-form-item>
                </el-col>
                <el-col :span="24"
                        class="product">
                    <el-col :span="6">
                        <i class="el-icon-minus sub"></i>
                        <span class="product-list-title">花艺师套餐</span>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="活动时间:"
                              required>
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
                <el-form-item>
                    <el-button type="primary"
                               @click="submitForm('ruleForm')">确定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--选择商品弹窗-->
        <el-dialog title="选择商品"
                   v-model="dialogTableVisible">
            <el-col :span="8"
                    style="margin-bottom:10px">
                <el-input placeholder="请选择日期"
                          icon="search"
                          v-model="searchProduct"
                          :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
            <el-table :data="gridData"
                      @selection-change="handleSelectionChange"
                      height="500">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column label="商品/价格"
                                 min-width="300"
                                 header-align="center">
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
                <el-table-column property="store"
                                 label="库存"></el-table-column>
                <el-table-column property="sale"
                                 label="总销量"></el-table-column>
                <el-table-column property="shop"
                                 label="供货商"></el-table-column>
                <el-table-column property="type"
                                 label="商品类型"></el-table-column>
            </el-table>
            <el-col :span="24"
                    class="footer">
                <strong style="margin-right:10px">你已经选择5款商品</strong>
                <el-button type="primary">确定添加</el-button>
            </el-col>
        </el-dialog>
        <!--活动规则弹窗-->
        <el-dialog title="选择活动规则"
                   v-model="regulardialog">
            <el-col :span="8"
                    style="margin-bottom:10px">
                <el-input placeholder="请选择日期"
                          icon="search"
                          v-model="searchProduct"
                          :on-icon-click="handleIconClick">
                </el-input>
            </el-col>
            <el-table :data="gridData"
                      @selection-change="handleSelectionChange"
                      height="500">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column label="商品/价格"
                                 min-width="300"
                                 header-align="center">
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
                <el-table-column property="store"
                                 label="库存"></el-table-column>
                <el-table-column property="sale"
                                 label="总销量"></el-table-column>
                <el-table-column property="shop"
                                 label="供货商"></el-table-column>
                <el-table-column property="type"
                                 label="商品类型"></el-table-column>
            </el-table>
            <el-col :span="24"
                    class="footer">
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
                content: '',
                desc: ''
            },
            radio2: 1,
            dialogTableVisible: false,
            regulardialog: false,
            searchProduct: '',
            gridData: [
                {
                    img: '',
                    price: 1800,
                    price2: 5800,
                    title: '话费撒到广发覅时候',
                    store: '308',
                    sale: '1234',
                    shop: '鲜花说',
                    type: '成品花束'
                }
            ],
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
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
        onContentChanged (val) {

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleIconClick() {

        },
        handleSelectionChange(val) {
            console.log(val)
        }
    },
    components: {
        wangEditor
    }
}
</script>

<style scoped>
    .full-release-section {
        margin: 10px;
        width: 60%;
        min-width: 600px;
    }

    .full-release-section .flex {
        display: flex;
        align-items: center
    }

    .full-release-section .line {
        text-align: center
    }

    .full-release-section i.el-icon-plus {
        color: #8492a6;
        cursor: pointer;
        opacity: 0.7;
        transition: all .5s
    }

    .full-release-section .el-col-2 {
        color: #48576a
    }

    .full-release-section i.el-icon-plus:hover {
        opacity: 1
    }

    .full-release-section i.sub {
        width: 20px;
        height: 20px;
        display: inline-block;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        background: #8492a6;
        color: #FFFFFF
    }

    .full-release-section .my-label {
        min-width: 100px;
        text-align: right;
        padding-right: 12px;
        margin-left: 5%;
    }

    .full-release-section .no-margin .el-form-item,
    .full-release-section .no-margin .el-form-item {
        margin-bottom: 0;
    }

    .full-release-section .product {
        border-top: 1px dashed #f5f5f5;
        border-bottom: 1px dashed #f5f5f5;
        padding: 10px 0;
        line-height: 36px;
        margin-bottom: 10px;
        margin-left: 100px;
    }

    .full-release-section .product-list {
        border-bottom: 1px dashed #f5f5f5;
        border-top: 1px dashed #f5f5f5;
        padding: 10px 0;
    }

    .full-release-section .product-list .label {
        text-align: right;
        padding-right: 12px;
    }

    .full-release-section .product-list .group-price label {
        width: 100px;
    }

    .full-release-section .product-info {
        display: flex;
        padding: 10px 0;
    }

    .full-release-section .product-info img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
    }

    .full-release-section .product-info .product-info-title p {
        margin: 0 0 10px;
    }

    .full-release-section .product-info .product-info-title em {
        color: red;
    }

    .full-release-section .footer {
        text-align: right;
        line-height: 40px;
        padding: 10px 0;
    }
</style>