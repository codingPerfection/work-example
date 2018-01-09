//runs at localhost:80 atm
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var router = express.Router();
var port = 3006;
var path = require('path')


let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
app.use(allowCrossDomain);


router.use(bodyParser.json());

//start web part


let files = fs.readdirSync(__dirname + '/desktop')

files.forEach(file => {
    let moduleName = file.split('.')[0];
    let singleRouteRouter = express.Router();
    var singleRouteSettings = require('./desktop/' + moduleName);

    //if it is input for route from settings give output from settings else give ok:false
    Object.keys(singleRouteSettings).forEach(function (routeName) {
        let route = singleRouteSettings[routeName];
        Object.keys(route).forEach((methodName) => {
            let method = route[methodName];
            singleRouteRouter[methodName](routeName, (req, res) => {
                //find if there is correct input
                let io = method.find(io => {
                    let validInput = true;
                    Object.keys(io.input).forEach((key) => {
                        //request needs authorization it is in header
                        if (key == "authorization") {
                            if (req.get("authorization").split(" ")[1] != io.input[key]) {
                                validInput = false;
                            }
                            //req needs no authorization
                        } else {
                            if (io.input[key] != req.body[key] && io.input[key] != req.params[key]) {
                                validInput = false;
                            }
                        }

                    })
                    return validInput;
                });
                if (io) {
                    res.json(io.output);
                } else {
                    res.json({ ok: false });
                }
            });
        })
    }, this);


    router.use('/' + moduleName, singleRouteRouter);
});

app.use(router);


let isUp = new Promise((resolve, reject) => {
    app.listen(port, function () {
        console.log("index.js Node app is running at localhost:" + port);
        resolve();
    })
});

module.exports = isUp;



