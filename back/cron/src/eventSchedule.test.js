import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';


import eventSchedule from './eventSchedule';


describe("should test eventSchedule.f ", function () {

    this.timeout(5000);


    step("make it fail", (done) => {
        let event = { time: "DSAdssad" };
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("didnt throw error")
            }
        }
        eventSchedule.f(event, null, callback);
    })

    step("make it pass", (done) => {
        let event = { time: "2017-12-18T15:00:40Z" };
        let callback = (err, data) => {
            if (err) {
                done("didnt throw error");
            } else {
                done()
            }
        }
        eventSchedule.f(event, null, callback);
    })

});