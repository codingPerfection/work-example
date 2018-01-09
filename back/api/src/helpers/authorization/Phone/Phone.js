import TableName from './../../../../../tables';
import AWS from 'aws-sdk';
import moment from 'moment';
import randomize from 'randomatic';
import idGenerator from './../../idGenerator/idGenerator';
import settingsServerless from './../../../../../settingsSeverless';


class Phone {

    constructor() {
        this.dbDoc = new AWS.DynamoDB.DocumentClient();
        this.db = new AWS.DynamoDB();
        this.sns = new AWS.SNS({ region: 'eu-west-1' });
        this.tokenSettings = settingsServerless.smsSettings.smsSend;
        this.consumeSettings = settingsServerless.smsSettings.smsConsume;
    }

    standardizePhone(phone) {
        if (phone.substr(0, 2) == '00') {
            return '+' + phone.substr(2);
        } else {
            return phone;
        }
    }

    checkIfMaxRequestsReached(table, phone, maxActive) {
        return new Promise((res, rej) => {
            let current = moment.utc().unix();
            let params = {
                "TableName": table,
                "IndexName": "phone",
                "KeyConditionExpression": "phone = :phone",
                "ExpressionAttributeValues": {
                    ":phone": { "S": phone },
                    ":current": { "N": current.toString() }
                },
                "ExpressionAttributeNames": {
                    "#ttl": "ttl"
                },
                "FilterExpression": "#ttl > :current",
                "Limit": maxActive.toString(),
                "ScanIndexForward": false
            }
            this.db.query(params).promise().then(data => {
                if (data.Count < maxActive) {
                    res();
                } else {
                    rej({ limitReached: true });
                }
            }).catch(rej);
        })
    }

    /* istanbul ignore next */
    insertRequest(table, addTtl, phone, token, ip) {
        return new Promise((res, rej) => {
            idGenerator(table).then((id) => {
                let created = moment.utc().unix();
                let ttl = moment.utc().add(addTtl, 'seconds').unix();
                let params = {
                    TableName: table,
                    Item: {
                        id: id,
                        phone: phone,
                        token: token,
                        created: created,
                        ttl: ttl,
                        ip: ip
                    }
                }
                this.dbDoc.put(params).promise().then(data => {
                    res();
                }).catch(rej)
            }).catch(rej);
        })
    }

    /* istanbul ignore next */
    sendSmsToken(phone, smsMsg, ip) {
        return new Promise((res, rej) => {
            //check if max tokens active if it is reject request
            this.checkIfMaxRequestsReached(TableName.smsToken, phone, this.tokenSettings.maxActive).then((data) => {
                //generate token
                let token = randomize('0', 7);
                let standardPhone = this.standardizePhone(phone);
                //save request
                this.insertRequest(TableName.smsToken, this.tokenSettings.ttl, standardPhone, token, ip).then(data => {
                    let smsWithToken = smsMsg.replace(':::token:::', token);
                    let params = {
                        Message: smsWithToken,
                        PhoneNumber: standardPhone
                    };
                    this.sns.publish(params).promise().then(data => {
                        //resolve request
                        res({ ok: true });
                    }).catch(rej);
                }).catch(rej);
            }).catch(rej);
        })
    }

    /* istanbul ignore next */
    consumeSmsToken(phone, token, ip) {
        return new Promise((res, rej) => {
            //check if max requests for consume phone active if it is reject
            let trimmedToken = token.trim();
            let standardPhone = this.standardizePhone(phone);
            this.checkIfMaxRequestsReached(TableName.smsConsume, phone, this.consumeSettings.maxActive).then((data) => {
                //insert request
                this.insertRequest(TableName.smsConsume, this.consumeSettings.ttl, standardPhone, trimmedToken, ip).then(data => {
                    //check if token matches one of the active ones
                    let current = moment.utc().unix();
                    let params = {
                        "TableName": TableName.smsToken,
                        "IndexName": "phone",
                        "KeyConditionExpression": "phone = :phone",
                        "ExpressionAttributeValues": {
                            ":phone": { "S": standardPhone },
                            ":current": { "N": current.toString() }
                        },
                        "ExpressionAttributeNames": {
                            "#ttl": "ttl"
                        },
                        "FilterExpression": "#ttl > :current",
                        "Limit": this.tokenSettings.maxActive.toString(),
                        "ScanIndexForward": false
                    }
                    this.db.query(params).promise().then(data => {
                        let exists = data.Items.find(t => t.token.S === trimmedToken);
                        /* istanbul ignore next */
                        if (exists) {
                            res({ phone: standardPhone });
                        } else {
                            rej({ matches: false })
                        }
                    }).catch(rej);
                }).catch(rej);
            }).catch(rej);
        })
    }

}

export default Phone;