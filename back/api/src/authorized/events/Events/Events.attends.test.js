import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../../tables';

import Event from './Events';

describe("should test events/attends ", function () {

    this.timeout(5000);
    let guildId = 1;
    let existingEvents = [];

    step("insert 1 non opened event", function () {
        var params = {
            TableName: Tables.event,
            Item: {
                id: 1,
                guildId: guildId,
                historyStatus: "false",
                NullAttribute: null,
                status: "pending"
            }
        };
        return db.put(params).promise();
    });

    step("get error fetching attends", (done) => {
        let e = new Event();
        e.attends("dadsasd").then(() => {
            done("didnt throw error");
        }).catch(() => {
            done();
        });
    });

    step("get attends", (done) => {
        let e = new Event();
        e.attends(1).then(() => {
            done();
        }).catch(() => {
            done("didnt throw error");
        });
    });

  


});