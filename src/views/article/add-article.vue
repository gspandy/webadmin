<template>
    <section class="add-article-page" v-loading="loadingLayout">
        <el-row>            
            <el-col :span="24" class="submit">
                <!--<el-col :span="12" align="left"></el-col>
                <el-col :span="12" align="right"></el-col>-->
                <el-col :span="24" class="submit-header">
                    文章信息
                </el-col>
                <el-col :span="24" class="submit-list">
                    <el-form ref="form" :model="articleData" label-width="80px">
                        <el-form-item label="文字标题">
                            <el-input v-model="articleData.title" placeholder="输入文字标题"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="9">
                                <el-form-item label="文章分类">
                                    <el-select v-model="articleData.cat" placeholder="选择分类">
                                        <el-option v-for="item in articleCat" :key="item.cat_id" :label="item.cat_name" :value="item.cat_id"></el-option>
                                        <!--<el-option :label="区域二" value="beijing"></el-option>-->
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="排序号：">
                                    <el-input v-model="articleData.sort" placeholder="0"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="发布时间 : ">
                                    <el-date-picker :editable="false" v-model="issueTime" type="datetime" placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--<el-form-item label="文章头图">-->
                            <!--上传头图-->
                            <!--<el-upload
                                class="avatar-uploader"
                                :action="uploadImgUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :data="{article_sn: 123}"
                                :name="'article_logo'"
                                :headers="uploadHead"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>-->
                            <!--拖拽-->
                            <!--<div class="addImg">
                                <div class="img-list" v-if="images.length > 0">
                                    <ul>
                                        <draggable v-model="images" class="list-group" element="ul" :move="onMove" :options="dragOptions" @start="isDragging=true" @end="isDragging=false">
                                            <transition-group>
                                                <li class="list-group-item" key="" v-for="(image, index) in images">
                                                    <img :src="image" />
                                                    <i :data-index="index" @click.prevent="removeImg" class="el-icon-circle-close remove"></i>
                                                </li>
                                            </transition-group>
                                        </draggable>
                                    </ul>
                                </div>
                                <div class="img-btn">
                                    <div class="img-btn-load" @click="addPic">
                                        <i class="el-icon-plus"></i>
                                    </div>
                                    <input ref="file" type="file" @change="onFileChange" multiple style="display: none;">
                                </div>
                            </div>-->

                            <!--test images-->
                            <!--<div>
                                <pre>{{listString}}</pre>
                            </div>-->
                        <!--</el-form-item>-->
                        <el-form-item label="文章头图">
                            <img-upload :preinstall-images="preinstallImg" @imgChange="onImgChange"></img-upload>
                        </el-form-item>
                        <el-form-item label="文章状态">
                            <el-checkbox-group v-model="articleData.type">
                                <el-checkbox label="0" name="type">普通</el-checkbox>
                                <el-checkbox label="1" name="type">推荐</el-checkbox>
                                <el-checkbox label="2" name="type">热门</el-checkbox>
                                <el-checkbox label="3" name="type">置顶</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="文章内容">
                            <div>
                                <wang-editor
                                v-if="loadingEditor"
                                v-bind:init-content="articleData.content"
                                :uploadImgUrl="editorUpImg"
                                :params-data="uploadParams"
                                name="art_desc_img"
                                @contentChanged="onContentChanged"></wang-editor>
                            </div>
                        </el-form-item>
                        <el-form-item label="摘要简介">
                            <el-input type="textarea" v-model="articleData.t_desc"></el-input>
                        </el-form-item>
                        <el-form-item label="文章标签">
                            <el-tag style="margin-left: 5px;"
                                v-for="tag in selectTags"
                                :key="tag.id"
                                :type = "type"
                                :closable="true"
                                :close-transition="false"
                                @close="onRemoveTag(tag.id)">
                                {{tag.tag_name}}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="mini"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm">
                            </el-input>
                            <el-select @change="onSelectTag" v-model="selectTagVal" placeholder="选择分类">
                                <el-option v-for="item in articleTag" :key="item.id" :label="item.tag_name" :value="item.id"></el-option>
                            </el-select>
                            <!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
                        </el-form-item>
                        <el-form-item label-width="100px">
                            <el-button class="submit-btn" size="large" type="primary" @click="onSubmit">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-col>
        </el-row>
        
    </section>
</template>

<script>
    import vue from 'vue';
    import { mapGetters } from 'vuex';
    import draggable from 'vuedraggable';
    import Promise from 'promise';
    import util from '../../common/js/util';
    import wangEditor from '../../components/wangeditor.vue';
    import imgUpload from '../../components/upload-img.vue';
    import { base } from 'api/config';
    import { uploadArticleImg, getArticleCatList, getArticleTagList, addArticle, getArticleInfo, editArticle} from 'api'
    // import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api'

    export default {
        data () {
            return {
                articleId: null,
                loadingEditor: false,
                issueTime: new Date(),
                uploadImgUrl: base + '/art/web/article/up_logo_img',
                // uploadImgUrl: 'http://localhost:3800/upload/images',
                editorUpImg: base + '/art/web/article/upload_desc_img',
                uploadParams: {
                    token: this.getLoginToken()
                },
                preinstallImg:[],
                // 表单数据
                articleData: {
                    title: '',
                    t_desc: '',
                    cat: '',
                    sort: '',
                    type: [],
                    content: '',
                    logo_url: '',   // 封面图片
                    issue_time: '',
                    tags: []
                },
                selectTags:[],
                articleCat: [], //  文章分类选项
                articleTag: [],  // 文章标签选项
                logoImg:[],

                selectTagVal: '',   // 选中的标签值
                loadingLayout: false,   // 是否显示loading层
                // // 上传图片数据
                imageUrl: '',
                // 标签数据
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                type: 'primary',
            }
        },
        components: {
            draggable,
            wangEditor,
            imgUpload
        },
        methods: {
            ...mapGetters(['getLoginToken']),
            resetArticleData() {
                for (var key in this.articleData) {
                    if (key === 'tags' || key === 'type') {
                        this.articleData[key] = [];
                    }
                    else {
                        this.articleData[key] = '';
                    }
                }
                this.articleTag.push.apply(this.articleTag, this.selectTags);
                this.selectTags = [];
            },
            // 文章内容被编辑时触发
            onContentChanged(_articleContent) {
                this.articleData.content = _articleContent;
            },
            /*
             *  获取文章分类选项
             */
            getCat() {
                getArticleCatList().then(success => {
                    this.articleCat = success.data.data;
                },
                err => {
                });
            },
            // 获取文章标签列表
            async getArticleTag() {
                this.loadingLayout = true;
                getArticleTagList().then(success=>{
                    this.loadingLayout = false;
                    this.articleId && this.readArticleData(this.articleId);
                    if(success.state !==0) return;
                    this.articleTag = success.data.data;
                },
                err => {
                    this.loadingLayout = false;
                });
            },
            // 发布文章
            createArticle() {
                addArticle({...this.articleData}).then(res => {
                    if (res.state !== 0) {
                        this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定',
                        });
                        return;
                    }
                    this.resetArticleData();
                    this.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.$router.push('/article/pages')
                },
                err => {
                    console.log('失败：', err);
                });
            },
            // 上传图片
            uploadImg() {
                // var formdata=new FormData();
                // formdata.append('article_sn', 12);
                // formdata.append('article_logo', this.logoImg[0]);

                // return uploadArticleImg(formdata).then(res => {
                //     console.log('cg');
                //     this.articleData.logo_url = res.data.img;
                //     resolve();
                // },
                // err => {});


                 return new Promise((resolve) => {
                    var formdata=new FormData();
                    formdata.append('token', this.getLoginToken());
                    formdata.append('article_logo', this.logoImg[0]);

                    uploadArticleImg(formdata).then(res => {
                        console.log('cg');
                        this.articleData.logo_url = res.data.img;
                        resolve();
                    },
                    err => {});
                });
            },
            // 修改文章
            editArticle() {
                editArticle({
                    a_id: this.articleId,
                    ...this.articleData
                })
                .then(res => {
                    if (res.state !== 0) {
                        this.$alert(res.msg, '提示：', {
                            confirmButtonText: '确定',
                        });
                        return;
                    }
                    this.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.$router.push('/article/pages')
                },
                err => {});
            },
            // 选择标签
            onSelectTag(val) {
                for (var i = 0; i < this.articleTag.length; i++) {
                    if (this.articleTag[i].id === val){
                        // if (this.articleData.tags.indexOf(_tag) === -1) {
                        //     this.articleData.tags.push(this.articleTag[i]);
                        // }
                        this.articleData.tags.push(this.articleTag[i].id);
                        this.selectTags.push(this.articleTag[i]);
                        this.articleTag.splice(i,1);
                        break;
                    }
                }
                this.selectTagVal='';
            },
            // 标签添加操作
            onRemoveTag(id) {
                for (var i = 0; i < this.selectTags.length; i++) {
                    if (this.selectTags[i].id === id) {
                        this.articleTag.push(this.selectTags[i]);
                        this.selectTags.splice(i,1);
                        this.articleData.tags.splice(i,1);

                        break;
                    }
                }
                // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            // 提交文章内容
            async onSubmit() {
                this.articleData.issue_time = this.issueTime.getTime();
                const aData = this.articleData;
                if (!aData.logo_url && this.logoImg.length == 0) {
                     this.$alert('请选择一张图片', '提示', {
                        confirmButtonText:'确定'
                    });
                    return;
                }
                // return;
                if (this.articleId) {
                    if (this.logoImg.length > 0) {
                        await this.uploadImg();
                    }
                    this.editArticle();
                }
                else {
                    if (!this.logo_url) {
                        await this.uploadImg();
                    }
                    this.createArticle();
                }
            },
            
            // 选择图片后回调
            onImgChange(img) {
                this.logoImg = img;

                // var formdata=new FormData();
                // formdata.append('article_sn', 12);
                // formdata.append('article_logo', img[0]);
                // testUploadImgApi(formdata);
            },

            // 上传头图
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 添加图片
            addPic(e){ 
                e.preventDefault();
                // $('input[type=file]').trigger('click');
                this.$refs.file.click();
                return false;
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return; 
                }
                this.createImage(files);
            },
            createImage(file) {   
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload =function(e){
                        vm.images.push(e.target.result);
                    };
                }
                // setInterval(function() {
                //     console.log(vm.images);
                // }, 5000);
                // this.images = this.images.map( (name,index) => {
                //     return {src: name, id: index};
                // })
            },
            // 删除图片
            removeImg(e) {
                // console.log(e.target.dataset.index);
                const index = e.currentTarget.dataset.index || e.target.dataset.index;
                this.images.splice(index,1);
                
                // console.log(this.images.map( (name,index) => {
                //     return {src: name, id: index+1};
                // }));
            },
            // 读取文章内容
            readArticleData(id) {
                this.loadingLayout = true;
                getArticleInfo({a_id: id}).then(res => {
                    const content = res.data;
                    this.articleData = {
                        title: content.title,
                        t_desc: content.title_desc,
                        cat: content.cat_id,
                        sort: content.sort_order,
                        type: content.article_type || [],
                        content: content.content,
                        logo_url: content.logo_url,
                        issue_time: content.issue_time,
                        tags: []
                    };
                    this.preinstallImg = [{
                        url: content.logo_url
                    }]
                    this.issueTime = new Date(content.issue_time);
                    // this.selectTags = content.tags;
                    for (var i = 0; i < content.tags.length; i++) {
                        // this.articleData.tags[i] = content.tags[i].id;
                        this.onSelectTag(content.tags[i].id);
                    }
                    // this.$broadcast('onSetEditorContent');
                    this.loadingEditor = true;
                    this.loadingLayout = false;
                }, 
                err => {
                    this.loadingLayout = false;
                });
            },
            // 测试上传图片
            // testUploadImg() {
            //     const file = document.querySelector('#cover-img').files[0];
            //     var formdata=new FormData();
            //     formdata.append('article_sn', 12);
            //     formdata.append('article_logo', file);
            //     testUploadImgApi(formdata);
            // },







            // 上传图片操作
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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
                    this.articleData.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            // 拖拽
            onMove ({relatedContext, draggedContext}) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            }
        },
        computed: {
            dragOptions () {
                return  {
                    animation: 0,
                    group: 'description',
                    disabled: !this.editable,
                    ghostClass: 'ghost'
                };
            },
            listString(){
                // var that = this;
                // setInterval(function() {
                //     console.log(that.images);
                // }, 5000)
            }
        },
        mounted() {
            if (this.$route.query.id) {
                this.articleId = this.$route.query.id;
            }
            else {
                this.loadingEditor = true;
            }
            this.getCat();
            this.getArticleTag();
            // console.log(this.$route.query);
            // 获取列表数据
            // let para = {
            //     s: 1,
            //     l: 10,
            //     k:1
            // }
            // listArticle(para).then(success=>{
            //     console.log('成功');
            // },
            // err=>{
            //     console.log('失败');
            // });
        }
    }
</script>

<style lang="less">
    .add-article-page {
        .input-new-tag{
            width: 78px;
            margin-left: 10px;
            vertical-align: middle;
        }
    
        .submit {
            box-sizing: border-box;
            border: 1px solid #ccc;
            padding: 20px;
            .submit-header {
                font-weight: 800;
                line-height: 30px;
                border-bottom: 1px solid #ccc;
            }
            .submit-list {
                padding-top: 20px;
            }
        }
        .addImg {
            ul {
                padding-left: 0px;
                margin: 0;
                font-size: 0;
                li {
                    display: inline-block;
                    position: relative;
                    width: 64px;
                    height: 64px;
                    list-style: none;
                    margin-right: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.5);
                    // overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .img-list {
                // display: inline-block;
                float: left;
                .remove {
                    // width: 16px;
                    // height: 16px;
                    border-radius: 50%;
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    z-index: 10;
                    color: #ff4949;
                    background: #fff;
                    font-size: 14px;
                }
            }
            .img-btn {
                // display: inline-block;
                float: left;
                .img-btn-load {
                    border: 1px solid rgba(0, 0, 0, 0.5);
                    width: 64px;
                    height: 64px;
                    line-height: 64px;
                    text-align: center;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
        // 上传头图
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #20a0ff;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px!important;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        // 拖拽
        // .flip-list-move {
        //     transition: transform 0.5s;
        // }

        // .no-move {
        //     transition: transform 0s;
        // }

        // .ghost {
        //     opacity: .5;
        //     background: #C8EBFB;
        // }

        // .list-group {
        //     min-height: 20px;
        // }

        // .list-group-item {
        //     cursor: move;
        // }

        // .list-group-item i{
        //     cursor: pointer;
        // }
    }
</style>