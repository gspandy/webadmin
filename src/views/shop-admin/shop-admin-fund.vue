<template>
	<section class="shop-fund">
		<!--收入明细-->
		<el-row class="fund query">
			<el-col :span="6" class="weekIncome">
				<div>7天收入（截至今日0点）</div>
				<div><b>3732.23</b>元</div>
			</el-col>
			<el-col :span="2" class="detail">
				<a href="###">收支明细</a>
				<div class="border"></div>
			</el-col>
			<el-col :span="15" :offset="1" class="balance">
				<el-row>
					<el-col :span="24">
						<el-col :span="16">
							<div>可提现余额（不可用余额<span>700.00</span>元）</div>
							<div>
								<b>3032.23</b>元 
							</div>
						</el-col>
						<el-col :span="8">
							<el-button type="primary" size="large" class="withdraw">查看提现记录</el-button>
						</el-col>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<!--查询订单-->
		<el-row class="filter query">
			<el-col :span="24">
				<el-form :inline="true">
					<el-form-item label="创建时间：">
						<el-date-picker v-model="dateFrom" type="datetime" placeholder="请选择日期时间" size="small"></el-date-picker>
					</el-form-item label="至">
					<el-form-item label="至">
					 	<el-date-picker v-model="dateTo" type="datetime" placeholder="请选择日期时间" size="small"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button :plain="true" type="primary" size="small">近7天</el-button>
						<el-button type="text">近30天</el-button>
					</el-form-item>
					<br />
					<el-form-item　label="订单号：">
						<el-input size="small"></el-input>
					</el-form-item label="至">
					<el-form-item label="交易状态：">
						<el-select v-model="tradeStatus" placeholder="请选择" size="small">
							<el-option v-for="item in statusOptions" :key="item" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small">筛选</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<!--订单记录-->
		<el-row class="record">
			<el-col :span="2">交易记录</el-col>
			<el-col :span="2" offset="20">
				<el-button type="primary" size="small">导出记录</el-button>
			</el-col>
			<el-table class="detail" :data="recordData">
				<el-table-column prop="date" label="时间"></el-table-column>
				<el-table-column prop="type" label="类型"></el-table-column>
				<el-table-column prop="express" label="单号"></el-table-column>
				<el-table-column prop="amount" label="金额"></el-table-column>
				<el-table-column prop="status" label="状态"></el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination :current-page="currentPaage" :page-size="20" layout="total, prev, pager, next, jumper" :total="400" @current-change="handleCurrentChange"></el-pagination>
			</div>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				// 查询订单状态
				tradeStatus: '',
				statusOptions: [{
					label: '全部',
					value: 'All'
				},{
					label: '待付款',
					value: 'waitForPay'
				},{
					label: '待发货',
					value: 'waitForDelivery'
				},{
					label: '已发货',
					value: 'delivered'
				},{
					label: '已完成',
					value: 'complete'
				}],
				dateFrom: '',
				dateTo: '',
				recordData: [{
					date: '2017-04-11 11:48:42',
					type: '[买卖] - 我是花艺师，自由组合套餐',
					express: 'E20170411114824',
					amount: '+24.5',
					status: '进行中',
				},{
					date: '2017-04-03 11:48:42',
					type: '[买卖] - 我是花艺师，自由组合套餐',
					express: 'E20170411114824',
					amount: '+24.5',
					status: '进行中',
				},{
					date: '2017-02-01 11:48:42',
					type: '[买卖] - 我是花艺师，自由组合套餐',
					express: 'E20170411114824',
					amount: '+24.5',
					status: '进行中',
				}],
				currentPage: 1,
			}
		},
		methods: {
			// 分页
			handleCurrentChange(val) {
				this.currentPage = val;
			}
		}
	}
</script>

<style scoped lang="less">
	.shop-fund {
		a {
			text-decoration: none;
		}
		.query {
			background: #EFF2F7;
			height: 100px;
			padding: 10px;
			margin-top: 10px;
		}
		.fund {
			.weekIncome {
				line-height: 40px;
				text-align: center;
			}
			.detail {
				margin-top: 50px;
				position: relative;
				.border {
					border-right: 1px solid #ccc;
					height: 80px;
					position: absolute;
					top: -50px;
					right: 0;
				}
			}
			.balance {
				line-height: 40px;
				// .withdraw {
				// 	position: relative;
				// 	left: 100px;
				// }
			}
		}
		.filter {
			padding-left: 50px;
			.el-form-item {
				margin: 3px 5px 0;
			}
		}
		.record {
			margin-top: 10px;
			.page {
				margin-top: 10px;
				float: right;
			}
		}
	}
</style>