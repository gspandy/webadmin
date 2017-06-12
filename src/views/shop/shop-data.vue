// 店铺基本信息
// author：chenzhengquan(mewhat)
// 2017-05-04
<template>
    <section class="shop-data">
    	<!--店铺信息-->
        <el-row type="flex" justify="space-between" class="data-1">
            <el-col :span="2">
        		<img class="img-shop" src="static/14.jpg"/>
            </el-col>
            <el-col :span="11" :offset="1" class="pos-rel">
            	<div>店铺名称：<span>鲜花说自营旗舰店</span></div>
            	<div>店铺介绍：<span>XXXXXXXXX</span></div>
            	<div>联系电话：<span>138XXXXXXXX</span></div>
            	<div class="border"></div>
            	<div class="edit" @click="editName"><i class="el-icon-edit"></i></div>
            </el-col>
            <el-col :span="5" class="text">
            	<el-row class="bold">xx</el-row>
            	<el-row>在售商品数</el-row>
            </el-col>
            <el-col :span="5" class="text">
            	<el-row class="bold">xx</el-row>
            	<el-row>总用户数</el-row>
            </el-col>
        </el-row>
        <!--订单详情-->
        <el-row class="data-2">
        	<el-col :span="4" class="text">
        		<el-row class="bold">xx</el-row>
        		<el-row>今日订单数</el-row>
        	</el-col>
        	<el-col :span="4" class="text pos-rel">
        		<el-row class="bold">xx</el-row>
        		<el-row>今日订单金额</el-row>
        		<div class="border"></div>
        	</el-col>
        	<el-col :span="4" class="text">
        		<el-row class="bold">xx</el-row>
        		<el-row>7日订单数</el-row>
        	</el-col>
        	<el-col :span="4" class="text">
        		<el-row class="bold">xx</el-row>
        		<el-row>7日订单总金额</el-row>
        	</el-col>
        	<el-col :span="4" class="text">
        		<el-row class="bold">xx</el-row>
        		<el-row>7日客单价</el-row>
        	</el-col>
        	<el-col :span="4" class="more text">
        		<a href="###">查看更多&gt;&gt;</a>
        	</el-col>
        </el-row>
        <!--新增用户-->
        <el-row class="data-3">
        	<el-col :span="4" class="text">
        		<el-row class="bold">xx</el-row>
        		<el-row>今日新增用户数</el-row>
        	</el-col>
        	<el-col :span="4" class="text">
        		<el-row class="bold">xx</el-row>
        		<el-row>7日新增用户</el-row>
        	</el-col>
        </el-row>
    </section>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			editName() {
				this.$router.push('./shop-info');
			}
		}
	}
</script>

<style scoped lang="less">
	.pos-rel{
		position: relative;
	}
	.text{
		text-align: center;
		padding-top: 14px;
	}
	.bold{
		font-weight: bold;
	}
	a{
		text-decoration: none;
	}
	.shop-data {
		height: auto;
		width: 100%;
		margin-top: 10px;
		.data-1, .data-2, .data-3 {
			height: 100px;
			margin-bottom: 10px;
			line-height: 26px;
			padding: 10px;
			background: #EFF2F7;
			box-sizing: border-box;
		}
		.border {
			height: 80px;
			border-right: 1px solid #ccc;
			position: absolute;
			right: 0;
			top: 0;
		}
		.data-1 {
			.img-shop {
				width: 80px;
				height: 80px;
				margin-left: 10px;
			}
			.edit {
				position: absolute;
				right: 20px;
				top: 0;
			}
		}
		.data-2 {
			.more a{
				line-height: 52px;
			}
		}
	}
</style>