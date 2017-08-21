
const fs=require('fs');
const path=require('path');
const iconv=require('iconv-lite');

const msname=process.argv[2];
// console.dir(iconv)
// console.log(process.mainModule)

const musicstr=iconv.decode(fs.readFileSync(path.join(process.cwd(),msname)),'gbk');

const msArr=musicstr.split('\n');
msArr.forEach((item)=>{
   let strArr=/\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/.exec(item);
   
   if(strArr)
    {
        setTimeout(function() {
           console.log(strArr[4])
       }, parseInt(strArr[1])*60*1000+parseInt(strArr[2])*1000+parseInt(strArr[3]));
    }else{
        console.log(item);
    }
//    console.log(strArr);
})
// console.log(msArr);