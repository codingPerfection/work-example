import TableName from './../../../../tables';
import AWS from 'aws-sdk';
import moment from 'moment';
import User from './../../authorized/user/User/User'



class Attend {

    constructor() {
        this.db = new AWS.DynamoDB.DocumentClient();
        this.validResponse = ["yes", "no", "late"];
        this.maxLateTime = 300;
    }

    async getEvent(id) {
        let params = {
            "TableName": TableName.event,
            "KeyConditionExpression": "id = :id",
            "ExpressionAttributeValues": {
                ":id": id,
            }
        }
        let data = await this.db.query(params).promise();
        return data.Items[0];
    }

    async getAttend(id) {
        let params = {
            "TableName": TableName.attend,
            "KeyConditionExpression": "id = :id",
            "ExpressionAttributeValues": {
                ":id": id,
            }
        }
        let data = await this.db.query(params).promise();
        return data.Items[0];
    }

    async checkToken(token) {
        let current = moment.utc().unix();
        let params = {
            "TableName": TableName.attendCode,
            "KeyConditionExpression": "code = :code",
            "ExpressionAttributeValues": {
                ":code": token,
                ":current": current
            },
            "ExpressionAttributeNames": {
                "#ttl": "ttl"
            },
            "FilterExpression": "#ttl > :current",
            "Limit": 1,
        }
        let data = await this.db.query(params).promise();
        if (data.Items.length) {
            return data.Items[0].attendId;
        } else {
            throw new Error();
        }
    }

    parseAttend(attend) {
        return {
            responseStatus: attend.status,
            lateTime: attend.lateTime,
            codeExists: true
        }
    }

    async dataFromToken(attendCode) {
        let attendId = await this.checkToken(attendCode);
        let attend = await this.getAttend(attendId);
        let u = new User();
        let [userGuild, event] = await Promise.all([u.getUserSettings(attend.userId), this.getEvent(attend.eventId)])
        let a = this.parseAttend(attend);

        a.charName = userGuild.user.charName;
        a.guildName = userGuild.guild.guild;
        a.eventName = event.name;
        a.openTimezoned = event.openTimezoned;
        a.closeTimezoned = event.closeTimezoned;

        return a;
    }

    async updateAttend(id, status, lateTime) {
        let params = {
            Key: { id: id },
            TableName: TableName.attend,
            UpdateExpression: 'set  #status = :status , #lateTime = :lateTime, #statusChanged = :statusChanged',
            ExpressionAttributeNames: {
                "#status": "status",
                "#lateTime": "lateTime",
                "#statusChanged" : "statusChanged"
            },
            ExpressionAttributeValues: {
                ':status': status,
                ":lateTime": lateTime,
                ":statusChanged" : moment.utc().unix()
            },
            ReturnValues: "ALL_NEW"
        }
        let data = await this.db.update(params).promise();
        return data.Attributes;
    }

    async saveAttend(attendCode, data) {
        let response = this.validResponse.find(r => r === data.response);
        if (!response) {
            throw new Error("invalid response");
        }
        let attendId = await this.checkToken(attendCode);
        let late = 0;
        if (response === "late") {
            late = parseInt(data.lateTime);
        }
        let updated = await this.updateAttend(attendId, response, late);
        return this.parseAttend(updated);
    }



}

export default Attend;