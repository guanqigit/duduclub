<template>
    <Modal 
        class-name="banner-modal"
        :footer-hide="true"
        :mask-closable="false"
        :value.sync="showModal"
        @on-visible-change="changeModal"
    >
        <Form :model="value" :rules="rules" label-position="top" inline ref="bannerForm">
            <FormItem  label="展位图片" class="form-full" prop="img">
                <uploadSlot
                    accept="image/jpeg,image/png"
                    @success="doneImg"
                >
                    <div class="file-input-btn" title="点击上传">
                        <div class="inner-text"  v-if="!showImg">
                            <i class="iconfont icon-image"></i>
                            上传图片 1372px * 600px
                        </div>
                        <img :src="value.img" v-if="showImg" />
                    </div>
                </uploadSlot>
                <Input v-model.lazy="value.img" placeholder="上传 / 输入图片地址：https://img.cn/img.jpg" class="input-controll"></Input>
            </FormItem>
            <FormItem label="展示位置" prop="position">
                <RadioGroup  type="button"  v-model="value.position">
                    <Radio :label="1">资讯</Radio>
                    <Radio :label="2">俱乐部</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="跳转类型" prop="type">
                <RadioGroup  type="button"  v-model="value.type" @on-change="changeBannerType">
                    <Radio  :label="3">网页</Radio>
                    <Radio  :label="1">帖子</Radio>
                    <Radio  :label="2">商品</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="排序" prop="position">
                <InputNumber :max="10" :min="1" :step="1" v-model="value.sort"></InputNumber>
            </FormItem>
            <FormItem label="帖子ID" prop="recommend_id" class="form-full" v-if="value.type==1" :key="value.type">
                <Input placeholder="请输入帖子ID" v-model="value.recommend_id" class="input-controll" :key="value.type"></Input>
            </FormItem>
            <FormItem label="商品ID" prop="recommend_id" class="form-full" v-if="value.type==2" :key="value.type">
                <Input placeholder="请输入商品ID"  v-model="value.recommend_id" class="input-controll" :key="value.type"></Input>
            </FormItem>
            <FormItem label="网页URL" prop="url" class="form-full" v-if="value.type==3" :key="value.type">
                <Input placeholder="请填写完整网页链接地址 例:https://www.exp.com"  v-model="value.url" class="input-controll" :key="value.type"></Input>
            </FormItem>
            <FormItem class="form-full">
                <Button type="info" @click="submit">提交</Button>
                <Button type="default" @click="changeModal(false)">取消</Button>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
import uploadSlot from "@/components/uploader/uploadSlot"
export default {
    components:{
        uploadSlot
    },
    props:{
        value:{
            default(){
                return {
                    id:"",
                    img:"",
                    position:1,
                    recommend_id:"",
                    sort:1,
                    type:3,
                    status:1,
                    url:""
                }
            },
            type:Object
        },
        showModal:{
            default:false,
            type:Boolean
        }
    },
    data(){
        return {
            rules:{
                img:[{required:true,message:"请上传/填写展位图片地址"},{pattern:/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,message:"请正确填写图片链接地址"}],
                url:[{required:true,message:"请填写跳转地址"},{pattern:/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,message:"请正确填写图片链接地址"}],
                position:[{required:true,message:"请选择展示位置"}],
                type:[{required:true,message:"请选择展示位置"}],
                sort:[{required:true,message:"请选输入排序号"}],
                recommend_id:[{required:true,message:"请输入ID"}]
            }
        }
    },
    computed:{
        showImg(){
            let reg=/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
            if(reg.test(this.value.img)){
                return true
            }
            return false
        }
    },
    methods:{
        changeModal(state){
            this.$emit("update:showModal",state)
            if(!state){
                this.value.id=""
                this.value.img=""
                this.value.position=1
                this.value.recommend_id=""
                this.value.type=3
                this.value.url=""
                this.$refs.bannerForm.resetFields()
            }
        },
        submit(){
            this.$refs.bannerForm.validate(async(valid)=>{
                if(valid){
                    this.$emit("submit",this.value)
                }
            })
        },
        doneImg(data){
            this.value.img=data.url
        },
        changeBannerType(){
            this.value.recommend_id=""
            this.value.url=""
        }
    }
}
</script>
<style lang="less" scoped>
.form-full{
    width:100%;
}
    .file-input-btn{
        display: block;
        height: 170px;
        overflow: hidden;
        cursor: pointer;
        // margin: @space-width 0;
        position: relative;
        border: 1px solid @border-color;
        border-radius: 5px;
        color: #ccc;
        overflow: hidden;
        margin-bottom: 15px;
        text-align: center;
        .inner-text{
            text-align:center;
            padding-top: 50px;
            &:last-child{
                margin-bottom: 0;
            }
            .iconfont{
                font-size: 40px;
                text-align: center;
                margin: auto;
                display: block;
                color: @border-color;
            }
        }

        &:hover{
            border: 1px solid @primary-color;
            .iconfont{
                color: @primary-color;
            }
        }
        img{
            max-height: 100%;
        }
        
    }
</style>
