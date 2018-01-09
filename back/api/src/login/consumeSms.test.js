import "mocha-steps";
import { expect } from 'chai';
import Tables from './../../../tables';
import moment from 'moment';

import consumeSms from './consumeSms';

describe("should test login/consumeSms ", function () {

    this.timeout(5000);

    let phoneNumber = "+385989411056";
    let rightToken = "111111";


    step("insert test user", function () {
        let user = {
            id: 1,
            phone: phoneNumber,
            charName: "Ralgioro"
        };
        return db.put({ TableName: Tables.guild, Item: user, }).promise();;
    });

    step("insert test mobile token", function () {
        let tokenToInsert = {
            id: 1,
            created: moment.utc().unix(),
            ttl: moment.utc().add(600, 'seconds').unix(),
            phone: phoneNumber,
            token: rightToken,
            ip: '1.1.1.1'
        };
        return db.put({ TableName: Tables.smsToken, Item: tokenToInsert, }).promise();
    });

    step("test for error not enough data", function (done) {
        let body = { phone: "+385989411056" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let callback = (err, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhoneToken).to.equal(true);
            done();
        }
        consumeSms.f(event, context, callback);
    });



    step("test for wrong phone token", function (done) {
        let body = { phone: phoneNumber, phoneToken: "123" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            if (d.invalidPhoneToken) {
                expect(d.invalidPhoneToken).to.equal(true);
                done();
            } else if (d.limitReached === true) {
                done();
            } else {
                done("something went wrong");
            }
        }
        consumeSms.f(event, context, callback);
    });

    step("test for right data", function (done) {
        let body = {
            phone: phoneNumber,
            phoneToken: rightToken
        };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (err, data) => {
            let d = JSON.parse(data.body);
            if (d.loginToken) {
                done();
            } else if (d.limitReached === true) {
                done();
            } else {
                done("something went wrong");
            }
        }
        consumeSms.f(event, context, callback);
    });





});