import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../../tables';

import EventOpener from './EventOpener';

describe("should test EventCreator.fromClass ", function () {

    this.timeout(100000);

    let guildId = 4;
    let eventId = 1;

    step("insert event", function () {
        let params = {
            TableName: Tables.event,
            Item: {
                id: eventId,
                guildId: guildId,
                historyStatus: "false",
                open: moment.utc().add(300, "seconds").unix(),
                status: "pending"
            }
        }
        return db.put(params).promise();
    });


    step("insert user 1", function () {
        let params = {
            TableName: Tables.user,
            Item: {
                id: 1,
                guildId: guildId,
                charName: "Siljko",
                phone: "+385989411056"
            }
        }
        return db.put(params).promise();
    });

    step("insert user 2", function () {
        let params = {
            TableName: Tables.user,
            Item: {
                id: 2,
                guildId: guildId,
                charName: "Ralgioro",
                phone: "+385989411056"
            }
        }
        return db.put(params).promise();
    });


    step("error on saving single attend", function (done) {
        let user = {
            id: "sadsadsa",
        }
        let e = new EventOpener();
        e.saveSingleAttend(user, "dsadsa").then(data => {
            done("this should throw erro but it didn't");
        }).catch(err => {
            done();
        })
    });

    step("from first try saving single attendCode", function (done) {
        let attendId = 1;
        let e = new EventOpener();
        e.saveSingleAttendCode(attendId, moment.utc().add(300, "seconds").unix()).then(data => {
            done();
        }).catch(err => {
            done("something went wrong");
        })
    });

    step("insert test attendCode", function () {
        let params = {
            TableName: Tables.attendCode,
            Item: {
                code: "1",
                ttl: moment.utc().add(300, "seconds").unix(),
            }
        }
        return db.put(params).promise();
    });

    step("from second try saving single attendCode", function (done) {
        let attendId = 1;
        let e = new EventOpener();
        let counter = 0;
        let orig = e.generateShortCode;
        e.generateShortCode = () => {
            counter++;
            if (counter > 1) {
                return orig();
            } else {
                return "1";
            }
        }
        e.saveSingleAttendCode(attendId, moment.utc().add(300, "seconds").unix()).then(data => {
            done();
        }).catch(err => {
            done("something went wrong");
        })
    });


    step("error on sendSMS ", function (done) {
        let attendId = 1;
        let e = new EventOpener();
        let userAttends = [{
            user: {
                charName: "mirko",
                phone: "$#ASDDA%$$#!!$DADFFDAFDA"
            },
            attendCode: "pero",

        }]
        e.sendSmsLinks(userAttends).then(data => {
            done("didn't throw error");
        }).catch(err => {
            done();
        })
    });

    step("test opening event", function (done) {
        let e = new EventOpener();
        e.openEvent(eventId).then(data => {
            done();
        }).catch(err => {
            done("smth went wrong");
        })
    });




});