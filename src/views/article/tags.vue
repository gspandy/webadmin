<template>
    <section v-loading="layoutLoading">
        <!--筛选头-->
        <el-col :span="24">
            <el-col :span="16" align="left">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="筛选">
                        <el-input size="small" v-model="searchKey" placeholder="输入文章关键词"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="onSubmit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8" align="right">
                <el-button size="small" type="primary" @click="onTagdetail">发布新标签</el-button>
            </el-col>
        </el-col>
        
        <!--列表-->
        <el-table :data="tagList" border tooltip-effect="dark" style="width: 100%">
            <el-table-column align="center" type="selection" width="60"></el-table-column>
            <el-table-column prop="tag_name" align="center" label="标签名称" min-width="150">
            </el-table-column>
            <!--<el-table-column prop="tag_name" align="center" label="内容" min-width="150">
            </el-table-column>-->
            <!--<el-table-column align="center" type="index" width="60"></el-table-column>-->
            <!--<el-table-column align="center" label="排序号" width="100">
                <template scope="scope">
                    <el-input width="60" v-model="scope.row.name" :placeholder="scope.row.name"></el-input>
                </template>
            </el-table-column>-->
            <el-table-column align="center" label="操作" width="200">
                <template scope="scope">
                    <el-button size="small" @click="onEditTag(scope.row.id)">编辑</el-button>
                    <el-button size="small" type="danger" @click="onDeleteTag(scope.row.id, tagList, scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--操作-->
        <el-col :span="24" align="left" class="deleteAll">
            <el-button type="danger" @click="onDeleteSelect()">删除</el-button>
        </el-col>

        <!--分页-->
        <el-col :span="24" align="right" class="eachPage">
            <el-pagination
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import util from '../../common/js/util'
	import { getArticleTagList, delArticleTag } from 'api'

	export default {
        data () {
            return {
                layoutLoading: false,
                tagList:[], // 标签列表
                searchKey: '',  // 搜索关键字

            }
        },
        methods: {
            // 获取标签列表
            getTagList() {
                this.layoutLoading = true;
                getArticleTagList().then(res => {
                    this.layoutLoading = false;
                    if (res.state !== 0) {
                        this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定'
                        });
                        return;
                    }
                    this.tagList = res.data.data;
                },
                err => {
                    this.layoutLoading = false;
                });
            },
            onTagdetail() {
                this.$router.push('/article/tagdetail');
            },
            onSubmit() {

            },
            // 编辑标签
            onEditTag(id) {
                this.$router.push('tagdetail?tag_id=' + id);
            },
            // 删除标签
            onDeleteTag(id, row, _index) {
                this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                })
                .then(() => {
                    delArticleTag({t_id: id}).then(res => {
                        if (res.state !== 0) {
                            this.$alert(res.msg, '提示：', {
                                confirmButtonText: '确定'
                            });
                            return;
                        }
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        row.splice(_index, 1)
                    },
                    err => {
                    });
                })
                .catch(() => {
                });
            },
            // 删除选中的标签
            onDeleteSelect() {},
            
        },
        mounted() {
            this.getTagList();
        }
    }
</script>

<style lang="less">
    .deleteAll {
        padding: 20px;
    }
    .eachPage {
        padding-right: 20px;
    }
</style>