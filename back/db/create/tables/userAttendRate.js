// var settings = require('./../../info');
// var table = {
//     "TableName": settings.tableName.userAttendRate,
//     "AttributeDefinitions": [
//         {
//             "AttributeName": "userId",
//             "AttributeType": "S"
// // yes: number (counter)
// // no: number (counter)
// // late: number (counter)
// // pending: number (counter)
// // lateTime: number (in minutes)
//         },

//     ],
//     "KeySchema": [
//         {
//             "AttributeName": "userId",
//             "KeyType": "HASH"
//         }
//     ],
//     "ProvisionedThroughput": {
//         "ReadCapacityUnits": 1,
//         "WriteCapacityUnits": 1
//     },
// }

// module.exports = table;