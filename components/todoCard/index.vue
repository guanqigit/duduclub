<template>
    <Card :bordered="false" :padding="20" >
        <p slot="title">俱乐部统计</p>
        <ul class="to-do-list">
            <li>
                <span>俱乐部成员（人）</span>
                <h3>320</h3>
            </li>
            <li>
                <span>待审核成员（人）</span>
                <h3>60</h3>
            </li>
            <li>
                <span>已审核成员（人）</span>
                <h3>320</h3>
            </li>
            <li>
                <span>车友动态（条）</span>
                <h3>2225</h3>
            </li>
            <li>
                <span>动态回复（条）</span>
                <h3>2225</h3>
            </li>
        </ul>
    </Card>
</template>
<style lang="less" scoped>
    .to-do-list{
        li{
            padding: @space-width;
            background: @body-color;
            display: inline-block;
            border-radius: 5px;
            span{
                color: #aaa;
                display: block;
            }
            h3{
                color: @primary-color;
                font-size: 30px;
                height: 30px;
                line-height: 30px;
                display: block;
            }
        }
    }
</style>
