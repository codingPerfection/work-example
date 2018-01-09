var settings = require('./../../../tables');
var table = {
    "TableName": settings.attendCode,
    "AttributeDefinitions": [
        {
            "AttributeName": "code",
            "AttributeType": "S"
            //attendId:Number
            // ttl: moment.utc().unix();
        },

    ],
    "KeySchema": [
        {
            "AttributeName": "code",
            "KeyType": "HASH"
        }
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
    },
}

let ttl = {
    TableName: settings.attendCode,
    TimeToLiveSpecification: {
        AttributeName: 'ttl',
        Enabled: true
    }
};

module.exports = {
    table: table,
    ttl: null,
}