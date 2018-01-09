let settings = require('./../../settings');

let truncate = (file, filterFunction) => {
    let table = require('./../create/tables/' + file);

    if (!table) {
        console.log("Wrong file specified: " + file);
        return null;
    }

    settings.db.scan({ "TableName": table.TableName }, function (err, data) {
        console.log("scan table " + table.TableName);
        var editedData = data.Items;

        if (editedData.length == 0) {
            console.log("table is empty");
            return null;
        }

        if (filterFunction) {
            editedData = filterFunction(editedData);
            if (editedData.length == 0) {
                console.log("nothing to do after filter cleared all");
                return null;
            }
        }

        //delete eventSchedulers
        var params = {
            "RequestItems": {

            },
            "ReturnConsumedCapacity": "TOTAL"
        }
        params.RequestItems[table.TableName] = [];
        editedData.forEach(function (element) {
            var newEl = {};
            table.KeySchema.forEach(function (key) {
                newEl[key.AttributeName] = element[key.AttributeName];
            }, this);

            var delRequest = {
                "DeleteRequest": {
                    "Key": newEl
                }
            }
            params.RequestItems[table.TableName].push(delRequest);
        }, this);

        settings.db.batchWriteItem(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("truncated table " + table.TableName);
            }
        });
    });
}

module.exports = truncate;

truncate('guild');
truncate('guildCode');