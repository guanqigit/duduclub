// /**
//  * [randomStr 生成随机字符串]
//  * @return {[String]} [生成好的随机字符串]
//  * 1、定义拼接字符串变量
//  * 2、定义随机字符串数组
//  * 3、遍历随机字符串数组 长度为range
//  * 4、sha1加密字符串
//  * 4、返回生成好的字符串sha1加密字符串+上传时间戳
//  */
// const randomStr=(range)=>{
//     let timestamp=new String(new Date().getTime())
//     let arr = [...timestamp,'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//     let str = ""
//     for(let i=0; i<range; i++){
//         let pos = Math.round(Math.random() * (arr.length-1));
//         str += arr[pos];
//     }
//     str=sha1(str)
//     return `${str}-${timestamp}`;
// }



// const OSS = require('ali-oss');
// const client = new OSS({
//     region: 'oss-cn-shenzhen',
//     accessKeyId: 'LTAIW54YzhhykOJ1',
//     accessKeySecret: 'CvyYJ2mnCITo7RajDouBj1X6eVBsaS',
//     bucket: 'yimibao'
// })

// export const uploader=(file)=>{
//     return new Promise(async (resolve,reject)=>{
//         const res=await client.put(`web-nuxt-manager/${randomStr(32)}`,file)
//         if(res.res.statusCode==200){
//             resolve(res)
//         }else{
//             reject(res)
//         }
//     })
// }


import sha1 from "sha1"

// const OSS = require('ali-oss');

class Uploader{

    // 单例
    static  getInstance(){

        if(!Uploader.instance){
            Uploader.instance=new Uploader();
        }
        return Uploader.instance;
    }


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
    }
    /**
     * 读取文件信息
     * file 文件
     */
    readFile(file){
        return new Promise((resolve,reject)=>{

            const size=(file.size/1024).toFixed(1)
            const name=file.name
            const ext=name.split('.').pop().toLowerCase()

            if(ext=="jpg"||ext=="png"||ext=="gif"){
                if (window.FileReader) {
                    var image = new Image()
                    var reader = new FileReader()
                        reader.readAsDataURL(file)
                        //文件读取结束时间
                        reader.onload = function (e) {
                            image.src = reader.result
                        }
                        //图片读取事件
                        image.onload = function () {
                            var height=image.naturalHeight
                            var width=image.naturalWidth
                            resolve({
                                height,
                                width,
                                size,
                                name,
                                ext,
                                image:true
                            })
                        }
                    return 
                }
            }
            resolve({
                size,
                name,
                ext,
                image:false
            })
        })
    }
    /**
     * expire 签名检测
     */
    checkSignature(expire){
        // 判断expire的值是否超过了当前时间，如果超过了当前时间，就重新获取签名，缓冲时间为3秒。
        let now = timestamp = Date.parse(new Date()) / 1000 
        if (expire < now + 3){
            return true
        }
        return false
    }
    /**
    *params:参数
    *file:文件
    *gObjectName： 文件名称
    **/
    makeFormData (params, file) { // 设置请求参数
        let data = new FormData()
            // 文件名字，可设置路径
            data.append('key', params.fileName)
            // policy规定了请求的表单域的合法性
            data.append('policy', params.policy)
            // Bucket 拥有者的Access Key Id
            data.append('OSSAccessKeyId', params.OSSAccessKeyId)
            // 让服务端返回200,不然，默认会返回204
            data.append('success_action_status', '200')
            // 根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
            // data.append('callback', params.callback)
            data.append('Signature', params.signature)
            // 需要上传的文件file
            data.append('Filename',params.fileName)
            data.append('name', params.fileName)
            data.append('file', file)
        return data
    }
    // /**
    //  * url :服务端接收地址
    //  * data:formdata
    //  */
    // doUpLoad (url, data) {
    //     return new Promise((resolve, reject) => {
    //         axios({
    //             url: url,
    //             method: 'post',
    //             data: data,
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         })
    //         .then((res) => {
    //             resolve(res)
    //         })
    //         .catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
}

export default Uploader.getInstance()