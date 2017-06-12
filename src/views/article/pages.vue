<template>
    <section>
        <!--筛选头-->
        <el-col :span="24">
            <el-col :span="21" align="left">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="筛选">
                        <el-input size="small" v-model="formInline.user" placeholder="输入文章关键词"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select size="small" v-model="formInline.region" placeholder="选择栏目">
                            <!--<el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="onSubmit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="3" align="right">
                <el-button size="small" type="primary" @click="onGoToAddArticle">发布新文章</el-button>
            </el-col>
        </el-col>
    
        <!--列表-->
        <el-col :span="24">
            <el-table :data="articleData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="标题">
                    <template scope="scope">
                        {{ scope.row.title }}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="cat_name" label="栏目"></el-table-column>
                <el-table-column align="center" label="状态">
                    <template scope="scope">
                        <el-tag
                            v-for="item in scope.row.article_type"
                            :key="item"
                            type="primary">
                            {{item}}
                        </el-tag>

                        <!--<span class="article-status" v-for="item in scope.row.article_type">{{item}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column align="center" label="创建时间">
                    <template scope="scope">{{scope.row.created}}</template>
                </el-table-column>
                <el-table-column scope="sort_order" align="center" label="排序号" width="100">
                    <template scope="scope">
                        <el-input style="width: 50px;" v-model="scope.row.sort_order"></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="100">
                    <template scope="scope">
                        <el-button @click="onEditArticle(scope.row.article_id)" type="text" size="small">编辑</el-button>
                        <el-button @click="onDeleteArticle(scope.row.article_id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    
        <!--状态修改操作-->
        <el-col :span="24" class="state">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-select size="small" v-model="formInline.region" placeholder="状态修改">
                        <!--<el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select size="small" v-model="formInline.region" placeholder="移动到">
                        <!--<el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="danger">删除</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--分页-->
        <el-col :span="24" align="right" class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
import util from '../../common/js/util'
import axios from 'axios'
import { listArticle, delArticle } from 'api'
export default {
    data() {
        return {
            // mock 列表数据
            articleData: [],
            formInline: {
                user: '',
                region: ''
            },
            multipleSelection: [],
            currentPage4: 4,
            formData2: []
        }
    },
    created() {
        // 获取列表数据
        let para = {
            s: 1,
            l: 10,
            k: 1
        }
    },
    mounted() {
        this.getArticleList();
    },
    methods: {
        // 获取文章列表
        getArticleList() {
            const _params = {
                s: 1,
                l: 10
            }
            listArticle().then(res => {
                if (res.state !== 0) {
                    this.$alert(res.msg, '提示：', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                res.data.data.forEach((item) => {
                    let _date = new Date(item.created*1000)
                    item.created = util.formatDate.format(_date, 'yyyy-MM-dd hh:mm:ss')
                })
                this.articleData = res.data.data;
                for (var i = 0; i < this.articleData.length; i++) {
                    for (var a = 0; a < this.articleData[i].article_type.length; a++) {
                        let _type = '';
                        switch(parseInt(this.articleData[i].article_type[a])) {
                            case 0:
                                _type = '普通';
                                break;
                            case 1:
                                _type = '推荐';
                                break;
                            case 2:
                                _type = '热门';
                                break;
                            case 3:
                                _type = '置顶';
                                break;
                        }
                        this.articleData[i].article_type[a] = _type;
                    }
                }
            },
                err => {
                    console.log('失败');
                });
        },
        // 删除文章
        onDeleteArticle(id) {
            this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                delArticle({ a_id: id }).then(res => {
                    if (res.state !== 0) {
                        this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定'
                        });
                        return;
                    }
                    for (var i = 0; i < this.articleData.length; i++) {
                        if (this.articleData[i].article_id == id) {
                            this.articleData.splice(i, 1);
                            break;
                        }
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                },
                    err => {
                    });
            })
            .catch(() => {
            })
        },
        // 编辑文章
        onEditArticle(id) {
            this.$router.push('add-article?id=' + id);
        },
        onGoToAddArticle() {
            console.log(1);
            this.$router.push('add-article');
        },


        handleSelectionChange() {

        },
        // 列表编辑
        handleClick() {

        },
        // 列表删除
        removeClick() {

        },
        onSubmit() {
            console.log('submit!');
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style lang="less">
.article-page {
    .state {
        margin-top: 20px;
    }
    .page {
        padding-top: 20px;
    }
}
span.article-status {
    margin-right: 10px
}
</style>
