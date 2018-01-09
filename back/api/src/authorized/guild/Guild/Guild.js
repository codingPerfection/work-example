import TableName from './../../../../../tables';
import AWS from 'aws-sdk';

import User from './../../user/User/User'
import ServerlessSettings from './../../../../../settingsSeverless';


class Guild {

    constructor() {
        this.dbDoc = new AWS.DynamoDB.DocumentClient();
    }

    attendance(guildId, isManager) {
        return new Promise((res, rej) => {
            let u = new User();
            u.getAllForGuild(guildId, true).then(users => {
                let edited = users.map((u) => {
                    Object.keys(u.attendance).forEach((key) => {
                        u[key] = u.attendance[key];
                    });
                    if (isManager) {
                        u.editable = true;
                    } else {
                        u.editable = false;
                    }
                    return u;
                })
                res(edited);
            }).catch(rej);
        })
    }


    inviteCode(guildId) {
        return new Promise((res, rej) => {
            var params = {
                TableName: TableName.guild,
                KeyConditionExpression: 'id = :id',
                ExpressionAttributeValues: {
                    ':id': guildId,
                }
            };
            this.dbDoc.query(params).promise().then(data => {
                let token = data.Items[0].registrationToken;
                res({ url: ServerlessSettings.registerUrl + token });
            }).catch(rej);
        })
    }

}

export default Guild;