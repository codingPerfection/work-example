import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../tables';

import createEvent from './createEvent';

describe("should test createTest.f ", function () {

    this.timeout(10000);

    let guildId = 5;
    let eventClassId = 1;

    step("insert eventClass", function () {
        let params = {
            TableName: Tables.eventClass,
            Item: {
                id: eventClassId,
                guildId: guildId,
                name: "Test",
                open: "0 18 * * 2",
                close: "0 21 * * 2",
                archive: "0 0 * * 3"
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
        createEvent.f(event, null, callback);
    });

    step("make it fail", function (done) {
        let data = { eventClassId: "dsadsa" };
        let event = { Records: [{ Sns: { Message: JSON.stringify(data) } }] };
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("threw error while it shouldn't");
            }
        }
        createEvent.f(event, null, callback);
    });


    step("test creating event", function (done) {
        let data = { eventClassId: eventClassId };
        let event = { Records: [{ Sns: { Message: JSON.stringify(data) } }] };
        let callback = (err, data) => {
            if (err) {
                done("there was error");
            } else {
                done();
            }
        }
        createEvent.f(event, null, callback);
    });




});