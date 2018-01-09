

var tables = [];

//created
// tables.push(require('./tables/guild'));
// tables.push(require('./tables/smsToken'));
// tables.push(require('./tables/smsConsume'));
// tables.push(require('./tables/idGenerator'));
// tables.push(require('./tables/user'));
// tables.push(require('./tables/loginToken'));
// tables.push(require('./tables/event'));
// tables.push(require('./tables/eventClass'));
// tables.push(require('./tables/eventCron'));
// tables.push(require('./tables/attend'));
// tables.push(require('./tables/attendCode'))

module.exports = () => {
    var important = require('../../settings');
    var db = important.db;

    return new Promise((resolve, reject) => {

        if (tables.length == 0) {
            console.log("no tables to create");
            resolve();
        }
        let counter = 0;
        tables.forEach(function (table) {
            db.createTable(table.table, function (err, data) {
                if (err) {
                    console.log("creating error");
                    reject(err);
                } else {
                    counter++;
                    if (counter === tables.length) {
                        resolve();
                    }
                }
            });
        }, this);
    });
};
