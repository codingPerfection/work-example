var settings = require('./../../../settings');
var table = {
    "TableName": settings.tableName.user,
    "AttributeDefinitions": [
        {
            "AttributeName": "id",
            "AttributeType": "N"
            //    created: Number (timestamp)
            //    charName: String
            //    charClass: String (demonHunter)
            //    charType: String (dps tank healer)
            //    attendance: {
            //      no: Number
            //      yes: Number   
            //      pending: Number
            //      late: Number
            //      lateTime: Number (in minutes)
            //    }
        },
        {
            "AttributeName": "phone",
            "AttributeType": "S"
        },
        {
            "AttributeName": "guildId",
            "AttributeType": "N"
        },
    ],
    "KeySchema": [
        {
            "AttributeName": "id",
            "KeyType": "HASH"
        }
    ],
    "GlobalSecondaryIndexes": [
        {
            "IndexName": "phone",
            "KeySchema": [
                {
                    "AttributeName": "phone",
                    "KeyType": "HASH"
                }
            ],
            "Projection": {
                "ProjectionType": "ALL"
            },
            "ProvisionedThroughput": {
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1
            }
        },
        {
            "IndexName": "guild",
            "KeySchema": [
                {
                    "AttributeName": "guildId",
                    "KeyType": "HASH"
                }
            ],
            "Projection": {
                "ProjectionType": "ALL"
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
    ttl: null,
    idGenerator: true,
};