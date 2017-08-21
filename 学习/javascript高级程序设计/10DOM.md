## DOM
- DOM(文档对象模型)是针对HTML和XML文档的一个API(应用程序编程接口)。DOM描绘了一个层次化的节点树，允许开发人员添加,移除和修改页面的一部分。
- 文档节点是文档的根节点，在html中文档节点只有一个子点，为元素节点html
- NodeList对象的独特之处在于，它实际上是基于DOM结构动态执行查询的结果，因此DOM结构的变化能够自动反应在NodeList对象中。
- 由于IE8及更早版本将NodeList实现为一个COM对象，而我们不能像使用JScript对象那样使用这种对象使用数组的方法（[].slice.call(nodes,0)）把它转化为数组会导致错误，必须手动枚举所有成员。
- hasChildNodes()方法可以判断元素是否有子节点，返回布尔值。
- 每个元素都有最后一个属性ownerDocument，该属性指向表达整个文档的文档节点(document)。
- insertBefore方法接受连个参数：要插入的节点和作为参照的节点。
- replaceChild方法接受两个参数：要插入的节点和要替换的节点。
- 与使用replaceChild方法一样，通过removeChild移除的节点仍然为文档所有，但在文档中已经没有了位置。
- cloneNode方法参数为true时复制节点本身和它的子节点，为false只复制本身。
- ie9之前的版本不会为空白符创建节点。
- cloneNode方法不会复制添加到DOM节点中的JavaScript属性，例如事件处理程序等。这个方法只复制特性（在明确指定的情况下也复制子节点），其他一切都不会复制，IE在此存在一个bug，即它会复制事件处理程序，所以我们减一在复制前最好移除事件处理程序。
- normalize()方法唯一的作用是处理文本节点。当在某个节点上调用这个方法时，就会在该节点的后代节点中查找，发现空文本节点则删除；如果找到相邻的文本节点，则把它们合并为一个文本节点。
### Documnet类型
- document.referrer 获取来源页面地址
- ie7中，document.getElementById不区分大小写，并且表单元素的name属性值和要获取的id名一样，会把表单元素获取。所以name属性和id最好都是唯一的。
- 在后台，对数字索引就会调用item()，而对字符串索引就会调用namedItem()
- getElementsByTagName()标签在html中不区分大小写，但在xml中区分
- 特殊集合：
    + document.anchors，包含文档中所有带name的特性a元素。
    + document.forms，包含文档中所有的form元素
    + document.links 包含文件中所有带href特性的a元素
    + document.images包含文档中所有的img标签
- DOM一致性检查
    + hasFeature()方法接受两个参数，要检测的DOM功能的名称及版本号。如果浏览器支持给定名称和版本的功能，则该方法返回true
    + document.implementation.hasFeature("XML","1.0")   
    + 返回true有时候也不意味着实现与规范一种
- 文档写入
    + write(),writeln()后者比前者多个一个换行符(\n).都具有将输出流写入网页的功能。    
    + 如果文档加载结束后再调用document.write，那么输出的内容将会重写整个页面。
+ Element类型
    + nodetype的值为1
    + nodeName的值为元素的标签名
    + nodeValue的值为null
    + 要访问元素的标签名，可以使用nodeName属性，也可以使用tagName属性。  
    + 在html中获取的标签名始终是大写  
+ ie中createElemnet方法参数可以是一个完整的html，包括id和class等等，在ie7以下版本中document.createElemnet创建（先创建一个元素，后期添加name等属性）同一组name名称相同的标签之间没有关联性，可以通过在 createElemnet中指定完整的HTML标签来解决。    
+ ie下ul有3个子节点，其他浏览器中，ul元素都会有7个元素,包括3个li元素和4个html
````js
   <ul>
      <li></li>
      <li></li>
      <li></li>
   </ul>
```` 
### text类型
    + nodeType值为3
    + nodeName的值为"#text"
    + nodeValue的值为节点所包含的文本
    + parentNode是一个Element
    + 不支持子节点
 - document.createTextNode()创建一个文本节点   
 - 和合并文本节点相反的方法：splitText()。这个方法会将一个文本节点分成两个文本节点，参数为一个数字，原来的文本节点将包含从开始到指定位置之前的内容。
 - 可以通过nodeValue和data取到内容。
### comment 类型
 - 注释在ODM通过Comment类型来表示，nodeType为8. 
### DocumentFrament类型
 -  在所有的节点类型中，只有DocumentFragment在文档中没有对应的标记。DOM规定文档片段是一种“轻量级”的文档。可以包含和控制节点，但不会像完整的文档那样占用额外的资源。
    + node Type的值为11.
    + nodeName的值为"#document-fragment";
    + nodeValue的值为null
    + parentNode的值为null
    + 可以使用document.createDocumentFragment()创建

### 动态脚本
 - 动态脚本都是异步的
````js 
  function loadScriptString(code){
              var script=document.createElement("script");
              script.type="text/javascript";
              //style.type="text/css";
              try{
                  //js
                   script.appendChild(document.createTextNode(code));
                  
                   //IE中会报错，IE将<script>视为一个特殊的元素，不允许DOM访问其子节点
              }catch(ex){
                  //Safari 3.0之前的版本虽然不能正确的支持text代码，但却允许使用文本节点技术来指定代码
                   script.text=code;
                    //css  style.styleSheet.cssText=""
              }
              document.body.appendChild(script);
              //document.getElementByTagName("head")[0];
              //css必须追加到head中
          }
````
### 使用NodeList
  - 理解Nodelist及其"近亲"NamedNodeMap和HTMLCollection，是从整体上透彻理解DOM的关键所在。这三个集合都是”动态的“。换句话说，每当文档结构发生变化时，它们都会得到更新。
  - 尽量减少访问NodeList的次数。因为每次访问NodeList,都会运行一次基于文档的查询。
### 小结
  - DOM是语言中立的API，用于访问和操作HTML和XML文档，DOM1级将HTML和XML文档形象的看作一个层次化的节点树，可以使用Javascript来操作这个节点树，进而改变底层文档的外观和结构
   



