<template>
    <section class="tagdetail-page" v-loading="loadingLayout">
        <el-col :span="24">
            <el-form :label-position="labelPosition" label-width="80px" :model="article_tag">
                <el-form-item label="标签名称 : ">
                    <el-input v-model="article_tag.t_name" style="width: 300px;" placeholder="输入标签名称"></el-input>
                </el-form-item>
                <el-form-item label="包含内容 : ">
                    <el-col :span="24">
                        <el-table :data="articleData" border style="width: 100%">
                            <el-table-column label="内容列表" prop="a_title" align="center"></el-table-column>
                            <el-table-column label="操作" width="180" align="center">
                                <template scope="scope">
                                    <el-button size="small" type="danger" @click="deleteRow(scope.row, articleData, scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-popover ref="popover4" placement="right" width="400" v-model="visible">
                        <el-col :span="24">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item>
                                    <el-select size="small" style="width: 120px;" v-model="formInline.region" placeholder="选择栏目">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-select size="small" style="width: 120px;" v-model="formInline.region" placeholder="选择标签">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">确定</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-popover>
                    <el-button type="primary" @click="onSelectBtn">添加内容</el-button>
                </el-form-item>
                <hr />
                <el-form-item>
                    <el-button type="success" @click="onSaveBtn">保存</el-button>
                </el-form-item>                
            </el-form>
        </el-col>
        <!--选择关联文章-->
        <el-dialog title="选择关联文章" v-model="showAddArticle">
            <el-tabs v-model="selectTagsName">
                <el-tab-pane label="搜索" name="key">
                    <el-form label-width="100px">
                        <el-form-item label="关键字">
                            <el-input icon="search" :on-icon-click="onSearchArticle"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="筛选" name="screen">
                    <el-form>
                        <el-row :gutter="20" style="margin-bottom: 10px;">
                            <el-col :span="7">
                                <el-select placeholder="请选择" v-model="value1">
                                    <el-option label="选项一" value="选项一"></el-option>
                                    <el-option label="选项一" value="选项一"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7">
                                <el-select placeholder="请选择" v-model="value2">
                                    <el-option label="选项一" value="选项一"></el-option>
                                    <el-option label="选项一" value="选项一"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-table :data="searchData" @selection-change="onSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="标题" min-width="150" prop="title"></el-table-column>
            </el-table>
            <div class="ok-select-btn">
                <el-button type="primary" @click="onSelectBtn">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import { addArticleTag, getArticleTagInfo, listArticle, editArticleTag, delTagArticle} from 'api';
	export default {
        data () {
            return {
                // 标签内容
                tag_id: null,   // 标签id
                article_tag: {
                    t_name: '',
                    con_list: []    // {a_id, a_title}(文章ID，文章标题)
                },
                articleData: [],
                loadingLayout: false,    //页面loading
                searchData: [], // 搜索结果
                showAddArticle: false,  // 显示添加文章管理
                selectTagsName: 'key',
                selectArticle: [],
                needSelectArticle: [],
                tempSelectArticles: [],
                labelPosition: 'right',
                visible2: false,
                visible: false,
                formInline: {
                    user: '',
                    region: ''
                },
                restaurants: [],
                state4: '',
                timeout:  null,
                value1: '',
                value2: ''
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
            // 保存标签
            onSaveBtn() {
                if (!this.article_tag.t_name) {
                    this.$message.error('标签名不能为空！');
                    return;
                }
                for (var i = 0; i < this.needSelectArticle.length; i++) {
                    this.article_tag.con_list.push(this.needSelectArticle[i].article_id);
                }
                if (this.tag_id) {
                    this.editTag();
                }
                else {
                    this.addTag();
                }

            },
            // 点击搜索
            onSearchArticle() {
                listArticle().then(res => {
                    if (!this.alertBox(res)) return;
                    this.searchData = res.data.data;
                },
                err => {
                    console.log('失败');
                });
            },
            onSelectionChange(val) {
                this.tempSelectArticles = [];
                this.tempSelectArticles = this.tempSelectArticles.concat(this.formatArticleId(val));
            },
            // "添加内容" 和 "确定" 按钮的点击事件
            onSelectBtn() {
                if (this.showAddArticle) {
                    if (this.articleData.length === 0) {
                        this.articleData = this.articleData.concat(this.tempSelectArticles);
                        this.needSelectArticle = this.needSelectArticle.concat(this.tempSelectArticles);
                        this.showAddArticle = !this.showAddArticle;
                        return;
                    }
                    else {
                        for (var i = 0; i < this.tempSelectArticles.length; i++) {
                            for (var a = 0; a < this.articleData.length; a++) {
                                if (this.articleData[a].a_id === this.tempSelectArticles[i].article_id) {
                                    break;
                                }
                                else if (a === (this.articleData.length - 1)) {
                                    this.articleData.push(this.tempSelectArticles[i]);
                                    this.needSelectArticle.push(this.tempSelectArticles[i]);
                                }
                            }
                        }
                        this.searchData=[];
                    }
                }
                this.tempSelectArticles = [];
                this.showAddArticle = !this.showAddArticle;
            },
            formatArticleId(arr) {
                let newArr = arr;
                if (arr.length === 0) return;
                arr.forEach((item) => {
                    item.a_id = item.article_id;
                    item.a_title = item.title
                })
                return newArr;
            },
            // 添加标签
            addTag() {
                const _tName = this.article_tag.t_name;
                const _conList = this.getId(this.needSelectArticle);
                addArticleTag({
                    t_name: _tName,
                    con_list: _conList
                })
                .then(res=>{
                    // this.$router.push('/article/tags')
                    this.needSelectArticle = [];
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.article_tag = {
                        con_list:[],
                        t_name: ''
                    }
                    this.$router.push('/article/tags');
                },
                err=>{
                    console.log(err);
                });
            },
            // 编辑
            editTag() {
                const _tName = this.article_tag.t_name;
                const _conList = this.getId(this.needSelectArticle);
                editArticleTag({
                    t_id: this.tag_id,
                    t_name: _tName,
                    con_list: _conList
                })
                .then(res => {
                    // this.$router.push('/article/tags')
                    this.needSelectArticle = [];
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.$router.push('/article/tags');
                },
                err => {
                });
            },
            // 获取新添加的id
            getId(arr) {
                let newArr = [];
                arr.forEach((item) => {
                    let obj = {
                        a_id: item.article_id,
                        a_title: item.title
                    }
                    newArr.push(obj)
                });
                return newArr;
            },
            // 获取标签详情
            getTagInfo() {
                if (!this.tag_id) return;
                this.loadingLayout = true;
                getArticleTagInfo({t_id:this.tag_id}).then(res => {
                    this.loadingLayout=false;
                    if (!this.alertBox(res)) return;
                    this.article_tag.t_name = res.data.tag_name;
                    res.data.list.forEach((item) => {
                        this.article_tag.con_list.push(item.a_id);
                    });
                    this.articleData = res.data.list;
                },
                res => {
                    this.loadingLayout=false;
                });
            },
            getArticle() {
                listArticle().then(res => {
                    if (!this.alertBox(res)) return;
                    console.log(res);
                });
            },
            deleteRow(obj, row, _index) {
                this.$confirm('删除关联文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    const _tID = this.tag_id;
                    const _aID = obj.a_id;
                    if ((this.tag_id && this.needSelectArticle.indexOf(obj) !== -1) || !this.tag_id) {
                        row.splice(_index, 1)
                    }
                    else {
                       delTagArticle({
                            t_id: _tID,
                            a_id: _aID
                        })
                        .then((result) => {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            row.splice(_index, 1)
                        });                       
                    }
                })
                .catch(() => {        
                });
            },

            onSubmit() {

            },
            search() {
                this.visible2 = false;
            },
            loadAll() {
                return [
                    { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                    { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                    { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                    { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                    { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                    { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                    { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                    { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                    { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                    { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                    { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                    { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                    { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                    { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                    { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                    { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                    { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                    { "value": "钱记", "address": "上海市长宁区天山西路" },
                    { "value": "壹杯加", "address": "上海市长宁区通协路" },
                    { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                    { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                    { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                    { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                    { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                    { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                    { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                    { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                    { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                    { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                    { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                    { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                    { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                    { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                    { "value": "浏阳蒸菜", "address": "天山西路430号" },
                    { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                    { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                    { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                    { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                    { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                    { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                    { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                    { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                    { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
                ];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                return (state.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
        },
        mounted() {
            if (this.$route.query.tag_id) {
                this.tag_id = this.$route.query.tag_id;
                this.getTagInfo();
            }
            this.restaurants = this.loadAll();
        }
    }
</script>

<style lang="less">
    .tagdetail-page{
        .ok-select-btn{
            padding: 15px 0px;
        }
    }
</style>