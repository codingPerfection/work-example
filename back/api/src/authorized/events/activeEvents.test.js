import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import activeEvents from './activeEvents';

describe("should test get events/true ", function () {

    this.timeout(5000);

    let event;

    step("insert test data", function (done) {
        let p = login(1, 1, "111", true)
            .then(data => {
                event = data;
                done();
            }).catch(err => done("error inserting"));;
    });

    step("test for right data", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done("smth went wrong");
            } else {
                done();
            }
        }
        activeEvents.f(parseAuthorizer(event, {}), context, callback)
    })

    step("test for error", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done("smth went wrong");
            } else {
                let body = JSON.parse(data.body);
                expect(body.events).to.have.length(0);
                done();
            }
        }
        activeEvents.f(parseAuthorizer(event, {guildId: "dsadsa"}), context, callback)
    })






});