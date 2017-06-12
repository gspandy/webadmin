<template>
	<section class="shop-info" v-loading="loadingLayout">
		<!--客户基本信息-->
		<el-row>
			<el-col :span="12" class="title">
				客户基本信息
			</el-col>
			<el-col :span="12" class="right-button">
				<el-button type="primary" size="small">查看店铺资金信息</el-button>
			</el-col>
		</el-row>
		<hr />
		<br />
		<el-form :inline="true" label-width="120px">
			<el-form-item  label="主体信息：">
				<el-radio-group v-model="radio">
					<el-radio :label="1">个人</el-radio>
					<el-radio :label="2">企业</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="输入主体信息" v-model="msg"></el-input>
			</el-form-item>
			<!--联系人信息-->
			<el-row>
				<el-col :span="24" class="title">
					联系人信息
				</el-col>
				<hr />
			</el-row>
		</el-form>
		<el-form :model="formShop2" :rules="rules2" ref="formShopMsg" :inline="true" label-width="160px">
			<el-form-item prop="name" label="联系人：">
				<el-input placeholder="联系人" v-model="formShop2.name"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="phone" label="联系人手机号：">
				<el-input placeholder="手机号码" v-model="formShop2.phone"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="wechat" label="联系人微信号：">
				<el-input placeholder="微信号" v-model="formShop2.wechat"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="qq" label="联系人QQ号：">
				<el-input placeholder="QQ" v-model="formShop2.qq"></el-input>
			</el-form-item>
			<br />
			<el-form-item class="btn-save">
				<el-button type="primary" @click="saveUserMsg('formShopMsg')">保存</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script>
	import { getListAdmin, addGroupAdmin, addShopAdmin, getShopGroup, editShopGroup } from 'api';
	export default {
		data() {
			return {
				g_sn: null,
				loadingLayout: false,
				radio: 1,
				msg: '',
				formShop2: {
					name: '',
					phone: '',
					wechat: '',
					qq: ''
				},
				rules2: {
					name: [
						{ required: true, message: '请输入联系人名字', trigger: 'blur' },
					],
					phone: [
						{ required: true, message: '请输入联系人手机号', trigger: 'blur' },
						{ min: 11, max: 11, message: '手机号码为11位数字', trigger: 'blur' }
					],
					wechat: [
						{ required: true, message: '请输入联系人微信号', trigger: 'blur' }
					],
					qq: [
						{ required: false, message: '请输入联系人QQ号', trigger: 'blur' }
					]
				}
			};
		},
		created() {
			// 
		},
		methods: {
			saveUserMsg(formShopMsg) {
				this.$refs[formShopMsg].validate((valid) => {
					if (valid) {
						// alert('submit!');
						const params = {
							type: this.radio,
							r_name: this.msg,
							c_name: this.formShop2.name,
							c_tel: this.formShop2.phone,
							wx: this.formShop2.wechat,
							qq: this.formShop2.qq
						}
						if (this.msg == '' || this.msg == null) {
							this.$message({
								message: '主体信息为空，请重新输入',
								type: 'error'
							});
							return;
						};
						if (this.g_sn) {
							params.g_sn = this.g_sn;
							this.editGroup(params);
						} else {
							this.addGroup(params);
						}
					} else {
						this.$message({
							message: '输入信息有错误，请重新输入',
							type: 'error'
						});
						return false;
					}
				});
			},
			// 清空数据
			resetShopGroup() {
				this.formShop2 = {
					name: '',
					phone: '',
					wechat: '',
					qq: ''
				};
				this.msg = '';
				this.radio = '';
			},
			addGroup(params) {
				addGroupAdmin(params).then(res => {
					console.log('res', res);
					this.$message({
						showClose: true,
						message: '保存成功！',
						type: 'success'
					});
					this.resetShopGroup();
					this.$router.push('./shop-admin-body');
				}, err => {
					console.log(err);
				});
			},
			editGroup(params) {
				editShopGroup(params).then(res => {
					this.$message({
						showClose: true,
						message: '修改成功！',
						type: 'success'
					});
					console.log(res);
					this.resetShopGroup();
					this.$router.push('./shop-admin-body');
				}, err => {
					console.log(err);
				})
			},
			// 获取主体信息
			loadGroupInfo() {
				if (!this.g_sn) return;
				this.loadingLayout = true;
				getShopGroup({g_sn: this.g_sn}).then(res => {
					this.loadingLayout = false;
					if (res.state !== 0) {
						this.$alert(res.msg, '提示', {
							confirmButtonText: '确定'
						});
						return;
					};
					let data = res.data;
					this.radio = data.type;
					this.msg = data.r_name;
					this.formShop2 = {
						name: data.c_name,
						phone: data.c_tel,
						wechat: data.wx,
						qq: data.qq
					}
				})
			}
		},
		mounted() {
			if (this.$route.query.g_sn) {
				this.g_sn = this.$route.query.g_sn;
				this.loadGroupInfo();
			}
		}
	}
</script>

<style scoped lang="less">
	.shop-info {
		padding: 10px;
		.title {
			padding: 5px 0;
			font-weight: bold;
		}
		.right-button {
			text-align: right;
		}
		.btn-save {
			margin-left: 120px;
		}
		.topicMsg {
			margin-left: 20px;
		}
	}
	.avatar-uploader {
		.el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			&::hover {
				border-color: #20a0ff;
			}
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
	}
</style>