<template>
    <div :class="['dashboard-layout',{'show-nav':mobileNav}]">
        <div class="mask" @click="SET_MOBILE_NAV"></div>
        <div class="layout-left">
            <side/>
        </div>
        <div class="layout-right">
            <div class="layout-header">
                <mainHeader/>
            </div>
            <div class="layout-main-container">
                <nuxt />
            </div>
        </div>
    </div>
</template>
<script>
import mainHeader from "@/components/header"
import side from "@/components/side"
import {mapGetters,mapMutations} from "vuex"
export default {
    components:{
        mainHeader,
        side
    },
    computed:{
        ...mapGetters(["mobileNav"])
    },
    methods:{
        ...mapMutations(["SET_MOBILE_NAV"])
    }
}
</script>
<style lang="less" scoped>
    .mask{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        z-index: 998;
        display: none;
    }
    .dashboard-layout{
        display: flex;
        height: 100%;
        .layout-left{
            width: @side-nav-width;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            background: #515a6e;//515a6e

            
        }
        .layout-right{
            flex: 1;
            overflow: hidden;
            .layout-header{
                position: fixed;
                top: 0;
                left: @side-nav-width;
                right: 0;
                z-index: 999;
                transition: left .2s;
            }
            .layout-main-container{
                margin-top:@header-height + @space-width;
                margin-bottom:@space-width;
                margin-left: @side-nav-width + @space-width;
                margin-right: @space-width;
                overflow: hidden;
                box-sizing: border-box;
                transition: margin .2s;
            }
        }
    }
    @media (max-width:768px) {
        .dashboard-layout{
            display: flex;
            height: 100%;
            .layout-left{
                width: @side-nav-width;
                position: fixed;
                top: 0;
                bottom: 0;
                left: -240px;
                background: #515a6e;//515a6e
            }
            
            .layout-right{
                flex: 1;
                overflow: hidden;
                .layout-header{
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 999;
                }
                .layout-main-container{
                    margin-top:@header-height + @space-width;
                    margin-bottom:@space-width;
                    margin-left:@space-width;
                    margin-right: @space-width;
                    overflow: hidden;
                    box-sizing: border-box;
                }
            }
        }
        .show-nav{
            .mask{
                display: block;
                z-index: 9999;
            }
            .layout-left{
                left: 0;
                z-index: 10000;
            }
            .layout-header{
                // left: @side-nav-width!important;
            }
        }
    }
</style>
