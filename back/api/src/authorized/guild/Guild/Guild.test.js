import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';

import Tables from './../../../../../tables';

import Guild from './Guild';

describe("should test get guild/attendance ", function () {

    this.timeout(5000);

    let event;

    step("insert test data", function () {
        let guild = {
            id: 1,
            registrationToken: "a",
        };
        return db.put({ TableName: Tables.guild, Item: guild, }).promise();;
    });

    step("test guild.getInviteCode", (done) => {
        let g = new Guild();
        g.inviteCode(1).then((data) => {
            done();
        }).catch(err => {
            done("smth went wrong");
        });
    })

    step("test guild.getInviteCode for error", (done) => {
        let g = new Guild();
        g.inviteCode("dsadsadsa").then((data) => {
            done("smth went wrong");
        }).catch(err => {
            done();
        });
    })


    step("insert test users", function () {
        let user = {
            id: 1,
            guildId: 1,
            attendance: {
                yes: 1,
                no: 2,
                pending: 3,
                late: 4,
                lateTime: 5,
            }
        };
        return db.put({ TableName: Tables.user, Item: user, }).promise();;
    });

    step("users are editable", function (done) {
        let g = new Guild();
        g.attendance(1,true).then((data) => {
            expect(data[0].editable).to.equal(true)
            expect(data[0].phone).to.equal(null)
            done();
        }).catch(err => {
            done("smth went wrong");
        });
    });

    step("users are not editable", function (done) {
        let g = new Guild();
        g.attendance(1,false).then((data) => {
            expect(data[0].editable).to.equal(false)
            expect(data[0].phone).to.equal(null)
            done();
        }).catch(err => {
            done("smth went wrong");
        });
    });


    step("reject attendance wrong guild id", function (done) {
        let g = new Guild();
        g.attendance("DSADSADSA",false).then((data) => {
            done("smth went wrong");
        }).catch(err => {
            done();
        });
    });
});