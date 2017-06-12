<template>
	<section id="customer-admin">
		<el-row type="flex" justify="end">
			<el-button type="primary">添加客户</el-button>
		</el-row>
		<el-form :model="formCustomer" :inline="true" class="formCustomer">
			<el-form-item label="手机号码：">
				<el-input placeholder="请输入手机号码"></el-input>
			</el-form-item>
			<el-form-item label="微信昵称：">
				<el-input placeholder="请输入微信昵称"></el-input>
			</el-form-item>
			<el-form-item label="所属店铺：">
				<el-select placeholder="选择店铺" v-model="formCustomer.shop">
					<el-option v-for="item in shopOptions" :key="item" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<br />
			<el-form-item label="购买次数：">
				<el-select placeholder="请选择" v-model="formCustomer.buyCount">
					<el-option v-for="item in buyCountOptions" :key="item" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-input placeholder="请输入次数" style="width: 100px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">筛选</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="userList">
			<el-table-column prop="user_name" label="姓名"></el-table-column>
			<el-table-column prop="mobile" label="手机号码"></el-table-column>
			<el-table-column prop="wechat" label="微信号/微信昵称">
				<template scope="scope">
					<span>{{scope.row.wx_code}}</span>/<span>{{scope.row.wx_name}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="buy_num" label="购买次数">

			</el-table-column>
			<el-table-column prop="shop" label="所属店铺"></el-table-column>
			<el-table-column prop="status" label="状态"></el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small">{{scope.row.delete}}</el-button>
					<el-button type="text" size="small">{{scope.row.statusChange}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row type="flex" justify="end" class="page">
			<el-pagination :page-size="20" :total="100" :current-page="currentPage" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper"></el-pagination>
		</el-row>
	</section> 
</template>

<script>
    import { getCustomerList } from 'api';
	export default {
		data() {
			return {
				userList:[],

				shopOptions: [{
					label: '店铺1',
					value: 1
				}, {
					label: '店铺2',
					value: 2
				}],
				buyCountOptions: [{
					label: '大于',
					value: 1
				}, {
					label: '等于',
					value: 2
				}, {
					label: '小于',
					value: 3
				}],
				formCustomer: {
					shop: [],
					buyCount: [],
				},
				customerData: [{
					name: '李天奇',
					phone: '13800138000',
					wechat: 'Siwf / 米兰',
					buyCount: 12,
					shop: '阿文花店',
					status: '正常',
					delete: '删除',
					statusChange: '冻结',
				}, {
					name: '李天奇',
					phone: '13800138000',
					wechat: 'Siwf / 米兰',
					buyCount: 12,
					shop: '阿文花店',
					status: '已冻结',
					delete: '删除',
					statusChange: '解除冻结',
				}],
				currentPage: 1, //当前页
			}
		},
//		computed: {
//			statusChange: function() {
//				for(var i = 0; i < this.customerData.length; i++) {
//					if(this.customerData[i].status === '正常') {
//						console.log(this.customerData[i].status, this.customerData.scope);
//						this.shopStatus = 0;
//						return '冻结';
//					}else {
//						this.shopStatus = 1;
//						return '解除冻结';
//					}
//				}
//			}
//		},
		methods: {
			alertBox(res){
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			getUserList() {
				 getCustomerList().then((result) => {
					 if (!this.alertBox(result)) return;
                    this.userList = result.data.data;
                });
			}
		},
		mounted() {
			this.getUserList();
		}
	}
</script>

<style scoped lang="less">
	#customer-admin {
		.formCustomer {
			background: #E5E9F2;
			padding: 22px 40px 0;
			margin: 10px 0;
		}
		.page {
			margin-top: 20px;
		}
	}
</style>