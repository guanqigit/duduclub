<template>
    <div class="news-comment-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">评论管理</p>
            <div class="page-header">
                <Form inline label-position="top" @submit.native.prevent>
                    <FormItem label="查询关键字">
                        <Input placeholder="评论者ID、评论者、评论内容" @keydown.enter.prevent="searchData"  v-model.trim="query.content"></Input>
                    </FormItem>
                    <FormItem label="操作">
                        <Button type="info" :disabled="loading" @click="searchData">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :loading="loading" border :columns="columns" :data="datas" class="table">
                <template slot-scope="{ row, index }" slot="action">
                    <Poptip
                        popper-class="drop-pop"
                        placement="top-end"
                        confirm
                        title="删除后不可恢复，是否继续？"
                        @on-ok="dropComments(index,row)"
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
                columns: [
                    {
                        title: '评论者ID',
                        key: 'uid',
                        width:120
                    },
                    {
                        title: '评论者',
                        key: 'nickname',
                        width:170
                    },
                    {
                        title: '评论内容',
                        key: 'content',
                        minWidth:120
                    },
                    {
                        title: '点赞',
                        key: 'like',
                        width:90
                    },
                    {
                        title: '评论时间',
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
                    // {
                    //     id: '1000',
                    //     user: '张三张三张三',
                    //     content: "New York No. 1 Lake Park  New York No. 1 Lake Park",
                    //     time: '2016-10-03'
                    // }
                ]
            }
        },
        methods:{
            async fetchData(){
                this.loading=true
                const {data}=await this.$axios.get("/news-reply-list",{
                    params:this.query
                })

                this.loading=false

                if(data.code==200){
                    this.total=data.data.total_count
                    if(this.total){
                        this.datas=data.data.infos
                    }else{
                        this.datas=[]
                    }
                }
            },
            async dropComments(index,row){
                const {id}=row
                const {data} = await this.$axios.post("/deal-reply",{
                    reply_id:id
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
                }else{
                    this.$Message.error(res.msg)
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.news-comment-page{
    
}
</style>
