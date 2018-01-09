import TableName from './../../../../../tables';
import AWS from 'aws-sdk';


class User {

    constructor() {
        this.roles = ['dps', 'tank', 'healer'];
        this.dbDoc = new AWS.DynamoDB.DocumentClient();
    }

    roleChange(userId, guildId, charType) {
        return new Promise((res, rej) => {
            //must be valid role
            let found = this.roles.find(r => r === charType);
            if (!found) {
                rej({ invalidRole: charType });
                return null;
            }

            let params = {
                TableName: TableName.user,
                Key: { id: userId },
                UpdateExpression: 'set  charType = :charType ',
                ConditionExpression: 'guildId = :guildId',
                ExpressionAttributeValues: {
                    ':charType': charType,
                    ':guildId': guildId,
                }
            };
            this.dbDoc.update(params).promise().then(res).catch(rej);
        })
    }

    deleteUser(userId, guildId) {
        return new Promise((res, rej) => {
            var params = {
                TableName: TableName.user,
                Key: {
                    id: userId,
                },
                ConditionExpression: 'guildId = :guildId',
                ExpressionAttributeValues: {
                    ':guildId': guildId,
                }
            };
            this.dbDoc.delete(params).promise().then(res).catch(rej);
        })
    }

    getAllForGuild(guildId, removePhone) {
        return new Promise((res, rej) => {
            this.dbDoc.query({
                "TableName": TableName.user,
                "IndexName": "guild",
                "KeyConditionExpression": "guildId = :id ",
                "ExpressionAttributeValues": {
                    ":id": guildId,
                },
                "Limit": "100",
            }).promise()
                .then(usersData => {
                    if (removePhone) {
                        res(usersData.Items.map((u) => {
                            u.phone = null;
                            return u;
                        }));
                    } else {
                        res(usersData.Items)
                    }
                }).catch(rej);
        })
    }

    //gets guild name and tells if user is manager
    getGuild(userId, guildId) {
        return new Promise((res, rej) => {
            var queryParams = {
                "TableName": TableName.guild,
                "KeyConditionExpression": "id = :id",
                "ExpressionAttributeValues": {
                    ":id": guildId
                },
                "Limit": "1",
            }
            this.dbDoc.query(queryParams).promise()
                .then(data => {
                    let guild = data.Items[0];
                    let isManager = guild.managerId === userId;
                    res({ guild: guild.name, isManager: isManager, id: guild.id });
                })
                .catch(rej)
        })
    }

    getUserSettings(userId) {
        return new Promise((res, rej) => {
            var queryParams = {
                "TableName": TableName.user,
                "KeyConditionExpression": "id = :id",
                "ExpressionAttributeValues": {
                    ":id": userId
                },
                "Limit": "1",
            }
            this.dbDoc.query(queryParams).promise()
                .then(data => {
                    let user = data.Items[0];
                    this.getGuild(userId, user.guildId).then((guildData) => {
                        res({ user: user, guild: guildData });
                    }).catch(rej);
                })
                .catch(rej)
        })

    }

}

export default User;