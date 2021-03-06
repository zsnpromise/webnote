## node简介
+ 为什么叫Node
   - Node本质上是一个可以构建网络应用的基础框架，可以在它的基础上构建更多的东西，诸如服务器，客户端，命令行工具等。Node发展为一个强制不共享任何资源的单线程，单进程系统，包含十分适宜网络的库，为构建大型分布式应用程序提供基础设施，其目标也是成为一个构建快速，可伸缩的网络应用平台。它自身非常简单通过通信协议来组织许多Node，非常容易通过扩展来达成构建大型网络应用的目的。每一个Node进程都构成这个网络应用中的一个节点，这是它名字所含意义的真谛。
+ 单线程
   - 在Node中，JavaScript与其余线程是无法共享任何状态的。单线程的最大好处是不用像多线程编程那样处处在意状态的同步问题，这里没有死锁的存在，也没有线程上下文切换所带来的性能上的开销。
   + 弱点
     - 无法利用多核cpu
     - 错误会引起整个程序退出，应用的健壮性值得考验。
     - 大量计算占用CPU导致无法继续调用异步I/O。
   - Node中可以采用与Web Workers 相同的思路来解决大计算量的问题：child_process(子进程)
+ Node应用场景
   - I/O密集的优势主要在于Node利用事件循环的处理能力，而不是启动每一个线程为每一个请求服务，资源占用少。
   - V8的深度性能优化决定了Node在处理CPU密集型业务上的高效。主要的原因是Node的单线程，如果长时间的运算会导致CPU时间片不能释放，使得后续I/O无法发起。可适当把大型任务分解。
   + Node虽然没有提供多线程用于计算，但还是有两个方式充分利用CPU
      - Node可以通过编写c/c++扩展的方式更高效地利用CPU，将V8不能做到地性能极致的地方通过c/c++实现。
      - 如果单线程的Node不能满足需求，甚至用了c/c++扩展还觉得不够，可以通过子进程的方式，将一部分Node进程当做常驻服务进程用于计算，然后利用进程间的消息来传递结果，将计算与I/O分离，这样还能充分利用多CPU。
### 模块机制
- 工具(浏览器兼容)=》组件(功能模块)=》框架(功能模块组织)=》应用(业务模块组织)  
+ 在Node中引入模块，需要经历如下3个步骤
  - 路径分析
  - 文件定位
  - 编译执行
  - 在Node中，模块分为两类：Node提供的模块为核心模块，用户编写的模块称为文件模块。
+ 优先加载缓存
  - 浏览器缓存的是文件，Node缓存的是模块编译执行后的对象  
  - 核心模块的缓存检查优先于文件模块。
+ 路径分析和文件定位
  - 核心模块的优先级仅次于缓存加载 ，它在node的源代码编译过程中已经编译为二进制代码，其加载过程最快。
  - 路径形式的文件模块以.,..和/开始都被当成文件模块处理，require方法把路径转化为真是路径，以真实路径为索引，将编译执行的结果哦放在缓存中。
  - 自定义模块是一种它是的文件模块，可能是一个文件或者包的形式。这类模块查找最费事。
     + module.paths：模块的路径生成规则和原型链类型，从当前文件一级级向上生成对应的node_modules文件夹。查找时一级一级向上查找。
     + 不传文件扩展名的情况下，Node会.js.node.json的次序补足扩展名，依次尝试，推荐.node.json后缀文件加后缀名
  - 目录分析和包
     + require在分析扩展名后，可能没有找到对应文件，但却得到一个目录，这在引入自定义模块和逐个模块路径进行查找时经常会出现，此时node会将目录当做一个包处理。
     + 在逐个过程中，Node对CommonJS包规范进行了一定程度的支持。首先，Node在当前目录下查找package.json(CommonJS包规范定义的包描述文件)，通过JSON.parse()解析出包描述对象，从中取main属性指定的文件名进行定位。如果文件名缺乏扩展名，将会进入扩展名分析的步骤。如果main属性指定文件名错误或压根没有package.json文件，Node会将index当做默认文件名，然后依次查找index.js,index.node,index.json.
     - 如果没有找到，则自定义模块进入下一个模块路径进行查找，直到模块路径数组被遍历完，还没有找到则报错。



     