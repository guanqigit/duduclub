<template>
    <div class="error-page">
        <div class="error" v-if="error.statusCode==404">
            <h1><i>404</i></h1>
            <p>抱歉您访问的页面不存在！</p>
        </div>
        <div class="error" v-if="error.statusCode==500">
            <h1><i>500</i></h1>
            <p>哎呀,页面出错了！</p>
        </div>
        <div class="link">
            <nuxt-link to="/">返回首页</nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
    props:["error"],
    layout:"login"
}
</script>
<style lang="less" scoped>
    .error-page{
        .center(1000);
        .error{
            text-align: center;
            h1{
                font-size: 220px;
                color: @primary-color;
                // color: #fff;
                text-shadow: 5px 5px 0px #515a6e;
            }
            p{
                font-size: 16px;
            }
        }
        .link{
            text-align: center;
            font-size: 16px;
            padding-top: 80px;
            a{
                display: inline-block;
                background: @primary-color;
                color: #fff;
                padding: (@space-width - 10px) @space-width;
                border-radius: 3px;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>

