/*
 *马龙君
 *20151021
 *验证码路由文件
 */
var express = require('express');
var router = express.Router();
var config = require('../handle/config.js');
var func = require('../handle/functions.js');
var ccap = require("ccap");
var http = require('http');
//var captchapng = require('captchapng');




router.get("/create", function(req, res, next) {
    ////宽度
    //var width = 102;
    ////高度
    //var height = 40;
    ////随机数
    //var Random = parseInt(Math.random() * 9000 + 1000)

    ////var p = new captchapng(width, height, Random); // width,height,numeric captcha 
    //p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
    //p.color(180, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    //var img = p.getBase64();
    //var imgbase64 = new Buffer(img, 'base64');
    //res.writeHead(200, {
    //    'Content-Type': 'image/png'
    //});
    //req.session.captcha = Random;
    //res.end(imgbase64);

    var obj = {
        width: req.query.width ? req.query.width : 180,
        height: req.query.height ? req.query.height : 50,
        offset: req.query.offset ? req.query.offset : 0,
        quality: req.query.quality ? req.query.quality : 100,
        fontsize: req.query.fontsize ? req.query.fontsize : 40,
        randomCount: req.query.randomCount ? req.query.randomCount : 4,
        randomKind: req.query.randomKind ? req.query.randomKind : 4
    }


    var ccap_obj = ccap({

        width: obj.width, //set width,default is 256

        height: obj.height, //set height,default is 60

        offset: obj.offset, //set text spacing,default is 40

        quality: obj.quality, //set pic quality,default is 50

        fontsize: obj.fontsize, //set font size,default is 57

        generate: function() { //Custom the function to generate captcha text

            var text = func.CreateRandomStr(obj.randomCount, obj.randomKind,"O");

            return text; //return the captcha text

        }

    });

    var arr = ccap_obj.get();

    // console.log("captcha:" + arr[0]);
    //存session
    req.session.captcha = arr[0];
    res.end(arr[1]);
});




module.exports = router;
