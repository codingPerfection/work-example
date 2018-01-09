var settings = require('./../../../settings');

var table = {
    "TableName": settings.tableName.idGenerator,
    "AttributeDefinitions": [
        {
            "AttributeName": "table",
            "AttributeType": "S"
            //    id: Number 
        },
    ],
    "KeySchema": [
        {
            "AttributeName": "table",
            "KeyType": "HASH"
        }
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 1, //Read will rarely be used
        "WriteCapacityUnits": 1 //you should probably auto-scale this
    },
}

module.exports = {
    table: table,
    ttl: null,
};