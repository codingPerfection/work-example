import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';


import Attend from './Attend';

import insertTestData from './../testSettings';

describe("should test get attend/Attend ", function () {

    this.timeout(5000);

    let attendCode = "111";
    let attendId = 1;
    let eventId = 1;

    insertTestData(step, attendCode, attendId, eventId);

    step("get attend", async function () {
        let a = new Attend();
        var data = await a.dataFromToken(attendCode);
        expect(data.responseStatus).to.equal("pending");
        expect(data.eventName).to.equal("event");
        expect(data.codeExists).to.equal(true);
    });

    step("update attend late", async function () {
        let a = new Attend();
        var data = await a.saveAttend(attendCode, {
            response: "late",
            lateTime: 30,
        });
        expect(data.codeExists).to.equal(true);
        expect(data.responseStatus).to.equal("late");
        expect(data.lateTime).to.equal(30);
    })


    step("update attend no", async function () {
        let a = new Attend();
        var data = await a.saveAttend(attendCode, {
            response: "no"
        });
        expect(data.codeExists).to.equal(true);
        expect(data.responseStatus).to.equal("no");
        expect(data.lateTime).to.equal(0);
    })

    step("check attend updated", async function () {
        let a = new Attend();
        var data = await a.dataFromToken(attendCode);
        expect(data.lateTime).to.equal(0);
        expect(data.responseStatus).to.equal("no");
        expect(data.eventName).to.equal("event");
        expect(data.codeExists).to.equal(true);
    });


    step("check token that doesn't exist ", async function (done) {
        try {
            let a = new Attend();
            var data = await a.checkToken('1');
            done("token shouldnt exist");
        } catch (err) {
            done();
        }
    });

    step("check for invalid response ", async function (done) {
        try {
            let a = new Attend();
            var data = await a.saveAttend(attendCode, {
                response: "dsasda"
            });
            done("Invalid response should throw error");
        } catch (err) {
            done();
        }
    });

    step("check attend still valid", async function () {
        let a = new Attend();
        var data = await a.dataFromToken(attendCode);
        expect(data.lateTime).to.equal(0);
        expect(data.responseStatus).to.equal("no");
        expect(data.eventName).to.equal("event");
        expect(data.codeExists).to.equal(true);
    });

});