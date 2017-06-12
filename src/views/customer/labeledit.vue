<template>
    <article class="edit-article">
        <!--筛选-->
        <section class="filter-section">
            <el-row>
                <el-col :span="24"
                        class="toolbar"
                        style="padding-bottom: 0px;">
                    <el-form :inline="true"
                             :model="form"
                             class="demo-form-inline">
                        <el-form-item label="筛选:">
                            <el-input v-model="form.labelName"
                                      placeholder="输入标签名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                       @click="onSubmit">搜索</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary"
                               class="fr"
                               @click="$router.push('/customer/addlabel')">添加标签</el-button>
                </el-col>
            </el-row>
        </section>
        <!--tabel-->
        <section class="label-tabel">
            <el-table :data="tableData"
                      border
                      style="width: 100%"
                      header-align="center"
                      align="center">
                <!--<el-table-column type="selection"
                                 width="55">-->
                </el-table-column>
                <el-table-column prop="tag_name"
                                 label="标签名称"
                                 width="300">
                </el-table-column>
                <el-table-column prop="count"
                                 label="用户数"
                                 min-width="300">
                </el-table-column>
                <el-table-column prop="sort"
                                 label="排序号"
                                 width="300">
                </el-table-column>
                <el-table-column label="操作"
                                 width="100">
                    <template scope="scope">
                        <el-button @click="view(scope.row.tag_id)"
                                   type="text"
                                   size="small">查看</el-button>
                        <el-button type="text"
                                   size="small"
                                   @click.stop="deleteRow(scope.$index, scope.row.tag_id, tableData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--删除全部按钮,功能未开放-->
            <!--<el-col :span="24"
                    class="delete-btn"
                    v-show="tableData.length !== 0">
                <el-button type="text"
                           class="fl">删除</el-button>
            </el-col>-->
            <!--分页-->
            <el-col :span="24">
                <el-pagination class="fr tabel-pagination"
                               :page-size="100"
                               layout="prev, pager, next, jumper"
                               :total="1000">
                </el-pagination>
            </el-col>
        </section>
    </article>
</template>

<script>
import {getCustomerTagList, delCustomerTag} from 'api';
export default {
    data() {
        return {
            form: {
                labelName: ''
            },
            tableData: [],
            multipleSelectVal: []
        }
    },
    created() {
        const _this = this;
        getCustomerTagList()
        .then((result) => {
            _this.tableData = result.data;
        });
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        // 确定删除
        deleteRow(index, _id, rows) {
            const _this = this;
            this.$confirm('确定删除该标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                _this.deleteOneEve(index, _id, rows);
            })
            .catch(() => {         
            });
        },
        // 删除单挑
        deleteOneEve(index, _id, rows) {
            const _this = this;
            delCustomerTag({
                t_id: _id
            })
            .then((result) => {
                console.log(result);
                _this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                rows.splice(index, 1);
            },
            err => {
                this.$message.error('删除失败！');
            });
        },
        // 查看
        view(_id) {
            this.$router.push(`/customer/addlabel?id=${_id}`);
        },
        // 选中时间
        handleSelectionChange(val) {
            this.multipleSelectVal = val;
        }
    }
}
</script>

<style>
    .fr {
        float: right
    }
    .edit-article .tabel-pagination {
        margin: 50px 0;
    }

    .edit-article .filter-section form {
        float: left;
        clear: both;
    }

    .edit-article .label-tabel,
    .edit-article .label-tabel .cell {
        text-align: center;
    }
    .edit-article .delete-btn {
        text-align: left;
        overflow: hidden;
        line-height: 40px;
        border: 1px solid #dfe6ec;
        border-top: none;
        padding: 5px 20px;
    }
</style>