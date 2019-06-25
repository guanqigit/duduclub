<template>
    <Modal 
        class-name="uploader-modal"
        :footer-hide="true"
        :mask-closable="false"
        v-model="show"
        @on-visible-change="changeModal"
    >
        <Tabs 
            :animated="false"
            v-model="tabs"
        >
            <TabPane label="插入图片" name="image">
                <uploadSlot 
                    accept="image/png,image/jpeg,image/gif"
                    @success="success"
                >
                    <div class="file-input-btn">
                        <i class="iconfont icon-image" v-if="!file">上传图片</i>
                        <img :src="file" v-if="file && tabs=='image'">
                    </div>
                </uploadSlot>
            </TabPane>
            <TabPane label="插入视频" name="video">
                <uploadSlot
                    accept="video/mp4"
                    @success="success"
                >
                    <div class="file-input-btn">
                        <i class="iconfont icon-video" v-if="!file">上传视频</i>
                        <img :src="file+'?x-oss-process=video/snapshot,t_1000,f_jpg,w_486,h_140'" v-if="file && tabs=='video'">
                    </div>
                </uploadSlot>
            </TabPane>
            <Button type="info" :disabled="!disabled" @click="insert">插入</Button>
            <Button @click="changeModal(false)">取消</Button>
        </Tabs>
    </Modal>
</template>
<script>
import uploadSlot from "./uploadSlot"
export default {
    components:{
        uploadSlot
    },
    props:{
        value:{
            default:false,
            type:Boolean
        }
    },
    watch:{
        value(val){
            this.show=val
        },
        tabs(val){
            this.file=""
        }
    },
    computed:{
        disabled(){
            var reg=/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
            
            return reg.test(this.file)
        }
    },
    data(){
        return {
            show:this.showUpload,
            tabs:"image",
            file:""
        }
    },
    methods:{
        changeModal(state){
            this.file=""
            this.$emit("input",state)
        },
        success(data){
            this.file=data.url
        },
        insert(){
            this.$emit("success",{
                type:this.tabs,
                file:this.file
            })
            this.changeModal(false)
        }
    }
}
</script>
<style lang="less" scoped>
.uploader-modal{
    .input-controll{
        margin-bottom: @space-width;
    }
    .file-input-btn{
        display: block;
        height: 140px;
        cursor: pointer;
        border: 1px solid @border-color;
        border-radius: 5px;
        // margin: @space-width 0;
        margin-bottom: 15px;
        &:last-child{
            margin-bottom: 0;
        }
        .iconfont{
            font-size: 20px;
            height: 140px;
            line-height: 140px;
            text-align: center;
            margin: auto;
            display: block;
            color: @border-color;
        }
        &:hover{
            border: 1px solid @primary-color;
            .iconfont{
                color: @primary-color;
            }
        }
        img{
            height: 100%;
        }
    }
}
</style>
