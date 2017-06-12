
<style lang="less">
	@import '~less_defined';
    .goods-list{
        .tool-bar{
            .right-button{
                text-align: right;
            }
        }
        .list-table {
            text-align: center;
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
        .goods-state {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 6px;
            border:1px solid #eeeeee;
            color: #A9A9A9;
        }
        .el-table__header th {
            text-align: center;
        }
    }
</style>
<template>
    <section class="goods-list">
        <!--工具条 v-loading="loadingLayout"-->
		<el-col :span="24" class="tool-bar" style="padding-bottom: 0px;">
            <el-row :gutter="20">
                <el-col :span="20" class="toolbar">
                    <el-form :inline="true">
                        <el-form-item label="筛选：商品类型：">
                            <el-select v-model="formInline1.region" placeholder="全部">
                                <el-option label="分销商品" value="sale"></el-option>
                                <el-option label="半成品花材" value="halfflower"></el-option>
                                <el-option label="商家发布" value="saler"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供货商">
                            <el-input v-model="formInline1.user" placeholder="输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select @change="onScreenGoodsState" v-model="screenGoodsState" placeholder="全部">
                                <el-option label="全部" :value="0"></el-option>
                                <el-option label="可售" :value="1"></el-option>
                                <el-option label="停售" :value="2"></el-option>
                                <el-option label="审核中" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input v-model="formInline2.user" placeholder="输入商品名称关键词"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button type="primary" @click="onSubmit">确认筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="4" class="right-button">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary" @click="onCreateGoods" size="large">发布商品</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
		</el-col>
        <!--商品列表-->
		<el-table :row-class-name="'list-table'" :data="goodsList" highlight-current-row style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
			<el-table-column width="80">
                <template scope="scope">
                    <img :src="scope.row.logo_url" />
                </template>
			</el-table-column>
			<el-table-column label="商品/价格" min-width="120">
                <template scope="scope">
                    <div>{{ scope.row.name }}</div>
                    <!--<div class="price">￥{{ scope.row.minPrice }}-{{ scope.row.maxPrice }}</div>-->
                    <div class="price">￥{{ scope.row.s_price }}</div>
                </template>
			</el-table-column>
			<el-table-column prop="invent" label="库存" width="100">
			</el-table-column>
			<el-table-column prop="sales" label="销量" width="100">
			</el-table-column>
			<el-table-column prop="s_name" label="供货商" width="120">
			</el-table-column>
			<el-table-column label="商品类型" width="120">
                <template scope="scope">
                    <div>{{(scope.row.type === 1 ? '分销商品' : (scope.row.type === 2 ? '半成品花材' : (scope.row.type === 3 ? '商户发布' : 'error')))}}</div>
                </template>
			</el-table-column>
			<el-table-column prop="created" label="创建时间" width="160">
			</el-table-column>
            <el-table-column label="状态" width="150">
                <template scope="scope">
                    <span class="goods-state">{{scope.row.is_check == 1 ? '可售' : '停售'}}</span>
                    <el-button type="text" class="state-edit" @click="adAuditdialogShow(scope.row.goods_sn, scope.row.is_check, scope.$index)">修改</el-button>
                </template>
			</el-table-column>
			<el-table-column prop="sort" label="排序号" width="100">
                <!--<template scope="scope">
                    <el-input-number size="small" :controls="false" v-model="scope.row.sort">
                    </el-input-number>
                </template>-->
			</el-table-column>
            <el-table-column label="操作" width="150">
				<template scope="scope">
					<!--<el-button type="text" size="small" @click="slodOut(scope.row.goods_sn, scope.row.is_onsell, scope.$index)">{{scope.row.is_onsell == 1 ? '下架' : '上架'}}</el-button> -->
					
                    <el-button type="text" size="small" @click="onEditGoods(scope.row.goods_sn)">编辑</el-button>
					<!--<el-button type="text" size="small">删除</el-button>-->
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
        <!--审核状态选择弹窗 -->
        <el-dialog title="选择状态" v-model="dialogFormVisible">
            <el-radio-group v-model="goodState">
                <el-radio :label="1">可售</el-radio>
                <el-radio :label="2">停售</el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="adAudit()">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
	import { getAdGoodsList, takeGoodsOffSell, takeGoodsONSell, adAuditGoods} from '../../api';
    import util from '../../common/js/util';
    export default {
        data() {
            return {
                loadingLayout: false,
                goodsList: [],
                page: {
                    currentPage: 5
                },
                formInline1: { // bar数据
                    user: '',
                    region: ''
                },
                formInline2: { // bar数据
                    user: '',
                    region: ''
                },
                screenGoodsState: 0,
                dialogFormVisible: false,
                goodState: '',
                goodSno: null,
                goodIndex: null,
            }
        },
        methods: {
            alertBox(res) {
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },
            // 按状态筛选商品
            onScreenGoodsState() {
                this.getGoods();
            },
            // 编辑商品
            onEditGoods(goods_sn) {
                this.$router.push('add?id=' + goods_sn);
            },
            // 发布商品
            onCreateGoods() {
                this.$router.push('add');
            },
            getGoods() {
                this.loadingLayout=true;
                let para = {
                    s: this.screenGoodsState
                }
                getAdGoodsList(para).then(res=>{
                    if (!this.alertBox(res)) return;
                    const _date = new Date();
                    for (var i = 0; i < res.data.list.length; i++) {
                        _date.setTime(res.data.list[i].created * 1000);
                        res.data.list[i].created = util.formatDate.format(_date, 'yyyy-MM-dd hh:mm:ss')
                        // res.data.list[i].created = _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate() + ' ' +
                        // _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds()
                    }
                    this.goodsList = res.data.list;
                    this.loadingLayout = false;
                });
            },
            adAuditdialogShow(_gSn, _gStatus, _index) {
                this.goodSno = _gSn;
                if (_gStatus == 1) {
                    _gStatus = 1;
                }
                else {
                    _gStatus = 2;
                }
                this.goodState = _gStatus;
                this.goodIndex = _index;
                this.dialogFormVisible = true;
            },
            adAudit() {
                const _gStatus = +(this.goodState);
                const _gSn = this.goodSno;
                const _index = this.goodIndex;
                adAuditGoods({
                    g_sn: _gSn,
                    g_status: _gStatus
                })
                .then((result) => {
                    if (result.state != 0) {
                        this.$message({
                            message: result.msg,
                            type: 'error'
                        });
                        return;
                    }
                    console.log(result);
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.goodsList[_index].is_check = _gStatus;
                    this.dialogFormVisible = false;
                });
            },
            onSubmit() {
                
            }
        },
        mounted() {
            this.getGoods();
        }
    }
</script>
