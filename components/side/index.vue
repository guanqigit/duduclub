<template>
    <div class="side">
        <h1 class="brand">
            <img src="@/assets/imgs/brand.png" alt="">
        </h1>
        <div class="scroll">
            <nav class="side-nav">
                <Menu 
                    theme="dark" 
                    :active-name="activeName"
                >
                    <Submenu :name="gdx" v-for="(group,gdx) in sideMenu" :key="gdx">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            <span v-text="group.groupName"></span>
                        </template>
                        <MenuItem 
                            v-for="(menu,mdx) in group.links" 
                            :name="gdx+'-'+mdx" 
                            :to="menu.path" 
                            :key="mdx"
                        >
                            <span v-text="menu.title"></span>
                        </MenuItem>
                    </Submenu>
                    <!-- <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            资讯
                        </template>
                        <MenuItem name="1-1" to="/news">
                            资讯管理
                        </MenuItem>
                        <MenuItem name="1-2" to="/news-comments">
                            评论管理
                        </MenuItem>
                        <MenuItem name="1-3" to="/news-editor">
                            发布资讯
                        </MenuItem>
                        <MenuItem name="1-4" to="/news-tag">
                            标签管理
                        </MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            俱乐部
                        </template>
                        <MenuItem name="2-1" to="/club">
                            成员管理
                        </MenuItem>
                        <MenuItem name="2-2" to="/club-examine">
                            车主审核
                        </MenuItem>
                        <MenuItem name="2-3" to="/club-ad">
                            展位设置
                        </MenuItem>
                        <MenuItem name="2-4">
                            车友动态
                        </MenuItem>
                        <MenuItem name="2-5" to="/club-comments">
                            评论管理
                        </MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            预约
                        </template>
                        <MenuItem name="3-1"  to='/reserve'>
                            预约管理
                        </MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            系统设置
                        </template>
                        <MenuItem name="4-1" to="/role">
                            角色管理
                        </MenuItem>
                        <MenuItem name="4-2" to="/role-admin">
                            管理员设置
                        </MenuItem>
                    </Submenu> -->
                </Menu>
            </nav>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
    computed:{
        ...mapGetters(["sideMenu"])
    },
    data(){
        return {
            activeName:"0-0"
        }
    },
    watch:{
        '$route'(){
            this.matchMenu()
            // console.log("watch")
        }
    },
    methods:{
        matchMenu(){
            const route=this.$route.path
            const routes=this.sideMenu
            for(let i=0;i<routes.length;i++){
                const links=routes[i].links
                for(let j=0;j<links.length;j++){
                    if(links[j].path==route){
                        this.openNames=[i]
                        this.activeName=i+"-"+j
                        return [i,j]
                    }
                }
            }
            this.activeName="a-0"
        }
    },
    mounted(){
       this.matchMenu()
    }
}
</script>

<style lang="less" scoped>
    .side{
        height: 100%;
        .brand{
            background: @primary-color;
            padding: 11px;
            color: #fff;
            img{
                height: 27px;
                display: block;
            }
        }
        .side-nav{
            display: block;
            overflow: hidden;
        }
        .scroll{
            overflow-y: auto;
            height: 90%;
            &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            &::-webkit-scrollbar-track {
                border-radius: 3px;
                background: rgba(138, 138, 138, 0.06);
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
            }
            /* 滚动条滑块 */
            &::-webkit-scrollbar-thumb {
                border-radius: 3px;
                background: rgba(0,0,0,0.12);
                -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
            }
        }
    }
</style>
