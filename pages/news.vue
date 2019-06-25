<template>
    <div class="news-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">资讯管理</p>
            <div class="page-header">
                <Form inline label-position="top" @submit.native.prevent>
                    <FormItem label="查询关键字">
                        <Input placeholder="资讯ID、资讯标题" v-model.trim="query.content"></Input>
                    </FormItem>
                    <FormItem label="操作">
                        <Button type="info" @click="searchData" :disabled="loading">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :loading="loading" border :columns="columns" :data="datas" class="table">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="info" size="small" :to="{path:'news-editor',query:{id:row.id}}"  style="margin-right: 5px">编辑</Button>
                    <Poptip
                        popper-class="drop-pop"
                        placement="top-end"
                        confirm
                        title="删除后不可恢复，是否继续？"
                        @on-ok="dropNews(index,row)"
                    >
                        <Button type="error" size="small">删除</Button>
                    </Poptip>
                </template>
            </Table>
            <div class="pagenation">
                <Page :total="total" :current="query.page" :page-size="query.limit" @on-change="changePage" show-elevator  />
            </div>
        </Card>
    </div>
</template>
<script>
    import {mixin} from "@/tools/mixin"
    export default {
        mixins: [mixin],
        data () {
            return {
                loading:true,
                columns: [
                    {
                        title: '资讯ID',
                        key: 'id',
                        width:120
                    },
                    {
                        title: '资讯标题',
                        key: 'title',
                        ellipsis:true,
                        minWidth:200
                    },
                    {
                        title: '资讯标签',
                        key: 'label',
                        width:140
                    },
                    {
                        title: '点赞',
                        key: 'like',
                        width:80
                    },
                    {
                        title: '分享',
                        key: 'share',
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
                datas: []
            }
        },
        methods:{
            async dropNews(index,row){
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
            async fetchData(){
                this.loading=true
                const {data}= await this.$axios.get("/news-post-list",{
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
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.news-page{
    
}
</style>
