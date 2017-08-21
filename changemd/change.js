const fs = require('fs');
const path = require('path');
const mark = require('marked');

const filepath = process.argv[2];
const css = fs.readFileSync(path.join(__dirname, './github.css'), 'utf8')
let mdpath = path.resolve(process.cwd(), filepath)
fs.readFile(mdpath, 'utf8', (err, data) => {
  const arr=data.match(/<title>([\u4e00-\u9fa5a-zA-Z0-9]{0,20})<\/title>/);
  const title=arr?arr[1]:"note";
  const mk= mark(data.replace(/<title>([\u4e00-\u9fa5a-zA-Z0-9]{0,20})<\/title>/,""),'gbk');
  // console.log(mk);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
    <style>
    markdown-body {
      padding:20px;
    }
    ${css}</style>
</head>
<body>
<section class='markdown-body'>
 ${mk}
 </section>
</body>
</html>`

  fs.writeFile(mdpath.replace('.md', '.html'), html, (err) => {

  })
})