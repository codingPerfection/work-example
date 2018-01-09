import moment from 'moment';
import AWS from 'aws-sdk';
import shortId from 'shortid';
import TableName from './../../../../tables';
import idGenerator from './../../../../api/src/helpers/idGenerator/idGenerator';
import settingsServerless from './../../../../settingsSeverless';
import User from './../../../../api/src/authorized/user/User/User';
import eventUpdater from './../../helpers/EventUpdater';



class EventOpener {

    constructor() {
        this.db = new AWS.DynamoDB.DocumentClient();
        this.sns = new AWS.SNS({ region: 'eu-west-1' });
    }

    changeEventStatus(id) {
        return eventUpdater(this.db, id, "open");
    }



    sendSmsLinks(userAttends) {
        return new Promise((res, rej) => {
            let counter = 0;

            if (userAttends.length === 0) {
                res({ ok: true });
            }

            userAttends.map((u) => {
                let sms = settingsServerless.smsTemplates.attend
                    .replace(":::charName:::", u.user.charName)
                    .replace(":::attendCode:::", u.attendCode);
                let params = {
                    Message: sms,
                    PhoneNumber: u.user.phone
                };
                this.sns.publish(params).promise().then(data => {
                    counter++;
                    if (counter === userAttends.length) {
                        res({ ok: true });
                    }
                }).catch(rej);
            })
        })
    }

    generateShortCode() {
        return shortId.generate();
    }

    /* cyclic generation of unique attend code entropy is about 9^64 which should be enough for a start base of 200-300 users */
    saveSingleAttendCode(attendId, ttl) {
        return new Promise((res, rej) => {
            let code = this.generateShortCode();

            let params = {
                TableName: TableName.attendCode,
                Item: {
                    code: code,
                    attendId: attendId,
                    ttl: ttl
                },
                ConditionExpression: "attribute_not_exists(code)"
            };

            let onError = (err) => {
                this.saveSingleAttendCode(attendId, ttl).then(data => onSuccess(data));
            }

            let onSuccess = (attendCode) => {
                res(attendCode);
            }

            this.db.put(params).promise()
                .then(data => onSuccess(code))
                .catch(onError);
        })
    }

    saveSingleAttend(user, eventId) {
        return new Promise((res, rej) => {
            /* istanbul ignore next */
            idGenerator(TableName.attend).then(id => {
                //insert attend
                let params = {
                    TableName: TableName.attend,
                    Item: {
                        id: id,
                        eventId: eventId,
                        userId: user.id,
                        status: "pending",
                        statusChanged: 0,
                        lateTime: 0
                    }
                };
                this.db.put(params).promise()
                    .then(data => {
                        res(params.Item);
                    })
                    .catch(rej);
            }).catch(rej);
        });
    }

    /* istanbul ignore next */
    saveAllAttends(users, eventId, ttl) {
        return new Promise((res, rej) => {
            let counter = 0;
            let done = [];

            if (users.length === 0) {
                res(done)
            }
            users.map((u) => {
                this.saveSingleAttend(u, eventId).then((attend) => {
                    this.saveSingleAttendCode(attend.id, ttl).then(attendCode => {
                        done.push({ user: u, attend: attend, attendCode: attendCode });
                        if (done.length == users.length) {
                            res(done);
                        }
                    }).catch(rej);
                }).catch(rej);
            })
        })
    }

    /* istanbul ignore next */
    openEvent(eventId) {
        return new Promise((res, rej) => {
            this.changeEventStatus(eventId).then(event => {
                let u = new User();
                u.getAllForGuild(event.guildId, false)
                    .then(users => {
                        this.saveAllAttends(users, eventId, event.open)
                            .then(userAttends => {
                                this.sendSmsLinks(userAttends).then(res).catch(rej);
                            }).catch(rej);
                    }).catch(rej);;
            }).catch(rej);
        })
    }


}

export default EventOpener;