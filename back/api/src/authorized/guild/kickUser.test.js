import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../tables';

import kickUser from './kickUser';

describe("should test guild/kickUser ", function () {

    this.timeout(5000);

    let event;
    let userId = 2;



    step("insert test data", function (done) {
        let p = login(1, 1, "111", true)
            .then(data => {
                event = data;
                event.pathParameters = { userId: userId };
                done();
            }).catch(err => done("error inserting"));;
    });

    step("insert test user", function () {
        let params = {
            TableName: Tables.user,
            Item: {
                id: userId,
                phone: "+123",
                guildId: 1,
                charName: "test"
            }
        };
        return db.put(params).promise();
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
        kickUser.f(parseAuthorizer(event, { guildId: 2 }), context, callback)
    })


    step("kick user", function (done) {
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
        kickUser.f(parseAuthorizer(event, { guildId: 1 }), context, callback)
    })

    step("verify user is deleted", function (done) {
        let params = {
            TableName: Tables.user,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': userId
            }
        };
        db.query(params).promise().then((data) => {
            expect(data.Items.length).to.equal(0);
            done();
        }).catch(err => done("smth went wrong"));
    })


});