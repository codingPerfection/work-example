import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../tables';

import deleteUser from './deleteUser';

describe("should test user/deleteUser ", function () {

    this.timeout(5000);

    let event;

    step("insert test data", function (done) {
        let p = login(1, 1, "111", true)
            .then(data => {
                event = data;
                done();
            }).catch(err => done("error inserting"));;
    });

    step("delete user", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done("smth went wrong");
            } else {
                let body = JSON.parse(data.body);
                expect(body.ok).to.equal(true);
                done()
            }
        }
        deleteUser.f(parseAuthorizer(event), context, callback)
    })

    step("verify user is deleted", function (done) {
        db.query({
            TableName: Tables.user,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': event.requestContext.authorizer.json.userId
            }
        }).promise().then(data => {
            if (data.Items.length == 0) {
                done();
            } else {
                done("smth went wrong");
            }
        }).catch(err => done(err));
    })

    step("get error ", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("smth went wrong")
            }
        }
        deleteUser.f(parseAuthorizer(event,{userId: "dsadsa"}), context, callback)
    })


});