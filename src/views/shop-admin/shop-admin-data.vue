
<style lang="less">
	@import '~less_defined';
    .shop-list{
        .tool-bar{
            .right-button{
                text-align: right;
            }
        }
        .list-table {
            .cell {
                padding: 10px;
                &,
                img{
                    width: 100%;
                }
                .price{
                    color:red;
                }
                button{
                    margin: 0px;
                }
                > .el-input-number{
                    width: auto;
                    padding-top:8px;
                }
            }
        }
        .page-area{
            padding: 50px 0px;
            text-align: right;
        }
        .btn-save {
            text-align: right;
            margin-left: 80%;
        }
    }
</style>
<template>
    <section class="shop-list">
        <!--工具条 v-loading="loadingLayout"-->
		<el-col :span="24" class="tool-bar" style="padding-bottom: 0px;">
            <el-row>
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true" :model="formShopList">
                        <el-form-item label="手机号码：">
                            <el-input v-model="formShopList.phone" placeholder="15083967087"></el-input>
                        </el-form-item>
                        <el-form-item label="店铺名称：">
                            <el-input v-model="formShopList.name" placeholder="花花"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="formShopList.status" placeholder="请选择">
                            	<el-option label="待审核" value="0"></el-option>
                                <el-option label="已开通" value="1"></el-option>
                                <el-option label="已过期" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getFilterList">确认筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
		</el-col>
        <!-- 商品列表 -->
		<el-table :row-class-name="'list-table'" :data="shopList" highlight-current-row style="width: 100%;">
			<el-table-column prop="shop_name" label="店铺名称">
			</el-table-column>
			<el-table-column prop="contact_user" label="联系人">
			</el-table-column>
			<el-table-column prop="contact_tel" label="手机号码">
			</el-table-column>
            <el-table-column prop="status" label="状态" sortable>
			</el-table-column>
            <el-table-column prop="shop_sn" label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="editor(scope.row.shop_sn)">编辑</el-button>
                    <el-dialog title="编辑店铺信息" v-model="dialogVisible" @close="closeEdit" size="large">
                        <el-form :model="form" :rules="rules" ref="formShopMsg" :inline="true" label-width="160px">
                            <el-form-item prop="m_user_name" label="店长：">
                                <!--<el-input placeholder="输入店长" v-model="form.manager_user_id"></el-input>-->
                                {{form.m_user_name}}
                            </el-form-item>
                            <el-form-item prop="s_name" label="店铺名称：">
                                <el-input placeholder="月上花店" v-model="form.s_name"></el-input>
                            </el-form-item>
                            <el-form-item prop="g_type" label="主体信息：">
                                <!--<el-radio-group v-model="form.g_type">
                                    <el-radio :label="1">个人</el-radio>
                                    <el-radio :label="2">企业</el-radio>
                                </el-radio-group>-->
                                <el-row>
                                    <el-col :span="24" v-model="mapList">
                                        ( {{mapList[form.g_type - 1]}} )
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item prop="g_name" label="组织名称:">
                                {{form.g_name}}
                            </el-form-item>
                            <br />

                            <el-form-item prop="contact" label="联系人：">
                                <el-input placeholder="输入联系人姓名" v-model="form.contact"></el-input>
                            </el-form-item>
                            <el-form-item prop="tel" label="联系人手机号：">
                                <el-input placeholder="输入联系人手机号" v-model="form.tel"></el-input>
                            </el-form-item>
                            <br />

                            <el-form-item prop="wx" label="联系人微信号：">
                                <el-input placeholder="输入联系人微信号" v-model="form.wx"></el-input>
                            </el-form-item>
                            <el-form-item prop="qq" label="联系人QQ号：">
                                <el-input placeholder="输入联系人QQ号" v-model="form.qq"></el-input>
                            </el-form-item>
                            <br />

                            <el-form-item prop="logo" label="店铺logo：">
                                <img-upload :preinstall-images="goods" @imgChange="onImgChange"></img-upload>
                                <!--<el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="form.logo" :src="form.logo" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>-->
                            </el-form-item>
                            <br />

                            <el-form-item prop="t_desc" label="店铺简介：">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.t_desc"></el-input>
                            </el-form-item>
                            <br />
                            <el-form-item prop="address_name" label="自提点：">
                                <el-input placeholder="输入自提点" v-model="form.address_name"></el-input>
                            </el-form-item>
                            <br />
                            <el-form-item prop="address" label="自提地址：">
                                <el-input placeholder="输入自提地址" v-model="form.address"></el-input>
                            </el-form-item>
                            <br />
                            <el-form-item prop="created" label="创建时间：">
                                {{form.created}}
                            </el-form-item>
                            <br />
                            <el-form-item prop="e_time" label="到期时间：">
                                <el-date-picker
                                    v-model="form.e_time"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                                </el-date-picker>
                            </el-form-item>
                            <br />

                            <el-form-item class="btn-save">
                                <el-button @click="onSubmit('formShopMsg')" type="primary">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
				</template>
			</el-table-column>

		</el-table>
        <!-- 分页 -->
        <div class="page-area">
            <el-pagination
                :current-page="page.currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="4000">
            </el-pagination>
        </div>
    </section>
</template>
<script>
    import { mapGetters } from 'vuex';
    import imgUpload from '../../components/upload-img.vue';
	import { uploadShopsImg, getShopList, getShopAdmin, editShopAdmin, getManager } from 'api';
    export default {
        data() {
            return {
                loadingLayout: false,
                dialogVisible: false,
                shopList: [],
                page: {
                    currentPage: 1
                },
                formShopList: { // bar数据
                    phone: '',
                    name: '',
                    status: '', // 0-待审核，1-已开通，2-已过期
                },
                form: {},
                mapList: ['个人', '企业'],
                logoImg:[],
                goods: [],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                rules: {
                    // manager_user_id: [
					// 	{ required: true, message: '请输入店长', trigger: 'blur' },
					// ],
					s_name: [
						{ required: true, message: '请输入店铺名称', trigger: 'blur' },
					],
					g_name: [
						{ required: true, message: '请输入主题信息', trigger: 'blur' },
					],
					// e_time: [
					// 	{ required: true, message: '请选择到期时间', trigger: 'blur' },
					// ],
					t_desc: [
						{ required: true, message: '请输入店铺简介', trigger: 'blur' },
					],
					address_name: [
						{ required: true, message: '请输入自提点', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入自提地址', trigger: 'blur' },
					],
					contact: [
						{ required: true, message: '请输入联系人名字', trigger: 'blur' },
					],
					tel: [
						{ required: true, message: '请输入联系人手机号', trigger: 'blur' },
						{ min: 11, max: 11, message: '手机号码为11位数字', trigger: 'blur' }
					],
					wx: [
						{ required: true, message: '请输入联系人微信号', trigger: 'blur' }
					],
					qq: [
						{ required: true, message: '请输入联系人QQ号', trigger: 'blur' }
					]
				}
            }
        },
        components: {
        	imgUpload
        },
        methods: {
            ...mapGetters(['getLoginToken']),
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
			},
            closeEdit() {
                this.goods = [];
            },
            getShopList(){
                this.loadingLayout = true;
                getShopList().then(res => {
                    // console.log(res);
                	if (res.state !== 0) {
                        this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定'
                        });
                        return;
                    }
                    this.shopList = res.data.list;
                    for(var i = 0; i < this.shopList.length; i++) {
                    	if(this.shopList[i].status === 0) {
                    		this.shopList[i].status = '待审核';
                    	}else if(this.shopList[i].status === 1) {
                    		this.shopList[i].status = '已开通';
                    	}else if(this.shopList[i].status === 2) {
                    		this.shopList[i].status = '已过期';
                    	}
                    }
                    this.loadingLayout = false;
                }, err => {
                	console.log(err);
                });
            },
            // 筛选
            getFilterList() {
            	var shopData = this.shopList.filter(item => {
            		return this.formShopList.phone == item.contact_tel || this.formShopList.name == item.shop_name || this.formShopList.status == item.status;
            	});
            	this.shopList = shopData;
            	console.log(this.shopList, shopData);
        		if(this.formShopList.phone === '' && this.formShopList.name === '' && this.formShopList.status === '') {
	        		this.$alert('请输入查询信息', '提示：', {
	                    confirmButtonText: '确定'
	                });
	                this.getShopList();
	            }else if (this.shopList.length === 0) {
	            	this.$alert('无数据', '提示：', {
	                    confirmButtonText: '确定'
	                });
	                this.getShopList();
	            }
            },
            editor(shop_sn) {
                // console.log(this.dialogVisible)
                this.dialogVisible = true;
                // console.log(this.dialogVisible)
                const params = {
                    s_sn: shop_sn.toString()
                };
                getShopAdmin(params).then((res) => {
                    if (res.state !== 0) {
                        this.$message({
                            message: '出错',
                            type: 'error'
                        });
                    } else if (res.state === 0) {
                        this.form = res.data.data;
                        this.form.e_time = this.formatTime(this.form.e_time);
                        this.form.created = this.formatTime(this.form.created);
                        this.goods.push({
                            url: this.form.logo
                        });
                        console.log('goods', this.goods);
                        console.log('form edit', this.form);
                        this.getManager();
                    }
                });
            },
            getManager() {
                getManager().then((res) => {
                    console.log('res', res);
                })
            },
            formatTime(time) {
                const kaka = new Date(time * 1000);
                console.log('kaka', kaka);
                return kaka.getFullYear() + '-' + this.zero(kaka.getMonth() + 1 + '') + '-' + this.zero(kaka.getDate() + '');
            },
            zero(time) {
                if (time.length < 2) {
                    return '0' + time;
                }
                return time;
            },
            convertTime(time) {
                const kaka = new Date(time);
                return kaka.getTime() / 1000;
            },
            // changeDate() {
            //     this.form.e_time = this.formatTime(this.form.e_time);
            // },
            editorComfirm(formShopMsg) {
                this.$refs[formShopMsg].validate((valid) => {
					if (valid) {
                        const params = {
                            s_sn: this.form.s_sn,
                            s_name: this.form.s_name,
                            e_time: this.convertTime(this.form.e_time),
                            logo: this.form.logo,
                            desc: this.form.t_desc,
                            invite_name: this.form.address_name,
                            invite_address: this.form.address,
                            c_name: this.form.contact,
                            c_tel: this.form.tel,
                            wx: this.form.wx,
                            qq: this.form.qq
                        };
                        console.log('this.convertTime(this.form.e_time)', this.convertTime(this.form.e_time));
                        console.log('this.form.e_time', this.form.e_time);
                        editShopAdmin(params).then((res) => {
                            if (res.state != 0) {
                                this.$message({
                                    message: '修改失败！',
                                    type: 'error'
                                });
                            } else if (res.state === 0) {
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                this.form = {}; // 清空表单数据
                                this.getShopList(); // 更新列表
                                this.dialogVisible = false;  // 隐藏表单
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
            },
            
            // 修改表单提交
            async onSubmit(formShopMsg) {
                if(this.logoImg.length > 0) {
					await this.uploadImg();
				}
				this.editorComfirm(formShopMsg); // 提交表单
                this.goods = [];
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

					uploadShopsImg(formdata).then((res) => {
						console.log('shop-admin');
						this.form.logo = res.data.img;
						resolve();
					},
					err => {});
				});
			}
        },
        mounted() {
            this.getShopList();
        }
    }
</script>
