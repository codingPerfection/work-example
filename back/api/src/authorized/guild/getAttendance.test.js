import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../../tables';

import getAttendance from './getAttendance';

describe("should test get guild/attendance ", function () {

    this.timeout(5000);

    let event;
    let authorizer;

    step("login user", function (done) {
        let p = login(1, 1, "111", false)
            .then(data => {
                event = data;
                done();
            }).catch(err => done("error inserting"));;
    });

    step("insert test user", () => {
        var params = {
            TableName: Tables.user,
            Item: {
                id: 2,
                guildId: 1,
                phone: '+3854786',
                charName: "user1",
                charType: "dps",
                attendance: {
                    yes: 1,
                    no: 2,
                    late: 3,
                    pending: 4,
                    lateTime: 5,
                }
            }
        };
        return db.put(params).promise();
    })

    step("get data", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done("smth went wrong");
            } else {
                let body = JSON.parse(data.body);
                let attendance = body.attendance;
                let insertedUser = attendance.find(u => u.id == 2);
                expect(insertedUser.yes).to.equal(1);
                expect(insertedUser.no).to.equal(2);
                expect(insertedUser.late).to.equal(3);
                expect(insertedUser.pending).to.equal(4);
                expect(insertedUser.lateTime).to.equal(5);
                expect(insertedUser.editable).to.equal(false);

                let loggedInUser = attendance.find(u => u.id === 1);
                expect(loggedInUser.editable).to.equal(false);
                done();
            }
        }
        getAttendance.f(parseAuthorizer(event, {}), context, callback)
    });

    step("As manager all should be editable", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done("smth went wrong");
            } else {
                let body = JSON.parse(data.body);
                let insertedUser = body.attendance.find(u => u.id == 2);
                expect(insertedUser.editable).to.equal(true);

                let loggedInUser = body.attendance.find(u => u.id === 1);
                expect(loggedInUser.editable).to.equal(true);
                done();
            }
        }
        getAttendance.f(parseAuthorizer(event, {isManager:true}), context, callback)
    });

    step("get error", function (done) {
        let context = null;
        let callback = (err, data) => {
            if (err) {
                done();
            } else {
                done("smth went wrong");
            }
        }
        getAttendance.f(parseAuthorizer(event, {guildId:"Dsadsa"}), context, callback)
    });










});