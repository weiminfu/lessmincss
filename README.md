lessmincss模块使用说明书：

功能：将less文件批量自动编译为压缩的min.css文件

1、从npm上下载安装“lessmincss”模块：

执行安装命令 npm install lessmincss

2、在需要调用lessmincss”模块的JS模块同级目录下，分别创建名为“less”、“css”的两个空文件夹。

3、把需要编译的less样式文件放入创建好的空“less”文件夹。

4、修改”less.config.js“配置文件中 entry 和 output 属性值：entry的属性值是要编译的less文件夹中的less文件；output 的属性值是编译后对应输出的min.css文件。



