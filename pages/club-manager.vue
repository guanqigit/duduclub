<template>
    <div class="club-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">俱乐部管理</p>
            <div class="page-header">
                <Form inline label-position="top"  @submit.native.prevent>
                    <FormItem label="查询关键字">
                        <Input placeholder="俱乐部名称" v-model.trim="query.content"></Input>
                    </FormItem>
                    <FormItem label="分类检索">
                        <Select v-model="query.type" @on-change="searchData">
                            <Option :value="1">普通俱乐部</Option>
                            <Option :value="2">热门俱乐部</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="操作">
                        <Button type="info" :disabled="loading" @click="searchData">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :loading="loading" border :columns="columns" :data="datas" class="table">
                <template slot-scope="{ row, index }" slot="action">
                    <Poptip placement="right" :word-wrap="true">
                        <Button type="info" size="small">热门排序</Button>
                        <div class="container" slot="content">
                            <InputNumber  v-model="sort" :max="1000" :min="0" style="line-height:0px;"/>
                            <Button size="default" type="info" @click="deal(row)">确定</Button>
                        </div>
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
                        title: 'ID',
                        key: 'id',
                        width:120
                    },
                    {
                        title: '俱乐部图标',
                        key: 'license',
                        width:110,
                        render:(h,params)=>{
                            if(params.row.icon){
                               return h("a",{
                                   attrs:{
                                       href:params.row.icon,
                                       target:"_blank",
                                       title:"点击查看大图"
                                   }
                               },
                               [
                                    h("img",{
                                        style:{
                                            height: "20px"
                                        },
                                        attrs:{
                                            src:params.row.icon
                                        }
                                    })
                               ])
                            }
                        }
                    },
                    {
                        title:"名称",
                        key:"name",
                        minWidth:100
                    },
                    {
                        title:"帖子数量",
                        key:"forum_post_num",
                        width:100
                    },
                    {
                        title:"成员数量",
                        key:"car_friend_num",
                        width:100
                    },
                    {
                        title:"推荐排序",
                        key:"sort",
                        width:100
                    },
                    {
                        title: '创建时间',
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
                        user_id: "18883614191",
                        user_name: "张三",
                        car:"梅赛德斯奔驰",
                        car_no:80,
                        time: '2016-10-03',
                        status: '已认证'
                    }                  
                ],
                query:{
                    type:1,
                    content:""
                },
                sort:0
            }
        },
        methods:{
            async fetchData(){
                this.loading=true
                const {data}=await this.$axios.get("/forum-list",{
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
            async deal(row){
                const {_index,id}=row

                const {data}=await this.$axios.post("/hot-forum",{
                    forum_id:id,
                    sort:this.sort
                })
                
                this.sort=0

                if(data.code==200){
                    this.datas.splice(_index, 1)
                    if(this.datas.length<1){

                        if((this.query.page<=this.totalPage)&&(this.query.page>1)){
                            this.query.page-=1
                        }else{
                            this.query.page=1
                        }
                    }
                    this.$Message.success("操作成功！")
                    this.fetchData()
                }else{
                    this.$Message.error(data.msg)
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.club-page{
   
}
</style>
