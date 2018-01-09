var tableName = require('./../../../tables');
var table = {
    "TableName": tableName.event,
    "AttributeDefinitions": [
        {
            "AttributeName": "id",
            "AttributeType": "N"
        },
        {
            "AttributeName": "guildId",
            "AttributeType": "N"
        },
        {
            //  --tells if event is history or not (false = not history, true = history)
            "AttributeName": "historyStatus",
            "AttributeType": "S"
        },
        //eventClassId : Number
        // open:  Number ( utc unix timestamp)
        // close: Number ( utc unix timestamp)
        // name: String,
        // status: String (pending, open, closed, archive) 
        //openTimezoned: String  (moment().format() ex: '2017-10-18T08:30:00+02:00')
        //closeTimezoned: String  (moment().format() ex: '2017-10-18T08:30:00+02:00')
    ],
    "GlobalSecondaryIndexes": [
        {
            "IndexName": "guild",
            "KeySchema": [
                {
                    "AttributeName": "guildId",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "historyStatus",
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