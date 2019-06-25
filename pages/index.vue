<template>
    <div class="home-page">
        <div class="auth-form">
            <header class="auth-form-header">
                <h2>Dudu - Admin</h2>
                <p>嘟嘟管家后台管理系统</p>
            </header>
            <Form :model="forms" :rules="rules" label-position="top" ref="loginForm">
                <FormItem prop="username">
                    <Input :maxlength="32" @keydown.native.enter="submit" v-model="forms.username"  size="large" placeholder="管理员账户">
                        <i class="iconfont icon-icon1" slot="prefix"></i>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input :maxlength="32" @keydown.native.enter="submit"  v-model="forms.password" type="password" size="large" placeholder="管理员密码">
                        <i class="iconfont icon-mima54" slot="prefix"></i>
                    </Input>
                </FormItem>
                <FormItem class="captcha" prop="code">
                    <Input :maxlength="4" @keydown.native.enter="submit" v-model="forms.code" size="large" class="captcha-input"  placeholder="图形验证码">
                        <i class="iconfont icon-yanzhengma" slot="prefix"></i>
                    </Input>
                    <img class="captcha-img" :src="captcha.picture" v-if="captcha.picture" @click="getCaptcha"/>
                </FormItem>
                <FormItem>
                    <Button size="large" @click="submit" type="info" long>登入</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import cookie from "js-cookie"
import {mapMutations} from "vuex"
export default {
    layout:"login",
    data(){
        return {
            forms:{
                username:"",
                password:"",
                code:"",
                id:""
            },
            rules:{
                username:[{required:true,message:"请输入用户名"}],
                password:[{required:true,message:"密码不能为空"}],
                code:[{required:true,message:"请输入图形验证码"}]
            },
            captcha:{
                id:"",
                picture:""
            }
        }
    },
    methods:{
        ...mapMutations(["SET_JWT_TOKEN"]),
        async getCaptcha(){
            const res=await this.$axios.$get("/picture-code",{
                params:{
                    type:2,
                    height:32,
                    width:120
                }
            })
            if(res.code==200){
                
                this.captcha=res.data
                this.forms.id=res.data.id
            }
        },
         submit(){
            this.$refs.loginForm.validate(async (valid)=>{
                if(valid){
                    const {data}=await this.$axios.post("/sign-in",this.forms)
                    if(data.code!=200){
                        if(data.code=10102){
                            this.getCaptcha()
                        }
                        this.$Message.error(data.msg)
                        return
                    }
                    cookie.set("jwt_token",data.data.token)
                    this.SET_JWT_TOKEN(data.data.token)
                    this.$router.push("/dashboard")
                }
            })
        }
    },
    mounted(){
        this.getCaptcha()
    }
}
</script>
<style lang="less" scoped>
    .home-page{
        padding: 100px 0;
        .auth-form{
            max-width: 375px;
            width: 100%;
            margin: 0 auto;
            padding: @space-width;
            .auth-form-header{
                display: block;
                // text-align: center;
                padding-bottom: 30px;
                h2{
                    font-size: 20px;
                    font-weight: normal;
                    padding-bottom: 5px;
                }
                p{
                    font-size: 14px;
                }
            }
            .captcha{
                .captcha-input{
                    // width: 240px;
                }
                .captcha-img{
                    position: absolute;
                    height: 32px;
                    width: 120px;
                    border: 1px solid @border-color;
                    border-radius: @radius;
                    right: 2px;
                    top: 2px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
