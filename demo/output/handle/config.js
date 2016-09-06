/*
 *@ 高京
 *@ 20150824 
 *@ 全局配置文件，添加属性的话，请先确认没有功能类同的属性存在
 */
var express = require("express");
var multer = require("multer");
var func = require("./functions.js");
var uuid = require('node-uuid');
var config = require('./config.js');
var fs = require('fs'); //文件操作模块，updateMember用


exports.session_secret = "6a8g6k7w2b9h1n8v"; //session密钥

//exports.host = "192.168.1.58"; //接口调用主机地址（本地测试）
//exports.port = 8122; //端口号
exports.host = "www.51icb.com"; //接口调用主机地址(网上)
exports.port = 80; //端口号

exports.sendhost = "business.51icb.com"; //发送邮件接口调用主机地址(网上)
exports.sendport = 80; //端口号

exports.js_version = "0714"; // JS版本号，MMdd


// exports.cookieName_Member = "TouRongQuan2015_Member"; //登录用的cookie名称
// exports.cookies_key = [2, 5, 6, 8, 9, 10, 11, 15, 16, 17, 18, 19, 20, 22, 25, 29]; //从cookies中取出密码的16位秘钥数组(内部值不能大于32,且从小到大排序)
// exports.cookies_str = "6a8g6k7w2b9h1n8v6a8g6k7w2b9h1n8v"; //定义在cookies中为密码加密的32位随机变量

exports.ImageDomain = "http://www.51icb.com/b/"; //数据库中读取的图片的域名前缀

/*
 *@ 陈斌
 *@ 20160301
 *@ 页面公用绑定参数，更新方法：config.GetCommon(callback_success)
 */
exports.Common = {
        seo: null,
        footer: null,
        menu: null
    }
    /*
     *@ 陈斌
     *@ 20160301
     *@ 【同步】获得页面公用参数
     *@ ieTitle_ex：不为空时，config.Common.seo返回ieTitle_ex - config.seo.ieTitle；否则config.Common.seo返回config.seo.ieTitle
     *@ seoKeywords：不为空时config.Common.seo返回seoKeywords；否则config.Common.seo返回config.seo.seoKeywords
     *@ seoDescription：不为空时config.Common.seo返回seoDescription；否则config.Common.seo返回config.seo.seoDescription
     *@ menu:菜单栏高亮显示的部分,默认为首页高亮
     */
exports.GetCommon = function(ieTitle_ex, seoKeywords, seoDescription, menu) {

    var arr = [config.Common.seo, config.Common.footer, config.Common.menu];
    arr[0] = config.Common.seo = config.getSEO(ieTitle_ex, seoKeywords, seoDescription);
    arr[1] = config.Common.footer = config.footer;
    if (menu == null || menu == "") {
        menu = 1;
    }
    arr[2] = config.Common.menu = menu;
    return arr;
}







/*
 *@ 陈斌
 *@ 20160311
 *@ Advertise，异步更新方法：config.updateAdvertise(callback_success)
 */
exports.Advertise = null; //(Advertise)


/*
 *@ 高京
 *@ 20151106
 *@ 发送邮件服务器信息 [QQ邮箱账号,密码]，异步更新方法：config.updateMailServer(callback_success)
 */
exports.mail_server = null; //(Init)

/*
 *@ 高京
 *@ 20151106
 *@ 信息反馈接收邮箱，异步更新方法：config.updateMailReceive(callback_success)
 */
exports.mail_receive = null; //(Init)


/*
 *@ 高京
 *@ 20151029
 *@ seo缓存，异步更新方法：config.updateSEO(callback_success)
 */
exports.seo = {
    ieTitle: null, //标题 - 副标题(Init)
    seoKeywords: null, //关键字(Init)
    seoDescription: null //描述(Init)
};


/*
 *@ 高京
 *@ 20151029
 *@ 【同步】获得seo绑定，返回数组{ieTitle,seoKeywords,seoDescription}
 *@ ieTitle_ex：不为空时，返回ieTitle_ex - config.seo.ieTitle；否则返回config.seo.ieTitle
 *@ seoKeywords：不为空时返回seoKeywords；否则返回config.seo.seoKeywords
 *@ seoDescription：不为空时返回seoDescription；否则返回config.seo.seoDescription
 */
exports.getSEO = function(ieTitle_ex, seoKeywords, seoDescription) {

    var arr = [config.seo.ieTitle, config.seo.seoKeywords, config.seo.seoDescription];

    if (ieTitle_ex != undefined && ieTitle_ex != "")
        arr[0] = ieTitle_ex + " - " + config.seo.ieTitle;
    if (seoKeywords != undefined && seoKeywords != "")
        arr[1] = seoKeywords;
    if (seoDescription != undefined && seoDescription != "")
        arr[2] = seoDescription;

    return arr;
}


/*
 *@ 高京
 *@ 20151029
 *@ 【异步】更新SEO缓存
 */
exports.updateSEO = function(callback_success) {

    var n = 0;
    var updating = function() {
        if (++n < 1)
            return;
        callback_success();
    };

    var updateSEO_Init = function() {

        if (config.seo.ieTitle != null) {
            updating();
            return;
        }

        var Json_Params = func.JsonUnicode({
            "s_not_Iid": ""
        });
        var ParamsJsonObj_str = JSON.stringify(Json_Params);
        ParamsJsonObj_str = ParamsJsonObj_str.replace("}{", ",");
        var ParamsJsonObj = JSON.parse(ParamsJsonObj_str);
        //生成签名
        func.CreateTopuSignature(ParamsJsonObj, function(sign_valid) {

            var ajax_para_str = "{ \"params\": " + JSON.stringify(func.JsonEscape(Json_Params)) + " , \"sign_valid\": " + sign_valid + " }";

            var ajax_para = JSON.parse(ajax_para_str);

            // 调用接口
            func.DoREST(config.host, config.port, "/Handler/Init.ashx?act=select_list" + "&r=" + Math.random(), "POST", ajax_para, function(data) {
                if (data.error == "SUCCESS" || data.error == "success") {
                    config.seo.ieTitle = data.list[0].Iinfo + " - " + data.list[2].Iinfo;
                    config.seo.seoKeywords = data.list[3].Iinfo;
                    config.seo.seoDescription = data.list[4].Iinfo;
                } else {
                    console.log("\n updateSEO_Init:" + JSON.stringify(data));
                }
                updating();
            }, function(e) {
                console.log("\n updateSEO_Init:" + e);
                updating();
            });
        });
    };

    updateSEO_Init();
};

/*
 *@ 陈斌
 *@ 20160229
 *@ footer缓存，异步更新方法：config.updateFooter(callback_success)
 */
exports.footer = {
    channel: null //购买渠道
        ,
    WeChat: null //微信
        ,
    weibo: null //5-新浪微博
};


/*
 *@ 陈斌
 *@ 20150229
 *@ 【异步】更新footer缓存
 */
exports.updateFooter = function(callback_success) {
    var n = 0;
    var _i;

    var updating = function() {
        if (++n < 2)
            return;
        callback_success();
    };

    var updateFooter_Article = function() {

        var Json_Params = func.JsonUnicode({
            "s_Aid": "",
            "s_Alive": "1",
            "s_d1": "",
            "s_d2": "",
            "s_Keywords": "",
            "s_Kind": "52",
            "s_Order": ""
        });
        var Json_Pages = func.JsonUnicode({
            "p_c": "",
            "p_First": "",
            "p_inputHeight": "",
            "p_Last": "",
            "p_method": "",
            "p_Next": "",
            "p_Page": "1",
            "p_pageName": "",
            "p_PageStyle": "",
            "p_Pname": "",
            "p_Previous": "",
            "p_Ps": "5",
            "p_sk": "",
            "p_Tp": ""
        });


        var ParamsJsonObj_str = JSON.stringify(Json_Params);
        var ParamsJsonObj = JSON.parse(ParamsJsonObj_str);
        //生成签名
        func.CreateTopuSignature(ParamsJsonObj, function(sign_valid) {
            var ajax_para_str = "{ \"params\": " + JSON.stringify(func.JsonEscape(Json_Params)) + ", \"pages\": " + JSON.stringify(func.JsonEscape(Json_Pages)) + " , \"sign_valid\": " + sign_valid + " }";

            var ajax_para = JSON.parse(ajax_para_str);
            //调用接口
            func.DoREST(config.host, config.port, "/Handler/Article.ashx?act=select_list" + "&r=" + Math.random(), "POST", ajax_para, function(data) {
                if (data.error == "SUCCESS" || data.error == "success") {

                    config.footer.channel = data.list;

                } else {
                    console.log("\n updateFooter_Article:" + JSON.stringify(data));
                }
                updating();
            }, function(e) {
                console.log("\n updateFooter_Article_e:" + e);
                updating();
            });

        });
    };


    var updateFooter_Advertise = function() {

        if (config.footer.Rcode != null) {
            updating();
            return;
        }

        config.updateAdvertise(function() {
            config.footer.WeChat = config.Advertise[3].Pic1;
            config.footer.weibo = config.Advertise[4].Url;
            updating();
        });
    };

    updateFooter_Article();
    updateFooter_Advertise();
};


/*
 *@ 高京
 *@ 20150911
 *@【同步】设定multer上传目录及规则
 */
exports.multer_diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "UploadFile/temp/");
    },
    filename: function(req, file, cb) {
        var ext = func.GetExtension(file.originalname);
        // var d = new Date().toLocaleDateString().replace(/-/g, "");
        // var r = func.CreateRandomStr(10, 1);
        // cb(null, d + "_" + r + "." + ext);
        var filename = uuid.v4();
        cb(null, filename + "." + ext);
    }
});
/*
 *@高京
 *@20150911
 *@【同步】设定multer文件过滤
 */
exports.multer_fileFilter = function(req, file, cb) {
    var ext = func.GetExtension(file.originalname).toLowerCase();
    if (ext == "jpg" || ext == "jpeg" || ext == "gif" || ext == "png" || ext == "bmp") {
        cb(null, true);
    } else {
        cb(null, false);
    }

};

/*
 *@ 陈斌
 *@ 20150229
 *@ 【异步】更新Advertise
 */
exports.updateAdvertise = function(callback_success) {

    var n = 0;

    var updating = function() {
        if (++n < 1)
            return;
        callback_success();
    };

    var updateAdvertise = function() {

        if (config.Advertise != null) {
            updating();
            return;
        }

        var Json_Params = func.JsonUnicode({
            "s_Aid": ""
        });

        var ParamsJsonObj_str = JSON.stringify(Json_Params);
        var ParamsJsonObj = JSON.parse(ParamsJsonObj_str);
        //生成签名
        func.CreateTopuSignature(ParamsJsonObj, function(sign_valid) {

            var ajax_para_str = "{ \"params\": " + JSON.stringify(func.JsonEscape(Json_Params)) + " , \"sign_valid\": " + sign_valid + " }";

            var ajax_para = JSON.parse(ajax_para_str);

            func.DoREST(config.host, config.port, "/Handler/Advertise.ashx?act=select_list" + "&r=" + Math.random(), "POST", ajax_para, function(data) {

                if (data.error.toLowerCase() == "success") {
                    config.Advertise = data.list;
                } else {
                    console.log("\n updateAdvertise:" + JSON.stringify(data));
                }
                updating();
            }, function(e) {
                console.log("\n updateAdvertise_e:");
                console.log(e);
                updating();
            });
        });
    };

    updateAdvertise();
};


/*
 *@ 陈斌
 *@ 20160311
 *@ Info
 */
exports.Info = null; //(Info)
