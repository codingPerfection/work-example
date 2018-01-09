import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../tables';

import archiveEvent from './archiveEvent';

describe("should test EventCreator.fromClass ", function () {

    this.timeout(5000);

    let guildId = 3;
    let eventId = 1;

    step("insert event", function () {
        let params = {
            TableName: Tables.event,
            Item: {
                id: eventId,
                guildId: guildId,
                historyStatus: "false",
                open: 1,
                close: 1,
                openTimezoned: "1231",
                closeTimezoned: "123",
                status: "closed"
            }
        }
        return db.put(params).promise();
    });



    step("test no id", function (done) {
        let data = { a: "a" };
        let event = { Records: [{ Sns: { Message: JSON.stringify(data) } }] };
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("threw error while it shouldn't");
            }
        }
        archiveEvent.f(event, null, callback);
    });

    step("make it fail", function (done) {
        let data = { eventId: "dsadsa" };
        let event = { Records: [{ Sns: { Message: JSON.stringify(data) } }] };
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("threw error while it shouldn't");
            }
        }
        archiveEvent.f(event, null, callback);
    });


    step("test archiving event", function (done) {
        let data = { eventId: eventId };
        let event = { Records: [{ Sns: { Message: JSON.stringify(data) } }] };
        let callback = (err, data) => {
            if (err) {
                done("there was error");
            } else {
                done();
            }
        }
        archiveEvent.f(event, null, callback);
    });



});