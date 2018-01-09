import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../../tables';


import User from './User';

describe("should test User ", function () {

    this.timeout(5000);

    let userId = 1;
    let token = "111";
    let guildId = 1;

    step("insert test data manager", function () {
        let p = login(guildId, userId, token, true);
        return p;
    });

    step("test for error wrong id", function (done) {
        let u = new User();
        u.getUserSettings('dsadsa')
            .then((data) => { done("should be error") })
            .catch(err => done());
    });

    step("delete guild", function () {
        let params = {
            TableName: Tables.guild,
            Key: {
                id: guildId,
            }
        }
        return db.delete(params).promise();
    });

    step("test for error guild doesn't exists", function (done) {
        let u = new User();
        u.getUserSettings('dsadsa')
            .then((data) => { done("should be error") })
            .catch(err => done());
    });

    step("insert test data", function () {
        let p = login(guildId, userId, token, true);
        return p;
    });

    step("should pass", function (done) {
        let u = new User();
        u.getUserSettings(userId)
            .then((data) => { done() })
            .catch(err => done("error"));
    });

    
});