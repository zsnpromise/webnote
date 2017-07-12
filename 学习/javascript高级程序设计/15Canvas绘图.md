## html5元素Canvas
- Canvas本质上是一块画布，通过js动态绘制图像。
  + 可以绘制简单的2D图像。
  + 使用WebGL绘制3D图像。

- 基本用法
  + Canvas是双标签，标签中的文本内容是在浏览器不支持该标签是出现的，一定要在标签上设置宽高;
  + 取得绘图上下文对象的的引用：元素.getContent("2d"),获取2D上下文,在使用前要判断浏览器是否支持getContent;
  + toDataURL()方法可以导出画布中的图片，只有一个参数，即图片的MIME（默认png）类型格式。但是如果绘制到画布上的图像来自不同的域，该方法会抛异常。
```js
 var drawimg=document.querySelector(".drawing");
  if(drawimg.getContext)
    {   
           //var context=drawimg.getContext("2d");
           var imgURI=drawimg.toDataURL("image/png");
           var image=document.createElement("img");
           image.src=imgURI;
           document.body.appendChild(image);
    }
```
 ### 2D上下文
 - 2D上下文可以简单绘制2D图像，比如矩,弧形和路径。原点左边为画布左上角，x向右为正，y向下为正。
   + 填充（context.fillStyle="颜色"）和描边（context.strokeStyle="颜色"）,所有涉及到描边和填充的操作都使用这两个样式，直到被重置。
   + 填充矩形：context.fillRect();描边矩形：context.strokeRect();透明矩形（用来删除某一块图型）:context.clearRect();四个参数(不带用单位)，单位都为像素：x轴，y轴，宽度，高度;
   + 描边线条宽度context.lineWidth="10";lineCap控制线条末端是平头，圆头还是方头（"butt","round"或"square"）;lineJoin属性控制线条相交是圆交，斜交，还是斜接（'round','bevel'或'miter'）。
   + 注意：一定要先设置描述，一旦设置了画图方式，后面的描述就不会在影响当前图片了。
   ```js
       var context=drawimg.getContext("2d");
       context.lineCap="round";
       context.strokeStyle="green";
       context.strokeRect(11,111,51,1);

   ```
- 绘制路径
  + 要绘制路径，首先要调用beginPath()方法。表示要开始绘制新路径。
 
  + arc(x,y,radius,startAngle,endAngle,counterclockwise):以（x,y）为原型绘制一条弧线，弧线半径为radius，起始和结束角度分别为startAngle和endAngle。最后一个参数表示startAngle和endAngle是否按照逆时针方向计算，值为false表示按照顺时针方向计算。
  + arcTo(x1,y1,x2,y2,radius):从上一点开始绘制一条曲线，到(x,y)为止，并且以给定的半径radius穿过(x1,y1).
  + bezierCurveTo(c1x,c1y,c2x,c2y,x,y):从上一点开始绘制一条曲线，到（x,y）为止，并且以(c1x,c1y)和(c2x,c2y)为控制点。
  + lineTo(x,y):从上一点开始绘制一条直线，到(x,y)为止。
  + moveTo(x,y):将绘图游标移动到(x,y),不画线。
  + quadraticCurveTo(cx,cy,x,y):从上一点开始绘制一条二次曲线，到(x,y)为止，并且以(cx,xy)作为控制点。
  + rect(x,y,width,height):从点(x,y)开始绘制一个矩形，宽度和高度分别由width和height指定。这个方法绘制的是矩形路径，而不是strokeRect()和fillRect()所绘制的独立的形状。

   + 创建完路径后，如果像绘制一条连接到路径起点的线条，可以调用closePath()。如果路径已经完成，可以用fillStyle填充，可以调用fill()方法。另外，stroke()方法对路径描边，描边使用strokeStyle。最后还可以调用clip(),这个方法可以在路径上创建一个截取区域。
   + 不带数字的钟表盘
     ```js
       var drawing=document.querySelector("canvas");
          //      确定浏览器支持<canvas>元素
      if(drawing.getContext)
      {
          var context=drawing.getContext("2d");
          //          开始路径
          context.beginPath();
        //          绘制外圆
          context.arc(100,100,99,0,2*Math.PI,false);
        //          绘制内圆
          context.moveTo(194,100);
          context.arc(100,100,94,0,2*Math.PI,false);
       //          绘制分针
          context.moveTo(100,100);
          context.lineTo(100,15);
      //          绘制时针
          context.moveTo(100,100);
          context.lineTo(35,100);
      //          描边路径
          context.stroke();
      }      


     ```
  + isPointInPath(x,y)判断路径被关闭之前画布上的某一个点是否位于路径上。







