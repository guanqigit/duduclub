<template>
    <div class="preview">
        <div class="content-preview">
            <h3 class="content-title" v-text="value.title" v-if="value.title">一个月不洗车和经常洗车，哪个更伤车，一年后差距一目了然！</h3>
            <h3 class="content-title" v-else>请输入资讯标题</h3>
            <div class="content-news-info">
                0阅读 · 0分享 · 0评论
            </div>
            <div class="content-news" v-html="value.content"  v-if="value.content"></div>
            <div class="content-news" v-else>请输入资讯内容</div>
            <div class="share">
                <div class="share-tips"></div>
                <div class="share-button">
                    <i class="iconfont icon-icon-test"></i>
                    <span>0</span>
                </div>
            </div>
        </div>
        <div class="list-preview" v-if="imgs.length>2&&!videos.length">
            <h3 class="list-preview-title" v-text="value.title" v-if="value.title">一个月不洗车和经常洗车，哪个更伤车，一年后差距一目了然！</h3>
            <h3 class="list-preview-title" v-else>请输入资讯标题</h3>
            <div class="list-preview-imgs">
                <div class="list-preview-img" v-for="(img,index) in imgs" :key="index">
                    <img :src="img|imgScale"/>
                </div>
            </div>
            <div class="list-preview-infos">
                <span class="tag">#{{value.label}}</span>
                <span v-text="CurentTime"></span>
                <span><i class="iconfont icon-icon-test"></i>0</span>
                <span><i class="iconfont icon-iconfontpinglun"></i>0</span>
            </div>
        </div>
        <div class="list-preview-video" v-if="imgs.length<=2&&imgs.length>=1||videos.length>0">
            <div class="list-preview-video-left">
                <h3 class="list-preview-title" v-text="value.title" v-if="value.title">一个月不洗车和经常洗车，哪个更伤车，一年后差距一目了然！</h3>
                <h3 class="list-preview-title" v-else>请输入资讯标题</h3>
                <div class="list-preview-infos">
                    <span class="tag">#{{value.label}}</span>
                    <div class="layout-right">
                        <span><i class="iconfont icon-icon-test"></i>0</span>
                        <span><i class="iconfont icon-iconfontpinglun"></i>0</span>
                    </div>
                </div>
            </div>
            <div class="list-preview-img">
                <img :src="videos[0]|videoFrame" v-if="videos.length">
                <img :src="imgs[0]|imgScale" v-else/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        value:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
        imgScale(val){
            return `${val}?x-oss-process=image/resize,m_mfit,h_120`
        },
        videoFrame(val){
            return `${val}?x-oss-process=video/snapshot,t_0,f_jpg,w_200,h_120,m_fast`
        }
    },
    computed:{
        imgs(){
            if(this.value.img){
                return JSON.parse(this.value.img)
            }
            return []
        },
        videos(){
            if(this.value.video){
                return [this.value.video]
            }
            return []
        },
        CurentTime(){ 
            var now = new Date();
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            var clock = year + "-";
            if(month < 10)
                clock += "0";
            clock += month + "-";
            if(day < 10)
                clock += "0";
            clock += day + " ";
            return(clock); 
        }
    }
}
</script>
<style lang="less">
    .preview{
        width: 100%;
        .content-preview{
            height: 527px;
            width: 320px;
            background: #fff;
            border-radius: 5px;
            padding: 10px;
            overflow-y: auto;
            margin-bottom: @space-width;
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 1px;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(177, 177, 177, 0.02);
                background: #cfcfcf;
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(172, 172, 172, 0.02);
                border-radius: 5px;
                background: #EDEDED;
            }

            .content-title{
                color: #000;
                font-size: 18px;
                word-break:break-all;
                word-warp:break-word;
            }
            .content-news-info{
                color: #ccc;
                font-size: 12px;
                padding: 10px 0;
                
            }
            .content-news{
                font-size: 14px;
                word-break:break-all;
                word-warp:break-word;
                overflow: hidden;
                p{
                    margin-bottom: 15px;
                    img{
                        max-width: 100%!important;
                    }
                }
                
                ul,li{
                    list-style-type: default!important;
                }
            }
            .share{
                text-align: center;
                padding: 25px 0;
                .share-tips{
                    height: 1px;
                    background: #eee;
                    position: relative;
                    width: 180px;
                    margin: 0 auto;
                    &::before{
                        content: "把好文章分享给朋友吧！";
                        position: absolute;
                        height: 12px;
                        top: -8px;
                        left: 0;
                        right: 0;
                        width: 150px;
                        color: #ccc;
                        margin: auto;
                        background: #fff;
                        text-align: center;
                    }
                }
                .share-button{
                    background: rgb(255,213,55);
                    font-size: 16px;
                    color: #000;
                    max-width: 60%;
                    padding: 2px 30px;
                    display: inline-block;
                    border-radius: 40px;
                    margin-top: 25px;
                    height: 32px;
                    line-height: 30px;
                    cursor: not-allowed;
                    .iconfont{
                        font-size: 20px;
                        vertical-align: middle;
                    }
                }
            }
        }
        .list-preview{
            background: #fff;
            margin-bottom: @space-width;
            width: 320px;
            padding: 10px;
            border-radius: 5px;
            .list-preview-title{
                word-break:break-all;
                word-warp:break-word;
                max-height: 41px;
                overflow: hidden;
            }
            .list-preview-imgs{
                display: flex;
                padding-top: 8px;
                .list-preview-img{
                    overflow: hidden;
                    height: 70px;
                    width: 33.33%;
                    position: relative;
                    border-radius: 5px;
                    box-sizing: border-box;
                    margin-right: 5px;
                    &:last-child{
                        margin-right: 0;
                    }
                    img{
                        // width: 100%;
                        // max-width: 100%;
                        min-width: 100%;
                        max-height: 100%;
                        // height: 70px;
                        /* min-width: 195px; */
                        box-sizing: border-box;
                        // position: absolute;
                        // transform: translate(-50%, -50%);
                        // border-radius: 5px;
                    }
                }
            }
            .list-preview-infos{
                padding-top: 8px;
                span{
                    margin-right: 10px;
                    .iconfont{
                        font-size: 14px;
                        vertical-align: top;
                    }
                }
                .tag{
                    background: #eee;
                    padding:2px 5px;
                    border-radius: 2px;
                }
            }
        }


        .list-preview-video{
            margin-bottom: @space-width;
            width: 320px;
            padding: 10px;
            border-radius: 5px;
            background: #fff;
            display: flex;
            .list-preview-video-left{
                flex: 1;
                padding-right: 5px;
                .list-preview-title{
                    word-break:break-all;
                    word-warp:break-word;
                    height: 41px;
                    overflow: hidden;
                    margin-bottom: 18px;
                }
                .list-preview-infos{
                    // background: red;
                    display: flex;
                    justify-content: space-between;
                    span{
                        display: inline-block;
                    }
                    .iconfont{
                        font-size: 14px;
                        vertical-align: top;
                    }
                    .tag{
                        background: #eee;
                        padding:2px 5px;
                        border-radius: 2px;
                    }
                }
            }
            .list-preview-img{
                width: 110px;
                height: 80px;
                overflow: hidden;
                border-radius: 5px;
                img{
                    // max-width: 100%;
                    height: 80px;
                }
            }
        }
    }
</style>
