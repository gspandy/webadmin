<template>
	<section id="shop-withdraw">
		<el-form :model="formWithdraw" :inline="true" label-width="120px">
			<el-form-item label="提现金额：">
				<el-input placeholder="输入提现金额" class="withdraw-input"></el-input>
				可提现余额 <b>3032.23</b> （不可用余额 700.00 元）
			</el-form-item>
			<br />
			<el-form-item label="收款账号：">
				<el-select placeholder="请选择" v-model="formWithdraw.accountType" style="width: 100px" @visible-change="accountChange">
					<el-option v-for="item in typeOptions" :key="item" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-input placeholder="请输入账号" class="withdraw-input"></el-input>
			</el-form-item>
			<br />
			<el-form-item label="支行信息：" v-if="accountDetail">
				<el-input placeholder="如：中国银行广州天河支行" class="withdraw-input"></el-input>
			</el-form-item>
			<el-form-item label="主体/姓名：" v-if="accountDetail">
				<el-input placeholder="请输入主体/姓名" class="withdraw-input"></el-input>
			</el-form-item>
			<br />
			<el-form-item label="联系人手机号：">
				<el-input placeholder="请输入手机号" class="withdraw-input"></el-input>
				<el-button>获取验证码</el-button>
				（如号码有误，请联系客服）
			</el-form-item>
			<br />
			<el-form-item label="短信验证码：">
				<el-input class="withdraw-input"></el-input>
			</el-form-item>
			<br />
			<el-form-item>
				<el-button size="large" type="primary" class="btn-confirm">确定</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				typeOptions: [{
					value: 'bank',
					label: '银行卡'
				}, {
					value: 'wechat',
					label: '微信'
				}, {
					value: 'alipay',
					label: '支付宝'
				}],
				formWithdraw: {
					accountType: [],
				},
				accountDetail: false,
			}
		},
		methods: {
			accountChange() {
				for(var i = 0; i < this.typeOptions.length; i++) {
					if(this.typeOptions[i].value === 'bank') {
						console.log(this.typeOptions[i]);
						this.accountDetail = true;
					}else {
						this.accountDetail = false;
					}
				}
			},
		},
//		mounted: {}
	}
</script>

<style scoped lang="less">
	#shop-withdraw {
		.withdraw-input {
			width: 200px;
			margin-right: 10px;
		}
		.btn-confirm {
			margin-left: 120px;
			width: 200px;
		}
	}
</style>