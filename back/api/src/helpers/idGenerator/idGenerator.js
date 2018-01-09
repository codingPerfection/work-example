let TablesNames = require('./../../../../tables')
let AWS = require('aws-sdk');


let generateId = (table) => {
    let db = new AWS.DynamoDB();
    return new Promise((res, rej) => {
        var params = {
            ExpressionAttributeValues: {
                ":incr": { N: '1' }
            },
            Key: {
                "table": { S: table }
            },
            ReturnValues: "ALL_NEW",
            TableName: TablesNames.idGenerator,
            UpdateExpression: "SET id = id + :incr"
        };
        db.updateItem(params).promise().then(data => {
            res(parseInt(data.Attributes.id.N));
        }).catch(err => {
            // console.log(err);
            rej(err);
        })
    })
}

module.exports = generateId;