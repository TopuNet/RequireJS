# RequireJS 开发及部署试验 v1.1.3
###安装：npm install TopuNet-RequireJS

文件结构：
-------------
1. /dist/inc/require.js 放入项目文件夹inc中
2. /dist/widget/*.js 放入项目文件夹widget中
3. 页面配套js（一个页面文件最好有一个配套的js文件入口模块）和 UserControl.js 放入/widget/app/中
4. 第三方类库（如jquery、zepto以及公司内部开发的功能性插件等）放入/widget/lib/中
5. 小型功能模块（如window_resize、goto_top等）放入/widget/modules/中
6. /dist/fis-conf.js 放入项目文件夹根目录，覆盖之前版本
7. /dist/compile.js 放入全局的fis3模块的lib中，覆盖原先文件。
	如：C:\Users\Administrator\AppData\Roaming\npm\node_modules\fis3\lib
	在node.js中运行fis3 -v，可以显示安装目录

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

		1) node.js cmd 进入/widget/ 执行：node r.js -o build.js
		此命令可从/widget/app.js 开始，将所有引用到的模块打包合并
		build.js 为打包配置文件，具体可参考：https://github.com/requirejs/r.js/blob/master/build/example.build.js
		执行完成后，将会生成打包文件：/widget/aio.js

    	2) 返回到根目录执行：fis3 release [pub] -c -d ../output
        pub为可选项，本地release测试不要pub，本地测试完成、上线前release需要。
        区别为静态资源是否带域名前缀（利于优化和便于CDN）和是否对js和css文件进行压缩，域名前缀在fis-conf.js中修改。
        release后，/widget/中只有一个文件，aio_hash.js。


更新日志：
-------------
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