var tables = require('./../../../tables');
var table = {
    "TableName": tables.eventClass,
    "AttributeDefinitions": [
        {
            "AttributeName": "id",
            "AttributeType": "N"
        },
        {
            "AttributeName": "guildId",
            "AttributeType": "N"
        },
        // name: String
        // open: cronString
        // close: cronString
        // archive: cronString
    ],
    "KeySchema": [
        {
            "AttributeName": "id",
            "KeyType": "HASH"
        }
    ],
    "GlobalSecondaryIndexes": [
        {
            "IndexName": "guild",
            "KeySchema": [
                {
                    "AttributeName": "guildId",
                    "KeyType": "HASH"
                },
            ],
            "Projection": {
                "ProjectionType": "ALL"//KEYS_ONLY
            },
            "ProvisionedThroughput": {
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1
            }
        },
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
    },
}

module.exports = {
    table: table,
    idGenerator: true,
}