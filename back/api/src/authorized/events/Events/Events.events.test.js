import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../../tables';

import Event from './Events';

describe("should test Events/events ", function () {

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

    step("get events", () => {
        let e = new Event();
        return e.events(guildId, false);
    });

    step("get error", (done) => {
        let e = new Event();
        e.events("DSADsasda", false).then(() => {
            done("didnt throw error");
        }).catch(() => {
            done();
        });
    });


});