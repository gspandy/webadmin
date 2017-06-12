<template>
    <section class="add-user">
        <el-row>
            <el-col :span="24" class="title">
                联系人信息
            </el-col>
            <hr />
        </el-row>
        <el-form :model="formShop2" :rules="rules2" ref="formShopMsg" :inline="true" label-width="160px">
			<el-form-item prop="u_name" label="用户名">
				<el-input placeholder="联系人" v-model="formShop2.u_name"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="u_pwd" label="密码">
				<el-input type="password" placeholder="密码" v-model="formShop2.u_pwd"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="u_start" label="有限开始时间">
				<!--<el-input placeholder="有限开始时间" v-model="formShop2.u_start"></el-input>-->
                <el-date-picker
                    v-model="formShop2.u_start"
                    type="date"
                    placeholder="有限开始时间"
                    :picker-options="pickerOptions0">
                </el-date-picker>
			</el-form-item>
			<br />
			<el-form-item prop="u_end" label="有限结束时间">
				<!--<el-input placeholder="有限结束时间" v-model="formShop2.u_end"></el-input>-->
                <el-date-picker
                    v-model="formShop2.u_end"
                    type="date"
                    placeholder="有限结束时间">
                </el-date-picker>
			</el-form-item>
			<br />
            <el-form-item prop="u_active" label="是否激活">
				<!--<el-input placeholder="是否激活" v-model="formShop2.u_active"></el-input>-->
                <el-radio-group v-model="formShop2.u_active">
                    <el-radio label="0">不激活</el-radio>
                    <el-radio label="1">激活</el-radio>
                </el-radio-group>
			</el-form-item>
			<br />
            <el-form-item prop="u_shop" label="指定关联店铺">
				<!--<el-input placeholder="指定关联店铺" v-model="formShop2.u_shop"></el-input>-->
                <el-select v-model="formShop2.u_shop" placeholder="指定关联店铺">
                    <el-option
                        v-for="item in options"
                        :key="item.shop_name"
                        :label="item.shop_name"
                        :value="item.shop_sn">
                    </el-option>
                </el-select>
			</el-form-item>
			<br />
            <el-form-item prop="u_role" label="指定角色">
				<!--<el-input placeholder="指定角色" v-model="formShop2.u_role"></el-input>-->
                <el-radio-group v-model="formShop2.u_role">
                    <el-radio label="2">管理员</el-radio>
                    <el-radio label="3">店长</el-radio>
                    <el-radio label="4">客服</el-radio>
                </el-radio-group>
			</el-form-item>
			<br />
			<el-form-item class="btn-save">
				<el-button type="primary" @click="saveUserMsg('formShopMsg')">提交</el-button>
			</el-form-item>
		</el-form>
    </section>
</template>

<script>
    import vue from 'vue';
    import util from '../../common/js/util';
    import { addSysUser, getShopList } from 'api';

    export default {
        data () {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                formShop2: {
					u_name: '',
					u_pwd: '',
					u_start: '',
					u_end: '',
                    u_shop: '',
                    u_active: '',
					u_role: ''
				},
				rules2: {
					u_name: [
						{ required: true, message: '请输入管理员名字', trigger: 'blur' },
					],
					u_pwd: [
						{ required: true, message: '请输入管理员密码', trigger: 'blur' },
					],
                    u_start: [
						{ type: 'date', required: true, message: '请输入有限开始时间', trigger: 'change' },
					],
                    u_end: [
						{ type: 'date', required: true, message: '请输入有限结束时间', trigger: 'change' },
					],
                    u_active: [
						{ required: true, message: '是否激活', trigger: 'change' },
					],
                    // u_shop: [
					// 	{ required: true, message: '请指定关联店铺', trigger: 'change' },
					// ],
                    u_role: [
						{ required: true, message: '请指定角色', trigger: 'change' },
					]
				},
                options: []
            }
        },
        created () {
            this.getShopLists();
        },
        methods: {
            getShopLists() {
                getShopList().then((res) => {
                    this.options = res.data.list;
                });
            },
            saveUserMsg(formShopMsg) {
				this.$refs[formShopMsg].validate((valid) => {
					if (valid) {
                        if (!this.formShop2.u_shop) {
                            this.$message({
                                message: '关联店铺不能为空',
                                type: 'error'
                            });
                            return;
                        }
                        this.formShop2.u_start = (new Date(this.formShop2.u_start).getTime()) / 1000;
                        this.formShop2.u_end = (new Date(this.formShop2.u_end).getTime()) / 1000;
						addSysUser(this.formShop2).then((res) => {
                            if (res.code === 0) {
                                this.$message({
									message: 'success',
									type: 'success'
								});
                                this.formShop2 = {
                                    u_name: '',
                                    u_pwd: '',
                                    u_start: '',
                                    u_end: '',
                                    u_active: '',
                                    u_shop: '',
                                    u_role: ''
                                }
                            }
                        })
					} else {
						this.$message({
							message: '输入信息有错误，请重新输入',
							type: 'error'
						});
						return false;
					}
				});
			}
        }
    }
</script>

<style lang="less">
    .add-user {
        .title {
            margin-top: 20px;
        }
    }
</style>