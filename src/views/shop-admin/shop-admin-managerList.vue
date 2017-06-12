<template>
    <section class="add-user">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="user_name" label="管理员姓名"></el-table-column>
            <el-table-column prop="shop_name" label="店铺名称"></el-table-column>
            <el-table-column prop="add_time" label="添加时间"></el-table-column>
            <el-table-column prop="start_time" label="开始时间"></el-table-column>
            <el-table-column prop="end_time" label="结束时间"></el-table-column>
            <el-table-column prop="active" label="激活状态"></el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button @click="handleClick(scope.row.user_id)" type="text" size="small">编辑</el-button>
                    <el-dialog title="编辑管理员信息" v-model="dialogVisible" @close="closeEdit" size="large">
                        <el-form :model="formShop2" ref="formShop" :inline="true" label-width="160px">
                            <el-form-item prop="user_name" label="用户名">
                                <el-input placeholder="用户名" v-model="formShop2.user_name"></el-input>
                            </el-form-item>
                            <br />
                            <el-form-item prop="u_pwd" label="密码">
                                <el-input type="password" placeholder="密码" v-model="formShop2.u_pwd"></el-input>
                            </el-form-item>
                            <br />
                            <el-form-item prop="start_time" label="有限开始时间">
                                <el-date-picker
                                    v-model="formShop2.start_time"
                                    type="date"
                                    placeholder="有限开始时间"
                                    :picker-options="pickerOptions0">
                                </el-date-picker>
                            </el-form-item>
                            <br />
                            <el-form-item prop="end_time" label="有限结束时间">
                                <el-date-picker
                                    v-model="formShop2.end_time"
                                    type="date"
                                    placeholder="有限结束时间"
                                    :picker-options="pickerOptions1">
                                </el-date-picker>
                            </el-form-item>
                            <br />
                            <el-form-item prop="is_active" label="是否激活">
                                <el-radio-group v-model="formShop2.is_active">
                                    <el-radio :label="0">不激活</el-radio>
                                    <el-radio :label="1">激活</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <br />
                            <el-form-item prop="shop_ids" label="指定关联店铺">
                                <!--<el-input placeholder="指定关联店铺" v-model="formShop2.shop_ids"></el-input>-->
                                 <el-select v-model="shop_id" placeholder="指定关联店铺">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.shop_name"
                                        :label="item.shop_name"
                                        :value="item.shop_sn">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <br />
                            <el-form-item prop="role_id" label="指定角色">
                                <el-radio-group v-model="formShop2.role_id">
                                    <el-radio :label="1">超级管理员</el-radio>
                                    <el-radio :label="2">管理员</el-radio>
                                    <el-radio :label="3">店长</el-radio>
                                    <el-radio :label="4">客服</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <br />
                            <el-form-item class="btn-save">
                                <el-button @click="saveUser('formShop')" type="primary">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>

    </section>
</template>

<script>
    import vue from 'vue';
    import { editSysUser, getSysUserList, getSysUser, getShopList } from 'api';

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
                user_id: '',
                tableData: [],
                dialogVisible: false,
                formShop2: {
                    user_name: '',
                    u_pwd: '',
                    start_time: '',
                    end_time: '',
                    is_active: 0,
                    shop_ids: '',
                    role_id: 2
                },
                shop_id: '',
                options: []
                // rules: {
				// 	user_name: [
				// 		{ required: true, message: '请输入管理员名字', trigger: 'blur' },
				// 	],
				// 	// u_pwd: [
				// 	// 	{ required: true, message: '请输入管理员密码', trigger: 'blur' },
				// 	// ],
                //     start_time: [
				// 		{ type: 'date', required: true, message: '请输入有限开始时间', trigger: 'blur' },
				// 	],
                //     end_time: [
				// 		{ type: 'date', required: true, message: '请输入有限结束时间', trigger: 'blur' },
				// 	],
                //     is_active: [
				// 		{ required: true, message: '是否激活', trigger: 'blur' },
				// 	],
                //     shop_ids: [
				// 		{ required: true, message: '请指定关联店铺', trigger: 'blur' },
				// 	],
                //     role_id: [
				// 		{ required: true, message: '请指定角色', trigger: 'blur' },
				// 	]
				// }
            }
        },
        created () {
            this.getList();
        },
        methods: {
            getList() {
                getSysUserList().then((res) => {
                    if (res.code === 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.tableData = res.data;
                        for(var i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].add_time = this.format(this.tableData[i].add_time);
                            this.tableData[i].start_time = this.format(this.tableData[i].start_time);
                            this.tableData[i].end_time = this.format(this.tableData[i].end_time);
                        }
                    }
                    else {
                        this.$message({
                            message: '出错了',
                            type: 'error'
                        });
                    }
                })
            },
            getShopLists() {
                getShopList().then((res) => {
                    this.options = res.data.list;
                });
            },
            closeEdit() {
                this.dialogVisible = false;
                this.formShop2 = {
                    user_name: '',
                    u_pwd: '',
                    start_time: '',
                    end_time: '',
                    is_active: 0,
                    shop_ids: '',
                    role_id: 2
                };
                this.user_id = '';
                this.shop_id = '';
            },
            handleClick(id) {
                this.user_id = id;
                this.getShopLists();
                getSysUser({u_id: id}).then((res) => {
                    this.dialogVisible = true;
                    this.formShop2 = res.data;
                    // console.log('res.data', res.data);
                    this.shop_id = res.data.shop_ids;
                    const value = this.shop_id;
                    // console.log('value', this.options);
                    const item = this.options.filter((item) => {
                        // console.log('innr', item);
                        if (item.shop_sn == value) {
                            return true;
                        }
                        return false;
                    })
                    // this.shop_id = item[0].shop_name;
                    // console.log('item', item);
                })
            },
            format(time) {
                const date = new Date(time);
                const yy = date.getFullYear();
                const mm = date.getMonth() + 1;
                const dd = date.getDate();
                return yy + '-' + this.zero(mm + '') + '-' + this.zero(dd + '');
            },
            zero(time) {
                if(time.length === 1) {
                    return '0' + time;
                }
                return time + '';
            },
            timeFormat(time) {
                return new Date(time).getTime() / 1000;
            },
            saveUser(formShop) {
				this.$refs[formShop].validate((valid) => {
					if (valid) {
                        const params = {
                            u_id: this.user_id + '',
                            u_name: this.formShop2.user_name + '',
                            u_pwd: this.formShop2.u_pwd + '',
                            u_start: this.timeFormat(this.formShop2.start_time) + '',
                            u_end: this.timeFormat(this.formShop2.end_time) + '',
                            u_active: this.formShop2.is_active + '',
                            u_shop: this.shop_id + '',
                            u_role: this.formShop2.role_id + ''
                        }
                        console.log(this.shop_id);
                        editSysUser(params).then((res) => {
                            if (res.code === 0) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.getList();
                            }
                            else {
                                this.$message({
                                    message: '修改失败',
                                    type: 'error'
                                });
                            }
                            this.dialogVisible = false;
                            this.user_id = '';
                            this.shop_id = '';
                            this.formShop2 = {
                                user_name: '',
                                u_pwd: '',
                                start_time: '',
                                end_time: '',
                                is_active: 0,
                                shop_ids: '',
                                role_id: 2
                            };
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
        margin-top: 20px;
        .btn-save {
            float: right;
            margin-right: 20px;
        }
    }
</style>