import {Message} from "iview"

import Safety from "./Safety"
import Qs from "qs"
import cookie from "js-cookie"


export default function ({$axios,redirect,error,store}) {


    // $axios.defaults.baseURL="http://192.168.0.153:28080/api/v1" //内网测试地址
    // $axios.defaults.baseURL="http://119.23.219.124:28080/api/v1"  //外网测试地址
    $axios.defaults.baseURL="https://ymb.zhuanxinyu.com/yunduduweb/api/v1"  //正式地址
    
    $axios.onRequest(config => {
        
        if(config.method=="post"){
            config.data=Qs.stringify(Safety.create(config.data))
        }else if(config.method=="get"){
            config.params=Safety.create(config.params)
        }

        const token=store.state.jwt_token

        if (token){
            config.headers.Authorization=token;
        }

        return config
    })

    // 返回回调
    $axios.onResponse(res => {
        // console.log(res)
        if(res.data.code==10001){//token失效
            Message.error("登录状态失效，请重新登录！")
            cookie.remove("jwt_token")
            store.commit("SET_JWT_TOKEN","")
            redirect("/")
            return
        }
        // console.log(res.data)
        return res
    })

    // 错误回调
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        console.log(code)
        if (code === 400) {
            redirect('/400')
        }
    })
}
