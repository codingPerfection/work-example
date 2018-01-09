process.env.NODE_ENV = 'test'
// Register babel so that it will transpile ES6 to ES5 before our tests run.
var babel = require('babel-register')();
var babelPolyfill = require("babel-polyfill");
var credentials = require('./../awsCredentials');
var AWS = require('aws-sdk');
var TableName = require('./tables');

AWS.config.update(credentials);

global.db = new AWS.DynamoDB.DocumentClient();

//raise the limits of sending sms and consuming sms
let serverlessSettings = require('./settingsSeverless');
serverlessSettings.smsSettings.smsConsume.maxActive = 1000;
serverlessSettings.smsSettings.smsSend.maxActive = 300;

global.login = (guildId, userId, loginToken, isManager) => {
    return new Promise((res, rej) => {
        let managerId = isManager ? userId : userId + 1;
        //insert guild
        global.db.put({
            TableName: TableName.guild,
            Item: {
                registrationToken: '111',
                id: guildId,
                name: 'Renascentia',
                created: 1,
                server: 'EU/argent-dawn',
                faction: 'horde',
                managerId: managerId,
            }
        }).promise().then((data) => {
            //insert user
            global.db.put({
                TableName: TableName.user,
                Item: {
                    id: userId,
                    phone: '+385989411056',
                    guildId: guildId,
                    created: 1,
                    charName: "Ralgioro",
                    charClass: "hunter",
                    charType: "dps",
                    attendance: {
                        no: 0,
                        yes: 0,
                        pending: 0,
                        late: 0,
                        lateTime: 0,
                    }
                }
            }).promise().then(data => {
                //insert loginToken
                global.db.put({
                    TableName: TableName.loginToken,
                    Item: {
                        token: userId + "---" + loginToken,
                        created: 1,
                    }
                }).promise().then(data => {
                    res({
                        requestContext: {
                            authorizer: {
                                json: {
                                    guild: "test",
                                    guildId: guildId,
                                    isManager: isManager,
                                    userId: userId,
                                    charName: "Ralgioro"
                                }
                            }
                        }
                    })
                }).catch(rej);
            }).catch(rej);
        }).catch(rej);
    });
};

global.parseAuthorizer = (event, data) => {
    let authorizer = Object.assign({}, event.requestContext.authorizer.json, data);
    let copyEvent = JSON.parse(JSON.stringify(event))
    copyEvent.requestContext.authorizer.json = JSON.stringify(authorizer);
    return copyEvent;
}


