import "mocha-steps";
import { expect } from 'chai';

import saveAttend from './saveAttend';

import insertTestData from './testSettings';


describe("should test attend/saveAttend ", function () {


    let attendCode = "111";
    let attendId = 1;
    let eventId = 1;

    insertTestData(step, attendCode, attendId, eventId);

    step("save attend data", (done) => {
        let event = { pathParameters: { token: attendCode }, body: JSON.stringify({ response: "no" }) };
        let callback = (err, response) => {
            if (err) {
                done("shouln't throw error");
            }
            expect(response.statusCode).to.equal(200);
            let data = JSON.parse(response.body);
            expect(data.responseStatus).to.equal("no");
            done();
        }
        saveAttend.f(event, null, callback)
    });

    step("save data for non existing attendCode", (done) => {
        let event = { pathParameters: { token: "a" }, body: JSON.stringify({ response: "no" }) };
        let callback = (err, response) => {
            if (err) {
                done("shouln't throw error");
            }
            expect(response.statusCode).to.equal(404);
            let data = JSON.parse(response.body);
            expect(data.codeExists).to.equal(false);
            done();
        }
        saveAttend.f(event, null, callback)
    });

});