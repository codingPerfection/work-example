import "mocha-steps";
import { expect } from 'chai';
import Tables from './../../../tables';
import TestSettings from './testSettings';

import sendSMS from './sendSMS';

describe("should test register/sendSms ", function () {


    step("insert test data", function (done) {
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

    step("test for error not enough data", function (done) {
        let body = { charName: "123", phone: "+385989411056" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhone).to.equal(true);
            done();
        }
        sendSMS.f(event, context, callback);
    });

    step("test for error wrong guildToken", function (done) {
        this.timeout(5000);
        let body = { charName: TestSettings.existingChar, guildToken: "1", phone: "+385989411056" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhone).to.equal(true);
            done();
        }
        sendSMS.f(event, context, callback);
    });

    step("test for error wrong charname", function (done) {
        this.timeout(5000);
        let body = { charName: "123", guildToken: TestSettings.guildToken, phone: "+385989411056" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhone).to.equal(true);
            done();
        }
        sendSMS.f(event, context, callback);
    });


    step("test for error wrong phone", function (done) {
        this.timeout(5000);
        let body = { charName: TestSettings.existingChar, guildToken: TestSettings.guildToken, phone: "+1" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.invalidPhone).to.equal(true);
            done();
        }
        sendSMS.f(event, context, callback);
    });

    step("test for right data", function (done) {
        this.timeout(5000);
        let body = { charName: TestSettings.existingChar, guildToken: TestSettings.guildToken, phone: "+385989411056" };
        let requestContext = { identity: { sourceIp: "1.1.1.1" } }
        let event = { body: JSON.stringify(body), requestContext: requestContext };
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            if(d.ok === true){
                done();
            }else if(d.limitReached === true){
                done();
            }else{
                done("something went wrong");
            }
        }
        sendSMS.f(event, context, callback);
    });





});