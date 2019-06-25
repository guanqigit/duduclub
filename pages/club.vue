<template>
    <div class="club-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">成员管理</p>
            <div class="page-header">
                <Form inline label-position="top"  @submit.native.prevent>
                    <FormItem label="查询关键字">
                        <Input placeholder="用户账号、账号" v-model.trim="query.content"></Input>
                    </FormItem>
                    <FormItem label="用户状态">
                        <Select v-model="query.status" @on-change="searchData">
                            <Option :value="1">待审核</Option>
                            <Option :value="2">未通过</Option>
                            <Option :value="3">已认证</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="操作">
                        <Button type="info" :disabled="loading" @click="searchData">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :loading="loading" border :columns="columns" :data="datas" class="table">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="info" size="small" style="margin-right: 5px" @click="deal(row,2)" v-if="row.status==10">通过</Button>
                    <Button type="error" size="small" style="margin-right: 5px" @click="deal(row,1)" v-if="row.status==10">驳回</Button>
                    <span v-else>-</span>
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
                        title: '用户名称',
                        key: 'nickname',
                        minWidth:130
                    },
                    {
                        title: '用户账号',
                        key: 'phone',
                        width:140
                    },
                    {
                        title: '认证车型',
                        key: 'vehicle',
                        minWidth:120
                    },
                    {
                        title: '驾驶证正本',
                        key: 'license',
                        width:110,
                        render:(h,params)=>{
                            if(params.row.license){
                               return h("a",{
                                   attrs:{
                                       href:params.row.license,
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
                                            src:params.row.license
                                        }
                                    })
                               ])
                            }
                        }
                    },
                    {
                        title: '认证时间',
                        key: 'created_at',
                        width:140,
                        render:(h,params)=>{
                            const fmt=this.formatTime(params.row.created_at)
                            return h("div", [h("span", fmt)])
                        }
                    },
                    {
                        title: '认证状态',
                        key: 'status',
                        width:100,
                        render:(h,params)=>{
                            const status=params.row.status

                            switch(status){
                                case 10:
                                    return h("div", [h("span", "待审核")])
                                case 20:
                                    return h("div", [h("span", "未通过")])
                                case 30:
                                    return h("div", [h("span", "已认证")])
                            }
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
                    status:1,
                    content:""
                }
            }
        },
        methods:{
            async fetchData(){
                this.loading=true
                const {data}=await this.$axios.get("/certificate-list",{
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
            async deal(row,type){
                const {_index,id}=row
                const {data}=await this.$axios.post("/deal-certificate",{
                    id,
                    status:type
                })

                
                if(data.code==200){
                    this.datas.splice(_index, 1)
                    if(this.datas.length<1){
                        if((this.query.page<=this.totalPage)&&(this.query.page>1)){
                            this.query.page-=1
                        }else{
                            this.query.page=1
                        }
                        this.fetchData()
                    }
                    this.$Message.success("操作成功！")
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
