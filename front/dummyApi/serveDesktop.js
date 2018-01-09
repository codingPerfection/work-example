//runs at localhost:80 atm
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var router = express.Router();
var port = 3002;
var path = require('path')


let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
app.use(allowCrossDomain);


router.use(bodyParser.json());

console.log(__dirname + '/../desktop/build');

console.log(__dirname + '/../mobile/index.html');

//serve static desktop
app.use('/', express.static(path.join(__dirname + '/../desktop/build/')));


let isUp = new Promise((resolve, reject) => {
    app.listen(port, function () {
        console.log("index.js Node app is running at localhost:" + port);
        resolve();
    })
});

module.exports = isUp;



