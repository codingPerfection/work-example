import moment from 'moment';
import TableName from './../../../../tables';
import Event from './../../../../api/src/authorized/events/Events/Events';
import User from './../../../../api/src/authorized/user/User/User';
import eventUpdater from './../../helpers/EventUpdater';
import AWS from 'aws-sdk';



class EventArchiver {

    constructor() {
        this.db = new AWS.DynamoDB.DocumentClient();
    }

    updateEvent(eventId) {
        return eventUpdater(this.db, eventId, "archive", "true");
    }

    generateParams(params, status, lateTime) {
        params.UpdateExpression = "SET attendance.#atr = attendance.#atr + :incr  "
        params.ExpressionAttributeNames["#atr"] = status;
        if (status == "late") {
            params.UpdateExpression += " , attendance.lateTime = attendance.lateTime + :lateTime";
            params.ExpressionAttributeValues[":lateTime"] = lateTime;
        }
        return params;
    }

    saveUpdates(updates) {
        return new Promise((res, rej) => {
            /* istanbul ignore next */
            if (updates.length == 0) {
                res({ ok: true });
            }

            let counter = 0;
            updates.map(u => {
                let params = {
                    TableName: TableName.user,
                    Key: { id: u.user.id },
                    ExpressionAttributeNames: {},
                    ExpressionAttributeValues: {
                        ':incr': 1,
                    }
                }
                
                params = this.generateParams(params, u.attend.status, u.attend.lateTime);
                this.db.update(params).promise().then(data => {
                    counter++;
                    if (counter == updates.length) {
                        res({ ok: true })
                    }
                }).catch(err => {
                    console.error(`failed to update user: ${u.user.id} , with attend: ${u.attend.id}`)
                    rej(err);
                });
            })
        });
    }

    updateUsers(users, attends) {
        return new Promise((res, rej) => {
            let haveAttend = users.reduce((acc, u) => {
                attends.find(a => {
                    if (a.userId === u.id) {
                        acc.push({ user: u, attend: a })
                        return true;
                    }
                })
                return acc;
            }, []);
            this.saveUpdates(haveAttend).then(res).catch(rej);
        });
    }


    archive(eventId) {
        return new Promise((res, rej) => {
            this.updateEvent(eventId).then(event => {
                let guildId = event.guildId;
                let e = new Event();
                /* istanbul ignore next */
                e.attends(eventId).then(attends => {
                    let u = new User();
                    /* istanbul ignore next */
                    u.getAllForGuild(guildId, false).then(users => {
                        this.updateUsers(users, attends).then(res).catch(rej);
                    }).catch(rej);
                }).catch(rej);
            }).catch(rej);
        })
    }

}

export default EventArchiver;