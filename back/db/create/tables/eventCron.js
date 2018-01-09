var settings = require('./../../../settings');
var table = {
    "TableName": settings.tableName.eventCron,
    "AttributeDefinitions": [
        {
            "AttributeName": "partition",
            "AttributeType": "N",
            //topic: String (open|close|archive)
            //ttl: time + "3h"
        },
        {
            //utc unix timestamp
            "AttributeName": "time",
            "AttributeType": "N"
        },
        {
            "AttributeName": "eventClassId",
            "AttributeType": "N"
        },
        {
            "AttributeName": "eventId",
            "AttributeType": "N"
        },
    ],
    "KeySchema": [
        {
            "AttributeName": "time",
            "KeyType": "HASH"
        },
        {
            "AttributeName": "eventId",
            "KeyType": "RANGE"
        }
    ],
    "GlobalSecondaryIndexes": [
        {
            "IndexName": "cron",
            "KeySchema": [
                {
                    "AttributeName": "partition",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "time",
                    "KeyType": "RANGE"
                }
            ],
            "Projection": {
                "ProjectionType": "ALL"//KEYS_ONLY
            },
            "ProvisionedThroughput": {
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1
            }
        },
        {
            "IndexName": "event",
            "KeySchema": [
                {
                    "AttributeName": "eventClassId",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "eventId",
                    "KeyType": "RANGE"
                }
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


let ttl = {
    TableName: settings.tableName.eventCron,
    TimeToLiveSpecification: {
        AttributeName: 'ttl',
        Enabled: true
    }
};

module.exports = {
    table: table,
    ttl: ttl,
    idGenerator: false,
}