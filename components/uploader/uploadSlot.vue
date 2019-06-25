<template>
    <div class="upload">
        <label class="file-input-btn">
            <slot>
            </slot>
            <input type="file" class="file-input" :accept="accept" @change="pickedFile">
        </label>
    </div>
</template>
<script>
// import uploader from "@/tools/upload"
const OSS = require('ali-oss');
import sha1 from "sha1"
export default {
    props:{
        accept:{
            type:String,
            default:"image/jpeg,image/png,image/gif"
        }
    },
    methods:{
        pickedFile(e){
            const file=e.target.files[0]
            if(file){
                this.upload(file)
            }
            e.target.value=""
        },
        randomStr(range){
            let timestamp=new String(new Date().getTime())
            let arr = [...timestamp,'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            let str = ""
            for(let i=0; i<range; i++){
                let pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            str=sha1(str)
            return `${str}-${timestamp}`;
        },
        async upload(file){

            // const {data}=await this.getOssSign()

            // // console.log(data)
            // console.log("dododo")
            let client = new OSS({
                region: 'oss-cn-shenzhen',
                accessKeyId: 'LTAIW54YzhhykOJ1',
                accessKeySecret: 'CvyYJ2mnCITo7RajDouBj1X6eVBsaS',
                bucket: 'yimibao'
            })


            const fileName=this.randomStr(32)

            this.$Spin.show()
            const res=await client.put(`web-nuxt-manager/${fileName}`,file)

            this.$Spin.hide()
            
            if(res.res.statusCode==200){
                this.$emit("success",res)
            }else{
                this.$Message.error("上传出错，请稍后重试！")
            }
        },
        getOssSign(){
            return new Promise(async (resolve,reject)=>{
                const {data}= await this.$axios.post("/oss-sign",{
                    method:"POST"
                })
                if(data.code==200){
                    resolve(data)
                }else{
                    this.$Message.error({
                        duration:3,
                        content:"获取上传凭证失败，请稍后重试！错误码："+data.code
                    })
                    // reject(data)
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .file-input{
        opacity: 0;
        display: none;
    }
</style>
