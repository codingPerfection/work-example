import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../tables';

import getInviteCode from './getInviteCode';

describe("should test guild/kickUser ", function () {

    this.timeout(5000);

    let event;


    step("insert test data", function (done) {
        let p = login(1, 1, "111", true)
            .then(data => {
                event = data;
                done();
            }).catch(err => done("error inserting"));;
    });


    step("get error", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("smth went wrong")
            }
        }
        getInviteCode.f(parseAuthorizer(event, { guildId: "Dadsadsa" }), context, callback)
    })

    step("get code", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done("smth went wrong");
            } else {
                let body = JSON.parse(data.body);
                expect(body.url).to.not.equal(null);
                done();
            }
        }
        getInviteCode.f(parseAuthorizer(event, { guildId: 1 }), context, callback)
    })

});