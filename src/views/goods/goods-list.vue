
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
        .el-table__header th {
            text-align: center;
        }
        .qr-code-box{
            text-align: center;
            padding-top: 20px;
            a {
                text-decoration: none;
            }
        }
        .qr-code-hit{
            font-size: 16px;
        }
    }
</style>
<template>
    <section class="goods-list" v-loading="loadLayout">
        <!--工具条-->
		<el-col :span="24" class="toolbar tool-bar" style="padding-bottom: 0px;">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button :type="goodsType === 1 ? 'primary' : ''" @click="onSetScreen(1)">出售中</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button :type="goodsType === 3 ? 'primary' : ''" @click="onSetScreen(3)">已售完</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button :type="goodsType === 2 ? 'primary' : ''" @click="onSetScreen(2)">仓库/未上架</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="11" class="right-button">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="">待审核</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="onGoToAddGoods">发布商品</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
		</el-col>
        <!-- 商品列表 -->
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
			<!--<el-table-column prop="type" label="商品类型" width="120">
			</el-table-column>-->
			<el-table-column prop="created" label="创建时间" width="160">
			</el-table-column>
			<el-table-column prop="sort" label="排序号" width="100">
                <!--<template scope="scope">
                    <el-input-number size="small" :controls="false" v-model="scope.row.sort">
                    </el-input-number>
                </template>-->
			</el-table-column>
            <el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button type="text" size="small" @click="slodOut(scope.row.goods_sn, scope.row.is_onsell, scope.$index)">{{scope.row.is_onsell == 1 ? '下架' : '上架'}}</el-button> -
					<el-button type="text" size="small" @click="onEditGoods(scope.row.goods_sn)">编辑</el-button>-
					<el-button type="text" size="small" @click="onGetQrCode(scope.row.goods_sn)">小程序二维码</el-button>-
				</template>
			</el-table-column>

		</el-table>
        <!-- 分页 -->
        <div class="page-area">
            <el-pagination
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="4000">
            </el-pagination>
        </div>

        <!-- 选择标签 -->
        <el-dialog title="下载商品二维码" size="small" v-model="downloadQrCodeDialog">
			<div class="qr-code-hit">你确定要下载“{{goodsQrCode.goods_name}}”商品的二维码吗？</div>
            <div class="qr-code-box">
                <a class="el-button" href="javascript:;" @click="downloadQrCodeDialog = false">取消</a>
                <a class="el-button el-button--primary" @click="downloadQrCodeDialog = false" :href="goodsQrCode.qr_url" target="_blank" :download="Date.now() + '_' + goodsQrCode.qr_url.split('/').pop()">下载</a>
            </div>
        </el-dialog>
    </section>
</template>
<script>
	import { getGoodsList, getGoodsQrCode, takeGoodsOffSell, takeGoodsONSell} from 'api';
    import util from '../../common/js/util';
    export default {
        data() {
            return {
                goodsType: 2,   // 商品状态筛选
                goodsList: [],
                currentPage: 1,
                downloadQrCodeDialog: false,
                loadLayout: true,
                goodsQrCode: {
                    goods_name: '',
                    qr_url: '',
                    goods_sn: ''
                }
            }
        },
        methods: {
            alertBox(res){
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },

            // 设置筛选状态
            onSetScreen(_type) {
                this.goodsType = _type;
                this.getList();
            },
            // 发布商品
            onGoToAddGoods() {
                this.$router.push('add');
            },
            // 编辑商品
            onEditGoods(goods_sn) {
                this.$router.push('add?id=' + goods_sn);
            },
            // 获取商品二维码
            onGetQrCode(goods_sn) {
                let _goods = {};
                for (var i = 0; i < this.goodsList.length; i++) {
                    if (this.goodsList[i].goods_sn === goods_sn) {
                        _goods = this.goodsList[i];
                        if (this.goodsList[i].qr) {
                            this.goodsQrCode.goods_sn = goods_sn;
                            this.goodsQrCode.goods_name = _goods.goods_name;
                            this.goodsQrCode.qr_url = _goods.qr;
                            this.downloadQrCodeDialog = true;
                            return;
                        }
                        break;
                    }
                }
                this.loadLayout = true;
                getGoodsQrCode({g_id: goods_sn})
                .then(res => {
                    this.loadLayout = false;
                    if (!this.alertBox(res)) return;
                    this.downloadQrCodeDialog = true;
                     this.goodsQrCode.goods_sn = goods_sn;
                    this.goodsQrCode.goods_name = _goods.goods_name;
                    this.goodsQrCode.qr_url = res.data.show_img;
                    _goods.qr = res.data.show_img;
                },
                err => {
                    this.loadLayout = false;
                });
            },
            getList(){
                this.loadLayout = true;
                let param = {
                    s: this.goodsType
                }
                getGoodsList(param).then(res => {
                    this.loadLayout = false;
                	if (res.state !== 0) {
                        this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定'
                        });
                        return;
                    }
                	// console.log(res)
                    const _date = new Date();
                    for (var i = 0; i < res.data.list.length; i++) {
                        _date.setTime(res.data.list[i].created * 1000);
                        res.data.list[i].created = util.formatDate.format(_date, 'yyyy-MM-dd hh:mm:ss');
                        // res.data.list[i].created = _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate() + ' ' +
                        // _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds()
                    }
                    this.goodsList = res.data.list;
                    
                }, err => {
                    this.loadLayout = false;
                	console.log(err);
                });
            },
            takeGoodsOff(_goodsSn, _index) {
                takeGoodsOffSell({
                    goods_sn: _goodsSn
                })
                .then((result) => {
                    console.log(result)
                    if (result.state != 0) {
                        this.$message({
                            message: result.msg,
                            type: 'warning'
                        });
                        return;
                    }
                    this.$message({
                        message: '商品下架成功',
                        type: 'success'
                    });
                    this.goodsList[_index].is_onsell = 0;
                });
            },
            takeGoodsOn(_goodsSn, _index) {
                takeGoodsONSell({
                    goods_sn: _goodsSn
                })
                .then((result) => {
                    console.log('on', result)
                    if (result.state != 0) {
                        this.$message({
                            message: result.msg,
                            type: 'warning'
                        });
                        return;
                    }
                    this.$message({
                        message: '商品上架成功',
                        type: 'success'
                    });
                    this.goodsList[_index].is_onsell = 1;
                });
            },
            slodOut(_goodsSn, _onSell, _index) {
                const _this = this;
                if(_onSell == 1) {
                    _this.$confirm('是否下架该商品?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        _this.takeGoodsOff(_goodsSn, _index);
                    });         
                }
                else {
                    _this.takeGoodsOn(_goodsSn, _index);
                }
            }
        },
        created() {
        },
        mounted() {
            this.getList();
        }
    }
</script>
