var express = require('express');
var router = express.Router();
var shell = require('shelljs');

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
    res.render('index', {title: req.body.name});
    console.log(req.body.repository);
    console.log(req.body.repository.git_url);

    shell.cd('/home/master/Documents/androidPkg/');
    shell.exec('git pull');
    shell.exec("echo 'git pulling...'");
});

module.exports = router;
