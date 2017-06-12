<template>
	<section class="shop-info">
        <!--客户基本信息-->
		<el-row>
			<el-col :span="24" class="title">
				主体列表信息
			</el-col>
		</el-row>
		<hr />
        <template>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column
                    prop="group_type"
                    label="主体类型">
                    <template scope="scope">
                        {{mapList[scope.row.group_type - 1]}}
                    </template> 
                </el-table-column>
                <el-table-column
                    prop="group_represent"
                    label="主体代表人／名字">
                </el-table-column>
                <el-table-column
                    prop="contact_user"
                    label="联系人名字">
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="联系电话">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button @click="handleClick(scope.row.group_sn, scope.row.group_represent, scope.row.group_type)" type="text" size="small">添加店铺</el-button>
                        <el-button @click="onEditShopAdmin(scope.row.group_sn)" type="text" size="small">编辑</el-button>
                        <el-button @click="onDeleteShopAdmin(scope.$index, scope.row.group_sn)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
	</section>
</template>

<script>
	import { getListAdmin, addGroupAdmin, addShopAdmin, delShopGroup } from 'api';
    import { mapMutations } from 'vuex';

	export default {
		data() {
			return {
				tableData: [],
                mapList: ['个人', '企业']
			};
		},
		mounted() {
            this.getList();
		},
		methods: {
            ...mapMutations(['setSelectMainBody']),
            // 添加店铺
            handleClick(code, name, type) {
                // this.$store.commit('GROUPSNCODE', code);
                this.$store.commit('TYPE', type);
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].group_sn === code) {
                        this.setSelectMainBody(this.tableData[i]);
                        break;
                    }
                }
                this.$router.push('./shop-admin-info?g_sn=' + code);
            },
            // 软删除主题
            onDeleteShopAdmin(index, g_sn) {
                this.$confirm('此操作将删除该主体, 是否继续?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                })
                .then(() => {
                    delShopGroup({g_sn: g_sn}).then(res => {
                        if (res.state != 0) {
                            this.$alert(res.msg, '提示', {
                                confirmButtonText:'确定'
                            });
                            return;
                        };
                        this.tableData.splice(index, 1);
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                    }, err => {
                        console.log(err);
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
            },
            // 编辑主体信息
            onEditShopAdmin(g_sn) {
                this.$router.push('/shop-admin/shop-admin-add?g_sn=' + g_sn);
            },
            // 获取主体
			getList() {
                getListAdmin().then((res) => {
                    if (res.state != 0) {
                        this.$message({
                            message: '获取主体列表失败',
                            type: 'error'
                        });
                    } else {
                        this.tableData = res.data;
                        // console.log(this.tableData);
                    }
                });
            }
		}
	}
</script>

<style scoped lang="less">
	.shop-info {
		padding: 10px;
		.title {
			padding: 5px 0;
			font-weight: bold;
		}
	}
</style>