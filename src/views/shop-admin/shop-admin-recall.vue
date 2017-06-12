<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                <el-form-item label="创建时间：">
                    <el-date-picker
						v-model="value4"
						type="datetimerange"
						:picker-options="pickerOptions2"
						placeholder="选择时间范围"
						align="right">
					</el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="filterForm.activeState" placeholder="全部">
                        <el-option label="结束" value="结束"></el-option>
                        <el-option label="待付款" value="待付款"></el-option>
						<el-option label="待发货" value="待发货"></el-option>
						<el-option label="已发货" value="已发货"></el-option>
						<el-option label="已完成" value="已完成"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-col :span="24">
            <el-table class="customer-tabel center" :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="时间" width="180">
                </el-table-column>
                <el-table-column prop="time" label="金额" min-width="180" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="product" label="单号">
                </el-table-column>
                <el-table-column prop="price" label="收款账号">
                </el-table-column>
                <el-table-column prop="state" label="状态">
                </el-table-column>
            </el-table>
        </el-col>
        <!--分页-->
        <el-col :span="24">
            <el-pagination
				class="fr tabel-pagination"
				:page-size="100"
				layout="prev, pager, next, jumper"
				:total="1000">
            </el-pagination>
        </el-col>
    </section>
</template>
 
<script>
export default {
    data() {
        return {
			// 日期选择器数据
			pickerOptions2: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					picker.$emit('pick', [start, end]);
					}
				}]
				},
			value4: '',

            filterForm: {
                creatAt: '',
                creatEnd: '',
                activeName: '',
                activeState: ''
            },
            tableData: [
                {
                    name: 'zzy1',
                    time: '13992121391',
                    product: '小名',
                    price: 12,
                    type: '会员',
                    state: '进行中'
                },
                {
                    name: 'zzy2',
                    time: '13992121391',
                    product: '小名',
                    price: 12,
                    type: '会员',
                    state: '进行中'
                },
                {
                    name: 'zzy3',
                    time: '13992121391',
                    product: '小名',
                    price: 12,
                    type: '会员',
                    state: '进行中'
                }]
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>

<style scoped>
    .fr {
        float: right;
    }
    .tabel-pagination {
            margin: 50px 0;
    }
</style>