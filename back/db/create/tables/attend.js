var tables = require('./../../../tables');
var table = {
    "TableName": tables.attend,
    "AttributeDefinitions": [
        {
            "AttributeName": "id",
            "AttributeType": "N"
        },
        {
            "AttributeName": "eventId",
            "AttributeType": "N"
        },
        // userId : String,
        // status: String(pending, yes,no,late)
        // statusChanged: Number (moment.utc().unix())
        // lateTime: Number(in minutes)
    ],
    "GlobalSecondaryIndexes": [
        {
            "IndexName": "event",
            "KeySchema": [
                {
                    "AttributeName": "eventId",
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
    "KeySchema": [
        {
            "AttributeName": "id",
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
    idGenerator: true,
};