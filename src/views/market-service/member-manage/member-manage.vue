<template>
    <section class="men-manager-section">
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="filterForm"
                     class="demo-form-inline">
                <el-form-item label="会员卡名称">
                    <el-input v-model="filterForm.activeName"
                              placeholder="输入会员卡名称"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="filterForm.activeState"
                               placeholder="全部">
                        <el-option label="结束"
                                   value="结束"></el-option>
                        <el-option label="进行中"
                                   value="进行中"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="onSubmit">筛选</el-button>
                </el-form-item>
                <el-button type="primary"
                           class="fr">添加新会员卡</el-button>
            </el-form>
        </el-col>
        <!--列表-->
        <el-col :span="24">
            <el-table class="customer-tabel center"
                      :data="tableData"
                      style="width: 100%">
                <el-table-column label="会员卡名称"
                                 width="180">
                                 <template scope="scope">
                                    <span style="text-decoration:underline">{{scope.row.name}}</span>
                                 </template>
                </el-table-column>
                <el-table-column prop="time"
                                 label="有效期"
                                 min-width="180"
                                 header-align="center"
                                 align="center">
                </el-table-column>
                <el-table-column prop="product"
                                 label="人数">
                                 <template scope="scope">
                                    <span style="text-decoration:underline">人数</span>
                                 </template>
                </el-table-column>
                <el-table-column prop="price"
                                 label="会员权益">
                </el-table-column>
                <el-table-column prop="handle"
                                 label="操作">
                    <template scope="scope">
                        <el-button type="text"
                                   size="small">编辑</el-button>
                         <el-button type="text"
                                   size="small">发送</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <!--分页-->
        <el-col :span="24">
            <el-pagination class="fr tabel-pagination"
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

<style>
    .men-manager-section .fr {
        float: right;
    }
    .men-manager-section .tabel-pagination {
            margin: 50px 0;
    }
    .men-manager-section .center {
        text-align: center!important;
    }
    .men-manager-section .customer-tabel .cell {
        text-align: center;
    }
</style>