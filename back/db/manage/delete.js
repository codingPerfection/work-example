var tableName = require('./../../tables');
var db = require('./../../settings').db


db.deleteTable({ TableName: tableName.user }, (err, data) => {
    console.log(data);
});