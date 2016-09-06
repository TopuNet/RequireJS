/*
 *高京
 *2016-04-29
 *所有页面路由
 */
var express = require('express');
var router = express.Router();
var config = require('../handle/config.js');
var func = require('../handle/functions.js');

//首页
router.get("/", function(req, res, next) {

    res.render("../views/index.html", {
        "common": "首页 - 元吉官网",
        "menu": "1"
    });
});

//关于我们
router.get("/AboutUs", function(req, res, next) {
    res.render("../views/about.html", {
        "common": "关于我们 - 元吉官网",
        "menu": "2"
    });
});

//旗下产品
router.get("/Product", function(req, res, next) {
    res.render("../views/product.html", {
        "common": "旗下产品 - 元吉官网",
        "menu": "3"
    });
});

//商务合作
router.get("/Cooperate", function(req, res, next) {

    res.render("../views/business.html", {
        "common": "商务合作 - 元吉官网",
        "menu": "4"
    });
});

//常见问题
router.get("/QA", function(req, res, next) {
    res.render("../views/problem.html", {
        "common": "常见问题 - 元吉官网",
        "menu": "5"
    });
});

//联系我们
router.get("/ContactUs", function(req, res, next) {
    res.render("../views/contact.html", {
        "common": "联系我们 - 元吉官网",
        "menu": "6"
    });
});

//加入我们
router.get("/JoinUs", function(req, res, next) {
    res.render("../views/join_us.html", {
        "common": "加入我们 - 元吉官网",
        "menu": "7"
    });
});

/*
 *@陈斌
 *@20150429
 *@判断验证码是否正确
 */
router.post('/ValidateCode', function(req, res, next) {

    //获取要验证的验证码 
    var VerificationCode = req.body["Code"];
    //验证码验证
    try {
        if (req.session.captcha.toLowerCase() == VerificationCode.toLowerCase()) {
            res.send("ok");
            return;
        } else {
            res.send("false");
            return;
        }
    } catch (e) {
        res.send("false");
        return;
    }
});

/*
 *@陈斌
 *@20150429
 *@接收商务合作内容
 */
router.post('/Cooperate/Apply', function(req, res, next) {

    //用户输入的公司名字 
    var Company = req.body["Company"];
    //用户输入的公司名字 
    var Tel = req.body["Tel"];
    //用户输入的公司名字 
    var Linkman = req.body["Linkman"];
    //用户输入的公司名字 
    var Email = req.body["Email"];
    var json_send = func.JsonUnicode({
        "Company": Company,
        "Tel": Tel,
        "Linkman": Linkman,
        "Email": Email
    });
    json_str = JSON.stringify(func.JsonEscape(json_send));
    //var json_str = func.JsonUnicode("{\"Company\":\"" + Company + "\",\"Tel\":\"" + Tel + "\",\"Linkman\":\"" + Linkman + "\",\"Email\":\"" + Email + "\"}";
    
    var json = JSON.parse(json_str);
    func.DoREST(config.sendhost, config.sendport, "/yuanjiashx/email.ashx", "Post", json, function (data) {
        res.send(data[0].result);
    }, function (data) {
        res.send(data[0].result);
    });
});

module.exports = router;
