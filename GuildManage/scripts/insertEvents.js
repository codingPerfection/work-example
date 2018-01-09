var settings = require('../../back/settings');
var guild = require('../settings');
var moment = require('moment');
let db = settings.dbDoc;
let idGenerator = require('./../../back/api/src/helpers/idGenerator/idGenerator');
let snsTopics = require('./../../back/sns');
let sns = new settings.AWS.SNS();
let guildId = 1001;



let insertEventClass = (eventClass, guildId) => {
    return new Promise((res, rej) => {
        idGenerator(settings.tableName.eventClass).then(id => {
            let toInsert = {
                id: id,
                guildId: guildId,
                name: eventClass.name,
                open: eventClass.open,
                close: eventClass.close,
                archive: eventClass.archive,
            };
            db.put({ TableName: settings.tableName.eventClass, Item: toInsert }).promise().then(data => {
                let snsData = { eventClassId: id };
                let params = {
                    TopicArn: snsTopics.event().create,
                    Message: JSON.stringify(snsData)
                }
                sns.publish(params).promise().then(data => {
                    res({ ok: true });
                }).catch(rej);
            }).catch(err => {
                rej(err);
            });
        }).catch(rej);
    })
}

guild.eventClass.forEach(e => {
    let counter = 0;
    insertEventClass(e, guildId).then(data => {
        counter++;
        if (counter == guild.eventClass.length) {
            console.log("all events created");
        }
    }).catch(err => { console.log(err) });
});


