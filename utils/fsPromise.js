let fs = require('fs');
let path = require('path');

//存储的是执行模块所在的绝对路径（不等于_dirname）
let dirname = path.resolve();

//=>需要用Promise封装的fs方法
// mkdir  2个参数  无result
// rmdir   2个参数  无result
// readdir 2个参数  有result
// readFile 3个参数 有result
// writeFile 4个参数 无result
// appendFile 4个参数 无result
// copyFile 3个参数 无result

//=> mkdir && rmdir && readdir && readFile && copyFile
//04
//基于03修改：copyFile需要处理第二个路径参数
['mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile','unlink'].forEach(item => {
    exports[item] = function (pathname, copypath = '') {
        pathname = path.resolve(dirname, pathname);
        copypath = path.resolve(dirname, copypath);
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');//如果存在result就传递result；如果不存在，result是undefined，则传递”或运算符“后面的空字符串。
            }];
            item === 'readFile' ? arg.unshift('utf-8') : null;
            item === 'copyFile' ? arg.unshift(copypath) : null;
            fs[item](pathname, ...arg);
        });
    };
});


//05
//=>writeFile && appendFile
['writeFile', 'appendFile'].forEach(item => {
    exports[item] = function (pathname, content) {
        pathname = path.resolve(dirname, pathname);
        if (typeof content!=='string'){
            //写入的内容我们规定必须是字符串才可以
            content=JSON.stringify(content);
        }
        return new Promise((resolve, reject) => {
            fs[item](pathname, content,'utf-8',(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');//如果存在result就传递result；如果不存在，result是undefined，则传递”或运算符“后面的空字符串。
            });
        });
    };
});

