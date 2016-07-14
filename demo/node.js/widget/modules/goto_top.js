/*
	高京
	2016-07-11
	监听 返回顶部按钮 点击事件 及 滚动回顶部
	button_selector: 按钮选择器
*/

define(["lib/jquery.min"], function() {

    return function(button_selector) {

        var button_obj = $(button_selector);
        button_obj.click(function() { //点击回到顶部
            $("body,html").animate({ scrollTop: '0px' }, 200);
        })
        var window_height_px = $(window).height(); //获取页面可是高度

        var test_position = function() {

            var scrollTop = $(window).scrollTop(); //获取scroll的值
            button_obj.css('top', (window_height_px) / 2);
            if (scrollTop > window_height_px / 2) { //设置当scroll大于0时，显示回到顶部按钮
                button_obj.css('display', 'block');
            } else { //设置当scroll不大于0时，隐藏回到顶部按钮
                button_obj.css('display', 'none');
            }
        };

        test_position();

        $(window).scroll(function() {
            test_position();
        });
    };
});
