<template>
    <section class="used-section">
        <el-table :data="tableData"
                  style="width: 100%">
                  <el-table-column prop="address"
                             label="客户">
            </el-table-column>
            <el-table-column prop="address"
                             label="领取时间">
            </el-table-column>
            <el-table-column prop="address"
                             label="使用时间">
            </el-table-column>
            <el-table-column prop="address"
                             label="订单号">
            </el-table-column>
            <el-table-column prop="address"
                             label="订单金额">
            </el-table-column>
            <el-table-column prop="address"
                             label="优惠券">
            </el-table-column>
        </el-table>
    </section>
</template>

  <script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
}
</script>

<style>
    .used-section {
        margin-top: 10px;
    }
</style>