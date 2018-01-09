import "mocha-steps";
import { expect } from 'chai';
import Tables from './../../../tables';
import TestSettings from './testSettings';

import checkToken from './checkToken';

describe("should test register/checkToken ", function () {



    step("insert test data", function (done) {
        let guildInsert = {
            id: 1,
            created: 123,
            name: TestSettings.guildName,
            server:  TestSettings.server,
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


    step("check for no token", function (done) {
        let event = { pathParameters: { token: null } }
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.exists).to.equal(false);
            done();
        }
        checkToken.f(event, context, callback);
    });

    step("check for wrong token", function (done) {
        let event = { pathParameters: { token: 'a' } }
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.exists).to.equal(false);
            done();
        }
        checkToken.f(event, context, callback);
    });

    step("check for error", function (done) {
        let event = { pathParameters: { token: 123 } }
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.exists).to.equal(false);
            done();
        }
        checkToken.f(event, context, callback);
    });

    step("check for right token", function (done) {
        let event = { pathParameters: { token: TestSettings.guildToken } }
        let context = {};
        let callback = (context, data) => {
            let d = JSON.parse(data.body);
            expect(d.guild).to.equal(TestSettings.guildName);
            done();
        }
        checkToken.f(event, context, callback);
    });


});