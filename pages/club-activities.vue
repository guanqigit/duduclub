<template>
    <div class="club-activities-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">车友动态</p>
            <div class="page-header">
                <Form inline label-position="top" @submit.native.prevent>
                    <FormItem label="查询关键字">
                        <Input v-model.trim="query.content" placeholder="用户ID、用户名称、内容"></Input>
                    </FormItem>
                    <FormItem label="操作">
                        <Button type="info" :disabled="loading" @click="searchData">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <Table  border :columns="columns" :data="datas" class="table">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="info" size="small" style="margin-right: 5px" @click="previewActivities(row)">查看</Button>
                    <Poptip
                        popper-class="drop-pop"
                        placement="top-end"
                        confirm
                        title="删除后不可恢复，是否继续？"
                        @on-ok="drop(index,row)"
                    >
                        <Button type="error" size="small">删除</Button>
                    </Poptip>
                </template>
            </Table>
            <div class="pagenation">
                <Page :total="total" :current="query.page" :page-size="query.limit" @on-change="changePage" show-elevator  />
            </div>
        </Card>
        <clubActivitiesView v-model="preview" :show.sync="showPreview"/>
    </div>
</template>
<script>
    import {mixin} from "@/tools/mixin"
    import clubActivitiesView from "@/components/clubActivitiesView"
    export default {
        mixins: [mixin],
        components:{
            clubActivitiesView
        },
        data () {
            return {
                preview:{
                    uid:"",
                    avatar_url:"",
                    content:"",
                    created_at:1556257069,
                    img:"",
                    nickname:"",
                    reply_num:"",
                    view:"",
                    video:""
                },
                showPreview:false,
                columns: [
                    {
                        title: '用户ID',
                        key: 'uid',
                        width:120
                    },
                    {
                        title: '用户名称',
                        key: 'nickname',
                        width:120
                    },
                    {
                        title: '发布内容',
                        key: 'content',
                        minWidth:120
                    },
                    {
                        title: '点赞',
                        key: 'like',
                        width:80
                    },
                    {
                        title: '评论',
                        key: 'reply_num',
                        width:80
                    },
                    {
                        title: '发布时间',
                        key: 'created_at',
                        width:140,
                        render:(h,params)=>{
                            const fmt=this.formatTime(params.row.created_at)
                            return h("div", [h("span", fmt)])
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                datas: [
                    {
                        id: '1000',
                        title: "New York No. 1 Lake Park  New York No. 1 Lake Park",
                        tag: "最新资讯",
                        like:30,
                        share:80,
                        time: '2016-10-03',
                        status: '已发布'
                    }
                ]
            }
        },
        methods:{
            async fetchData(){
                this.loading=true
                const {data}=await this.$axios.get("/post-list",{
                    params:this.query
                })
                this.loading=false
                if(data.code==200){
                    this.total=data.data.total_count
                    if(this.total&&data.data.infos){
                        this.datas=data.data.infos
                        this.totalPage=data.data.total_page
                    }else{
                        this.datas=[]
                    }
                }else{
                    this.$Message.error(res.msg)
                }
            },
            async drop(index,row){
                const {data}=await this.$axios.post("/deal-post",{
                    post_id:row.id
                })
                if(data.code==200){
                    this.datas.splice(index, 1)
                    if(this.datas.length<1){
                        if((this.query.page<=this.totalPage)&&(this.query.page>1)){
                            this.query.page-=1
                        }else{
                            this.query.page=1
                        }
                        this.fetchData()
                    }
                }
            },
            previewActivities(row){
                this.preview=row
                this.showPreview=true
            }
        }
    }
</script>
<style lang="less" scoped>
.club-activities-page{
    
}
</style>
