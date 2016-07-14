/*
    白梦超
    20160422
 */


//  页面首页动画效果
var ie_index = {
    init: function() {
       
        ie_index.scroll_move_banner(); //进入页面banner动画
        ie_index.scroll_move(); //就如页面先执行一次动画
        ie_index.scroll_listener(); //scroll监听
        ie_index.window_resize(); //resize监听
        ie_index.mouse_ie_hover(); //ie9底部图片旋转

    },

    //实现14个性别图随机出现
    phone_show: function() {
        var delay = 100; //时间间隔
        var oDiv = $('.phone_line .phone.show'); //取所有隐藏的性别对象
        var doShow = function() {
            oDiv.eq(Math.floor(Math.random() * (oDiv.length))).removeClass('show').css('display','block').fadeIn(); //在所有隐藏的性别图像里面随机选取一个显示
            oDiv = $('.phone_line .phone.show');
            if (oDiv.length > 0) {
                delay -= 5;
                setTimeout(doShow, delay);
            }
        }
        setTimeout(doShow, delay);
    },

    // ie9  监听页面的scroll值，根据值进行执行不同的动画
    scroll_listener: function() {
        $(window).scroll(function() {
            ie_index.scroll_move();
        });
    },

    //window窗口变化监听
    window_resize: function() {
        $(window).resize(function() { //当网页 窗口大小变化时先根据变化之后的scrolltop值，执行一次页面动画效果
            ie_index.scroll_move();
        });
    },

    //IE9  banner 定义实现动画效果的方法
    scroll_move_banner: function() {
        //获取banner元素
        var obj = $("body.index section.banner");

        //右侧文字出现
        obj.find('div.content').delay(1000).fadeIn(2000);
      
        //设置四张图片间隔0.5秒出现一张
        obj.find('div.img_1').css('display','block').animate({ 'top': '95px' }, 2000);
        setTimeout(function(){
            obj.find('div.img_2').css('display','block').animate({ 'margin-left': '-308px' }, 2000);
        },500);
        setTimeout(function(){
            obj.find('div.img_3').css('display','block').animate({ 'margin-left': '-550px' }, 2000);
        },1000);
        setTimeout(function(){
            obj.find('div.img_4').css('display','block').animate({ 'top': '360px' }, 2000);
        },1500);
    },

    key: [],//设置一个空数组，作为动画开始和结束的判定条件
    timeout: [],//设置一个空数组，存储定时器用，方便清空定时器
    timeout1: [],//设置一个空数组，存储定时器用，方便清空定时器
    //IE9  marketing  定义实现动画效果的方法
    scroll_move: function(){
        var moving = function(obj, num){
            var scroll_px = $(window).scrollTop();
            var obj_top = obj.offset().top; //获取对象相对于文档
            var obj_hei = obj.height(); //获取对象本身的高度
            var window_height_px = $(window).height(); //获取浏览器可视窗口的高度的高度
            var window_bot_ele_bot = obj_top - window_height_px + obj_hei * 0.3;  //元素在窗口底部显示时的scroll值
            var window_top_ele_top = obj_top + obj_hei * 0.7;        //元素在窗口顶部显示时的scroll值
            var window_top_ele_bot = obj_top - window_height_px;     //元素在窗口顶部消失时的scroll值
            var window_bot_ele_top = obj_top + obj_hei;      //元素在窗口底部消失时的scroll值

            if (num == 1) {
                if (scroll_px <= window_top_ele_top && scroll_px >= window_bot_ele_bot) { //动画入场
                    obj.find('div').removeClass('show');
                    obj.find('div.content').css('display','block').animate({ 'margin-left': '-420px' }, 2000);
                    obj.find('div.img_1').css('display','block').animate({ 'margin-left': '-120px' }, 2000);
                } else if (scroll_px < window_top_ele_bot || scroll_px > window_bot_ele_top) { //动画出场
                    obj.find('div.content').stop(true, true).animate({ 'margin-left': '-500px' }, 10).css('display','none'); //隐藏元素
                    obj.find('div.img_1').stop(true, true).animate({ 'margin-left': '-60px' }, 10).css('display','none'); //隐藏元素
                }
            }

            if (num == 2) {
                if ((scroll_px <= window_top_ele_top && scroll_px >= window_bot_ele_bot) && !ie_index.key[2] ) { //动画入场
                    //动画开始前将线背景隐藏
                    obj.find('div.phone_line').fadeOut(0);
                    //动画执行改变ie_index.key的值为true
                    ie_index.key[2] = true;

              
                    //地图背景出现
                    ie_index.timeout1[4] = setTimeout(function(){
                        obj.find('div.map').css('display','block');
                    },500);

                    //三张手机图片出现
                    ie_index.timeout1[0] = setTimeout(function(){
                        obj.find('div.phone_left').css('margin-left', '-560px');
                        obj.find('div.phone_left').css('display','block').animate({ 'margin-left': '-530px' }, 1000);
                        obj.find('div.phone_right').css('margin-left', '-110px');
                        obj.find('div.phone_right').css('display','block').animate({ 'margin-left': '-140px' }, 1000);
                        obj.find('div.phone_bot').css('top', '380px');
                        obj.find('div.phone_bot').css('display','block').animate({ 'top': '350px' }, 1000);
                    },1000);

                    //线背景出现
                    ie_index.timeout1[1] =setTimeout(function() {
                        obj.find('div.phone_line').css('display','block');
                    }, 2000);

                    //性别图片出现
                    ie_index.timeout1[2] =setTimeout(function() {
                        ie_index.phone_show();
                    }, 2000);

                    //右侧文字出现
                    ie_index.timeout1[3] =setTimeout(function() {
                            obj.find('div.content').fadeIn(500);
                    }, 2500);
                } else if (scroll_px < window_top_ele_bot || scroll_px > window_bot_ele_top) { //动画出场
                   

                    // 清除未执行动画（不再执行，复原）
                    var _i = 0;
                    var _len = ie_index.timeout1.length;
                    for (; _i < _len; _i++)
                        clearTimeout(ie_index.timeout1[_i]);

                    ie_index.key[2] = false;// 记录本动画为退场状态

                    //隐藏元素
                    obj.find('div').stop(true,true).css('display','none');
                    obj.find('li').stop(true,true).css('display','none');
                }
            }

            if (num == 3) {
                if ((scroll_px <= window_top_ele_top && scroll_px >= window_bot_ele_bot) && !ie_index.key[3]) { //动画入场
                    //动画执行改变ie_index.key的值为true
                    ie_index.key[3] = true;
                    
                    //坐标背景出现
                    ie_index.timeout[0] = setTimeout(function() {
                        obj.find('div.zuobiao').css('display','block');
                    }, 500)

                    //数据颜色的div改变宽度
                    ie_index.timeout[1] = setTimeout(function() {
                        obj.find('div.color').css("width", 0).css('display','block').animate({ 'width': '382px' }, 1000);
                    }, 1500)

                    //左右上角的数据图出现
                    ie_index.timeout[2] = setTimeout(function() {
                        obj.find('div.left').css('top', '54px');
                        obj.find('div.left').css('display','block').animate({ 'top': '84px' }, 1500);
                        obj.find('div.right').css('margin-left', '-195px');
                        obj.find('div.right').css('display','block').animate({ 'margin-left': '-225px' }, 1500);
                    }, 2500)

                    //右侧文字出现
                    ie_index.timeout[3] = setTimeout(function() {
                        obj.find('div.content').fadeIn(500);
                    }, 3500)
                } else if (scroll_px < window_top_ele_bot || scroll_px > window_bot_ele_top) { //动画出场
                    // 清除未执行动画（不再执行，复原）
                    var _i = 0;
                    var _len = ie_index.timeout.length;
                    for (; _i < _len; _i++)
                        clearTimeout(ie_index.timeout[_i]);

                    ie_index.key[3] = false; // 记录本动画为退场状态

                    obj.find('div').stop(true, true).css('display','none'); //隐藏元素
                }
            }
        }

        moving($('.marketing'), 1); //移动互联网营销部分动画
        moving($('.spread'), 2);// 病毒裂变式传播方式动画
        moving($('.data'), 3);//统计表部分的动画
    },
    //ie 9 底部图片旋转功能
    mouse_ie_hover: function() {
        $('section.ad li').mouseenter(function() { //鼠标进入旋转
            var num = 0;
            var timer = null
            var _this = $(this);
            timer = setInterval(function() { //控制图片旋转速度定时器
                num += 10;
                if (num >= 360) {
                    clearInterval(timer);
                }
                _this.find('div').css('transform', 'rotate(' + num + 'deg)');
            }, 10)
            $(this).mouseleave(function() { //鼠标离开回复原状
                clearInterval(timer);
                _this.find('div').css('transform', 'rotate(' + 0 + 'deg)');
            });
        })

    }
}

