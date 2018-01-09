import "mocha-steps";
import { expect } from 'chai';
import moment from 'moment';
import Tables from './../../../../../tables';

import Event from './Events';

describe("should test events/attendsForEvents ", function () {

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

    step("get error fetching users", (done) => {
        let e = new Event();
        e.attendsForEvents([],[],"DSADsasda").then(() => {
            done("didnt throw error");
        }).catch(() => {
            done();
        });
    });

    step("get error fetching attends", (done) => {
        let e = new Event();
        e.attendsForEvents([],[{event:{id:"221321"}}],guildId).then(() => {
            done("didnt throw error");
        }).catch(() => {
            done();
        });
    });

  


});