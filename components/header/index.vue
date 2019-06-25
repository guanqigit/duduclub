<template>
    <header class="header">
        <div class="dsahboard-nav" @click="SET_MOBILE_NAV">
            <i class="iconfont icon-nav"></i>
        </div>
        <nuxt-link to="/dashboard" class="dsahboard-link" title="控制台">
            <i class="iconfont icon-dashboard"></i>
        </nuxt-link>
        <headerUser/>
    </header>
</template>
<script>
import headerUser from "./user"
import {mapMutations} from "vuex"
export default {
    components:{
        headerUser
    },
    methods:{
        ...mapMutations(["SET_MOBILE_NAV"])
    }
}
</script>

<style lang="less" scoped>
    @media (min-width:769px) {
        .dsahboard-nav{
            display: none!important;
        }
    }
    .header{
        display: block;
        height: @header-height;
        background: #fff;
        border-bottom: 1px solid @border-color;
        display: flex;
        justify-content: space-between;
        .dsahboard-link{
            // background: #eee;
            display: block;
            width: @header-height;
            height: @header-height -2px;
            line-height: @header-height;
            text-align: center;
            color: #999;
            .iconfont{
                font-size: 18px;
            }
            &:hover{
                color: @primary-color;
            }
        }
        .nuxt-link-exact-active{
            color: @primary-color;
        }

        .dsahboard-nav{
            display: block;
            width: @header-height;
            height: @header-height -2px;
            line-height: @header-height;
            text-align: center;
            color: #999;
            cursor: pointer;
            .iconfont{
                font-size: 20px;
            }
        }
    }
</style>
