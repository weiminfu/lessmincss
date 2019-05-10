//=== 这是主入口文件 ===

/*
*   痛点：基于lessc -X 命令，每次只能编译一个less文件
*
*   需求：批量编译less文件
*
*   设计解决思路：
*
*       1.准备一个编译的配置清单，在清单中填写需要编译的less文件路径与目标路径
*
*       2.导入自己基于promise封装的fsPromise.js文件操作库和less.config.js配置清单
*
*       3.封装一个批量编译less文件为min.css文件的方法，导出，供其他JS模块调用
*
*       注意：
*
*               此方法只能简单编译不带@import内容的less文件
*
* */
//第三方模块导入
let lessc = require('less');

//自定义模块导入
let {readFile, writeFile} = require('./utils/fsPromise');
let {entry,output}=require('./less.config');

module.exports={
  render(){
      //循环读取entry中对应的要编译的less文件中的less代码
      entry.forEach((item,index)=>{
          readFile(item).then(result=>{
              // console.log(result);//less代码

              //把读取到的less代码进行编译
              lessc.render(result,{compress:true},(err,result)=>{
                  //console.log(result);//{ css: '.index{color:red}', imports: [] }

                  if (err) {
                      console.log(err);
                      return;
                  }
                  let {css}=result;
                  writeFile(output[index],css)
              });
          });
      });
  }
};


