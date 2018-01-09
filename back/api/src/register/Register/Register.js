import TableName from './../../../../tables';
import AWS from 'aws-sdk';
import blizzardGetChar from './../blizzard/blizzardGetChar';
import Phone from './../../helpers/authorization/Phone/Phone';
import Login from './../../helpers/authorization/Login/Login';
import CreateUser from './../CreateUser/CreateUser'
import idGenerator from './../../helpers/idGenerator/idGenerator';
import moment from 'moment';
import ServerlessSettings from './../../../../settingsSeverless';


class Register {

    constructor() {
        this.db = new AWS.DynamoDB.DocumentClient();
        this.smsMsg = ServerlessSettings.smsTemplates.register;
    }

    getGuildByToken(token) {
        return new Promise((resolve, reject) => {
            let params = {
                "TableName": TableName.guild,
                "IndexName": "token",
                "KeyConditionExpression": "registrationToken = :token",
                "ExpressionAttributeValues": {
                    ":token": token,
                },
                "Limit": "1",
            }
            this.db.query(params).promise().then((data) => {
                if (data.Count) {
                    resolve({ id: data.Items[0].id, guild: data.Items[0].name, server: data.Items[0].server })
                } else {
                    reject({ exists: false });
                }
            }).catch(reject)
        })
    }



    getChar(charName, token) {
        return new Promise((res, rej) => {
            this.getGuildByToken(token).then((guildData) => {
                blizzardGetChar(charName, guildData.server).then((blizzardData) => {
                    res({ exists: true, charName: blizzardData.charName });
                }).catch(rej)
            }).catch(rej)
        })
    }

    sendSMS(guildToken, charName, phone, ip) {
        return new Promise((res, rej) => {
            this.getGuildByToken(guildToken).then((guildData) => {
                blizzardGetChar(charName, guildData.server).then((blizzardData) => {
                    let p = new Phone();
                    let sms = this.smsMsg.replace(":::charName:::", charName);
                    p.sendSmsToken(phone, sms, ip).then(data => {
                        res({ ok: true })
                    }).catch(rej)
                }).catch(rej)
            }).catch(rej)
        })
    }

    /* istanbul ignore next */
    consumeSms(guildToken, charName, phoneToken, phone, ip) {
        return new Promise((res, rej) => {
            this.getGuildByToken(guildToken).then((guildData) => {
                blizzardGetChar(charName, guildData.server).then((blizzardData) => {
                    let p = new Phone();
                    p.consumeSmsToken(phone, phoneToken, ip).then(phoneData => {
                        let createUser = new CreateUser();
                        createUser.saveChar(guildData.id,
                            phoneData.phone,
                            blizzardData.charName,
                            blizzardData.charClass,
                            blizzardData.charType
                        ).then(userData => {
                            let l = new Login();
                            l.loginUser(userData.id).then(res).catch(rej);;
                        }).catch(rej);
                    }).catch(rej);
                }).catch(rej);
            }).catch(rej);
        })
    }
}

export default Register;