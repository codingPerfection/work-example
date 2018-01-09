import moment from 'moment';
import CronParser from './../../helpers/CronParser'
import TableName from './../../../../tables';
import idGenerator from './../../../../api/src/helpers/idGenerator/idGenerator';
import AWS from 'aws-sdk';



class EventCreator {

    constructor() {
        this.db = new AWS.DynamoDB.DocumentClient();
    }

    getClass(classId) {
        return new Promise((res, rej) => {
            let params = {
                "TableName": TableName.eventClass,
                "KeyConditionExpression": "id = :id",
                "ExpressionAttributeValues": {
                    ":id": classId,
                },
                "Limit": "1",
            }
            this.db.query(params).promise().then(data => {
                if (data.Items[0]) {
                    res(data.Items[0]);
                } else {
                    rej()
                }
            }).catch(rej);
        })
    }

    saveAction(time, topic, classId, eventId) {
        return new Promise((res, rej) => {
            let params = {
                TableName: TableName.eventCron,
                Item: {
                    partition: 1,
                    time: time.unix(),
                    topic: topic,
                    ttl: time.add(180, 'minutes').unix(),
                    eventClassId: classId,
                    eventId: eventId
                }
            };
            this.db.put(params).promise()
                .then(data => {
                    res();
                })
                .catch(rej);
        });
    }

    saveEventActions(times, classId, eventId) {
        return new Promise((res, rej) => {
            let i = 0;
            Object.keys(times).map((key) => {
                this.saveAction(times[key], key, classId, eventId)
                    .then(() => {
                        i++;
                        if (i == 3) {
                            res({ ok: true });
                        }
                    }).catch(rej)
            })
        });
    }

    saveEvent(name, times, guildId, classId) {
        return new Promise((res, rej) => {
            /* istanbul ignore next */
            idGenerator(TableName.event).then(id => {
                var params = {
                    TableName: TableName.event,
                    Item: {
                        id: id,
                        guildId: guildId,
                        historyStatus: "false",
                        open: times.close.unix(),
                        openTimezoned: times.close.format(),
                        close: times.archive.unix(),
                        closeTimezoned: times.archive.format(),
                        eventClassId: classId,
                        name: name,
                        status: "pending"
                    }
                };
                this.db.put(params).promise()
                    .then(data => {
                        res(id);
                    })
                    .catch(rej);
            }).catch(rej);
        })
    }

    fromClass(classId) {
        return new Promise((res, rej) => {
            this.getClass(classId).then(eventClass => {
                let cp = new CronParser();
                let times = cp.nextTimes(eventClass.open, eventClass.close, eventClass.archive);
                /* istanbul ignore next */
                this.saveEvent(eventClass.name, times, eventClass.guildId)
                    .then(eventId => {
                        /* istanbul ignore next */
                        this.saveEventActions(times, classId, eventId).then(res).catch(rej);
                    })
                    .catch(rej);
            }).catch(rej);
        })
    }

}

export default EventCreator;