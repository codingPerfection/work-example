(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 354);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var siteUrl = "http://impbots.com/";
var stage = 'v02';

var s = {
    siteUrl: siteUrl,
    registerUrl: siteUrl + "register/",
    attendUrl: siteUrl + "a/",
    version: 'attendBot-' + stage + '-',
    smsSettings: {
        //ttl in seconds
        smsSend: {
            ttl: 600,
            maxActive: 3
        },
        smsConsume: {
            ttl: 600,
            maxActive: 10
        }
    }
};

s.smsTemplates = {
    register: "Hi :::charName:::. Your impbots registration token is :::token:::",
    login: "Hi :::charName:::. Your impbots login token is :::token:::",
    attend: "Hi :::charName:::. Are you coming to raid? confirm here: " + s.attendUrl + ":::attendCode:::"
};

s.apiVersion =
/* istanbul ignore next */
function () {
    return stage;
};

s.apiCORS =
/* istanbul ignore next */
function () {
    return true;
};

s.cronVersion =
/* istanbul ignore next */
function () {
    return stage;
};

s.getVersion =
/* istanbul ignore next */
function () {
    return s.version;
};

module.exports = s;

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tables = __webpack_require__(8);

var _tables2 = _interopRequireDefault(_tables);

var _awsSdk = __webpack_require__(9);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User() {
        _classCallCheck(this, User);

        this.roles = ['dps', 'tank', 'healer'];
        this.dbDoc = new _awsSdk2.default.DynamoDB.DocumentClient();
    }

    _createClass(User, [{
        key: 'roleChange',
        value: function roleChange(userId, guildId, charType) {
            var _this = this;

            return new Promise(function (res, rej) {
                //must be valid role
                var found = _this.roles.find(function (r) {
                    return r === charType;
                });
                if (!found) {
                    rej({ invalidRole: charType });
                    return null;
                }

                var params = {
                    TableName: _tables2.default.user,
                    Key: { id: userId },
                    UpdateExpression: 'set  charType = :charType ',
                    ConditionExpression: 'guildId = :guildId',
                    ExpressionAttributeValues: {
                        ':charType': charType,
                        ':guildId': guildId
                    }
                };
                _this.dbDoc.update(params).promise().then(res).catch(rej);
            });
        }
    }, {
        key: 'deleteUser',
        value: function deleteUser(userId, guildId) {
            var _this2 = this;

            return new Promise(function (res, rej) {
                var params = {
                    TableName: _tables2.default.user,
                    Key: {
                        id: userId
                    },
                    ConditionExpression: 'guildId = :guildId',
                    ExpressionAttributeValues: {
                        ':guildId': guildId
                    }
                };
                _this2.dbDoc.delete(params).promise().then(res).catch(rej);
            });
        }
    }, {
        key: 'getAllForGuild',
        value: function getAllForGuild(guildId, removePhone) {
            var _this3 = this;

            return new Promise(function (res, rej) {
                _this3.dbDoc.query({
                    "TableName": _tables2.default.user,
                    "IndexName": "guild",
                    "KeyConditionExpression": "guildId = :id ",
                    "ExpressionAttributeValues": {
                        ":id": guildId
                    },
                    "Limit": "100"
                }).promise().then(function (usersData) {
                    if (removePhone) {
                        res(usersData.Items.map(function (u) {
                            u.phone = null;
                            return u;
                        }));
                    } else {
                        res(usersData.Items);
                    }
                }).catch(rej);
            });
        }

        //gets guild name and tells if user is manager

    }, {
        key: 'getGuild',
        value: function getGuild(userId, guildId) {
            var _this4 = this;

            return new Promise(function (res, rej) {
                var queryParams = {
                    "TableName": _tables2.default.guild,
                    "KeyConditionExpression": "id = :id",
                    "ExpressionAttributeValues": {
                        ":id": guildId
                    },
                    "Limit": "1"
                };
                _this4.dbDoc.query(queryParams).promise().then(function (data) {
                    var guild = data.Items[0];
                    var isManager = guild.managerId === userId;
                    res({ guild: guild.name, isManager: isManager, id: guild.id });
                }).catch(rej);
            });
        }
    }, {
        key: 'getUserSettings',
        value: function getUserSettings(userId) {
            var _this5 = this;

            return new Promise(function (res, rej) {
                var queryParams = {
                    "TableName": _tables2.default.user,
                    "KeyConditionExpression": "id = :id",
                    "ExpressionAttributeValues": {
                        ":id": userId
                    },
                    "Limit": "1"
                };
                _this5.dbDoc.query(queryParams).promise().then(function (data) {
                    var user = data.Items[0];
                    _this5.getGuild(userId, user.guildId).then(function (guildData) {
                        res({ user: user, guild: guildData });
                    }).catch(rej);
                }).catch(rej);
            });
        }
    }]);

    return User;
}();

exports.default = User;

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tables = __webpack_require__(8);

var _tables2 = _interopRequireDefault(_tables);

var _awsSdk = __webpack_require__(9);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _User = __webpack_require__(139);

var _User2 = _interopRequireDefault(_User);

var _settingsSeverless = __webpack_require__(11);

var _settingsSeverless2 = _interopRequireDefault(_settingsSeverless);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Guild = function () {
    function Guild() {
        _classCallCheck(this, Guild);

        this.dbDoc = new _awsSdk2.default.DynamoDB.DocumentClient();
    }

    _createClass(Guild, [{
        key: 'attendance',
        value: function attendance(guildId, isManager) {
            return new Promise(function (res, rej) {
                var u = new _User2.default();
                u.getAllForGuild(guildId, true).then(function (users) {
                    var edited = users.map(function (u) {
                        Object.keys(u.attendance).forEach(function (key) {
                            u[key] = u.attendance[key];
                        });
                        if (isManager) {
                            u.editable = true;
                        } else {
                            u.editable = false;
                        }
                        return u;
                    });
                    res(edited);
                }).catch(rej);
            });
        }
    }, {
        key: 'inviteCode',
        value: function inviteCode(guildId) {
            var _this = this;

            return new Promise(function (res, rej) {
                var params = {
                    TableName: _tables2.default.guild,
                    KeyConditionExpression: 'id = :id',
                    ExpressionAttributeValues: {
                        ':id': guildId
                    }
                };
                _this.dbDoc.query(params).promise().then(function (data) {
                    var token = data.Items[0].registrationToken;
                    res({ url: _settingsSeverless2.default.registerUrl + token });
                }).catch(rej);
            });
        }
    }]);

    return Guild;
}();

exports.default = Guild;

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Guild = __webpack_require__(338);

var _Guild2 = _interopRequireDefault(_Guild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.f = function (event, context, callback) {

    var err = function err(_err) {
        callback("error fetching data");
    };

    var success = function success(data) {
        var response = {
            statusCode: 200,
            body: JSON.stringify(data)
        };
        callback(null, response);
    };

    var authorizer = JSON.parse(event.requestContext.authorizer.json);

    var guildId = authorizer.guildId;

    var g = new _Guild2.default();
    g.inviteCode(guildId).then(success).catch(err);
};

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var version = __webpack_require__(11).version;

module.exports = {
    guild: version + 'guild',
    smsToken: version + 'smsToken',
    smsConsume: version + 'smsConsume',
    idGenerator: version + 'idGenerator',
    user: version + 'user',
    loginToken: version + 'loginToken',
    event: version + 'event',
    eventCron: version + 'eventCron',
    eventClass: version + 'eventClass',
    attendCode: version + 'attendCode',
    attend: version + 'attend'
};

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ })

/******/ })));