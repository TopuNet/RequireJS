/*
 *@ 高京
 *@ 20150825 
 *@ 全局公共方法，添加方法的话：1.请先确认没有功能类同的方法可以使用（避免同一功能多个类同方法存在）；2.要尽量考虑可移植性和复用性，不要为了实现某一单一功能而增加本文件代码量；
                                3.将调用方法写在顶部注释中；4.有新方法添加时，在群里吼一声
 */

exports.domain = "65276588.cn"; // 主域名-获得二级域名用

/*
   高京
        *【同步】生成随机码。返回字符串
        * n: 位数，数字+字母的组合时请键入偶数
        * kind: 生成种类。1-纯数字 2-纯大写字母 3-纯小写字母 4-数字+大写字母 5-数字+小写字母 6-大写字母或小写字母 7-数字+纯大写字母或小写字母
        CreateRandomStr(n,kind)

        *【同步】生成时间戳（世界标准时间）。返回字符串
        * dt: 日期。
        CreateTimeStamp(dt)

        *【同步】对JSON进行字典序排序（如需和.NET的字典序排序作匹配则不建议使用，建议使用TopuAPI.65276588.cn:3333/ListSort.ashx接口作排序）。返回JSON对象
        * json_o: JSON对象。
        JsonSort(json_o) 

        *【同步】字符串加密。返回字符串
        * str: 要加密字符串。
        * HashKind: 'md5' | 'sha1'
        * UpperLower: 返回字符串大小写。1-小写 | else-大写
        CreateHash(str, HashKind, UpperLower)

        *【异步】文件读取。next(文件内容，或以"err:"开头的错误信息)
        * query.f:文件路径。如：e:\abc.txt | ./npm-debug.log
        routes.get("/ReadFile", functions.ReadFile, function (data, req, res, next) { }

        *【同步】文件读取。返回（文件内容，或以"err:"开头的错误信息）
        * path:文件路径。如：e:\abc.txt | ./npm-debug.log
        ReadFileSync(path)

        *【异步】生成topu签名。
        * ParamsJsonObj:要传参数的JSON对象
        * CallBack:成功后的回调
            传入参数：
            {
                "non_str": "8q0M3i7T4P1S5J9Q3r1l5p6V5G1O7Q0U",
                "stamp": "1440570767",
                "signature": "FC5A7F9BC8A7D418209FCC23772B785155FB3D8F"
            }
        * non_str:随机数，不传会自动生成
        * stamp:时间戳，不传会自动生成
        CreateTopuSignature(ParamsJsonObj, CallBack, non_str, stamp) 

        *【异步】向API接口发请求。
        * Host:主机地址，如 "www.twedding.cn"
        * Port:端口号，如 "80"。"443"时代表https提交
        * Path:路径，如 "/test/test.ashx"
        * Method:提交方式 "Post" | "Get"
        * PostData:要通过Post方式传递给API接口的参数集，JSON对象
        * CallBackSuccess:调用成功后的回调方法。
            传入参数：页面返回值
        * CallBackError:调用连接失败后的回调方法
            传入参数：错误信息
        DoREST(Host, Port, Path, Method, PostData, CallBackSuccess, CallBackError)

        *【同步】省略字符串。返回省略后的字符串
        * Str 判定长度的字符串
        * Length 限定的字节数（一个汉字占2字节）
        * ShowMore 如字符串需要截取，是否显示... true-显示 false-不显示
        ShengLue(Str, Length, ShowMore)

        *【同步】获得字符串长度。返回长度数值
        * Str 字符串
        StrLength(Str) 

        *【同步】根据文件路径，获得文件扩展名。返回扩展名字符串
        * Str 文件路径
        GetExtension(Str)

        *【同步】对JSON对象的值进行escape转码。返回转码后的JSON对象
        * --经DoREST传参的Json字符串需进行escape转码
        * Json_obj 待转码JSON对象
        * split_str 分隔字符串。如不为空(如{$::::::::::})则会转为：{key1:key1{$::::::::::}value1,key2:key2{$::::::::::}value2}。如为空则会转为：{key1:value1,ke2:value2}
        JsonEscape(Json_obj, split_str)

        *【同步】JSON批量转（与.NET端LitJSON库匹配的）unicode码。返回转码后的JSON对象
        * --防止中文及字符经JSON.parse()时报错
        * Json_obj 要转码的Json对象
        JsonUnicode(Json_obj)

        *【同步】根据主外键关系合并JSON。返回：将Parent_keyName添加到Parent中，并返回Parent
        * Parent：父级JSON
        * Child：子级JSON，主外键相同时，添加到父级JSON中
        * Parent_FK：用于比较的父级外键
        * Child_PK：用于比较的子级主键
        * Parent_keyName：在父级JSON中添加的键名
        JsonUnion(Parent, Child, Parent_FK, Child_PK, Parent_keyName)

        *【同步】对字符串进行数字型判断（支持逗号分隔的多值字符串），返回过滤后的字符串（非数字值被过滤）
        * str 逗号分隔的字符串
        filterNoNum(str) 

        *【同步】自动获得地址栏参数集，并拼接返回为地址栏字符串：a=1&b=2&c=3
        * query：req.query
        * Filter_Para：过滤掉的参数名（键），多个用|分隔，区分大小写
        transParameters(query, Filter_Para)

        *【同步】格式化日期时间。返回字符串
        dt：要格式化的日期字符串
        kind：1-标准全日期 2-标准短日期 其他-自定义字符串
        dateFormat(dt, kind)

        *【异步】发送邮件
        * Subject：主题
        * isHtml：true-使用HTML格式(HtmlBody) false-使用纯文本格式(Body，不推荐)
        * Body：纯文本格式内容
        * HtmlBody：HTML格式内容，要有<html><body></body></html>
        * FromName：发件人名称
        * MailTo：收件人。多个用逗号分隔
        * Bcc：秘密抄送。数组。
        * Reply：回复地址。
        * callback_success(err)：回调方法。正确发送时，err="success"
        MailSend(Subject, isHtml, Body, HtmlBody, FromName, MailTo, Bcc, Reply, callback_success)

        *【同步】遮盖姓名，两边各留一个字。返回新字符串
        * str：原字符串
        * mask：遮盖字符
        * length：遮盖字符出现最长次数
        NameMask(str, mask, length)

        *【同步】遮盖手机，根据length决定两边留几位，最少各留一位。返回新字符串
        * str：原字符串
        * mask：遮盖字符
        * length：遮盖字符出现最长次数
        MobileMask(str, mask, length)


        *【同步】图片缩放（不支持定高不定宽）、水印（暂时没做）。返回ERROR或SUCCESS
        * originalImagePath：源图片路径。注意根目录的写法为：./01.jpg
        * outputPath：输出图片路径。要包含后缀，如：./01_output.jpg
        * width：宽。0为不缩放
        * height：高。0为按比例缩放。不为0时，可能会变形
        MakeThumb (originalImagePath, outputPath, width, height) 
     
        *【同步】格式化Textarea输入的字符串，替换空格和回车（注意用<%- %>输出。返回字符串
        * str：要格式化的字符串
        formatTextArea(str)

        *【同步】获取网址的二级域名
        get_domain(req)

        *【同步】根据第一个数组中的值匹配，取出第二个数组中相对应位置的值。
        * arr_source：源数组
        * match：匹配值
        * arr_target：目标数组
        arr_value_match(arr_source, match, arr_target)

        *【同步】解析xml为json
        * xmlString：待解析的xml字符串
        * CallBack_success(json)：成功回调
        xmlToJson(xmlString, CallBack_success)

         *【异步】request请求
        * opt: {
                url: request地址，支持https协议和地址栏参数,
                method: get|post_json|post_file。 默认get,
                PostData: method=post_json时有效; json对象,
                PostData_escape: 对PostData进行unicode和escape编码（针对拓扑接口）。默认"true"，调用微信或其他不需要编码接口时，设为"false"
                files: method=post_file时有效; 名称1|文件名1||名称2|文件名2||名称3|文件名3...
          }
        * Callback_success(json): 成功回调
        * Callback_error(err): 失败回调
        Request(opt, Callback_success, Callback_error)

    陈斌
        *【同步】中文unicode转码。返回转码后字符串
        * text 要转码的中文
        uniencode(text)

        *【同步】判断逗号分隔的主码中是否含有某一主码。返回true或false
        * str 被比较字符串。可以为逗号分隔的多个主码，也可以是尖括号包围的多个主码
        * Pat 条件主码string类型
        checkHave(str, Pat)

         *@【同步】生成cookies
         *@Mid 会员id
         *@Passwd 密码
         CreatCookies(id, Passwd, res)

         *@【同步】获取cookies中的值并返回用户Mid和密码
        GetCookies(req)


         *@【同步】给图片添加水印
         *@ watermarkImg_src:水印图片路径
         *@ sourceImg_src:待加水印图片路径
         *@ savePath_src:图片保存路径
         *@ left:水印图片相对于待加水印图片左边的距离(left,top若其中任意一个不传，则默认水印添加在右下方距离底部10px,距离右边10px的位置)
         *@ top:水印图片相对于待加水印图片上方的距离
        AddWatermark(watermarkImg_src, sourceImg_src, savePath_src, left, top)

*/


var express = require("express");
var func = require('./functions');
var config = require('./config');
var crypto = require('crypto'); //加密模块，CreateHash用
var fs = require('fs'); //文件操作模块，ReadFile用
var http = require('http'); //http请求模块，DoREST用
var https = require('https'); //https请求模块，DoREST用
var dtFormat = require('dateFormat'); //日期格式化模块，dateFormat用
var nodemailer = require('nodemailer'); //邮件发送模块，MailSend用
var smtpTransport = require('nodemailer-smtp-transport'); //邮件发送模块，MailSend用
var images = require("images"); //图片处理模块，MakeThumb和AddWatermark用
var path = require('path'); //给图片加水印用
var xml2js = require("xml2js"); //解析xml为json用

/*
    高京
    2016-04-27
    【同步】解析xml为json
    xmlString：待解析的xml字符串
    CallBack_success(json)：成功回调
*/
exports.xmlToJson = function(xmlString, CallBack_success) {
    xml2js.parseString(xmlString, { explicitArray: false }, function(err, json) {
        CallBack_success(json);
    });
}

/*
    渲染错误页面
*/
exports.Error = function(res, err) {
    err.status = err.status || 404;
    res.status(err.status);
    res.render('./err/404.html', {
        "common": err.status + " - 元吉官网",
        "menu": "1",
        "err": (err.status) + ": " + err.message.replace(/[\n\r]/g, " ").replace(/\"/g, "\\\"")
    });
};


/*
 *@高京
 *@20150825 
 *@【同步】生成随机码。返回字符串
 *@ n: 位数，数字+字母的组合时请键入偶数
 *@ kind: 生成种类。1-纯数字 2-纯大写字母 3-纯小写字母 4-数字+大写字母 5-数字+小写字母 6-大写字母或小写字母 7-数字+纯大写字母或小写字母 
 *@ filter_strs要过滤的数字或者字符,多个用逗号分隔,为空表示不过滤
 */
exports.CreateRandomStr = function(n, kind, filter_strs) {
    var _i = 0;
    var _str = "";
    var _r = 0; //某些方法中使用的随机数   
    var result = "";
    if (filter_strs) {
        result = filter_strs;
    }
    var filter = function(str) {

        if (func.checkHave(result.toString(), str.toString()))
            return false;
        else
            return true;
    }

    var str;
    var str2;

    switch (parseInt(kind)) {
        case 1:
            for (_i; _i < n; _i++) {
                str = Math.floor(Math.random() * 10);
                if (!filter(str)) {
                    _i--;
                    continue;
                }
                _str += str;
            }
            break;
        case 2:
            for (_i; _i < n; _i++) {
                _r = Math.floor(Math.random() * 26) + 1; //1～26
                str = String.fromCharCode(64 + _r);
                if (!filter(str)) {
                    _i--;
                    continue;
                }
                _str += str;
            }
            break;
        case 3:
            for (_i; _i < n; _i++) {
                _r = Math.floor(Math.random() * 26) + 1;
                str = String.fromCharCode(96 + _r);
                if (!filter(str)) {
                    _i--;
                    continue;
                }
                _str += str;
            }
            break;
        case 4:
            for (_i; _i < n / 2; _i++) {
                _r = Math.floor(Math.random() * 26) + 1;

                str = Math.floor(Math.random() * 10)
                if (!filter(str)) {
                    _i--;
                    continue;
                }

                str2 = String.fromCharCode(64 + _r);
                if (!filter(str2)) {
                    _i--;
                    continue;
                }

                _str += str + str2;

            }
            break;
        case 5:
            for (_i; _i < n / 2; _i++) {
                _r = Math.floor(Math.random() * 26) + 1;

                str = Math.floor(Math.random() * 10)
                if (!filter(str)) {
                    _i--;
                    continue;
                }

                str2 = String.fromCharCode(96 + _r);
                if (!filter(str2)) {
                    _i--;
                    continue;
                }

                _str += str + str2;
            }
            break;
        case 6:
            for (_i; _i < n; _i++) {
                _r = Math.floor(Math.random() * 58) + 1; //1～58
                if (_r > 26 && _r < 33) {
                    _i--;
                    continue;
                }

                str = String.fromCharCode(64 + _r);
                if (!filter(str)) {
                    _i--;
                    continue;
                }

                _str += str;
            }
            break;
        case 7:
            for (_i; _i < n / 2; _i++) {

                str = Math.floor(Math.random() * 10)
                if (!filter(str)) {
                    _i--;
                    continue;
                }

                _r = Math.floor(Math.random() * 58) + 1;
                if (_r > 26 && _r < 33) {
                    _i--;
                    continue;
                }
                str2 = String.fromCharCode(64 + _r);
                if (!filter(str2)) {
                    _i--;
                    continue;
                }

                _str += str + str2;
            }
            break;

        default:
            _str = kind;
            break;
    }
    return _str;
};

/*
 *@高京
 *@20150825 
 *@【同步】生成时间戳（世界标准时间）。返回字符串
 *@ dt: 日期。
 */
exports.CreateTimeStamp = function(dt) {
    var _stamp = Date.parse(dt).toString(); //1440499440000
    _stamp = _stamp.substring(0, _stamp.length - 3); //去掉最后的000，和.net端保持一致
    return _stamp;
};

/*
 *@高京
 *@20150825 
 *@【同步】对JSON进行字典序排序。返回JSON对象
 *@ json_o: JSON对象。
 */
exports.JsonSort = function(json_o) {
    var _Json2 = {};
    var _keys = Object.keys(json_o).sort(function(p1, p2) {
        return p1.localeCompare(p2);
    });
    var _i = 0;
    var _n = _keys.length;
    var _key;

    for (_i; _i < _n; _i++) {
        _key = _keys[_i];
        _Json2[_key] = json_o[_key];
    }
    return _Json2;
};

/*
 *@高京
 *@20150825 
 *@【同步】字符串加密。返回字符串
 *@ str: 要加密字符串。
 *@ HashKind: 'md5' | 'sha1'
 *@ UpperLower: 返回字符串大小写。1-小写 | else-大写
 */
exports.CreateHash = function(str, HashKind, UpperLower) {
    var _hash = crypto.createHash(HashKind);
    _hash.update(str, 'utf8');
    _hash = _hash.digest('hex').toUpperCase();
    if (UpperLower == 1)
        _hash = _hash.toLowerCase();
    return _hash;
};

/*
 *@高京
 *@20150826 
 *@【异步】文件读取。next(文件内容，或以"err:"开头的错误信息)
 *@query.f:文件路径。如：e:\abc.txt | ./inc/abc.txt
 */
exports.ReadFile = function(req, res, next) {
    f = req.query["f"];
    fs.readFile(f, function(err, data) {
        var _str = "";
        if (err) {
            _str = "err:" + err;
        } else {
            _str = data;
        }
        next(_str);
    });
};

/*
 *@高京
 *@20150826 
 *@【同步】文件读取。返回（文件内容，或以"err:"开头的错误信息）
 *@ path:文件路径。如：e:\abc.txt | ./inc/abc.txt
 */
exports.ReadFileSync = function(path) {
    var _data = "";
    _data = fs.readFileSync(path);
    return _data;
};

/*
*@高京
*@20150826 
*@【异步】生成topu签名。
*@ ParamsJsonObj:要传参数的JSON对象
*@ CallBack:成功后的回调
    传入参数：
    {
        "non_str": "8q0M3i7T4P1S5J9Q3r1l5p6V5G1O7Q0U",
        "stamp": "1440570767",
        "signature": "FC5A7F9BC8A7D418209FCC23772B785155FB3D8F"
    }
*@ non_str:随机数，不传会自动生成
*@ stamp:时间戳，不传会自动生成
*/
exports.CreateTopuSignature = function(ParamsJsonObj, CallBack, non_str, stamp) {
    var _ParamsJsonObj = JSON.parse(JSON.stringify(ParamsJsonObj));
    var _handle = require("./functions.js");
    var _non_str; //随机数
    var _stamp; //时间戳
    var _i;
    var _n;
    var _KeySecret; //密钥
    var _KeySecretNew; //混插后密钥
    var _str = "";
    var _dt; //日期
    var _key; //遍历Json时，获得键对象
    var _sign; //签名
    var _KeyFilePath = "./inc/abc.txt"; //密钥文件，可以为物理硬盘路径：e:\abc.txt

    //随机数
    if (non_str == undefined)
        _non_str = _handle.CreateRandomStr(32, 7);
    else
        _non_str = non_str;


    //时间戳
    if (stamp == undefined)
        _stamp = _handle.CreateTimeStamp(new Date());
    else
        _stamp = stamp;

    //密钥
    _KeySecret = _handle.ReadFileSync(_KeyFilePath).toString();

    //随机数和密钥混插
    _i = 0;
    _n = 32;
    _KeySecretNew = "";
    for (_i; _i < _n; _i++) {
        _KeySecretNew += _non_str.substr(_i, 1);
        _KeySecretNew += _KeySecret.substr(_i, 1);
    }

    //处理ParamsJsonObj
    //_ParamsJsonObj = func.JsonEscape(_ParamsJsonObj);
    _sign = JSON.stringify(_ParamsJsonObj).replace(/","/g, "").replace(/":"/g, "=").replace(/[\{","\}]/g, "");
    _sign += "non_str=" + _non_str;
    _sign += "stamp=" + _stamp;
    _sign += "keySecret=" + _KeySecretNew;


    //Hash加密
    _sign = _handle.CreateHash(_sign, "sha1").toLowerCase();

    //拼接JSON
    _str = "{";
    _str += "\"non_str\":\"" + _non_str + "\"";
    _str += ",\"stamp\":\"" + _stamp + "\"";
    _str += ",\"signature\":\"" + _sign + "\"";
    _str += "}";

    //执行CallBack
    CallBack(_str);
};

/*
 *@高京
 *@20150826 
 *@【异步】向API接口发请求。
 *@ Host:主机地址，如 "www.twedding.cn"
 *@ Port:端口号，如 "80"。"443"时代表https提交
 *@ Path:路径，如 "/test/test.ashx"
 *@ Method:提交方式 "Post" | "Get"
 *@ PostData:要通过Post方式传递给API接口的参数集，JSON对象
 *@ CallBackSuccess:调用成功后的回调方法。
    传入参数：页面返回值
 *@ CallBackError:调用连接失败后的回调方法
    传入参数：错误信息
 */
exports.DoREST = function(Host, Port, Path, Method, PostData, CallBackSuccess, CallBackError) {

    var http_method = Port == 443 ? https : http;
    var _options;
    var _req;
    var _PostDataLength = 0; //Post参数长度
    if (PostData) {
        PostData = JSON.stringify(PostData); //设置POST参数，GET方式可以不要
        _PostDataLength = PostData.length;
    }
    _options = { //参数集
        host: Host, //域名
        port: Port, //端口
        path: Path, //路径 /test/test.ashx，如需经GET传递数据，可写'/test/test.ashx?k=1&p=2&ps=15'
        method: Method, //GET or POST
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": _PostDataLength
        } //头信息，这两行仅针对有数据要POST的情况，头信息还有其他很多属性，要根据需求使用    
    };
    
    _req = http_method.request(_options, function (_res) {
        _res.setEncoding('utf-8'); //返回值设定编码

        var _postdata = "";
        var i = 0;
        _res.on('data', function (_data) {
            
            _postdata += _data;
        });
        _res.on('end', function() {
            var json;
            try {
                json = JSON.parse(_postdata);
                CallBackSuccess(json);
            } catch (e) {
                if (CallBackError != null)
                    CallBackError(e);
            }

        });

    });
    if (PostData) {
        PostData = func.JsonEscape(PostData);
        _req.write(PostData); //传递POST数据，如不经POST传递数据，可省略
    }
    _req.end(); 
    _req.on('error', function(e) {
        console.log("\nfunc 607:")
        console.dir(e);
        CallBackError("err:" + e.message);
    });
    
};



/*
 *@高京
 *@20151014 
 *@【同步】对JSON对象的值进行escape转码。返回转码后的JSON对象
 *@ Json_obj 待转码JSON对象
 *@ split_str 分隔字符串。如不为空(如{$::::::::::})则会转为：{key1:key1{$::::::::::}value1,key2:key2{$::::::::::}value2}。如为空则会转为：{key1:value1,ke2:value2}
 */
exports.JsonEscape = function(Json_obj, split_str) {
    var _json_obj = JSON.parse(JSON.stringify(Json_obj));
    var _str = "";
    var _s = 2;
    var _e;
    var i = 0;

    var _json_str = JSON.stringify(_json_obj);
    while (true) {

        //找键
        _e = _json_str.indexOf("\":\"", _s);
        if (_e == -1) {
            break;
        }
        _str = _json_str.substring(_s, _e);
        _json_obj[_str] = escape(_json_obj[_str]);
        if (split_str != null && split_str != "")
            _json_obj[_str] = _str + split_str + _json_obj[_str];

        //找下一个键
        _s = _json_str.indexOf("\",\"", _e);
        if (_s == -1)
            break;
        _s += 3;
    }

    return _json_obj;
}

/*
 *@高京
 *@20150826 
 *@【同步】省略字符串。返回省略后的字符串
 *@ Str 判定长度的字符串
 *@ Length 限定的字节数（一个汉字占2字节）
 *@ ShowMore 如字符串需要截取，是否显示... true-显示 false-不显示
 */
exports.ShengLue = function(Str, Length, ShowMore) {
    var _i = 0;
    var _n = Str.length;
    var _c; //遍历Str时的Char值
    var _l = 0; //记录字符串长度
    var _str = ""; //拼接输出内容
    for (_i; _i < _n; _i++) {

        //根据字符ASCII判断占用字节数
        _c = Str.charCodeAt(_i);
        if (_c <= 126)
            _l += 1;
        else
            _l += 2;

        //如超过限定长度，则退出循环。否则拼接
        if (_l > Length) {
            //考虑是否显示...
            if (ShowMore)
                _str += "...";
            break;
        } else
            _str += Str.substr(_i, 1);
    }
    return _str;
}

/*
 *@高京
 *@20150826 
 *@【同步】获得字符串长度。返回长度数值
 *@ Str 字符串
 */
exports.StrLength = function(Str) {
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

/*
 *@高京
 *@20150911
 *@【同步】根据文件路径，获得文件扩展名。返回扩展名字符串
 *@ Str 文件路径
 */
exports.GetExtension = function(Str) {
    var ext = Str.split('.');
    try {
        ext = ext[ext.length - 1];
    } catch (e) {
        ext = "";
    }
    return ext;
}

/*
 *@陈斌
 *@20151009
 *@【同步】中文unicode转码。返回转码后字符串
 *@ text 要转码的中文
 */
exports.uniencode = function(text) {
    text = escape(text.toString()).replace(/\+/g, "%2B");
    var matches = text.match(/(%([0-9A-F]{2}))/gi);
    if (matches) {
        for (var matchid = 0; matchid < matches.length; matchid++) {
            var code = matches[matchid].substring(1, 3);
            if (parseInt(code, 16) >= 128) {
                text = text.replace(matches[matchid], '%u00' + code);
            }
        }
    }
    text = text.replace('%25', '%u0025');
    text = text.toLowerCase();
    return text;
}

/*
 *@高京
 *@20151016
 *@【同步】JSON批量转unicode码。返回转码后的JSON对象
 *@ Json_obj 要转码的Json对象
 */
exports.JsonUnicode = function(Json_obj) {
    var _json_obj = JSON.parse(JSON.stringify(Json_obj));
    var _str = "";
    var _s = 2;
    var _e;
    var i = 0;

    var _json_str = JSON.stringify(_json_obj);
    while (true) {

        //找键
        _e = _json_str.indexOf("\":\"", _s);
        if (_e == -1) {
            break;
        }
        _str = _json_str.substring(_s, _e);
        _json_obj[_str] = func.uniencode(_json_obj[_str]);

        //找下一个键
        _s = _json_str.indexOf("\",\"", _e);
        if (_s == -1)
            break;
        _s += 3;
    }

    return _json_obj;
}


/*
 *@高京
 *@20151020
 *@【同步】根据主外键关系合并JSON。返回：将Parent_keyName添加到Parent中，并返回Parent
 *@Parent：父级JSON
 *@Child：子级JSON，主外键相同时，添加到父级JSON中
 *@Parent_FK：用于比较的父级外键
 *@Child_PK：用于比较的子级主键
 *@Parent_keyName：在父级JSON中添加的键名
 */
exports.JsonUnion = function(Parent, Child, Parent_FK, Child_PK, Parent_keyName) {

        var _n_parent = 0;
        var _c_parent = Parent.length;
        var _i_child = 0;
        var _c_child = Child.length;
        var _i;

        for (; _i_child < _c_child; _i_child++) {
            if (Child[_i_child][Child_PK] != Parent[_n_parent][Parent_FK]) {
                _n_parent = 0;
                _i = 0;
                for (; _i < _c_parent; _i++) {
                    if (Parent[_i][Parent_FK] == Child[_i_child][Child_PK]) {
                        _n_parent = _i;
                        break;
                    }
                }
            }
            if (_n_parent >= Parent.length)
                continue;

            if (!Parent[_n_parent][Parent_keyName])
                Parent[_n_parent][Parent_keyName] = [Child[_i_child]];
            else
                Parent[_n_parent][Parent_keyName][Parent[_n_parent][Parent_keyName].length] = Child[_i_child];
        }

        return Parent;
    }
    /*
     *@陈斌
     *@20151020
     *@【同步】判断逗号分隔的主码中是否含有某一主码。返回true或false
     *@str 被比较字符串。可以为逗号分隔的多个主码，也可以是尖括号包围的多个主码
     *@Pat 条件主码,string
     */
exports.checkHave = function(str, Pat) {

    if (str == "" || str == null)
        return false;

    str = "<" + str.replace(/,/g, "><") + ">";
    Pat = "<" + Pat.replace(/,/g, "><") + ">";

    if (str.indexOf(Pat) > -1)
        return true;
    else
        return false;
    return false;
}

/*
 *@ 高京
 *@ 20151023
 *@【同步】对字符串进行数字型判断（支持逗号分隔的多值字符串），返回过滤后的字符串（非数字值被过滤）
 *@ str 逗号分隔的字符串
 */
exports.filterNoNum = function(str) {
    var _str = "";
    if (str) {
        var arr = str.split(',')
        var i;
        var c = arr.length;
        for (i = 0; i < c; i++) {
            if (!isNaN(arr[i])) {
                if (_str != "")
                    _str += ",";
                _str += arr[i];
            }
        }
    }
    return _str;
}

/*
 *@ 高京
 *@ 20151102
 *@【同步】自动获得地址栏参数集，并拼接返回为地址栏字符串：a=1&b=2&c=3
 *@ query：req.query
 *@ Filter_Para：过滤掉的参数名（键），多个用|分隔，区分大小写
 */
exports.transParameters = function(query, Filter_Para) {
    var str = "";
    var i = 0;
    var json_str = JSON.stringify(query).replace("{", "").replace("}", "").replace(/\"/g, "");
    if (json_str == "")
        return "";
    var arr = json_str.split(',');
    var arr_temp;
    var c = arr.length;

    //将|分隔的Para替换为<><><>格式
    try {
        Filter_Para = "<" + Filter_Para.replace(/\|/g, "><") + ">";
    } catch (e) {
        console.log("e:" + e);
    }

    for (; i < c; i++) {
        arr_temp = arr[i].split(':');
        if (Filter_Para.indexOf("<" + arr_temp[0] + ">") == -1) {
            if (str != "")
                str += "&";
            str += arr_temp[0] + "=" + arr_temp[1];
        }
    }

    return str;
}


/*
 *@ 高京
 *@ 20151104
 *@【同步】格式化日期时间。返回字符串
 *@ dt：要格式化的日期字符串
 *@ kind：1-标准全日期 2-标准短日期 其他-自定义字符串
 */
exports.dateFormat = function(dt, kind) {
    if (dt == "" || dt == null)
        return "";
    if (!kind)
        kind = 1;
    if (!isNaN(kind)) {
        switch (kind) {
            case 2:
                return func.dateFormat(dt, "yyyy-mm-dd");
                break;
            default:
                return func.dateFormat(dt, "yyyy-mm-dd HH:MM:ss");
                break;
        }
    }
    try {
        return dtFormat(dt, kind);
    } catch (e) {
        return "";
    }
}

/*
 *@陈斌
 *@20151105
 *@【同步】生成cookies
 *@Mid 会员id
 *@Passwd 密码
 */
exports.CreatCookies = function(id, Passwd, res) {
    var count = config.cookies_str.length;
    var PasswdList = new Array();
    var cookies_pwd = "";
    for (var i = 0; i < count; i++) {
        PasswdList[i] = config.cookies_str[i];
    }
    for (var j = 0; j < config.cookies_key.length; j++) {
        PasswdList.splice(config.cookies_key[j] + j - 1, 0, Passwd[j]);
    }
    //判断密码长度
    if (Passwd.length <= 16) {
        for (var j = 0; j < PasswdList.length; j++) {
            if (PasswdList[j] == undefined) {
                PasswdList[j] = "";
            }
            cookies_pwd = cookies_pwd + PasswdList[j];
        }
    } else {
        for (var j = 0; j < PasswdList.length; j++) {
            if (PasswdList[j] == undefined) {
                PasswdList[j] = "";
            }
            cookies_pwd = cookies_pwd + PasswdList[j];
        }
        cookies_pwd = cookies_pwd + Passwd.substr(16, Passwd.length)
    }
    var cookie_val = "{\"Mid\":\"" + id + "\",\"Passwd\":\"" + cookies_pwd + "\"}";

    //生成cookie
    res.cookie(config.cookieName_Member, cookie_val);


}

/*
 *@陈斌
 *@20151105
 *@【同步】获取cookies中的值并返回用户Mid和密码
 */
exports.GetCookies = function(req) {
    var result; //返回结果
    //获取cookies内容
    var getcookie = req.cookies[config.cookieName_Member];
    if (getcookie != undefined) {
        var cookie = JSON.parse(getcookie);
        //获取cookies中的id和密码
        var id = cookie.Mid;
        //获取cookies中存的密码
        var cookies_pwd = cookie.Passwd;
        var pwd = ""; //用来存cookies中获取的密码
        //判断密码长度
        if (cookies_pwd.length - 48 <= 0) {
            for (var i = 0; i < (cookies_pwd.length - 32); i++) {
                pwd = pwd + cookies_pwd.substring(config.cookies_key[i] + i - 1, config.cookies_key[i] + i);
            }
        } else {
            for (var i = 0; i < (cookies_pwd.length - 32); i++) {
                pwd = pwd + cookies_pwd.substring(config.cookies_key[i] + i - 1, config.cookies_key[i] + i);
            }
            pwd = pwd + cookies_pwd.substr(48, cookies_pwd.length)
        }
        result = "{\"Mid\":\"" + id + "\",\"Passwd\":\"" + pwd + "\"}";
    } else {
        result = "{\"Mid\":\"\",\"Passwd\":\"\"}";
    }

    return result;
}


/*
 *@ 高京
 *@ 20151106
 *@【异步】发送邮件
 *@ Subject：主题
 *@ isHtml：true-使用HTML格式(HtmlBody) false-使用纯文本格式(Body，不推荐)
 *@ Body：纯文本格式内容
 *@ HtmlBody：HTML格式内容，要有<html><body></body></html>
 *@ FromName：发件人名称
 *@ MailTo：收件人。多个用逗号分隔
 *@ Bcc：秘密抄送。数组。
 *@ Reply：回复地址。
 *@ callback_success(err)：回调方法。正确发送时，err="success"
 *@ 调用示例：
    var dt = new Date();
    var Subject = "邮件" + func.dateFormat(dt, "yyyymmdd-HHMMss");
    var isHtml = true;
    var Body = "纯文本测试";
    var HtmlBody = "<html><body><div>过年好啊~~~~" + func.dateFormat(dt, "yyyymmdd-HHMMss") + "</div></body></html>";
    var FromName = "第三板投融圈";
    var MailTo = "gaojing@sub-h.cn,gaoguimin@sub-h.cn";
    var Bcc = ["gao-jing@yeah.net", "9948686@qq.com"];
    var Reply = "gaojing@topu.net";
    var callback_success = function(err) {
        console.log("\n416:");
        console.log(err);
    };
    func.MailSend(Subject, isHtml, Body, HtmlBody, FromName, MailTo, Bcc, Reply, callback_success)
 */
exports.MailSend = function(Subject, isHtml, Body, HtmlBody, FromName, MailTo, Bcc, Reply, callback_success) {

    config.updateMailServer(function() {

        var auth = {
            user: config.mail_server.split('|')[0],
            pass: config.mail_server.split('|')[1]
                // user: "x3b_net_cn@qq.com",
                // pass: "gpcockjwysqkddia"
                //pass:"x3bnetcn123456"
                // user: "x3b_net_cn_www@sina.com",
                // pass: "x3b_net_cn123456"
                // user: "x3b_net_cn@sohu.com",
                // pass: "x3b_net_cn123456"
                // user: "x3b_net_cn@yahoo.com",
                // pass: "x3bnetcn123456"
        }

        var transporter = nodemailer.createTransport({
            host: 'smtp.sina.com',
            secure: true,
            port: 465,
            auth: auth
        });

        transporter = nodemailer.createTransport({
            service: 'qq',
            auth: auth
        })

        if (isHtml)
            Body = "";
        else
            HtmlBody = "";

        var mailOptions = {
            // from: config.mail_server.split('|')[0],
            from: FromName + "<" + auth.user + ">",
            // from:auth.user,
            replyTo: FromName + "<" + Reply + ">",
            // replyTo: FromName + "<" + auth.user + ">",
            to: MailTo,
            bcc: Bcc,
            subject: Subject,
            text: Body,
            html: HtmlBody
        };
        transporter.sendMail(mailOptions, function(error) {
            // console.log("\nfunc 934:");
            // console.log(error);
            if (error)
                callback_success(error);
            else
                callback_success("success");
        });

    });
}


/*
 *@ 高京
 *@ 20151112
 *@【同步】遮盖姓名，两边各留一个字。返回新字符串
 *@ str：原字符串
 *@ mask：遮盖字符
 *@ length：遮盖字符出现最长次数
 */
exports.NameMask = function(str, mask, length) {
    var c = str.length;
    var i = 0;
    if (c < 2)
        return str;
    var _str = str.substring(0, 1);
    if (c == 2)
        return _str + mask;
    for (; i < c - 2 && i < length; i++) {
        _str += mask;
    }
    return _str + str.substring(c - 1, c);
}

/*
 *@ 高京
 *@ 20151112
 *@【同步】遮盖手机，根据length决定两边留几位，最少各留一位。返回新字符串
 *@ str：原字符串
 *@ mask：遮盖字符
 *@ length：遮盖字符出现最长次数
 */
exports.MobileMask = function(str, mask, length) {
    var c = str.length;
    var i = 0;
    if (c < length + 2)
        return str;
    var diff = parseInt((c - length) / 2);
    var _str = str.substring(0, diff);

    for (; i < length; i++) {
        _str += mask;
    }
    _str += str.substring(diff + length, c);

    return _str;
}

/*
 *@ 高京
 *@ 20151113
 *@【同步】图片缩放（不支持定高不定宽）、水印。返回ERROR或SUCCESS
 *@ originalImagePath：源图片路径。注意根目录的写法为：./01.jpg
 *@ outputPath：输出图片路径。要包含后缀，如：./01_output.jpg
 *@ width：宽。0为不缩放
 *@ height：高。0为按比例缩放。不为0时，可能会变形
 */
exports.MakeThumb = function(originalImagePath, outputPath, _width, _height) {
    try {
        var img = images(originalImagePath);

        if (_width != 0) {
            if (_height == 0)
                img = img.resize(_width);
            else
                img = img.resize(_width, _height);
        }

        img.save(outputPath);
        return "SUCCESS";
    } catch (e) {
        return e;
    }
}

/*
 *@ 高京
 *@ 20151120
 *@【同步】格式化Textarea输入的字符串，替换空格和回车（注意用<%- %>输出。返回字符串
 *@ str：要格式化的字符串
 */
exports.formatTextArea = function(str) {
        return str.replace(/\n/g, "<br />").replace(/\s\s/g, "&nbsp;&nbsp;");
    }
    /*
     *@ 高京
     *@ 20160417
     *@【同步】获取网址的二级域名
     */
exports.get_domain = function(req) {
    var domain = "";
    var hostname = req.hostname.toLowerCase();
    var end = hostname.indexOf("." + func.domain);
    if (end == -1) // 无二级域名
        domain = "www";
    else
        domain = hostname.substring(0, end);
    return domain;
}

/*
 *@ 高京
 *@ 20160417
 *@【同步】根据第一个数组中的值匹配，取出第二个数组中相对应位置的值。
 *@ arr_source：源数组
 *@ match：匹配值
 *@ arr_target：目标数组
 */
exports.arr_value_match = function(arr_source, match, arr_target) {
    return arr_target[arr_source.indexOf(match)];
};

/*
 *@陈斌
 *@20150304
 *@【同步】给图片添加水印
 *@ watermarkImg_src:水印图片路径
 *@ sourceImg_src:待加水印图片路径
 *@ savePath_src:图片保存路径
 *@ left:水印图片相对于待加水印图片左边的距离(left,top若其中任意一个不传，则默认水印添加在右下方距离底部10px,距离右边10px的位置)
 *@ top:水印图片相对于待加水印图片上方的距离
 */
exports.AddWatermark = function(watermarkImg_src, sourceImg_src, savePath_src, left, top) {
    var watermarkImg = images(path.join(__dirname, watermarkImg_src));
    var sourceImg = images(path.join(__dirname, sourceImg_src));
    var savePath = path.join(__dirname, savePath_src + "/" + Date.now() + ".jpg");

    var sWidth = sourceImg.width();
    var sHeight = sourceImg.height();
    var wmWidth = watermarkImg.width();
    var wmHeight = watermarkImg.height();
    if (left == null || left == "" || top == null || top == "") {
        left = sWidth - wmWidth - 10;
        top = sHeight - wmHeight - 10;
    }

    images(sourceImg)
        // 设置绘制的坐标位置，右下角距离 10px
        .draw(watermarkImg, left, top)
        // 保存格式会自动识别
        .save(savePath);
}
