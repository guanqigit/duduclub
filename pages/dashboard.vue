<template>
    <div class="dashboard-page">
        <div class="section">
            <div class="section">
                <Card :bordered="false" :padding="20" >
                    <p slot="title">资讯统计</p>
                    <ul class="count-list">
                        <li>
                            <i v-text="datas.wrote_news" style="color:#2db7f5"></i>
                            <span >已发布资讯（条）</span>
                        </li>
                        <li>
                            <i v-text="datas.wrote_news_reply" style="color:#2db7f5"></i>
                            <span  >参与评论（次）</span>
                        </li>
                    </ul>
                </Card>
            </div>
            <Card :bordered="false" :padding="20" >
                <p slot="title">维修保养统计</p>
                <ul class="count-list">
                    <li>
                        <i v-text="datas.untreated_appt" style="color:#19be6b"></i>
                        <span >待受理预约（人）</span>
                    </li>
                    <li>
                        <i v-text="datas.treated_appt" style="color:#19be6b"></i>
                        <span >已受理预约（人）</span>
                    </li>
                    <li>
                        <i v-text="datas.cancel_appt" style="color:#19be6b"></i>
                        <span >已取消预约（人）</span>
                    </li>
                </ul>
            </Card>
        </div>

        <div class="section">
            <Card :bordered="false" :padding="20" >
                <p slot="title">俱乐部统计</p>
                <ul class="count-list">
                    <li>
                        <i v-text="datas.unchecked" style="color:#ff9900">60</i>
                        <span >待审核成员（人）</span>
                    </li>
                    <li>
                        <i v-text="datas.checked" style="color:#ff9900">320</i>
                        <span >已审核成员（人）</span>
                    </li>
                    <li>
                        <i v-text="datas.forum_post_num" style="color:#ff9900"></i>
                        <span >车友动态（条）</span>
                    </li>
                    <li>
                        <i v-text="datas.forum_post_reply_num" style="color:#ff9900">2225</i>
                        <span >动态回复（条）</span>
                    </li>
                </ul>
            </Card>
        </div>

        
    </div>
</template>
<script>
import todoCard from "@/components/todoCard"
export default {
    components:{
        todoCard
    },
    data(){
        return {
            datas:{
                cancel_appt: 0,
                checked: 0,
                forum_post_num: 0,
                forum_post_reply_num: 0,
                treated_appt: 0,
                unchecked: 0,
                untreated_appt: 0,
                wrote_news: 0,
                wrote_news_reply: 0
            }
        }
    },
    methods:{
        async fechData(){
            const {data}=await this.$axios.get("/statistics")
            if(data.code==200){
                this.datas=data.res
            }else{
                this.$Message.error(data.msg)
            }
        }
    },
    mounted(){
        this.fechData()
    }
}
</script>
<style lang="less" scoped>
.section{
    margin-bottom: @space-width;
    .count-list{
        // display: flex;
        // justify-content: space-between;
        // flex-wrap: wrap;
        li{
            padding: @space-width;
            background: @body-color;
            display: inline-block;
            border-radius: 5px;
            margin-right: 15px;;
            margin-bottom: 15px;;
            background: #fff;
            border: 1px solid #fff;
            width: 200px;

            &:hover{
                border: 1px solid #eee;
                box-shadow: 0 0 15px rgba(73, 73, 73, 0.15);
            }
            span{
                color: #aaa;
                display: block;
            }
            i{
                color: #999;
                font-size: 30px;
                height: 30px;
                line-height: 30px;
                display: block;
                font-weight: 600;
            }
            &:hover{
                i{
                    color: @primary-color;
                }
            }
        }
    }
}
</style>
