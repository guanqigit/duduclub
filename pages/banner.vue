<template>
    <div class="banner-ad-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">展位设置</p>
            <div class="page-header">
                <Form inline label-position="top" >
                    <FormItem label="操作">
                        <Button type="info" @click="changeModal(true)">新增展位</Button>
                    </FormItem>
                    <FormItem label="展位位置">
                        <Select v-model="query.position" @on-change="fetchData">
                            <Option :value="1">资讯</Option>
                            <Option :value="2">俱乐部</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <Table :loading="loading"  border :columns="columns" :data="datas" class="table banner-table">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="info" size="small" @click="editBanner(row)" style="margin-right: 5px">编辑</Button>
                    <Poptip
                        placement="top-end"
                        confirm
                        title="删除后不可恢复，是否继续？"
                        @on-ok="dropBanner(row)"
                        ok-text="确定"
                        cancel-text="取消">
                        <Button type="error" size="small" >删除</Button>
                    </Poptip>
                </template>
            </Table>
        </Card>
        <bannerAdd @submit="setBanner" :value.sync="bannerEditorData" :showModal.sync="showModal"/>
    </div>
</template>
<script>
    import bannerAdd from "@/components/bannerAdd"
    export default {
        components:{
            bannerAdd
        },
        data () {
            return {
                bannerEditorData:{
                    id:"",
                    img:"",
                    position:1,
                    recommend_id:"",
                    sort:1,
                    type:3,
                    url:"",
                    status:1
                },
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width:120
                    },
                    {
                        title: '排序',
                        key: 'sort',
                        width:70
                    },
                    {
                        title: '展位位置',
                        key: 'position',
                        width:90,
                        render:(h,params)=>{
                            let position=params.row.position
                            switch(position){
                                case 1:
                                    return h("span", "资讯")
                                case 2:
                                    return h("span", "俱乐部")
                            }
                        }
                    },
                    {
                        title: '跳转类型',
                        key: 'type',
                        width:90,
                        render:(h,params)=>{
                            let type=params.row.type

                            switch(type){
                                case 1:
                                    return h("span", "帖子")
                                case 2:
                                    return h("span", "商品")
                                case 3:
                                    return h("span", "网页")
                            }
                        }
                    },
                    {
                        title: '跳转ID',
                        key: 'recommend_id',
                        width:120
                    },
                    {
                        title: '跳转链接',
                        key: 'url',
                        minWidth:100,
                        render:(h,params)=>{
                            const url=params.row.url
                            if(url){
                                return h("a",{
                                    attrs:{
                                        href:url,
                                        target:"_blank"
                                    }
                                },"点击查看")
                            }
                            return ""
                        }
                    },
                    {
                        title: '展位图片',
                        key: 'img',
                        width:100,
                        render:(h,params)=>{
                            if(params.row.img){
                               return h("a",{
                                   attrs:{
                                       href:params.row.img,
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
                                            src:params.row.img
                                        }
                                    })
                               ])
                            }
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'created_at',
                        width:140,
                        render:(h,params)=>{
                            const fmt=this.$formatTime(params.row.created_at)
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
                    //     url: "New York No. 1 Lake Park  New York No. 1 Lake Park",
                    //     position: "最新资讯",
                    //     img:30,
                    //     type:80,
                    //     recommend_id: '35',
                    //     created_at: '2015-03-10'
                    // }
                ],
                query:{
                    position:1
                },
                loading:false,
                showModal:false
            }
        },
        methods:{
            async fetchData(){
                this.loading=true
                const {data}=await this.$axios.get("/banner",{
                    params:this.query
                })
                this.loading=false
                if(data.code==200){
                    if(data.data){
                        this.datas=data.data
                    }else{
                        this.datas=[]
                    }
                }
            },
            changeModal(state){
                this.showModal=state
            },
            async setBanner(datas){
                
                let msg=datas.id?"修改成功！":"添加成功！"
                if(datas.status&&datas.status==2){
                    msg="删除成功！"
                }
                const {data}=await this.$axios.post("/set-banner",datas)
                if(data.code==200){
                    this.query.position=datas.position

                    this.fetchData()

                    this.$Message.success(msg)
                    this.changeModal(false)
                }else{
                    this.$Message.error(data.msg)
                }
            },
            editBanner(row){
                this.bannerEditorData={
                    id:row.id,
                    img:row.img,
                    position:row.position,
                    recommend_id:row.recommend_id,
                    sort:row.sort,
                    type:row.type,
                    url:row.url,
                    status:1
                }
                this.changeModal(true)
            },
            dropBanner(row){
                this.setBanner({
                    id:row.id,
                    img:row.img,
                    position:row.position,
                    recommend_id:row.recommend_id,
                    sort:row.sort,
                    type:row.type,
                    url:row.url,
                    status:2
                })
            }
        },
        mounted(){
            this.fetchData()
        }
    }
</script>
<style lang="less" scoped>
.banner-ad-page{
    
}
</style>
