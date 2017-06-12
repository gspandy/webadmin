<template>
        <section class="service">
            <div class="service-item" v-for="item in serviceData ">
                <span>{{item}}</span>
            </div>
        </section>
</template>

<script>
    export default {
        data() {
            return {
                serviceData: ['团购模块', '满减/满返', '优惠券', '会员卡管理']
            }
        }
    }
</script>

<style>
    .service {
        margin: 10px;
    }
    .service-item {
        margin-right: 20px;
        padding: 30px 15px;
        border: 1px solid #dfe6ec;
        width: 120px;
        height: 120px;
        border-radius: 6px;
        float: left;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        text-align: center;
        line-height: 50px;
        transition: all .3s
        
    }
    .service-item:hover {
        box-shadow: 0 0 20px  rgba(0, 0, 0, .3)
    }
</style>