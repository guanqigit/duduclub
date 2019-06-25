import pkg from './package'

export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: "嘟嘟管家-后台管理系统",
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#2d8cf0' },
    /*
    ** Global CSS
    */
    css: [
        "~/assets/less/base.less",
        'quill/dist/quill.snow.css',
        'quill/dist/quill.bubble.css',
        'quill/dist/quill.core.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {
            src:"~/plugins/iview",
            ssr:true
        },
        {
            src: "~/plugins/axios",
            ssr: false
        },
        { src: '~plugins/editor/index.js', ssr: false },
        { src: '~plugins/common.js', ssr: false }
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/axios'
    ],
    styleResources: {
        less: './assets/less/variable.less'
    },
    router:{
        middleware:['auth']
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        
        extend(config, ctx) {

        }
    }
}
