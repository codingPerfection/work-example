import "mocha-steps";
import { expect } from 'chai';
import Tables from './../../../tables';
import TestSettings from './testSettings';

import checkCharName from './checkCharName';

describe("should test register/checkCharName ", function () {



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
                }
            });
    });


    step("check for no token or charName", function (done) {
        let event = { pathParameters: { token: null, charName: null } }
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.exists).to.equal(false);
            done();
        }
        checkCharName.f(event, context, callback);
    });

    step("check for wrong token", function (done) {
        let event = { pathParameters: { token: 'a', charName: TestSettings.existingChar } }
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.exists).to.equal(false);
            done();
        }
        checkCharName.f(event, context, callback);
    });


    step("check for wrong charName ", function (done) {
        let event = { pathParameters: { token: TestSettings.guildToken, charName:'123' } }
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.exists).to.equal(false);
            done();
        }
        checkCharName.f(event, context, callback);
    });

    step("check for right token and charName", function (done) {
        let event = { pathParameters: { token: TestSettings.guildToken, charName: TestSettings.existingChar } }
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.exists).to.equal(true);
            expect(d.charName).to.equal(TestSettings.existingCharCorrectUppercase);
            done();
        }
        checkCharName.f(event, context, callback);
    });


});