/*
    高京
    2016-06-23
    首页配套js 
 */

define(["modules/window_resize", "modules/goto_top", "lib/jquery.min"], function($window_resize, $goto_top) {
    var index = {
        init: function() {
            $('.banner div').addClass('show'); //首次进入页面banner的动画
            scroll_move();
            to_top();
            scroll_listener(); //根据页面scroll的值执行动画
            window_resize(); //根据页面scroll的值执行动画
        }
    }

    return index;

    // 监听页面的scroll值，根据值进行执行不同的动画
    function scroll_listener() {
        $(window).scroll(function() {
            scroll_move();
        });
    }

    //定义实现动画效果的方法
    function scroll_move() {

        var moving = function(obj, scroll_px, isSpread) {

            var obj_top = obj.offset().top; //获取对象相对于文档
            var obj_hei = obj.height(); //获取对象本身的高度 
            var window_height_px = $(window).height(); //获取浏览器可视窗口的高度的高度
            var window_bot_ele_bot = obj_top - window_height_px + obj_hei * 0.3; //元素在窗口底部显示时的scroll值
            var window_top_ele_top = obj_top + obj_hei * 0.7; //元素在窗口顶部显示时的scroll值
            var window_top_ele_bot = obj_top - window_height_px; //元素在窗口顶部消失时的scroll值
            var window_bot_ele_top = obj_top + obj_hei; //元素在窗口底部消失时的scroll值

            if (scroll_px <= window_top_ele_top && scroll_px >= window_bot_ele_bot) { //动画入场
                if (obj.find('div').hasClass('show'))
                    return;
                obj.find('div').addClass('show');

                // 如果是部病毒裂变式传播方式结构，则执行男女小图标频出动画
                if (isSpread)
                    phone_show();

            } else if (scroll_px < window_top_ele_bot || scroll_px > window_bot_ele_top) { //动画出场

                obj.find('div').removeClass('show');
                obj.find('li').removeClass('show').addClass('hide');
            }
        }

        var scroll_px = $(window).scrollTop(); //获取scroll的值
        moving($('.marketing'), scroll_px); //移动互联网营销部分动画
        moving($('.spread'), scroll_px, true); // 病毒裂变式传播方式动画
        moving($('.data'), scroll_px) //统计表部分的动画
    }

    //window窗口变化监听
    function window_resize() {
        $window_resize(function() {
            scroll_move();
            to_top();
        });
    }

    //实现14个性别图随机出现
    function phone_show() {
        var delay = 100; //时间间隔
        var oDiv = $('.phone_line .phone.hide'); //取所有隐藏的性别对象

        var doShow = function() {
            oDiv.eq(Math.floor(Math.random() * (oDiv.length))).addClass('show').removeClass('hide'); //在所有隐藏的性别图像里面随机选取一个显示
            oDiv = $('.phone_line .phone.hide');
            if (oDiv.length > 0) {
                delay -= 5;
                setTimeout(doShow, delay);
            }
        }

        setTimeout(doShow, delay);
    }

    //回到顶部
    function to_top() {
        $goto_top("section.to_top");
    }
});
