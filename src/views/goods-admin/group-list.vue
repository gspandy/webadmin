
<style lang="less">
    .goods-grout{
        .tool-bar{
            .right-button{
                text-align: right;
            }
        }
        .cell{
            button{
                margin: 0px;
            }
            > .el-input-number{
                width: auto;
                padding-top:8px;
            }
        }
        .page-area{
            padding: 50px 0px;
            text-align: right;
        }

    }
</style>

<template>
    <section class="goods-grout" v-loading="loadingLayout">
        <!--工具条-->
		<el-col :span="24" class="toolbar tool-bar" style="padding-bottom: 0px;">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form :inline="true">
                        <el-form-item>
                            筛选
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="标签名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="8" class="right-button">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary" @click="onAddGrout">添加标签</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
		</el-col>
        <!-- 商品列表 -->
		<el-table :row-class-name="'list-table'" :data="goodsGroutData" highlight-current-row style="width: 100%;">
			<el-table-column width="80">
                <template scope="scope">
                    <img :src="scope.row.img" />
                </template>
			</el-table-column>
			<el-table-column prop="tag_name" label="标签名称" min-width="200">
			</el-table-column>
			<el-table-column prop="count" label="商品数" width="130" sortable>
			</el-table-column>
			
			<el-table-column prop="created" label="创建时间" width="200" sortable>
			</el-table-column>
			<el-table-column prop="sort" label="排序号" width="100" sortable>
                <template scope="scope">
                    <el-input-number size="small" :controls="false" v-model="scope.row.sort">
                    </el-input-number>
                </template>
			</el-table-column>
            <el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button type="text" size="small" @click="onEditGrout(scope.row.tag_id)">查看/编辑</el-button> -
					<el-button type="text" size="small" @click="onDeleteTag(scope.row.tag_id, scope.$index)">删除</el-button>
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
	import { getGoodsTagList, delGoodsTag } from '../../api';
    export default {
        data() {
            return {
                loadingLayout:false,
                goodsGroutData:[],
                page:{
                    currentPage:5
                }
            }
        },
        methods:{
            alertBox(res){
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },
            // 添加标签
            onAddGrout() {
                this.$router.push('/goods-admin/group/add');
            },
            // 编辑
            onEditGrout(id) {
                this.$router.push('/goods-admin/group/add?id=' + id);
            },
            // 删除标签
            onDeleteTag(id, index) {
                this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                })
                .then(() => {
                    delGoodsTag({t_id: id}).then(res => {
                        if (!this.alertBox(res)) return;
                        this.goodsGroutData.splice(index, 1);
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                    },
                    err => {
                    });
                })
                .catch(() => {
                });
            },
            getGrout(){
                this.loadingLayout=true;
                let para = {
                    pg: 1,
                    type: 1
                }
                getGoodsTagList(para).then(res=>{
                    if (!this.alertBox(res)) return;
                    this.goodsGroutData = res.data;
                    this.loadingLayout = false;
                },
                err => {
                    this.loadingLayout = false;
                });

            },
        },
        mounted() {
            this.getGrout();
            // console.log(this.$route);
            // console.log(this.$router);
        }
    }
</script>