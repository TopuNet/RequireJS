/*
 *@高京
 *@20150909
 *@每个项目自带方法，添加方法的话：1.请先确认没有功能类同的方法可以使用（避免同一功能多个类同方法存在）；2.要尽量考虑可移植性和复用性，不要为了实现某一单一功能而增加本文件代码量；
                                   3.将调用方法写在顶部注释中；4.有新方法添加时，在群里吼一声
 */

/*
    高京

        *复制对象（网上抄的）
        *myObj：源对象
        clone(myObj)

        *插入css3的keyframes rule
        *style：rule
        insert_keyframe(style)

        *监听webkitAnimation
        *selector：要监听的selector
        *Callback_end：animation结束时的回调，可为null
        *Callback_start：animation开始时的回调，可为null
        *Callback_iteration：animation进行循环时的回调，可为null
        webkitAnimationListen(selector, Callback_end, Callback_start, Callback_iteration)

        *移动端解决微信浏览器上下灰条并执行内部移动
        *selector: 固定高度的盒选择器。如.panel
        *overflow_scrolling：是否执行盒内部移动。true-移动 else-不移动
        mobile_stop_moved(selector, overflow_scrolling)

        *获得地址栏参数集，返回JSON对象
        getQueryParas() 

        *自动获得地址栏参数集，并拼接返回为地址栏字符串：a=1&b=2&c=3
        *Para：过滤掉的参数名（键），多个用|分隔，区分大小写
        transParameters(Para)

        *在页面中引用其他js文件
        *path：引用文件路径
        includeJS(path)

        *在页面中引用其他CSS文件
        *path：引用文件路径
        includeCSS(path)

        *判断是否为PC端访问，返回true/false
        isPc()
    陈斌
        * 传入字符串。返回字符串长度数值
        * Str 字符串
        StrLength(Str)
*/

var functions = {
    init: function() {
        $(function() {

            $(".li_click").on("touchstart mousedown", function(e) {
                e.preventDefault();
                functions.li_click($(this));
            });
            /*$(".li_click").click(function() {
                functions.li_click($(this));
            });

            $(".li_click").on("touchstart",function() {
                functions.li_click($(this));
            });

            $(".ct").click(function() {
                alert("后续推出，敬请期待！");
                return false;
            });*/
        });
    },

    /*
        高京
        2016-02-24
        复制对象
            myOjb: 源对象
    */
    clone: function(myObj) {
        if (typeof(myObj) != 'object') return myObj;
        if (myObj == null) return myObj;

        var myNewObj = new Object();

        for (var i in myObj)
            myNewObj[i] = functions.clone(myObj[i]);

        return myNewObj;
    },
    /*
        高京
        2016-01-02
        插入css3的keyframes rule
            style：rule
    */
    insert_keyframe: function(style) {
        var _obj = document.styleSheets[0];
        if (_obj.insertRule)
            _obj.insertRule(style, 0);
        else
            _obj.appendRule(style, 0);
    },

    /*
        高京
        2016-01-02
        监听webkitAnimation
            selector：要监听的selector
            Callback_end：animation结束时的回调，可为null
            Callback_start：animation开始时的回调，可为null
            Callback_iteration：animation进行循环时的回调，可为null
    */
    webkitAnimationListen: function(selector, Callback_end, Callback_start, Callback_iteration) {
        var obj = document.querySelector(selector);
        if (Callback_end) {
            obj.addEventListener("webkitAnimationEnd", Callback_end);
        }
        if (Callback_start) {
            obj.addEventListener("webkitAnimationStart", Callback_start);
        }
        if (Callback_iteration) {
            obj.addEventListener("webkitAnimationIteration", Callback_iteration);
        }
    },

    /*
        高京
        2016-01-02
        移动端解决微信浏览器上下灰条并执行内部移动
            需要jquery或zepto支持
            selector: 固定高度的盒选择器。如.panel
            overflow_scrolling：是否执行盒内部移动。true-移动 else-不移动
    */
    mobile_stop_moved: function(selector, overflow_scrolling) {
        $(selector).css("overflow", "scroll");

        // 终止body应有的滚动事件
        $(document).on('touchmove', function(e) {
            e.preventDefault();
        });

        if (overflow_scrolling) {
            // $(selector).css("overflow", "scroll");
            $(selector).css("-webkit-overflow-scrolling", "touch");
            $("body").on('touchstart', selector, function(e) {
                var el = e.currentTarget;
                if (el.scrollTop == 0) {
                    el.scrollTop = 1;
                } else if (el.scrollHeight == el.scrollTop + el.offsetHeight) {
                    el.scrollTop = el.scrollTop - 1;
                }

            });
            $("body").on('touchmove', selector, function(e) {
                var el = e.currentTarget;
                if (el.scrollTop == 0)
                    return;
                e.stopPropagation();
            });
        }
    },

    /*
     *@高京
     *@20150909
     *li_click的点击事件转向方法
     */
    li_click: function(selector) {
        $("#link_new_window").remove();
        $("body").append("<a id=\"link_new_window\" href=\"" + $(selector).attr("url") + "\" target=\"" + $(selector).attr("target") + "\" style=\"cursor:pointer\"><span></span></a>");
        //safari
        try {
            var e = document.createEvent('MouseEvent');
            e.initEvent('click', false, false);
            var sub = document.getElementById("link_new_window");
            sub.dispatchEvent(e);
        }
        //!safari
        catch (e) {
            $("#link_new_window span").click();
        }
    },

    /*
     *@高京
     *@20151006
     *在页面中引用其他js文件
     */
    includeJS: function(path) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = path;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(a);
    },

    /*
     *@高京
     *@20151010
     *在页面中引用css文件
     */
    includeCSS: function(path) {
        var a = document.createElement("link");
        a.type = "text/css";
        a.rel = "stylesheet";
        a.href = path;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(a);
    },

    /*
     *@高京
     *@20151023
     *获得地址栏参数集，返回JSON对象
     */
    getQueryParas: function() {

        var Json_obj;

        var str = functions.getQueryParas_str(1, "");
        Json_obj = JSON.parse(str);

        return Json_obj;
    },

    /*
     *@高京
     *@20151023
     *自动获得地址栏参数集，并拼接为地址栏字符串：a=1&b=2&c=3
     *Para：过滤掉的参数名（键），多个用|分隔，区分大小写
     */
    transParameters: function(Para) {
        return functions.getQueryParas_str(2, Para);
    },

    /*
     *@高京
     *@20151023
     *获得地址栏参数集，返回JSON字符串或地址栏字符串
     *Kind：拼接种类。1-JSON字符串；2-地址栏字符串
     *Para：过滤掉的参数名（键），多个用|分隔
     */
    getQueryParas_str: function(Kind, Para) {
        var url = location.href;
        var s = url.indexOf("?");
        var str = "";

        //将|分隔的Para替换为<><><>格式
        try {
            Para = "<" + Para.replace(/\|/g, "><") + ">";
        } catch (e) {
            console.log("e:" + e);
        }


        if (s > -1) {
            url = url.substring(s + 1);
            var e = url.indexOf("=");
            var key;
            var value;
            while (e > -1) {
                key = url.substring(0, e).replace("&", "");

                //判断获得的键名是否过滤
                if (Para.indexOf("<" + key + ">") > -1) {
                    e = url.indexOf("&");
                    if (e == -1)
                        break;
                    url = url.substring(e + 1);
                    e = url.indexOf("=");
                    continue;
                }

                url = url.substring(e + 1);
                e = url.indexOf("&");
                if (e == -1)
                    value = url.substring(0);
                else
                    value = url.substring(0, e);
                url = url.substring(e + 1);
                e = url.indexOf("=");
                if (str != "") {
                    if (Kind == 1)
                        str += ",";
                    else
                        str += "&";
                }

                if (Kind == 1)
                    str += "\"" + key + "\":\"" + value + "\"";
                else
                    str += key.replace("&", "") + "=" + value;
            }
        }

        if (Kind == 1) {
            str = "{" + str + "}";
        }

        return str;
    },

    /*
     *@高京
     *@20150909
     *判断是否为PC端访问，返回true/false
     */
    isPc: function() {
        var system = {
            win: false,
            mac: false,
            xll: false
        };

        //检测平台
        var p = navigator.platform;
        //alert(p);
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

        if (system.win || system.mac || system.xll) {
            return true;
        } else {
            return false;
        }
    }

    /*
     *@陈斌
     *@20160103
     * 传入字符串。返回字符串长度数值
     */
    ,
    StrLength: function(Str) {
        var _i = 0;
        var _n = Str.length;
        var _c; //遍历Str时的Char值
        var _l = 0; //记录字符串长度
        for (_i; _i < _n; _i++) {

            //根据字符ASCII判断占用字节数
            _c = Str.charCodeAt(_i);
            if (_c <= 126)
                _l += 1;
            else
                _l += 2;
        }

        return _l;
    }
}

if (typeof define === "function" && define.amd) {
    require(["lib/jquery.min"], function() {
        functions.init();
        return functions;
    });
}
else{
    functions.init();
}
