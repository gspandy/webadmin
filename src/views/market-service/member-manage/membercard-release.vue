<template>
    <section class="member-section">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
            <el-row>
                <el-form-item label="会员卡名称:"
                              prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="使用门槛:">
                    <el-col :span="24">
                        <el-col :span="3">
                            <el-checkbox>包邮</el-checkbox>
                        </el-col>
                        <el-col :span="9"
                                class="flex">
                            <el-checkbox>会员折扣</el-checkbox>
                            <el-form-item class="mg-left5">
                                <el-input></el-input>
                            </el-form-item>
                            <span class="mg-left5">折</span>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="flex" style="margin-top:20px">
                            <el-checkbox>开卡赠送</el-checkbox>
                            <el-form-item class="mg-left5" style="width:200px">
                                <el-select v-model="value"
                                    placeholder="请选择">
                                    <el-option v-for="item in options"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="mg-left5" style="width:50px">
                                <el-input></el-input>
                            </el-form-item>
                            <span class="mg-left5">张</span>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="会员期限:"
                              required>
                    <el-col :span="24"
                            class="pd">
                        <el-col :span="5">
                            <el-radio v-model="radio"
                                      label="无期限">无期限</el-radio>
                        </el-col>
                        <el-col :span="5"
                                class="flex">
                            <el-radio class="my-radio"
                                      v-model="radio"
                                      label="60"> </el-radio>
                            <el-form-item>
                                <el-input placeholder="天数"></el-input>
                            </el-form-item>
                            <span class="mg-left5">天</span>
                        </el-col>
                    </el-col>
                    <el-col :span="24"
                            class="seclect-time">
                        <el-col :span="1"
                                class="no-margin">
                            <el-radio class="my-radio"
                                      v-model="radio"
                                      label="time"> </el-radio>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date"
                                                placeholder="选择日期"
                                                v-model="ruleForm.date1"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="no-margin"
                                :span="1" 
                                style="text-align:center">至</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker type="fixed-time"
                                                placeholder="选择时间"
                                                v-model="ruleForm.date2"
                                                style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="使用说明:"
                              prop="desc">
                    <div style="height:330px;">
                        <wang-editor v-bind:init-content="ruleForm.content" @contentChanged="onContentChanged"></wang-editor>
                    </div>
                </el-form-item>
            </el-row>
            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>
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
        }
    },
    components: {
        wangEditor
    }
}

</script>

<style>
    .member-section {
        margin: 10px;
        width: 60%;
        min-width: 600px;
        color: #48576a
    }

    .member-section .flex {
        display: flex;
    }

    .member-section .mg-left5 {
        margin-left: 5px
    }

    .member-section .pd {
        padding-bottom: 10px;
        border-bottom: 1px dashed #f5f5f5
    }


    .member-section .no-margin {
        margin-left: 0
    }

    .member-section .seclect-time {
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #f5f5f5
    }

    .member-section .my-radio {
        float: left;
        margin-right: 8px;
    }

    .member-section .my-radio .el-radio__label {
        display: none
    }

    .member-section .line {
        text-align: center;
    }
</style>