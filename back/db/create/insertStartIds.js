module.exports = () => {
    return new Promise((res,rej)=>{
        let fs = require('fs');
        let settings = require('./../../settings');
        let idGenerator = require('./tables/idGenerator');
        let tables = fs.readdirSync(__dirname + '/tables/');
        tables = tables.map(t => require('./tables/' + t))
            .filter(t => t.idGenerator)
            .map(t => (
                {
                    PutRequest: {
                        Item: {
                            "table": {
                                S: t.table.TableName
                            },
                            "id": {
                                N: '1000'
                            }
                        }
                    }
                }
            ));
        let insertIdGeneratorParams = { RequestItems: {} };
        insertIdGeneratorParams.RequestItems[idGenerator.table.TableName] = tables;
        settings.db.batchWriteItem(insertIdGeneratorParams, function (err, data) {
            if (err) {
                rej(err);
            }
            else {
                res();
            }
        });
    })
}