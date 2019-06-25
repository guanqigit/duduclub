# dudu-housekeeper
> 嘟嘟管家后台管理系统
## 1. Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


## 2. 依赖
> iview    [doc link](https://www.iviewui.com/)
> vue      [doc link](https://cn.vuejs.org/)
> nuxt.js  [doc link](https://nuxtjs.org/)
> less 

## 3.打包上线事项
> 打包上线注意修改 plugins/axios  $axios.defaults.baseURL="http://119.23.219.124:28080/api/v1"  //正式环境地址