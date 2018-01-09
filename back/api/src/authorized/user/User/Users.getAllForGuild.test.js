import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../../tables';


import User from './User';

describe("should test User/getAllForGuild ", function () {

    this.timeout(5000);
    let guildId = 1;

    step("insert test data", () => {
        var params = {
            TableName: Tables.user,
            Item: {
                id: 1,
                guildId: guildId,
                phone: "+12346"
            }
        };
        return db.put(params).promise();
    })

    step("should test if phones are hidden", (done) => {
        let u = new User();
        u.getAllForGuild(guildId, false).then((data) => {
            expect(data[0].phone).to.not.equal(null);
            done();
        }).catch(() => { done("smth went wrong") })
    })

    
    step("should test if phones are hidden", (done) => {
        let u = new User();
        u.getAllForGuild(guildId, true).then((data) => {
            expect(data[0].phone).to.equal(null);
            done();
        }).catch(() => { done("smth went wrong") })
    })

});