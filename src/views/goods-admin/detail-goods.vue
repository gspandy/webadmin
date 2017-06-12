
<style lang="less">
	@import '~less_defined';
    .goods-list{
        .tool-bar{
            .right-button{
                text-align: right;
            }
        }
        .list-table {
            .cell {
                padding: 10px;
                &,
                img{
                    width: 100%;
                }
                .price{
                    color:red;
                }
                button{
                    margin: 0px;
                }
                > .el-input-number{
                    width: auto;
                    padding-top:8px;
                }
            }
        }
        .page-area{
            padding: 50px 0px;
            text-align: right;
        }
        .right {
            position: relative;
            margin-top: 50px;
            text-align: right;
        }
        .tag {
            margin-right: 5px;
        }
    }
</style>
<template>
    <section class="goods-list">
        <!--工具条 v-loading="loadingLayout"-->
		<el-col :span="24" class="toolbar tool-bar" style="padding-bottom: 0px;">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-form :inline="true">
                        <el-form-item label="筛选">
                            <el-input v-model="formInline1.user" placeholder="输入规格属性名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="6" class="right-button">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary" @click="dialogFormVisible = true">添加规格属性</el-button>
                            <el-col>
                                <el-dialog align="left" title="规格属性" v-model="dialogFormVisible">
                                    <el-form label-width="120px" :model="formLabelAlign">
                                        <el-form-item label="规格属性：">
                                            <el-input v-model="formLabelAlign.name"></el-input>
                                        </el-form-item><br>
                                        <el-form-item label="规格属性序号：">
                                            <el-input v-model="formLabelAlign.index"></el-input>
                                        </el-form-item><br>
                                        <el-form-item label="值：">
                                            <el-tag
                                                :key="tag"
                                                v-for="tag in dynamicTags"
                                                :closable="true"
                                                :close-transition="false"
                                                @close="handleClose(tag)"
                                                class="tag">
                                                {{tag}}
                                            </el-tag>
                                            <el-input
                                                class="input-new-tag"
                                                v-if="inputVisible"
                                                v-model="inputValue"
                                                ref="saveTagInput"
                                                size="mini"
                                                @keyup.enter.native="handleInputConfirm"
                                                @blur="handleInputConfirm"
                                                >
                                            </el-input>
                                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
                                        </el-form-item><br>
                                        <el-form-item label=" " class="right">
                                            <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
                                            <el-button type="success" @click="saveTagAttr">保存</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-dialog>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
		</el-col>
        <!-- 商品列表 -->
		<el-table :row-class-name="'list-table'" border :data="goodsList" highlight-current-row style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="specify_name" label="规格属性" width="100">
			</el-table-column>
			<el-table-column align="center" prop="list" label="值">
                <template scope="scope">
                    <!--删除标签delAdminAttr-->
                    <el-tag
                        :key="tag"
                        v-for="(tag, index) in scope.row.list"
                        :closable="true"
                        @close="handleCloseLists(tag, index, scope.row.list)"
                        class="tag"
                    >
                        {{tag.name}}
                    </el-tag>
                    <el-button type="text" size="mini" @click="addTags(scope.row.list, scope.row.specify_code)">添加</el-button>
                    
                    <el-dialog title="提示" v-model="visible2">
                        <el-form :model="form" :inline="true" align="left">
                            <el-form-item>
                                <el-input v-model="form.value" auto-complete="off" placeholder="输入规格值"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <!--添加标签addAdminAttr-->
                                <el-button type="primary" size="small" @click="addInput">确定</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" @click="visible2 = false">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </template>
			</el-table-column>
			<el-table-column prop="sort" label="排序号" width="100" sortable>
                <!--<template scope="scope">
                    <el-input-number size="small" :controls="false" v-model="scope.row.sort">
                    </el-input-number>
                </template>-->
			</el-table-column>
            <el-table-column align="center" prop="specify_code" label="操作" width="150">
                <template scope="scope">
                    <!--删除属性delAdminType-->
				    <el-button type="text" size="small" @click="delTags(scope.row.specify_code)">删除</el-button>
                </template>
			</el-table-column>

		</el-table>
        <!-- 分页 -->
        <div class="page-area">
            <el-pagination
                :current-page="page.currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="4000">
            </el-pagination>
        </div>
    </section>
</template>
<script>
	import { getTypeAttrLists, addAdminType, addAdminAttr, delAdminType, delAdminAttr } from 'api';
    export default {
        data() {
            return {
                loadingLayout: false,
                dialogFormVisible: false,
                formLabelAlign: { // 添加属性标签
                    name: '',
                    index: 0
                },
                form: { // 添加规格值
                    value: ''
                },
                visible2: false, // 添加规格值 显示
                dynamicTags: [], // 储存添加标签
                inputVisible: false,
                inputValue: '',
                inputVisible2: false,
                inputValue2: '',
                goodsList: [],
                page: {
                    currentPage: 5
                },
                formInline1: { // bar数据
                    user: '',
                    region: ''
                }
            }
        },
        // created () {
        //     this.getData()
        // },
        methods: {
            addTags(list, code) {
                this.visible2 = true;
                this.$store.commit('LIST', list);
                this.$store.commit('CODE', code);
                console.log('this.$store.commit(list)',this.$store.state.list);
                console.log('this.$store.commit(code)',this.$store.state.code);
            },
            // tags
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            handleCloseLists(tag) {
                console.log(tag);
                // this.goodsList[index].tags.splice(this.goodsList[index].tags.indexOf(tag), 1);
                const params = {
                    a_id: tag.code
                };
                delAdminAttr(params).then((res) => {
                    console.log('属性res', res);
                });

                // 更新列表
                var that = this;
                setTimeout(function() {
                    that.getData();
                }, 200);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            // 添加规格值,检查重复值
            addInput() {
                const tags = this.$store.state.list;
                const code = this.$store.state.code;
                console.log('this.checkTags(tags, this.form.value)', this.checkTags(tags, this.form.value));
                console.log('code', code);
                console.log('tags', tags);
                // 相应的列标签添加规格
                if (this.form.value == '' || this.form.value == null) {
                    this.$message({
                        message: '规格值不能为空',
                        type: 'error'
                    });
                    return;
                } else if (this.checkTags(tags, this.form.value)) {
                    // tags.indexOf(this.form.value) !== -1
                    this.$message({
                        message: '规格值已经存在，请重新输入！',
                        type: 'error'
                    });
                    this.form.value = '';
                    return;
                } else {
                    const params = {
                        s_id: code,
                        a_name: this.form.value
                    }
                    addAdminAttr(params).then((res) => {
                        console.log('attr res', res);
                        // if (res.state === 0) {

                        // }
                    });
                    // tags.push(this.form.value);
                    this.visible2 = false;
                    this.form.value = '';// 清空form中的数据
                    this.$store.commit('LIST', []);
                    this.$store.commit('CODE', '');
                }
                // 更新列表
                var that = this;
                setTimeout(function() {
                    that.getData();
                }, 200);
            },

            // 添加规格属性
            saveTagAttr() {
                // save data
                const params = {
                    t_name: this.formLabelAlign.name,
                    s_sort: this.formLabelAlign.index,
                    con_list: this.dynamicTags
                }
                for (var i = 0; i < this.goodsList.length; i++) {
                    const good = this.goodsList[i];
                    if (good.specify_name == this.formLabelAlign.name) {
                        this.$message({
                            message: '属性已经存在！请重现输入！',
                            type: 'error'
                        });
                        return;
                    }
                }

                // 提交后台
                addAdminType(params).then((res) => {
                    console.log('res', res);
                });
                // 保存之后清空数据
                this.formLabelAlign.name = '';
                this.dynamicTags = [];
                //  添加成功之后隐藏
                this.dialogFormVisible = false;

                // 更新列表
                var that = this;
                setTimeout(function() {
                    that.getData();
                }, 200);
            },

            // 删除table行
            delTags(code) {
                console.log('code', code);
                const params = {
                    s_id: code
                }
                delAdminType(params).then((res) => {
                    console.log('规格res', res);
                });

                // 更新列表
                var that = this;
                setTimeout(function() {
                    that.getData();
                }, 200);
            },

            // other function
            // 检查tags
            checkTags(tags, name) {
                var flag = false;
                for(var i = 0; i < tags.length; i++) {
                    if (tags[i].name == name) {
                        flag = true;
                    }
                }
                return flag;
            },
            // 初始化数据
            getData() {
                // 获取列表数据
                getTypeAttrLists().then((res) => {
                    if (res.state !== 0) {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    } else {
                        // 获取数据列表
                        this.goodsList = res.data || [];
                        // console.log
                        console.log('数据列表', this.goodsList);
                    }
                });
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>