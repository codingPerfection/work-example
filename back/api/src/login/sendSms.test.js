import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../tables';

import sendSms from './sendSms';


describe("should test sendsSms.f", function () {


    let phone = "+385989411056";

    step("insert test data", function () {
        let user = {
            id: 1,
            phone: phone,
            charName: "Ralgioro"
        };
        return db.put({ TableName: Tables.guild, Item: user, }).promise();;
    });


    step("get sendSms", function (done) {
        this.timeout(5000);
        let body = { phone: phone };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            if (d.ok === true) {
                done();
            } else if (d.limitReached === true) {
                done();
            } else {
                done("something went wrong");
            }
        }
        sendSms.f(event, null, callback);
    });

    step("get sendSms fail at no phone", function (done) {
        this.timeout(5000);
        let body = { a: "aaa" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let callback = (err, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhoneUser).to.equal(true);
            done();
        }
        sendSms.f(event, null, callback);
    });


    step("get sendSms fail at login internal", function (done) {
        this.timeout(5000);
        let body = { phone: "aaa" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let callback = (err, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhoneUser).to.equal(true);
            done();
        }
        sendSms.f(event, null, callback);
    });







});