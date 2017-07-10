# RequireJS + fis3 开发及部署流程 v1.2.1
### 安装：npm install TopuNet-RequireJS

文件结构：
-------------
1. /dist/inc/require.js 放入项目文件夹inc中
2. /dist/widget/*.js 放入项目文件夹widget中
3. 页面配套js（一个页面文件最好有一个配套的js文件入口模块）和 UserControl.js 放入/widget/app/中
4. 第三方类库（如jquery、zepto以及公司内部开发的功能性插件等）放入/widget/lib/中
5. 小型功能模块（如window_resize、goto_top等）放入/widget/modules/中
6. /dist/fis-conf.js 放入项目文件夹根目录。可根据项目需要进行修改。

开发流程：
-------------

1. 页面底端引用：

		<script data-main="/widget/main.js" src="/inc/require.js" id="script_page" page="index"></script>

		其中，page值需要修改为配套js（/widget/app/）的文件名称，最好和页面名称一致。
		除page外，其他值不用修改。
		data-main中的值“/widget/main.js”为js入口页。


2. 修改/widget/main.js：
    
	    requirejs.config({
	        // 配置文件，具体见官方文档：http://www.requirejs.cn/docs/api.html
	        // 非AMD规范文件 或 CDN引用文件 可在此配置shim
	    });

    	// 以下内容不必修改
    	require(["app"]);

3. 修改/widget/app.js：

	    // 每个页面都要用到的模块在此设置依赖——因为所有页面的入口均为此文件
	    // 然后，根据page的名称引入不同的模块，执行init() 方法。

	    define(["app/UserControl", "lib/jquery.min"], function() {
	        var page_name = $("#script_page").attr("page");
	        switch (page_name) {
	            case "index":
	                require(["app/index"], function($obj) {
	                    $obj.init();
	                });
	                break;
	            case "contact":
	                require(["app/contact"], function($obj) {
	                    $obj.init();
	                });
	                break;
	        };
	    });

4. 各文件写法稍有不同，可参见demo，此处略。

5. 开发过程中，本地可以直接测试。

6. 开发完成后，上线前：

		1) 新安装或更新的fis3需要进行处理：[传送门————对fis3/lib/compile.js进行修改，满足日常工作项目中的发布要求](https://github.com/TopuNet/fis3.compile.js)

		2) node.js cmd 进入项目根目录 执行：node widget/r.js -o widget/build.js
		此命令可从/widget/app.js 开始，将所有引用到的模块打包合并
		build.js 为打包配置文件，具体可参考：https://github.com/requirejs/r.js/blob/master/build/example.build.js
		执行完成后，将会生成打包文件：/widget/aio.js

    	3) 执行：fis3 release [test|pub] [-c] -d ../output
        release后，/widget/中只有一个文件，aio_hash.js。

        * test|pub为media可选项，区别如下：
        	** 无media时：不对js、css、html进行混淆压缩；不对资源定位加域名前缀。
        	** test时：js、png、css、html进行混淆压缩————插件级（目前js混淆压缩的插件uglify-js和png压缩的插件png-compressor使用时有一些问题，尚待解决，暂取消）
        	** pub时：test基础上，对资源定位加域名前缀。域名值在fis-conf.js中修改
        * 最佳体验：
        	** 开发完成，进行fis测试，使用test release
        	** 如有问题需要查看代码时，不使用media release
        	** fis测试完成，使用pub release，发布上线

        * -c 为可选项，代表清除缓存。首次release 和 切换项目时 推荐使用。

7. node端注意：
		
		因为：
			1) /app.js内含有maxAge的设置，且在服务器端和本地端分别使用了两个值。
			2) node端程序上传时，需要删除/app.js 重上传操作。
		所以：
			fis忽略掉/app.js，首次fis release时，需要将/app.js手动copy到release文件夹，并对maxAge进行修改。
			之后/app.js如有修改，也需手动copy，并再次修改maxAge。

更新日志：
-------------
v1.2.1

	1. 修改/fis-conf.js。
		* 增加media：test，具体说明见 开发流程.6
		* 增加忽略项 server.log（fis server生成文件）和/app.js（具体说明见 开发流程.7）
		* 暂取消js的混淆压缩插件 和 png压缩插件，待寻求替代方案
	2. 移除fis3的/lib/compile.js，增加该文件的github传送门，具体说明见 开发流程.6

v1.1.5

    1. 修改fis3的/lib/compile.js模块。之前在release时会有很多warning，可能是fis有更新造成的，在最新的fis的compile.js模板的基础上重新做了修改。
    
v1.1.4

    1. 修改fis3的/lib/compile.js模块。之前对qll-bg的定位有问题
    
v1.1.3

    1. 通过jshint验证
    
v1.1.2

    1. 修改fis-conf.js
    	pub时，为inc/*.js增加domain
    
v1.1.1

    1. 修改fis-conf.js
    	1) 不再将/inc目录release到/static中
    	2) 不再release /widget/main.js

    2. 修改/widget/build.js，r.js打包的起始文件设为/widget/main.js
    3. 删除/widget/fis__inline.js文件
    4. 修改fis3的/lib/compile.js模块，可定位 qll-bg、qll-img、<script data-main> 中的资源
    	release后不需要进行任何文件代码修改，即可上传使用

v1.0.5

    1. 修改fis-conf.js

v1.0.3

    1. 在dist文件夹中，增加package.json
    2. 将dist发布到npm：TopuNet-RequireJS

v1.0.2

    解决之前版本的入口文件main.js的缓存问题：

    		1) 后端渲染页面时，需要给data-main增加地址栏参数。如：
    		<script data-main="/widget/main.js?v=0714" src="/inc/require.js" id="script_page" page="index"></script>

    		2) 0714可在后端做全局变量，方便全局修改。
    		如demo中，在 /handle/config中定义全局变量js_version，然后在app.js中将/handle/config.js_version赋值给app.locals.js_version，供视图使用。

v1.0.1

    1. 立项并完成整体流程，demo中只有“首页”和“联系我们”可以看。
    2. 因为最后要用fis3构建打包上线，所以解决的难点集中在 模块化文件打包、加hash码 的过程中。最后的解决方案也是剑走偏锋，利用了fis3的内容签入功能，在不改变开发环境测试流程 和 上线release后不修改data-main入口的情况下，最小功耗的解决问题。
    3. 过程中，也尝试了fis3-hook-amd插件打包，不是很理想。因为项目是node的，后端代码也会受影响。
