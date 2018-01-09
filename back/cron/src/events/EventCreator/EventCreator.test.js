import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../../tables';

import EventCreator from './EventCreator';
import CronParser from './../../helpers/CronParser'

describe("should test EventCreator.fromClass ", function () {

    this.timeout(5000);


    step("insert eventClass", function () {
        let params = {
            TableName: Tables.eventClass,
            Item: {
                id: 1,
                guildId: 1,
                name: "Test",
                open: "0 18 * * 0",
                close: "0 21 * * 0",
                archive: "0 0 * * 0"
            }
        }
        return db.put(params).promise();
    });

    step("see it pass", (done) => {
        let e = new EventCreator();
        e.fromClass(1).then(data => done()).catch(err => done("went wrong"));
    })

    step("see it fail by fetching class with unexisting id", (done) => {
        let e = new EventCreator();
        e.fromClass(999).then(data => done("went wrong")).catch(err => done());
    })

    step("see it fail by fetching wrong data", (done) => {
        let e = new EventCreator();
        e.fromClass("dsadsad").then(data => done("went wrong")).catch(err => done());
    })

    step("see fail saveAction", (done) => {
        let e = new EventCreator();
        e.saveAction(null).then(data => done("went wrong")).catch(err => done());
    })

    step("see fail saveEventActions", (done) => {
        let e = new EventCreator();
        e.saveEventActions({ a: "dsadsa", b: "!dsadsa" }).then(data => done("went wrong")).catch(err => done());
    })

    step("see fail saveEvent", (done) => {
        let e = new EventCreator();
        e.getClass(1).then((eventClass) => {
            let cp = new CronParser();
            let times = cp.nextTimes(eventClass.open, eventClass.close, eventClass.archive);
            e.saveEvent("name", times, "dsasdadsa", "dsasdadsa")
                .then(data => done("creation of event passed trough"))
                .catch(err => done());
        }).catch(err => done("couldn't fetch class"))
    })

});