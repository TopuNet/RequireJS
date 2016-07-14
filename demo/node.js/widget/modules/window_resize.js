/*
	高京
	2016-07-11
	监听窗口大小改变模块
*/

define(["lib/jquery.min"], function() {

    return function(callback) {

        var resize_index = 0;
        $(window).resize(function() {
            if (resize_index++ > 0)
                return;
            setTimeout(function() {
                if (callback)
                    callback();
                resize_index = 0;
            }, 0);

        });
    };
});
