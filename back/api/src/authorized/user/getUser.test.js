import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../tables';

import getUser from './getUser';

describe("should test user/getUser ", function () {

    this.timeout(5000);

    let event;

    step("insert test data", function (done) {
        let p = login(1, 1, "111", true)
            .then(data => {
                event = data;
                done();
            }).catch(err => done("error inserting"));;
    });

    step("manager pass authorizer", function (done) {
        let context = null;
        let callback = (err, data) => {
            let body = JSON.parse(data.body);
            expect(body.guild).to.equal(event.requestContext.authorizer.json.guild);
            done();
        }
        getUser.f(parseAuthorizer(event), context, callback)
    })


});