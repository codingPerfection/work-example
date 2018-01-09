var settings = require('./../../../settings');
var table = {
    "TableName": settings.tableName.loginToken,
    "AttributeDefinitions": [
        {
            "AttributeName": "token", //composite key id + --- + password (32 char Aa0)
            "AttributeType": "S"
            //created utc unix timestamp
        },
    ],
    "KeySchema": [
        {
            "AttributeName": "token",
            "KeyType": "HASH"
        }
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
    },
}




module.exports = {
    table: table,
    ttl: null,
}