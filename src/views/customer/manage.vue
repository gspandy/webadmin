<template>
    <section class="cus-section">
        <el-row>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filterForm" class="demo-form-inline">
                    <el-form-item label="手机号码">
                        <el-input v-model="filterForm.phone"  placeholder="手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="微信昵称">
                        <el-input v-model="filterForm.nickName"  placeholder="微信昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="客户身份">
                        <el-select v-model="filterForm.idCard" placeholder="全部">
                            <el-option label="会员" value="0"></el-option>
                            <el-option label="非会员" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--筛选-->
                    <el-col :span="24">
                        <el-form-item label="购买次数">
                            <el-select v-model="filterForm.count" placeholder="购买次数">
                                <el-option label="大于" value="1"></el-option>
                                <el-option label="大于" value="2"></el-option>
                                <el-option label="小于" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input  placeholder=""></el-input>
                        </el-form-item>            
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">筛选</el-button>
                        </el-form-item>
                        <!--添加客户按钮-->
                        <!--<el-button type="primary" class="fr">添加客户</el-button>-->
                    </el-col>
                </el-form>
            </el-col>
            <!--列表-->
            <el-col :span="24"> 
                <el-table
                    class="customer-tabel center"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="user_name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机号码"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="微信号/微信昵称"
                        min-width="300">
                        <template scope="scope">
                            <span>{{scope.row.wx_code}}</span>/<span>{{scope.row.wx_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="buy_num"
                        label="购买次数">
                    </el-table-column>
                    <el-table-column
                        prop="promotion_id"
                        label="客户身份">
                    </el-table-column>
                    <el-table-column
                        prop="handle"
                        label="操作">
                        <template scope="scope"> 
                            <el-button  type="text" size="small" @click="addTagsEve(scope.row.user_id)">添加标签</el-button>
                            <el-button  type="text" size="small" @click="view(scope.row.user_id)">查看</el-button>
                        </template>
                    </el-table-column>      
                </el-table>
            </el-col>
            <!--分页-->
            <el-col :span="24">
                <el-pagination
                    class="fr tabel-pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
                </el-pagination>
            </el-col>
            <!--弹窗-->
            <el-dialog title="添加标签" v-model="dialogFormVisible" class="add-label-dialog">
                <el-col :span="24" class="label-item">
                    <el-tag
                        :key="tag"
                        v-for="tag in userTags"
                        :closable="true"
                        :close-transition="true"
                        @close="handleClose(tag)"
                        v-if="userTags.length !== 0">
                        {{tag.tag_name}}
                    </el-tag>
                    <!--新增标签-->
                    <el-tag
                        :key="tag"
                        v-for="tag in newUserTags"
                        :closable="true"
                        :close-transition="true"
                        @close="newHandleClose(tag)"
                        >
                        {{tag.tag_name}}
                    </el-tag>
                </el-col>
                <el-col :span="24">
                    <div class="checkbox-list">
                        <el-checkbox-group
                            class="search-checkbox" 
                            @change="selectedTagsEve"
                            v-model="selectedTags">
                            <el-checkbox :key="item" 
                                            v-for="item in optionsTags" 
                                            :label="item">{{item.tag_name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-col>
                <div class="btn-item">
                    <el-button type="primary" @click="addUserTags">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </el-row>
    </section>
</template>

<script>
    import {addCustomerUsertag, getCustomerList, getCustomerTagList, getCustomerInfo, delCustomerUserTag} from 'api';
    export default {
        data() {
            return {
                filterForm: {
                    phone: '',
                    nickName: '',
                    idCard: '',
                    count: ''
                },
                optionsTags: [],
                uId: null,
                userTags: [],
                newUserTags: [],
                selectedTags: [],
                tagIdArr: [],
                formLabelWidth: '120px',
                dialogFormVisible: false,
                tableData: []
            }
        },
        created() {
            this.getCustomers();
        },
        methods: {
            // 筛选
            onSubmit() {
                console.log('submit!');
            },
            // 获取用户列表
            getCustomers() {
                const _this = this;
                getCustomerList({})
                .then((result) => {
                    _this.tableData = result.data.data;
                });
            },
            // 获取用户信息
            getUserInfo(_id) {
                const _this = this;
                getCustomerInfo({
                    u_id: _id
                })
                .then((result) => {
                    _this.userTags = result.data.u_tags;
                    _this.selectedTags = _this.selectedTags.concat(_this.userTags);
                    _this.dialogFormVisible = true;
                });
            },
            // 获取用户标签
            getCustomerTags() {
                const _this = this;
                getCustomerTagList()
                .then((result) => {
                    _this.optionsTags = result.data;
                });
            },
            // 添加标签
            addUserTags() {
                const _this = this;
                const _id = _this.uId;
                const _tList = _this.getId(_this.newUserTags);
                addCustomerUsertag({
                    u_id: _id,
                    t_list: _tList
                })
                .then((result) => {
                    this.$message({
                        message: '添加标签成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                }) 
            },
            // 添加标签弹窗显示
            addTagsEve(_id) {
                this.selectedTags = [];
                this.optionsTags = [];
                this.newUserTags = [];
                this.getUserInfo(_id);
                this.getCustomerTags();
                this.uId = _id;
            },
            getId(arr) {
                const _this = this;
                let newArr = [];
                arr.forEach((item) => {
                    newArr.push(item.tag_id);
                });
                return newArr;
            },
            // 查看
            view(id) {
                this.$router.push(`/customer/infoedit?id=${id}`);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            },
            // 标签去重
            removeHadTags(obj) {
                const _this = this;
                let tagArr = [];
                if (_this.userTags.length == 0) {
                    tagArr = tagArr.concat(obj);
                    return tagArr;
                }
                else {
                    for(let i = 0; i < obj.length; i++) {
                        for(let j = 0; j < _this.userTags.length; j++) {
                            if(obj[i].tag_id == _this.userTags[j].tag_id) {
                                break;
                            }
                            else if(j == _this.userTags.length-1) {
                                tagArr.push(obj[i]);
                            }
                        } 
                    }
                    return tagArr;
                }
            },
            // 选择标签移除
            // 删除标签
            delCustomerTag(rows, index, _id, _uId) {
                delCustomerUserTag({
                    t_id: _id,
                    u_id: _uId
                })
                .then((result) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    rows.splice(index, 1);
                });
            },
            // 删除操作
            handleClose(tag) {
                const _this = this;
                const _userTags = _this.userTags;
                const _uId = _this.uId;
                let _index = null;
                this.$confirm('确定删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    _this.userTags.forEach((item, index) => {
                        if (tag.tag_id == item.tag_id) {
                            _index = index;
                        }
                    });
                    // const _selectedIndex = _this.selectedTags.findIndex((item) => {
                    //     return item.tag_id = tag.tag_id;
                    // });
                    // _this.selectedTags.splice(_selectedIndex, 1);
                    _this.delCustomerTag(_userTags, _index, tag.tag_id, _uId);
                });
            },
            newHandleClose(tag) {
                const _this = this;
                const _userTags = _this.newUserTags;
                this.$confirm('确定删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    _this.newUserTags.forEach((item, index) => {
                        if (tag.tag_id == item.tag_id) {
                            _this.newUserTags.splice(index, 1);
                            _this.selectedTags.splice(index, 1);
                        }
                    });
                });
            },
            // 选择标签
            selectedTagsEve(val) {
                const _this = this;
                const _selectedTags = _this.removeHadTags(val);
                _this.newUserTags = _selectedTags;
            }
        }
    }
</script>

<style>
    .fr {
        float: right
    }
    
    .cus-section .center {
        text-align: center!important;
    }
    
    .cus-section .customer-tabel .cell {
        text-align: center;
    }
    .cus-section .tabel-pagination {
        margin: 50px 0;
    }
    .cus-section .add-label-dialog .el-select__tags {
        display: none;
    }
    .cus-section .add-label-dialog .el-dialog--small {
        width: 25%;
        min-width: 480px;
    }
    .cus-section .label-item {
        margin-bottom: 30px;
    }
    .cus-section .label-item span{
        margin: 0 5px 5px 0;
    }
    /*.cus-section .btn-item{
        float: right
    }*/
    .cus-section .btn-item{
        float: right;
        margin-bottom:15px;
    }
    .cus-section .search-checkbox label {
        display: block;
        margin-left: 0!important;
        margin: 10px 0;
    }
</style>
