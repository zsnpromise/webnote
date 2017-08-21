### ajax
  - jsonp原理
````js

  
function ajax(options){
  var defaults = {
    url : '/abc',
    jsonp : 'callback'
  }
  // 覆盖默认值
  for(var key in options){
    defaults[key] = options[key];
  }

  var cbName = 'jQuery' + ('v1.11.1' + Math.random()).replace(/\D/g,'') + '_' + new Date().getTime();
  if(defaults.jsonpCallback){
    cbName = defaults.jsonpCallback;
  }

  // 给window对象添加了一个全局方法，全局方法的名称是cbName的值，而不是cbName本身
  window[cbName] = function(data){
    defaults.success(data);
  }

  // 处理业务参数 flag=1&n=123&
  var param = '';
  if(defaults.data){
    for(var key in defaults.data){
      param += key + '=' + defaults.data[key] + '&';
    }
  }
  // if(param){
  //   param = param.substring(0,param.length - 1);
  // }

  // 动态创建script标签，然后通过标签的src属性发送请求
  var script = document.createElement('script');
  script.src = defaults.url + '?' + param + defaults.jsonp + '=' + cbName + '&_=' + new Date().getTime();// jQuery413241431234143213_1231231231({"username":"lisi"})
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}
````