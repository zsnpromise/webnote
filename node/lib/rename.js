const path=require('path');
const fs=require('fs');

const ext='.'+process.argv[2];
const now='.'+process.argv[3];



const filePath=fs.readdirSync(process.cwd());
const fileArr= filePath.filter(item=>{
     return path.extname(item)===ext&&fs.statSync(path.join(process.cwd(),item)).isFile()
 })
 fileArr.forEach(item=>{
  
     fs.rename(path.join(process.cwd(),item),path.join(process.cwd(),item).replace(ext,now),()=>{});
 })   
console.log(fileArr);
// cls 清屏 