## 数据绑定和第一个AngularJS Web应用
- angular中数据绑定
   + 它创建实时模板来替代视图，而不是将数据合并进模板之后跟新DOM。任何一个独立视图组件中的值都是动态替换的。这个功能可以说是angular最重要的功能之一。
   + 自动数据绑定使我们可以将视图理解为模型状态的映射。当客户端的数据模型发生变化时，视图就能反应这些变化，并且不需要写任何自定义代码，它就可以工作。
   + MVC：视图-模型-控制器
   + 表现分离：视图不需要知道如何保存对象，只需要知道如何显示它。数据模型不需要同视图进行交互，只需要包含数据和操作视图的方法。控制器用来存放二者绑定在一起的业务逻辑。
   + angular会在事件循环时执行脏检查来保证数据的一致性。
   + angular使用$预定义对象，只要遇到$符号，都可以只把它看作一个angular对象。
   + $timeout本质上就是定时器
   + 数据绑定的最佳实践：由于Javascript自身的特点，以及它在传递值和引用时的不同处理方式，通常认为，在视图中通过对象的属性而非对象本身来进行引用绑定，是Angular中的最佳实践。
````js
    <div ng-controller="myCon">
        <h1>Hello {{clock.now}}</h1>
    </div>
    <script src="js/angular.js"></script>
    <script>
        var app = angular.module("myApp", []);
        app.controller("myCon", function ($scope, $timeout) {
            $scope.clock = { now: new Date() };
            var update = function () {
                $scope.clock.now =  new Date() ;
               
            };
            setInterval(function(){ //使用$timeout就不会有这样的问题。
              $scope.$apply(update) //Scope提供$apply方法传播Model的变化,setInterval产生的变化angular监控不到，和promise中的rosolve方法一样
            },1000)
            update();
        })
````
## 模块
- 在angular中，模块是定义应用的最主要方式。模块包含了主要的应用代码。一个应用可以包含多个模块，每一个模块都包含了定义具体功能的代码。
- 定义模块的好处：
    + 保存全局命名空间的清洁
    + 编写测试代码更容易，并能保持其清洁，以便更容易找到互相隔离的功能。
    + 易于在不同应用间复用代码。
    + 使应用能够以任意顺序加载代码的各个部分。
    + angular.module(name,requires);
       - name(字符串)：name是模块的名称，字符串变量。
       - requires(字符串数组)：requires包含一个字符串变量组成的列表，每个元素都是一个模块的名称，本模块依赖于这些模块，依赖需要在本模块加载之前有注入器进行预加载。
 ## 作用域
- 作用域说明 
   - 应用的作用域是和应用的数据模型关联的，同时作用域也是表达式执行的上下文。$scope对象是定义应用业务逻辑，控制器方法和视图属性的地方。
   - 作用域是应用和控制器之间的胶水。基于动态绑定，可以依赖视图在修改数据时立即更新$scope,也可以依赖$scope在其发生变化时立即重新渲染视图。
   - angular将$scope设计成和DOM类似的结构，因此$scope可以进行嵌套绑定，也就是说可以引用父类$scope的属性。
   - 将应用的业务逻辑都放在控制器中，而将相关的数据都放在控制器的作用域中，这是非常完美的结构。
- 视图和$scope的世界
   - angular启动并生成视图时，会将根ng-app元素同$rootScope进行绑定。$toorScope是所有$scope对象的最上层。
   - $scope对象在angular中充当数据模型，但与传统的数据模型不一样，$scope并不负责处理和操作数据，它只是视图和HTML之间的桥梁，它是视图和控制器之间的胶水。
 ````js
 //run方法用于初始化全局的数据，仅对全局作用域起作用。
   angular.module("myApp",[]).run(function($rootScope){
        $rootScope.name="tt";
    })
 ````  
 - angular应用的模板（HTML）中使用多种标记：   
    + 指令：将DOM元素增强为可复用的DOM组件的属性或元素。
    + 值绑定：模板语法{{}}可以将表达式绑定到视图上。
    + 表单控件：用来检查用户输入的控件。

 - 作用域能做什么
    + 提供观察者以监视数据模型的变化
    + 可以将数据模型的变化通知给整个应用，甚至是系统外的组件。
    + 可以进行嵌套，隔离业务功能和数据。
    + 给表达式提供运算时所需的执行环境。
    + 作用域包含了渲染视图时所需的功能和数据，它是所有视图的唯一源头。可以将作用域理解成视图模型。
 - $scope对象的生命周期处理有四个不同阶段
    + 创建：在创建控制器或指令时，angular会用$injector创建一个新的作用域，并在这个新建的控制器或指令运行时将作用域传递过去。
    + 链接：当angular开始运行时，所有的$scope对象都会附加或者链接到视图中。所有创建$scope对象的函数也会将自身附加到视图中。这些作用域将会注册angular应用上下文中发生变化时需要运行的函数。
       - 这些函数被称为$watch函数，angular通过这些函数获知何时启动事件循环。
    + 更新：当事件循环运行时，他通常执行在顶层$scope对象上(被称作$rootScope)，每个子作用域都执行自己的脏值检查。每个监控函数都会检查变化。如果检查到任意变化，$scope对象将会触发指定的回调函数。
    + 销毁：当一个$scope在视图不在需要时，这个作用域将会清理和销毁自己。
       - 尽管永远不会需要清理作用域（angular会处理），但是知道谁创建了这个作用域还是有用的，因为可以使用这个$scope上叫做$destory()的方法来清理这个作用域。
    + 指令和作用域：指令通常不会创建自己的$scope，但也有例外，比如ng-controller和ng-repeat(过滤器和遍历)指令会创建自己的子作用域并将它们附加到DOM元素上。
## 控制器
- 控制器在angular中的作用是增强视图，控制器是一个函数，用来向视图的作用域中添加额外的功能。
- angular同其它Javascript框架最主要的一个区别就是，控制器并不适合执行DOM操作，格式化或数据操作，以及除存储数据模型之外的状态维护操作，它只是视图和$scope之间的桥梁.
- $scope对象用来从数据模型向视图传递信息。同时，它也可以用来设置事件监听器，同应用的其它部分进行交互，以及创建与应用相关的特定业务逻辑。
- angular应用的任何一部分，无论它渲染在哪个上下文中，都有父级作用域存在。对于ng-app所处的层级来讲，它的父级作用域就是$rootScope。
   + 有一个例外：在指令内部创建的作用域被称为孤立作用域。
   + 除了孤立作用域外，所有的作用域都是通过原型继承而来，也就是说它们都可以访问父级作用域。
 ````js
 <body ng-app="myApp">
    <div ng-controller="myCon">
         <div ng-controller="myChild">
            <button ng-click="fn.hello()">点击</button>
        </div>
    </div>

     <script src="js/angular.js"></script>
    <script>
        var app = angular.module("myApp", []).run(function ($rootScope) {
            $rootScope.name = "tt";
        });
        app.controller("myCon", function ($scope) {
            $scope.person={
                name:"zzz"
            }
        })
        app.controller("myChild",function($scope){
            $scope.fn={
                hello:function(){
                    alert($scope.person.name);
                }
            }
        })
    </script>
</body>
```` 
## 表达式

- 表达式和eval(javascript)非常相似，但是由于表达式有Angular来处理，有以下特征：
     + 所有的表达式都在其所属的作用域内部执行，并有访问本地$scope的权限；
     + 如果表达式发生了TypeError和ReferenceError并不会抛出异常；
     + 不允许使用任何流程控制功能（条件控制，例如if/else）;
     + 可以接受过滤器和过滤器链
- 解析Angular表达式
     + Angular会在运行$digest循环的过程中自动解析表达式，但是手动解析表达式也是非常有用的。
     + Angular通过$parse这个内部服务来进行表达式的计算，这个服务能访问当前所处的作用域。这个过程允许我们访问定义在$scope上的原始Javascript数据和函数。
 ````js
 <body ng-app="myApp">
    <section ng-controller="oneCon">
              <input type="text" ng-model="expr" placeholder="Enter an expression">
              <h2>{{parsedValue}}</h2>
    </section>
<script src="js/angular.js"></script>
<script>
    angular.module("myApp",[]).controller("oneCon",["$scope","$parse",function($scope,$parse){
             $scope.$watch('expr',function(newVal,oldVal,scope){
                 if(newVal!=oldVal){
                     //用该表达式设置parseFun
                     var parseFun=$parse(newVal);
                     //获取经过解析后表达式的值
                     $scope.parsedValue=parseFun(scope);
                 }
             })
    }])
</script>
</body>
 ````      
 - 插值字符串
    + 插值允许基于作用域上的某个条件实时更新文本字符串。要在字符串模板中做插值插值，需要在对象中注入$interpolate服务。
    + $interpolate服务接受三个参数，其中第一个参数是必须的。
        - txt(字符串)：一个包含字符插值标记的字符串。
        - mustHaveExpression(布尔型)：如果将这个参数设置为true，当传入字符串中不含有表达式时返回null。
        - trustedContext(字符串)：angular会对已经进行过字符插值操作的字符串通过$sec.getTrusted()方法进行严格的上下文转义。
        - $interpolate服务返回一个函数，用来在特定的上下文中运算表达式。
        - 在{{previewText}}内部的文本可以将{{to}}当成一个变量来使用，并对文本的变化进行实时更新。
````js
<body ng-app="myApp">
    <section ng-controller="oneCon">
              <input type="email" ng-model="to" > //需要输入邮箱格式
              <textarea ng-model="emailBody"></textarea>
              <pre>{{previewText}}</pre>
              <p>{{to}}</p>
    </section>
<script src="js/angular.js"></script>
<script>
    angular.module("myApp",[]).controller("oneCon",["$scope","$interpolate",function($scope,$interpolate){
             $scope.$watch('emailBody',function(body){ //监控文本域输入值，如果字符串中有表达式，且去找对应的值，替换，没有则替换为空。
                if(body){
                    var template=$interpolate(body);
                    $scope.previewText=template({to:$scope.to});
                }
             })
    }])
</script>
</body>
````        
- 如果需要在文本中使用不同于{{}的符号来标识表达式开始和结束，可以在$interprolateProvider中配置
   + 用startSymbol()方法可以修改标识开始的符号，这个方法接受一个参数。
       - value(字符型):开始符号的值。
   + endSymbol结束符号的值   
   + 如果要修改这两个符号的值，需要在创建新模块时将$interpolateProvider注入进去。
````js
<body ng-app="myApp">
    <section ng-controller="oneCon">
              <input type="email" ng-model="to" >
              <textarea ng-model="emailBody"></textarea>
              <pre>__previewText__</pre>
              <p>__to__</p>
    </section>
<script src="js/angular.js"></script>
<script>
    angular.module("emaliParser",[])
    .config(['$interpolateProvider',function($interpolateProvider){
        $interpolateProvider.startSymbol('__');
        $interpolateProvider.endSymbol('__'); //用自定义__符号取代默认的{{}}符号请求插值文本。
    }])
    .factory('EmailParser',['$interpolate',function($interpolate){
        //处理解析的服务
           return {
               parse:function(txt,content){
                   var template=$interpolate(txt);
                   return template(content);
               }
           }
    }])


     angular.module("myApp",['emaliParser'])
    .controller("oneCon",["$scope","EmailParser",function($scope,EmailParser){
             $scope.$watch('emailBody',function(body){
                if(body){
                   
                    $scope.previewText=EmailParser.parse(body,{to:$scope.to});
                }
             })
    }])
</script>
</body>
````
## 过滤器
### 过滤器是用来格式化需要展示给用户的数据。
   + 在HTML中的模板绑定符号{{}}内部通过|符号来调用过滤器
       - {{name|uppercase}}
   + 在Javascript中通过$filter来调用过滤器。
       - $filter('uppercase')('Ari')
   + 以HTML的形式使用过滤器时，如果需要传递参数给过滤器，只要在过滤器名字后面加冒号即可。如果是多个参数，可以在每个参数后面都加入冒号。
       - {{123.45678|number:2}}   //取两位小数
   + 可以用|符号作为分隔符来同时使用多个过滤器。
       - currency过滤器可以将一个数据格式化为货币格式。允许设置货币符号，默认情况下会采用客户端所处区域的货币符号。
           -  {{txt|currency:'￥'}}
       - date过滤器可以将日期格式化成需要的格式，angular中内置了几种日期格式，，如果没有指定使用任何格式，默认会采用mediumDate格式。
           -  {{txt|date:'yyyy-mm-dd'}}
       - filter过滤器可以从给定数组中选择一个子集，并将其生成一个新数组返回。这个过滤器通常用来过滤需要进行展示的元素。
         + 这个过滤器的第一个参数可以是字符串，对象或是一个用来从数组中选择元素的函数。
           
            - 字符串：返回所有包含这个字符串的元素。如果想返回不包含该字符串的元素，在参数前加!符号。
            - 对象：angular将待过滤对象的属性同这个对象中的同名属性进行比较，如果属性值是字符串就会判断是否包含该字符串。如果希望对全部属性都进行对比，可以将$当作键名。
            - 对每个元素都执行这个函数，返回非假值的元素会出现在新的数组中并返回。

         + filter过滤器第二个参数，用来指定预期值同实际值进行比较的方式。
            - false 进行区分大小写的子字符串比较
            - true 用angular.equals(expected,actual)对两个值进行严格比较。
            - 函数 运行这个函数，如果是真值就接受这个元素
      + json过滤器可以将一个JSON或Javascript对象转换为字符串
     + limitTo过滤器会根据传入的参数生成一个新的数组或者字符串，新的数组或字符串的长度取决于传入的参数，通过传入参数的正负值来控制从前面还是后面开始截取。
       - {{['a','b','c']|limitTo:1}} //['a']     
     + lowercase过滤器将字符串转为小写
     + number过滤器将数字格式化成文本。第二个参数是可选的，用来控制小数点后截取的位数。
       - 如果传入了一个非数字类型，会返回空字符串。
       - {{1304375948024|number}} 1,304,375,948,024  
     + orderBy过滤器可以用表达式对指定的数组进行排序。接受两个参数，第一个是必须的，第二个可选。
       - 第一个参数类型
          + 函数：当第一个参数是函数时，该函数就会被当作排序对象的getter方法。
          + 字符串：对这个字符串进行解析的结果将决定数组的排序方向。可以传入+或-来强制进行升序或降序排列。+ 数组：在排序表达式中使用数组元素作为谓词。对于与表达式结果并不严格相等的每个元素，则使用第一个谓词。
       - 第二个参数用来控制排序的方向（是否逆向）。
       -  
       ````html
           {{
                [{'name':"zsn",'age':12},{'name':"clj",'age':10},{'name':"xpp",'age':8}]
                |orderBy:'age':'true'
            }}  
       ````
### 自定义过滤器
  + 自定义过滤器需要将它放在自己的模块中，实现一个将首字母大写的过滤器。
 ````js
     angular.module("myApp.filters",[])
    .filter('capitalize',function(){
        return function(input){
            if(input){
                return input[0].toUpperCase()+input.slice(1);
            }
        }
    })
   
     angular.module("myApp",["myApp.filters"])
    .controller("oneCon",["$scope",function($scope){
        
    }])
 ```` 
 ### 表单验证
   - angular能够将HTML5表单验证功能同它自己的验证指令结合起来使用。
      - 要使用表单验证，首先要确保表单元素有一个name属性
      - 所有输入字段都可以进行基本的验证，比如最大，最小长度等。这些功能是由新的HTML5表单属性提供的。
      - 如果想屏蔽浏览器对表单的默认验证行为，可以在表单元素上添加novalidate标记
      - input元素上使用的所有验证选项
         + 必填项： h5标记required &lt;input type="text" required />
         + 最小长度 ng-minlength="number"
         + 最大长度 ng-maxlength="number"
         + 模式匹配 使用ng-pattern="/正则表达式/"来确保输入能够匹配指定的正则表达式
         + 电子邮箱 &lt;input type="email" name="email" />
         + 数字 &lt;input type="number" name="age" />
         + url &lt;input type="url" name="homepage" />
         + 在表单中控制变量 可以使用以下格式访问这些属性
             - formName.inputFieldName.property
             - 未修改的表单--这是一个布尔属性，用来判断用户是否修改了表单。如果未修改，值为true，如果修改过值为false :formName.inputFieldName.$pristine
             - 修改过的表单--只要用户修改过表单，无论输入是否通过验证，该值都返回true：formName.inputFieldName.$dirty
             - 合法的表单--这个布尔值的属性用来判断表单的内容是否合法。如果当前表单内容时合法的，下面属性的值就是true：formName.inputFieldName.$valid
             - 不合法的表单--这个布尔属性用来判断表单的内容是否不合法。如果当前表单内容是不合法的，下面属性的值为true：formName.inputFieldName.$invalid
             - 错误--这是angular提供的另外一个非常有用的属性：$error对象。它包含当前表单的所有验证内容，以及它们是否合法的信息。formName.inputfieldName.$error;如果验证失败，这个属性的值为true；如果值为false，说明输入字段的值通过了验证
          + 一些有用的css样式
             - angular处理表单时，会根据表单当前的状态添加一些css类，这些css类的命名和前面介绍的属性很相似。
             - .ng-pristine{};.ng-dirty{};.ng-valid{};.ng-invalid{}
             - 当某个字段中的输入非法时，.ng-invlid类会被添加到这个字段上。当前列子中的站点将对应的css样式设置为：
                 + input.ng-invalid{border:1px solid red;}
                 + input.ng-valid{border:1px solid green;}
+ $parsers
    - 当用户与控制器进行交互，并且ngModelController中的$setViewValue()方法被调用时，$parsers数组中的函数会以流水线的形式被逐个调用。第一个$parse被调用后，执行结果会传给第二个$parse，以此类推。
    - 这些函数可以对输入值进行转换，或者通过$setValidity()函数设置表单的合法性。
    - 使用$parsers数组是实现自定义验证的途径之一，例如，假设我们想确保输入值在某两个数值中间，可以在$parsers数组中栈入一个新的函数，逐个函数会在验证链接中被调用。
    - 每个$parse返回的值都会被传入下一个$parser中。当不希望数据模型发生更新时返回undefined。     
````js
    angular.module("myApp",[]).directive('ontToTen',function(){
        return {
            require:"?ngModel",
            link:function(scope,ele,attrs,ngModel){
                if(!ngModel)return;
                ngModel.$parsers.unshift(
                    function(viewValue){
                        var i=parseInt(viewValue);
                        if(i>=0&&i<10){
                            ngModel.$setValidity('oneToTen',true);
                            return viewValue;
                        }else{
                            ngModel.$setValidity  ('oneToTen',false);
                            return undefined;
                        }
                    }
                )
            }
        }
    })
````

+ $formatters    
   - 当绑定的ngModel值发生了变化，并经过$parsers数组中解析器的处理后，这个值会被传递给$formatters流水线。同$parsers数组可以修改表单的合法性状态类似，$formatters中的函数也可以修改并格式化这些值。
   - 比起单纯的验证目的，这些函数更常用来处理视图中的可视变化。例如，假设我们要对某个值进行格式化。通过$formatters数组可以在这个值上执行过滤器：
        ````js
              angular.module("myApp").directive('oneToTen',function(){
              return {
                 require:"?ngModel",
                 link:function(scope,ele,attrs,ngModel){
                    if(!ngModel)return;
                    ngModel.$formatters.unshift(function(v){
                      return $filter('number')(v);
                    })
               }
           }
          })
        ````
- 组合实例   
  ---难
## 指令简介
### 指令：自定义HTML元素和属性
- 自定义指令
   + angular模块API中的.directive()方法，可以通过传入一个字符串和一个函数来注册一个新指令。其中字符串是这个指令的名称，指令名应该是驼峰命名风格的，函数应该返回一个对象。
   + directive()方法返回的对象中包含了用来定义和匹配指令所需的方法和属性。
   + 可以将自定义标签从生成的DOM中完全移除掉，并只留下有模板生成的标签。将replace设置为true可以达到这个效果。
   + 把创建的这些自定义元素称做指令(用.directive()方法创建)，因为事实上声明指令并不需要创建一个新的自定义元素。
   + 声明指令本质上是在HTML中通过元素，属性，类或注释来添加功能。
     - 合法格式： 
        - &lt;div my-directive></div>
        - &lt;div class="my-directive"></div> 
        - &lt;!--directive:my-directive-->
   + restrict属性表示angular在编译HTML时用哪种声明格式来匹配指令，可以指定一个或多个格式。
     - 元素(E),属性(A),类(C)或注释(M)  
     - 无论有多少中方式可以声明指令，推荐使用属性方式，因为它有比较好的跨浏览器兼容性。
````js
   <my-directive></my-directive>
    <script>
        angular.module("myApp", []).directive('myDirective', function () {
            return {
                restrict: 'A', //"EA"
                replace:true,
                template: '<a href="http://www.baidu.com">got0</a>',//指令模板，可以嵌套或替换

            }
        })
    </script>
````
  + 用表达式声明指令
    - 声明指令时即可以使用表达式，也可以不使用表达式
       - &lt;my-directive="someExpressin">&lt;/my-directive>
       - &lt;div my-directive="someExpressin">&lt;/div>
       - &lt;div class="my-directive:someExpressin">&lt;/div> 
       -  &lt;!--directive:my-directive someExpressin-->
  + 当前作用域
    - 由DOM通过内置指令ng-controller提供的作用域。这个指令的作用是在DOM中创建一个新的子作用域。
    - 注意，还有其它内置指令（比如ng-include和ng-view）也会创建新的子作用域，这意味着它们在被调用时行为和ng-controller类似。我们在构造自定义指令是也可以创建新的子作用域。
### 向指令中传递数据
- 在主HTML文档中，可以给指令添加myUrl和myLinkText两个属性，这两个属性会成为指令内部作用域的属性。
   - 有好几种途径可以设置指令内部作用域中属性的值。最简单的方法就是使用由所属控制器提供的已经存在的作用域。尽管简单，共享状态会导致很多其他问题。如果控制器被移除，或者控制器的作用域也定义了一个myUrl的属性，就要被迫修改代码。
   - angular允许通过创建新的子作用域或者隔离作用域来解决这个常见的问题。
   - 同之前在当前作用域中介绍的继承作用域（子作用域）不同，隔离作用域同当前DOM作用域是完全分隔开的。为了给这个新的对象设置属性，我们需要显示地通过属性传递数据，同在Javascript中给方法传递参数类似。
   - 用如下代码将指令地作用域设置成一个只包含它自己地属性地干净对象：
     - scope:{ someProperty:"needs to be set"} //行不通，不能在作用域对象内部直接设置someProperty属性。
     - 实际上创建的是隔离作用域。本质上，意味这指令有了一个属于自己的$scope对象这个对象只能在指令的方法中或者指令的模板字符串中使用。
     - 实际上要在DOM中项之前提到的那样，像给函数传递参数一样，通过属性来设置值：
        -&lt;div my-directive my-url="http://www.baidu.com" my-link-text="百度"></div>
     - 在作用域对象内部把someProperty值设置为@这个策略绑定。这个策略绑定告诉angular将DOM中some-property属性的值复制给新作用域对象中的someProperty属性。
        - scope:{someProperty:'@'}
     - 注意，默认情况下someProperty在DOM中的映射是some-property属性。如果我们想显示指定绑定的属性名，可以用如下方式：
        - sope{someProperty:'@someAttr'} //这个例子中，被绑定的属性名是some-attr而不是some-property  
     - 更进一步，还没有在DOM对应的作用域上运算表达式，并将结果传递给指令，在指令内部最终被绑定在属性上：
        - <div my-directive some-attr="{{'http://'+'www.baidu.com'}}"></div
   
````js
      <div my-directive my-url="http://www.baidu.com" my-link-text="百度"></div>
    <script>
        angular.module("myApp", []).directive('myDirective', function () {
            return {
                restrict: 'A',
                template: '<a href="{{myUrl}}">{{myLinkText}}</a>',
                replace:true,
                scope:{
                    myUrl:'@',
                    myLinkText:'@',
                }
            }
        })
    </script>
````    
- 在此之上，我们来看看如何创建一个文本输入域，并将输入值同指令隔离作用域的属性绑定起来：
   - 注意在输入标签上使用了内置指令ng-model。这个指令可以将输入的文本同$scope上的myUrl属性进行绑定。
      -  &lt;input type="text" ng-model="myUrl">&lt;div my-directive some-attr="{{myUrl}}" my-link-text="baidu"> </div>
      - 上面的代码是可以工作的，但是如果我们将文本输入字段移到指令内部并在另一个指令中进行绑定，就无法正常工作了：
      -  &lt;div my-directive some-attr="{{myUrl}}" my-link-text="baidu"> </div>
      - 本意上就是自定义指令声明了自己的独立作用域就和外部作用域隔离了 scope:{}, 
      - template:'&lt;div>&lt;input type="text" ng-model="myUrl">&lt;a href="{{myUrl}}">{{myLinkText}}</a>&lt;/div>'
      - 设置了 scope:{}后没有错误的将内部$scope属性myUrl同外部的DOM属性some-attr绑定在一起，值是通过对DOM属性进行复制被传递到隔离作用域中，难道不应该设置同名属性嘛？
      - 出现这个现象的原因是，内置指令ng-model在它自身内部的隔离作用域和DOM的作用域（由控制器提供）之间创建了一个双向数据绑定。
- 接下来在我们的隔离作用域和ng-model内部的隔离作用域之间创建一个双向数据绑定。将内部的$scope.myUrl属性同当前控制器作用域中的theirUrl属性进行绑定，在DOM中通过作用域查询来实现这个绑定。
     - 通过两个文本输入框可以方便的观察作用域是如何在Javascript中通过原型继承链接在一起的。  
     - 除了将原来的文本输入字段添加回主HTML文档外，唯一的修改使用=绑定策略代替了@。    
````js
<body ng-app="myApp">
    <label> Their URL filed:</label>
    <input type="text" ng-model="theirUrl">
    <div my-directive some-attr="theirUrl" my-link-text="baidu"> </div>

    <script>
    angular.module('myApp',[]).directive('myDirective',function(){
        return {
            restrice:'A',
            replace:true,
            scope:{
                myUrl:'=someAttr',//经过了修改。=和@符号区别在于：=是双向绑定  @符号是单向绑定
                //some-attr="theirUrl"  =拿到的是theirUrl这个对象所在的空间 @符号拿到的是theirUrl字符串
                //some-attr="{{theirUrl}}"  =拿到的是theirUrl这个对象所在的空间 @符号是单向绑定
                myLinkText:'@'
            },
            template:'<div><label> My URL filed:</label>'
            +'<input type="text" ng-model="myUrl">'
            +'<a href="{{myUrl}}">{{myLinkText}}</a></div>'
        }
    })
    
    </script>
````
## 内置指令
- 基础ng属性指令
   + ng-hreft
   + ng-src
   + ng-disabled
   + ng-checked
   + ng-readonly
   + ng-class
   + ng-style
- 布尔属性 
   + 当在angular中使用动态数据绑定时，不能简单的将这个属性值设置为true或false，因为根据标准（HTML标准）定义只有当这个属性不出现时，它的值才为false。因此angular提供了一组带有ng-前缀版本的布尔属性，通过运算表达式的值来决定在目标元素上是插入还是移除对应的属性。
   + ng-disabled可以把disabled属性绑定到以下表单输入字段上：
      - &lt;input>(text,checkbox,radio,number,url,email,submit)
      - &lt;texterea>
      - &lt;select>
      - &lt;button>
- 类布尔类型  
   + ng-href，ng-src等属性虽然不是标准的HTML布尔属性，但是由于行为相似，所以在angular源码内部和布尔属性同等对待的。
   + ng-href和ng-src都能有效帮助重构和避免错误，推荐改进代码使用。
   + ng-href：当用户点击一个由插值动态生成的链接时，如果插值尚未生效，将会跳转404，如果使用ng-href，angular会等插值生效后再执行点击链接的行为。
   + ng-src：angular会告诉浏览器再ng-src对应的表达式生效之前不要加载图像。
### 在指令中使用子作用域
- 下面将要介绍的指令会以父级作用域为原型生成子作用域。这种继承的机制可以创建一个隔离层，用来将需要协同工作的方法和数据模型对象放置在一起。
    + ng-app和ng-controller是特殊的指令，因为它们会修改嵌套在它们内部的指令的作用域。
    + ng-app为angular应用创建$rootScope，ng-controller则会以$rootScope或另一个ng-controlle的作用域为原型创建新的子作用域。
- ng-app
    + 任何具有ng-app属性的DOM元素将被标记为$rootScope的起始点。
    + $rootScope是作用域的起始点，任何嵌套在ng-app内的指令都会继承它。
    + 在Javascript代码中通过run方法来访问$rootScope
    + 不推荐实际生产中像使用全局作用域一样使用$rootScope。
    + 可以在整个文档中只使用移除ng-app。如果需要在一个页面放置多个angular应用，需要手动引导应用。
- ng-controller 
    + 内置指令ng-controller的作用是为嵌套在其中的指令创建一个子作用域，避免将所有操作和模型都定义在$rootScope上。用这个指令可以在一个DOM元素上放置控制器
    + ng-controller接受一个参数expression，这个参数是必须的。expression参数是一个angular表达式。  
    + 子$scope只是一个Javascript对象，其中含有从父级$scope中通过原型继承得到的方法和属性，包括应用$rootScope.
    + 嵌套在ng-controller中的指令有访问新子$scope的权限，但要牢记每个指令都应该遵守的和作用域相关的规则。
    + $scope对象的职责是承载DOM中指令所共享的操作和模型。
      - 操作指的是$scope上的标准Javascript方法。
      - 模型指的是$scope上保存的包含瞬间状态数据的Javascript对象。持久化状态的数据应该保存到服务中，服务的作用是处理模型的持久化。
    + 出于技术和框架方面的原因，绝对不要直接将控制器中的$scope赋值为值类型对象（字符串，布尔值或数字）。DOM中应该始终通过dian操作符来访问数据。遵守这个规范将是你远离不可预测的麻烦。
       - 控制器应该尽可以简单。虽然可以用控制器来组织所有功能，但是将业务逻辑移到服务和指令中是非常好的主意。
    + 当出现控制器的嵌套时，如果父控制器的中$scope的一个属性为值类型对象，那么由于原型继承的关系，修改子控制器$scope上的同一个属性，父控制器中的$scope属性不会改变。但如果显式的给$scope属性声明了数据类型为引用类型对象，子控制器和父控制器共用一个对象（原型继承），无论是在子控制器中还是父控制器中，修改其中的一个另一个也变化了，实现数据的同步。  
    + 注意，虽然这个特性是使用ng-controller是最重要的特性之一，但在使用任何创建子作用域的指令时，如果将指令定义中的scope属性设置为true，这个特性也会带来负面影响，下面内置指令都有同样的特性。
       - ng-include
       - ng-switch
       - ng-repeat
       - ng-view
       - ng-controller
       - ng-if 
- ng-include
    + 使用ng-include可以加载，编译并包含外部HTML片段到当前应用中，模板的url被限制在与应用文档相同的域和协议下，可以通过白名单或包装成被信任的值来突破限制。更进一步，需要考虑跨域资源共享和同源规则来确保模板可以在任何浏览器中正常加载。例如，所有浏览器都不能进行跨域的请求，部分浏览器也不能服务file://协议的资源。
       - 在开发中，可以通过命令命令行chrome --allow-file-access-from-files来禁止CORS错误。只有在紧急情况下使用这个方法，比如你的老板正站在你身后，并且所有事情都无法正常工作。
       - 在同一元素上添加onload属性可以在模板加载完成后执行一个表达式。
       - 要记住，使用ng-include时angular会自动创建一个子作用域。如果你想使用某个特定的作用域，例如controller的作用域，不会像往常一样从尾部作用域继承并创建一个新的子作用域。
       - 注意：引入文件要包裹一对单引号 <div ng-include="'myFile.htm'"></div>
- ng-switch
  + 这个指令和ng-switch-when（加子元素上）及on='propertyName'（加父元素上）一起使用，可以在properName发生变化时渲染不同指令到视图中。 
  + 注意，在switch被调用之前用ng-switch-default来输出默认值
- ng-view
  + ng-view指令用来设置将被路由管理和放置HTML中的视图的位置。
- ng-if
  + 使用ng-if指令可以完全根据表达式的值在DOM中生成或移除一个值。
  + ng-if和ng-show指令最大的区别是，它不是通过css显式隐藏DOM节点，而是真正生成或移除节点。
  + 当一个元素被ng-if从DOM中移除，同它关联的作用域也被销毁。而且当它从新加入DOM中时，会通过原型继承从它的父作用域生成一个新的作用域。
  + 同时有一个重要的细节需要知道，ngif重新创建元素时用的时它们编译后的状态。如果ng-if内部代码加载之后被jquery修改过（例如用.addClass），那么当ng-if的表达式为false时，这个DOM元素被移除，表达式再次为true时这个元素及其内部的子元素会被重新插入DOM，此时这些元素的状态会是它们的原始状态，而不是它们上次被移除时的状态。也就是说无论用jquery的.addClass添加了什么类都不会存在了。
- ng-repeat
  + ng-repeat用来遍历一个集合或为集合的每个元素生成一个模板实例。集合中的每个元素都会被赋予自己的模板和作用域。同时每个模板实例的作用域中都会暴露一些特殊的属性。
- ng-init
  + ng-init指令用来在指令被调用时设置内部作用域的初始状态。一般做小demo使用。
- {{}}
  + {{}}语法时angular内置的模板语法，它会在内部$scoep和视图之间创建绑定。基于这个绑定，只要$scope发生变化，视图就会随之自动更新。
  + 实际上它也是指令，虽然看起来不像，它是ng-bind的简略模式，用这种模式不需要创建新的元素，以此它常被用在行内文本中。
  + 注意，在屏幕可视区使用{{}}会导致页面加载时未渲染的元素发生闪烁，用ng-bind可以避免这个问题。
- ng-bind
  + HTML加载含有{{}}语法的元素后并不会立即渲染它们，导致未渲染内容闪烁（Flash of   Unrendered Content,  FOUC）。可以用ng-bind将内容和元素绑定在一起避免FOUC。内容会被当在子文本节点渲染到含有ng-bind指令的元素内。 
- ng-cloak
  + 除了使用ng-bind来避免未渲染元素闪烁，还可以在包含{{}}的元素上使用ng-cloak指令
  + ng-cloak指令会将元素内部隐藏，直到路由调用对应的页面才显式出来。
- ng-bind-template
  + 同ng-bind类似，ng-bind-template用来在视图中绑定多个表达式。
- ng-model
  + ng-model指令用来将input，select，text，area或者自定义表单控件同包含它们的作用域中的属性进行绑定。它可以提供并处理表单的验证功能，在元素上设置相关的css类（ng-valid，ng-invalid等），并负责在父表单中注册控件。
  + 它将当前作用域中运算表达式的值同给定的元素进行绑定。如果属性并不存在，它会隐式创建并将其添加到当前作用域中。
  + 我们使用ngmodel来绑定$scope上一个数据模型内的属性，而不是$scope上的属性，这样可以避免在作用域或后代作用域中发生属性覆盖。
- ng-show/ng-hide
  + ng-show和ng-hide根据所给表达式的值来显式或隐藏HTML元素。当赋值给ng-show指令的值为false时元素会被隐藏。类似的，当赋值给ng-hide指令的值为true时元素也会被隐藏。
  + 元素的显式或者隐藏是通过移除或添加ng-hide这个css类来实现的。ng-hide类被预先定义在了angular的常熟市文件中，并且它的display属性的值为none（用了!important标记）.
- ng-change
  + 这个指令会在表单输入发生变化时计算给定表达式的值。因为要处理表单输入，这个指令要和ngmodel联合使用。ngmodel中的值改变，则调用ng-change="fn()"中的函数。  
- ng-form
  + ng-form用来在一个表单内部嵌套另一个表单。普通的HTML<form>标签不允许嵌套，但是ng-form可以。
  + 这意味着内部所有的子表单合法时，外部的表单才合法。这对于用ng-reapeat动态创建的表单是非常有用的。
  + 由于不能通过字符串插值来给输入元素动态生成name属性，所以需要将ng-form指令内每组重复的输入字段都包含在一个外部表单元素内。
  + 下面css类会根据表单的验证状态自动设置：
     - 表单合法时设置ng-valid
     - 表单不合法时设置ng-invalid
     - 表单未进行修改时设置ng-pristion
     - 表单进行过修改时设置ng-dirty
  + angular不会将表单提交到服务器，除非它指定了action属性。要指定提交表单时调用哪个Javascript方法，使用下面两个指令中的一个。
    - ng-submit：在表单元素上使用。
    - ng-click：在第一个按钮或submit类型（input[type=submit]）的输入字段上使用。
    - 为了避免处理程序被多次调用，只能用上面两个指令中的一个。
````js
  <style>
        input.ng-invalid {
            border: 1px solid red;
        }

        input.ng-valid {
            border: 1px solid green;
        }
    </style>


 <body ng-app="myApp">
    <form name="signup_form" ng-controller="FormController" ng-submit="submitForm()" novalidate>
        <div ng-repeat="field in fields" ng-form="signup_form_input">
            <input type="text" name="dynamic_input" ng-required="field.isRequired" ng-model="file.name" placeholder="{{field.placeholder}}"
            />
            <div ng-show="signup_form_input.dynamic_input.$dirty&&signup_form_input.dynamic_input.$invalid">
                <span class="error" ng-show="signup_form_input.dynamic_input.$error.required">The fidld is required</span>
            </div>
        </div>
        <button type="submit" ng-disabled="signup_form.$invalid">Submit All</button>
    </form>
    <script src="js/angular.js"></script>
    <script>
        angular.module("myApp", []).controller("FormController", ["$scope", function ($scope) {
            $scope.fields = [
                { placeholder: "Username", isRequired: true },
                { placeholder: "Password", isRequired: true },
                { placeholder: "Email(optional)", isRequired: false },
            ];
            $scope.submitForm = function () {
                alert("it works!");
            }
        }])
    </script>
</body>

`````  

- ng-click
  + ng-click用来指定一个元素被点击时调用的方法或表达式
- ng-select
  + ng-select用来将数据同HTML的select元素进行绑定。这个指令可以和ng-model以及ng-options指令一同使用，构建精细且表现优良的动态表单。
  + ng-options的值可以时一个内涵表达式，其实中只是一个有趣的说法，简单来说就是它可以接受一个数组或对象，并对它们进行循环，将内部的内容提供给select标签内部的选项。它可以时下面两中形式。
    - 数组作为数据源
       + 用数组中的值做表；
       + 用数组中的值作为选中的标签；
       + 用数组中的值做标签组。
       + 用数组中的值作为选中的标签组。
    - 对象作为数据源
       + 用对象的键-值（key-value）做标签；
       + 用对象的键-值作为选中的标签
       + 用对象的键-值作为标签组
       + 用对象的键-值作为选中标签组  
       + for遍历子标签的内容 as遍历子标签的值 
- ng-sumbit
  + ng-submit用来将表达式同onsubmit事件进行绑定。这个指令同时会阻止默认行为（发送请求并重新加载页面），除非表单不含有action属性。
- ng-class
  + 使用ng-class动态设置元素的类，方法是绑定一个代表所有需要添加类的表达式。重复的类不会添加。当表达式发生变化，先前添加的类会被移除，新类会被添加。
- ng-attr-(suffix)
  + 当angular编译DOM时会查找花括号{{some expression}} 内的表达式。这些表达式会被自动注册到$watch服务中并更新到$digest循环中，成为它的一部分。
  + 有时浏览器会对属性进行很苛刻的限制。SVG就是一个例子
     - &lt;svg>&lt;circle cx="{{cx}}">&lt;/circle>&lt;svg>
  + 运行上面的代码会抛出一个错误，指出我们有一个非法属性。可以用ng-attr-cx来解决这个问题。注意，cx位于这个名称的尾部。在这个属性中，通过{{}}来写表达式，达到前面提到的目的。   
     - &lt;svg>&lt;circle ng-attr-cx="{{cx}}">&lt;/circle>&lt;svg>
     - 纬度和经度值转换为浮点数,这个cx属性必须是浮点数：23.993938

## 指令详解
### 指令定义
- 对于指令，可以把它简单的理解成在特定DOM元素上运行的函数，指令可以扩展这个元素的功能。
- directive()函数创建指令
  + name（字符串）指令的名称，用来在视图中引用特定的指令。
  + factory_function（函数）这个函数返回一个对象。$compile服务利用这个方法返回的对象，在DOM调用指令是来构造指令的行为。
     - 也可以返回一个函数代替对象，这个函数通常被称做链接传递函数，利用它我们可以定义指令的链接（link）功能。
   + 当angular启动引用时，它会把第一个参数当成一个字符串，并以此字符串为名来注册第二个参数返回的对象。angular编译器会解析主HTML的DOM中的元素，属性，注释和css类名中使用了这个名字的地方，并在这些地方引用对应的指令。当它找到某个已知的指令时，就会在页面中插入指令对应的DOM元素。
      - 为避免和HTML标准冲突，自定义属性最好加一个前缀。
    + 指令的工厂函数只会在编译器第一次匹配到这个指令时调用一次。和controller函数类似，通过$injetor.invoke来调用指令的函数工厂。
    + 当angular在DOM中遇到具名指令时，会去匹配已经注册过的指令，并通过名字在注册对象中查找。此时，就开始了一个指令的生命周期，指令的生命周期开始于$compile方法并结束于link方法。
+ restrice（字符串）
  - restrice是可选参数，它告诉angular这个指令在DOM中可以何种形式被声明。 

+ priority:number 优先级
  - 优先级参数可以被设置为一个数值。大多数指令会忽略这个参数，使用默认值0，但也有些场景设置高优先级是非常重要甚至是必须的。例如ngRepeat将这个参数设置为1000，这样就可以保证在同一元素上，它总是在其他指令之前被调用。
  - 如果一个元素上具有两个优先级相同的指令，声明在前面的那个会被优先调用。
  - ngRepeat是所有内置属性中优先级最高的，它总是在其他指令之前运行。这样设置主要考虑性能。
+ terminal（布尔型）
  - terminal是一个布尔型参数，可以被设置为true或false。
  - 这个参数用来告诉angular停止运行当前元素上比本指令优先级底的指令。但同当前指令优先级相同的指令还是会被执行。
  -如果元素上某个指令设置了terminal参数并具有较高的优先级，就不要再用其他底优先级的指令对其进行修饰了，因为不会调用。
  - 使用了terminal参数的例子是ngview和ngif。ngif优先级略高于ngview，如果ngif的表达式为true，ngview就可以被正常执行，但如果ngif表达式的值为false，由于ngview的优先级底就不会执行。
+ template 参数可以是模板，也可以是一个返回模板的函数。   
+ templateUrl 参数可以是一个链接，一个script模板ID，也可以是一个返回外部HTML文件路径的字符串。
### 指令作用域
- $rootScope这个特殊对象会在DOM中声明ng-app时被创建。
     + DOM每个指令调用时都可能会
        - 直接调用相同的作用域对象
        - 从当前作用域对象继承一个新的作用域对象。
        - 创建一个同当前作用域相隔离的作用域对象。

- $scope参数（布尔型或对象）
  - $scope参数为true时和ng-controller一样，都是从父级作用域继承并创建一个新的子作用域。
- 隔离作用域
  - 具有隔离作用域的指令最主要的使用场景是创建可复用的组件，组件可以在未知上下文中使用，并且可以避免污染所处的外部作用域或不经意的污染内部作用域。- 创建具有隔离作用域的指令需要将scope属性设置为一个{}对象。如果这样做了，指令的模板就无法访问外部作用域了。 

 - 绑定策略   

         
  



     




































            



       
         


