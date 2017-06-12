
<style lang="less">
.preview-box {
    @boxH: 178px;
    &.min-upload {
        @boxW2: 60px;
        @boxH2: 30px;
        display: inline-block;
        .img-item,
        .select-img-box {
            width: @boxW2;
            height: @boxH2;
        }
        .select-img-box {
            line-height: @boxH2;
        }
        .select-img-box {
            .el-icon-plus {
                display: none;
            }
            .el-icon-upload2{
                display: inline-block;
            }
        }
    }
    .preview-list {
        margin: 0;
        display: inline;
        vertical-align: top;
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .img-item {
        transition: all .5s cubic-bezier(.55,0,.1,1);
        font-size: 14px;
        color: #48576a;
        line-height: 1.8;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        position: relative;
        background-size: cover;
        background-position: center;

        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: @boxH;
        height: @boxH;
        margin: 0 8px 8px 0;
        display: inline-block;
        &:first-child {
            // margin-top: 10px;
        }
        &:hover {
            .ope-layout {
                display: flex;
            }
        }
        > img {
            width: 100%;
            height: 100%;
            /* transition: all .5s cubic-bezier(.55,0,.1,1); */
            font-size: 14px;
            color: #48576a;
            line-height: 1.8;
            box-sizing: border-box;
            border-radius: 4px;
            width: 100%;
            position: relative;
        
        }
    }
    .status-icon {
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
        i{
            display: none;
            color: #fff;
            font-size: 12px;
            margin-top: 11px;
        }
        .el-icon-check {
            display: block;
            transform: rotate(-45deg) scale(.8);
        }
        .el-icon-close {
            transform: rotate(-45deg) scale(.7);
        }
    }
    .ope-layout {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background-color: rgba(0,0,0,.5);
        // opacity: 0;
        // transition: opacity .3s;
        display: flex;
        justify-content:center;
        align-items:Center;
        display: none;
        span {
            cursor: pointer;
            // display: block;
        }
        .prev-icon {
        }
        .delete-icon {
            position: static;
            font-size: inherit;
            color: inherit;
            right: 10px;
            top: 0;
            margin-left: 15px;
        }
    }
    .select-img-box {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: @boxH;
        height: @boxH;
        cursor: pointer;
        line-height: @boxH;
        vertical-align: top;

        display: inline-block;
        text-align: center;
        cursor: pointer;
        position: relative;
        &:active,
        &:hover {
            border-color: #20a0ff;
            i{
                color: #20a0ff;
            }
        }
        .el-icon-plus{
            font-size: 28px;
            color: #8c939d;
        }
        .el-icon-upload2 {
            color: #8c939d;
            display: none;
            font-size: 15px;
        }
        .head-preview {
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            z-index: 5;
        }
    }
}

</style>
 
<template>
    <div class="preview-box" :class="[ viewType === 3 ? 'min-upload' : '' ]">
        <ul class="preview-list" v-if="viewType === 1">
            <li class="img-item" v-for="(item,index) in preinstallImages" :style="{backgroundImage:'url(' + item.url + ')'}" :key="item.url">
                <span class="ope-layout">
                    <span @click="onRemovePreImg(index)" class="delete-icon">
                        <i class="el-icon-delete2"></i>
                    </span>
                </span>
            </li>
            <li class="img-item" v-for="(item,index) in previewImg" :style="{backgroundImage:'url(' + item + ')'}">
                <!--<img src="http://fanyiguan.youdao.com/imgs/5/p1.png" />-->
                <!--<a class="el-upload-list__item-name">
                    <i class="el-icon-document">
                    </i>
                </a>-->

                <!--<label class="status-icon">
                    <i class="el-icon-check"></i>
                    <i class="el-icon-close"></i>
                </label>-->
                <span class="ope-layout">
                    <!--<span class="prev-icon">
                        <i class="el-icon-view"></i>
                    </span>-->
                    <span @click="onRemoveImg(index)" class="delete-icon">
                        <i class="el-icon-delete2"></i>
                    </span>
                </span>
            </li>
        </ul>
        <div @click="onClickSelect" class="select-img-box">
            <div class="head-preview" 
                v-if="viewType === 2 && (previewImg.length > 0 || preinstallImages.length > 0)"
                :style="{backgroundImage:'url(' + (previewImg.length > 0 ? previewImg[0] : preinstallImages[0].url) + ')'}">
                
            </div>
            <i class="el-icon-plus"></i>
            <i class="el-icon-upload2 uploader-icon"></i>
            <input type="file" @change="onChange" ref="img-upload" name="file" accept="image/*" class="el-upload__input">
        </div>
    </div>
</template>

<script>
export default {
        data() {
            return {
                editor: null,
                selectImg: [],
                previewImg: [],
                localImg:[],
                viewType: 2
            }
        },
        props:{
            listType: String,
            multiple: {
                type: Boolean,
                default: false
            },
            preinstallImages: {
                type: Array,
                default(){
                    return []
                }
            },
            index: {
                type: Number,
                default: 0
            }
        },
        methods: {
            // 点击选择图片
            onClickSelect() {
                this.$refs['img-upload'].click();
            },
            onRemoveImg(index) {
                this.selectImg.splice(index, 1);
                this.previewImg.splice(index, 1);
                this.$emit('rmSelectImg', this.selectImg);
            },
            onRemovePreImg(index) {
                this.preinstallImages.splice(index, 1);
            },
            onChange(ev) {
                const files = ev.target.files;
                if (files.length === 0) return;
                // const dom = this.$refs['img-upload'];
                // console.log(files);
                if (this.viewType === 3) {
                    this.$emit('imgChange', files[0], this.index);
                    return;
                }
                if (this.viewType === 2) {
                    this.setPreviewImg(files[0], true);
                    return;
                }
                for (var f = 0; f < files.length; f++) {
                    this.setPreviewImg(files[f], (f === files.length - 1));
                }
            },
            setPreviewImg(file, end) {
                const that = this;
                //预览
                const reader = new FileReader();
                reader.onload = function(evt){
                    if (that.viewType === 2) {
                        // that.previewImg.length > 0 && that.previewImg.splice(0,1);
                        that.preinstallImages.length > 0 && that.preinstallImages.splice(0,1);
                        that.previewImg= [evt.target.result];
                        that.selectImg = [file];
                    }
                    else {
                        that.previewImg.push(evt.target.result);
                        that.selectImg.push(file);
                    }
                    if (that.viewType === 2 || end) {
                        that.$emit('imgChange', that.selectImg);
                    }
                    // if (that.multiple) {
                    //     that.$emit('imgChange', that.selectImg);
                    // }
                    // else {
                    //     end && that.$emit('imgChange', that.selectImg);
                    // }
                }
                reader.readAsDataURL(file);
            }
        },
        events: {
        },
        mounted() {
            if (this.listType === 'picture-card') {
                this.viewType = 1;
            }
            else if (this.listType === 'min-view') {
                this.viewType = 3;
            }
            else {
                this.viewType = 2;
                this.multiple = false;
                // this.preinstallImages = this.preinstallImages.length > 0 ? this.preinstallImages[0] : [];
                // this.previewImg = this.previewImg.length > 0 ? this.previewImg[0] : [];
            }
            this.preinstallImages = this.preinstallImages || [];
            

            // this.previewImg = this.previewImg.concat(this.preinstallImages);
            // console.log(this.previewImg);
            // setTimeout(() => {
            //     this.preinstallImages.splice(0,1);
            // }, 5000);
            // console.log('预设', this.preinstallImages);
        }
}
</script>