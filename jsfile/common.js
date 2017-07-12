/**
 * Created by yoyo on 2017-05-05.
 */



function getPageX(e) {
  //先检测是否存在pageX
  if (e.pageX) {
    return e.pageX;
  } else {
    //pageX的值是可视区域横坐标+页面左侧的卷曲距离
    return e.clientX + myScroll().left;
  }
}

function getPageY(e) {
  //先检测是否存在pageX
  if (e.pageY) {
    return e.pageY;
  } else {
    //pageX的值是可视区域横坐标+页面左侧的卷曲距离
    return e.clientY + myScroll().top;
  }
}


/**
 * 兼容事件对象
 * @param e 获取事件对象
 * @returns {*|Event} 返回兼容后的事件对象
 */
function getEvent(e) {
  return e || window.event;
}


/**
 * 自己实现多次给同一标签添加事件不覆盖的函数
 * @param tag 要添加事件的标签
 * @param eventName 事件类型名 - 不需要加 on
 * @param fn 事件处理程序
 */
function myAddEvent(tag, eventName, fn) {
  var oldEvent = tag["on" + eventName];
  if (typeof oldEvent == "function") {
    tag["on" + eventName] = function () {
      oldEvent();
      fn();
    };
  } else {
    tag["on" + eventName] = fn;
  }
}


/**
 *
 * @param tag
 * @param attr
 * @returns {*}
 */
function getStyle(tag, attr) {
  if (tag.currentStyle) {
    return tag.currentStyle[attr];
  } else {
    return getComputedStyle(tag, null)[attr];
  }
//        return tag.currentStyle?tag.currentStyle[attr]:getComputedStyle(tag,null)[attr];
}

/**
 * 获取元素的内部文本
 * @param tag
 * @returns {*}
 */
function getText(tag) {
  if (typeof tag.innerText != "undefined") {
    return tag.innerText;
  } else {
    return tag.textContent;
  }
}

/**
 * 设置元素内部的文本
 * @param tag
 * @param text
 */
function setText(tag, text) {
  if (typeof tag.innerText != "undefined") {
    tag.innerText = text;
  } else {
    tag.textContent = text;
  }
}


/**
 *
 * @param clsName
 * @param tarEle 想要在某个标签内进行查找 (可选)
 * @returns {*}
 */
function getByClass(clsName, tarEle) {
  tarEle = tarEle || document.body;
  if (typeof document.getElementsByClassName == "function") {
    return tarEle.getElementsByClassName(clsName);
  } else {
    var allTag = tarEle.getElementsByTagName("*");
    var resultArr = [];//保存最终获取结果
    
    for (var i = 0; i < allTag.length; i++) {
      var tempClass = allTag[i].className;
      var tempArr = tempClass.split(" ");
      
      for (var j = 0; j < tempArr.length; j++) {
        if (tempArr[j] == clsName) {
          resultArr[resultArr.length] = allTag[i];
          break;//减少循环的执行次数
        }
      }
    }
    return resultArr;
    
  }
}

/**
 * 获取当前节点的所有兄弟
 * @param me
 * @returns {Array}
 */
function getSb(me) {
  var meDie = me.parentNode;
  var resultArr = [];
  var xiongdis = meDie.children;
  for (var i = 0; i < xiongdis.length; i++) {
    if (xiongdis[i] != me) {
      resultArr.push(xiongdis[i]);
    }
  }
  return resultArr;
  
}

/**
 * 获取后一个兄弟节点
 * @param node  元素节点
 * @returns {*|Node}  返回获取到的元素节点 或者null
 */
function getNextEleSib(node) {
  var ns = node.nextSibling;
  while (null != ns && 1 != ns.nodeType) {
    ns = ns.nextSibling;
  }
  return ns;
}

/**
 * 获取前一个兄弟节点
 * @param node  元素节点
 * @returns {*|Node}  返回获取到的元素节点 或者null
 */
function getPreEleSib(node) {
  //获取node的前一个兄弟节点
  var ps = node.previousSibling;
  while (null != ps && 1 != ps.nodeType) {
    ps = ps.previousSibling;
  }
  return ps;
}

function myScroll() {
  return {
    scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
  };
}

function myClient() {
  return {
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0
  };
}