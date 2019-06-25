<template>
    <div class="repair-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">预约管理</p>
            <div class="page-header">
                <Form inline  label-position="top"  @submit.native.prevent>
                    <FormItem label="查询关键字">
                        <Input v-model="query.content" placeholder="订单ID、联系电话、用户名称"></Input>
                    </FormItem>
                    <FormItem label="受理状态">
                        <Select v-model="query.status" @on-change="searchData">
                            <Option :value="1">未受理</Option>
                            <Option :value="3">已受理</Option>
                            <Option :value="2">已取消</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="操作">
                        <Button type="info"  :disabled="loading" @click="searchData">查询</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :loading="loading"  border :columns="columns" :data="datas" class="table">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="info" size="small" @click="deal(row,2)" style="margin-right: 5px" v-if="row.status==10">受理</Button>
                    <Poptip
                        popper-class="drop-pop"
                        placement="top-end"
                        confirm
                        title="确定要取消该预约订单吗"
                        @on-ok="deal(row,1)"
                        v-if="row.status==10"
                    >
                        <Button type="error" size="small">取消</Button>
                    </Poptip>
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
                        title: '订单ID',
                        key: 'id',
                        width:80
                    },
                    {
                        title: '客户姓名',
                        key: 'nickname',
                        width:140
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        width:120
                    },
                    {
                        title: '上牌时间',
                        key: 'listing_date',
                        width:140,
                        render:(h,params)=>{
                            const fmt=this.formatTime(params.row.created_at)
                            return h("div", [h("span", fmt)])
                        }
                    },
                    {
                        title: '预约地点',
                        key: 'area',
                        ellipsis:true,
                        minWidth:100
                    },
                    {
                        title: '行驶里程',
                        key: 'mileage',
                        width:90
                    },
                    {
                        title: '预约时间',
                        key: 'date',
                        width:140,
                        render:(h,params)=>{
                            const fmt=this.formatTime(params.row.created_at)
                            return h("div", [h("span", fmt)])
                        }
                    },
                    {
                        title: '受理状态',
                        key: 'status',
                        width:90,
                        render:(h,params)=>{
                            const status=params.row.status
                            switch(status){
                                case 10:
                                    return h("div", [h("span", "未受理")])
                                case 20:
                                    return h("div", [h("span", "已取消")])
                                case 30:
                                    return h("div", [h("span", "已受理")])
                            }
                        }
                    },
                    {
                        title: '提交时间',
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
                        // id: '1000',
                        // userName: "李白",
                        // phone: "18883414190",
                        // area:"渝北区红土地",
                        // mileage:"2550公里",
                        // reserve:"2020-10-03",
                        // time: '2020-10-03',
                        // status: '未受理'
                    }
                ],
                query:{
                    status:1
                }
            }
        },
        methods:{
            async fetchData(){
                this.loading=true
                const {data}= await this.$axios.get("/appt-list",{
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
            },
            async deal(row,status){
                const index=row._index
                const {data}=await this.$axios.post("/deal-appt",{
                    id:row.id,
                    status
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
                    this.$Message.success("操作成功！")
                }else{
                    this.$Message.error(data.msg)
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.repair-page{
    
}
</style>
