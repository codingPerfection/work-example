var settings = require('./../../../settings');
var table = {
    "TableName": settings.tableName.guild,
    "AttributeDefinitions": [
        {
            "AttributeName": "id",
            "AttributeType": "N"
            //    created: Number (timestamp)
            //    name: String
            //    server: EU/argent-dawn
            //    faction: String (horde/alliance)  
            //    managerId: String (userId which is manager)  
        },
        {
            "AttributeName": "registrationToken",
            "AttributeType": "S"
        },
    ],
    "GlobalSecondaryIndexes": [
        {
            "IndexName": "token",
            "KeySchema": [
                {
                    "AttributeName": "registrationToken",
                    "KeyType": "HASH"
                },
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
    ttl: null,
    idGenerator: true,
}