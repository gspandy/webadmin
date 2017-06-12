<template>
    <section class="classfy-page">
        <div>
            <!--分类头-->
            <el-col :span="24">
                <el-col :span="12" align="left">
                    &nbsp;
                    <!--<el-button size="small" type="primary" @click="onExpandCall">{{ expandAllCat ? '收起' : '展示'}}所有子栏目</el-button>-->
                </el-col>
                <el-col :span="12" align="right">
                    <el-button size="small" type="primary" @click="onShowAddCat">添加一级栏目</el-button>
                </el-col>
            </el-col>

            <!--列表-->
            <!--<el-table :data="tableData5" style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        
                    </template>
                </el-table-column>
                <el-table-column label="栏目名称" prop="id"></el-table-column>
                <el-table-column label="排序号" prop="name"></el-table-column>
                <el-table-column label="操作" prop="desc">
                    <template scope="scope">
                        <el-button @click="handleClick" type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>-->
            <!--列表-->
            <el-col :span="24" class="header">
                <el-col :span="24" class="order-nav">
                    <el-col align="center" :span="4">选择</el-col>
                    <el-col :span="12">栏目名称</el-col>
                    <el-col :span="4">排序号</el-col>
                    <el-col align="center" :span="4">操作</el-col>
                </el-col>
                <el-col :span="24">
                    <el-tree
                        :data="catList"
                        :props="defaultProps"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false"
                        :render-content="renderContent">
                    </el-tree>
                </el-col>
            </el-col>

            <!--操作-->
            <!--<el-col :span="24" class="add">
                <el-button size="small" type="primary" @click="onShowAddCat">添加一级栏目</el-button>
            </el-col>-->
            <!--<el-col :span="24" class="save">
                <el-button size="small" type="success" @click="savePages">保存</el-button>
                <el-button size="small" type="danger" @click="deletePages">删除</el-button>
            </el-col>-->
        </div>
        <!--添加、修改栏目-->
        <el-dialog title="添加栏目" v-model="addCatDialog">
            <el-form :model="itemCatData" label-width="100px">
                <el-form-item label="上级分类">
                    <el-cascader
                        placeholder="选择上级分类"
                        :options="selectCatList"
                        @change="onSelectColumn"
                        :disabled="selectBan"
                        change-on-select
                        v-model="selectColumn"
                        :props="{value:'cat_id', label:'cat_name', children: 'children'}">
                    </el-cascader>
                </el-form-item>
                <!--<el-form-item label="上级分类">
                    <el-select placeholder="选择上级分类" v-model="itemCatData.p_id">
                    <el-option label="一级分类" :value="0"></el-option>
                    <el-option v-for="item in catList" :label="item.cat_name" :value="item.cat_id"></el-option>
                    </el-select>
                </el-form-item>-->
                <!--<el-form-item label="活动名称">
                    <el-input v-model="itemCatData.cat_name"></el-input>
                </el-form-item>-->
                <el-form-item label="活动名称">
                    <el-input v-model="itemCatData.c_name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCatDialog = false">取 消</el-button>
                <el-button type="primary" @click="onConfirmBtn">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
	import { getArticleCatList, addArticleCat, delArticleCat, editArticleCat } from 'api';
    // import { delArticleCat } from 'api';
    // import * as delArticleCat from 'api/api';
	export default {
        data () {
            return {
                addCatDialog: false,
                // tempCatList: [],    //分类列表
                catList: [],    //分类联级列表
                selectCatList: [],  // 添加、编辑框中的分类联级列表
                parseCat: [],
                currentEditCat: [], // 当前修改的分类
                selectColumn: [],   // 添加、编辑框中的分类联级的默认值
                selectBan: false,   // 是否禁用添加、编辑框中的分类
                expandAllCat: false,
                itemCatData: {
                    p_id: null,
                    c_name: '',
                    c_id: null
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                input: 'nimen'
            }
        },
        mounted() {
            this.getArticleCat();
            // console.log(delArticleCat);
        },
        methods: {
            // 获取分类列表
            getArticleCat() {
                getArticleCatList().then(res => {
                    // this.tempCatList = res.data.data;
                    this.catList = res.data.data;
                    this.parseCatList();
                },
                err => {
                });
            },
            // 排列、关联分类
            parseCatList() {
                // this.catList = [].concat(this.tempCatList);
                for (var i = 0; i < this.catList.length; i++) {
                    for (var k = 0; k < this.catList.length; k++) {
                        if (this.catList[i].cat_id === this.catList[k].parent_id) {
                            this.catList[i].children = this.catList[i].children || [];
                            // for (var c = 0; c < this.catList[i].children.length; c++) {
                            //     if(this.catList[i].children[c].cat_id == this.catList[k].cat_id) {
                            //         break;
                            //     }
                            //     else if (c === (this.catList[i].children.length-1)) {
                            //     }
                            // }
                            this.catList[i].children.push(this.catList[k]);
                        }
                    }
                }
                for (var i = 0; i < this.catList.length; i++) {
                    if (this.catList[i].parent_id !== 0) {
                        this.catList.splice(i, 1);
                        i--;
                    }
                }
                this.selectCatList = [{
                    cat_id: '_',
                    cat_name: '一级栏目'
                }];
                this.selectCatList = this.selectCatList.concat(this.catList);
            },
            // 确定添加、修改分类
            onConfirmBtn() {
                if (!this.selectBan && this.itemCatData.p_id === null) {
                    this.$message.error('请选择上级分类');
                    return;
                }
                if (this.itemCatData.c_name === '') {
                    this.$message.error('请输入分类名');
                    return;
                }
                if (this.selectBan) {
                    this.editCat();
                }
                else {
                    this.addCat();
                }
            },
            // 添加分类
            addCat() {
                this.itemCatData.p_id === '_' && (this.itemCatData.p_id = 0);
                const params = {
                    ...this.itemCatData
                }
                delete params.c_id;
                addArticleCat(params).then(res => {
                    if (res.state !== 0) {
                        this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定'
                        });
                        return;
                    }
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    // this.itemCatData.p_id = null;
                    // this.itemCatData.c_name = '';
                    this.addCatDialog = false;
                    this.getArticleCat();
                });
            },
            // 编辑分类
            editCat() {
                const params = {
                    ...this.itemCatData
                }
                delete params.p_id;
                editArticleCat(params).then(res => {
                    if (res.state !== 0) {
                        this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定'
                        });
                        return;
                    }
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.currentEditCat.cat_name = params.c_name;
                    this.addCatDialog = false;
                    // this.getArticleCat();
                });

            },
            // 显示添加、编辑框
            onShowAddCat() {
                this.itemCatData = {
                    c_name: "",
                    c_id: null,
                    p_id: null
                }
                this.selectBan = false;
                this.addCatDialog = true;
            },
            // 删除栏目
            onDeleteCat(id) {
                // this.removeCatListItem(id);
                // return;
                if (!id) return;
                this.$confirm('此操作将永久删除该分类, 是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    delArticleCat({c_id: id}).then(res => {
                        if (res.state !== 0) {
                            this.$alert(res.msg, '提示：', {
                                confirmButtonText: '确定'
                            });
                            return;
                        }
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getArticleCat();
                    });
                })
                .catch(() => {});
            },
            // 选择上级分类
            onSelectColumn(value) {
                if (value.length < 0) return;
                console.log(value[value.length - 1]);
                this.itemCatData.p_id = value[value.length - 1];
            },
            // 响应编辑
            onEditCat(data) {
                const allCatList = this.catList;
                const idAr = [];
                function _cat(id, _catList) {
                    const catList = _catList;
                    for (var c = 0; c < catList.length; c++) {
                        if (catList[c].cat_id !== id) {
                            if (c < catList.length -1 && catList[c].children && catList[c].children.length > 0){
                                _cat(id, catList[c].children);
                            }
                        }
                        else {
                            idAr.unshift(catList[c].cat_id);
                            if (catList[c].parent_id !== 0) {
                                _cat(catList[c].parent_id, allCatList);
                            }

                            return;
                        }
                    }
                }
                if (data.parent_id) {
                    _cat(data.parent_id, allCatList);
                }
                else {
                    idAr.push('_');
                }
                this.currentEditCat = data;
                this.selectColumn = idAr;
                this.itemCatData = {
                    c_name: data.cat_name,
                    c_id: data.cat_id,
                    p_id: data.parent_id || '_'
                }
                this.selectBan = true;
                this.addCatDialog = true;
                // console.log(idAr);
            },
            // 移除本地的cat list 
            removeCatListItem(id) {
                // for (var i = 0; i < this.tempCatList.length; i++) {
                //     if (this.tempCatList[i].cat_id === id) {
                //         this.tempCatList.splice(i, 1);
                //     }
                // }
                // this.parseCatList();
            },

            // 展开、收起所有
            onExpandCall() {
                this.expandAllCat = !this.expandAllCat;
            },
            savePages() {

            },
            deletePages() {

            },
            remove(store, data) {
                store.remove(data);
            },

            renderContent(h, { node, data, store }) {
                return (<span>
                    <span style="margin-left: 60px;">
                        <div style="width: 300px; display: inline-block;">{data.cat_name}</div>
                    </span>
                    <span style="float: right; margin-right: 60px">
                        <el-button size="mini" on-click={ () => this.onEditCat(data) }>编辑</el-button>
                        <el-button type="danger" size="mini" on-click={ () => this.onDeleteCat(data.cat_id) }>删除</el-button>
                    </span>
                </span>);
            }
        }
    }
</script>

<style lang="less">
    .classfy-page{
        margin-top: 20px;
        .order-nav {
            background: #ccc;
            height: 36px;
            line-height: 36px;
            font-weight: 800;
        }
        .header {
            padding-top: 10px;
        }
        .add {
            padding: 20px;
        }
        .save {
            padding-left: 20px;
        }
    }
</style>