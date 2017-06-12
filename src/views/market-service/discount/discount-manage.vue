<template>
    <section class="dsicount-section">
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="filterForm"
                     class="demo-form-inline">
                <el-form-item label="会员卡名称">
                    <el-input v-model="filterForm.activeName"
                              placeholder="优惠券名称:"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
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
                           class="fr">添加新优惠券</el-button>
            </el-form>
        </el-col>
        <!--列表-->
        <el-col :span="24">
            <el-table class="customer-tabel center"
                      :data="tableData"
                      style="width: 100%">
                <el-table-column prop="name"
                                 label="优惠券名称">
                </el-table-column>
                <el-table-column prop="time"
                                 label="价值(元)">
                </el-table-column>
                <el-table-column prop="product"
                                 label="领取限制">
                </el-table-column>
                <el-table-column prop="price"
                                 min-width="300"
                                 header-align="center"
                                 align="center"
                                 label="有效期">
                </el-table-column>
                <el-table-column prop="price"
                                 label="领取人/次">
                </el-table-column>
                <el-table-column prop="price"
                                 label="已使用数">
                </el-table-column>
                <el-table-column prop="price"
                                 label="状态">
                </el-table-column>
                <el-table-column prop="handle"
                                 min-width="120"
                                 header-align="center"
                                 align="center"
                                 label="操作">
                    <template scope="scope">
                        <el-button type="text"
                                   size="small">编辑</el-button>
                        <el-button type="text"
                                   size="small" @click="dialogFormVisible=true">发送</el-button>
                        <img src=""
                             class="qr-code" />
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
        <!--弹窗-->
        <el-dialog title="发送"
                   v-model="dialogFormVisible"
                   class="add-label-dialog">
            <el-form :inline="true">
                <el-input placeholder="输入用户手机号码"
                          icon="search"
                          v-model="searchInput"
                          :on-icon-click="handleIconClick">
                </el-input>
                <el-checkbox-group class="search-checkbox"
                                   v-model="searchChecked">
                    <el-checkbox v-for="item in searchInfo"
                                 :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
                <div class="btn-item label-btn-item fr">
                    <el-button type="primary"
                               @click="searchFormSubmit">发送</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
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
            dialogFormVisible: false,
            searchInfo:['上海', '北京', '广州', '深圳'],
            searchChecked:[],
            searchInput: '',
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
        },
        searchFormSubmit() {
            this.$message({
                message: '发送成功',
                type: 'success'
            });
            this.dialogFormVisible = false;
        },
        handleIconClick(ev) {
            console.log(ev);
        },
    }
}
</script>

<style>
    .dsicount-section img.qr-code {
        width: 25px;
        height: 25px;
        background: #353535;
        float: right
    }

    .fr {
        float: right;
    }

    .dsicount-section .tabel-pagination {
        margin: 50px 0;
    }
    .dsicount-section .add-label-dialog .el-dialog--small {
        width: 25%;
        min-width: 480px;
    }
    .dsicount-section .search-checkbox label {
        display: block;
        margin-left: 0!important;
        margin: 10px 0;
    }
    .dsicount-section .label-btn-item {
        margin-bottom: 20px;
    }
</style>