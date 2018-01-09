var settings = require('./../../settings');

settings.db.scan({ "TableName": settings.tableName.guildCode }, function (err, data) {
    console.log(data.Items);
})