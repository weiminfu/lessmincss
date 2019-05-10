//=>需要把config放到当前项目的根目录中
let path=require('path');
let rootPath=path.resolve();
module.exports={
    //=>需要编译的less文件
    entry:[
        `${rootPath}/less/index.less`,
        `${rootPath}/less/detail.less`
    ],
    //=>编译完成导出的css文件
    output:[
        `${rootPath}/css/index.min.css`,
        `${rootPath}/css/detail.min.css`
    ]
};