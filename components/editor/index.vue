<template>
    <div class="news-editor">
        <Card :bordered="false" :padding="20">
            <p slot="title">资讯编辑</p>
            <Form label-position="top" inline :model="editorData" :rules="rules" ref="newsEditor">
                <FormItem label="资讯标题"  prop="title" style="width:100%;">
                    <Input v-model="editorData.title" :maxlength="50" placeholder="资讯标题"></Input>
                </FormItem>
                <FormItem label="资讯内容" prop="content" style="width:100%;">
                    <div class="quill-editor"
                        :content="editorData.content"
                        @change="onEditorChange($event)"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        v-quill:myQuillEditor="editorOption">
                    </div>
                </FormItem>
                <FormItem  prop="img" label="封面" style="width:100%;" v-if="!videos.length">
                    <batchUploader v-model="editorData.img"/>
                </FormItem>
                <FormItem  prop="label">
                    <Input v-model="editorData.label" :maxlength="8"  placeholder="资讯标签"></Input>
                </FormItem>
                <FormItem>
                    <Button type="info" @click="submit">提交内容</Button>
                </FormItem>
            </Form>
        </Card>
        <uploader @success="insertContent" v-model="showUploader"/>
    </div>
</template>
<script>
import uploader from "@/components/uploader"
import batchUploader from "@/components/uploader/batchUploader"
export default {
    components:{
        uploader,
        batchUploader
    },
    props:{
        editorData:{
            type:Object,
            default(){
                return {
                    id:"",
                    title:"",
                    content:"",
                    img:"",
                    video:"",
                    label:""
                }
            }            
        }
    },
    data () {
        const  toolbar=[
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    [{'header': 1}, {'header': 2}],
                    // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    ['image','video'],
                    ['clean']
                ]
        return {
            preview:true,
            editor:"",
            showUploader:false,
            editorOption: {
                // some quill options
                modules: {
                    toolbar: {
                        container: toolbar,  // 工具栏
                        handlers: {
                            'image': ((value) => {
                                if(value){
                                    this.showUploader=true
                                }else{
                                    this.showUploader=false
                                }
                            }),
                            'video':((value)=>{
                                if(value){
                                    this.showUploader=true
                                }else{
                                    this.showUploader=false
                                }
                            })
                        }
                    }
                }
            },
            rules:{
                title:[{required:true,message:"请输入资讯标题"},{min:4,message:"标题最少4个字符"},{max:64,message:"标题不能超过64个字符"}],
                content:[{required:true,message:"请输入资讯内容"}],
                img:[{required:true,message:"请上传资讯封面"}],
                label:[{required:true,message:"请输入资讯标签"}]
            }
        }
    },
    computed:{
        videos(){
            let  imgReg = /<video.*?(?:>|\/>)/gi;
            let  srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            let  arr = this.editorData.content.match(imgReg);
            let  res=[]

            if(arr){
                for (let i = 0; i < arr.length; i++) {
                    let src = arr[i].match(srcReg);
                    res.push(src[1])
                }
            }
            return res
        }
    },
    watch:{
        videos(val){
            if(val){
                this.editorData.video=val[0]
            }
        }
    },
    methods: {
        onEditorBlur(editor) {
            // console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            // console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            this.editor=editor
            // let video = editor.import("formats/video")
            //     video.tagName = "video"
            //     editor.register(video, true)
            // console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            this.editorData.content = html
        },
        doneImgs(data){
            this.editorData.img=data
        },
        insertContent(data){
            if(data.file){
               this.editor.insertEmbed(this.editor.getSelection(true).index, data.type, data.file)
            }
        },
        submit(){
            this.$refs.newsEditor.validate(async (valid)=>{
                if(valid){
                    const {data}=await this.$axios.post("/write-news",this.editorData)
                    if(data.code==200){
                        this.$Message.success({
                            duration:4,
                            content:"资讯发布成功！"
                        })
                        this.$router.push("/news")
                    }else{
                        this.$Message.error(data.msg)
                    }
                }
            })
        }
    },
    mounted(){
        
    }
}
</script>

<style lang="less" scoped>
    .news-editor{
        background: #fff;
        // padding: @space-width;
        .quill-editor{
            height: 342px;
            position: relative;
            overflow: hidden;
            .ql-align-justify{
                margin-bottom: 15px;
            }
        }
    }
</style>
