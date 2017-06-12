// 店铺基本信息
// author：chenzhengquan(mewhat)
// 2017-05-04
<template>
	<section class="shop-info" v-loading="pageLoading">
		<el-form :model="formShop" :inline="true" label-width="160px">
			<!--客户基本信息-->
			<el-row>
				<el-col :span="24" class="title">
					客户基本信息
				</el-col>
			</el-row>
			<hr />
			<el-form-item prop="s_name" label="店铺名称：">
				<el-input placeholder="店铺名称：" v-model="formShop.s_name" @focus="focusInput"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" @click="changeName">确定</el-button>
			</el-form-item>
			<el-form-item>
				<el-button size="small" @click="cancelName">取消</el-button>
			</el-form-item>
			<el-form-item>
				<a href="javascript:;" @click="onGetShopQr" class="download-qr-btn">下载店铺二维码</a>
			</el-form-item>
			<br />
			<el-form-item prop="g_type" label="主体信息：">
				( {{mapList[formShop.g_type - 1]}} )
			</el-form-item>
			<el-form-item prop="g_name">
				{{formShop.g_name}}
			</el-form-item>
			<br />
			<el-form-item prop="created" label="创建时间：">
				{{formShop.created}}
			</el-form-item>
			<br />
			<el-form-item prop="e_time" label="店铺有效期至：">
				{{formShop.e_time}}
			</el-form-item>
			<br />
			<el-form-item label="店铺logo：">
				<img-upload :preinstall-images="goods" @imgChange="onImgChange"></img-upload>
				<!--<el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" list-tpye="picture" multiple="false">
					<el-button size="mini" type="primary" class="btn-add">添加</el-button>
				</el-upload>-->
			</el-form-item>
			<br />
			<el-form-item prop="t_desc" label="店铺简介：">
				<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formShop.t_desc"></el-input>
			</el-form-item>
			<br />
			<el-form-item prop="address_name" label="自提点：">
				{{formShop.address_name}}
			</el-form-item>
			<br />
			<el-form-item prop="address" label="自提地址：">
				{{formShop.address}}
			</el-form-item>
			<br />
			<!--联系人信息-->
			<el-row>
				<el-col :span="24" class="title">
					联系人信息
				</el-col>
				<hr />
			</el-row>
			<el-form-item prop="contact" label="联系人：">
				{{formShop.contact}}
			</el-form-item>
			<br />
			<el-form-item prop="tel" label="联系人手机号：">
				{{formShop.tel}}
			</el-form-item>
			<br />
			<el-form-item prop="wx" label="联系人微信号：">
				{{formShop.wx}}
			</el-form-item>
			<br />
			<el-form-item prop="qq" label="联系人QQ号：">
				{{formShop.qq}}
			</el-form-item>
			<br />
			<el-form-item class="btn-save">
				<el-button @click="onSubmit" type="primary">保存</el-button>
			</el-form-item>
		</el-form>
		<!-- 选择标签 -->
        <el-dialog title="下载商品二维码" size="small" v-model="downloadQrCodeDialog">
			<div class="qr-code-hit">你确定要下载店铺的二维码吗？</div>
            <div class="qr-code-box">
                <a class="el-button" href="javascript:;" @click="downloadQrCodeDialog = false">取消</a>
                <a class="el-button el-button--primary" :href="qr_url" target="_blank" :download="Date.now() + '_' + qr_url.split('/').pop()">下载</a>
            </div>
        </el-dialog>
	</section>
</template>

<script>
	import { uploadImgShop, getShopQr, getShop, editShop, alertName } from 'api';
	import { mapGetters } from 'vuex';
    import imgUpload from '../../components/upload-img.vue';
	export default {
		data() {
			return {
				mapList: ['个人', '企业'],
				formShop: {},
				input: '',
				logoImg:[],
                goods: [],
				downloadQrCodeDialog: false,
				qr_url: '',
				pageLoading: false,
				s_sn: '11006'//'8005'
			};
		},
		created() {
			this.getShop();
		},
		components: {
        	imgUpload
        },
		methods: {
			...mapGetters(['getLoginToken']),
			alertBox(res){
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },
			focusInput() {
				this.input = this.formShop.s_name;
				console.log(this.input);
			},
			// 获取二维码
			onGetShopQr() {
				this.pageLoading = true;
				getShopQr()
				.then(res => {
					this.pageLoading = false;
					if (!this.alertBox(res)) return;
					this.downloadQrCodeDialog = true;
					this.qr_url = res.data.show_img;
				},
				err => {
					this.pageLoading = false;
				});
			},
			changeName() {
				const params = {
					s_sn: this.s_sn,
					s_name: this.formShop.s_name
				};
				alertName(params).then((res) => {
					if (res.state != 0) {
						this.$message({
							message: '修改出错',
							type: 'error'
						});
						return;
					} else if (res.state === 0) {
						this.$message({
							message: 'success',
							type: 'success'
						});
					}
				});
			},
			cancelName() {
				if (this.input != this.formShop.s_name) {
					this.formShop.s_name = this.input;
				}
			},
			getShop() {
				// const params = {
				// 	s_sn: this.s_sn
				// };
				getShop().then((res) => {
					// console.log(res);
					if (res.state != 0) {
						this.$message({
							message: '获取数据出错',
							type: 'error'
						});
						return;
					}
					else if (res.state === 0) {
						// this.$message({
						// 	message: 'success',
						// 	type: 'success'
						// });
						this.formShop = res.data;
						// console.log(this.formShop)
						this.formShop.e_time = this.formatTime(this.formShop.e_time);
                        this.formShop.created = this.formatTime(this.formShop.created);
						this.goods.push({
							url: this.formShop.logo
						});
						// console.log('this.formShop', this.formShop);
					}
				});
			},
			// 时间戳 -> 格式化日期
			formatTime(time) {
                const kaka = new Date(time * 1000);
                // console.log('kaka', kaka);
                return kaka.getFullYear() + '-' + this.zero(kaka.getMonth() + 1 + '') + '-' + this.zero(kaka.getDate() + '');
            },
			// 格式化月日 09-09
            zero(time) {
                if (time.length < 2) {
                    return '0' + time;
                }
                return time;
            },
			save() {
				const logo = this.formShop.logo;
				// console.log('logo2', logo);
				const desc = this.formShop.t_desc;
				// if (logo == '' || desc == '') {
				if (desc == '') {
					this.$message({
						message: 'logo或者详情不能为空',
						type: 'error'
					});
					return;
				} else {
					const params = {
						s_sn: this.s_sn,
						logo: logo,
						t_desc: desc
					};
					editShop(params).then((res) => {
						if (res.state != 0) {
							this.$message({
								message: '修改出错',
								type: 'error'
							});
							return;
						} else if (res.state === 0) {
							this.$message({
								message: 'success',
								type: 'success'
							});
						}
					})
				}
			},

			// 修改表单提交
            async onSubmit() {
                if(this.logoImg.length > 0) {
					await this.uploadImg();
				}
				this.save(); // 提交表单
            },
            onImgChange(img) {
                this.logoImg = img;
            },
            // 上上传图片
			uploadImg() {
				return new Promise((resolve) => {
					var formdata = new FormData();
					formdata.append('token', this.getLoginToken());
					formdata.append('shop_logo', this.logoImg[0]);

					uploadImgShop(formdata).then((res) => {
						console.log('shop');
						this.formShop.logo = res.data.img;
						console.log('logo', this.formShop.logo);
						resolve();
					},
					err => {});
				});
			},

			handlePreview(file, fileList) {
				console.log(file, fileList);
			},
			handleRemove(file) {
				console.log(file);
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
		.btn-save {
			margin-left: 120px;
		}
		.download-qr-btn {
			color: #0000ee;
			&:active{
				color: red;
			}
		}
	}
</style>
