import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../tables';

import closeEvent from './closeEvent';

describe("should test closeEvent.f ", function () {

    this.timeout(10000);

    let guildId = 5;
    let eventId = 1;

    step("insert event", function () {
        let params = {
            TableName: Tables.event,
            Item: {
                id: eventId,
                guildId: guildId,
                historyStatus: "false",
                open: moment.utc().add(300, "seconds").unix(),
                status: "open"
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
        closeEvent.f(event, null, callback);
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
        closeEvent.f(event, null, callback);
    });


    step("test closing event", function (done) {
        let data = { eventId: eventId };
        let event = { Records: [{ Sns: { Message: JSON.stringify(data) } }] };
        let callback = (err, data) => {
            if (err) {
                done("there was error");
            } else {
                done();
            }
        }
        closeEvent.f(event, null, callback);
    });




});