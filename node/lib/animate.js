const fs=require('fs');
const path=require('path');
const clear=require('clear');
const filename=process.argv[2];


const filearr=fs.readdirSync(path.join(process.cwd(),filename));

const arr=[];
filearr.forEach(item=>{
    fs.readFile(path.join(path.join(process.cwd(),filename),item),'utf8',(err,data,t)=>{
         if(!err){
             //arr.push(txt);
             arr[item.replace('.txt','')-1]=data;
            
         }
         if(arr.length==filearr.length){
             let num=0;
             setInterval(()=>{
                   clear();
                    console.log(arr[num++%6])
             },100)
              //console.log(arr)
         }   
    })
})