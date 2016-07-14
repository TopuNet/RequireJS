/*
	白梦超
	20160426
 */

//页面底部微信弹窗
define(["lib/functions","lib/jquery.min"], function() {
    mouse_click();

    function mouse_click() {
        $('#li_2').click(function() { //点击微信按钮显示或者隐藏二维码
            $('.twodcode').find('div').fadeIn(200);
        });
        $('.twodcode').click(function() {
            $('.twodcode').find('div').fadeOut(200);
        });
    }
});