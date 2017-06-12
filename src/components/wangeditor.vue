
<style lang="less">
</style>

<template>
    <div>
        <!--<div id="goods-info-text" style="height:300px;">
            <p>要初始化的html内容...</p>
        </div>-->
        <textarea id="goods-info-text" style="height:800px;"></textarea>
        <input type="file" @change="onSelectImgChange" id="wangeditor-img-upload-input" accept="image/*" style="display:none;" />
    </div>
</template>

<script>
    import wangEditor from 'wangeditor';
    import axios from 'axios';
    export default {
        data() {
            return {
                editor: null,
                imgUploadDom: {},

            }
        },
        props:{
            menus: Object,
            initContent:String,
            uploadImgUrl: String,
            paramsData: {
                type: Object,
                default(){
                    return {}
                }
            },
            name: {
                type: String,
                default: 'image'
            },
            uploadHeaders: {
                type: Object,
                default() {
                    return {
                        'Content-Type':'application/x-www-form-urlencoded',
                    }
                }
            }
        },
        methods: {
            createEditor() {
                const _this = this;
                // 获取元素
                const editorDom = document.getElementById('goods-info-text');
                this.editor = new wangEditor(editorDom);
                // 生成编辑器
                const editor = this.editor;
                // 初始化菜单
                editor.config.menus = this.menus || [
                    'source',
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    'eraser',
                    'forecolor',
                    'bgcolor',
                    'quote',
                    'fontfamily',
                    'fontsize',
                    'head',
                    'unorderlist',
                    'orderlist',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    'link',
                    'unlink',
                    'table',
                    'emotion',
                    'img',
                    'video',
                    // 'location',
                    'insertcode',
                    'undo',
                    'redo',
                    'fullscreen'
                ];
                editor.onchange = function () {
                    // onchange 事件中更新数据
                    // _this.initContent = editor.$txt.html();
                    _this.$emit('contentChanged', editor.$txt.html());
                };

                // editor.config.uploadImgUrl = this.uploadImgUrl || '';
                // editor.config.uploadImgFileName = 'article_logo';
                // editor.config.uploadParams = this.paramsData || {}
                // editor.config.uploadHeaders = {
                //     'Accept' : 'text/x-json',
                //     'Content-Type':'application/x-www-form-urlencoded',
                //     'Access-Control-Allow-Origin':'*'
                // };
                // editor.config.withCredentials = false;

                editor.config.customUpload = true;  // 配置自定义上传的开关
                // 配置上传事件，uploadInit方法已经在上面定义了
                editor.config.customUploadInit = function() {
                    // this 即 editor 对象
                    var editor = this;
                    // 编辑器中，触发选择图片的按钮的id
                    var btnId = editor.customUploadBtnId;
                    document.getElementById(btnId).addEventListener('click', () => {
                        _this.imgUploadDom.click();
                    });
                    return false;
                };
                // editor.config.hideLinkImg = true;
                // 创建
                editor.create();
                // 初始化内容
                editor.$txt.html(this.initContent || '');
            },
            onSelectImgChange(ev) {
                const files = ev.target.files;
                if (files.length === 0) return;
                this.uploadImage(files[0]);
            },
            uploadImage(file) {
                const formdata = new FormData();
                formdata.append(this.name, file);
                for (var key in this.paramsData) {
                    formdata.append(key, this.paramsData[key]);
                }
                axios.post(this.uploadImgUrl, formdata).then(res => {
                    if (res.state !== 0) return;
                    this.editor.command(null, 'insertHtml', '<img data-name="' + res.data.img + '" src="' + res.data.show_img + '" style="max-width:100%;"/>');
                },
                err => {
                    console.error('图片上传出错了！');
                });
            }

        },
        events: {
            'onSetEditorContent' (msg) {
            }
        },
        mounted() {
            this.createEditor();
            this.imgUploadDom = document.getElementById('wangeditor-img-upload-input');
            // console.log(this);
            // // 在组件 B 创建的钩子中监听事件
            // this.$parent.$on('onSetWangEditor', function (id) {
            //     console.log(1);
            // })
        }
    }
</script>
