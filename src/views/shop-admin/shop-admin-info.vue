<template>
	<section class="shop-info">
		<el-form :model="formShop" :rules="rules" ref="formShopMsg" :inline="true" label-width="160px">
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
			<el-form-item prop="storeName" label="店铺名称：">
				<el-input placeholder="店铺名称：" v-model="formShop.storeName"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="manager_user_select" label="店长：">
				<!--<el-input placeholder="店长" v-model="formShop.manager_user_select"></el-input>-->
				<el-select v-model="formShop.manager_user_select" placeholder="选择店长">
					<el-option
						v-for="item in options"
						:key="item.user_id"
						:label="item.user_name"
						:value="item.user_id">
					</el-option>
				</el-select>
			</el-form-item>
			<br />
			<el-form-item prop="themeMsg" label="主体信息：">
				<el-row>
					<el-col :span="24" v-model="mapList">
						 ( {{mapList[type - 1]}} )  {{themeMsg}}
					</el-col>
				</el-row>
			</el-form-item>
			<br />
			<el-form-item prop="endTime" label="店铺有效期至：">
				<el-date-picker
					v-model="formShop.endTime"
					format="yyyy-MM-dd"
					type="date"
					placeholder="选择店铺有效期">
				</el-date-picker>
			</el-form-item>
			<br />
			<el-form-item prop="imageUrl" label="店铺logo：">
				<img-upload @imgChange="onImgChange"></img-upload>
				<!--<el-upload
					class="avatar-uploader"
					action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="formShop.imageUrl" :src="formShop.imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>-->
			</el-form-item>
			<br />
			<el-form-item prop="textarea" label="店铺简介：">
				<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formShop.textarea"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="takeName" label="自提点：">
				<el-input placeholder="输入自提点" v-model="formShop.takeName"></el-input>
			</el-form-item>
			<br />
			<!--<el-form-item prop="takeAddress" label="自提地址：">-->
			<el-form-item label="自提地址：">
				<el-input placeholder="输入自提地址" v-model="formShop.takeAddress"></el-input>
			</el-form-item>
			<br />
			<!--联系人信息-->
			<el-row>
				<el-col :span="24" class="title">
					联系人信息
				</el-col>
				<hr />
			</el-row>
			<el-form-item prop="name" label="联系人：">
				<el-input placeholder="输入联系人姓名" v-model="formShop.name"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="phone" label="联系人手机号：">
				<el-input placeholder="输入联系人手机号" v-model="formShop.phone"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="wechat" label="联系人微信号：">
				<el-input placeholder="输入联系人微信号" v-model="formShop.wechat"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="qq" label="联系人QQ号：">
				<el-input placeholder="输入联系人QQ号" v-model="formShop.qq"></el-input>
			</el-form-item>
			<br />
			<el-form-item class="btn-save">
				<el-button :disabled="saveDis" @click="onSubmit('formShopMsg')" type="primary">保存</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script>
	import { uploadShopsImg, getListAdmin, addGroupAdmin, addShopAdmin, getManager } from 'api';
	import imgUpload from '../../components/upload-img.vue';
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				formShop: {
					storeName: '',
					manager_user_select: '',
					endTime: '',
					imageUrl: '',
					textarea: '',
					takeName: '',
					takeAddress: '',
					
					name: '',
					phone: '',
					wechat: '',
					qq: ''
				},
				logoImg:[],
				options: [],
				mapList: ['个人', '企业'],
				type: 1,
				group_sn: '',
				themeMsg: '',
				mainBodyData: {},
				rules: {
					storeName: [
						{ required: true, message: '请输入店铺名称', trigger: 'blur' },
					],
					// manager_user_select: [
					// 	{ required: true, message: '请输入店长', trigger: 'blur' },
					// ],
					// themeMsg: [
					// 	{ required: true, message: '请输入主题信息', trigger: 'blur' },
					// ],
					endTime: [
						{ type: 'date', required: true, message: '请输入店铺有效期', trigger: 'blur' },
					],
					// imageUrl: [
					// 	{ required: true, message: '请输入联系人名字', trigger: 'blur' },
					// ],
					textarea: [
						{ required: true, message: '请输入店铺简介', trigger: 'blur' },
					],
					takeName: [
						{ required: true, message: '请输入自提点', trigger: 'blur' },
					],
					takeAddress: [
						{ required: true, message: '请输入自提地址', trigger: 'blur' },
					],
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
						{ required: true, message: '请输入联系人QQ号', trigger: 'blur' }
					]
				},

				saveDis: false
			};
		},
		components: {
        	imgUpload
        },
		created() {
			
			// getListAdmin().then((res) => {
			// 	console.log('res', res);
			// });
			// this.group_sn = this.$store.state.group_sn;
			
			// this.themeMsg = this.$route.query.name;
			if (this.$route.query.g_sn) {
				this.initAddData();
			}
			console.log('gsn', this.group_sn);
			this.type = this.$store.state.type;
			this.getManager();
			// this.$store.commit('CODE', 0);// 重置code为0
		},
		methods: {
			...mapGetters(['getLoginToken', 'getSelectMainBody']),
			// 选择图片后回调
            onImgChange(img) {
                this.logoImg = img;
            },
			// 添加店铺初始化数据
			initAddData() {
				this.mainBodyData = this.getSelectMainBody();
				this.group_sn = this.$route.query.g_sn;
				if (this.mainBodyData.group_sn != this.group_sn) {
					this.mainBodyData = {};
					return;
				}
				this.formShop.name = this.mainBodyData.contact_user;
				this.formShop.phone = this.mainBodyData.tel;

				this.themeMsg = this.mainBodyData.group_represent;
			},

			getManager() {
				getManager().then((res) => {
					if (res.state === 0) {
						// this.$message({
						// 	message: 'success',
						// 	type: 'success'
						// });
						this.options = res.data;
					}
				})
			},
			// 保存
			save(formShopMsg) {
				this.$refs[formShopMsg].validate((valid) => {
					if (valid) {
						this.uploadImg();
						const date = this.formShop.endTime;
						// this.formShop.endTime = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
						this.formShop.endTime = date.getTime() / 1000 + '';
						const params = {
							g_sn: this.group_sn,
							s_name: this.formShop.storeName,
							manager_user_id: this.formShop.manager_user_select.toString(),
							e_time: this.formShop.endTime,
							logo: this.formShop.imageUrl,
							desc: this.formShop.textarea,
							invite_name: this.formShop.takeName,
							invite_address: this.formShop.takeAddress,

							c_name: this.formShop.name,
							c_tel: this.formShop.phone,
							wx: this.formShop.wechat,
							qq: this.formShop.qq
						}
						addShopAdmin(params).then((res) => {
							if(res.state == 0) {
								this.$message({
									message: 'success',
									type: 'success'
								});
								this.formShop = {
									storeName: '',
									manager_user_select: '',
									themeMsg: '',
									endTime: '',
									imageUrl: '',
									textarea: '',
									takeName: '',
									takeAddress: '',
									
									name: '',
									phone: '',
									wechat: '',
									qq: ''
								};
								this.$router.push('./shop-admin-data');
							}
						});
					} else {
						this.$message({
							message: '输入信息有错误，请重新输入',
							type: 'error'
						});
						return false;
					}
				});
			},
			// 上上传图片
			uploadImg() {
				return new Promise((resolve) => {
					var formdata = new FormData();
					formdata.append('token', this.getLoginToken());
					formdata.append('shop_logo', this.logoImg[0]);

					uploadShopsImg(formdata).then((res) => {
						console.log('goods');
						this.formShop.imageUrl = res.data.img;
						resolve();
					},
					err => {});
				});
			},

			// 提交表单
			async onSubmit(formShopMsg) {
				if(this.logoImg.length > 0) {
					await this.uploadImg();
				}
				this.save(formShopMsg); // 提交表单
			},

			handlePreview(file, fileList) {
				console.log(file, fileList);
			},
			handleRemove(file) {
				console.log(file);
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
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
