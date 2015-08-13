var express = require('express');
var router = express.Router();
var wechat = require('wechat-enterprise-api');
var wc = require('./wechat');
var api = new wechat(wc.corpid, wc.corpsecret, wc.productid);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Andrnode'});
});

/**
 *   响应diggzhang.github.io创建的webhook，该项目发生push事件后，
 *   发送post请求到http://XXXXX.com/webhooker路由中。
 *   webhook在github repo的settings里添加，参考github API指南。
 *
 *   路由响应后，shelljs执行相应shell命令
 *   shell.cd('/path/to/...')
 *   shell.exec('git pull')
 * */
router.post('/webhooker', function (req, res, next) {
	// WeChat Format
	// send to @all(alluser)
	var to = {
    	"touser": "@all"
	}
	// message
	var message = {
    	"msgtype": "news",
    	"news": {
        	"articles": [
            	{
                	"title": "Title",
                	"description": "Description",
                	"url": "",
                	"picurl": ""
            	}
        	]
    	},
    	"safe": "0"
	};

    message.news.articles[0].title = req.body.head_commit.author.name;
    message.news.articles[0].description = 'matrix git commit: ' + req.body.head_commit.message;

    api.send(to, message, function (err, data, res) {
        if (err) throw err;
    	console.log(req.body.head_commit.author.name + ' pushed.');
    });

});

module.exports = router;
