<template>
    <article class="add-article">
        <!--筛选-->
        <section class="filter-section">
            <el-row>
                <el-col :span="24"
                        class="toolbar"
                        style="padding-bottom: 0px;">
                    <el-form :inline="true"
                             :model="form"
                             ref="form"
                             class="demo-form-inline">
                        <el-form-item label="标签名称:">
                            <el-input v-model="form.labelName"
                                      placeholder="输入标签名称"></el-input>
                        </el-form-item>
                        <el-form-item label="标签排序号:">
                            <el-input v-model="form.labelOrder"
                                      placeholder="输入标签排序号"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </section>
        <!--tabel-->
        <section class="label-tabel">
            <el-col :span="24"
                    class="title">
                <strong>包含用户:</strong>
            </el-col>
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
                        <el-button  type="text"
                                    size="small"
                                    @click="deleteRow(scope.$index, tableData, scope.row.user_id)">删除</el-button>
                    </template>
                </el-table-column>      
            </el-table>
            <!--删除全部按钮-->
            <el-col :span="24"
                    class="delete-btn">
                <!--<el-button type="text"
                           class="fl"
                           @click="deletemultipleRows">删除</el-button>-->
                <el-button type="primary"
                           size="small"
                           class="fr top"
                           @click="dialogFormVisible=true"
                           >添加用户</el-button>
            </el-col>
            <!--保存-->
            <el-col :span="24"
                    class="save-btn">
                <el-button type="primary"
                           class="fl"
                           @click="submitAddLabelForm('form')">添加</el-button>
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
        <!--弹窗-->
        <el-dialog title="添加用户"
                   v-model="dialogFormVisible"
                   class="add-label-dialog">
            <el-form :inline="true">
                <el-input placeholder="输入用户手机号码"
                          icon="search"
                          v-model="searchInput"
                          :on-icon-click="handleIconClick">
                </el-input>
                <div class="checkbox-list">
                    <el-checkbox-group
                        class="search-checkbox" 
                        v-model="searchChecked">
                        <el-checkbox :key="item" v-for="item in customerData" :label="item">{{item.user_name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="btn-item label-btn-item fr">
                    <el-button type="primary"
                               @click="searchFormSubmit">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </article>
</template>

<script>
import _ from 'lodash'
import {addCustomerTag, getCustomerTag, delCustomerUserTag, getCustomerList, editCustomerTag} from 'api';
export default {
    data() {
        return {
            form: {
                labelName: '',
                labelOrder: ''
            },
            tagId: null,
            multipleSelectVal: [],
            searchChecked:[],
            searchInput: '',
            dialogFormVisible: false,
            customerData: [],
            tableData: [],
            loading: true,
            save: false
        }
    },
    created() {
        const _id = this.$route.query.id;
        this.getCustomerLis();
        if(_id) {
             this.getCustomerTags();
        }
    },
    methods: {
        // 获取所有用户
        getCustomerLis() {
            const _this = this;
            getCustomerList({})
            .then((result) => {
                _this.customerData = result.data.data;
            });
        },
        // 获取标签关联的用户列表
        getCustomerTags() {
            const _this = this;
            const _id = this.$route.query.id;
            getCustomerTag({
                    t_id: _id
                })
                .then((result) => {
                    _this.tagId = result.data.tag_id;
                    _this.form.labelName = result.data.tag_name;
                    _this.form.labelOrder = result.data.sort;
                    _this.tableData = result.data.user_list;
                });
        },
        // 删除操作
        deleteRow(index, rows, uId) {
            const _this = this;
            const _id = this.$route.query.id;
            const _uId = uId;
            if (_id) {
                this.$confirm('确定删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    _this.delCustomerUser(index, rows, _id, _uId);
                });
                return false;
            }
            else {
                _this.showComfirm((index, rows) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    rows.splice(index, 1);
                });
            }
        },
        // 删除用户关联标签
        delCustomerUser(index, rows, _id, _uId) {
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
        handleIconClick(ev) {
            console.log(ev);
        },
        // 保存添加标签
        submitAddLabelForm(formName) {
            const _this = this;
            const _id = _this.$route.query.id;
            const _labelName = _this.form.labelName;
            const _order = _this.form.labelOrder;
            const _uIdArr = _this.getUserId(_this.tableData);
            if (_labelName == '') {
                _this.$message.error('请输入标签名称！');
                return;
            }
            else if (_order == '') {
                _this.$message.error('请输入标签排序号！');
                return;
            }
            else if (_id) {
                // 查看进来编辑
                editCustomerTag({
                    t_id: _id,
                    t_name: _labelName,
                    t_order: _order,
                    u_list: _uIdArr
                })
                .then((result) => {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    _this.form.labelName = '';
                    _this.form.labelOrder = '';
                    _this.tableData.splice(0, _this.tableData.length);
                    _this.$router.push('/customer/labeledit');
                });
                return;
            }
            // 常规进来添加
            addCustomerTag({
                t_name: _labelName,
                t_order: _order,
                u_list: _uIdArr
            })
            .then((result) => {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                _this.form.labelName = '';
                _this.form.labelOrder = '';
                _this.tableData.splice(0, _this.tableData.length);
                _this.save = true;
                _this.$router.push('/customer/labeledit');
            },
            err => {
                this.$message.error('添加失败！');
            });
        },
        // 添加用户
        searchFormSubmit() {
            const _this = this;
            let _searchChecked = [];
            if (_this.tableData.length == 0) {
                _this.tableData = _this.tableData.concat(_this.searchChecked);
                this.$message({
                    message: '添加用户成功',
                    type: 'success'
                });
                this.dialogFormVisible = false;
                return;
            }
            else {
                for (let i = 0;i < _this.searchChecked.length; i++) {
                    for (let j = 0;j < _this.tableData.length; j++) {
                        if (_this.searchChecked[i].user_id == _this.tableData[j].user_id) {
                            break;
                        }
                        else if(j == _this.tableData.length-1) {
                            _this.tableData.push(_this.searchChecked[i]);
                        }
                    }   
                }
                this.$message({
                    message: '添加用户成功',
                    type: 'success'
                });
                this.dialogFormVisible = false;
            }
        },
        // 获取数据列表用户id
        getUserId(arr) {
            let uIdArr = [];
            arr.forEach((item, index) => {
                uIdArr.push(item.user_id)
            });
            return uIdArr;
        },
        showComfirm(cb) {
            const _this = this;
            this.$confirm('确定删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    if (typeof cb == 'function') {
                        cb && cb();
                    }    
            });
        },
    }
}
</script>

<style>
    .fr {
        float: right
    }

    .fl {
        float: left
    }

    .add-article .top {
        position: relative;
        top: 3px;
    }

    .add-article .delete-btn {
        overflow: hidden;
        line-height: 40px;
        border: 1px solid #dfe6ec;
        border-top: none;
        padding: 5px 20px;
    }

    .add-article .save-btn {
        margin-top: 20px;
    }
    .add-article .label-btn-item {
        margin: 20px 0;
    }
    .add-article .tabel-pagination {
        margin: 50px 0;
    }
    .add-article .add-label-dialog .el-dialog--small {
        width: 25%;
        min-width: 480px;
    }
    .add-article .search-checkbox label {
        display: block;
        margin-left: 0!important;
        margin: 10px 0;
    }
    .add-article .filter-section form {
        float: left;
        clear: both;
    }

    .add-article .label-tabel .title {
        color: #475669;
        margin-bottom: 10px;
        text-align: left
    }

    .add-article .label-tabel,
    .add-article .label-tabel .cell {
        text-align: center;
    }
</style>
