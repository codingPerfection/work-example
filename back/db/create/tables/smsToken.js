var settings = require('./../../../settings');
var table = {
    "TableName": settings.tableName.smsToken,
    "AttributeDefinitions": [
        {
            "AttributeName": "id",
            "AttributeType": "N"

        },
        {
            "AttributeName": "phone",
            "AttributeType": "S"
            //token : 7 numbers token (String)
            //ttl: Number (utc seconds)
            //ip: String
        },
        {
            "AttributeName": "created",
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
                },
                {
                    "AttributeName": "created",
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
    TableName: settings.tableName.smsToken,
    TimeToLiveSpecification: {
        AttributeName: 'ttl',
        Enabled: true
    }
};

module.exports = {
    table: table,
    ttl: ttl,
    idGenerator: true,
}