<template>
    <div class="role-page">
        <Card :bordered="false" :padding="20">
            <p slot="title">角色管理</p>
            <div class="page-header">
                <Button type="info">新增角色</Button>
            </div>
            <Table  border :columns="columns" :data="datas" class="table">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="info" size="small" style="margin-right: 5px">编辑</Button>
                    <Button type="error" size="small" >删除</Button>
                </template>
            </Table>
            <div class="pagenation">
                <Page :total="100" show-elevator />
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width:120
                    },
                    {
                        title: '角色名称',
                        key: 'role_name',
                        width:130
                    },
                    {
                        title: '拥有权限',
                        key: 'roles'
                    },
                    {
                        title: '角色描述',
                        key: 'role_desc'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                datas: [
                    {
                        id: '1000',
                        role_name: "资讯管理员",
                        roles: "资讯管理、评论管理、发布资讯、标签管理",
                        role_desc:"资讯管理员"
                    },
                    {
                        id: '1001',
                        role_name: "俱乐部管理员",
                        roles: "成员管理、车主审核、车友动态、评论管理、展位设置",
                        role_desc:"俱乐部管理员"
                    },
                    {
                        id: '1002',
                        role_name: "维修保养管理员",
                        roles: "成员管理、车主审核、车友动态、评论管理、展位设置",
                        role_desc:"维修保养管理员"
                    }
                ]
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
