import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../tables';

import Login from './Login';


describe("should test Login class ", function () {


    let phone = "+385989411056";
    let rightToken = "111111";

    step("get sendSms fail at getting user", function (done) {
        let l = new Login();
        l.sendSMS("aaaa", "1").then((data) => {
            done("should throw error");
        }).catch(err => {
            done();
        })
    });

    step("insert test data for fail", function () {
        let user = {
            id: 1,
            phone: "dsadsa",
            charName: "Ralgioro"
        };
        return db.put({ TableName: Tables.guild, Item: user, }).promise();;
    });

    step("get sendSms fail at sending sms", function (done) {
        let l = new Login();
        l.sendSMS("aaaa", "1").then((data) => {
            done("should throw error");
        }).catch(err => {
            done();
        })
    });

    step("get sendSms fail at query lvl fetching user", function (done) {
        let l = new Login();
        l.sendSMS(null, "1").then((data) => {
            done("should throw error");
        }).catch(err => {
            done();
        })
    });


    step("insert test data", function () {
        let user = {
            id: 1,
            phone: phone,
            charName: "Ralgioro"
        };
        return db.put({ TableName: Tables.guild, Item: user, }).promise();;
    });


    step("get sendSms", function (done) {
        let l = new Login();
        l.sendSMS(phone, "1").then((data) => {
            done();
        }).catch(err => {
            if (err && err.limitReached) {
                done();
            } else {
                done("failed to send sms");
            }
        })
    });

    step("insert login token", () => {
        let tokenToInsert = {
            id: 1,
            created: moment.utc().unix(),
            ttl: moment.utc().add(600, 'seconds').unix(),
            phone: phone,
            token: rightToken,
            ip: '1.1.1.1'
        };
        return db.put({ TableName: Tables.smsToken, Item: tokenToInsert, }).promise();;
    })


    step("get consumeSms fail at query lvl fetching user", function (done) {
        let l = new Login();
        l.consumeSms(null, "dsadsa", "1").then((data) => {
            done("should throw error");
        }).catch(err => {
            done();
        })
    });


    step("get consumeSms fail at wrong token", function (done) {
        let l = new Login();
        l.consumeSms("dsadsa", phone, "1").then((data) => {
            done("should throw error");
        }).catch(err => {
            done();
        })
    });

    step("get consumeSms to pass", function (done) {
        let l = new Login();
        l.consumeSms(rightToken, phone, "1").then((data) => {
            done();
        }).catch(err => {
            if (err && err.limitReached) {
                done();
            } else {
                done("failed to consume token");
            }
        })
    });





});