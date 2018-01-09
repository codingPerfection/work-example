import "mocha-steps";
import { expect } from 'chai';
import Tables from './../../../tables';
import TestSettings from './testSettings';
import moment from 'moment';

import consumeSms from './consumeSms';

describe("should test register/consumeSms ", function () {

    this.timeout(5000);

    let phoneNumber = "+385989411056";
    let rightToken = "111111";

    step("insert test guild", function (done) {
        let guildInsert = {
            id: 1,
            created: 123,
            name: TestSettings.guildName,
            server: TestSettings.server,
            registrationToken: TestSettings.guildToken,
            faction: 'horde'
        };
        db.put({ TableName: Tables.guild, Item: guildInsert, },
            (err, data) => {
                if (data) {
                    done();
                } else {
                    done("failed to insert");
                }
            });
    });


    step("insert test mobile token", function (done) {
        let tokenToInsert = {
            id: 1,
            created: moment.utc().unix(),
            ttl: moment.utc().add(600, 'seconds').unix(),
            phone: phoneNumber,
            token: rightToken,
            ip: '1.1.1.1'
        };
        db.put({ TableName: Tables.smsToken, Item: tokenToInsert, },
            (err, data) => {
                if (data) {
                    done();
                } else {
                    done("failed to insert");
                }
            });
    });

    step("test for error not enough data", function (done) {
        let body = { charName: "123", phone: "+385989411056" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhoneToken).to.equal(true);
            done();
        }
        consumeSms.f(event, context, callback);
    });


    step("test for wrong guild token", function (done) {
        let body = { charName: TestSettings.existingChar, phone: phoneNumber, guildToken: "123", phoneToken: rightToken };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhoneToken).to.equal(true);
            done();
        }
        consumeSms.f(event, context, callback);
    });


    step("test for wrong char", function (done) {
        let body = { charName: "123", phone: phoneNumber, guildToken: TestSettings.guildToken, phoneToken: rightToken };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhoneToken).to.equal(true);
            done();
        }
        consumeSms.f(event, context, callback);
    });


    step("test for wrong phoneNumber", function (done) {
        let body = { charName: TestSettings.existingChar, phone: "+11", guildToken: TestSettings.guildToken, phoneToken: rightToken };
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
            }  else {
                done("something went wrong");
            }
        }
        consumeSms.f(event, context, callback);
    });


    step("test for wrong phone token", function (done) {
        let body = { charName: TestSettings.existingChar, phone: phoneNumber, guildToken: TestSettings.guildToken, phoneToken: "123" };
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
            }  else {
                done("something went wrong");
            }
        }
        consumeSms.f(event, context, callback);
    });

    step("test for right data", function (done) {
        let body = {
            charName: TestSettings.existingChar,
            phone: phoneNumber,
            guildToken: TestSettings.guildToken,
            phoneToken: rightToken
        };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
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