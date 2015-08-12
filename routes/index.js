var express = require('express');
var router = express.Router();
var wechat = require('wechat-enterprise-api');
var wc = require('./wechat');
var api = new wechat(wc.corpid, wc.corpsecret, 10);

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
                "url": "URL",
                "picurl": ""
            }
        ]
    },
    "safe": "0"
};

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
    message.news.articles[0].title = "Matrix Push Log";
    message.news.articles[0].description = req.body.head_commit.author.name + ': ' + req.body.head_commit.message;
    message.news.articles[0].url = req.body.compare;

    api.send(to, message, function (err, data, res) {
        if (err) throw err;
    });
});

module.exports = router;
