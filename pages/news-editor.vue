<template>
    <div class="news-editor-page">
        <div class="news-editor-warp">
            <editor :editorData.sync="forms" @change="change" />
        </div>
        <div class="news-editor-preview-warp" >
            <editorPreview :value.sync="forms"/>
        </div>
    </div>
</template>
<script>
import editor from "@/components/editor"
import editorPreview from "@/components/editor/preview"
export default {
    components:{
        editor,
        editorPreview
    },
    data(){
        return {
            preview:true,
            forms:{
                id:"",
                title:"",
                content:"",
                img:"",
                video:"",
                label:""
            }
        }
    },
    methods:{
        change(data){
            this.forms=data
        },
        async fetchData(){
            const {data}=await this.$axios.get("/post-detail",{
                params:{
                    post_id:this.$route.query.id
                }
            })

            if(data.code==200){
                this.forms={
                    id:data.data.id,
                    title:data.data.title,
                    content:data.data.content,
                    img:data.data.img,
                    video:data.data.video,
                    label:data.data.label
                }
            }
        }
    },
    mounted(){
        const pid=this.$route.query.id
        if(pid){
            this.fetchData()
        }
    }
}
</script>

<style lang="less" scoped>
    .news-editor-page{
        display: flex;
        .news-editor-warp{
            margin-right: @space-width;
            max-width: 820px;
        }
       .news-editor-preview-warp{
           flex: 1;
       }
    }
</style>
