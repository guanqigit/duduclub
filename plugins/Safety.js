import sha1 from "sha1"

//签名字符串后缀
const suffix=""

class Safety{
	/**
	 * [create 生成接口请求安全对象]
	 * @return {[type]} [description]
	 */
	create(params){
		const newParams={
			...params,
			time:this.timeStamp(),
			random:this.randomStr(32)
		}
		const resParams={
			...newParams,
			sign:this.sign(newParams)
		}
		return resParams
	}
	/**
	 * 生成安全签名请求
	 * 签名规则
	 * 1、按照所有参数的key正序排序 (即A-Z)
	 * 2、将排列好的obj按顺序将值拼接起来生成str
	 * 3、将生成的str使用32位sha1进行加密
	 * 4、将sha1转换成大写得到最终签名
	 * 5、返回签名字符串
	 */
	sign(params){
		let obj=params || {}
		    obj=this.sortByObjectKey(obj)
			obj=this.connectObjectValueToString(obj)
		    return sha1(obj).toUpperCase()
	}

	/**
	 * [objKeySort 按照key正序排序 (即A-Z)]
	 * @param  {[type]} obj [需要排序的Obj]
	 * @return {[type]}     [返回排好序的新对象]
	 * 1、获取对象的所有key 返回值 为数组，利用.sort()将数组按key排序
	 * 2、newObj 创建一个新的对象，用于存放排好序的键值对
	 * 3、遍历keys数组
	 * 4、向新创建的对象中按照排好的顺序依次增加键值对
	 * 5、返回排好序的新对象
	 */
	sortByObjectKey(obj){
		const keys = Object.keys(obj).sort() 
		let newObj={} 
	    for (let i = 0; i < keys.length; i++) {
	        newObj[keys[i]] = obj[keys[i]];
	    }
	    return newObj;
	}
	/**
	 * [connectObjectValueToString 将obj的值拼接成字符串]
	 * @param  {[Object]} obj [需要拼接成字符串的obj]
	 * @return {[String]}     [拼接好的字符串]
	 * 1、创建遍历str用于连接obj的value
	 * 2、遍历obj中的值并与str变量连接
	 * 3、返回拼接好的字符串
	 */
	connectObjectValueToString(obj){
		let str=""
		for (let i in obj){
			if(obj[i]!=undefined){
				str+=String(obj[i])
			}
		}
		str+=suffix
		return str
	}
	/**
	 * [randomStr 生成随机字符串]
	 * @return {[String]} [生成好的随机字符串]
	 * 1、定义拼接字符串变量
	 * 2、定义随机字符串数组
	 * 3、遍历随机字符串数组 长度为range
	 * 4、返回生成好的字符串
	 */
	randomStr(range){
		let str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	    for(let i=0; i<range; i++){
	        let pos = Math.round(Math.random() * (arr.length-1));
	        str += arr[pos];
	    }
	    return str;
	}
	/**
	 * [timeStamp 获取当前时间戳]
	 * @return {[String]} [当前时间戳]
	 */
	timeStamp(){
		return (new Date()).getTime()+""
	}
}
export default new Safety()