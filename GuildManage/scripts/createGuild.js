var settings = require('../../back/settings');
var guild = require('../settings');
var moment = require('moment');
let db = settings.dbDoc;
let idGenerator = require('./../../back/api/src/helpers/idGenerator/idGenerator');
let snsTopics = require('./../../back/sns');
let sns = new settings.AWS.SNS();

let findGoodShortId = () => {
    return new Promise((res, rej) => {
        let tryId = settings.shortID();
        let params = {
            "TableName": settings.tableName.guild,
            "IndexName": "token",
            "KeyConditionExpression": "registrationToken = :token",
            "ExpressionAttributeValues": {
                ":token": tryId,
            },
            "Limit": "1",
        }
        db.query(params).promise().then((data) => {
            if (data.Count) {
                rej({ shortIdExists: false });
            } else {
                res(tryId)
            }
        }).catch(rej)
    })
}

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

findGoodShortId().then((shortId) => {
    idGenerator(settings.tableName.guild).then((guildId) => {
        let guildInsert = {
            id: guildId,
            created: moment().utc().valueOf().toString(),
            name: guild.name,
            server: guild.server,
            registrationToken: shortId,
            faction: guild.faction,
        };
        db.put({ TableName: settings.tableName.guild, Item: guildInsert }).promise().then(data => {
            console.log("This is the guild url:");
            console.log("http://impbots.com/register/" + guildInsert.registrationToken);
            let counter = 0;
            guild.eventClass.forEach(e => {
                insertEventClass(e, guildId).then(data => {
                    counter++;
                    if (counter == guild.eventClass.length) {
                        console.log("all events created")
                    }
                }).catch(err => { console.log(err) });
            });
        });;
    }).catch(err => { console.log(err) });
}).catch(err => console.log(err));


