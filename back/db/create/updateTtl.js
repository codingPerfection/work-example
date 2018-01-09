

var tables = [];

//created
tables.push(require('./tables/smsToken'));
tables.push(require('./tables/smsConsume'));

module.exports = () => {
    var important = require('../../settings');
    var db = important.db;

    return new Promise((resolve, reject) => {
        if (tables.length == 0) {
            console.log("no tables to ttl");
        }
        let counter = 0;
        tables.forEach(function (table) {
            db.updateTimeToLive(table.ttl, function (err, data) {
                if (err) {
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
