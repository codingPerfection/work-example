import "mocha-steps";
import { expect } from 'chai';

import getAttend from './getAttend';

import insertTestData from './testSettings';


describe("should test attend/getAttend ", function () {


    let attendCode = "111";
    let attendId = 1;
    let eventId = 1;

    insertTestData(step, attendCode, attendId, eventId);

    step("get attend data", (done) => {
        let event = { pathParameters: { token: attendCode } };
        let callback = (err, response) => {
            if(err){
                done("shouln't throw error");
            }
            expect(response.statusCode).to.equal(200);
            let data = JSON.parse(response.body);
            expect(data.responseStatus).to.equal("pending");
            expect(data.eventName).to.equal("event");
            expect(data.codeExists).to.equal(true);
            done();
        }
        getAttend.f(event, null, callback)
    });

    step("get attend data for non existing attend", (done) => {
        let event = { pathParameters: { token: "a" } };
        let callback = (err, response) => {
            if(err){
                done("shouln't throw error");
            }
            expect(response.statusCode).to.equal(404);
            let data = JSON.parse(response.body);
            expect(data.codeExists).to.equal(false);
            done();
        }
        getAttend.f(event, null, callback)
    });

});