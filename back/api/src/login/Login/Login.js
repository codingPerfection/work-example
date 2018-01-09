import TableName from './../../../../tables';
import AWS from 'aws-sdk';
import Phone from './../../helpers/authorization/Phone/Phone';
import moment from 'moment';
import ServerlessSettings from './../../../../settingsSeverless';
import LoginHelp from './../../helpers/authorization/Login/Login';



class Login {

    constructor() {
        this.db = new AWS.DynamoDB.DocumentClient();
        this.smsMsg = ServerlessSettings.smsTemplates.login;
    }


    getUserByPhone(phone) {
        return new Promise((resolve, reject) => {
            let params = {
                "TableName": TableName.user,
                "IndexName": "phone",
                "KeyConditionExpression": "phone = :phone",
                "ExpressionAttributeValues": {
                    ":phone": phone,
                },
                "Limit": "1",
            }
            this.db.query(params).promise().then((data) => {
                if (data.Count) {
                    resolve(data.Items[0]);
                } else {
                    reject({ exists: false });
                }
            }).catch(reject)
        })
    }

    /* istanbul ignore next */
    sendSMS(phone, ip) {
        return new Promise((res, rej) => {
            let p = new Phone();
            let sPhone = p.standardizePhone(phone);
            this.getUserByPhone(sPhone).then((user) => {
                let sms = this.smsMsg.replace(":::charName:::", user.charName);
                /* istanbul ignore next */
                p.sendSmsToken(sPhone, sms, ip).then(data => {
                    res({ ok: true })
                }).catch(rej)
            }).catch(rej)
        })
    }


    
    consumeSms(phoneToken, phone, ip) {
        return new Promise((res, rej) => {
            let p = new Phone();
            let sPhone = p.standardizePhone(phone);
            this.getUserByPhone(sPhone).then((user) => {
                /* istanbul ignore next */
                p.consumeSmsToken(sPhone, phoneToken, ip).then(phoneData => {
                    let l = new LoginHelp();
                    /* istanbul ignore next */
                    l.loginUser(user.id).then(res).catch(rej);;
                }).catch(rej);
            }).catch(rej)
        })
    }

}

export default Login;