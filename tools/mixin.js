export const  mixin = {
    data(){
        return {
            query:{
                limit:6,
                page:1,
                content:""
            },
            total:0,
            totalPage:0,
            loading:true
        }
    },
    filters:{
        formatTime(val){
            if(val){
                let time = new Date(val*1000)
                let y = time.getFullYear()//年
                let m = time.getMonth() + 1//月
                let d = time.getDate()//日
                let h = time.getHours()//时
                let mm = time.getMinutes()//分
                let s = time.getSeconds()//秒
                
                m=m<10?"0"+m:m
                d=d<10?"0"+d:d
                
                h=h<10?"0"+h:h
                s=s<10?"0"+s:s
            
                let res=y+"-"+m+"-"+d+" "+h+":"+mm
                return res
            }
        }
    },
    methods: {
        changePage(pageNo){
            this.query.page=pageNo
            this.fetchData()
        },
        searchData(){
            this.query.page=1
            this.fetchData()
        },
        formatTime(val){
            let time = new Date(val*1000)
            let y = time.getFullYear()//年
            let m = time.getMonth() + 1//月
            let d = time.getDate()//日
            let h = time.getHours()//时
            let mm = time.getMinutes()//分
            let s = time.getSeconds()//秒
            
            m=m<10?"0"+m:m
            d=d<10?"0"+d:d
            
            h=h<10?"0"+h:h
            s=s<10?"0"+s:s
        
            let res=y+"-"+m+"-"+d+" "+h+":"+mm
            return res
        }
    },
    mounted(){
        this.fetchData()
    }
}