import TableName from './../../../../../tables';
import AWS from 'aws-sdk';

import User from './../../user/User/User';


class Events {

    constructor() {
        this.dbDoc = new AWS.DynamoDB.DocumentClient();
    }

    mapAttendsToUser(attends, users) {
        return users.reduce((acc, u) => {
            attends.find((a, index) => {
                if (u.id === a.userId) {
                    let attend = attends.splice(index, 1)[0];
                    //assign the needed properties
                    attend.charName = u.charName;
                    attend.charType = u.charType;
                    attend.charClass = u.charClass;
                    //add it to accoumulator
                    acc.push(a);
                    return true;
                }
            })
            return acc;
        }, [])
    }

    attends(eventId) {
        return new Promise((res, rej) => {
            this.dbDoc.query({
                "TableName": TableName.attend,
                "IndexName": "event",
                "KeyConditionExpression": "eventId = :eventId",
                "ExpressionAttributeValues": {
                    ":eventId": eventId,
                },
                "Limit": "100",
                "ScanIndexForward": false
            }).promise()
                .then(attendData => {
                    res(attendData.Items);
                }).catch(rej);
        })
    }

    attendsForEvents(events, needAttends, guildId) {
        return new Promise((res, rej) => {
            //fetch users for guild
            let u = new User();
            u.getAllForGuild(guildId, true).then((users) => {
                //fetch attends for each event that has them
                let counter = 0;
                needAttends.forEach((e) => {
                    this.attends(e.event.id).then((attends) => {
                        counter++;
                        e.event.attends = this.mapAttendsToUser(attends, users);
                        events[e.index] = e.event;
                        if (counter === needAttends.length) {
                            res(events);
                        }
                    }).catch(rej);
                });
            }).catch(rej);
        })
    }

    needAttends(events) {
        return events.reduce((acc, event, index) => {
            if (event.status !== 'pending') {
                acc.push({ event: event, index: index });
            }
            return acc;
        }, []);
    }


    events(guildId, historyStatus) {
        return new Promise((res, rej) => {
            this.dbDoc.query({
                "TableName": TableName.event,
                "IndexName": "guild",
                "KeyConditionExpression": "guildId = :id AND historyStatus = :historyStatus",
                "ExpressionAttributeValues": {
                    ":id": guildId,
                    ":historyStatus": historyStatus.toString()
                },
                "Limit": "20",
                "ScanIndexForward": false
            }).promise()
                .then(eventData => {
                    res(eventData.Items)
                }).catch(rej);
        })
    }


    eventsForGuild(guildId) {
        return new Promise((res, rej) => {
            this.events(guildId, false).then(eventsData => {
                if (eventsData.length == 0) {
                    res({
                        events: [],
                        upcomingEvents: false,
                        openedEvents: false
                    });
                    return null;
                }
                let events = eventsData.sort((a, b) => a.open - b.open);
                let needAttends = this.needAttends(events);
                //there are events with attends fetch them and join them to event
                if (needAttends.length) {
                    /* istanbul ignore next */
                    this.attendsForEvents(events, needAttends, guildId).then((events) => {
                        res({
                            events: events,
                            upcomingEvents: true,
                            openedEvents: true
                        });
                    }).catch(rej);
                } else {
                    res({
                        events: events,
                        upcomingEvents: true,
                        openedEvents: false
                    });
                }

            }).catch(rej);
        })
    }

}

export default Events;