<template>
    <article class="infoedit">
        <section>
            <el-row>
                <el-col :span="24">
                    <el-form ref="form"
                             :model="form"
                             label-width="80px">
                        <el-form-item label="姓名:">
                            <el-input v-model="form.u_name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别:">
                            <el-radio-group v-model="form.u_sex">
                                <el-radio disabled  label="1">男</el-radio>
                                <el-radio disabled  label="0">女</el-radio>
                                <el-radio disabled  label="2">保密</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="生日:">
                            <el-date-picker v-model="form.u_birth"
                                            type="date"
                                            placeholder="选择生日日期"
                                            disabled>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="手机号:">
                            <el-input v-model="form.u_tel"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item label="地址:">
                            <el-input v-model="form.u_address"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item label="标签:"
                                      class="label-item">
                            <el-tag :key="tag"
                                    v-for="tag in userTags"
                                    :closable="true"
                                    :close-transition="true"
                                    @close="handleClose(tag)">
                                {{tag.tag_name}}
                            </el-tag>
                            <el-button type="text"
                                       class="add-btn"
                                       @click="addEve">添加</el-button>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input type="textarea"
                                      v-model="form.u_remark"
                                      disabled></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                 <!--弹窗-->
                <el-dialog title="添加标签" v-model="dialogFormVisible" class="add-label-dialog">
                    <el-form :inline="true">
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
                        <div class="btn-item label-btn-item fr">
                            <el-button type="primary"
                                    @click="comfirmUserTags">确 定</el-button>
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                        </div>
                    </el-form>
                </el-dialog>    
            </el-row>
        </section>
        <section class="buy-info">
            <el-row>
                <el-col :span="24"
                        class="title">
                    <strong>客户消费信息</strong>
                </el-col>
                <el-col :span="24"
                        class="buy-content">
                    <div class="buy-item">
                        <span>购买次数:</span><em>20</em>
                    </div>
                    <div class="buy-item">
                        <span>购买总金额:</span><em>￥2000.90</em>
                    </div>
                    <div class="buy-item">
                        <span>客户身份:</span>
                        <el-select placeholder="客户身份" v-model="prId">
                            <el-option label="会员"
                                       value="1">
                            </el-option>
                            <el-option label="非会员"
                                       value="0">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button type="primary"
                                @click="editUserInfo">保存</el-button>
                </el-col>
            </el-row>
        </section>
    </article>
</template>

<script>
    import _ from 'lodash'
    import {getCustomerInfo, editCustomerInfo, delCustomerUserTag, addCustomerUsertag, getCustomerList, getCustomerTagList} from 'api';
    export default {
        data() {
            return {
                form: {},
                userTags: [],
                newUserTags: [],
                prId: '',
                optionsTags: [],
                selectedTags: [],
                newTags:[],
                dialogFormVisible: false,
            };
        },
        created() {
            const _this = this;
            const _id = _this.$route.query.id;
            if (_id) {
                _this.getUserInfo(_id);
            }
        },
        methods: {
            // 获取客户详细信息
            getUserInfo(_id) {
                const _this = this;
                getCustomerInfo({
                    u_id: _id
                })
                .then((result) => {
                    _this.form = result.data;
                    _this.form.u_sex = `${_this.form.u_sex}`;
                    _this.userTags = _this.form.u_tags;
                });
            },
            // 获取客户标签
            getCustomerTags() {
                const _this = this;
                getCustomerTagList()
                .then((result) => {
                    _this.optionsTags = result.data;
                });
            },
            // 确定选择标签
            comfirmUserTags() {
                const _this = this;
                _this.userTags = _this.userTags.concat(_this.newUserTags);
                _this.dialogFormVisible = false;
            },
            // 点击添加标签事件
            addEve() {
                const _this= this;
                _this.dialogFormVisible = true;
                _this.selectedTags = [];
                _this.optionsTags = [];
                _this.getCustomerTags();
            },
            // 保存
            editUserInfo() {
                const _this = this;
                const _id = _this.$route.query.id;
                const _prId = _this.prId;
                const _tagList = _this.getTagsId();
                editCustomerInfo({
                    u_id: _id,
                    pr_id: _prId,
                    tag_list: _tagList
                })
                .then((result) => {
                    _this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    _this.$router.push('/customer/manage');
                });
            },
            // 获取选中的标签tag_id
            getTagsId() {
                const _this = this;
                let arr = [];
                _this.newUserTags.forEach((item) => {
                    arr.push(item.tag_id);
                });
                return arr;
            },
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
            selectedTagsEve(val) {
                const _this = this;
                const _selectedTags = _this.removeHadTags(val);
                _this.newUserTags = _selectedTags;
            },
            // 删除操作
            handleClose(tag) {
                const _this = this;
                const _userTags = _this.userTags;
                const _id = _this.$route.query.id;
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
                    _this.delCustomerTag(_userTags, _index, tag.tag_id, _id);
                });
            }
        }
    }
</script>

<style>
    .fr {
        float: right
    }

    .infoedit {
        margin: 20px;
        width: 60%;
        min-width: 600px;
    }

    .infoedit .label-item span {
        margin-left: 5px;
        margin-bottom: 10px;
    }

    .infoedit .label-item .add-btn {
        margin-right: 15px;
    }

    .infoedit .add-label-dialog .el-select__tags {
        display: none;
    }

    .infoedit .add-label-dialog .el-dialog--small {
        width: 25%;
        min-width: 480px;
    }
    .infoedit .buy-info {
        color: #475669;
        min-width: 600px
    }
    .infoedit .buy-info .title {
        padding: 10px 0;
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 20px;
    }
    .infoedit .buy-item {
        margin-bottom: 20px
    }
    .infoedit .buy-item span {
        margin-right: 20px;
        vertical-align: middle
    }
    .infoedit .label-item {
        margin-bottom: 30px;
    }
    .infoedit .label-item span{
        margin: 0 5px 5px 0;
    }
    .infoedit .btn-item{
        float: right;
        margin-bottom:15px;
    }
    .infoedit .search-checkbox label {
        display: block;
        margin-left: 0!important;
        margin: 10px 0;
    }
</style>
