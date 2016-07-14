# RequireJS 开发及部署试验 v1.0.1
###RequireJS 开发及部署试验

更新日志：
-------------

v1.0.1

    1. 立项并完成整体流程，demo中只有“首页”和“联系我们”可以看。
    2. 因为最后要用fis3构建打包上线，所以解决的难点集中在 模块化文件打包、加hash码 的过程中。最后的解决方案也是剑走偏锋，利用了fis3的内容签入功能，在不改变开发环境测试流程 和 上线release后不修改data-main入口的情况下，最小功耗的解决问题。
    3. 过程中，也尝试了fis3-hook-amd插件打包，不是很理想。因为项目是node的，后端代码也会受影响。

文件结构：
-------------
1. /dist/inc/require.js 放入项目文件夹inc中
2. /dist/widget/*.js 放入项目文件夹widget中
3. 页面配套js（一个页面文件最好有一个配套的js文件入口模块）和 UserControl.js 放入/widget/app/中
4. 第三方类库（如jquery、zepto以及公司内部开发的功能性插件等）放入/widget/lib/中
5. 小型功能模块（如window_resize、goto_top等）放入/widget/modules/中
6. /dist/fis-conf.js 放入项目文件夹根目录，覆盖之前版本

开发流程：
-------------

1. 页面底端引用：

		<script data-main="/widget/main" src="/inc/require.js" id="script_page" page="index"></script>。

		其中，page值需要修改为配套js（/widget/app/）的文件名称，最好和页面名称一致。
		除page外，其他值不用修改。
		data-main中的值“/widget/main[.js]”为js入口页。

2. 修改/widget/main.js：
    
	    requirejs.config({
	        // 配置文件，具体见官方文档：
	        // 非AMD规范文件 或 CDN引用文件 可在此配置shim
	    });

    	// 以下内容不必修改

		__inline('fis_inline.js')

	    function __inline() {
	        require(["app"]);
	    }

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

    	2) 返回到根目录执行：fis3 release [pub] -d ../output
        pub为可选项，本地release测试不要pub，本地测试完成、上线前release需要。区别为静态资源是否带域名前缀（利于优化和便于CDN），域名前缀在fis-conf.js中修改。
        release后，/widget/中只有两个文件，main.js 和 aio_hash.js。

    	3) 需要手动将main.js中的：
    		require(["aio"], function() { 
        改为：
        	require(["aio_5a0ac31"], function() { 

        其中 5a0ac31 为最新版本aio的hash码。
