<template>
    <div class="header-user">
        <Dropdown trigger="click">
            <a href="javascript:void(0)">
                <!-- <span class="user-name">张三</span> -->
                <!-- <Avatar  icon="ios-person" /> -->
                <img class="icon" src="@/assets/imgs/logo.png" />
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>
                    <nuxt-link to="/role-person" class="user-link">
                        <i class="iconfont icon-guanli"></i>
                        <span>修改密码</span>
                    </nuxt-link>
                </DropdownItem>
                <DropdownItem divided>
                    <div  class="user-link" @click="sigout">
                        <i class="iconfont icon-icon-tuichu"></i>
                        <span>退出系统</span>
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
import cookie from "js-cookie"
import {mapMutations} from "vuex"
export default {
    methods:{
        ...mapMutations(["SET_JWT_TOKEN"]),
        sigout(){
            cookie.remove("jwt_token")
            this.SET_JWT_TOKEN("")
            this.$router.push("/")
        }
    }
}
</script>

<style lang="less" scoped>
    .header-user{
        padding: (@header-height - 32px)/2 @space-width;
        .user-name{
            font-size: 14px;
            color: #333;
        }
        .icon{
            width: 31px;
            height: 31px;
            border-radius: 50%;
        }
        .user-link{
            color: #333;
            span{
                font-size: 14px;
                display: inline-block;
                height: 24px;
                line-height: 24px;
                vertical-align: top;
            }
            .iconfont{
                font-size: 24px;
                display: inline-block;
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                vertical-align: top;
            }
            .icon-icon-tuichu{
                font-size: 15px;
            }
            
        }
        .nuxt-link-exact-active{
            color: @primary-color;
        }
    }
</style>
