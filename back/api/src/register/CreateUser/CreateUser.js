import TableName from './../../../../tables';
import AWS from 'aws-sdk';
import blizzardGetChar from './../blizzard/blizzardGetChar';
import idGenerator from './../../helpers/idGenerator/idGenerator';
import moment from 'moment';
import User from '../../authorized/user/User/User';


class CreateUser {

    constructor() {
        this.db = new AWS.DynamoDB.DocumentClient();
    }

    /* istanbul ignore next */
    setManager(guildId, userId) {
        return new Promise((res, rej) => {
            var params = {
                "Key": {
                    "id": guildId,
                },
                "TableName": TableName.guild,
                "AttributeUpdates": {
                    'managerId': {
                        "Action": "PUT",
                        "Value": userId,
                    },
                },
            }
            /* istanbul ignore next */
            this.db.update(params).promise().then((data) => {
                res(params);
            }).catch(rej);
        })
    }

    /* istanbul ignore next */
    checkForManagerUpdate(guildId, userId) {
        return new Promise((res, rej) => {
            var queryParams = {
                "TableName": TableName.guild,
                "KeyConditionExpression": "id = :id",
                "ExpressionAttributeValues": {
                    ":id": guildId
                },
                "Limit": "2",
                "ScanIndexForward": false,
                "ConsistentRead": true,
            }
            this.db.query(queryParams).promise().then((data) => {
                if (!data.Items[0].managerId) {
                    this.setManager(guildId, userId)
                        .then(data => { res({ isManager: true, userId: userId }) })
                        .catch(rej);
                } else {
                    res({ isManager: false, userId: userId })
                }
            }).catch(rej);
        })
    }

    /* istanbul ignore next */
    insertNewChar(guildId, phone, charName, charClass, charType) {
        return new Promise((res, rej) => {
            idGenerator(TableName.user).then(id => {
                let user = {
                    id: id,
                    phone: phone,
                    guildId: guildId,
                    created: moment.utc().unix(),
                    charName: charName,
                    charClass: charClass,
                    charType: charType,
                    attendance: {
                        no: 0,
                        yes: 0,
                        late: 0,
                        pending: 0,
                        lateTime: 0,
                    }
                }
                this.db.put({ TableName: TableName.user, Item: user }).promise().then(data => {
                    //check is it first registered than it is manager
                    this.checkForManagerUpdate(guildId, user.id)
                        .then(data => {
                            res(user);
                        }).catch(rej);
                }).catch(rej);
            }).catch(rej);
        })
    }


    /* istanbul ignore next */
    saveChar(guildId, phone, charName, charClass, charType) {
        return new Promise((res, rej) => {
            var queryParams = {
                "TableName": TableName.user,
                "IndexName": "phone",
                "KeyConditionExpression": "phone = :phone",
                "ExpressionAttributeValues": {
                    ":phone": phone
                },
                "Limit": "2",
                "ScanIndexForward": false
            }
            this.db.query(queryParams).promise().then((userData) => {
                //check if user exists with that phone
                if (parseInt(userData.Count)) {
                    //check if same guild
                    let user = userData.Items[0];
                    if (userData.Items[0].guildId === guildId) {
                        res(user);
                    } else {
                        //delete user then insert new
                        let u = new User();
                        u.deleteUser(user.id, user.guildId).then((data) => {
                            this.insertNewChar(guildId, phone, charName, charClass, charType).then(res).catch(rej);
                        }).catch(rej);
                    }
                } else {
                    this.insertNewChar(guildId, phone, charName, charClass, charType).then(res).catch(rej);
                }
            });
        })
    }

}

export default CreateUser;