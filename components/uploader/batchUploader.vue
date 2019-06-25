<template>
    <div class="batch-uploader">
        <div class="upload-success">
            <div class="uploader-item" v-for="(img,index) in successList" :key="index">
                <img :src="img|imgScale" alt="">
                <div class="drop" title="移除" @click="removeList(index)">
                    <i class="iconfont icon-shanchu1"></i>
                </div>
            </div>
        </div>
        <uploadSlot  
            :accept="accept"
            @success="success"
            v-if="successList.length<nums"
        >
            <div class="uploader-item">
                <i class="iconfont icon-upload"></i>
            </div>
        </uploadSlot>
    </div>
</template>
<script>
import uploadSlot from "./uploadSlot"

export default {
    components:{
        uploadSlot
    },
    props:{
        accept:{
            type:String,
            default:"image/jpeg,image/png,image/gif"
        },
        nums:{
            type:Number,
            default:3
        },
        value:{
            type:String,
            default(){
                return ""
            }
        }
    },
    filters:{
        imgScale(val){
            return `${val}?x-oss-process=image/resize,m_mfit,h_120`
        }
    },
    data(){
        return {
            successList:[]
        }
    },
    watch:{
        successList:{
            deep:true,
            handler(val){
                if(val.length){
                    let data=JSON.stringify(val)
                    this.$emit("input",data)
                }
            }
        },
        value(val){
            if(val){
                if(val.length){
                    this.successList=JSON.parse(val)
                }
            }
        }
    },
    methods:{
        success(data){
            this.successList.push(data.url)
        },
        removeList(idx){
            this.successList.splice(idx,1)
        }
    },
    mounted(){
        if(this.value){
            this.successList=this.value.split(",")
        }
    }
}
</script>
<style lang="less" scoped>
    .batch-uploader{
        display: flex;
        .uploader-item{
            width: 160px;
            height: 120px;
            line-height: 120px;
            text-align: center;
            border: 1px solid @border-color;
            border-radius: 5px;
            margin-right: @space-width;
            color: @border-color;
            overflow: hidden;
            cursor: pointer;
            &:hover{
                border: 1px solid @primary-color;
                color: @primary-color;
            }
            img{
                height: 100%;
            }
        }
        .upload-success{
            display: flex;
            .uploader-item{
                position: relative;
                &:hover{
                    .drop{
                        display: block;
                    }
                }
                .drop{
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, .5);
                    z-index: 100;
                    display: none;
                    &:hover{
                        color: #ed4014;
                    }
                    .iconfont{
                        font-size: 22px;
                    }
                }
            }
        }
    }
</style>
