const path = require('path');
const fs = require('fs');


const obj={};
let num=0;
let tre='';
function filedg(pathstr,obj,wid) {
    
    const files = fs.readdirSync(pathstr);
   wid+=1;
    files.forEach(item => {
       
        if (fs.statSync(path.join(pathstr,item)).isFile()) {
            let len=fs.readFileSync(path.join(pathstr,item),'utf8').split('\n').length;
            obj[item] =len>0?len-1:0;
            num+=len;
        } else {

            obj[item]={};
            let r='';
            for(let i=wid;i--;){
             r+='   ';
            }
            tre+=r+'|'+'\n'+r+'---'+item+'\n'
            
            filedg(path.join(pathstr,item),obj[item],wid); 
        //    console.log(wid,r);

        }
    }) 
   
}
filedg(process.cwd(),obj,0);
console.log(obj,num);
console.log(tre);

