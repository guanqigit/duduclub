<template>
    <div class="role-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">修改密码</p>
            <Form label-position="top" :model="forms" :rules="rules" inline ref="passForm">
                <FormItem label="原始密码" prop="old_password">
                    <Input :maxlength="32" v-model="forms.old_password" type="password" placeholder="原始密码"></Input>
                </FormItem>
                <FormItem label="新密码" prop="new_password">
                    <Input :maxlength="32" v-model="forms.new_password" type="password" placeholder="新密码"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="re_password">
                    <Input :maxlength="32" v-model="forms.re_password" type="password" placeholder="确认密码"></Input>
                </FormItem>
                <FormItem label="操作">
                    <Button type="info" @click="submit">保存</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            const check=(rule,str,cb)=>{
                if(this.forms.new_password!==this.forms.re_password){
                    cb(new Error("两次密码不一致！"))
                }else{
                    cb()
                }
            }
            return {
                forms:{
                    old_password:"",
                    new_password:"",
                    re_password:""
                },
                rules:{
                    old_password:[{required:true,message:"请输入原始密码"}],
                    new_password:[{required:true,message:"请输入新密码"},{min:5,message:"新密码不能低于5位"}],
                    re_password:[{required:true,message:"请再次输入新密码"},{validator:check}]
                }
            }
        },
        methods:{
            submit(){
                this.$refs.passForm.validate(async (valid)=>{
                    if(valid){
                        const {data}=await this.$axios.post("/modify-password",this.forms)
                        if(data.code==200){
                            this.$refs.passForm.resetFields()
                            this.$Message.success("密码修改成功！")
                        }else{
                            this.$Message.error(data.msg)
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
.role-page{
    .page-header{
        padding-bottom: @space-width;
    }
}
</style>
