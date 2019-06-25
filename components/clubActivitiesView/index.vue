<template>
    <Modal 
        class-name="club-activities-preview"
        :footer-hide="true"
        :mask-closable="true"
        v-model="showPreview"
        @on-visible-change="changeModal"
        :width="375"
    >
        <div class="club-activities-preview-container">
            <div class="videos" v-if="value.video">
                <video controls :src="value.video"></video>
            </div>
            <div class="user-info">
                <div class="user-info-left">
                    <div class="user-icon">
                        <img :src="value.avatar_url" alt="icon">
                    </div>
                </div>
                <div class="user-info-right">
                    <h3 v-text="value.nickname"></h3>
                    <p v-text="value.uid"></p>
                    <div class="publish-time"><Time :time="value.created_at" :interval="1" /></div>
                </div>
            </div>
            <div class="publish-content" v-text="value.content"></div>
            <div class="publish-img">
                <div class="publish-img-item" v-for="(img,index) in imgs" :key="index">
                    <img :src="img" />
                </div>
            </div>
            <div class="publish-info">
                <span><i v-text="value.view">123</i>次·阅读</span>            
                <span><i v-text="value.reply_num">123</i>次·评论</span>            
            </div>
        </div>
    </Modal>
</template>
<script>
export default {
    props:{
        show:{
            type:Boolean,
            default:true
        },
        value:{
            type:Object,
            default(){
                return {
                    uid:"",
                    avatar_url:"",
                    content:"",
                    created_at:1556257069,
                    img:"",
                    nickname:"",
                    reply_num:"",
                    view:"",
                    video:""
                }
            }
        }
    },
    computed:{
        imgs(){
            if(this.value.img){
                return JSON.parse(this.value.img)
            }
            return []
        }
    },
    watch:{
        show(val){
            this.showPreview=val
        }
    },
    data(){
        return {
            showPreview:this.show
        }
    },
    methods:{
        changeModal(status){
            this.$emit("update:show",status)
        }
    }
}
</script>
<style lang="less" scoped>
    .club-activities-preview{
        .ivu-modal-body{
            padding: 0!important;
            overflow: hidden;
        }
        .club-activities-preview-container{
            overflow: hidden;
            .videos{
                video{
                    width: 100%;
                    display: block;
                }
            }
        }
        .user-info{
            display: flex;
            padding: 8px;
            position: relative;
            height: 56px;
            overflow: hidden;
            .user-info-left{
                .user-icon{
                    width: 42px;
                    height: 42px;
                    overflow: hidden;
                    border-radius: 50%;
                    img{
                        width: 42px;
                        height: 42px;
                    }
                }
            }
            .user-info-right{
                padding-left: 10px;
                h3{
                    font-size: 14px;
                    padding-top: 2px;
                }
                p{
                    color: @label-color;
                }
                .publish-time{
                    position: absolute;
                    right: 10px;
                    top: 20px;
                    color: @label-color;
                }
            }
        }
        .publish-content{
            padding: 10px;
            padding-top: 0;
            font-size: 14px;
        }
        .publish-img{
            padding:0 10px;
            overflow-y: auto;
            
            .publish-img-item{
                width:100%;
                padding: 5px;
                img{
                    max-width: 100%;
                    border-radius: @radius;
                    display: block;
                }
            }
        }
        .publish-info{
            padding: 10px;
            span{
                margin-right: 5px;
                color: @label-color;
            }
        }
    }
</style>
