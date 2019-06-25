
const cookieparser=require("cookieparser")
export const state = () => ({
    jwt_token:"",
    mobileNav:false,
    sideMenu:[
        {
            groupName:"资讯",
            links:[
                {
                    title:"资讯管理",
                    path:"/news"
                },
                {
                    title:"评论管理",
                    path:"/news-comments"
                },
                {
                    title:"发布资讯",
                    path:"/news-editor"
                }
            ]
        },
        {
            groupName:"俱乐部",
            links:[
                {
                    title:"成员管理",
                    path:"/club"
                },
                {
                    title:"车友动态",
                    path:"/club-activities"
                },
                {
                    title:"评论管理",
                    path:"/club-comments"
                },
                {
                    title:"俱乐部管理",
                    path:"/club-manager"
                }
            ]
        },
        {
            groupName:"维修保养",
            links:[
                {
                    title:"预约管理",
                    path:"/repair"
                }
            ]
        },
        {
            groupName:"基础设置",
            links:[
                {
                    title:"展位设置",
                    path:"/banner"
                }
            ]
        }
        // {
        //     groupName:"系统设置",
        //     links:[
        //         {
        //             title:"角色管理",
        //             path:"/role"
        //         },
        //         {
        //             title:"管理员设置",
        //             path:"/role-admin"
        //         }
        //     ]
        // }
    ]
})

export const getters={
    sideMenu:(state)=>{return state.sideMenu},
    mobileNav:(state)=>{return state.mobileNav}
}

export const mutations = {
    SET_JWT_TOKEN:(state,data)=>{
        state.jwt_token=data
    },
    SET_MOBILE_NAV:(state,data)=>{
        state.mobileNav=!state.mobileNav
    }
}

export const actions={
    nuxtServerInit({commit, state}, {req}) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.jwt_token)
            } catch (err) {
                // No valid cookie found
            }
            commit('SET_JWT_TOKEN', auth)
        }
    }
}
