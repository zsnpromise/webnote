//如果需要载入自己写的文件，路径必须采用点开头的路径
const cal= require('./calculator')

//模块内部定义的成员只能在模块内部使用，
//除非挂载到全局对象上（global）。最好不要这样做，因为会污染全局作用域。
//module 就是模块上下文 exports
console.log(cal.add(2,3));