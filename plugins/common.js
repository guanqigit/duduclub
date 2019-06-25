import Vue from "vue"



const formatTime=(val)=>{
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


Vue.prototype.$formatTime=formatTime



Vue.filter( 'formatTime' , formatTime)