import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../tables';

import changeRole from './changeRole';

describe("should test user/changeRole ", function () {

    this.timeout(5000);

    let event;
    let charTypeForChange = "dps";
    let startCharType = "healer";


    step("insert test data", function (done) {
        let p = login(1, 1, "111", true)
            .then(data => {
                event = data;
                event.pathParameters = { userId: 1 };
                event.body = JSON.stringify({ charType: charTypeForChange })
                done();
            }).catch(err => done("error inserting"));;
    });

    step("set role", function () {
        let params = {
            TableName: Tables.user,
            Key: { id: 1 },
            UpdateExpression: 'set  charType = :charType ',
            ExpressionAttributeValues: {
                ':charType': startCharType,
            }
        };
        return db.update(params).promise()
    })

    step("get error wrong updateExpression", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("smth went wrong")
            }
        }
        changeRole.f(parseAuthorizer(event, { guildId: 2 }), context, callback)
    })

    step("verify user is still correct role", function (done) {
        let params = {
            TableName: Tables.user,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': event.requestContext.authorizer.json.userId
            }
        };
        db.query(params).promise().then((data) => {
            expect(data.Items[0].charType).to.equal(startCharType);
            done();
        }).catch(err => done(err));
    })

    step("change role", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done("smth went wrong");
            } else {
                done()
            }
        }
        changeRole.f(parseAuthorizer(event, { guildId: 1 }), context, callback)
    })

    step("verify role change", function (done) {
        let params = {
            TableName: Tables.user,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': event.requestContext.authorizer.json.userId
            }
        };
        db.query(params).promise().then((data) => {
            expect(data.Items[0].charType).to.equal(charTypeForChange);
            done();
        }).catch(err => done("smth went wrong"));
    })

    step("get error on db query", function (done) {
        let context = null;
        event.pathParameters = { userId: "DSadsa" };
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("smth went wrong")
            }
        }
        changeRole.f(parseAuthorizer(event), context, callback)
    })

    step("get error wrong charType", function (done) {
        let context = null;
        event.body = JSON.stringify({ charType: "dsadsads" })
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("smth went wrong")
            }
        }
        changeRole.f(parseAuthorizer(event), context, callback)
    });





});