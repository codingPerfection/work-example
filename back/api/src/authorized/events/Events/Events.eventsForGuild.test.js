import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../../tables';

import Event from './Events';

describe("should test Events/eventsForGuild ", function () {

    this.timeout(5000);
    let guildId = 1;
    let existingEvents = [];

    step("error guild", function (done) {
        let e = new Event();
        e.eventsForGuild("dsadsasad").then(data => {
            done("smth went wrong");
        }).catch(err => {
            done();
        });
    });

    step("get events for guild", function (done) {
        let e = new Event();
        e.events(guildId, false).then(data => {
            existingEvents = data;
            done();
        }).catch(err => {
            done("smth went wrong");
        });
    });

    step("delete events for guild", function (done) {
        if (existingEvents.length) {
            var params = {
                RequestItems: {
                }
            };
            params.RequestItems[Tables.event] = existingEvents.reduce((acc, e) => {
                acc.push({
                    DeleteRequest: {
                        Key: { id: e.id }
                    }
                })
                return acc;
            }, [])
            db.batchWrite(params)
                .promise()
                .then(data => {
                    done();
                }).catch(err => done(err));;
        } else {
            done();
        }
    });


    step("get events for guild should be no events", function (done) {
        let e = new Event();
        e.eventsForGuild(guildId).then(data => {
            expect(data.events).to.have.length(0);
            expect(data.upcomingEvents).to.equal(false);
            expect(data.openedEvents).to.equal(false);
            done();
        }).catch(err => {
            console.log(err);
            done("smth went wrong");
        });
    });

    step("insert 1 non opened event", function () {
        var params = {
            TableName: Tables.event,
            Item: {
                id: 1,
                guildId: guildId,
                historyStatus: "false",
                NullAttribute: null,
                status: "pending"
            }
        };
        return db.put(params).promise();
    });

    step("get events for guild should be no events", function (done) {
        let e = new Event();
        e.eventsForGuild(guildId).then(data => {
            expect(data.events).to.have.length(1);
            expect(data.upcomingEvents).to.equal(true);
            expect(data.openedEvents).to.equal(false);
            done();
        }).catch(err => {
            done("smth went wrong");
        });
    });

    step("get events for guild should be 1 non open event", function (done) {
        let e = new Event();
        e.eventsForGuild(guildId).then(data => {
            expect(data.events).to.have.length(1);
            expect(data.upcomingEvents).to.equal(true);
            expect(data.openedEvents).to.equal(false);
            done();
        }).catch(err => {
            done("smth went wrong");
        });
    });

    step("insert 1 opened event", function () {
        var params = {
            TableName: Tables.event,
            Item: {
                id: 2,
                guildId: guildId,
                historyStatus: "false",
                NullAttribute: null,
                status: "open"
            }
        };
        return db.put(params).promise();
    });

    step("insert 1 opened event", function () {
        var params = {
            TableName: Tables.event,
            Item: {
                id: 3,
                guildId: guildId,
                historyStatus: "false",
                NullAttribute: null,
                status: "open"
            }
        };
        return db.put(params).promise();
    });

    step("get events for guild should 2 events ( 1 open)", function (done) {
        let e = new Event();
        e.eventsForGuild(guildId).then(data => {
            expect(data.events).to.have.length(3);
            expect(data.upcomingEvents).to.equal(true);
            expect(data.openedEvents).to.equal(true);
            done();
        }).catch(err => {
            console.log(err);
            done("smth went wrong");
        });
    });

});